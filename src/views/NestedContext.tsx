import { useContext } from 'react'
import { NestContext } from '..'

const NestedContext = () => {
  const cc = useContext(NestContext)

  return (
    <NestContext.Provider value={{ ...cc, name: 'nestedContext view' }}>
      <Child />
      Context
    </NestContext.Provider>
  )
}

export default NestedContext

function Child() {
  const cc = useContext(NestContext)
  console.log(cc)

  return <>11</>
}
