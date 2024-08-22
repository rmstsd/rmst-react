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

// 判断 bNode 是否是 aNode 的后代
export const isDescendant = (aNode: NodeItem, bNode: NodeItem) => {
  if (aNode.id === bNode.id) {
    return false
  }

  return dfs(aNode)

  function dfs(_node: NodeItem) {
    if (_node.id === bNode.id) {
      return true
    }

    for (const item of _node.children) {
      const b = dfs(item)
      if (b) {
        return true
      }
    }
  }
}

export const contains = (aNode: NodeItem, bNode: NodeItem) => {
  return dfs(aNode)

  function dfs(_node: NodeItem) {
    if (_node.id === bNode.id) {
      return true
    }

    for (const item of _node.children) {
      const b = dfs(item)
      if (b) {
        return true
      }
    }
  }
}
