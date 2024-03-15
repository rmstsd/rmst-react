import { ActionTypes } from '../../redux-undo'
import { connect } from 'react-redux'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button
      onClick={() => {
        onUndo()
      }}
      disabled={!canUndo}
    >
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
)

UndoRedo = connect(
  state => ({
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0
  }),
  {
    onUndo: () => {
      return { type: ActionTypes.UNDO }
    },
    onRedo: () => {
      return { type: ActionTypes.REDO }
    }
  }
)(UndoRedo)

export default UndoRedo
