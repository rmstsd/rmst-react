import { Input } from '@arco-design/web-react'
import { RefInputType } from '@arco-design/web-react/es/Input'
import { toJS } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import { noop } from 'es-toolkit'

export default observer(function ImDemo() {
  const [dd, dddd] = useState('')

  const [html5QrCodem, setsss] = useState<Html5Qrcode>()

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('reader')
    setsss(html5QrCode)
  }, [])

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    dddd(JSON.stringify(decodedResult, null, 2))

    setvv(decodedText)

    html5QrCodem.stop()
  }

  const [vv, setvv] = useState('')

  const config = { fps: 10, qrbox: { width: 250, height: 250 } }

  return (
    <div>
      <button
        onClick={() => {
          html5QrCodem.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback).catch(err => err)
        }}
      >
        scan
      </button>

      <button onClick={() => html5QrCodem.stop()}>cancel</button>

      <input type="text" value={vv} onChange={noop} />

      <div id="reader"></div>

      <pre>{dd}</pre>
    </div>
  )
})
