import { Tabs } from '@arco-design/web-react'
import DndKitCore from './dnd-kit-core'
import DndKitReact from './dnd-kit-react'

export default function DndKitDd() {
  return (
    <>
      <Tabs>
        <Tabs.TabPane key="1" title="DndKitCore">
          <DndKitCore />
        </Tabs.TabPane>

        <Tabs.TabPane key="2" title="DndKitReact">
          <DndKitReact />
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}
