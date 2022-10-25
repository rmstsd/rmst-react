import { useUpdate } from '@/utils/hooks'
import { Button } from '@arco-design/web-react'
import { useState, useRef } from 'react'

type ICitem = {
  value: string
  label: string
  children?: ICitem[]
}

const ImageViewDemo = () => {
  const data: ICitem[] = [
    {
      value: '0',
      label: '0',
      children: [
        {
          value: '0-0',
          label: '0-0',
          children: [
            {
              value: '0-0-0',
              label: '0-0-0',
              children: [
                { value: '0-0-0-0', label: '0-0-0-0' },
                { value: '0-0-0-1', label: '0-0-0-1' }
              ]
            },
            { value: '0-0-1', label: '0-0-1' }
          ]
        }
      ]
    },
    {
      value: '1',
      label: '1',
      children: [
        { value: '1-0', label: '1-0' },
        { value: '1-1', label: '1-1' }
      ]
    }
  ]

  const [value, setValue] = useState([])

  const update = useUpdate()

  const columns = useRef<ICitem[][]>([data])

  return (
    <div style={{ display: 'flex' }}>
      {columns.current.map((colItem, index) => (
        <div className="col-item" key={index}>
          {colItem.map(item => (
            <Button
              className="column-item"
              style={{ display: 'block' }}
              key={item.value}
              onClick={() => {
                if (item.children) {
                  columns.current[index + 1] = item.children

                  columns.current = columns.current.slice(0, index + 1 + 1)
                } else {
                  console.log('res')
                }

                update()
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )

  return <div>ImageViewDemo</div>
}

export default ImageViewDemo
