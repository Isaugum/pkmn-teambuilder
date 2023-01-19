console.log("Starting...");
import fetch from "node-fetch";
import Datastore from "nedb";
import express from "express";

// ================================================

//                    SERVER

// ================================================

const app = express();
const port = 8000;

let matchy = [];

//ROUTES

app.get("/search/", (req, res) => {

  const type_1 = req.query.type1;
  const type_2 = req.query.type2;
  const ability_q = req.query.ability;
  const move_1 = req.query.move1;
  const move_2 = req.query.move2;
  const move_3 = req.query.move3;
  const move_4 = req.query.move4;

  let searchObject = [
    {
      types: type_1,
    },
    {
      types: type_2,
    },
    {
      abilities: ability_q,
    },
    {
      moves: move_1,
    },
    {
      moves: move_2,
    },
    {
      moves: move_3,
    },
    {
      moves: move_4,
    },
  ];

  searchObject = searchObject.filter((value) => {
    return (
      value.moves !== undefined ||
      value.types !== undefined ||
      value.abilities !== undefined
    );
  });

  console.log(searchObject);

  let searchQuery = {
    $and: searchObject,
  };

  getData(searchQuery);

  async function getData(searchQuery) {
    let dataResults = await searchDatabase(searchQuery);
    res.send(JSON.stringify(dataResults));
  }

  
});

app.get("/pokemon/liked", (req, res) => {
  let pokeName = req.query.name;
  console.log(pokeName);

  database.find({ name: pokeName }, (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(result);

    savedPokemon.insert(result);
  });
});

app.listen(port, () => {
  console.log("Server listening on port 8000");
});

// ================================================

//                 DATABASE STUFF

// ================================================

const database = new Datastore("pokemonDB.db");
database.loadDatabase();

const savedPokemon = new Datastore("savedPokemonDB.db");
savedPokemon.loadDatabase();

//DATABASE QUERY
const searchDatabase = (query) => {
  return new Promise((resolve) => {
    database.find(query, (err, result) => {
      if (err) {
        console.log(err);
      }

      //reset matchy
      matchy = [];

      result.filter((mon) => {
        matchy.push(mon);
      });

      resolve(matchy);
    });
  });
};
