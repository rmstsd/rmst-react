import { useEffect, useMemo, useState } from 'react'
import { SingleWordClass } from './SingleWordClass'
import cn from '@/utils/cn'

interface SingleWordProps {
  word: string
  className?: string
  disabledHoverUpdate?: boolean
}

export function SingleWord({ word, className, disabledHoverUpdate }: SingleWordProps) {
  const [wordList, setWordList] = useState<SingleWordClass['wordList']>([])
  const wordIns = useMemo(() => new SingleWordClass(word), [])

  useEffect(() => {
    wordIns.onUpdate = () => {
      setWordList([...wordIns.wordList])
    }
    wordIns.startRender()
  }, [])

  return (
    <div
      className={cn('w-fit', className)}
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
          {item.char}
        </span>
      ))}
    </div>
  )
}
