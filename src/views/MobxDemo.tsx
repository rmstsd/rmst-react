import { action, autorun, computed, flow, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

class TodoStore {
  todos: { task: string; completed: boolean; assignee }[] = []
  pendingRequests = false
  count = 0

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      upItem: action,
      req: flow,
      increment: action.bound
    })

    // autorun(() => console.log(this.report))
  }

  increment() {
    this.count += 1
  }

  get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length
  }

  get report() {
    if (this.todos.length === 0) return '<无>'
    const nextTodo = this.todos.find(todo => todo.completed === false)
    return (
      `下一个待办："${nextTodo ? nextTodo.task : '<无>'}"。 ` + `进度：${this.completedTodosCount}/${this.todos.length}`
    )
  }

  addTodo(task) {
    this.todos.push({ task: task, completed: false, assignee: null })
  }

  upItem(index: number, nv: string) {
    this.todos[index].task = nv
  }

  *req() {
    todoStore.pendingRequests = true
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve('随机待办 ' + Math.random())
      }, 2000)
    })

    const item = yield p

    todoStore.addTodo(item)
    todoStore.pendingRequests = false
  }
}

const todoStore = new TodoStore()

const MobxDemo = observer(() => {
  const { increment } = todoStore

  return (
    <div>
      <button
        onClick={() => {
          increment()
          todoStore.addTodo(String(Math.random()))
        }}
      >
        {todoStore.count}
      </button>

      <button
        onClick={() => {
          const c = todoStore.req()
          console.log(c)
        }}
      >
        {String(todoStore.pendingRequests)}
      </button>

      {todoStore.todos.map((item, index) => (
        <div key={item.task} onClick={() => todoStore.upItem(index, String(Math.random()))}>
          aaa: {item.task}
        </div>
      ))}
    </div>
  )
})

export default MobxDemo
