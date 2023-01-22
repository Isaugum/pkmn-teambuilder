import "./LoginForm.css";
import { useState, useContext } from "react";
import { LoginContext } from "../../App.js"; 

const LoginForm = () => {

  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");

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
      console.log(res);

      JSON.stringify(res);
      setUserSession(res.value);
    });
  }

  const handleRegister = async () => {
    const user = {
      username: username,
      password: password
    }

    const registerAuth = await fetch(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user)
    }).then(response => response.json());

    console.log(registerAuth);
  
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
      </div>
    </>
  );
};

export { LoginForm };
