import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';

function Reviewer_Home() {

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
        <h1 className='Page-Header'>Reviewer Home <img src = "Reviewer-Icon.png" className = "Home-Image"/> </h1>
        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/home')} id = "New_Conference">
            <label for = "Review_Paper">
              <img src = "Review-Paper_Icon.png" alt = "Icon 1"/>
              <br/>
              <a>Review Paper</a>
            </label>
          </ul>
        </div>
    </div>
  )
}

export default Reviewer_Home