import React, { EventHandler, FocusEventHandler, useState } from 'react'
import logo from './logo.svg'

function parserString(str: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html')

  const elementArray: Element[] = []
  let parent = doc.body.firstElementChild
  while (parent) {
    elementArray.push(parent)
    parent = parent.firstElementChild
  }

  console.log(elementArray)

  const ans = elementArray.map(item => {
    const name = item.getAttribute('x:tag')
    const type = item.tagName.toLowerCase()

    const attrArray = item.getAttributeNames()
    attrArray.splice(
      attrArray.findIndex(item => item === 'x:tag'),
      1
    )
    const attrValueArray = attrArray.map(attr => ({ [attr]: item.getAttribute(attr) }))
    const optionProps = attrValueArray.map(item => {
      const [[key, value]] = Object.entries(item)

      let name = ''
      let pattern = ''
      if (key.startsWith('c:')) {
        name = key.slice(2)
        pattern = 'Contain'
      } else if (key.startsWith('r:')) {
        name = key.slice(2)
        pattern = 'Regular'
      } else {
        name = key
        pattern = 'Equal'
      }

      return { name, pattern, value, selected: true }
    })

    return { name, type, optionProps, unSelected: false }
  })

  return ans
}
const longStr = `<wnd x:tag="Pane" title="MenuTr ee.t" c:class="Chr"  r:name="MenuTre" /><wnd x:tag="Document" title="Ch" att="Chrome_R"    /><uia x:tag="Group"  /> <uia x:tag="Window"  />`
function App() {
  const [count, setCount] = useState(0)

  const [codeArray, setCodeArray] = useState(parserString(longStr))
  console.log(codeArray)

  const onBlur: FocusEventHandler<HTMLDivElement> = evt => {
    const str = evt.target.innerText
    console.log(str)

    const array = parserString(str)
    setCodeArray(array)
  }

  return (
    <div className="App">
      <div
        className="container"
        contentEditable
        suppressContentEditableWarning
        style={{ border: '2px solid purple', height: 500, padding: 10 }}
        spellCheck={false}
        onBlur={onBlur}
      >
        {codeArray.map((item, idx) => (
          <Row codeItem={item} key={idx} />
        ))}
      </div>
    </div>
  )
}

type IOptionItem = { name: string; pattern: string; value: string | null; selected: boolean }
type IProps = {
  codeItem: {
    name: string | null
    type: string
    optionProps: IOptionItem[]
    unSelected: boolean
  }
}

const Row: React.FC<IProps> = props => {
  const { codeItem } = props
  return (
    <div className="row">
      <span style={{ color: '#7c5000' }}>{`<${codeItem.type}`}</span>&nbsp;
      <span style={{ color: 'red' }}>{`x:tag`}</span>
      <span style={{ color: 'black' }}>{`=`}</span>
      <span style={{ color: 'blue' }}>{`"${codeItem.name}"`}</span>&nbsp;
      {/*  */}
      {codeItem.optionProps.map((optionItem, idx) => (
        <React.Fragment key={idx}>
          <span style={{ color: 'red' }}>{optionItem.name}</span>
          <span style={{ color: 'black' }}>{`=`}</span>
          <span style={{ color: 'blue' }}>{`"${optionItem.value}"`}</span>&nbsp;
        </React.Fragment>
      ))}
      {/*  */}
      <span style={{ color: '#7c5000' }}>{' />'}</span>
    </div>
  )
}

export default App
