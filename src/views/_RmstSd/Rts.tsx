import { useState } from 'react'
import { Transition } from 'react-transition-group'

export default function Rts() {
  const [inProp, setInProp] = useState(false)

  return (
    <div className="p-4">
      <button onClick={() => setInProp(!inProp)} className="mb-4 rounded-md bg-blue-500 px-4 py-2 text-white">
        切换动画
      </button>

      <Transition in={inProp} timeout={500} unmountOnExit>
        {state => (
          <div
            style={{
              backgroundColor: 'lightblue',
              padding: '20px',
              borderRadius: '8px',
              transition: 'all 0.5s ease-in-out',
              opacity: state === 'entering' || state === 'entered' ? 1 : 0,
              transform: state === 'entering' || state === 'entered' ? 'translateX(0)' : 'translateX(-100px)'
            }}
          >
            <h2 style={{ margin: 0 }}>动画内容</h2>
            <p>这是一个使用react-transition-group实现的动画效果</p>
          </div>
        )}
      </Transition>
    </div>
  )
}
