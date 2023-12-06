import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';


function AppNavbar() {

    const {logoutUser} = useUser();

    //Saves user to local storage so that the state remains even if the user refreshes the browser
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const { loginUser } = useUser();
    const location = useLocation();

    const handleLogout = () =>{
        logoutUser();
        localStorage.removeItem('user');
        navigate('/');
      }

      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          loginUser(storedUser);
        }
      }, []);

    const isLoginPage = location.pathname === '/';

    if(isLoginPage){
      return null;
    }

  //JSX for navbar which is created using bootstrap
  return (
    <Navbar bg="dark" variant="dark" fixed = "top">
      <Navbar.Brand as={Link} to="/home" className='d-flex align-items-center'>
        <img className='d-inline-block align-top NavBar_Image'
        src='Paper icon.png'
        alt="App Logo"
        />{' '}
        Conference Paper System</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/New-Conference">New Conference</Nav.Link>
        <Nav.Link as={Link} to="/Author-Home">Author Home</Nav.Link>
        <Nav.Link as={Link} to="/Chair-Home">Chair Home</Nav.Link>
        <Nav.Link as={Link} to="/Reviewer-Home">Reviewer Home</Nav.Link>
        <Nav.Link> <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button> </Nav.Link>
        <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p> 
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;