//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Simple from './pages/Editor'


function App() {
  return (
    <BrowserRouter>
      {/* Estrutura original (alterada por falta de design):
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index path='/' element={<Home/>}/>
          <Route path='/editor' element={<Simple/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes> */}
      <Routes>
        <Route path='/' element={<Simple/>}>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
