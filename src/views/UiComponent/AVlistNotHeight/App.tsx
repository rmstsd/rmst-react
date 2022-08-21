import Vlist from './VList'

const data = []
const dataLength = 100
for (let id = 0; id < dataLength; ++id) {
  data.push({
    id,
    value: Math.random()
      .toString(36)
      .repeat(Math.floor(2 + Math.random() * 10))
  })
}

const userVisibleHeight = 500
const estimateRowHeight = 94
const bufferSize = 5

export default function AVlistNotHeight() {
  return (
    <Vlist
      height={userVisibleHeight}
      total={dataLength}
      estimateRowHeight={estimateRowHeight}
      bufferSize={bufferSize}
      rowRenderer={(index: number, styleData: any) => {
        const item = index
        return (
          <div
            key={item}
            style={{ ...styleData, padding: 20, borderBottom: '1px solid #000' }}
            onClick={() => {
              console.log('item-', index)
            }}
            id={`item-${index}`}
          >
            <span>Item - {data[index].id} Data:</span>
            <span style={{ wordBreak: 'break-all' }}>{data[index].value}</span>
          </div>
        )
      }}
    />
  )
}
