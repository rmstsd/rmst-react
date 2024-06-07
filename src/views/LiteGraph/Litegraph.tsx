import { useEffect } from 'react'

import './litegraph.css'
import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from './ltg-esm'

export default function Litegraph() {
  useEffect(() => {
    console.log(LiteGraph)

    const graph = new LGraph()

    const canvas = new LGraphCanvas('#mycanvas', graph)

    class MyNode {
      constructor() {}
      onDrawForeground(ctx: CanvasRenderingContext2D, visible_rect) {
        // console.log(visible_rect)
        ctx.fillRect(0, 0, 10, 10)
      }
      onDrawBackground(ctx: CanvasRenderingContext2D, visible_area) {
        // ctx.fillRect(0, 0, 10, 10)
      }
    }
    LiteGraph.registerNodeType('mmy', MyNode)

    const node = LiteGraph.createNode('mmy', 'a')
    console.log(node)
    graph.add(node)
  }, [])

  return (
    <div>
      <canvas id="mycanvas" width={1000} height={500}></canvas>
    </div>
  )
}
