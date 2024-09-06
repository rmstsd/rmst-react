import { memo, useState, useEffect } from 'react'
// import { createContext, useContextSelector } from '@/utils/hooks'

import { createContext as createContextOrig, useContext as useContextOrig, useRef, useSyncExternalStore } from 'react'

export const createContext = defaultValue => {
  const context = createContextOrig()
  const ProviderOrig = context.Provider
  context.Provider = ({ value, children }) => {
    const storeRef = useRef()
    let store = storeRef.current
    if (!store) {
      const listeners = new Set()
      store = {
        value,
        subscribe: l => {
          listeners.add(l)
          return () => listeners.delete(l)
        },
        notify: () => listeners.forEach(l => l())
      }
      storeRef.current = store
    }
    useEffect(() => {
      if (!Object.is(store.value, value)) {
        store.value = value
        store.notify()
      }
    })
    return <ProviderOrig value={store}>{children}</ProviderOrig>
  }
  return context
}

export const useContextSelector = (context, selector) => {
  const store = useContextOrig(context)
  return useSyncExternalStore(store.subscribe, () => selector(store.value))
}

type User = Partial<{
  name: string;
  age: number;
  love: string[];
  eat: Partial<{
    fruit: Partial<{ apple: string; banana: string }>;
    water: Partial<{ 外星人: string; 红牛: string }>;
  }>;
}>

const Context = createContext<User>(null)

const ContextSelector = () => {
  console.log('app render')

  return (
    <StateProvider>
      <Base />
      <Love />
      {/* <Eat /> */}
    </StateProvider>
  )
}

// export default ContextSelector

function StateProvider({ children }) {
  console.log('sp render')

  const [state, setState] = useState<User>({
    name: '人美声甜',
    age: 26,
    love: ['吃', '喝'],
    eat: {
      fruit: { apple: '红苹果', banana: '香蕉' },
      water: { 外星人: '水', 红牛: '水' }
    }
  })

  return (
    <Context.Provider value={state}>
      <button
        onClick={() => {
          setState({ ...state, name: `人美声甜 ${Math.random()}` })
        }}
      >
        up
      </button>

      {children}
    </Context.Provider>
  )
}

function Base() {
  console.log('Base render')

  const user = useContextSelector(Context, v => v)

  return (
    <div className="border p-5">
      <h1>name {user.name}</h1>
      {getNum()}
      <h1>age {user.age}</h1>
    </div>
  )
}

function getNum() {
  console.log('gg')
  return Math.random()
}

const Love = function Love() {
  const age = useContextSelector(Context, v => v.age)
  console.log('Love render')

  return (
    <>
      age{age} {getNum()}
    </>
  )

  return (
    <div className="border p-8">
      Love {user.name}
      <ul>
        {user.love.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const Eat = function Eat() {
  console.log('Eat render')

  const eat = useContextSelector(Context, v => v.eat)

  return (
    <div className="border p-8">
      Eat
      <div>{eat.fruit.apple}</div>
      <div>{eat.fruit.banana}</div>
      <div>{eat.water.外星人}</div>
      <div>{eat.water.红牛}</div>
    </div>
  )
}

// ----------------------------------

const context = createContext(null)

const Counter1 = () => {
  console.log('c 1 render')
  const count1 = useContextSelector(context, v => v[0].count1)
  const setState = useContextSelector(context, v => v[1])
  const increment = () =>
    setState(s => ({
      ...s,
      count1: s.count1 + 1
    }))
  return (
    <div>
      <span>Count1: {count1}</span>
      <button type="button" onClick={increment}>
        +1
      </button>
      {Math.random()}
    </div>
  )
}

const Counter2 = () => {
  console.log('c 2 render')
  const count2 = useContextSelector(context, v => v[0].count2)
  const setState = useContextSelector(context, v => v[1])
  const increment = () =>
    setState(s => ({
      ...s,
      count2: s.count2 + 1
    }))
  return (
    <div>
      <span>Count2: {count2}</span>
      <button type="button" onClick={increment}>
        +1
      </button>
      {Math.random()}
    </div>
  )
}

const StateProviderCount = ({ children }) => {
  const ss = useState({ count1: 0, count2: 0, a: { b: 9 } })

  return (
    <context.Provider value={ss}>
      <button
        onClick={() => {
          ss[1](state => ({
            ...state,
            count1: state.count1 + 1
          }))
        }}
      >
        up
      </button>
      {children}
    </context.Provider>
  )
}

const App = () => (
  <StateProviderCount>
    <Counter1 />
    <Counter2 />
  </StateProviderCount>
)

export default App
