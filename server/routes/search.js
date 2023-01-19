const express = require("express");
const database = require("../loadDatabase");	
let router = express.Router();

router.get("/", (req, res) => {

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

function searchDatabase(query) {

    let matchy = [];

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

module.exports = router;