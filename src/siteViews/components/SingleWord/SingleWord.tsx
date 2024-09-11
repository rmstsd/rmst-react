import cn from '@/utils/cn'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { SingleWordClass } from './SingleWordClass'

interface SingleWordProps {
  word: string
  className?: string
  disabledHoverUpdate?: boolean
}

const SingleWord = forwardRef<SingleWordClass, SingleWordProps>((props, ref) => {
  const { word, className, disabledHoverUpdate } = props

  const [wordList, setWordList] = useState<SingleWordClass['wordList']>([])
  const wordIns = useMemo(() => new SingleWordClass(word), [])

  useImperativeHandle(ref, () => wordIns)

  useEffect(() => {
    setWordList([...wordIns.wordList])
    wordIns.onUpdate = () => {
      setWordList([...wordIns.wordList])
    }
    wordIns.startRender()
  }, [])

  return (
    <div
      className={cn('inline-block w-fit', className)}
      onMouseEnter={() => {
        if (disabledHoverUpdate) {
          return
        }
        wordIns.startRender()
      }}
      style={{ color: 'rgb(205, 247, 255)' }}
    >
      {wordList.map((item, index) => (
        <span key={index} className={cn(!item.visible && 'invisible')}>
          { item.char }
        </span>
      ))}
    </div>
  )
})

export default SingleWord
