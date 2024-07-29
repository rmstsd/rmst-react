import { useRoutes } from 'react-router-dom'
import { siteRoutes } from './routes/siteRoutes'

const App: React.FC = () => {
  const element = useRoutes(siteRoutes)

  return element
}

export default App
