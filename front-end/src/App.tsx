//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Simple from './pages/Editor'


function App() {
  return (
    <><BrowserRouter>
    {/* Estrutura original (alterada por falta de design):
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index path='/' element={<Home/>}/>
        <Route path='/editor' element={<Simple/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes> */}
    <Routes>
      <Route path='/'  element={<Simple/>}>
      </Route>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
  </BrowserRouter>
  <p style={{position: 'absolute', bottom: 0, textAlign: "center", width: "100%", opacity: 0.6}}>© Desenvolvido em colaboração com <a href="https://01bit.tech/pt">01bit.tech</a></p>
  </>
    
    
  )
}

export default App
