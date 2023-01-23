const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();
const { db } = require("../loadDatabase");

const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    db.query(`SELECT * FROM users WHERE username = $1 and password = $2`, [username, password],
    (err, result) => {
        if(err) {
            console.log(err);
            res.send({err: err});
        }
            
        if(result.rows.length > 0) {
            if(result.rows[0].username === "" || result.rows[0].password === "") {
                res.send({message: "Invalid username or password!", value: false});
            } else {
                res.send({ user: result.rows[0], value: true });
            }
        } else {
            res.send({message: "Invalid username or password!", value: false});
        }
    });
});

module.exports = router;