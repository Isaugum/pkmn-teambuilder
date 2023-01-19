const database = new Datastore("pokemonDB.db");
database.loadDatabase();

//Fetch pokemon Data
const getPokemon = (pokemonId) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let movesList = [];
      let typesList = [];
      let abilitiesList = [];
      let statsList = {};

      //map stats
      response.stats.map((stat) => {
        let statName = stat.stat.name;
        let statValue = stat.base_stat;

        statsList[statName] = statValue;
      });

      //map types
      response.types.map((type) => {
        typesList.push(type.type.name);
      });

      response.abilities.map((ability) => {
        abilitiesList.push(ability.ability.name);
      });

      //map moves
      response.moves.map((move) => {
        movesList.push(move.move.name);
      });

      let pokemon = {
        id: response.id,
        name: response.name,
        types: typesList,
        abilities: abilitiesList,
        moves: movesList,
        spriteFront: response.sprites.front_default,
        spriteBack: response.sprites.back_default,
        spriteFrontShiny: response.sprites.front_shiny,
        spriteBackShiny: response.sprites.back_shiny,
        stats: statsList,
        weight: response.weight,
      };

      database.insert(pokemon);
    })
    .catch((err) => console.log(err));
};

//UpdateDatabase
const updateDatabase = (pokemonCount) => {
  for (let i = 1; i < pokemonCount; i++) {
    getPokemon(i);
  }

  console.log("database updated");
};
