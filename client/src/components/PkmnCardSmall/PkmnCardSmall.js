
import React, { useContext, useMemo } from 'react';
import { RegexContext } from '../../pages';

const PkmnCardSmall = React.memo(({pokemon}) => {

  const {type1Regex, type2Regex, abilityRegex, move1Regex, move2Regex, move3Regex, move4Regex} = useContext(RegexContext);

  let nameMatch = 
      type1Regex.test(pokemon.types.map(type => type))
      && type2Regex.test(pokemon.types.map(type => type))
      && abilityRegex.test(pokemon.abilities.map(ability => ability))
      && move1Regex.test(pokemon.moves.map(move => move))
      && move2Regex.test(pokemon.moves.map(move => move))
      && move3Regex.test(pokemon.moves.map(move => move))
      && move4Regex.test(pokemon.moves.map(move => move));

  const handleCardClick = (pokemon) => {
      console.log(pokemon);
  }

  let visible = "";
  if(!nameMatch) {
    visible = "hidden";
  } else {
    visible = "";
  }

  return (
    <>
    <div className={`${visible} w-auto h-20 flex flex-row justify-evenly items-center bg-gray-200 border-2 border-solid border-gray-300 my-1 cursor-pointer hover:h-24 duration-200`} onClick={() => handleCardClick(pokemon.name)}>
        <h3 className="text-sm">{pokemon.name.toUpperCase()}</h3>
        <img className="" src={pokemon.sprites.front_default} />
        <div className="text-xs">
          {pokemon.types.map(type => {
          return <p className="">{type}</p>
          })}              
        </div>
        <div className="text-xs">
          {pokemon.abilities.map(ability => {
            return <p className="">{ability}</p>
          })}
        </div>
        <div className="flex flex-row justify-evenly items-center text-xs">
          {pokemon.stats.map(stat => {
            return <p className="mx-5">{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
          })}
        </div>
    </div>
    </>
    )
})


export { PkmnCardSmall }