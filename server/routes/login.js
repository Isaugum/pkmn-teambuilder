const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("express");
let router = express.Router();

const jsonParser = bodyParser.json();

const { Client } = require("pg")

const connectDb = async (username, password) => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })

        await client.connect();
        console.log("client connected");

        await client.query(`SELECT * FROM users WHERE username = $1`, [username])
        .then(res => {
            console.log(res.rows[0]);
        });

        await client.end();

    } catch (error) {
        console.log(error);
    }
}


router.post("/", jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(req.body);

    connectDb(username, password);

    res.send(true);
});    

module.exports = router;