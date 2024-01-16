import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Reviewer_Home() {
  //Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  //State to hold assigned papers
  const [papers, setPapers] = useState([]);

  //Hook to navigate
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.Username) {
      return; // Don't proceed if user information is not available
    }
    
    //Get assigned papers based on the user's username
    axios.get(`http://localhost:8081/Review-Papers?Username=${user.Username}`)
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
     
        <h1 className='Page-Header'>Reviewer Home <img src = "Reviewer-Icon.png" className = "Home-Image"/> </h1>
        <div className='Item_Lists'>
        <h2>{user.Fname}'s Assigned Papers:</h2>
          <ul class="ItemList_UL"> {papers.map((paper, paperID) => (
            <ul class="ItemList_UL" key = {paperID} onClick={() => navigate(`/Paper-Review/${paper.PaperID}`)}>
              <li>
                <img src ="Review-Paper_Icon.png" className='Conference_Icons'/>
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

export default Reviewer_Home;