import "./styles/app.css";
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  MainMenu,
  LoginForm,
  DisplaySingle
} from "./pages";

export const LoginContext = createContext(null);
export const DataContext = createContext(null);

function App() {

  const [userSession, setUserSession] = useState(false);
  const [ pokemonList, setPokemonList ] = useState([]);
  const [ loadingDatabase, setLoadingDatabase ] = useState(true);

  let counter = 0;

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
  }, []);

  const fetchIndividualPokemon = async (url, index, pokemonCount) => {
    const result = await axios({
      method: "get",
      url: `${url}`
    })
    .then(result => {
      let pokeData = result.data;
      setPokemonList(prevState => [
        ...prevState,
        pokeData
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

    if(counter != 1) {
      let pokemon;
      fetchPokemon(pokemon);
      counter = 1;      
    }

  }, []);
  
  return (
    <div className="main-screen">
      <LoginContext.Provider value={{userSession, setUserSession}}>
        <DataContext.Provider value={{pokemonList, setPokemonList, loadingDatabase, setUserSession}}>
          <>
          {/*
            userSession === false ? < LoginForm /> : < MainMenu />
          */}
          < MainMenu />
          </>
        </DataContext.Provider>
      </LoginContext.Provider>      
    </div>

  );
}

export default App;
