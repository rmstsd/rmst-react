import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'
import { useEffect } from 'react'

import Map from './Map'
import Player from './Player'
import Box from './Box'
import Target from './Target'
import { Button } from '@arco-design/web-react'
import game from './store/game'

export default observer(function Sokoban() {
  useEffect(() => {
    document.onkeydown = evt => {
      sokobanStore.movePlayer(evt)
    }
  }, [])

  return (
    <section className="game relative">
      <header>
        {game.gameMaps.map((item, idx) => (
          <Button
            key={idx}
            onClick={() => {
              game.level = idx
              sokobanStore.mapData = game.gameMaps[idx]
            }}
          >
            第 {idx + 1} 关
          </Button>
        ))}
      </header>

      <br />

      <GameDetail />
    </section>
  )
})

const GameDetail = observer(function GameDetail() {
  return (
    <div className="game-detail relative w-fit">
      <Map />
      <>
        <Target />
        <Box />
        <Player />
      </>

      {sokobanStore.isWin() && (
        <div
          className="flex-center absolute inset-0 text-center text-6xl text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          赢了
        </div>
      )}
    </div>
  )
})
