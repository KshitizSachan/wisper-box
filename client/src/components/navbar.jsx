// Navbar.jsx
import React from 'react';
import { useState} from "react";

const Navbar = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginmodal, setLoginmodal] = useState(0);
  const [signupmodal, setSignupmodal] = useState(0);

  

  const openloginmodal = () => {
    setLoginmodal(!loginmodal);
  };

  const handleUsernameInput = (input) => {
    setUsername(input.target.value);
  };

  const handlePassInput = (input) => {
    setPassword(input.target.value);
  };

  const opensignupmodal = () =>{
    setSignupmodal(!signupmodal);
  }

  const handleLogin = () => {
    const credentials = {
      username: username,
      password: password,
    };

    fetch("http://localhost:5000/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then(async (response) => {
      const result = await response.json();
      localStorage.setItem('session-token', result.token);
      alert(result.msg);
    });
  };
  const handleSignup = () =>{
    const credentials ={
      "username": username,
      "password": password
    }

    fetch("http://localhost:5000/userSignup", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(async(response) =>{
      const result = await response.json()
      localStorage.setItem('session-token', result.token);
      alert(result.msg)
    })
  }


  return (
    <nav className="bg-blue-600 pr-4">
      <div className="container flex justify-between items-center">
        <button className="text-white text-lg font-semibold">Wisper-Box</button>
        <div className="space-x-4">
          <button className="bg-white text-gray-500 px-4 py-2 rounded  hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={openloginmodal}>
            Login
          </button>
          <button className="bg-white text-gray-500 px-4 py-2 rounded  hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={opensignupmodal}>
            Signup
          </button>
          {loginmodal ? (
        <div>
          <input
            value={username}
            placeholder="Enter your username"
            onInput={handleUsernameInput}
          ></input>
          <input
            value={password}
            placeholder="Enter your password"
            onInput={handlePassInput}
          ></input>
          <button onClick={handleLogin}>Submit</button>
        </div>
      ) : (
        <div></div>
      )}
          
          {signupmodal ? (
        <div>
          <input
            value={username}
            placeholder="Enter your username"
            onInput={handleUsernameInput}
          ></input>
          <input
            value={password}
            placeholder="Enter your password"
            onInput={handlePassInput}
          ></input>
          <button onClick={handleSignup}>Submit</button>
        </div>
      ) : (
        <div></div>
      )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
