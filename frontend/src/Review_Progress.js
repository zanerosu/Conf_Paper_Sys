import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Review_Progress(){
    //Get user info from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    //State to hold papers
    const [papers, setPapers] = useState([]);

    //Effect hook to get paper data when the component mounts or the user changes
    useEffect(() => {
      //Check for user
      if (!user || !user.Username) {
        return;
      }
      //API Request to fetch paper data bsed on the user's username 
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
  
    //Display loading while getting paper data
    if (!papers) {
      return <div>Loading...</div>;
    }

    //Process papers to group them by conference
    const papersByConference = papers.reduce((acc, paper) => {
      if (!acc[paper.Conf_Name]) {
          acc[paper.Conf_Name] = [];
      }
      acc[paper.Conf_Name].push(paper);
      return acc;
  }, {});
    
    return (
      <div className='Home-Page'>
          <div className='Item_Lists'>
              {Object.entries(papersByConference).map(([conference, papers]) => (
                  <div key={conference}>
                      <h2>{conference} Papers:</h2>
                      <ul class="ItemList_UL">
                          {papers.map((paper, index) => (
                              <ul class="ItemList_UL"key={index}>
                                  <li>
                                      <img src="Paper icon.png" className='Conference_Icons' alt='Paper Icon' />
                                      <h3 className='Conference_List_Conf_Name'>{paper.Title}</h3>
                                      <p className='Conference_List_Dates'>Accepted: {paper.App_Count} <br />Rejected: {paper.Rej_Count} <br/>Neutral: {paper.Neu_Count}</p>
                                  </li>
                              </ul>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Review_Progress;