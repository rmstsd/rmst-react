import { observer } from 'mobx-react-lite'
import { Tabs } from '@arco-design/web-react'

import { store } from './store'
import TaskNode from './TaskNode'

function Flow() {
  if (!store.activeFlow) {
    return
  }

  return (
    <main className="touch-none select-none p-6 w-0 flex-grow">
      <Tabs
        editable
        type="card-gutter"
        activeTab={store.activeFlow.id}
        onAddTab={() => store.addFlow()}
        onDeleteTab={key => store.removeFlow(key)}
        onChange={key => (store.activeFlow = store.flowList.find(f => f.id === key) || store.flowList[0])}
      >
        {store.flowList.map(item => (
          <Tabs.TabPane key={item.id} title={item.title} className="flex items-start">
            <section className="h-full flex-shrink-0 flex-grow overflow-auto">
              <TaskNode node={item.rootNode} />
            </section>

            <pre
              className="h-full w-1/3 flex-shrink-0 overflow-auto"
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
