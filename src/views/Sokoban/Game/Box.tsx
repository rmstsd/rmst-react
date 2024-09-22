import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'

import crateSheet0 from '../images/crate-sheet0.jpg'
import crateSheet1 from '../images/crate-sheet1.jpg'

export default observer(function Box() {
  const { mapData } = sokobanStore

  return (
    <section className="box">
      {mapData.boxes.map((item, index) => (
        <div
          key={index}
          className="absolute h-40 w-40 text-center"
          style={{ left: item.x * 40, top: item.y * 40 }}
          onDoubleClick={() => sokobanStore.removeBox(index)}
        >
          <img src={sokobanStore.isBoxInTarget(item) ? crateSheet1 : crateSheet0} alt="box" />
        </div>
      ))}
    </section>
  )
})
