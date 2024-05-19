import { useEffect } from 'react'
import Yoga, { Edge, FlexDirection, Direction, PositionType, Gutter } from 'yoga-layout'
import { Stage, TextNode, ViewNode } from './rmst-render'

export default function YogaLayout() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const root = Yoga.Node.create()
    root.setFlexDirection(FlexDirection.Row)
    root.setGap(Gutter.All, 10)
    root.setWidth(350)
    // root.setHeight(500)
    root.setMargin(Edge.Top, 10)
    root.setMargin(Edge.Left, 10)
    root.setPadding(Edge.Top, 10)
    // root.setPadding(Edge.Right, 10)
    root.setPadding(Edge.Left, 20)

    const label = Yoga.Node.create()
    label.setWidth(100)
    label.setHeight(100)

    const value = Yoga.Node.create()
    value.setFlexDirection(FlexDirection.Row)
    value.setWidth(200)
    value.setHeight(200)
    value.setMargin(Edge.Right, 30)
    // value.setPadding(Edge.Top, 20)

    const valueInner = Yoga.Node.create()
    valueInner.setWidth(50)
    valueInner.setHeight(50)
    valueInner.setPadding(Edge.Left, 10)
    valueInner.setPadding(Edge.Top, 20)

    root.insertChild(label, 0)
    root.insertChild(value, 1)
    value.insertChild(valueInner, 0)

    console.log('valueInner', valueInner)

    root.calculateLayout(undefined, undefined)

    const labelLayout = label.getComputedLayout()
    console.log(labelLayout)

    const valueLayout = value.getComputedLayout()
    console.log('valueLayout', valueLayout)

    const valueInnerLayout = valueInner.getComputedLayout()
    console.log('valueInnerLayout', valueInner.getComputedLeft())

    const rootLayout = root.getComputedLayout()
    console.log('rootLayout', rootLayout)

    draw()
    function draw() {
      ctx.beginPath()
      ctx.fillStyle = '#ddd'
      ctx.fillRect(rootLayout.left, rootLayout.top, rootLayout.width, rootLayout.height)

      ctx.translate(rootLayout.left, rootLayout.top)

      ctx.beginPath()
      ctx.fillStyle = 'pink'
      ctx.fillRect(labelLayout.left, labelLayout.top, labelLayout.width, labelLayout.height)

      ctx.beginPath()
      ctx.fillStyle = 'orange'
      ctx.fillRect(valueLayout.left, valueLayout.top, valueLayout.width, valueLayout.height)

      ctx.save()
      ctx.translate(valueLayout.left, valueLayout.top)

      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.fillRect(valueInnerLayout.left, valueInnerLayout.top, valueInnerLayout.width, valueInnerLayout.height)

      ctx.textBaseline = 'top'
      ctx.translate(
        valueInnerLayout.left + valueInner.getPadding(Edge.Left).value,
        valueInnerLayout.top + valueInner.getPadding(Edge.Left).value
      )
      ctx.fillStyle = 'white'
      ctx.fillText('哈哈', 0, 0)

      ctx.restore()
    }
  }, [])

  useEffect(() => {
    console.log('----')
    const stage = new Stage(document.querySelector('.canvas'), {
      backgroundColor: 'orange',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 20,
      paddingBottom: 20,
      marginTop: 10,
      marginLeft: 10
    })

    const text = new TextNode('Abcjliyu人美声甜', {
      backgroundColor: '#eee',
      color: 'red',
      // marginLeft: 15,
      // marginTop: 20,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingTop: 10,
      marginLeft: 10,
      marginTop: 10,
      marginRight: 10
    })
    const view = new ViewNode({
      backgroundColor: 'pink',
      flexDirection: 'row',
      gap: 10
      // paddingTop: 10,
      // paddingLeft: 40,
      // paddingRight: 10,
      // paddingBottom: 40
    })
    view.append(text)

    // const view_2 = new ViewNode({ backgroundColor: 'purple', height: 100 })
    // view.append(view_2)

    // const text_2 = new TextNode('干了兄弟们', {
    //   backgroundColor: '#eee',
    //   color: 'blue',
    //   paddingRight: 10,
    //   paddingBottom: 10,
    //   paddingLeft: 20,
    //   paddingTop: 10,
    //   marginTop: 10,
    //   marginLeft: 10,
    //   marginRight: 15
    // })

    // view_2.append(text_2)

    stage.append(view)
    console.log(stage)
  }, [])

  return (
    <div>
      <>YogaLayout</>

      <div className="container">
        <canvas width={500} height={400} className="border"></canvas>
      </div>

      <canvas className="canvas border" width={800} height={400}></canvas>
      {/* <App /> */}
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
