import { Button, Input } from '@arco-design/web-react'
import { useEffect, useRef, useState } from 'react'
import Manager, { Command } from './class'
import { useUpdate } from 'ahooks'

let key = 0

interface Todo {
  value: string
  key: number
}

const manager = new Manager([
  { value: 'z', key: -1 },
  { value: 'x', key: -2 }
])

class AddTodoCmd {
  constructor(value: Todo) {
    this.value = value
  }

  value: Todo

  execute(state: Todo[]) {
    const newState = state.concat(this.value)
    return newState
  }

  undo(state: Todo[]) {
    const newState = state.toSpliced(state.indexOf(this.value), 1)
    return newState
  }
}

class DelTodoCmd {
  constructor(key: number) {
    this.key = key
  }

  key: number

  index
  item

  execute(state: Todo[]) {
    this.index = state.findIndex(o => o.key === this.key)
    this.item = state[this.index]

    const newState = state.toSpliced(this.index, 1)
    return newState
  }

  undo(state: Todo[]) {
    const newState = state.toSpliced(this.index, 0, this.item)
    return newState
  }
}

class upTodoCmd implements Command {
  constructor(key: number, nv: string) {
    this.key = key
    this.nv = nv
  }

  key: number

  nv: string
  ov: string

  execute(state: Todo[]) {
    const item = state.find(item => item.key === this.key)
    this.ov = item.value

    item.value = this.nv
    return [...state]
  }

  undo(state: Todo[]) {
    const item = state.find(item => item.key === this.key)
    item.value = this.ov

    return [...state]
  }
}

const Todo = () => {
  const up = useUpdate()

  const [value, setValue] = useState('')

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [value])

  const [editedKey, setEditedKey] = useState<number>()

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

      <div className="flex">
        <Input ref={inputRef} value={value} onChange={setValue} style={{ width: 200 }} />
        <Button
          disabled={value === ''}
          onClick={() => {
            manager.addCommand(new AddTodoCmd({ key: ++key, value }))

            up()
            setValue('')
          }}
        >
          add
        </Button>
      </div>

      <ul>
        {manager.state.map((item, index) => (
          <li key={item.key} className="p-2">
            {editedKey === item.key ? (
              <EditInput
                value={item.value}
                onConfirm={nv => {
                  manager.addCommand(new upTodoCmd(item.key, nv))

                  setEditedKey(null)
                }}
              />
            ) : (
              <div onClick={() => setEditedKey(item.key)}>
                <span className="inline-block" style={{ minWidth: 100 }}>
                  {item.value}
                </span>

                <Button
                  status="danger"
                  className="ml-3"
                  onClick={evt => {
                    evt.stopPropagation()

                    manager.addCommand(new DelTodoCmd(item.key))

                    up()
                  }}
                >
                  删除
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo

function EditInput({ value, onConfirm }) {
  const [innerValue, setInnerValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <Input ref={inputRef} value={innerValue} onChange={setInnerValue} style={{ width: 100 }} />
      <Button
        onClick={() => {
          onConfirm(innerValue)
        }}
      >
        确定
      </Button>
    </>
  )
}
