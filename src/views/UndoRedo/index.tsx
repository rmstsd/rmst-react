import { createStore } from 'redux'

import Count from './Count'
import ReduxTodo from './ReduxTodo'
import Todo from './Todo'
import MReduxUndo from './_ReduxTodo'

import { useEffect, useState } from 'react'

export function countReducer(state = 1, action) {
  console.log('countReducer')

  switch (action.type) {
    case 'add':
      return state + action.amount

    default:
      return state
  }
}

const store = createStore(countReducer)

const UndoRedoIndex = () => {
  console.log()

  const [count, setCount] = useState(() => store.getState())

  useEffect(() => {
    const un = store.subscribe(() => {
      console.log(store.getState())

      setCount(store.getState())
    })

    return () => {
      un()
    }
  }, [])

  return (
    <>
      <div>
        <button onClick={() => store.dispatch({ type: 'add', amount: 1 })}>{count}</button>
        {/* <Count /> */}

        {/* <Todo /> */}

        {/* <ReduxTodo /> */}

        <hr />

        {/* <MReduxUndo /> */}
      </div>
    </>
  )
}

export default UndoRedoIndex
