import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from './UserContext';
import axios from 'axios';

function Conference_Details(){

    const {user, logoutUser} = useUser();
    const {id} = useParams();
    const [conference, setConference] = useState(null);
    
    const navigate = useNavigate();
  
    const handleLogout = () =>{
      logoutUser();
      navigate('/');
    }
  
    useEffect(() => {
        console.log(id);
      axios.get(`http://localhost:8081/Conference-Details/${id}`)
      .then(res => {
        if (res.data.status === "Success"){
          setConference(res.data.conference);
        }else{
          console.error("Error fetching conferences:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching conferences:", error);
      });
    }, [id]);

    if (!conference) {
        // If conference is null, return loading or handle it accordingly
        return <div>Loading...</div>;
      }

    return (
        <div className='Home-Page'>
          <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
          <button type = 'submit' className='btn btn-primary btn-home' onClick={() => navigate('/Home')}><strong>Return Home</strong></button>
          <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>

          <h1 className='Page-Header'> {conference.Conf_Name} Details: </h1>
            <div className='Conf_Details'>
                <p><strong>Start Date:</strong> {new Date(conference.Start_Date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(conference.End_Date).toLocaleDateString()}</p>
                <p><strong>Deadline:</strong> {new Date(conference.Deadline).toLocaleDateString()}</p>
                <p><strong>Conference Chair:</strong> {conference.Conf_Chair}</p>
            </div>
        </div>
      )
}

export default Conference_Details;