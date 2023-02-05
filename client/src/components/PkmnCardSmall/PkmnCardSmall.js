import style from './style/PkmnCardSmall.module.css';

const PkmnCardSmall = ({pokemon, search}) => {

  let pokemonName = pokemon.name;
  let pokemonTypes = pokemon.types.map(type => {
    return type.type.name
  });

  let pokemonAbilities = pokemon.abilities.map(ability => {
    let theAbility = ability.ability.name
    let newAbility = theAbility.replace("-", " ");
    return newAbility;
  });

  let pokemonMoves = pokemon.moves.map(move => {
    let theMove = move.move.name;
    let newMove = theMove.replace("-", " ");
    return newMove;
  });

  let nameRegex = new RegExp(search.name, "i");
  let type1Regex = new RegExp(search.type1, "i");
  let type2Regex = new RegExp(search.type2, "i");
  let abilityRegex = new RegExp(search.ability, "i");
  let move1Regex = new RegExp(search.move1, "i");
  let move2Regex = new RegExp(search.move2, "i");
  let move3Regex = new RegExp(search.move3, "i");
  let move4Regex = new RegExp(search.move4, "i");

  let nameMatch = nameRegex.test(pokemonName) 
      && type1Regex.test(pokemonTypes.filter(type => type)) 
      && type2Regex.test(pokemonTypes.filter(type => type))
      && abilityRegex.test(pokemonAbilities.filter(ability => ability))
      && move1Regex.test(pokemonMoves.filter(move => move))
      && move2Regex.test(pokemonMoves.filter(move => move))
      && move3Regex.test(pokemonMoves.filter(move => move))
      && move4Regex.test(pokemonMoves.filter(move => move));

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