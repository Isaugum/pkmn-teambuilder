
import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  MainMenu,
  LoginForm,
  DisplaySingle
} from "./pages";

export const LoginContext = createContext(null);
export const DataContext = createContext(null);

const App = () => {

  const [userSession, setUserSession] = useState(false);
  const [ pokemonList, setPokemonList ] = useState([]);
  const [ loadingDatabase, setLoadingDatabase ] = useState(true);

  let counter = 0;

  const fetchIndividualPokemon = async (url, index, pokemonCount) => {
    const result = await axios({
      method: "get",
      url: `${url}`
    })
    .then(result => {
      let pokeData = result.data;
      let pokeTypes = result.data.types.map(type => type.type.name);
      let pokeAbilities = result.data.abilities.map(ability => {
        let someAbility = ability.ability.name;
        let newAbility = someAbility.replace("-", " ");
        return newAbility;
      });
      let pokeMoves = result.data.moves.map(move => {
        let someMove = move.move.name;
        let newMove = someMove.replace("-", " ");
        return newMove;
      });
      let pokeSprites = result.data.sprites
      let pokeStats = result.data.stats;
      let pokemon = {
        name: result.data.name,
        types: pokeTypes,
        abilities: pokeAbilities,
        moves: pokeMoves,
        sprites: pokeSprites,
        stats: pokeStats
      }
      setPokemonList(prevState => [
        ...prevState,
        pokemon
      ]);
    })
  }

  //1279 - all pokemon
  const fetchPokemon = async (pokemon, checkcheck) => {

    const result = await axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon?limit=1279"
    })
    .then(result => {
      pokemon = result.data.results;
    }).then(
      result => {
        let index = 0;
        const pokemonCount = pokemon.length;

        pokemon.forEach(p => {
          fetchIndividualPokemon(p.url, index, pokemonCount);
          index++;
        })
      }
    ).then(res => {
      setLoadingDatabase(false);
    });
  }

  //Fetch all pokemon
  useEffect(() => {
    fetch(`/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(response => response.json())
    .then(response => {
      JSON.stringify(response);

      setUserSession(response);
    })

    if(counter != 1) {
      let pokemon;
      fetchPokemon(pokemon);
      counter = 1;
    }

  }, []);
  
  return (
    <div className="">
      <LoginContext.Provider value={{userSession, setUserSession}}>
        <DataContext.Provider value={{pokemonList, setPokemonList, loadingDatabase, setUserSession}}>
          <>
          {
            loadingDatabase ? <h1>LOADING...</h1> :
            userSession === false ? < LoginForm /> : < MainMenu />
          }
          </>
        </DataContext.Provider>
      </LoginContext.Provider>      
    </div>

  );
}

export default App;
