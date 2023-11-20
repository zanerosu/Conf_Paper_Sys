import React from 'react'
import Login from './Login'
import Home from './Home'
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className = 'App'>
    <BrowserRouter>
        <Routes>
      
          <Route path = '/' element = {<Login/>}></Route>
          <Route path = '/home' element = {<Home/>}></Route>
          
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App