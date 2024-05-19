import Yoga, { Node } from 'yoga-layout'
import { Layout, NodeType, setYogaNodeLayoutStyle } from './constant'
import { TextNode } from './TextNode'

export class ViewNode {
  constructor(style?: React.CSSProperties) {
    this.style = style

    this.yogaNode = Yoga.Node.create()
    setYogaNodeLayoutStyle(this.yogaNode, style)
  }

  parent: ViewNode

  nodeType = NodeType.ViewNode

  yogaNode: Node

  style: React.CSSProperties = {}

  layout: Layout

  children: (TextNode | ViewNode)[] = []

  setLayout() {
    this.layout = this.yogaNode.getComputedLayout()
  }

  append(node: TextNode | ViewNode) {
    this.yogaNode.insertChild(node.yogaNode, this.children.length)
    this.children.push(node)
  }
}
