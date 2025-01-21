import { useEffect } from 'react'
import './style.less'
import { sleepAsync, sleepSync } from '@/utils/utils'

export default function Rmstsd() {
  useEffect(() => {
    const div = document.querySelector('div')
    const overlay = document.querySelector('.overlay')

    const sel = window.getSelection()

    div.onclick = async evt => {
      const range = sel.getRangeAt(0)

      console.log(range)

      const node = range.startContainer

      const aa = splitRange(node, range.startOffset, range.endOffset)

      for (const item of aa) {
        await sleepAsync(2000)
        console.log(item)

        sel.removeAllRanges()

        sel.addRange(item)
      }

      console.log(aa)

      return

      let prevChar = node.textContent[range.startOffset]

      const prevRange = document.createRange()
      prevRange.setStart(node, range.startOffset)
      prevRange.setEnd(node, range.startOffset + 1)

      let prevRectTop = prevRange.getBoundingClientRect().top

      let rows = 1

      let start = range.startOffset
      let end

      const ans = []

      for (let i = range.startOffset; i < range.endOffset; i++) {
        const tempRange = document.createRange()

        tempRange.setStart(node, i)
        tempRange.setEnd(node, i + 1)
        const tempRect = tempRange.getBoundingClientRect()

        if (tempRect.top > prevRectTop) {
          end = i + 1

          ans.push({ start, end })

          start = i

          prevRectTop = tempRect.top
          rows++
        }

        if (i === range.endOffset - 1) {
          ans.push({ start, end: range.endOffset })
        }
      }

      console.log(rows)
      console.log(ans)

      sel.removeAllRanges()

      for (const item of ans) {
        await sleepAsync(2000)
        console.log(item)

        sel.removeAllRanges()
        const range = document.createRange()
        range.setStart(node, item.start)
        range.setEnd(node, item.end)

        sel.addRange(range)
      }

      return

      if (range.collapsed) {
        range.selectNodeContents(range.startContainer)
      }

      const rangeRect = range.getBoundingClientRect()
      const x = evt.clientX
      const y = evt.clientY

      console.log(isHitText(x, y, rangeRect))
    }

    const isHitText = (x, y, rangeRect) => {
      const width = 30
      const height = 20

      const halfWidth = width / 2
      const halfHeight = height / 2

      const points = [
        { x, y },
        { x: x - halfWidth, y: y - halfHeight },
        { x, y: y - halfHeight },
        { x: x + halfWidth, y: y - halfHeight },
        { x: x + halfWidth, y },
        { x: x + halfWidth, y: y + halfHeight },
        { x, y: y + halfHeight },
        { x: x - halfWidth, y: y + halfHeight },
        { x: x - halfWidth, y }
      ]

      overlay.style.left = x - halfWidth + 'px'
      overlay.style.top = y - halfHeight + 'px'
      overlay.style.width = width + 'px'
      overlay.style.height = height + 'px'

      for (const point of points) {
        const { x, y } = point
        const isInRect = x > rangeRect.left && x < rangeRect.right && y > rangeRect.top && y < rangeRect.bottom

        if (isInRect) {
          return true
        }
      }

      return false
    }
  }, [])

  return (
    <div>
      <div className="content">君不见黄河之水天上来，奔流到海不复回</div>

      <div className="overlay"></div>
    </div>
  )
}

// 将一个跨行的 range 切割为多个不跨行的 range
function splitRange(node: Text, startOffset: number, endOffset: number): Range[] {
  const range = document.createRange()
  const rowTop = getCharTop(node, startOffset)
  // 字符数小于两个不用判断是否跨行
  // 头尾高度一致说明在同一行
  if (endOffset - startOffset < 2 || rowTop === getCharTop(node, endOffset - 1)) {
    range.setStart(node, startOffset)
    range.setEnd(node, endOffset)
    return [range]
  } else {
    const last = findRowLastChar(rowTop, node, startOffset, endOffset - 1)
    range.setStart(node, startOffset)
    range.setEnd(node, last + 1)
    const others = splitRange(node, last + 1, endOffset)
    return [range, ...others]
  }
}

// 二分法找到 range 某一行的最右字符
function findRowLastChar(top: number, node: Text, start: number, end: number): number {
  if (end - start === 1) {
    return getCharTop(node, end) === top ? end : start
  }
  const mid = Math.floor((end + start) / 2)
  return getCharTop(node, mid) === top ? findRowLastChar(top, node, mid, end) : findRowLastChar(top, node, start, mid)
}

// 获取 range 某个字符位置的 top 值
function getCharTop(node: Text, offset: number) {
  return getCharRect(node, offset).top
}

// 获取 range 某个字符位置的 DOMRect
function getCharRect(node: Text, offset: number) {
  const range = document.createRange()
  range.setStart(node, offset)
  range.setEnd(node, offset + 1 > node.textContent!.length ? offset : offset + 1)
  return range.getBoundingClientRect()
}
