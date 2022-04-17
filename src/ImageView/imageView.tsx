import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

let el: HTMLDivElement = null

const ImageView = src => {
  if (!el) {
    el = document.createElement('div')
    document.body.append(el)
  }

  const Image = () => {
    const [visible, setVisible] = useState(true)

    return (
      <div
        className="mask"
        style={{
          display: visible ? 'flex' : 'none'
        }}
        onClick={() => setVisible(false)}
      >
        {/* <img src={src} style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
      </div>
    )
  }
  ReactDOM.render(<Image />, el)
}

export default ImageView
