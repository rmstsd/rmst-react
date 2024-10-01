import { observer } from 'mobx-react-lite'
import { createNodeItem, oriData } from '../shared/oriData'
import { DataSourceAttrName } from '../V2/store'
import { store } from './store'

function Aside() {
  return (
    <aside className="select-none border-r">
      {oriData.map(item => (
        <div
          key={item.id}
          {...{ [DataSourceAttrName]: item.id }}
          className="p-2 hover:bg-gray-100"
          onClick={() => {
            store.rootNode.children.push(createNodeItem(item))
          }}
        >
          {item.id}
          {' '}
          {item.title}
        </div>
      ))}
    </aside>
  )
}

export default observer(Aside)
