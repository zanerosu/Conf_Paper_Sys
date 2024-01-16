import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Conference_Details(){
    const {id} = useParams();
    const [conference, setConference] = useState(null);
    
    //Effect hook to get conference details based off the id of the currently selected conference
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

    //JSX render of conference details
    return (
        <div className='Home-Page'>
          
          <h1 className='Page-Header'> {conference.Conf_Name} Details: </h1>
            <div className='Item_Details'>
                <p><strong>Start Date:</strong> {new Date(conference.Start_Date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(conference.End_Date).toLocaleDateString()}</p>
                <p><strong>Deadline:</strong> {new Date(conference.Deadline).toLocaleDateString()}</p>
                <p><strong>Conference Chair:</strong> {conference.Conf_Chair}</p>
            </div>
        </div>
      )
}

export default Conference_Details;