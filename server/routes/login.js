const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();
const { db } = require("../loadDatabase");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jsonParser = bodyParser.json();

router.get("/", jsonParser, (req, res) => {
    if(req.session.user) {
        res.send({ user: req.session.user, value: true });
    }
});

router.post("/", jsonParser, (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    db.query(`SELECT * FROM users WHERE username = $1`, [username],
    (err, result) => {
        if(err) {
            console.log(err);
            res.send({err: err});
        }
            
        if(result.rows.length > 0) {
            if(result.rows[0].username === "" || result.rows[0].password === "") {
                res.send({message: "Invalid username or password!", value: false});
            } else {
                bcrypt.compare(password, result.rows[0].password, (error, response) => {
                    if(error) {
                        console.log(error);

                    } else if (response) {
                        req.session.user = result.rows[0];
                        res.send({ user: req.session.user, value: true });
                    } else {
                        res.send({message: "Invalid password!", value: false});
                    }
                });
            }
        } else {
            res.send({message: "Username doesn't exist!", value: false});
        }
    });
});

module.exports = router;