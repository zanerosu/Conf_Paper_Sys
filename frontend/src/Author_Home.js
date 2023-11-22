import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';

function Author_Home() {

  const {user, logoutUser} = useUser();

  const navigate = useNavigate();

  const handleLogout = () =>{
    logoutUser();
    navigate('/');
  }

  return (
    <div className='Home-Page'>
      <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
      <button type = 'submit' className='btn btn-primary btn-home' onClick={() => navigate('/Home')}><strong>Return Home</strong></button>
        <h1 className='Page-Header'>Welcome, {user ? user.Fname : 'Guest'}</h1>
        <div className='Home-List'>
          <ul onClick={() => navigate('/New-Conference')} id = "New_Conference">
            <label for = "New_Conference">
              <img src = "Create_Conf_Icon.png" alt = "Icon 1"/>
              <br/>
              <a>Upload Paper</a>
            </label>
          </ul>
          <ul>
            <img src = "Author-Icon.png" alt = "Icon 2"/>
            <br/>
            Author Home
          </ul>

        </div>
    </div>
  )
}

export default Author_Home