import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from './UserContext';
import axios from 'axios';

function Paper_Status(){

    const { user, logoutUser } = useUser();
    const [papers, setPapers] = useState([]);
    const {values, setValues} =useState({
        Author:user.Username,
    })

    const navigate = useNavigate();

    const handleLogout = () =>{
        logoutUser();
        navigate('/');
      }

    useEffect(() => {
      if (!user || !user.Username) {
        return; // Don't proceed if user information is not available
      }
  
      axios.get(`http://localhost:8081/Paper-Status?Username=${user.Username}`)
        .then(res => {
          if (res.data.status === 'Success') {
            setPapers(res.data.papers);
          } else {
            console.error('Error fetching papers:', res.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching papers:', error);
        });
    }, [user.Username]);
  
    if (!papers) {
      return <div>Loading...</div>;
    }
    

    return (
        <div className='Home-Page'>
          <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
          <button type = 'submit' className='btn btn-primary btn-home' onClick= {() => navigate('/Home')}><strong>Return Home</strong></button>
          <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>

        <div className='Item_Lists'>
        <h2>{user.Fname}'s Papers:</h2>
          <ul> {papers.map((paper, index) => (
            <ul key = {index}>
              <li>
                <img src ="Paper icon.png" className='Conference_Icons'/>
                <h3 className='Conference_List_Conf_Name'>{paper.Title}</h3>
                <p className='Conference_List_Dates'>{paper.Status}</p>
              </li>
            </ul>
            ))}   
          </ul>
      </div>

        </div>
      )
}

export default Paper_Status;