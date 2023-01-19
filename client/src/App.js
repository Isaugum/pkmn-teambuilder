import "./app.css";
import { useState } from "react";
import {
  InputForm,
  DisplayPokemon,
  DisplaySingle,
  InputSingle,
} from "./components";

function App() {
  const [displayValues, setDisplayValues] = useState([]);
  const [displaySingle, setDisplaySingle] = useState(false);
  const [clickedMon, setMon] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getSearchData = (result) => {
    setDisplayValues(result);
  };

  const focusedMon = (pokemon) => {
    setMon(pokemon);
    setDisplaySingle(true);

    setScrollPosition(window.pageYOffset);
  };

  const backButton = () => {
    setDisplaySingle(false);
    let location = scrollPosition;
    console.log(location);
  };

  const capitalize = (data) => {
    if (typeof data !== "object") {
      const wordToList = data.split("");
      const first = wordToList[0];
      const higher = first.toUpperCase();
      wordToList.splice(0, 1, higher);
      data = wordToList.join("");

      return data;
    }
  };

  return (
    <div className="main-screen">
      {displaySingle === false ? (
        <>
          <InputForm getData={getSearchData} />
          <DisplayPokemon data={displayValues} clickedMon={focusedMon} capitalize={capitalize} />
        </>
      ) : (
        <DisplaySingle goBack={backButton} mon={clickedMon} capitalize={capitalize} InputSingle={InputSingle} />
      )}
    </div>
  );
}

export default App;
