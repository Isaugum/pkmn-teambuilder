import './PkmnCardSmall.css';

const PkmnCardSmall = (props) => {

    return (

        <div className="mon-card" key={props.mon.id}
            onClick={() => {
              props.clickedMon(props.mon);
            }}>
            
            <div className="mon-itself">
              <img className="mon-image" src={props.mon.spriteFront} />
            </div>

            <p className="mon-name">{`#${props.mon.id} - ${props.capitalize(props.mon.name)}`}</p>

            <div className="mon-typing">
              <h5>TYPES</h5>
              {props.mon.types.length === 1 ? (
                <p className="mon-type-instance">{props.capitalize(props.mon.types[0])}</p>
              ) : (
                props.mon.types.map((value) => {
                  let type = props.capitalize(value);
                  return <p className="mon-type-instance">{type}</p>;
                })
              )}
            </div>

            <div className="mon-abilities">
              <h5>ABILITIES</h5>
              {props.mon.abilities.map((value) => {
                let ability = props.capitalize(value);
                return <p className="mon-ability-instance">{ability}</p>;
              })}
            </div>

            <div className="mon-stats">
              <p className="mon-stat-instance">HP: {props.mon.stats.hp}</p>
              <p className="mon-stat-instance">Attack: {props.mon.stats.attack}</p>
              <p className="mon-stat-instance">Defense: {props.mon.stats.defense}</p>
              <p className="mon-stat-instance">
                SP Attack: {props.mon.stats["special-attack"]}
              </p>
              <p className="mon-stat-instance">
                SP Defense: {props.mon.stats["special-defense"]}
              </p>
              <p className="mon-stat-instance">Speed: {props.mon.stats.speed}</p>
            </div>
          </div>
    )
}


export { PkmnCardSmall }