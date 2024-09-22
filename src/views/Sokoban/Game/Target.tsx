import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'

import dropPoint from '../images/drop-point.png'

export default observer(function Target() {
  return (
    <section className="target">
      {sokobanStore.mapData.targets.map((item, index) => (
        <div
          key={index}
          className="absolute flex h-40 w-40 items-center justify-center text-center"
          style={{ left: item.x * 40, top: item.y * 40 }}
          onDoubleClick={() => sokobanStore.removeTarget(index)}
        >
          <img src={dropPoint} className="h-1/2 w-1/2" />
        </div>
      ))}
    </section>
  )
})
