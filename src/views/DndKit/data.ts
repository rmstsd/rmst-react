const dt = {
  id: 481,
  commandName: '测试菜单节点',
  commandType: 'play'
}

export type CommandNode = typeof dt
export const commandData = [
  {
    id: 3,
    commandName: '打开新网页',
    commandType: 'openWeb'
  },
  {
    id: 9,
    commandName: '填写输入框',
    commandType: 'input'
  },
  {
    id: 6,
    commandName: 'for 循环',
    commandType: 'forloop'
  }
]
