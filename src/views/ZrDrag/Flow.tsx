import useStore from './store'
import TaskNode from './TaskNode'

export default function Flow() {
  const { state, setState } = useStore()

  return (
    <main className="flex grow select-none flex-col p-6">
      <TaskNode node={state.rootNode} parentNode={null} />
    </main>
  )
}
