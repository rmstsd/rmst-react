import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

import { ActionCreators } from './redux-undo'
import undoable from 'redux-undo'
import { useRef } from 'react'

interface Todo {
  value: string
  key: number
}

const initialState: { value: number; list: Todo[] } = {
  value: 0,
  list: []
}

let key = 100
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    add: (state, { payload }) => {
      state.list.push({ key: ++key, value: payload })
    },
    del: (state, { payload }) => {
      state.list.splice(
        state.list.findIndex(o => o.key == payload),
        1
      )
    },
    up: (state, { payload }) => {
      state.list.find(o => o.key == payload.key).value = payload.nv
    }
  }
})

const ac = counterSlice.actions
const { increment, add } = counterSlice.actions
const undoReducer = counterSlice.reducer

const store = configureStore({
  reducer: { counter: undoable(undoReducer) }
})

type State = ReturnType<typeof store.getState>

const TodoList = () => {
  const counter = useSelector((state: State) => state.counter)
  const dispatch = useDispatch()

  const cur = counter.present

  const ref = useRef<HTMLInputElement>()

  return (
    <>
      <div>
        <input ref={ref} type="text" />
        <button
          onClick={() => {
            dispatch(add(ref.current.value))
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
          {cur.list.map(todo => (
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

        <button onClick={() => dispatch(increment())}>{counter.present.value}</button>
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
