import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'

import floorImage from '../images/floor1-sheet0.png'
import wallImage from '../images/wall-sheet.jpg'
import { CellType } from '../type'

const renderCell = cell => {
  if (cell === CellType.Floor) {
    return <img src={floorImage} alt="floor" />
  }

  if (cell === CellType.Wall) {
    return <img src={wallImage} alt="wall" />
  }

  return null
}

export default observer(function Map() {
  const { mapData } = sokobanStore

  return (
    <div className="flex flex-col">
      {mapData.bgMap.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="h-40 w-40 bg-gray-300 shadow-inner"
              onClick={() => sokobanStore.addCell(rowIndex, colIndex)}
              onPointerDown={evt => evt.preventDefault()}
              onPointerMove={evt => {
                if (evt.pressure) {
                  sokobanStore.addCell(rowIndex, colIndex)
                }
              }}
            >
              {renderCell(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})
