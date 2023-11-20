import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';



function Login() {
    const [values, setValues] = useState({
        username: '',
        password: '' 
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        setErrors(Validation({ ...values, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        console.log(values);
        if (errors.username === "" && errors.password === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                console.log(res.data);
                if(res.data === "Success"){
                    navigate('/home');
                } else {
                    alert("No account!")
                }
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <div className='Login-Background'>
        <h1 className='Page-Header'>Login</h1>
        <form action = "" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlfor = 'username'><strong>Username</strong></label>
                <input type = 'text' placeholder= 'Enter Name' name = 'username'
                onChange = {handleInput} className = 'form-control rounded-0' />
                {errors.username && <span className='text-danger'> {errors.username}</span>} 
            </div>
            
            <div className='mb-3'>
                <label htlmFor = 'password'><strong>Password</strong></label>
                <input type = 'password' placeholder= 'Enter Password' name = 'password'
                onChange = {handleInput} className = 'form-control rounded-0'/> 
                {errors.password && <span className='text-danger'> {errors.password}</span>} 
            </div>

            <button type = 'submit' className='btn btn-success w-100'><strong>Log in</strong></button>

        </form>
    </div>
  )
}

export default Login