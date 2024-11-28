import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Simple from './pages/Editor'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index path='/' element={<Home/>}/>
          <Route path='/editor' element={<Simple/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
