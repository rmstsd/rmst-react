import type React from 'react'
import type { Node } from 'yoga-layout'

import Yoga, { Edge } from 'yoga-layout'

import type { Layout } from './constant'
import type { ParsedTextStyleProps } from './TextService/inteface'

import { NodeType, setYogaNodeLayoutStyle } from './constant'
import { TextService } from './TextService'

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

  setText(ctx: CanvasRenderingContext2D) {
    // https://g.antv.antgroup.com/zh/examples/shape/text/#text-overflow
    const tes = new TextService(document.createElement('canvas'))

    const op: ParsedTextStyleProps = {}

    if (this.style.width) {
      op.wordWrap = true
      op.wordWrapWidth = this.style.width as number
    }
    const ans = tes.measureText(this.content, {
      fontSize: parseInt(ctx.font),
      fontFamily: '微软雅黑',
      ...op
    })

    const { textWidth, textHeight } = measureText(ctx, this.content)

    const paddingAll = this.yogaNode.getPadding(Edge.All).value || 0

    const paddingLeft = this.yogaNode.getPadding(Edge.Left).value || 0 || paddingAll
    const paddingTop = this.yogaNode.getPadding(Edge.Top).value || 0 || paddingAll
    const paddingRight = this.yogaNode.getPadding(Edge.Right).value || 0 || paddingAll
    const paddingBottom = this.yogaNode.getPadding(Edge.Bottom).value || 0 || paddingAll

    setYogaNodeLayoutStyle(this.yogaNode, {
      width: textWidth + paddingLeft + paddingRight,
      height: textHeight + paddingTop + paddingBottom
    })
  }

  setLayout() {
    this.layout = this.yogaNode.getComputedLayout()
  }
}
