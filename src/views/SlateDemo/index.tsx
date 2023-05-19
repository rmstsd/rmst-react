import { useCallback, useEffect, useState } from 'react'
import { Editor, Element, Text, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'

import type { BaseEditor, Descendant } from 'slate'
import type { ReactEditor } from 'slate-react'
import { CodeElement, DefaultElement, ImageElement, Leaf, LinkElement } from './CustomElement'

type ElementType = 'paragraph' | 'image' | 'link' | 'code'
type CustomElement = { type: ElementType; children: CustomText[]; url?: string }
type CustomText = { text: string; bold?: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello, ' }, { text: 'world', bold: true }, { text: '!' }]
  },
  // {
  //   type: 'image',
  //   url: 'https://rmst.site/assets/b.ad6c04af.jpeg',
  //   children: [{ text: '' }]
  // },
  {
    type: 'link',
    url: 'https://example.com',
    children: [{ text: '百度' }]
  },
  {
    type: 'link',
    url: 'https://example.com',
    children: [{ text: ' 百度2' }]
  }
]

const SlateDemo = () => {
  const [editor] = useState(() => withReact(createEditor()))

  useEffect(() => {
    setTimeout(() => {
      editor.apply({
        type: 'insert_text',
        path: [0, 0],
        offset: 15,
        text: 'A new string of text to be inserted.   '
      })
      return
      const imageElmnts = Editor.nodes(editor, {
        at: [], // Path of Editor
        match: (node, path) => 'image' === node.type
        // mode defaults to "all", so this also searches the Editor's children
      })
      console.log(imageElmnts)
      for (const nodeEntry of imageElmnts) {
        const [imageElementItem, path] = nodeEntry

        const altText =
          imageElementItem.alt ||
          imageElementItem.title ||
          /\/([^/]+)$/.exec(imageElementItem.url)?.[1] ||
          '☹︎'

        Transforms.select(editor, path)

        Editor.insertFragment(editor, [{ text: altText }])
      }
    }, 1000)
  }, [])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'image':
        return <ImageElement {...props} />
      case 'link':
        return <LinkElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={Leaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case 'b': {
              event.preventDefault()

              editor

              const [match] = Editor.nodes(editor, {
                match: n => {
                  console.log(n)
                  return n.bold === true
                }
              })

              console.log(match)

              Transforms.setNodes(
                editor,
                { bold: match ? false : true },
                // Apply it to text nodes, and split the text node up if the selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true }
              )
              break
            }
          }
        }}
      />
    </Slate>
  )
}

export default SlateDemo
