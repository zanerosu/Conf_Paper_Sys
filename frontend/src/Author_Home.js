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
      <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>
        <h1 className='Page-Header'>Author Home <img src = "Author-Icon.png" className = "Home-Image"/> </h1>
        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/New-Conference')} id = "New_Conference">
            <label for = "New_Paper">
              <img src = "Paper_upload.png" alt = "Icon 1"/>
              <br/>
              <a>Upload Paper</a>
            </label>
          </ul>
          <ul>
            <img src = "Status_icon.png" alt = "Icon 2"/>
            <br/>
            Check Paper Status
          </ul>

        </div>
    </div>
  )
}

export default Author_Home