import { useContext, useState } from "react";
import style from "./style/MainMenu.module.css";
import { DataContext } from "../../App";
import { PkmnCardSmall } from "../../components/PkmnCardSmall/PkmnCardSmall";

const MainMenu = ({props}) => {

  const [ searchQuery, setSearchQuery ] = useState("");
  const { pokemonList, loadingDatabase, setUserSession } = useContext(DataContext);

  const handleChange = e => {
    let key = e.target.id;
    let value = e.target.value;

    setSearchQuery({
      ...searchQuery,
      [key]: value
    });
  }


  return (
    <> 
      { loadingDatabase ? <h1>LOADING...</h1> : <h1>READY.</h1>}
      <button onClick={() => setUserSession(false)}>LOGOUT</button>
      <input type="text" placeholder="pokemon" id="name" onChange={handleChange} />
      <input type="text" placeholder="type 1" id="type1" onChange={handleChange} />
      <input type="text" placeholder="type 2" id="type2" onChange={handleChange} />
      <input type="text" placeholder="ability" id="ability" onChange={handleChange} />
      <input type="text" placeholder="move 1" id="move1" onChange={handleChange} />
      <input type="text" placeholder="move 2" id="move2" onChange={handleChange} />
      <input type="text" placeholder="move 3" id="move3" onChange={handleChange} />
      <input type="text" placeholder="move 4" id="move4" onChange={handleChange} />
      <div className={style.cardContainer}>
      { !loadingDatabase && pokemonList.map(pokemon => {
        return < PkmnCardSmall pokemon={pokemon} search={searchQuery}/>;
      })}
      </div>
    </>
  );
};

export { MainMenu };
