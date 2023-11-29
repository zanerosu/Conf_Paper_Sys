import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import {useNavigate } from 'react-router-dom'


function New_Conference() {
  const {user, logoutUser} = useUser();


  const [values, setValues] = useState({
    Conf_Name: '',
    City: '',
    State: '',
    Country: '',
    Start_Date: '',
    End_Date: '',
    Deadline: '',
    Conf_Chair: ''
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
      axios.post('http://localhost:8081/New-Conference', values)
      .then(res => {
        console.log(res.data);
        if (res.data.status === "Success"){
          alert("New Conference Created")
          navigate('/home')
        } else {
          alert("Error creating conference!")
        }
      })
      .catch(err => console.log(err))
  };
  
  return (
    <div className='New-Conf-Page'>
      <button type = 'submit' className='btn btn-danger btn-logout' onClick={handleLogout}><strong>Log out</strong></button>
      <button type = 'submit' className='btn btn-primary btn-home' onClick={() => navigate('/Home')}><strong>Return Home</strong></button>
      <p className='Curr-User'>Logged in as: {user ? user.Fname : 'Guest'}</p>
        <h1 className='Page-Header New-Conf-Header'>
            Create New Confernce
        </h1>
        <div className='Form-Background'>
            <h1>Details</h1>
            <form action = "" onSubmit = {handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor = 'Conf_Name'><strong>Conference Name</strong></label>
                    <input type = 'text' placeholder= 'Enter Name' name = 'Conf_Name' className = 'form-control rounded-0' onChange={handleInput}/>
                </div>
            
                <div className='mb-3'>
                    <label htlmFor = 'City'><strong>City</strong></label>
                    <input type = 'text' placeholder= 'Enter City' name = 'City' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'State'><strong>State</strong></label>
                    <input type = 'text' placeholder= 'Enter State' name = 'State' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'Country'><strong>Country</strong></label>
                    <input type = 'text' placeholder= 'Enter Country' name = 'Country' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'Start_Date'><strong>Start Date</strong></label>
                    <input type = 'date' placeholder= 'Enter Date' name = 'Start_Date' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'End_Date'><strong>End Date</strong></label>
                    <input type = 'date' placeholder= 'Enter Date' name = 'End_Date' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'Deadline'><strong>Deadline</strong></label>
                    <input type = 'date' placeholder= 'Enter Date' name = 'Deadline' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <div className='mb-3'>
                    <label htlmFor = 'Conf_Chair'><strong>Conference Chair</strong></label>
                    <input type = 'text' placeholder= 'Enter Username' name = 'Conf_Chair' className = 'form-control rounded-0' onChange={handleInput}/> 
                </div>

                <button type = 'submit' className='btn btn-success w-100'><strong>Create</strong></button>
            </form>
        </div>
    </div>
  );
};

export default New_Conference;