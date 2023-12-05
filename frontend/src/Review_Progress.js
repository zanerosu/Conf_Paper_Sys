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

    const papersByConference = papers.reduce((acc, paper) => {
      if (!acc[paper.Conf_Name]) {
          acc[paper.Conf_Name] = [];
      }
      acc[paper.Conf_Name].push(paper);
      return acc;
  }, {});


    console.log(papers)
    
    return (
      <div className='Home-Page'>
          <div className='Item_Lists'>
              {Object.entries(papersByConference).map(([conference, papers]) => (
                  <div key={conference}>
                      <h2>{conference} Papers:</h2>
                      <ul>
                          {papers.map((paper, index) => (
                              <ul key={index}>
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