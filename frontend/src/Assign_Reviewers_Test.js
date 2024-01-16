import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Assign_Reviewers_Test(){
    const [papers, setPapers] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [selectedReviewers, setSelectedReviewers] = useState([]);
    
    
    //Gets Papers
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

    //Gets Reviewers
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

      const handlePaperSelect = (PaperID) => {
        setSelectedPaper(PaperID)
      }


}
export default Assign_Reviewers_Test;