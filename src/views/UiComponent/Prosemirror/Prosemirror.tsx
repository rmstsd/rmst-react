import { useEffect, useRef } from 'react'

import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark, setBlockType, wrapIn } from 'prosemirror-commands'
import { Schema, DOMParser } from 'prosemirror-model'

import { schema } from 'prosemirror-schema-basic'
import { exampleSetup, buildMenuItems } from 'prosemirror-example-setup'
import { MenuItem } from 'prosemirror-menu'

import { Button } from 'antd'

import { dinoNodeSpec, dinos, mySchema } from './schema-basic'

function icon(text, name) {
  let span = document.createElement('button')
  span.className = 'ant-btn ant-btn-default'
  span.textContent = text
  return span
}

class MenuView {
  constructor(items, editorView) {
    this.items = items
    this.editorView = editorView

    this.dom = document.createElement('div')
    this.dom.className = 'menubar'
    items.forEach(({ dom }) => this.dom.appendChild(dom))
    this.update()

    this.dom.addEventListener('mousedown', e => {
      e.preventDefault()
      editorView.focus()
      items.forEach(({ command, dom }) => {
        if (dom.contains(e.target)) command(editorView.state, editorView.dispatch, editorView)
      })
    })
  }

  update() {
    this.items.forEach(({ command, dom }) => {
      console.log('update')
      console.log(dom)
      let active = command(this.editorView.state, null, this.editorView)
      dom.style.display = active ? '' : 'none'
    })
  }

  destroy() {
    this.dom.remove()
  }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let menuView = new MenuView(items, editorView)
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom)
      return menuView
    }
  })
}
let menu = menuPlugin([
  // { command: toggleMark(schema.marks.strong), dom: icon('B', 'strong') },
  // { command: toggleMark(schema.marks.em), dom: icon('i', 'em') },
  { command: setBlockType(mySchema.nodes.paragraph), dom: icon('p', 'paragraph') },
  {
    command: setBlockType(mySchema.nodes.heading, { level: 1 }),
    dom: icon('H' + 1, 'heading')
  },
  { command: wrapIn(mySchema.nodes.blockquote), dom: icon('>', 'blockquote') }
])

console.log(menu)

const dinoSchema = new Schema({
  nodes: schema.spec.nodes.addBefore('image', 'dino', dinoNodeSpec),
  marks: schema.spec.marks
})

let dinoType = dinoSchema.nodes.dino
console.log(dinoType)

function insertDino(type) {
  return function (state, dispatch) {
    let { $from } = state.selection,
      index = $from.index()
    if (!$from.parent.canReplaceWith(index, index, dinoType)) return false
    if (dispatch) dispatch(state.tr.replaceSelectionWith(dinoType.create({ type })))
    return true
  }
}

let metionMenu = buildMenuItems(dinoSchema)
// Add a dino-inserting item for each type of dino
dinos.forEach(name =>
  metionMenu.insertMenu.content.push(
    new MenuItem({
      title: 'Insert ' + name,
      label: name.charAt(0).toUpperCase() + name.slice(1),
      enable(state) {
        return insertDino(name)(state)
      },
      run: insertDino(name)
    })
  )
)

const Prosemirror = () => {
  console.log('render')
  const ref = useRef(null)

  const stateRef = useRef<EditorState>(null)
  const viewRef = useRef<EditorView>(null)

  useEffect(() => {
    let content = document.querySelector('#content')
    let startDoc = DOMParser.fromSchema(dinoSchema).parse(content)
    stateRef.current = EditorState.create({
      schema: mySchema,
      // doc: startDoc,
      plugins: [history(), keymap({ 'Mod-z': undo, 'Mod-y': redo }), keymap(baseKeymap)]
      // plugins: exampleSetup({ schema: dinoSchema, menuContent: metionMenu.fullMenu })
    })
    viewRef.current = new EditorView(ref.current, {
      state: stateRef.current,
      dispatchTransaction(transaction) {
        let newState = viewRef.current.state.apply(transaction)
        console.log(newState.toJSON())
        viewRef.current.updateState(newState)
      }
    })
  }, [])

  return (
    <div>
      <div id="content" style={{ display: 'none' }}>
        <p>This is your dinosaur-enabled editor. The insert menu allows you to insert dinosaurs.</p>
        <p>
          This paragraph <img dino-type="stegosaurus" />, for example,
          <img dino-type="triceratops" /> is full <img dino-type="tyrannosaurus" /> of dinosaurs.
        </p>
        <p>Dinosaur nodes can be selected, copied, pasted, dragged, and so on.</p>
      </div>
      <Button
        onClick={() => {
          console.log(stateRef.current.doc.content.toString())
        }}
      >
        打印
      </Button>
      <Button
        onClick={() => {
          console.log(viewRef.current)
        }}
      >
        tojson
      </Button>

      <div className="border-2" onKeyDown={evt => evt.preventDefault()}>
        <Button
          onClick={() => {
            const editorView = viewRef.current

            editorView.focus()
            const commandBlockquote = setBlockType(mySchema.nodes.blockquote)
            const commandParagraph = setBlockType(mySchema.nodes.paragraph)

            const activeBlockquote = commandBlockquote(editorView.state, null, editorView)
            const activeParagraph = commandParagraph(editorView.state, null, editorView)
            // setBlockType() 执行后的返回值代表目标操作能不能做, 如果不能做 则返回 false
            // 比如 当前是引用, 然后触发点击事件, 目标操作如果依然是引用, 则是不能做 返回false

            console.log(activeBlockquote, activeParagraph)

            const command = activeBlockquote ? commandBlockquote : commandParagraph

            command(editorView.state, editorView.dispatch, editorView)
          }}
        >
          {'>'}
        </Button>

        <Button
          onClick={() => {
            const editorView = viewRef.current

            const dinoType = mySchema.nodes.dino

            let { $from } = editorView.state.selection
            let index = $from.index()

            if (!$from.parent.canReplaceWith(index, index, dinoType)) return

            if (editorView.dispatch) {
              const node = dinoType.create({
                type: 'brontosaurus',
                varLabel: 'only_id',
                inputValue: '人美声甜'
              })
              console.log(node)
              editorView.dispatch(editorView.state.tr.replaceSelectionWith(node))
            }
          }}
        >
          插入图片
        </Button>
      </div>

      <div ref={ref}></div>
    </div>
  )
}

export default Prosemirror
