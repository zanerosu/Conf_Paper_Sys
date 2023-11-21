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
