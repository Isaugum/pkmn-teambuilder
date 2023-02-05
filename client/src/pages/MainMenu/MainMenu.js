import React, { useContext, useState, useMemo, useEffect } from "react";
import style from "./style/MainMenu.module.css";
import { DataContext } from "../../App";
import { PkmnCardSmall } from "../../components/PkmnCardSmall/PkmnCardSmall";
import { createContext } from "react";

const RegexContext = createContext(null);

const MainMenu = React.memo(({props}) => {

  //const [ searchQuery, setSearchQuery ] = useState("");
  const [ nameQuery, setNameQuery ] = useState("");
  const [ type1Query, setType1Query ] = useState("");
  const [ type2Query, setType2Query ] = useState("");
  const [ abilityQuery, setAbilityQuery ] = useState("");
  const [ move1Query, setMove1Query ] = useState("");
  const [ move2Query, setMove2Query ] = useState("");
  const [ move3Query, setMove3Query ] = useState("");
  const [ move4Query, setMove4Query ] = useState("");

  const { pokemonList, loadingDatabase, setUserSession } = useContext(DataContext);

  let nameRegex = new RegExp(nameQuery, "i");
  let type1Regex = new RegExp(type1Query, "i");
  let type2Regex = new RegExp(type2Query, "i");
  let abilityRegex = new RegExp(abilityQuery, "i");
  let move1Regex = new RegExp(move1Query, "i");
  let move2Regex = new RegExp(move2Query, "i");
  let move3Regex = new RegExp(move3Query, "i");
  let move4Regex = new RegExp(move4Query, "i");

  const pokeMemo = useMemo(() => {
    return pokemonList.map(pokemon => {
      return < PkmnCardSmall pokemon={pokemon} />;
    })        
  }, [pokemonList]);

  useEffect(() => {
    console.log("Well helloo.");
  })


  return (
    <> 
      { loadingDatabase ? <h1>LOADING...</h1> : <h1>READY.</h1>}
      <button onClick={() => setUserSession(false)}>LOGOUT</button>
      <input type="text" placeholder="pokemon" id="name" onChange={e => {e.preventDefault(); setNameQuery(e.target.value)}} />
      <input type="text" placeholder="type 1" id="type1" onChange={e => {e.preventDefault(); setType1Query(e.target.value)}} />
      <input type="text" placeholder="type 2" id="type2" onChange={e => {e.preventDefault(); setType2Query(e.target.value)}} />
      <input type="text" placeholder="ability" id="ability" onChange={e => {e.preventDefault(); setAbilityQuery(e.target.value)}} />
      <input type="text" placeholder="move 1" id="move1" onChange={e => {e.preventDefault(); setMove1Query(e.target.value)}} />
      <input type="text" placeholder="move 2" id="move2" onChange={e => {e.preventDefault(); setMove2Query(e.target.value)}} />
      <input type="text" placeholder="move 3" id="move3" onChange={e => {e.preventDefault(); setMove3Query(e.target.value)}} />
      <input type="text" placeholder="move 4" id="move4" onChange={e => {e.preventDefault(); setMove4Query(e.target.value)}} />
      <RegexContext.Provider value={{nameRegex, type1Regex, type2Regex, abilityRegex, move1Regex, move2Regex, move3Regex, move4Regex}} >
        <div className={style.cardContainer}>
        { !loadingDatabase && pokeMemo }
        </div>
      </RegexContext.Provider>
    </>
  );
});

export { MainMenu, RegexContext };
