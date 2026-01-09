import { Button, Dialog, Popup } from '@quarkd/quark-react'
import { useState } from 'react'

export default function Quark() {
  const [open, setOpen] = useState(false)
  const showDialog = () => {
    setOpen(true)
  }

  const handleConfirm = () => {
    setOpen(false)
  }

  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button type="primary" onClick={showDialog}>
        基础弹窗
      </Button>
      <Popup
        open={open}
        onClose={handleClose}
        onClickoverlay={handleClose}
        onClosed={() => {
          console.log('onClosed')
        }}
        onOpened={() => {
          console.log('onOpened')
        }}
      >
        <div
          onClick={() => {
            console.log(245)
          }}
        >
          第二行
        </div>
        <div>第三行</div>
        <div>第四行</div>
        <div>第五行</div>
        <div>第六行</div>
      </Popup>
    </div>
  )
}
