
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
      <div className="bg-blue-100 h-screen w-auto flex flex-col justify-center items-center">
          <input
            className="h-10 w-64 border-2 border-solid border-gray-400"
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="h-10 w-64 border-2 border-solid border-gray-400 mt-2"
            type="text"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

      <button className="w-40 bg-gray-200 border-2 border-solid border-gray-400  py-2 px-5 mb-2 mt-10" onClick={handleLogin}>
        Login
      </button>

      <button className="w-40 bg-gray-200 border-2 border-solid border-gray-400  py-2 px-5" onClick={handleRegister}>
        Register
      </button>

      <h4 className="mt-24 text-red-600 text-bold">{loginMessage}</h4>
      </div>
    </>
  );
};

export { LoginForm };
