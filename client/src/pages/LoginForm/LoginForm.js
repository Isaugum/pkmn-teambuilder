import "./LoginForm.css";
import swal from "sweetalert";
import { useState, useContext } from "react";
import { LoginContext } from "../../App.js"; 

const LoginForm = () => {

  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [ registerMessage, setRegisterMessage] = useState("");

  const { setUserSession } = useContext(LoginContext);

  const handleLogin = async () => {
    const user = {
      username: username,
      password: password
    }

    await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
    .then(res => {

      JSON.stringify(res);
      setUserSession(res.value);

      if(res.value === false) {
        setLoginMessage(res.message);
      } else {
        swal("Welcome, " + res.user.username);
      }
    });
  }

  const handleRegister = async () => {
    const user = {
      username: username,
      password: password
    }

    await fetch(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    .then(res => {
      JSON.stringify(res);
      alert(res.message);
    });
  
  }

  return (
    <>
      <div className="inputs-group">
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

      <button className="submit-btn" onClick={handleLogin}>
        Login
      </button>

      <button className="submit-btn" onClick={handleRegister}>
        Register
      </button>

      <h4 className="login-msg">{loginMessage}</h4>
      </div>
    </>
  );
};

export { LoginForm };
