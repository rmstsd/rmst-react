import React from 'react'
import Yoga, { Edge, Node } from 'yoga-layout'
import { Layout, NodeType, setYogaNodeLayoutStyle } from './constant'
import { ViewNode } from './ViewNode'
import { TextNode } from './TextNode'

export * from './TextNode'
export * from './ViewNode'

export class Stage {
  constructor(canvas: HTMLCanvasElement, style?: React.CSSProperties) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.yogaNode = Yoga.Node.create()

    setYogaNodeLayoutStyle(this.yogaNode, style)

    this.ctx.font = '48px 微软雅黑'

    this.style = style
  }

  nodeType = NodeType.ViewNode

  style: React.CSSProperties

  yogaNode: Node

  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  children: (ViewNode | TextNode)[] = []

  append(node: ViewNode | TextNode) {
    this.yogaNode.insertChild(node.yogaNode, this.children.length)
    this.children.push(node)

    this.draw()
  }

  layout: Layout

  setLayout() {
    // 处理文字
    const setText = node => {
      if (node.nodeType === NodeType.TextNode) {
        node.setText(this.ctx)
      }
      if (node.children) {
        node.children.forEach(item => {
          setText(item)
        })
      }
    }
    setText(this)

    this.yogaNode.calculateLayout(undefined, undefined)

    const setChildrenLayout = children => {
      if (!children) {
        return
      }

      children.forEach(item => {
        item.setLayout()

        setChildrenLayout(item.children)
      })
    }
    setChildrenLayout(this.children)

    this.layout = this.yogaNode.getComputedLayout()
  }

  draw() {
    this.setLayout()

    const ctx = this.ctx
    ctx.textBaseline = 'hanging'

    const drawNode = (node: Stage | TextNode) => {
      ctx.fillStyle = node.style?.backgroundColor ?? 'transparent'

      const { layout } = node

      ctx.beginPath()
      ctx.rect(layout.left, layout.top, layout.width, layout.height)
      ctx.fill()

      if (node.nodeType === NodeType.TextNode) {
        ctx.beginPath()
        ctx.save()

        const tx = node.yogaNode.getPadding(Edge.Left).value || 0
        const ty = node.yogaNode.getPadding(Edge.Top).value || 0
        ctx.translate(node.layout.left, node.layout.top)

        ctx.fillStyle = node.style?.color ?? '#333'
        ctx.fillText(node.content, tx, ty)

        ctx.restore()
      }

      if (node.children) {
        ctx.save()
        ctx.translate(node.layout.left, node.layout.top)

        node.children.forEach(item => {
          drawNode(item)
        })

        ctx.restore()
      }
    }

    drawNode(this)
  }
}