import "./app.css";
import { useState, createContext } from "react";
import {
  InputForm,
  DisplayPokemon,
  DisplaySingle,
  InputSingle,
  LoginForm
} from "./components";

export const LoginContext = createContext(null);

function App() {
  const [displayValues, setDisplayValues] = useState([]);
  const [displaySingle, setDisplaySingle] = useState(false);
  const [clickedMon, setMon] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [userSession, setUserSession] = useState(null);

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
      <LoginContext.Provider value={{userSession, setUserSession}}>
      {
        userSession === null ? < LoginForm /> :
        <>{displaySingle === false ?
          <>
            <InputForm getData={getSearchData} />
            <DisplayPokemon data={displayValues} clickedMon={focusedMon} capitalize={capitalize} />
          </>
         : 
          <DisplaySingle goBack={backButton} mon={clickedMon} capitalize={capitalize} InputSingle={InputSingle} />
        }</>
      }
      </LoginContext.Provider>      
    </div>

  );
}

export default App;
