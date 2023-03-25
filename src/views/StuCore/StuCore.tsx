import { useState } from 'react'

type CommandType = 'normal' | 'if-start' | 'else-if' | 'else' | 'for-start' | 'break' | 'continue'

type MainFlow = { id: number; onlyKey: string | number; type: string; name: string; children?: MainFlow[] }

let onlyKey = 456
function getOnlyKey() {
  return ++onlyKey
}

const genMainItem = oo => {
  return { ...oo, onlyKey: getOnlyKey() }
}

const normalCommandList = Array.from({ length: 6 }, () => {
  const id = getOnlyKey()
  return { id, type: 'normal', name: '记录日志 - ' + id }
})

const StuCore = () => {
  const commandList = [
    ...normalCommandList,
    { id: 2, type: 'if-start', name: 'if 开始' },
    { id: 3, type: 'else-if', name: 'else-if' },
    { id: 4, type: 'else', name: 'else' },
    // { id: 5, type: 'if-end', name: 'if-end' },
    { id: 6, type: 'for-start', name: 'for 循环' },
    // { id: 7, type: 'for-end', name: 'for结束' },
    { id: 8, type: 'break', name: 'break' },
    { id: 9, type: 'continue', name: 'continue' }
  ]

  const [mainFlowList, setMainFlowList] = useState<MainFlow[]>([
    // {
    //   id: 2,
    //   onlyKey: 'aa',
    //   type: 'if-start',
    //   name: 'if 开始',
    //   children: [
    //     { id: 1, onlyKey: 'bb', type: 'normal', name: '记录日志' },
    //     { id: 1, onlyKey: 'awe', type: 'normal', name: '记录日志' }
    //   ]
    // },
    // { id: 5, onlyKey: 'oo', type: 'if-end', name: 'if-end' }
  ])

  const flatFlowList = flat(mainFlowList)
  console.log(flatFlowList)

  return (
    <div className="flex">
      <ul className="border-r">
        {commandList.map(item => (
          <li key={item.id} className="py-2 px-3 select-none hover:bg-slate-200">
            {item.name}
          </li>
        ))}
      </ul>

      <section className="flex-grow p-3">
        {flatFlowList.map((item, index) => (
          <div
            key={index}
            data-index={index}
            style={{ marginLeft: item.depth * 20 }}
            onClick={() => {
              const parent = findParent(mainFlowList, item)
              if (parent) {
                parent.data.children.splice(parent.originIndex + 1, 0, genMainItem(commandList[0]))

                setMainFlowList([...mainFlowList])
              }
            }}
            className="py-3 px-3 select-none border my-4"
          >
            {item.name} - {index}
          </div>
        ))}
      </section>
    </div>
  )
}

export default StuCore

function flat(list: any[]) {
  const ans = []
  dfs(list, 0)
  return ans

  function dfs(list: any[], depth: number) {
    list.forEach(item => {
      ans.push({ ...item, depth })
      if (item.children) {
        dfs(item.children, depth + 1)
      }
    })
  }
}

function findParent(mainFlowList, item) {
  const ans = dfs({ children: mainFlowList })

  if (!ans.data.id) return null

  return ans

  function dfs(innerItem) {
    for (let i = 0; i < innerItem.children.length; i++) {
      const childItem = innerItem.children[i]
      if (childItem.onlyKey === item.onlyKey) {
        return { data: innerItem, originIndex: i }
      } else {
        if (childItem.children) {
          return dfs(childItem)
        }
      }
    }
  }
}
