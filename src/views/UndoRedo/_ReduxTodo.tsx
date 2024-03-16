import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

import reduxUndo, { ActionCreators } from './redux-undo'
// import undoable from 'redux-undo'
import { useRef } from 'react'
import undoable from './redux-undo/reducer'

interface Todo {
  value: string
  key: number
}

const initialState: Todo[] = []

let key = 100
const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.push({ key: ++key, value: payload })
    },
    del: (state, { payload }) => {
      state.splice(
        state.findIndex(o => o.key == payload),
        1
      )
    },
    up: (state, { payload }) => {
      state.find(o => o.key == payload.key).value = payload.nv
    }
  }
})

const ac = counterSlice.actions

const store = configureStore({
  reducer: { todo: undoable(counterSlice.reducer) }
})

function newUndoHistory(past, present, future) {
  return { past, present, future }
}

function isUndoHistory(o) {
  return typeof o === 'object' && Reflect.has(o, 'past') && Reflect.has(o, 'present') && Reflect.has(o, 'future')
}

function undoable_2(reducer) {
  let iniState = undefined

  return (state, action) => {
    console.log(state)
    let his = state

    if (!iniState) {
      if (state === undefined) {
        const res = reducer(state, action)
        his = newUndoHistory([], res, [])
        iniState = his

        return his
      } else {
        his = newUndoHistory([], state.present, [])
      }
    }

    const res = reducer(his.present, action)

    return newUndoHistory([], res, [])
  }
}

type State = ReturnType<typeof store.getState>

const TodoList = () => {
  const counter = useSelector((state: State) => state.todo)
  const dispatch = useDispatch()

  const cur = counter.present

  const ref = useRef<HTMLInputElement>()

  return (
    <>
      <div>
        <input ref={ref} type="text" />
        <button
          onClick={() => {
            dispatch(ac.add(ref.current.value))
            ref.current.value = ''
          }}
        >
          confirm
        </button>
        <hr />
        <button disabled={counter.past.length === 0} onClick={() => dispatch(ActionCreators.undo())}>
          undo
        </button>
        <button disabled={counter.future.length === 0} onClick={() => dispatch(ActionCreators.redo())}>
          redo
        </button>

        <hr />

        <ul>
          {cur.map(todo => (
            <li className="flex" key={todo.key}>
              <span
                className="w-[200px]"
                onClick={() => {
                  dispatch(ac.up({ key: todo.key, nv: String(Math.random()) }))
                }}
              >
                {todo.value}
              </span>

              <button
                onClick={evt => {
                  evt.stopPropagation()
                  dispatch(ac.del(todo.key))
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const MApp = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

export default MApp
