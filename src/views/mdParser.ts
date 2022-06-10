import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export const parserMdString = (mdString: string) => {
  const parseResult = md.parse(mdString, '')

  const slateArray = []

  // nesting: 1 是开标签，0 是自闭合标签，-1 是关标签
  // 先提取出每一行 nesting 为 1 到 -1 之间的 -栈思想

  const rowTokens = []

  let singleRow = []

  parseResult.forEach(item => {
    if (item.nesting === 1) singleRow.push(item)
    if (item.nesting === 0) singleRow.push(item)
    if (item.nesting === -1) {
      singleRow.push(item)
      rowTokens.push(singleRow)
      singleRow = []
    }
  })

  console.log(parseResult)
  console.log(rowTokens)
}
