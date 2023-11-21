import React from 'react'
import Login from './Login'
import Home from './Home'
import New_Conference from './New_Conference';

import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className = 'App'>
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>}></Route>
          <Route path = '/home' element = {<Home/>}></Route>
          <Route path = '/New-Conference' element = {<New_Conference/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App