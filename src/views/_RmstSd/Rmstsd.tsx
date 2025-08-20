import { toJS } from 'mobx'
import { initCustomFormatter } from './cc/customFormatter'
import { useLocalObservable } from 'mobx-react-lite'

initCustomFormatter()

export default function Rmstsd() {
  const state = useLocalObservable(() => ({
    user: {
      name: '张三'
    },
    list: [123],
    ggg: {}
  }))

  console.log(state)

  return <div>Rmstsd</div>
}
