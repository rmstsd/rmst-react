import { useUpdate } from '@/utils/hooks/hooks'
import Manager from './class'

const manager = new Manager(1)

export class IncrementCmd {
  constructor(value) {
    this.value = value
  }

  value

  execute(state) {
    const newState = state + this.value
    return newState
  }

  undo(state) {
    const newState = state - this.value
    return newState
  }
}

export class DecrementCmd {
  constructor(value) {
    this.value = value
  }

  value

  execute(state) {
    const newState = state - this.value
    return newState
  }

  undo(state) {
    const newState = state + this.value
    return newState
  }
}

const Count = () => {
  const up = useUpdate()

  return (
    <div>
      <button
        onClick={() => {
          manager.undo()
          up()
        }}
      >
        撤销
      </button>
      <button
        onClick={() => {
          manager.redo()
          up()
        }}
      >
        重做
      </button>

      <hr />

      <button
        onClick={() => {
          manager.addCommand(new IncrementCmd(2))

          up()
        }}
      >
        + 2
      </button>
      <button
        onClick={() => {
          manager.addCommand(new DecrementCmd(1))

          up()
        }}
      >
        - 1
      </button>

      <h1>{manager.state}</h1>
    </div>
  )
}

export default Count
