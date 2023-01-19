import "./DisplayPokemon.css";
import { PkmnCardSmall } from '../PkmnCardSmall';

const DisplayPokemon = ({ data, clickedMon, capitalize }) => {

  return (
    
    <div className="display-mons">
      {data.map((mon) => {
        return < PkmnCardSmall mon={mon} capitalize={capitalize} clickedMon={clickedMon}/>
      })}
    </div>
  );
};

export { DisplayPokemon };
