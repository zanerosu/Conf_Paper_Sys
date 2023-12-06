import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import {useNavigate } from 'react-router-dom'

function New_Paper(){
    const {logoutUser} = useUser();
    const [values, setValues] = useState({
        Title: '',
        Author: '',
        Status: 'Pending',
        Conference: '',
    });

    //Gets conference data from database
    const [conferences, setConferences] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8081/Get_Conferences')
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

    //Gets author data from database
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8081/Get_Authors')
      .then(res => {
        if (res.data.status === "Success"){
          setAuthors(res.data.authors);
        }else{
          console.error("Error fetching authors:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching authors:", error);
      });
    }, []);


    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
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
              navigate('/Author-Home')
            } else {
              alert("Error uploading paper!")
            }
          })
          .catch(err => console.log(err))
      };

      return (
        <div className='New-Paper-Page'>
          
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
              
                    {/* Select lists author names */}
                    <label htmlFor = 'Author'><strong>Author</strong></label>
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      name='Author'
                      onChange={handleInput}
                      value={values.Author}
                      >
                        <option key = "" value="" disabled>Select Author</option>
                        {authors.map(author => (
                          <option key = {author.Username} value = {author.Username}>
                            {author.Fname} {author.Lname}
                          </option>
                        ))}
                    </select>
                    
                    {/* Select lists conference names */}
                    <label htmlFor = 'Conference'><strong>Conference</strong></label>
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      name='Conference'
                      onChange={handleInput}
                      value={values.Conference}
                      >
                        <option key = "" value="" disabled>Select Conference</option>
                        {conferences.map(conference => (
                          <option key = {conference.ConfID} value = {conference.ConfID}>
                            {conference.Conf_Name}
                          </option>
                        ))}
                    </select>

                    <button type = 'submit' className='btn btn-success w-100'><strong>Upload</strong></button>
                </form>
            </div>
        </div>
      );

}

export default New_Paper;