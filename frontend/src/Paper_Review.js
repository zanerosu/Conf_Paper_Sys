import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Paper_Review(){
    const {id} = useParams();
    const [paper, setPaper] = useState(null);
    const [reviewResponse, setReviewResponse] = useState('');
    
    useEffect(() => {
        console.log(id);
      axios.get(`http://localhost:8081/Paper-Details/${id}`)
      .then(res => {
        if (res.data.status === "Success"){
          setPaper(res.data.paper);
        }else{
          console.error("Error fetching paper:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching paper:", error);
      });
    }, [id]);

    if (!paper) {
        // If conference is null, return loading or handle it accordingly
        return <div>Loading...</div>;
      }

 

    return (
        <div className='Home-Page'>
          
          <h1 className='Page-Header'> {paper.Title}: </h1>
            <div className='Item_Details'>
                <p><strong>Written By:</strong> {paper.Author} </p>
                <p className='Paper_Content'>Paper contents would be displayed here if the system allowed for uploading documents.</p>
            </div>

            <button type = 'submit' className='btn btn-danger btn_reviewer'><strong>Reject</strong></button>
            <button type = 'submit' className='btn btn-primary btn_reviewer'><strong>Neutral</strong></button>
            <button type = 'submit' className='btn btn-success btn_reviewer'><strong>Accept</strong></button>
            

        </div>
      )

}
export default Paper_Review;