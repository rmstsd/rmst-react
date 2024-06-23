import { useEffect } from 'react'

function onKeydownOnce(el: HTMLElement) {
  const map = {}
  el.addEventListener('keydown', evt => {
    if (evt.key) {
    }
  })
  el.addEventListener('keyup', evt => {})
}

export default function Km() {
  useEffect(() => {
    let spaceDown = false

    const map = {}

    window.addEventListener('keydown', evt => {
      // if (evt.key == ' ') {
      if (!spaceDown) {
        spaceDown = true
        console.log(11)
      }
      // }
    })

    window.addEventListener('keyup', evt => {
      // if (evt.key == ' ') {
      if (spaceDown) {
        spaceDown = false
      }
      // }
    })

    window.addEventListener('pointerdown', evt => {
      if (spaceDown) {
        console.log(evt)
      }
    })
  }, [])
  return <div>index</div>
}
