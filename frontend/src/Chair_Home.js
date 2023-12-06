import React from 'react';
import { useNavigate } from 'react-router-dom'

function Chair_Home() {
  const navigate = useNavigate();

  return (
    <div className='Home-Page'>
        <h1 className='Page-Header'>Conference Chair Home <img src = "Conf_Chair-Icon.png" className = "Home-Image"/> </h1>
        <div className='Home-List Author_Home'>
          <ul onClick={() => navigate('/Assign-Reviewers')} id = "Assign_Reviwers">
            <label for = "Assign_Reviewers">
              <img src = "Reviewer-Icon.png" alt = "Icon 1"/>
              <br/>
              <a>Assign Reviewers</a>
            </label>
          </ul>
          <ul onClick={() => navigate('/Review-Progress')} id = "View_Review_Progress">
            <label>
                <img src = "Status_icon.png" alt = "Icon 2"/>
                <br/>
                View Review
                <br/>Progress
            </label>
          </ul>

          <ul onClick={() => navigate('/Final-Recc')} id = "Make_Recommendation">
            <label>
                <img src = "Recommend-icon.png" alt = "Icon 2"/>
                <br/>
                Final <br/>Recommendation
            </label>
          </ul>
        </div>
    </div>
  )
}

export default Chair_Home