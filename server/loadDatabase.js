const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

const db = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

const initializeDatabase = () => {
    db.connect();

    db.query(`
    CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL,
        "username" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("id")
    );`)
}


const Datastore = require("nedb");

const database = new Datastore("./database/pokemonDB.db");
database.loadDatabase();

module.exports = { database, db, initializeDatabase };