import { useEffect, useMemo, useRef, useState } from 'react'
// import { Jodit } from 'jodit'
import JoditEditor from 'jodit-react'

export default function JoditDemo() {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typings...',
      textIcons: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      language: 'zh_cn'
    }),
    []
  )

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={newContent => {
        console.log(newContent)
      }}
    />
  )
}
