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

//Retrieves all authors 
app.get('/Get_Authors', (req, res) => {
    const sql = "SELECT * FROM users WHERE Affiliation = 'Author'";
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

//Retrieves all Papers
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
    const sql = "SELECT * FROM users WHERE Affiliation = 'Reviewer'";
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

app.post('/Set_Reviewers', (req, res) => {
    const { paperID, reviewer1, reviewer2, reviewer3 } = req.body;

    const sql = "UPDATE papers SET Reviewer_1 = ?, Reviewer_2 = ?, Reviewer_3 = ? WHERE PaperID = ?";
    const values = [reviewer1, reviewer2, reviewer3, paperID];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error updating Reviewers:", error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Reviewers updated successfully"
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





