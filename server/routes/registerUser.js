const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("../loadDatabase");
const { json } = require("express");
let router = express.Router();

const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    db.query(`SELECT * FROM users WHERE username = $1`, [username],
    (err, result) => {
        if(err) {
            console.log(err);
            res.send({err: err});
        }
            
        if(result.rows.length > 0) {
            res.send({message: "Username already exists!"});
        } else {
            db.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [username, password]);
            res.send({message: "User added."});
        }
    });
});    

module.exports = router;