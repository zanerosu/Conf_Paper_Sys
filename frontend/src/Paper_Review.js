import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Paper_Review(){
    const {id} = useParams();
    const [paper, setPaper] = useState(null);
    const navigate = useNavigate();

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

      const handleAccept = () => {
        // Make an API call to increment the 'App_Count' attribute
        axios.post(`http://localhost:8081/Accept-Paper/${id}`)
          .then(res => {
            if (res.data.status === "Success") {
              console.log("Success!")
              alert("Feedback Recorded!")
              navigate('/Reviewer-Home')
            } else {
              console.error("Error accepting paper:", res.data.message);
            }
          })
          .catch(error => {
            console.error("Error accepting paper:", error);
          });
      };

      const handleReject = () => {
        // Make an API call to increment the 'App_Count' attribute
        axios.post(`http://localhost:8081/Reject-Paper/${id}`)
          .then(res => {
            if (res.data.status === "Success") {
              console.log("Success!")
              alert("Feedback Recorded!")
              navigate('/Reviewer-Home')
            } else {
              console.error("Error rejecting paper:", res.data.message);
            }
          })
          .catch(error => {
            console.error("Error rejecting paper:", error);
          });
      };
      
      const handleNeutral = () => {
        // Make an API call to increment the 'App_Count' attribute
        axios.post(`http://localhost:8081/Neutral-Paper/${id}`)
          .then(res => {
            if (res.data.status === "Success") {
              console.log("Success!")
              alert("Feedback Recorded!")
              navigate('/Reviewer-Home')
            } else {
              console.error("Error for neutral paper:", res.data.message);
            }
          })
          .catch(error => {
            console.error("Error for neutral paper:", error);
          });
      };

    return (
        <div className='Home-Page'>
          
          <h1 className='Page-Header'> {paper.Title}: </h1>
            <div className='Item_Details'>
                <p><strong>Written By:</strong> {paper.Author} </p>
                <p className='Paper_Content'>Paper contents would be displayed here if the system allowed for uploading documents.</p>
            </div>

            <button type = 'submit' className='btn btn-danger btn_reviewer'onClick={handleReject}><strong>Reject</strong></button>
            <button type = 'submit' className='btn btn-primary btn_reviewer'onClick={handleNeutral}><strong>Neutral</strong></button>
            <button type = 'submit' className='btn btn-success btn_reviewer' onClick={handleAccept}><strong>Accept</strong></button>
            

        </div>
      )

}
export default Paper_Review;