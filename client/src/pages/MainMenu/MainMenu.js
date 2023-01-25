import "./MainMenu.css";
import { useState, useContext } from "react";
import { InputForm, DisplayPokemon } from "../../components";

const MainMenu = (props) => {

  return (
    <>
      <InputForm getData={props.getData} />
      <DisplayPokemon data={props.data} clickedMon={props.clickedMon} capitalize={props.capitalize} />
    </>
  );
};

export { MainMenu };
