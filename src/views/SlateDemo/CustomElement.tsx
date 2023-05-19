import { useCallback, useEffect, useState } from 'react'
import { Editor, Element, Text, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'

import type { BaseEditor, Descendant } from 'slate'
import type { ReactEditor } from 'slate-react'

export const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export const ImageElement = ({ attributes, children, element }) => {
  const { url } = element

  return (
    <span {...attributes}>
      <img src={url} alt={url} style={{ width: 100 }} />
      {children}
    </span>
  )
}

export const LinkElement = ({ attributes, children, element }) => {
  return (
    <span {...attributes} contentEditable={false}>
      <a href={element.url} target="_blank">
        {children}
      </a>
    </span>
  )
}

export const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component to render leaves with bold text.
export const Leaf = (props: RenderLeafProps) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  )
}
