import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Blogs from './Components/Blogs'
import Blog from './Components/Blog'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='/blogs' element={<Blogs />}/>
      <Route path='/blogs/:id' element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App