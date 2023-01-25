const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("../loadDatabase");
const { json } = require("express");

const bcrypt = require("bcrypt");
const saltRounds = 10;


let router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(req.body);

    db.query(`SELECT * FROM users WHERE username = $1`, [username],
    (err, result) => {
        if(err) {
            console.log(err);
            res.send({err: err});
        }
            
        if(result.rows.length > 0) {
            res.send({message: "Username already exists!"});
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) {
                    console.log(err);
                }

                db.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [username, hash]);
            })
            res.send({message: "User added."});
        }
    });
});    

module.exports = router;