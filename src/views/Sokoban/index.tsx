import Edit from './Edit/Edit'
import Game from './Game/Game'

export default function Sokoban() {
  return (
    <div>
      <Game />

      <hr className="my-6" />

      <Edit />
    </div>
  )
}
