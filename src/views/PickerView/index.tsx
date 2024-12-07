import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PickerCell from './Pk'
import PickerView from './PickerView'

function Mpk() {
  return (
    <PickerCell
      prefixCls="rmst"
      data={Array.from({ length: 30 }, (_, i) => ({ value: i, label: `Item ${i}` }))}
      clickable
      disabled={false}
      itemHeight={50}
      wrapperHeight={300}
      onValueChange={value => {
        console.log(value)
      }}
    />
  )
}

export default function PickerViewDd(props) {
  const [value, setValue] = useState<string | number>('')

  return (
    <div className="flex items-center">
      <b className="w-20">{value}</b>

      <PickerView onChange={setValue} />
    </div>
  )
}
