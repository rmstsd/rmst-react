import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = connect(
  state => {
    console.log(state.todos)
    return {
      todos: getVisibleTodos(state.todos.present, state.visibilityFilter)
    }
  },
  { onTodoClick: toggleTodo }
)(TodoList)

export default VisibleTodoList
