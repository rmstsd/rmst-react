import { Button, Input } from 'antd'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import { useCallback, useEffect, useRef, useState, useDeferredValue, useTransition } from 'react'
import {
  init,
  classModule,
  propsModule,
  attributesModule,
  styleModule,
  eventListenersModule,
  h
} from 'snabbdom'

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 classes 功能
  propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  attributesModule,
  eventListenersModule // 添加事件监听
])

const useEvent = <T extends (...args: any[]) => any>(func: T) => {
  const ref = useRef(func)
  ref.current = func

  const uc = ((...rest) => {
    const innerFunc = ref.current

    return innerFunc(...rest)
  }) as T

  return useCallback(uc, [])
}

const Hooks = () => {
  console.log('Hooks render')

  const [count, setCount] = useState(0)

  // const deferredCount = useDeferredValue(count)
  // console.log('deferredCount', deferredCount)

  const [isPending, setTransition] = useTransition()

  useEffect(() => {
    const container = document.querySelector('.container-s')

    const vnode = h('div', [
      h('svg', { attrs: { width: 100, height: 100 } }, [
        h('use', {
          attrs: { 'xlink:href': '#icon-customvariable' }
        })
      ])
    ])
    // 传入一个空的元素节点 - 将产生副作用（修改该节点）
    patch(container, vnode)
  }, [])

  return (
    <div style={{ height: 500 }} className="border-2">
      {isPending}
      <Button onClick={() => setTransition(() => setCount(1))}>+</Button>
      <div className="container-s"></div>
    </div>
  )
}

export default Hooks
