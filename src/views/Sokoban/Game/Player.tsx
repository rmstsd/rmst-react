import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'

import player from '../images/player.png'

export default observer(function Player() {
  const { mapData } = sokobanStore

  return (
    mapData.player && (
      <div
        className="player absolute h-40 w-40 text-center"
        style={{ left: mapData.player.x * 40, top: mapData.player.y * 40 }}
        onDoubleClick={() => (sokobanStore.mapData.player = null)}
      >
        <img src={player} />
      </div>
    )
  )
})
