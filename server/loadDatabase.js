const Datastore = require("nedb");


const database = new Datastore("./database/pokemonDB.db");
database.loadDatabase();

module.exports = database;