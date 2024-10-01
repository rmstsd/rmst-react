import { observer } from 'mobx-react-lite'
import { store } from './store'

function Ghost() {
  if (!store.draggedNode) {
    return null
  }

  return (
    <div className="pointer-events-none">
      <div className="pointer-events-none fixed bg-white p-4 shadow-lg" style={{ left: store.pos.x, top: store.pos.y }}>
        {store.draggedNode.title}
      </div>

      {store.draggedNode && (
        <div
          className="fixed h-4 bg-blue-400"
          style={{ left: store.indicator.x, top: store.indicator.y, width: store.indicator.width }}
        ></div>
      )}
    </div>
  )
}

export default observer(Ghost)
