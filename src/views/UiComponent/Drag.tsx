import { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/css'
import classNames from 'classnames'

const containerEmo = css`
  display: flex;
  flex-direction: column;
  // gap: 20px;
`

const itemEmo = css`
  height: 50px;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  label: itemStyle;
`

const Drag = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current

    let items = [...container.childNodes] as HTMLDivElement[]
    let rects = items.map(o => o.getBoundingClientRect())

    let dragDom: HTMLDivElement
    let dragDomRect: DOMRect
    let cloned: HTMLDivElement

    let dragIndex: number
    let targetIndex: number

    let dragDomTranslateY: number

    const setDragDomStyle = () => {
      dragDom.style.opacity = '0.5'
      dragDom.style.boxShadow = '0 0 2px 2px #ddd'
      dragDom.style.backgroundColor = '#eee'
    }

    setDragDomStyle.reset = () => {
      dragDom.style.opacity = ''
      dragDom.style.boxShadow = ''
      dragDom.style.backgroundColor = ''
    }

    // 鼠标按下时
    container.addEventListener('mousedown', evt => {
      const target = evt.target as HTMLDivElement

      if (target.classList.contains('item')) {
        dragDom = target
        dragDomRect = dragDom.getBoundingClientRect()

        setDragDomStyle()

        cloned = dragDom.cloneNode(true) as HTMLDivElement

        const clonedStyle = {
          position: 'fixed',
          width: `${target.clientWidth}px`,
          left: `${target.getBoundingClientRect().left}px`,
          top: `${target.getBoundingClientRect().top}px`,
          boxShadow: '0 3px 2px 2px #ddd',
          opacity: '1'
        }
        Object.keys(clonedStyle).forEach(key => {
          cloned.style[key] = clonedStyle[key]
        })

        items.forEach(item => {
          item.style.transition = 'all 0.3s'
        })

        // document.body.append(cloned)

        document.addEventListener('mousemove', addCurrMove)
      }
    })

    // 松手时
    document.addEventListener('mouseup', evt => {
      const setRenderData = () => {
        if (dragIndex !== undefined && targetIndex !== undefined) {
          list.splice(targetIndex, 0, list.splice(dragIndex, 1)[0])
          setList([...list])
        }
      }

      document.removeEventListener('mousemove', addCurrMove)

      cloned.style.transition = 'all .3s'
      cloned.style.translate = `0 ${dragDomTranslateY}px`

      items.forEach(item => {
        item.style.translate = ''
      })

      // cloned.remove()

      setDragDomStyle.reset()

      // cloned.ontransitionend = () => {
      //   cloned.remove()
      //   dragDom.style = ''
      // }

      // 真实数据
      // console.log(dragIndex, targetIndex)
      // setRenderData()

      dragIndex = undefined
      targetIndex = undefined

      items.forEach(item => {
        item.style.transition = ''
      })

      // items = [...document.querySelectorAll('.item')] as HTMLDivElement[]
      // rects = items.map(o => o.getBoundingClientRect())
    })

    function addCurrMove(evt: MouseEvent) {
      evt.preventDefault()
      const { clientX, clientY } = evt

      dragIndex = Number(dragDom.getAttribute('data-index'))

      const translateX = clientX - dragDomRect.left - dragDomRect.width / 2
      const translateY = clientY - dragDomRect.top - dragDomRect.height / 2
      cloned.style.translate = `${translateX}px ${translateY}px`

      for (let i = 0; i < rects.length; i++) {
        const rectItem = rects[i]

        if (clientY > rectItem.top && clientY < rectItem.bottom) {
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

          const totalHeight = rects.slice(startIndex, endIndex).reduce((acc, o) => acc + o.height, 0)
          dragDomTranslateY = dragIndex < targetIndex ? totalHeight : -totalHeight
          dragDom.style.translate = `0 ${dragDomTranslateY}px`

          if (startIndex === endIndex) {
            items.forEach(item => {
              item.style.translate = ``
            })
          } else {
            const batchMoveItems = items.slice(startIndex, endIndex)

            const translateY = -dragDomRect.height

            items[targetIndex].style.translate = `0 ${`${
              dragIndex < targetIndex ? translateY : -translateY
            }px`}`

            // batchMoveItems.forEach(item => {
            //   item.style.translate = `0 ${`${translateY}px`}`
            // })

            const needResetItems = items.filter(o => !batchMoveItems.includes(o) && o !== dragDom)
            needResetItems.forEach(item => {
              item.style.translate = ``
            })
          }

          return
        }
      }
    }
  }, [])

  const [list, setList] = useState([0, 1, 2, 3, 4, 5, 6])

  return (
    <div className={containerEmo} ref={containerRef}>
      {list.map((item, index) => (
        <div
          className={classNames(itemEmo, 'item')}
          data-index={index}
          key={item}
          style={{
            height: (() => {
              if (index === 0) return 80
              if (index === 1) return 50
              if (index === 2) return 80
              if (index === 3) return 120
              if (index === 4) return 90
              if (index === 5) return 140
            })()
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Drag
