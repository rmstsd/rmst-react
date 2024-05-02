import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import axios from './axios'

const App: React.FC = () => {
  const element = useRoutes(routes)

  return element
}

export default App
