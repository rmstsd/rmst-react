import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark, setBlockType, wrapIn } from 'prosemirror-commands'

import { useEffect, useRef } from 'react'
import { Button } from 'antd'

import { baseSchema } from './Prosemirror/schema-basic'

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
  { command: setBlockType(baseSchema.nodes.paragraph), dom: icon('p', 'paragraph') },
  {
    command: setBlockType(baseSchema.nodes.heading, { level: 1 }),
    dom: icon('H' + 1, 'heading')
  }
  // { command: wrapIn(baseSchema.nodes.blockquote), dom: icon('>', 'blockquote') }
])

const Prosemirror = () => {
  const ref = useRef(null)

  const stateRef = useRef<EditorState>(null)
  const viewRef = useRef<EditorView>(null)

  useEffect(() => {
    stateRef.current = EditorState.create({
      schema: baseSchema,
      plugins: [history(), keymap({ 'Mod-z': undo, 'Mod-y': redo }), keymap(baseKeymap)]
    })
    viewRef.current = new EditorView(ref.current, {
      state: stateRef.current,
      dispatchTransaction(transaction) {
        console.log(
          'Document size went from',
          transaction.before.content.size,
          'to',
          transaction.doc.content.size
        )
        let newState = viewRef.current.state.apply(transaction)
        viewRef.current.updateState(newState)
      }
    })
  }, [])

  return (
    <div>
      <Button
        onClick={() => {
          console.log(stateRef.current, viewRef.current)
        }}
      >
        打印
      </Button>
      <Button
        onClick={() => {
          console.log(stateRef.current.toJSON())
        }}
      >
        tojson
      </Button>

      <div className="border-2" onKeyDown={evt => evt.preventDefault()}>
        <Button
          onClick={() => {
            const editorView = viewRef.current

            editorView.focus()
            const commandBlockquote = setBlockType(baseSchema.nodes.blockquote)
            const commandParagraph = setBlockType(baseSchema.nodes.paragraph)

            const activeBlockquote = commandBlockquote(editorView.state, null, editorView)
            const activeParagraph = commandParagraph(editorView.state, null, editorView)

            console.log(activeBlockquote, activeParagraph)

            // const command = activeParagraph ? commandParagraph : commandBlockquote

            // command(editorView.state, editorView.dispatch, editorView)
          }}
        >
          {'>'}
        </Button>
      </div>

      <div ref={ref}></div>
    </div>
  )
}

export default Prosemirror
