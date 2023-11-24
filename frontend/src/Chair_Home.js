import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';

function Chair_Home() {

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
        <h1 className='Page-Header'>Conference Chair Home <img src = "Conf_Chair-Icon.png" className = "Home-Image"/> </h1>
        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/home')} id = "Assign_Reviwers">
            <label for = "Assign_Reviewers">
              <img src = "Reviewer-Icon.png" alt = "Icon 1"/>
              <br/>
              <a>Assign Reviewers</a>
            </label>
          </ul>
          <ul onClick={() => navigate('/home')} id = "View_Review_Progress">
            <label>
                <img src = "Status_icon.png" alt = "Icon 2"/>
                <br/>
                View Review
                <br/>Progress
            </label>
          </ul>

          <ul onClick={() => navigate('/home')} id = "Make_Recommendation">
            <label>
                <img src = "Recommend-icon.png" alt = "Icon 2"/>
                <br/>
                Final <br/>Recommendation
            </label>
          </ul>

        </div>
    </div>
  )
}

export default Chair_Home