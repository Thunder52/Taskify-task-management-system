import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ViewTask from './pages/ViewTask'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path="/task/view" element={<ViewTask />} />
    </Routes>
  )
}

export default App
