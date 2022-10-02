import React, { useState, useEffect } from 'react'
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  Boot,
  DomEditor,
  SlateElement,
  IButtonMenu
} from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { h, VNode } from 'snabbdom'
import { Button } from '@arco-design/web-react'

function withAttachment<T extends IDomEditor>(editor: T) {
  // TS 语法
  // function withAttachment(editor) {                        // JS 语法
  const { isInline, isVoid } = editor
  const newEditor = editor

  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'attachment') return true // 针对 type: attachment ，设置为 inline
    return isInline(elem)
  }

  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'attachment') return true // 针对 type: attachment ，设置为 void
    return isVoid(elem)
  }

  return newEditor // 返回 newEditor ，重要！！！
}

Boot.registerPlugin(withAttachment)
type EmptyText = {
  text: ''
}

export type AttachmentElement = {
  type: 'attachment'
  fileName: string
  link: string
  children: EmptyText[]
}
const myResume: AttachmentElement = {
  type: 'attachment',
  fileName: 'resume.pdf',
  link: 'https://xxx.com/files/resume.pdf',
  children: [{ text: '' }] // void 元素必须有一个 children ，其中只有一个空字符串，重要！！！
}

function renderAttachment(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { fileName = '', link = '' } = elem

  // 附件 icon 图标 vnode
  const iconVnode = h('svg', { attrs: { width: 100, height: 100 } }, [
    h('circle', {
      attrs: {
        cx: 50,
        cy: 50,
        r: 40,
        stroke: 'green',
        'stroke-width': 4,
        fill: 'yellow'
      }
    })
  ])

  // 附件元素 vnode
  const attachVnode = h(
    // HTML tag
    'span',
    // HTML 属性、样式、事件
    {
      props: { contentEditable: false, className: 'attachment' }, // HTML 属性，驼峰式写法
      style: { margin: '0 5px' },
      on: {
        click() {
          console.log('clicked', link)
        }
      }
    },
    // 子节点
    [fileName, iconVnode]
  )

  return attachVnode
}

const renderElemConf = {
  type: 'attachment', // 新元素 type ，重要！！！
  renderElem: renderAttachment
}
Boot.registerRenderElem(renderElemConf)

class MyButtonMenu implements IButtonMenu {
  title = ''
  tag = ''

  constructor() {
    this.title = 'My menu title'
    this.tag = 'button'
  }

  getValue(editor: IDomEditor): string | boolean {
    return ' hello '
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    editor.insertNode(myResume)

    // editor.insertText(value) // value 即 this.value(editor) 的返回值
  }
}

const menu1Conf = {
  key: 'menu1', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new MyButtonMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  }
}
Boot.registerMenu(menu1Conf)

const WangEditor = () => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    if (editor) {
      const toolbar = DomEditor.getToolbar(editor)
      const toolbarConfig = toolbar.getConfig()
      toolbarConfig.insertKeys = {
        index: 8, // 插入的位置，基于当前的 toolbarKeys
        keys: ['menu1']
      }
    }
  }, [editor])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: ['bold', 'blockquote', 'insertLink', 'code', 'headerSelect', 'color']
  } // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...', MENU_CONF: {} }
  editorConfig.MENU_CONF['color'] = {
    colors: ['red', 'pink']
  }

  useEffect(() => {
    if (!editor) return

    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <Button
        onMouseDown={evt => evt.stopPropagation()}
        onClick={() => {
          editor.insertNode(myResume)
        }}
      >
        var
      </Button>

      <Button
        onMouseDown={evt => evt.stopPropagation()}
        onClick={() => {
          console.log(editor.children)
        }}
      >
        打印children
      </Button>

      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>{html}</div>

      <hr />
    </>
  )
}

export default WangEditor
