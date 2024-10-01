import { Tabs } from '@arco-design/web-react'
import { observer } from 'mobx-react-lite'
import V1 from './V1/V1'
import V2 from './V2/V2'

function ZrDragIndex() {
  return (
    <>
      <Tabs defaultActiveTab="2">
        <Tabs.TabPane key="1" title="V1">
          <V1 />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="V2">
          <V2 />
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default observer(ZrDragIndex)
