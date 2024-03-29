//Imports all the components
import React from 'react'
import AppNavbar from './Navbar';
import Login from './Login'
import Home from './Home'
import New_Conference from './New_Conference';
import Author_Home from './Author_Home';
import Reviewer_Home from './Reviewer_Home';
import Chair_Home from './Chair_Home';
import New_Paper from './New_Paper';
import Conference_Details from './Conference_Details';
import Paper_Status from './Paper_Status';
import Assign_Reviewers from './Assign_Reviewers';
import Paper_Review from './Paper_Review';
import Assign_Reviewers_Test from './Assign_Reviewers_Test';
import Review_Progress from './Review_Progress';
import Final_Recc from './Final_Recc';

import './App.css'; //Imports the stylesheet

import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Main app component function
function App() {
  return (
    <div className = 'App'>
        <BrowserRouter>
          <AppNavbar/>
          <Routes>
            <Route path = '/' element = {<Login/>}></Route>
            <Route path = '/home' element = {<Home/>}></Route>
            <Route path = '/New-Conference' element = {<New_Conference/>}></Route>
            <Route path = '/Author-Home' element = {<Author_Home/>}></Route>
            <Route path = '/Reviewer-Home' element = {<Reviewer_Home/>}></Route>
            <Route path = '/Chair-Home' element = {<Chair_Home/>}></Route>
            <Route path = '/New-Paper' element = {<New_Paper/>}></Route>
            <Route path = '/Conference-Details/:id' element = {<Conference_Details/>}></Route>
            <Route path = '/Paper-Status' element = {<Paper_Status/>}></Route>
            <Route path = '/Assign-Reviewers' element = {<Assign_Reviewers/>}></Route>
            <Route path = '/Paper-Review/:id' element = {<Paper_Review/>}></Route>
            <Route path = '/Review-Progress' element = {<Review_Progress/>}></Route>
            <Route path = '/Final-Recc' element = {<Final_Recc/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App