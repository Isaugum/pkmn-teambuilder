import "./InputForm.css";
import { useState } from "react";

const InputForm = ({ getData }) => {
  const [inputValues, setInputValues] = useState({
    type1: "",
    type2: "",

    ability: "",

    move1: "",
    move2: "",
    move3: "",
    move4: "",
  });

  //HANDLE SUBMITING DATA
  const handleSubmit = async (e) => {
    //Check is two words - join with "-"
    Object.keys(inputValues).forEach((key) => {
      let tmpValue = inputValues[key].split(" ");

      if (tmpValue.length === 2) {
        let value = tmpValue.join("-");
        inputValues[key] = value;
      } else {
        let value = tmpValue.join("");
        inputValues[key] = value;
      }
    });

    //prepare query string
    let queryString = Object.keys(inputValues).map((key) => {
      if (inputValues[key] !== "") {
        return `${key}=${inputValues[key]}`;
      }
    });

    //remove undefined values from query string
    queryString = queryString.filter((key) => {
        return key !== undefined;
      }).join("&");

    //makeQuery
    const response = await fetch(`/search/?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(response => response.json());

    JSON.stringify(response);

    console.log(response);

    getData(response);
  };

  //UPDATE INPUT STATE
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value.toLowerCase();

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <div className="inputs-group-form">
        <div className="inputs">
          <h5>TYPES</h5>
          <input
            className="input-field"
            type="text"
            name="type1"
            placeholder={"Type 1"}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="type2"
            placeholder={"Type 2"}
            onChange={handleChange}
          />
          <h5>ABILITY</h5>
          <input
            className="input-field"
            type="text"
            name="ability"
            placeholder={"Ability"}
            onChange={handleChange}
          />
        </div>

        <div className="inputs">
          <h5>MOVES</h5>
          <input
            className="input-field"
            type="text"
            name="move1"
            placeholder={"Move 1"}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="move2"
            placeholder={"Move 2"}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="move3"
            placeholder={"Move 3"}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="move4"
            placeholder={"Move 4"}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          SEARCH
        </button>
      </div>
    </>
  );
};

export { InputForm };
