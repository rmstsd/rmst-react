const item = {
  id: 1,
  title: '打开网页',
  type: 'openWeb'
}

type OriItem = typeof item
export const oriData = [
  item,
  {
    id: 2,
    title: '填写输入框',
    type: 'input'
  },
  {
    id: 3,
    title: '点击元素',
    type: 'input'
  },
  {
    id: 4,
    title: '关闭进程',
    type: 'input'
  },
  {
    id: 5,
    title: '删除空格',
    type: 'input'
  },
  {
    id: 6,
    title: '发送请求',
    type: 'input'
  },
  {
    id: 7,
    title: '如果',
    type: 'if'
  }
]

export const rootNode: NodeItem = {
  id: 'root',
  title: '根节点',
  type: 'root',
  children: []
}

export type NodeItem = {
  id: string
  title: string
  type: string
  children: NodeItem[]
}

export function genNodeItem(oriItem: OriItem): NodeItem {
  return { ...oriItem, id: Math.random().toString(36).slice(4), children: [] }
}
