import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';

function Home() {

  const {user, logoutUser} = useUser();

  const navigate = useNavigate();

  const handleLogout = () =>{
    logoutUser();
    navigate('/');
  }

  return (
    <div className='Home-Page'>
      <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
      <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>
        <h1 className='Page-Header'>Welcome, {user ? user.Fname : 'Guest'}</h1>
        <div className='Home-List'>
          <ul onClick={() => navigate('/New-Conference')} id = "New_Conference">
            <label for = "New_Conference">
              <img src = "Create_Conf_Icon.png" alt = "Icon 1"/>
              <br/>
              Create Conference
            </label>
          </ul>
          <ul onClick={() => navigate('/Author-Home')} id = "New_Conference">
            <label for = "Author_Home">
              <img src = "Author-Icon.png" alt = "Icon 2"/>
              <br/>
              Author Home
            </label>
          </ul>
          <ul>
            <img src = "Conf_Chair-Icon.png" alt = "Icon 3"/>
            <br/>
            Chair Home
          </ul>
          <ul>
            <img src = "Reviewer-Icon.png" alt = "Icon 4"/>
            <br/>
            Reviewer Home
          </ul>
        </div>
    </div>
  )
}

export default Home