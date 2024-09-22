import { makeAutoObservable } from 'mobx'
import { gameMaps } from './gameMapData'
import { MapData } from '../../type'

class Game {
  level = 0 // 第几关

  gameMaps: MapData[] = gameMaps as MapData[] // 地图数据

  constructor() {
    makeAutoObservable(this)
  }
}

const game = new Game()
export default game
