import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Author_Home() {
  const [conferences, setConferences] = useState([]);
  
  const navigate = useNavigate();
  //Gets conference data from database
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


  return (
    <div className='Home-Page'>
        <h1 className='Page-Header'>Author Home <img src = "Author-Icon.png" className = "Home-Image"/> </h1>

        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/New-Paper')} id = "new_paper">
            <label for = "New_Paper">
              <img src = "Paper_upload.png" alt = "Icon 1"/>
              <br/>
              <a>Upload Paper</a>
            </label>
          </ul>
          <ul onClick={() => navigate('/Paper-Status')}>
            <img src = "Status_icon.png" alt = "Icon 2"/>
            <br/>
            Check Paper Status
          </ul>
        </div>

      <div className='Item_Lists'>
        <h2>Conferences:</h2>
          <ul class="ItemList_UL"> {conferences.map(conference => (
            <ul class="ItemList_UL" key = {conference.ConfID} onClick={() => navigate(`/Conference-Details/${conference.ConfID}`)}>
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