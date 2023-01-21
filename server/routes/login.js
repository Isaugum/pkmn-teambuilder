const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("express");
let router = express.Router();

const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(req.body);

    if(username === "user" || password === "123") {
        res.send({
            login: "user123"
        });
    } else {
        res.send("Invalid password");
    }
});    

module.exports = router;