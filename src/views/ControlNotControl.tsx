import { useState } from 'react'
import { Button } from '@arco-design/web-react'
const imgMap = {
  long: 'https://naturobot-studio.oss-cn-shanghai.aliyuncs.com/test1230/image_library/2022-04-27/a37c5ded-1ece-419e-b4e2-b4c1a05e10c1.png',
  high: 'https://naturobot-studio.oss-cn-shanghai.aliyuncs.com/test1230/image_library/2022-04-27/e24fbe86-e45b-4dcd-92fe-f4b236be0d8f.png',
  small:
    'https://naturobot-studio.oss-cn-shanghai.aliyuncs.com/test1230/image_library/2022-04-27/63ac3764-66e6-4751-a41c-31c0b479bef4.png'
}

function ControlNotControl() {
  const [img, setImg] = useState(imgMap.long)

  return (
    <div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Button onClick={() => setImg(imgMap.long)}>长图</Button>
        <Button onClick={() => setImg(imgMap.high)}>高图</Button>
        <Button onClick={() => setImg(imgMap.small)}>小图</Button>
      </div>

      <div
        style={{
          height: 140,
          width: 500,
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          position: 'relative',
          border: '1px solid red'
        }}
      >
        <div style={{ display: 'inline-block' }}>
          <img
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              border: '1px solid blue'
            }}
            src={img}
          />
        </div>
      </div>
    </div>
  )
}

export default ControlNotControl

const Com = props => {
  const { bool, setBool } = props

  const [innerBool, setInnerBool] = useState(false)

  const finalBool = bool !== undefined ? bool : innerBool

  return (
    <div>
      <Button
        onClick={() => {
          if (bool !== undefined) {
            setBool && setBool()
          } else setInnerBool(!innerBool)
        }}
      >
        {String(finalBool)}
      </Button>
    </div>
  )
}
