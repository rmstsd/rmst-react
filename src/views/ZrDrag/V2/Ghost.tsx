import { observer } from 'mobx-react-lite'
import { store } from './store'

function Ghost() {
  if (!store.draggedNode) {
    return null
  }

  return (
    <div className="pointer-events-none">
      {store.draggedNode && <div className="indicator fixed" style={{ ...store.indicatorStyle }}></div>}

      <div
        className="pointer-events-none fixed border bg-white p-4 shadow-lg"
        style={{ left: store.pos.x, top: store.pos.y }}
      >
        {store.draggedNode.title}
      </div>
    </div>
  )
}

export default observer(Ghost)
