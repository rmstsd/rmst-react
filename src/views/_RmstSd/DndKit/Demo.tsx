import MyDnd from '../MyDnd'
import { MultipleContainers } from './MultipleContainers'

export default function Demo() {
  return (
    <div className="flex gap-10">
      <MultipleContainers />

      <MyDnd />
    </div>
  )
}
