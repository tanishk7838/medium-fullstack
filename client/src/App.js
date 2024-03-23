import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './Components/Signup'
import Signin from './Components/Signin'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App