import { genNodeItem, oriData } from './oriData'
import { store } from './store'

export default function Aside() {
  return (
    <aside className="select-none border-r">
      {oriData.map(item => (
        <div
          key={item.id}
          data-source-id={item.id}
          className="p-2 hover:bg-gray-100"
          onClick={() => {
            store.rootNode.children.push(genNodeItem(item))
          }}
        >
          {item.id} {item.title}
        </div>
      ))}
    </aside>
  )
}
