import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'

import { useEffect, useRef } from 'react'

const Prosemirror = () => {
  const ref = useRef(null)

  const stateRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    stateRef.current = EditorState.create({
      schema,
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
      <button
        onClick={() => {
          console.log(stateRef.current, viewRef.current)
        }}
      >
        打印
      </button>
      <div ref={ref}></div>
    </div>
  )
}

export default Prosemirror
