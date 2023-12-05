import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from './UserContext';
import axios from 'axios';

function Review_Progress(){
    const user = JSON.parse(localStorage.getItem('user'));
    const [papers, setPapers] = useState([]);
    const {values, setValues} =useState({
        Author:user.Username,
    })

    const navigate = useNavigate();

    useEffect(() => {
      if (!user || !user.Username) {
        return;
      }
      axios.get(`http://localhost:8081/Paper-Status-Conference?Username=${user.Username}`)
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
          
        <div className='Item_Lists'>
        <h2>Papers:</h2>
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

export default Review_Progress;