import { makeAutoObservable, toJS } from 'mobx'
import { testMapData } from '../testData'
import { CellType } from '../type'
import { calcPositionMap, directionKeyboards } from './position'
import type { MapData, Position } from '../type'

class SokobanStore {
  constructor() {
    makeAutoObservable(this)
  }

  mapData: MapData = JSON.parse(JSON.stringify(testMapData))
  cellType: CellType = CellType.Floor
  setCellType = c => {
    this.cellType = c
  }

  addCell = (rowIndex, colIndex) => {
    const { mapData, cellType } = this

    const fillCell = value => {
      mapData.bgMap[rowIndex][colIndex] = value
    }
    if (cellType === CellType.Floor) {
      fillCell(CellType.Floor)
    } else if (cellType === CellType.Wall) {
      fillCell(CellType.Wall)
    } else {
      if ([CellType.Player, CellType.Box, CellType.Target].includes(cellType)) {
        fillCell(CellType.Floor)

        if (cellType === CellType.Player) {
          mapData.player = { x: colIndex, y: rowIndex }
        } else if (cellType === CellType.Box) {
          const hasBox = mapData.boxes.some(box => box.x === colIndex && box.y === rowIndex)
          if (!hasBox) {
            mapData.boxes.push({ x: colIndex, y: rowIndex })
          }
        } else if (cellType === CellType.Target) {
          const hasTarget = mapData.targets.some(item => item.x === colIndex && item.y === rowIndex)
          if (!hasTarget) {
            mapData.targets.push({ x: colIndex, y: rowIndex })
          }
        }
      }
    }
  }

  isValidMap() {
    if (
      !this.mapData.boxes.length
      || !this.mapData.targets.length
      || this.mapData.boxes.length !== this.mapData.targets.length
    ) {
      console.log('boxes and targets not match')
      return
    }

    if (!this.mapData.player) {
      console.log('player not found')

      return
    }

    console.log(toJS(this.mapData))
  }

  isWall(pos: Position) {
    return this.mapData.bgMap[pos.y][pos.x] === CellType.Wall
  }

  findBox(pos: Position) {
    return this.mapData.boxes.find(item => item.x === pos.x && item.y === pos.y)
  }

  isBoxInTarget(pos: Position) {
    return this.mapData.targets.some(box => box.x === pos.x && box.y === pos.y)
  }

  removeTarget(index: number) {
    this.mapData.targets.splice(index, 1)
  }

  removeBox(index: number) {
    this.mapData.boxes.splice(index, 1)
  }

  isWin() {
    return (
      this.mapData.boxes.length
      && this.mapData.targets.length
      && this.mapData.boxes.every(box => this.mapData.targets.some(target => box.x === target.x && box.y === target.y))
    )
  }

  movePlayer(evt: KeyboardEvent) {
    if (!directionKeyboards.includes(evt.key)) return
    evt.preventDefault()

    if (this.isWin()) {
      return
    }

    const { mapData } = this

    if (!mapData.player) {
      return
    }

    const { calcPosition } = calcPositionMap[evt.key]
    const nextPosition = calcPosition(mapData.player)

    if (this.isWall(nextPosition)) {
      return
    }

    const nextBox = this.findBox(nextPosition)
    if (nextBox) {
      const nextNextPosition = calcPosition(nextPosition)
      if (this.isWall(nextNextPosition) || this.findBox(nextNextPosition)) {
        return
      }

      nextBox.x = nextNextPosition.x
      nextBox.y = nextNextPosition.y
    }

    mapData.player = nextPosition

    console.log(toJS(mapData))

    if (this.isWin()) {
      console.log('win')
    }
  }
}

const sokobanStore = new SokobanStore()

export default sokobanStore
