import { useEffect } from 'react'

import './litegraph.css'
import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from './ltg-esm'

const articles = [
  { id: 12, name: '早上吃什么对身体更健康' },
  { id: 23, name: '赌神' }
]

const videos = [
  { id: 92, name: '王者荣耀五杀视频' },
  { id: 73, name: 'react 教程视频' }
]

const rootUser = {
  id: 1008,
  name: 'rmst',
  collectArticles: [12, 23],
  collectVideos: [92, 73]
}

const renderedData = {
  rootUser,
  cardList: [...articles, ...videos]
}

class MyNode {
  onDrawForeground(ctx: CanvasRenderingContext2D, visible_rect) {
    // console.log(visible_rect)
    // ctx.fillRect(0, 0, 10, 10)
  }

  onDrawBackground(ctx: CanvasRenderingContext2D, visible_area) {
    // ctx.fillRect(0, 0, 10, 10)
  }
}

export default function LgDemo() {
  useEffect(() => {
    const graph = new LGraph()

    const canvas = new LGraphCanvas('.canvas', graph)

    LiteGraph.registerNodeType(MyNode.name, MyNode)

    const { rootUser, cardList } = renderedData

    const rootNode = LiteGraph.createNode(MyNode.name, String(rootUser.id))
    rootNode.formValues = rootUser
    rootNode.id = rootUser.id
    console.log('rootNode', rootNode)
    graph.add(rootNode)

    rootNode.addOutput('asd', 's')

    cardList.forEach(item => {
      const itemNode = LiteGraph.createNode(MyNode.name, String(item.id))
      itemNode.formValues = item
      itemNode.id = item.id
      graph.add(itemNode)

      itemNode.addInput('ttt', 's')
    })

    graph.arrange(30)
  }, [])

  return (
    <div>
      <canvas className="canvas" width={1000} height={800} />
    </div>
  )
}
