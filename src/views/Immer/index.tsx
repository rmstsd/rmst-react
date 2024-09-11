import cn from '@/utils/cn'
import { Button, Select, Tooltip } from '@arco-design/web-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import Trigger from 'rc-trigger'
import React, { cloneElement, forwardRef, isValidElement, useEffect, useRef, useState, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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

      <br />
      <br />

      {/* <Button />
      <Button type="danger" /> */}
    </div>
  )
}

export default function Tt() {
  return (
    <div className="tt relative h-[600px] overflow-auto">
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>

      <Trigger
        action={['click']}
        popup={<span>popup</span>}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [0, 3]
        }}
      >
        <button className="border">w</button>
      </Trigger>

      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
    </div>
  )
}
