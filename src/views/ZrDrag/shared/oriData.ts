import { testData } from '../V1/testData'

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
  },
  {
    id: 8,
    title: 'while 循环',
    type: 'while'
  }
]

export function getOriDataById(id: number | string): OriItem {
  id = Number(id)
  return oriData.find(item => item.id === id) as OriItem
}

export const rootNode: NodeItem = testData

export interface NodeItem {
  id: string
  title: string
  type: string
  oriId: number
  children: NodeItem[]
}

export function createNodeItem(oriItem: OriItem): NodeItem {
  return { ...oriItem, id: Math.random().toString(36).slice(4), oriId: oriItem.id, children: [] }
}
