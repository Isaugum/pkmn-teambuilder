import "./InputSingle.css";
import { useState } from "react";

const InputSingle = ({
  mon,
  exportMon,
  setExportMon,
  isHidden,
  setIsHidden,
  capitalize,
  
}) => {

  const [inputValues, setInputValues] = useState({
    ability: mon.abilities[0],

    item: "",

    nature: "",

    move1: "",
    move2: "",
    move3: "",
    move4: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value.toLowerCase();

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const pokemonStatsExport = (arrayToJoin) => {
    const newArr = arrayToJoin.map((obj) => {
      const pkmnName = `${
        obj.item !== ""
          ? `${capitalize(mon.name)} @ ${capitalize(obj.item)}\n`
          : `${mon.name}\n`
      }${obj.ability !== "" ? `Abillity: ${capitalize(obj.ability)}\n` : ""}${
        obj.nature !== "" ? `${obj.nature} Nature\n` : ""
      }${obj.move1 !== "" ? `- ${obj.move1}\n` : ""}${
        obj.move2 !== "" ? `- ${obj.move2}\n` : ""
      }${obj.move3 !== "" ? `- ${obj.move3}\n` : ""}${
        obj.move4 !== "" ? `- ${obj.move4}\n` : ""
      }`;

      return pkmnName;
    });

    return newArr;
  };

  const handleSubmit = (e) => {
    const thePokemon = [];
    thePokemon.push(inputValues);
    const theExport = pokemonStatsExport(thePokemon);
    setExportMon(theExport[0]);

    setIsHidden({ display: "block" });
  };

  return (
    <>
      <div className="inputs-group-2">
        <div className="inputs">
          <h5>ABILITY</h5>
          <select
            className="select-field"
            name="ability"
            onChange={handleChange}
          >
            {mon.abilities.map((ability) => {
              let updateAbility = ability.split("-");
              ability = updateAbility.join(" ");

              if (ability === mon.abilities[0]) {
                return (
                  <option value={ability} selected>
                    {capitalize(ability)}
                  </option>
                );
              } else {
                return <option value={ability}>{capitalize(ability)}</option>;
              }
            })}
          </select>

          <h5>ITEM</h5>
          <input
            onChange={handleChange}
            className="input-field"
            type="text"
            name="item"
            placeholder={"Item"}
          />

          <h5>NATURE</h5>
          <select
            className="select-field"
            name="nature"
            onChange={handleChange}
          >
            <option value=""> - </option>
            <option value="Modest">Modest</option>
            <option value="Adamant">Adamant</option>
            <option value="Calm">Calm</option>
            <option value="Jolly">Jolly</option>
          </select>

          <h5>MOVES</h5>
          <select className="select-field" name="move1" onChange={handleChange}>
            <option value="None"> - </option>
            {mon.moves.map((move) => {
              let updateMove = move.split("-");
              move = updateMove.join(" ");

              return <option value={move}>{capitalize(move)}</option>;
            })}
          </select>

          <select className="select-field" name="move2" onChange={handleChange}>
            <option value=""> - </option>
            {mon.moves.map((move) => {
              let updateMove = move.split("-");
              move = updateMove.join(" ");

              return <option value={move}>{capitalize(move)}</option>;
            })}
          </select>

          <select className="select-field" name="move3" onChange={handleChange}>
            <option value=""> - </option>
            {mon.moves.map((move) => {
              let updateMove = move.split("-");
              move = updateMove.join(" ");

              return <option value={move}>{capitalize(move)}</option>;
            })}
          </select>

          <select className="select-field" name="move4" onChange={handleChange}>
            <option value=""> - </option>
            {mon.moves.map((move) => {
              let updateMove = move.split("-");
              move = updateMove.join(" ");

              return <option value={move}>{capitalize(move)}</option>;
            })}
          </select>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          EXPORT
        </button>
      </div>
    </>
  );
};

export { InputSingle };
