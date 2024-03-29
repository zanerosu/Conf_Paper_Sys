import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Assign_Reviewers() {

  const [papers, setPapers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState({}); // Initialize as an object
  const [reviewers, setReviewers] = useState([]);
  const navigate = useNavigate();

  //Function to handle changes in selected reviewers
  const handleReviewerChange = (PaperID, reviewerNumber, selectedReviewer) => {
    setSelectedReviewers((prevReviewers) => ({
      ...prevReviewers,
      [PaperID]: {
        ...prevReviewers[PaperID],
        [`Reviewer_${reviewerNumber}`]: selectedReviewer,
      },
    }));
  };

  //Saves reviewers to each paper depending on paperID
  const saveReviewers = () => {
    console.log("Selected Reviewers:", selectedReviewers);

    const reviewersData = Object.keys(selectedReviewers).map(PaperID => ({
      PaperID,
      reviewer1: selectedReviewers[PaperID]?.Reviewer_1 || null,
      reviewer2: selectedReviewers[PaperID]?.Reviewer_2 || null,
      reviewer3: selectedReviewers[PaperID]?.Reviewer_3 || null,
    }));

    axios.post('http://localhost:8081/Set_Reviewers', { reviewersData })
      .then(res => {
        if (res.data.status === 'Success') {
          console.log(res.data.message);
          alert("Reviewers Assigned")
          navigate('/Chair-Home')
        } else {
          console.error('Error saving reviewers:', res.data.message);
        }
      })
      .catch(error => {
        console.error('Error saving reviewers:', error);
      });
  };

  //Effect hook that gets Reviewers from database
  useEffect(() => {
    axios.get('http://localhost:8081/Get_Reviewers')
      .then(res => {
        if (res.data.status === "Success") {
          setReviewers(res.data.reviewers);
        } else {
          console.error("Error fetching reviewers:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching reviewers:", error);
      });
  }, []);

  
  //Effect hook that gets paper data from the database
  useEffect(() => {
    axios.get('http://localhost:8081/Get_Papers')
      .then(res => {
        if (res.data.status === "Success") {
          setPapers(res.data.papers);
        } else {
          console.error("Error fetching papers:", res.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching papers:", error);
      });
  }, []);

  //Render the component JSX
  return (
    <div className='Home-Page'>
      <h1 className='Page-Header'>Assign Reviewers <img src="Reviewer-Icon.png" className="Home-Image" /> </h1>

      <div className='Item_Lists'>
        <h2>Papers:</h2>
        <ul class="ItemList_UL"> {papers.map(paper => (
          <ul class="ItemList_UL" key={paper.PaperID}>
            <li>
              <img src="Paper icon.png" className='Conference_Icons' />
              <h3 className='Conference_List_Conf_Name'>{paper.Title}</h3>
              <p className='Conference_List_Dates'>By: {paper.Author}</p>

              <select
                className="form-select Reviewer_Dropdown" 
                aria-label="Default select example"
                value={selectedReviewers[paper.PaperID]?.Reviewer_1 || null}
                onChange={(e) =>
                  handleReviewerChange(paper.PaperID, 1, e.target.value)
                }
              >
                <option value="">Select Reviewer 1</option>
                {reviewers.map((reviewer) => (
                  <option key={reviewer.Username} value={reviewer.Username}>
                    {reviewer.Fname} {reviewer.Lname}
                  </option>
                ))}
              </select>

              <select
              className="form-select Reviewer_Dropdown" 
              aria-label="Default select example"
                value={selectedReviewers[paper.PaperID]?.Reviewer_2 || null}
                onChange={(e) =>
                  handleReviewerChange(paper.PaperID, 2, e.target.value)
                }
              >
                <option value="">Select Reviewer 2</option>
                {reviewers.map((reviewer) => (
                  <option key={reviewer.Username} value={reviewer.Username}>
                    {reviewer.Fname} {reviewer.Lname}
                  </option>
                ))}
              </select>

              <select
              className="form-select Reviewer_Dropdown" 
              aria-label="Default select example"
                value={selectedReviewers[paper.PaperID]?.Reviewer_3 || null}
                onChange={(e) =>
                  handleReviewerChange(paper.PaperID, 3, e.target.value)
                }
              >
                <option value="">Select Reviewer 3</option>
                {reviewers.map((reviewer) => (
                  <option key={reviewer.Username} value={reviewer.Username}>
                    {reviewer.Fname} {reviewer.Lname}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        ))}
        </ul>
        {/* Button to save reviewers */}
        <button type="button" className='btn btn-success' onClick={saveReviewers}>
          Save Reviewers
        </button>
      </div>

    </div>
  )
}

export default Assign_Reviewers;
