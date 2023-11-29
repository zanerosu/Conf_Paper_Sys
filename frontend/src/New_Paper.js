import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import {useNavigate } from 'react-router-dom'

function New_Paper(){
    const {user, logoutUser} = useUser();
    const [values, setValues] = useState({
        Title: '',
        Author: '',
        Status: 'Pending'
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    };

    const handleLogout = () =>{
        logoutUser();
        navigate('/');
    };
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
          axios.post('http://localhost:8081/New-Paper', values)
          .then(res => {
            console.log(res.data);
            if (res.data.status === "Success"){
              alert("New paper created")
              navigate('/home')
            } else {
              alert("Error uploading paper!")
            }
          })
          .catch(err => console.log(err))
      };

      return (
        <div className='New-Paper-Page'>
          <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
          <button type = 'submit' className='btn btn-primary btn-home' onClick={() => navigate('/Home')}><strong>Return Home</strong></button>
          <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>
            <h1 className='Page-Header New-Conf-Header'>
                Upload New Paper
            </h1>
            <div className='Form-Background'>
                <h1>Details</h1>
                <form action = "" onSubmit = {handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor = 'Title'><strong>Paper Title</strong></label>
                        <input type = 'text' placeholder= 'Enter Title' name = 'Title' className = 'form-control rounded-0' onChange={handleInput}/>
                    </div>
                
                    <div className='mb-3'>
                        <label htlmFor = 'Author'><strong>Author</strong></label>
                        <input type = 'text' placeholder= 'Enter author username' name = 'Author' className = 'form-control rounded-0' onChange={handleInput}/> 
                    </div>

                    <button type = 'submit' className='btn btn-success w-100'><strong>Upload</strong></button>
                </form>
            </div>
        </div>
      );

}

export default New_Paper;