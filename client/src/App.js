import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [wispers, setWispers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginmodal, setLoginmodal] = useState(0);
  const [token, setToken] = useState("");
  const [addmodal, setAddmodal] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [signupmodal, setSignupmodal] = useState(0);
  const [wispernotification, setWispernotification] = useState(0);



  const openloginmodal = () => {
    setLoginmodal(!loginmodal);
  };

  const handleUsernameInput = (input) => {
    setUsername(input.target.value);
  };

  const handlePassInput = (input) => {
    setPassword(input.target.value);
  };

  const handleTitleInput = (input) => {
    setTitle(input.target.value);
  };

  const handleDescriptionInput = (input) => {
    setDescription(input.target.value);
  };

  const opensignupmodal = () =>{
    setSignupmodal(!signupmodal);
  }

  const openAddmodal = () =>{
    setAddmodal(!addmodal);
  }

  const handleWisper = () =>{
    const wisperContent = {
      "title": title,
      "description": description
    }

    fetch("http://localhost:5000/createContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },
      body:JSON.stringify(wisperContent)
    })
    .then(async (response) =>{
      const message = await response.json();
      setWispernotification(wispernotification+1);
      alert(message.msg);
    })
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
      setToken(result.token);
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
      setToken(result.token)
      alert(result.msg)
    })
  }

  useEffect(() => {
    fetch("http://localhost:5000/getContent").then(async (response) => {
      const data = await response.json();
      setWispers(data.data);
    });
  }, [wispernotification]);

  return (
    <div>
      <button onClick={openloginmodal}>Login</button>
      <button onClick={opensignupmodal}>Signup</button>
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

      <button onClick={openAddmodal}>Wisper Something</button>
      {addmodal ? (
        <div>
          <input
            value={title}
            placeholder="Enter title"
            onInput={handleTitleInput}
          ></input>
          <input
            value={description}
            placeholder="Enter description"
            onInput={handleDescriptionInput}
          ></input>
          <button onClick={handleWisper}>Submit</button>
        </div>
      ) : (
        <div></div>
      )}

      {wispers && (
        <div>
          {wispers.map((wisper, id) => (
            <div key={id}>
              <h2>{wisper.title}</h2>
              <p>{wisper.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;