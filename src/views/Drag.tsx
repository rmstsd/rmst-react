import { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/css'
import classNames from 'classnames'
import { Button } from '@arco-design/web-react'

const Drag = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const domListRef = useRef<{ dom: HTMLDivElement; rect: DOMRect }[]>()

  useEffect(() => {
    const container = containerRef.current

    const domList = ([...container.childNodes] as HTMLDivElement[]).map(item => ({
      dom: item,
      rect: item.getBoundingClientRect()
    }))
    domListRef.current = domList

    let dragDom: HTMLDivElement
    let dragDomRect: DOMRect

    let dragIndex: number
    let targetIndex: number

    // 鼠标按下时
    container.addEventListener('mousedown', evt => {
      const target = evt.target as HTMLDivElement

      if (target.classList.contains('item')) {
        dragDom = target
        dragDomRect = dragDom.getBoundingClientRect()

        domList.forEach(item => {
          item.dom.style.transition = 'all 0.3s ease-out'
        })

        document.addEventListener('mousemove', addCurrMove)
      }
    })

    // 松手时
    document.addEventListener('mouseup', evt => {
      document.removeEventListener('mousemove', addCurrMove)

      domList.forEach(item => {
        item.dom.style.translate = ''
        item.dom.style.transition = ''
      })

      dragIndex = undefined
      targetIndex = undefined
    })

    function addCurrMove(evt: MouseEvent) {
      evt.preventDefault()
      const { clientX, clientY } = evt

      dragIndex = Number(dragDom.getAttribute('data-index'))

      for (let i = 0; i < domList.length; i++) {
        const targetRectItem = domList[i].rect

        if (clientY > targetRectItem.top && clientY < targetRectItem.bottom) {
          targetIndex = i

          console.log('dragIndex: ', dragIndex, 'targetIndex: ', targetIndex)

          let startIndex: number
          let endIndex: number

          if (dragIndex < targetIndex) {
            startIndex = dragIndex + 1
            endIndex = targetIndex + 1
          } else {
            startIndex = targetIndex
            endIndex = dragIndex
          }

          const dragDomTranslateY =
            dragIndex < targetIndex
              ? targetRectItem.bottom - dragDomRect.bottom
              : targetRectItem.top - dragDomRect.top

          dragDom.style.translate = `0 ${dragDomTranslateY}px`

          if (startIndex === endIndex) {
            domList.forEach(item => {
              item.dom.style.translate = ``
            })

            return
          }

          console.log('触发 sort')

          const translateY = (() => {
            if (dragIndex < targetIndex) return dragDomRect.top - domList[dragIndex + 1].rect.top
            else return dragDomRect.bottom - domList[dragIndex - 1].rect.bottom
          })()

          domList[targetIndex].dom.style.translate = `0 ${translateY}px`

          const batchMoveItems = domList.slice(startIndex, endIndex)
          const needResetItems = domList.filter(o => !batchMoveItems.includes(o) && o.dom !== dragDom)
          needResetItems.forEach(item => {
            item.dom.style.translate = ``
          })
        }
      }
    }
  }, [])

  const [list, setList] = useState([0, 1, 2, 3, 4, 5, 6])

  const moveItem = () => {
    const moveList = domListRef.current //.slice(1, 4)
  }

  return (
    <div>
      {/* <Button onClick={moveItem}>0 - 5</Button> */}

      <div className={classNames(containerEmo, 'border')} ref={containerRef}>
        {list.map((item, index) => (
          <div
            className={classNames(itemEmo, 'item')}
            data-index={index}
            key={item}
            style={{ height: 20 * (index + 1), marginTop: 10 * (index + 1) }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drag

const containerEmo = css`
  display: flex;
  flex-direction: column;
  // gap: 20px;
`

const itemEmo = css({
  height: 50,
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  label: 'itemStyle'
})
