import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';


function AppNavbar() {

    const {user, logoutUser} = useUser();

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () =>{
        logoutUser();
        navigate('/');
      }

    const isLoginPage = location.pathname === '/';

    if(isLoginPage){
      return null;
    }

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
        <Nav.Link> <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p> </Nav.Link>
      </Nav>
      
                
                    
                
           
    </Navbar>
  );
}

export default AppNavbar;