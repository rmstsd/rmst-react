import { configure, makeAutoObservable } from 'mobx'
import { genNodeItem, getOriDataById, type NodeItem, rootNode } from '../shared/oriData'

configure({ enforceActions: 'never' })

export const DataSourceAttrName = 'data-source-id'

export const isRootNode = (node: NodeItem) => node.type === 'root'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  draggedNode: NodeItem | null = null

  rootNode = rootNode

  pos = { x: 0, y: 0 }

  init() {
    document.addEventListener('pointerdown', evt => {
      const target = evt.target as HTMLElement
      const sourceELement = target.closest(`[${DataSourceAttrName}]`)
      if (sourceELement) {
        const sourceId = sourceELement.getAttribute(DataSourceAttrName)
        this.draggedNode = genNodeItem(getOriDataById(sourceId))

        console.log(this.draggedNode)

        this.pos.x = evt.clientX
        this.pos.y = evt.clientY
      }
    })
    document.addEventListener('pointermove', evt => {
      if (this.draggedNode) {
        this.pointerDrag(evt)
      }
    })
    document.addEventListener('pointerup', evt => {
      this.draggedNode = null
    })
  }

  pointerDrag(evt: PointerEvent) {
    const target = evt.target as HTMLElement

    this.pos.x = evt.clientX
    this.pos.y = evt.clientY
  }
}

export const store = new Store()
