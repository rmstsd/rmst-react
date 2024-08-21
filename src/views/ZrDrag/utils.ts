import { NodeItem } from './oriData'
import { store } from './store'

export const findParentNode = (id: NodeItem['id']): NodeItem => {
  return dfs(store.rootNode)

  function dfs(node: NodeItem, parent = null) {
    if (id === node.id) {
      return parent
    }

    for (const item of node.children ?? []) {
      const res = dfs(item, node)
      if (res) {
        return res
      }
    }
  }
}

export const findNode = (id: NodeItem['id']): NodeItem => {
  return dfs(store.rootNode)

  function dfs(node: NodeItem) {
    if (id === node.id) {
      return node
    }

    for (const item of node.children ?? []) {
      const res = dfs(item)
      if (res) {
        return res
      }
    }
  }
}
