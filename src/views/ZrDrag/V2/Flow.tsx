import { observer } from 'mobx-react-lite'
import { Tabs } from '@arco-design/web-react'

import { store } from './store'
import TaskNode from './TaskNode'

function Flow() {
  if (!store.activeFlow) {
    return
  }

  return (
    <main className="flex grow touch-none select-none flex-col p-6">
      <Tabs
        editable
        type="card-gutter"
        activeTab={store.activeFlow.id}
        onAddTab={() => store.addFlow()}
        onDeleteTab={key => store.removeFlow(key)}
        onChange={key => (store.activeFlow = store.flowList.find(f => f.id === key) || store.flowList[0])}
      >
        {store.flowList.map(item => (
          <Tabs.TabPane key={item.id} title={item.title} className="grid grid-cols-2 items-start">
            <TaskNode node={item.rootNode} />

            <pre
              className="w-1/3"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(item.rootNode, null, 2)).then(() => {
                  console.log('Copied to clipboard')
                })
              }}
            >
              {JSON.stringify(item.rootNode, null, 2)}
            </pre>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </main>
  )
}

export default observer(Flow)
