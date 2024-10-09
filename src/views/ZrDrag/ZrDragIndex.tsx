import { Tabs } from '@arco-design/web-react'
import { observer } from 'mobx-react-lite'
import V1 from './V1/V1'
import V2 from './V2/V2'

import sty from './style.module.less'

function ZrDragIndex() {
  return (
    <div className={sty.zrDragIndex}>
      <Tabs defaultActiveTab="2">
        <Tabs.TabPane key="1" title="V1">
          <V1 />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="V2">
          <V2 />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default observer(ZrDragIndex)
