import Yoga, { Node } from 'yoga-layout'
import { Layout, NodeType, setYogaNodeLayoutStyle } from './constant'

import React from 'react'

function measureText(ctx, text) {
  const metrics = ctx.measureText(text)
  const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || parseInt(ctx.font)
  const textWidth = metrics.width

  return { textWidth, textHeight }
}

export class TextNode {
  constructor(content: string, style?: React.CSSProperties & { color: string }) {
    this.yogaNode = Yoga.Node.create()
    this.content = content
    this.style = style

    setYogaNodeLayoutStyle(this.yogaNode, style)
  }

  yogaNode: Node

  style: React.CSSProperties = {}
  nodeType = NodeType.TextNode

  content: string

  layout: Layout

  setText(ctx) {
    const { textWidth, textHeight } = measureText(ctx, this.content)

    const { paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0 } = this.style

    setYogaNodeLayoutStyle(this.yogaNode, {
      width: textWidth + paddingLeft + paddingRight,
      height: textHeight + paddingTop + paddingBottom
    })
  }

  setLayout() {
    this.layout = this.yogaNode.getComputedLayout()
  }
}
