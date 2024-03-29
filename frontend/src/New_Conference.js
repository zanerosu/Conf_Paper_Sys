import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'

function New_Conference() {
  
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

    const [Chairs, setChairs] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8081/Get_Chairs')
      .then(res => {
        if (res.data.status === "Success"){
          setChairs(res.data.chairs);
          console.log(res.data.chairs)
        }else{
          console.error("Error fetching chairs:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching chairs:", error);
      });
    }, []);

  
  return (
    <div className='New-Conf-Page'>
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

                {/* Select lists chair names */}
                <label htmlFor = 'Conf_Chair'><strong>Conference Chair</strong></label>
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      name='Conf_Chair'
                      onChange={handleInput}
                      value={values.Conf_Chair}
                      >
                        <option key = "" value="" disabled>Select Chair</option>
                        {Chairs.map(Chair => (
                          <option key = {Chair.Username} value = {Chair.Username}>
                            {Chair.Fname} {Chair.Lname}
                          </option>
                        ))}
                  </select>

                <button type = 'submit' className='btn btn-success w-100'><strong>Create</strong></button>
            </form>
        </div>
    </div>
  );
};

export default New_Conference;