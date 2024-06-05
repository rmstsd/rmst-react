import { useEffect } from 'react'

import './litegraph.css'
import { LiteGraph, LGraph, LGraphCanvas } from './ltg-esm'

export default function Litegraph() {
  useEffect(() => {
    console.log(LiteGraph)

    const graph = new LGraph()

    const canvas = new LGraphCanvas('#mycanvas', graph)

    class MyNode {}
    LiteGraph.registerNodeType('mmy', MyNode)

    const node = LiteGraph.createNode('mmy')
    graph.add(node)
  }, [])

  return (
    <div>
      <canvas id="mycanvas" width={1000} height={500}></canvas>
    </div>
  )
}
