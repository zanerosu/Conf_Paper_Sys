import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext';
import axios from 'axios';

function Author_Home() {

  const {user, logoutUser} = useUser();
  const [conferences, setConferences] = useState([]);
  
  const navigate = useNavigate();

  const handleLogout = () =>{
    logoutUser();
    navigate('/');
  }

  //Gets conference data from database
  useEffect(() => {
    axios.get('http://localhost:8081/Author-Home')
    .then(res => {
      if (res.data.status === "Success"){
        setConferences(res.data.conferences);
      }else{
        console.error("Error fetching conferences:", res.data.message);
      }
    })
    .catch(error => {
      console.error("Error fetching conferences:", error);
    });
  }, []);

  return (
    <div className='Home-Page'>
      <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
      <button type = 'submit' className='btn btn-primary btn-home' onClick={() => navigate('/Home')}><strong>Return Home</strong></button>
      <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>
        <h1 className='Page-Header'>Author Home <img src = "Author-Icon.png" className = "Home-Image"/> </h1>
        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/New-Paper')} id = "new_paper">
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

      <div className='Conference_List'>
        <h2>Conferences:</h2>
          <ul> {conferences.map(conference => (
            <ul key = {conference.ConfID} onClick={() => navigate(`/Conference-Details/${conference.ConfID}`)}>
              <li>
                <img src ="Conference_Icon.png" className='Conference_Icons'/>
                <h3 className='Conference_List_Conf_Name'>{conference.Conf_Name}</h3>
                <p className='Conference_List_Dates'>{new Date(conference.Start_Date).toLocaleDateString()} to {new Date(conference.End_Date).toLocaleDateString()}</p>
              </li>
            </ul>
            ))}   
          </ul>
      </div>

    </div>
  )
}

export default Author_Home;