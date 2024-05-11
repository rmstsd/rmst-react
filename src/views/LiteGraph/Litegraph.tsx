import { useEffect } from 'react'
import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js'

import './litegraph.css'

export default function Litegraph() {
  useEffect(() => {
    console.log(LiteGraph)

    const graph = new LGraph()

    const canvas = new LGraphCanvas('#mycanvas', graph)

    const node_const = LiteGraph.createNode('basic/const')
    node_const.pos = [200, 200]
    graph.add(node_const)
    node_const.setValue(4)

    const node_watch = LiteGraph.createNode('basic/watch')
    node_watch.pos = [700, 200]
    graph.add(node_watch)

    // node_const.connect(0, node_watch, 0)

    graph.start()
  }, [])

  return (
    <div>
      <canvas id="mycanvas" width={1000} height={500}></canvas>
    </div>
  )
}
