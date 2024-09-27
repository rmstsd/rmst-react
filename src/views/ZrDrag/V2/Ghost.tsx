import { observer } from 'mobx-react-lite'
import { store } from './store'

function Ghost() {
  if (!store.draggedNode) {
    return null
  }

  return (
    <>
      <div className="fixed bg-white p-4 shadow-lg" style={{ left: store.pos.x, top: store.pos.y }}>
        {store.draggedNode.title}
      </div>
    </>
  )
}

export default observer(Ghost)
