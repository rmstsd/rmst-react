import { useEffect } from 'react'
import Yoga, { Edge, FlexDirection, Gutter } from 'yoga-layout'

export const useStudy = () => {
  useEffect(() => {
    return
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

  return (
    <div className="container">
      <canvas width={500} height={400} className="border" />
    </div>
  )
}
