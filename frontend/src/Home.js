import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';

function Home() {

  const {user} = useUser();

  const navigate = useNavigate();

  //JSX that renders the component
  return (
    <div className='Home-Page'>
        <h1 className='Page-Header'>Welcome, {user ? user.Fname : 'Guest'}</h1>
        <div className='Home-List'>
          <ul onClick={() => navigate('/New-Conference')} id = "New_Conference">
            <label for = "New_Conference">
              <img src = "Create_Conf_Icon.png" alt = "Icon 1"/>
              <br/>
              Create Conference
            </label>
          </ul>
          
          <ul onClick={() => navigate('/Author-Home')} id = "Author_Home">
            <label for = "Author_Home">
              <img src = "Author-Icon.png" alt = "Icon 2"/>
              <br/>
              Author Home
            </label>
          </ul>

          <ul onClick={() => navigate('/Chair-Home')} id = "Chair_Home">
            <label for = "Chair_Home">
              <img src = "Conf_Chair-Icon.png" alt = "Icon 3"/>
              <br/>
              Chair Home
            </label>
          </ul>

          <ul onClick={() => navigate('/Reviewer-Home')} id = "Reviewer_Home">
            <label for = "Reviewer_Home">
              <img src = "Reviewer-Icon.png" alt = "Icon 4"/>
              <br/>
              Reviewer Home
            </label>
          </ul>

        </div>
    </div>
  )
}

export default Home