import { observer } from 'mobx-react-lite'
import { createNodeItem, oriData } from '../shared/oriData'

function Aside() {
  return (
    <aside className="select-none border-r flex-shrink-0">
      {oriData.map(item => (
        <div key={item.id} data-source-id={item.id} className="p-2 hover:bg-gray-100">
          {item.id} - {item.title}
        </div>
      ))}
    </aside>
  )
}

export default observer(Aside)
