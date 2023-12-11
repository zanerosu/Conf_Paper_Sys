import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Final_Recc(){
    const user = JSON.parse(localStorage.getItem('user'));
    const [papers, setPapers] = useState([]);

    //Hook for navigating to different pages
    const navigate = useNavigate();

    //Get papers based on user's username
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
  
    //If the papers are fetched, display loading message
    if (!papers) {
      return <div>Loading...</div>;
    }

    //Organize the papers by conference
    const papersByConference = papers.reduce((acc, paper) => {
      if (!acc[paper.Conf_Name]) {
          acc[paper.Conf_Name] = [];
      }
      acc[paper.Conf_Name].push(paper);
      return acc;
    }, {});

  const handleNoPublish = (PaperID) => {
    // Make an API call to increment the 'App_Count' attribute
    axios.post(`http://localhost:8081/NoPublish-Paper/${PaperID}`)
      .then(res => {
        if (res.data.status === "Success") {
          console.log("Success!")
          alert("Feedback Recorded!")
          navigate('/Chair-Home')
        } else {
          console.error("Error for paper decision:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error for paper decision:", error);
      });
  };

  const handlePublish = (PaperID) => {
    // Make an API call to increment the 'App_Count' attribute
    console.log(PaperID)
    axios.post(`http://localhost:8081/Publish-Paper/${PaperID}`)
      .then(res => {
        if (res.data.status === "Success") {
          console.log("Success!")
          alert("Feedback Recorded!")
          navigate('/Chair-Home')
        } else {
          console.error("Error for paper decision:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error for paper decision:", error);
      });
    };

    //Render the component
    return (
      <div className='Home-Page'>
          <div className='Item_Lists'>
              {Object.entries(papersByConference).map(([conference, papers]) => (
                  <div key={conference}>
                      <h2>{conference} Papers:</h2>
                      <ul class="ItemList_UL">
                          {papers.map((paper, index) => (
                              <ul class="ItemList_UL" key={index}>
                                  <li>
                                      <img src="Paper icon.png" className='Conference_Icons' alt='Paper Icon' />
                                      <h3 className='Conference_List_Conf_Name'>{paper.Title}</h3>
                                      <p className='Conference_List_Dates'>Recommendation: {getRecommendation(paper.App_Count, paper.Rej_Count, paper.Neu_Count)}</p>
                                      <button type = 'submit' className='btn btn-success btn_Chair'onClick={() => handlePublish(paper.PaperID)}><strong>Publish</strong></button>
                                      <button type = 'submit' className='btn btn-danger btn_Chair' onClick={() => handleNoPublish(paper.PaperID)}><strong>Don't Publish</strong></button>
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

//Determines recommendation based on counts
function getRecommendation(appCount, rejCount, neuCount) {
    if (appCount === 3) {
        return 'Publish';
    } else if (rejCount >= 2 || neuCount >= 2) {
        return 'Do Not Publish';
    } else {
        return 'Pending';
    }
}

export default Final_Recc;