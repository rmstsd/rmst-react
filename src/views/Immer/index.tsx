import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import cn from '@/utils/cn'

const button = cva('button', {
  variants: {
    type: {
      primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      danger: ['bg-red-500', 'text-white', 'hover:bg-red-600']
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4']
    }
  },
  compoundVariants: [{ type: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    type: 'primary',
    size: 'medium'
  }
})

type ButtonProps = VariantProps<typeof button> & {
  onClick?: () => void
  className?: string
}

function Button(props: ButtonProps) {
  props = { type: 'primary', size: 'medium', ...props }

  const { type, size, onClick, className } = props

  return (
    <button className={button({ type, size, className })} onClick={onClick}>
      Default Button
    </button>
  )
}

function Home() {
  const [type, setType] = useState<ButtonProps['type']>('primary')
  const [size, setSize] = useState<ButtonProps['size']>('medium')

  return (
    <div className="p-4">
      <button className={cn('border p-2 p-3')} onClick={() => setType(type === 'primary' ? 'danger' : 'primary')}>
        {type}
      </button>
      <button className={cn('border p-2')} onClick={() => setSize(size === 'medium' ? 'small' : 'medium')}>
        {size}
      </button>

      <Button type={type} size={size} />

      <br />
      <br />

      {/* <Button />
      <Button type="danger" /> */}
    </div>
  )
}

import InitCanvasKit from 'canvaskit-wasm/bin/canvaskit.js'

export default function Kt() {
  useEffect(() => {
    InitCanvasKit().then(CanvasKit => {
      const skcanvas = CanvasKit.MakeCanvas(600, 600)

      const ctx = skcanvas.getContext('2d')
      const rgradient = ctx.createRadialGradient(200, 300, 10, 100, 100, 300)

      // Add three color stops
      rgradient.addColorStop(0, 'red')
      rgradient.addColorStop(0.7, 'white')
      rgradient.addColorStop(1, 'blue')

      ctx.fillStyle = rgradient
      ctx.globalAlpha = 0.7
      ctx.fillRect(0, 0, 600, 600)
    })
  }, [])

  return <div>kt</div>
}
