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

    const isLoginValid = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
    
    JSON.stringify(isLoginValid);
    setUserSession(isLoginValid);
  }

  const handleChange = (e) => {

  };
  
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
      </div>

      <button className="submit-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="submit-btn" onClick={console.log("hey")}>
        Register
      </button>
    </>
  );
};

export { LoginForm };
