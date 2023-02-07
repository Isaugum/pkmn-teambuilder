import "../../index.css"
import InfiniteScroll from "react-infinite-scroller";

import React, { useContext, useState, useMemo, useEffect } from "react";
import { DataContext } from "../../App";
import { PkmnCardSmall } from "../../components/PkmnCardSmall/PkmnCardSmall";
import { createContext } from "react";

const RegexContext = createContext(null);

const MainMenu = React.memo(({props}) => {

  //const [ searchQuery, setSearchQuery ] = useState("");
  const [ type1Query, setType1Query ] = useState("");
  const [ type2Query, setType2Query ] = useState("");
  const [ abilityQuery, setAbilityQuery ] = useState("");
  const [ move1Query, setMove1Query ] = useState("");
  const [ move2Query, setMove2Query ] = useState("");
  const [ move3Query, setMove3Query ] = useState("");
  const [ move4Query, setMove4Query ] = useState("");

  const { pokemonList, loadingDatabase, setUserSession } = useContext(DataContext);

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

  const itemsPerPage = 10;
  const [hasMore, setHasMore] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);

  const pokemonToShow = (pokeMemo) => {
    var items = [];
    for (let i = 0; i < records; i++) {
      items.push(
        pokeMemo[i]
      );
    }
    return items;
  };

  const loadMore = () => {
    if (records === pokeMemo.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setrecords(records + itemsPerPage);
      }, 1000);
    }
  };

  return (
    <>
    <div className="bg-blue-100" >
      { loadingDatabase ? <h1>LOADING...</h1> : 
      <>
      <button className="bg-gray-200 border-2 border-solid border-gray-600 relative top-5 left-5 py-2 px-5" onClick={() => setUserSession(false)}>LOGOUT</button>
      <div className="text-center text-xl text-3x1 mt-20" >
        WELCOME TO PKMN TEAMBUILDER
      </div>
      <div className="flex flex-row justify-evenly items-center mt-20" >
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="type 1" id="type1" onChange={e => {e.preventDefault();  setTimeout(() => {setType1Query(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="type 2" id="type2" onChange={e => {e.preventDefault(); setTimeout(() => {setType2Query(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="ability" id="ability" onChange={e => {e.preventDefault(); setTimeout(() => {setAbilityQuery(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="move 1" id="move1" onChange={e => {e.preventDefault(); setTimeout(() => {setMove1Query(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="move 2" id="move2" onChange={e => {e.preventDefault(); setTimeout(() => {setMove2Query(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="move 3" id="move3" onChange={e => {e.preventDefault(); setTimeout(() => {setMove3Query(e.target.value)}, 200);}} />
        <input className="border-2 border-solid border-gray-400" type="text" placeholder="move 4" id="move4" onChange={e => {e.preventDefault(); setTimeout(() => {setMove4Query(e.target.value)}, 200);}} />
      </div>
      <RegexContext.Provider value={{type1Regex, type2Regex, abilityRegex, move1Regex, move2Regex, move3Regex, move4Regex}} >
        <div className="mt-10" >
          <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
          useWindow={false}
          >
            {pokemonToShow(pokeMemo)}
          </InfiniteScroll>
        </div>
      </RegexContext.Provider>
      </>
      }
      </div> 
    </>
  );
});

export { MainMenu, RegexContext };
