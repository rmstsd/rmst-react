import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

const ReduxTodo = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default ReduxTodo
