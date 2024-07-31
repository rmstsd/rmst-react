import cn from '@/utils/cn'
import { forwardRef, useImperativeHandle, useRef, VideoHTMLAttributes } from 'react'

const Video = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>((props, ref) => {
  const { className = '', src, autoPlay = false, loop = false, ...restProps } = props

  const vref = useRef()

  useImperativeHandle(ref, () => vref.current)

  return (
    <video
      ref={vref}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted
      className={cn('w-full h-full object-cover', className)}
      {...restProps}
    />
  )
})

export default Video
