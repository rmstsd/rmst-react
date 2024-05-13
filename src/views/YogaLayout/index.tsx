import { useEffect } from 'react'
import Yoga, { Edge, FlexDirection, Direction, PositionType, Gutter } from 'yoga-layout'

export default function YogaLayout() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const root = Yoga.Node.create()
    root.setFlexDirection(FlexDirection.Row)
    root.setGap(Gutter.All, 10)
    root.setWidth(500)
    root.setHeight(500)
    root.setPadding(Edge.Left, 20)

    const label = Yoga.Node.create()
    label.setWidth(100)
    label.setHeight(100)

    const value = Yoga.Node.create()
    value.setFlexDirection(FlexDirection.Row)
    value.setWidth(200)
    value.setHeight(200)

    const valueInner = Yoga.Node.create()
    valueInner.setWidth(50)
    valueInner.setHeight(50)

    root.insertChild(label, 0)
    root.insertChild(value, 1)
    value.insertChild(valueInner, 0)

    console.log('valueInner', valueInner)

    root.calculateLayout(500, 500, Direction.LTR)

    const labelLayout = label.getComputedLayout()
    console.log(labelLayout)

    const valueLayout = value.getComputedLayout()
    console.log(valueLayout)

    const valueInnerLayout = valueInner.getComputedLayout()
    console.log('valueInnerLayout', valueInner.getComputedLeft())

    const rootLayout = root.getComputedLayout()
    console.log(rootLayout)

    draw()
    function draw() {
      ctx.beginPath()
      ctx.fillStyle = '#ddd'
      ctx.fillRect(rootLayout.left, rootLayout.top, rootLayout.width, rootLayout.height)

      ctx.beginPath()
      ctx.fillStyle = 'pink'
      ctx.fillRect(labelLayout.left, labelLayout.top, labelLayout.width, labelLayout.height)

      ctx.beginPath()
      ctx.fillStyle = 'orange'
      ctx.fillRect(valueLayout.left, valueLayout.top, valueLayout.width, valueLayout.height)

      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.fillRect(valueInnerLayout.left, valueInnerLayout.top, valueInnerLayout.width, valueInnerLayout.height)
    }
  }, [])

  return (
    <div>
      YogaLayout
      <div className="container">
        <canvas width={600} height={600} className="border"></canvas>
      </div>
      <App />
    </div>
  )
}

function App() {
  // 创建树结构
  const rootNode = Yoga.Node.create()
  const firstChildNode = Yoga.Node.create()
  const secondChildNode = Yoga.Node.create()
  const leafNode = Yoga.Node.create()

  // 设置节点的样式和布局属性
  rootNode.setWidth(500)
  rootNode.setHeight(300)

  firstChildNode.setWidth(300)
  firstChildNode.setHeight(200)

  secondChildNode.setWidth(200)
  secondChildNode.setHeight(100)

  leafNode.setWidth(100)
  leafNode.setHeight(50)

  // 将子节点添加到父节点
  rootNode.insertChild(firstChildNode, 0)
  firstChildNode.insertChild(secondChildNode, 0)
  secondChildNode.insertChild(leafNode, 0)

  // 布局计算
  rootNode.calculateLayout(500, 500, Direction.LTR)

  console.log(firstChildNode.getComputedLayout())
  console.log(secondChildNode.getComputedLayout())
  console.log(leafNode.getComputedLayout())

  return null
}
