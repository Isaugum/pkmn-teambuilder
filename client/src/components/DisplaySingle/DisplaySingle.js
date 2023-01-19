import "./DisplaySingle.css";
import backButton from "./icons/back.png";
import shinyButton from "./icons/shiny.png";
import saveButton from "./icons/save.png";

import { useState, useEffect } from "react";

const DisplaySingle = ({ goBack, mon, capitalize, InputSingle }) => {
  const [shinyMode, setShinyMode] = useState(false);
  const [frontImage, setFrontImage] = useState(mon.spriteFront);
  const [backImage, setBackImage] = useState(mon.spriteBack);
  const [exportMon, setExportMon] = useState([]);
  const [isHidden, setIsHidden] = useState({
    display: "none",
  });

  let isShinyBtn = "Shiny";

  const isLike = async () => {
    await fetch(`/pokemon/liked?name=${mon.name}`);

    alert("Pokemon saved");
  };

  const isShiny = () => {
    if (shinyMode === false) {
      setShinyMode(true);
      setFrontImage(mon.spriteFrontShiny);
      setBackImage(mon.spriteBackShiny);
    } else {
      setShinyMode(false);
      setFrontImage(mon.spriteFront);
      setBackImage(mon.spriteBack);
    }
  };

  return (
    <div className="display-screen">
      <div className="pokemon" key={mon.id}>
        <div className="pokemon-itself">
          <p className="pokemon-name">{`#${mon.id} - ${capitalize(
            mon.name
          )}`}</p>
          <img className="pokemon-image" src={frontImage} />
          <img className="pokemon-image" src={backImage} />
        </div>

        <div className="pokemon-stats">
          <p className="stats-instance">HP: {mon.stats.hp}</p>
          <p className="stats-instance">Attack: {mon.stats.attack}</p>
          <p className="stats-instance">Defense: {mon.stats.defense}</p>
          <p className="stats-instance">
            SP Attack: {mon.stats["special-attack"]}
          </p>
          <p className="stats-instance">
            SP Defense: {mon.stats["special-defense"]}
          </p>
          <p className="stats-instance">Speed: {mon.stats.speed}</p>
        </div>

        <div className="types-abilities">
          <div className="pokemon-types">
            <h5 className="types-title">TYPES</h5>
            {mon.types.length === 1 ? (
              <p className="type-instance">{capitalize(mon.types[0])}</p>
            ) : (
              mon.types.map((value) => {
                let type = capitalize(value);
                return <p className="type-instance">{type}</p>;
              })
            )}
          </div>

          <div className="pokemon-abilities">
            <h5 className="abilities-title">ABILITIES</h5>
            {mon.abilities.map((value) => {
              let ability = capitalize(value);
              return <p className="ability-instance">{ability}</p>;
            })}
          </div>
        </div>

        <div className="funcc-btns">
          <button className="back-btn" onClick={goBack}>
            <img src={backButton} height="40" />
          </button>
          <button className="shiny-btn" onClick={isShiny}>
            <img src={shinyButton} height="40" />
          </button>
          <button className="save-btn" onClick={isLike}>
            <img src={saveButton} height="40" />
          </button>
        </div>
      </div>

      <InputSingle
        mon={mon}
        exportMon={exportMon}
        setExportMon={setExportMon}
        isHideen={isHidden}
        setIsHidden={setIsHidden}
        capitalize={capitalize}
      />

      <div className="export-window" style={isHidden}>
        <button
          className="close-btn"
          onClick={() => setIsHidden({ display: "none" })}
        >
          Close
        </button>
        <p>{exportMon}</p>
      </div>
    </div>
  );
};

export { DisplaySingle };
