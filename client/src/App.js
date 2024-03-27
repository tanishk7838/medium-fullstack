import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Blogs from './Components/Blogs'
import Blog from './Components/Blog'
import Editor from './Components/Editor'
import Myblogs from './Components/Myblogs'
function App() {
  const [blogs, setBlogs] = useState()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='/blogs' element={<Blogs setBlogs={setBlogs}/>}/>
      <Route path='/blogs/:id' element={<Blog/>}/>
      <Route path='/editor' element={<Editor />}/>
      <Route path='/myblogs' element={<Myblogs blogs={blogs}/>}/>
      <Route path='/blogs/edit/:id' element={<Editor />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App