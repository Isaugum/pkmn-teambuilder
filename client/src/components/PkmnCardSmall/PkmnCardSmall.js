import React, { useContext, useMemo } from 'react';
import { RegexContext } from '../../pages';
import style from './style/PkmnCardSmall.module.css';

const PkmnCardSmall = React.memo(({pokemon}) => {

  const {nameRegex, type1Regex, type2Regex, abilityRegex, move1Regex, move2Regex, move3Regex, move4Regex} = useContext(RegexContext);

  let nameMatch = nameRegex.test(pokemon.name) 
      && type1Regex.test(pokemon.types.map(type => type))
      && type2Regex.test(pokemon.types.map(type => type))
      && abilityRegex.test(pokemon.abilities.map(ability => ability))
      && move1Regex.test(pokemon.moves.map(move => move))
      && move2Regex.test(pokemon.moves.map(move => move))
      && move3Regex.test(pokemon.moves.map(move => move))
      && move4Regex.test(pokemon.moves.map(move => move));

  const handleCardClick = (pokemon) => {
      console.log(pokemon);
  }

  return (
    <>
    <div className={nameMatch ? style.pkmnCard : style.hidden} onClick={() => handleCardClick(pokemon.name)}>
        <h3 className={style.pkmnName}>{pokemon.name.toUpperCase()}</h3>
        <img className={style.pkmnSprite} src={pokemon.sprites.front_default} />
        <div className={style.pkmnTypes}>
          {pokemon.types.map(type => {
          return <p className={style.typeInstance}>{type}</p>
          })}              
        </div>
        <div className={style.pkmnAbilities}>
          {pokemon.abilities.map(ability => {
            return <p className={style.abilityInstance}>{ability}</p>
          })}
        </div>
        <div className={style.pkmnStats}>
          {pokemon.stats.map(stat => {
            return <p className={style.statInstance}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
          })}
        </div>
    </div>
    </>
    )
})


export { PkmnCardSmall }