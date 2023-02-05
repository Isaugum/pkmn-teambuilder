import { useMemo } from 'react';
import style from './style/PkmnCardSmall.module.css';

const PkmnCardSmall = ({pokemon, search}) => {

  let nameRegex = new RegExp(search.name, "i");
  let type1Regex = new RegExp(search.type1, "i");
  let type2Regex = new RegExp(search.type2, "i");
  let abilityRegex = new RegExp(search.ability, "i");
  let move1Regex = new RegExp(search.move1, "i");
  let move2Regex = new RegExp(search.move2, "i");
  let move3Regex = new RegExp(search.move3, "i");
  let move4Regex = new RegExp(search.move4, "i");

  let nameMatch = nameRegex.test(pokemon.name) 
      && type1Regex.test(pokemon.types.map(type => type.type.name)) 
      && type2Regex.test(pokemon.types.map(type => type.type.name))
      && abilityRegex.test(pokemon.abilities.map(ability => ability.ability.name))
      && move1Regex.test(pokemon.moves.map(move => move.move.name))
      && move2Regex.test(pokemon.moves.map(move => move.move.name))
      && move3Regex.test(pokemon.moves.map(move => move.move.name))
      && move4Regex.test(pokemon.moves.map(move => move.move.name));

  return (
    <>
    <div className={nameMatch ? style.pkmnCard : style.hidden}>
        <h3 className={style.pkmnName}>{pokemon.name.toUpperCase()}</h3>
        <img className={style.pkmnSprite} src={pokemon.sprites.front_default} />
        <div className={style.pkmnTypes}>
          {pokemon.types.map(type => {
          return <p className={style.typeInstance}>{type.type.name}</p>
          })}              
        </div>
        <div className={style.pkmnAbilities}>
          {pokemon.abilities.map(ability => {
            return <p className={style.abilityInstance}>{ability.ability.name}</p>
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
}


export { PkmnCardSmall }