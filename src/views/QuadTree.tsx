// 四叉树算法

import { Input } from '@arco-design/web-react'
import Quadtree from '@timohausmann/quadtree-js'
import { memo, useEffect, useRef, useState, useTransition } from 'react'
import { sleep } from '../utils/utils'

const QuadTree = () => {
  useEffect(() => {
    const myTree = new Quadtree({ x: 0, y: 0, width: 640, height: 480 }, 4, 10)

    console.log(myTree)

    myTree.insert({ x: 100, y: 100, width: 100, height: 100 })

    const myCursor = { x: 0, y: 0, width: 20, height: 20 }

    const candidates = myTree.retrieve(myCursor)

    console.log(candidates)
  }, [])

  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const dRef = useRef(false)

  useEffect(() => {
    document.addEventListener('mousemove', evt => {
      if (dRef.current) {
        setTranslate(state => ({
          x: state.x + evt.movementX,
          y: state.y + evt.movementY
        }))
      }
    })
    document.addEventListener('mouseup', () => {
      dRef.current = false
    })
  }, [])

  const [list, setList] = useState([1, 2, 3])

  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <h1>Quadtree</h1>

      <Input type="text" />

      <div
        style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
        className="w-[100px] h-[100px] bg-pink-300"
        onMouseDown={() => {
          startTransition(() => {
            setList(Array.from({ length: 1000 }, (_, index) => index))
          })

          dRef.current = true
        }}
      />

      {String(isPending)}

      <div className="flex flex-wrap">
        {list.map((item, index) => (
          <Child key={index} text={item} />
        ))}
      </div>
    </div>
  )
}

export default QuadTree

const Child = memo(({ text }) => {
  sleep(1)

  return <span>{text}</span>
})
