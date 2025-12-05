import { initCustomFormatter } from './cc/customFormatter'
import { faUser, faBoxFull } from '@fortawesome/sharp-duotone-thin-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { applyPatches, Draft, enablePatches, Patch, Producer, produceWithPatches } from 'immer'
import { useUpdate } from 'ahooks'
import { useState } from 'react'
import { Button, Input, Skeleton, Trigger, Typography } from '@arco-design/web-react'
import Rts from './Rts'

initCustomFormatter()

enablePatches()

function Rmstsd() {
  const update = useUpdate()

  const [manager] = useState(() => {
    const initialState = { count: 0, todos: [], user: { name: 'xxx' } }

    return new UndoRedoManager(initialState)
  })

  console.log(manager)

  const [open, setOpen] = useState(false)

  return (
    <div>
      <FontAwesomeIcon icon={faBoxFull} />

      <button onClick={() => setOpen(!open)}>open</button>

      {open && (
        <Trigger
          popupVisible
          classNames="zoomInBottom"
          trigger="click"
          popupAlign={{ bottom: 20 }}
          popup={() => {
            return (
              <div className="bg-pink-100 p-10">
                <Trigger
                  popupVisible
                  classNames="zoomInBottom"
                  popupAlign={{ bottom: 20 }}
                  popup={() => (
                    <div className="bg-orange-200 p-10" style={{ width: 300 }}>
                      <Trigger
                        popupVisible
                        classNames="zoomInBottom"
                        blurToHide={false}
                        popupAlign={{ bottom: 20 }}
                        popup={() => <div className="bg-red-300 p-10">3</div>}
                      >
                        <div>2</div>
                      </Trigger>
                    </div>
                  )}
                >
                  <button>1</button>
                </Trigger>
              </div>
            )
          }}
        >
          <Button>Hover Me</Button>
        </Trigger>
      )}
    </div>
  )

  return (
    <div>
      <div className="grid overflow-hidden" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div>hello world</div>
      </div>

      <div>华府国际规划局</div>
    </div>
  )

  return (
    <div className="flex">
      <div>
        <button
          onClick={() => {
            manager.produce(draft => {
              draft.count = draft.count + 1

              draft.count = draft.count - 2

              draft.todos.push(draft.count)
            })

            update()
          }}
        >
          +1
        </button>
        <button
          disabled={!manager.canUndo()}
          onClick={() => {
            manager.undo()
            update()
          }}
        >
          撤销
        </button>
        <button
          disabled={!manager.canRedo()}
          onClick={() => {
            manager.redo()
            update()
          }}
        >
          重做
        </button>
        <button
          onClick={() => {
            manager.clearHistory()
            update()
          }}
        >
          clear
        </button>
        <button
          onClick={() => {
            manager.produce(draft => {
              draft.todos.splice(2, 1)
            })
            update()
          }}
        >
          remove index 2
        </button>
        <button
          onClick={() => {
            manager.produce(draft => {
              draft.user = { name: 'bb' }
            })
            update()
          }}
        >
          update user
        </button>
        <hr />
        <pre>{JSON.stringify(manager.getState(), null, 2)}</pre>
      </div>
    </div>
  )
}

class UndoRedoManager<T extends any> {
  state: T
  patches: Patch[][] = [] // 用于重做
  inversePatches: Patch[][] = [] // 用于撤销
  historyPosition = -1

  constructor(initialState: T) {
    // 初始状态
    this.state = initialState
    // 存储所有的变更补丁
    this.patches = []
    // 存储所有的反补丁（用于撤销）
    this.inversePatches = []
    // 当前历史记录位置
    this.historyPosition = -1
  }

  produce(producer: Producer<T>) {
    // 如果当前不在历史记录的末尾，清除后面的记录
    if (this.historyPosition < this.patches.length - 1) {
      this.patches = this.patches.slice(0, this.historyPosition + 1)
      this.inversePatches = this.inversePatches.slice(0, this.historyPosition + 1)
    }

    // 使用produceWithPatches生成新状态和补丁
    const [newState, newPatches, newInversePatches] = produceWithPatches(this.state, producer)

    // 如果有实际变更才记录
    if (newPatches.length > 0) {
      this.state = newState
      this.patches.push(newPatches)
      this.inversePatches.push(newInversePatches)
      this.historyPosition++
    }

    return this.state
  }

  undo(): boolean {
    if (this.historyPosition < 0) {
      return false // 已经是初始状态，无法撤销
    }

    // 应用反补丁实现撤销
    this.state = applyPatches(this.state, this.inversePatches[this.historyPosition])
    this.historyPosition--
    return true
  }

  redo(): boolean {
    if (this.historyPosition >= this.patches.length - 1) {
      return false // 已经是最新状态，无法重做
    }

    this.historyPosition++
    // 应用补丁实现重做
    this.state = applyPatches(this.state, this.patches[this.historyPosition])
    return true
  }

  getState(): any {
    return this.state
  }

  canUndo(): boolean {
    return this.historyPosition >= 0
  }

  canRedo(): boolean {
    return this.historyPosition < this.patches.length - 1
  }

  clearHistory() {
    this.patches = []
    this.inversePatches = []
    this.historyPosition = -1
  }
}

export default function Tt() {
  return <Rts />
}
