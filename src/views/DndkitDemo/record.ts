export const startString = `
if (!window.m4ScreenRecordCtx) {
  window.m4ScreenRecordCtx = {
    mediaStream: undefined,
    recorder: undefined,
    recording: undefined
  }
}

const start = async () => {
  const screenRecordCtx = window.m4ScreenRecordCtx
  if (screenRecordCtx.recording) {
    alert('已经处于录制中了')
    return
  }

  let chunks = []

  const mediaStream = await navigator.mediaDevices.getDisplayMedia()
  screenRecordCtx.mediaStream = mediaStream
  
  screenRecordCtx.recording = true

  const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/mp4' })
  screenRecordCtx.recorder = recorder

  recorder.ondataavailable = evt => {
    console.log(evt.data)
    chunks.push(evt.data)
  }

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/mp4' })
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = 'screen-share-record.mp4'
    link.click()
    URL.revokeObjectURL(blobUrl)
    chunks = []
  }

  recorder.start()
}

start()
`

export const stopString = `
 const stop = () => {
  const screenRecordCtx = window.m4ScreenRecordCtx

  screenRecordCtx.recording = false

  screenRecordCtx.recorder?.stop()
  screenRecordCtx.mediaStream.getTracks().forEach(track => {
    track.stop()
  })
}
stop()
`
