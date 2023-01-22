const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("express");
let router = express.Router();
const { Client } = require("pg")
const jsonParser = bodyParser.json();

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

        await client.query(`
        CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL,
            "username" VARCHAR(20) NOT NULL,
            "password" VARCHAR(20) NOT NULL,
            PRIMARY KEY ("id")
        );`)

        await client.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [username, password]);

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
});    

module.exports = router;