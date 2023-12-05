const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

//Link to mySQL database hosted using XAMPP
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "conference paper system"
})

app.listen(8081, ()=> {
    console.log("listening");
})

//Login a user based off the authorized users in the users table in the database.
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM `users` WHERE `Username` = ? AND `Password` = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }

        if(data.length > 0){
            const user = data[0];
            const {Password, ...user_No_Pass} = user; 

            return res.status(200).json({
                status: "Success",
                user: user_No_Pass,
            });
        } else{
            return res.json("Fail");
        }
    })
})

//Creating a new conference in the database via the New-Conference screen
app.post('/New-Conference', (req, res) => {
    const sql = "INSERT INTO `conferences` (`Conf_Name`, `City`, `State`, `Country`, `Start_Date`, `End_Date`, `Deadline`, `Conf_Chair`) VALUES (?)";
    const values = [
        req.body.Conf_Name,
        req.body.City,
        req.body.State,
        req.body.Country,
        req.body.Start_Date,
        req.body.End_Date,
        req.body.Deadline,
        req.body.Conf_Chair
    ]
    db.query(sql, [values], (error, data)=>{
        if (error) {
            console.error("Error creating conference:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(201).json({
            status: "Success",
            data: data
        });
    });
});

//Creating a new paper in the database via the New-Paper Screen
app.post('/New-Paper', (req, res) => {
    const sql = "INSERT INTO `papers` (`Title`, `Author`, `Status`, `ConfID`) VALUES (?)";
    const values = [
        req.body.Title,
        req.body.Author,
        req.body.Status,
        req.body.Conference
    ]
    db.query(sql, [values], (error, data)=>{
        if (error) {
            console.error("Error uploading paper:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            data: data
        });
    });
});

//Retrieves all conferences that still have a valid deadline
app.get('/Get_Conferences', (req, res) => {
    const sql = "SELECT Conf_Name, ConfID, Start_Date, End_Date FROM conferences WHERE Deadline >= CURDATE()";
    db.query(sql, (error, conferences) => {
        if (error) {
            console.error("Error fetching conferences:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error",
                error: error.message
            });
        }

        return res.status(200).json({
            status: "Success",
            conferences: conferences
        });
    });
});

