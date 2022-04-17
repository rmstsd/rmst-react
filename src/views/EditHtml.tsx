import React, { useRef, useState } from 'react'
import { parseHtml } from '@/utils/parseHtml'

const longStr = `<wnd x:tag="Pane" title="MenuTr ee.t" c:class="Chr"  r:name="MenuTre" />
<wnd x:tag="Document" title="Ch" att="Chrome_R"    />
<uia x:tag="Group"  />
<uia x:tag="Window"  />`

const simpleStr = `<wnd    x:tag="Pane" title="MenuTr ee.t" c:class="Chr" r:name="MenuTre" />`

// 用内存中的 div 辅助完成 边编辑边修改dom
function EditHtml() {
  const editRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [codeArray, setCodeArray] = useState(parseHtml(longStr))
  const [isEdit, setIsEdit] = useState(false)

  // '\xa0' // 判断是不是 &nbsp;
  const commitEdit = () => {
    const { innerText } = editRef.current as HTMLDivElement

    let fins = ''
    for (let i = 0; i < innerText.length; i++) {
      const currChar = innerText[i]
      if (currChar === '\xa0') fins = fins + ' '
      else fins = fins + innerText[i]
    }

    const nv = parseHtml(fins)
    setCodeArray(nv)
    setIsEdit(false)
  }

  const startEdit = () => {
    const previewInnerHTML = previewRef.current?.innerHTML
    setIsEdit(true)

    Promise.resolve().then(() => (editRef.current.innerHTML = previewInnerHTML))
    setTimeout(() => {
      editRef.current?.focus()
    }, 0)
  }

  return (
    <div className="App">
      <button onClick={commitEdit}>编辑完成</button>

      <h1>{isEdit ? '编辑状态' : '预览状态'}</h1>
      <section className="container">
        {isEdit ? (
          <div
            key="ak"
            contentEditable
            className="inner-container edit-box"
            suppressContentEditableWarning
            spellCheck={false}
            ref={editRef}
            onBlur={commitEdit}
          />
        ) : (
          <div key="ui" onClick={startEdit} ref={previewRef} className="inner-container preview-box">
            {codeArray.map((item, idx) => (
              <Row codeItem={item} key={idx} onlyKey={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

type IOptionItem = { name: string; value: string | null }
type IProps = {
  onlyKey: number
  codeItem: {
    name: string | null
    type: string | any
    optionProps: IOptionItem[]
  }
}

const Row: React.FC<IProps> = props => {
  const { codeItem, onlyKey } = props
  return (
    <div className="row" data-key={onlyKey}>
      <span style={{ color: '#7c5000' }}>{`<${codeItem.type}`}</span>
      <span>&nbsp;</span>
      <span style={{ color: 'red' }}>{`x:tag`}</span>
      <span style={{ color: 'black' }}>{`=`}</span>
      <span style={{ color: 'blue' }}>{`"${codeItem.name}"`}</span>
      <span>&nbsp;</span>
      {codeItem.optionProps.map((optionItem, idx) => (
        <React.Fragment key={idx}>
          <span style={{ color: 'red' }}>{optionItem.name}</span>
          <span style={{ color: 'black' }}>{`=`}</span>
          <span style={{ color: 'blue' }}>{`"${optionItem.value}"`}</span>
          <span>&nbsp;</span>
        </React.Fragment>
      ))}
      <span style={{ color: '#7c5000' }}>{'/>'}</span>
    </div>
  )
}

export default EditHtml
