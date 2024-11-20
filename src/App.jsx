
import './App.css'
import CreateTodoModal from './components/CreateTodoModal'
import Layout from './components/Layout'
import Todos from './components/Todos'
import "./config/connection"

function App() {
  
  return (
    <Layout>
      <CreateTodoModal/>
      <Todos/>
    </Layout>
   
  )
}

export default App
