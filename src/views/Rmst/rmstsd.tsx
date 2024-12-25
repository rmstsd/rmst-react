import decamelize from 'decamelize'
import camelcase from 'camelcase'

const text = 'abc/qwe_hello-World/UserName\\uiOp'

const separator = /-|_|\/|\\/

export default function Rmstsd() {
  const replacement = `$1_$2`

  const decamelized = text.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement)
  const list = decamelized.split(separator).map(item => item.toLowerCase())
  const ss = list.join('-')

  const ans1 = camelcase(ss)
  const ans2 = camelcase(ss, { pascalCase: true })
  const ans3 = ss
  const ans4 = list.join('_')
  const ans5 = list.map(item => camelcase(item, { pascalCase: true })).join('_')

  const ansList = [ans1, ans2, ans3, ans4, ans5].filter(item => item !== text)
  console.log(ansList)

  return <div>ssd</div>
}
