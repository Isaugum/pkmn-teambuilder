import "./LoginForm.css";
import { useState } from "react";

const LoginForm = () => {

  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");

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
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
      </div>

      <button className="submit-btn" onClick={console.log("hey")}>
        Login
      </button>
      <button className="submit-btn" onClick={console.log("hey")}>
        Register
      </button>
    </>
  );
};

export { LoginForm };
