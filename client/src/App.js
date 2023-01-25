import "./styles/app.css";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  DisplaySingle,
  InputSingle
} from "./components";
import {
  MainMenu,
  LoginForm
} from "./pages";

export const LoginContext = createContext(null);

function App() {
  const [displayValues, setDisplayValues] = useState([]);
  const [displaySingle, setDisplaySingle] = useState(false);
  const [clickedMon, setMon] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [userSession, setUserSession] = useState(false);

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

  useEffect(() => {
    fetch(`/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(response => response.json())
    .then(response => {
      JSON.stringify(response);
      console.log(response);

      setUserSession(response.value);
    })
  }, []);
  
  return (
    <div className="main-screen">
      <LoginContext.Provider value={{userSession, setUserSession}}>
      {
        userSession === false ? < LoginForm /> :
        <>{displaySingle === false ?
          <>
            <MainMenu getData={getSearchData} data={displayValues} clickedMon={focusedMon} capitalize={capitalize}/>
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
