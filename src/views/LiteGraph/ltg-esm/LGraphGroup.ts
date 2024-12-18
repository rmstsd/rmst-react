import LGraphCanvas from './LGraphCanvas'
import LGraphNode from './LGraphNode'
import { overlapBounding } from './utils/utils'

class LGraphGroup {
  constructor(title) {
    this._ctor(title)
  }

  _ctor(title) {
    this.title = title || 'Group'
    this.font_size = 24
    this.color = LGraphCanvas.node_colors.pale_blue ? LGraphCanvas.node_colors.pale_blue.groupcolor : '#AAA'
    this._bounding = new Float32Array([10, 10, 140, 80])
    this._pos = this._bounding.subarray(0, 2)
    this._size = this._bounding.subarray(2, 4)
    this._nodes = []
    this.graph = null

    Object.defineProperty(this, 'pos', {
      set(v) {
        if (!v || v.length < 2) {
          return
        }
        this._pos[0] = v[0]
        this._pos[1] = v[1]
      },
      get() {
        return this._pos
      },
      enumerable: true
    })

    Object.defineProperty(this, 'size', {
      set(v) {
        if (!v || v.length < 2) {
          return
        }
        this._size[0] = Math.max(140, v[0])
        this._size[1] = Math.max(80, v[1])
      },
      get() {
        return this._size
      },
      enumerable: true
    })
  }

  configure({ title, bounding, color, font_size }) {
    this.title = title
    this._bounding.set(bounding)
    this.color = color
    this.font_size = font_size
  }

  serialize() {
    const b = this._bounding
    return {
      title: this.title,
      bounding: [Math.round(b[0]), Math.round(b[1]), Math.round(b[2]), Math.round(b[3])],
      color: this.color,
      font_size: this.font_size
    }
  }

  move(deltax, deltay, ignore_nodes) {
    this._pos[0] += deltax
    this._pos[1] += deltay
    if (ignore_nodes) {
      return
    }

    for (const node of this._nodes) {
      node.pos[0] += deltax
      node.pos[1] += deltay
    }
  }

  recomputeInsideNodes() {
    this._nodes.length = 0
    const nodes = this.graph._nodes
    const node_bounding = new Float32Array(4)

    for (const node of nodes) {
      node.getBounding(node_bounding)
      if (!overlapBounding(this._bounding, node_bounding)) {
        continue
      } // out of the visible area
      this._nodes.push(node)
    }
  }
}

LGraphGroup.prototype.isPointInside = LGraphNode.prototype.isPointInside
LGraphGroup.prototype.setDirtyCanvas = LGraphNode.prototype.setDirtyCanvas

export default LGraphGroup