//Get a paper status depending on the logged in user
app.get('/Paper-Status', (req, res) =>{
    if(!req.query.Username){
        return res.status(400).json({
            status: 'Error',
            message: 'Username is required',
        })
    }

    const sql = "SELECT * FROM papers WHERE Author = ?";

    db.query(sql, [req.query.Username], (error, papers) => {
        if (error) {
          console.error("Error fetching paper status", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
    
        if (papers.length === 0) {
          return res.status(404).json({
            status: "Error",
            papers:[]
          });
        }
        return res.status(200).json({
          status: "Success",
          papers: papers
        });
      });
});


//Get a paper status depending on the logged in user
app.get('/Paper-Status-Conference', (req, res) =>{
    if(!req.query.Username){
        return res.status(400).json({
            status: 'Error',
            message: 'Username is required',
        })
    }

    const sql = "SELECT * FROM papers JOIN conferences ON papers.ConfID = conferences.ConfID WHERE conferences.Conf_Chair = ?;";

    db.query(sql, [req.query.Username], (error, papers) => {
        if (error) {
          console.error("Error fetching paper status", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
    
        if (papers.length === 0) {
          return res.status(404).json({
            status: "Error",
            papers:[]
          });
        }
        return res.status(200).json({
          status: "Success",
          papers: papers
        });
      });
});

//Retrieves all papers for a reviewer
app.get('/Review-Papers', (req, res) => {
    if (!req.query.Username) {
      return res.status(400).json({
        status: 'Error',
        message: 'Username is required',
      });
    }
    
    const sql = "SELECT * FROM papers WHERE (Reviewer_1 = ? OR Reviewer_2 = ? OR Reviewer_3 = ?) AND (App_Count + Rej_Count) < 3";
    const params = [req.query.Username, req.query.Username, req.query.Username];
  
    db.query(sql, [...params], (error, papers) => {
      if (error) {
        console.error("Error fetching paper status", error);
        return res.status(500).json({
          status: "Error",
          message: "Internal Server Error"
        });
      }
  
      const [firstPaper] = papers;
  
      if (!firstPaper) {
        return res.status(200).json({
          status: "Success",
          papers: []
        });
      }
  
      return res.status(200).json({
        status: "Success",
        papers: papers
      });
    });
  });

//Retrieves all authors 
app.get('/Get_Authors', (req, res) => {
    const sql = "SELECT * FROM users WHERE Affiliation LIKE '%Author%'";
    db.query(sql, (error, authors) => {
        if (error) {
            console.error("Error fetching authors:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            authors: authors
        });
    });
});

//Retrieves all Papers from conf
app.get('/Get_Papers', (req, res) => {
    const sql = "SELECT * FROM papers";
    db.query(sql, (error, papers) => {
        if (error) {
            console.error("Error fetching papers:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            papers: papers
        });
    });
});

//Retrieves all reviewers 
app.get('/Get_Reviewers', (req, res) => {
    const sql = "SELECT * FROM users WHERE Affiliation LIKE '%Reviewer%'";
    db.query(sql, (error, reviewers) => {
        if (error) {
            console.error("Error fetching Reviewers:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            reviewers: reviewers
        });
    });
});

//Retrieves all chairs 
app.get('/Get_Chairs', (req, res) => {
    const sql = "SELECT * FROM users WHERE Affiliation LIKE '%Chair%'";
    db.query(sql, (error, chairs) => {
        if (error) {
            console.error("Error fetching Chairs:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            chairs: chairs
        });
    });
});

app.post('/Set_Reviewers', (req, res) => {
    const { reviewersData } = req.body;

    const updatePromises = reviewersData.map(({ PaperID, reviewer1, reviewer2, reviewer3 }) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE papers SET Reviewer_1 = ?, Reviewer_2 = ?, Reviewer_3 = ? WHERE PaperID = ?";
            const values = [reviewer1, reviewer2, reviewer3, PaperID];

            db.query(sql, values, (error, result) => {
                if (error) {
                    console.error("Error updating Reviewers:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(() => {
            return res.status(200).json({
                status: "Success",
                message: "Reviewers updated successfully"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        });
});


//Get Conference details based off conference ID
app.get('/Conference-Details/:id', (req, res) =>{
    const conferenceID = req.params.id;

    const sql = "SELECT * FROM conferences WHERE ConfID = ?";

    db.query(sql, [conferenceID], (error, result) => {
        if (error) {
          console.error("Error fetching conference details:", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
    
        if (result.length === 0) {
          return res.status(404).json({
            status: "Error",
            message: "Conference not found"
          });
        }
    
        const conference = result[0];
        return res.status(200).json({
          status: "Success",
          conference: conference
        });
      });
});

//Get Paper details based off paper ID
app.get('/Paper-Details/:id', (req, res) =>{
    const PaperID = req.params.id;

    const sql = "SELECT * FROM papers WHERE PaperID = ?";

    db.query(sql, [PaperID], (error, result) => {
        if (error) {
          console.error("Error fetching paper details:", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
    
        if (result.length === 0) {
          return res.status(404).json({
            status: "Error",
            message: "Conference not found"
          });
        }
    
        const paper = result[0];
        return res.status(200).json({
          status: "Success",
          paper: paper
        });
      });
});



//Increment accept count
app.post('/Accept-Paper/:id', (req, res) => {
    const PaperID = req.params.id;
    console.log(PaperID)
    // Fetch the paper from the database
    const sql = "UPDATE papers SET App_Count = App_Count + 1 WHERE PaperID = ?"

    db.query(sql, [PaperID], (error, result) => {
        if (error) {
            console.error("Error updating paper status details:", error);
            return res.status(500).json({
              status: "Error",
              message: "Internal Server Error"
            });
          }
          return res.status(200).json({
            status: "Success",
          });
        });
    });


//Increment reject count
app.post('/Reject-Paper/:id', (req, res) => {
    const PaperID = req.params.id;
    console.log(PaperID)
    // Fetch the paper from the database
    const sql = "UPDATE papers SET Rej_Count = Rej_Count + 1 WHERE PaperID = ?"

    db.query(sql, [PaperID], (error, result) => {
        if (error) {
            console.error("Error updating paper status details:", error);
            return res.status(500).json({
              status: "Error",
              message: "Internal Server Error"
            });
          }
          return res.status(200).json({
            status: "Success",
          });
        });
    });


    //Increment neutral count
app.post('/Neutral-Paper/:id', (req, res) => {
  const PaperID = req.params.id;
  console.log(PaperID)
  // Fetch the paper from the database
  const sql = "UPDATE papers SET Neut_Count = Neu_Count + 1 WHERE PaperID = ?"

  db.query(sql, [PaperID], (error, result) => {
      if (error) {
          console.error("Error updating paper status details:", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
        return res.status(200).json({
          status: "Success",
        });
      });
  });


//Set paper status to Don't Publish
app.post('/NoPublish-Paper/:id', (req, res) => {
  const PaperID = req.params.id;
  console.log(PaperID)
  // Fetch the paper from the database
  const sql = "UPDATE papers SET Status = 'Not Published' WHERE PaperID = ?"

  db.query(sql, [PaperID], (error, result) => {
      if (error) {
          console.error("Error updating paper status details:", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
        return res.status(200).json({
          status: "Success",
        });
      });
  });


//Set paper status to Publish
app.post('/Publish-Paper/:id', (req, res) => {
  const PaperID = req.params.id;
  console.log(PaperID)
  // Fetch the paper from the database
  const sql = "UPDATE papers SET Status = 'Published' WHERE PaperID = ?"

  db.query(sql, [PaperID], (error, result) => {
      if (error) {
          console.error("Error updating paper status details:", error);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
          });
        }
        return res.status(200).json({
          status: "Success",
        });
      });
  });