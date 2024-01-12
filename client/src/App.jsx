import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./App.css";


// function truncateText(text, maxLength) {
//   if (text.length > maxLength) {
//     return text.substring(0, maxLength) + '...';
//   }
//   return text;
// }

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
};


function App() {
  const [wispers, setWispers] = useState([]);
 
  const [token, setToken] = useState("");
  const [addmodal, setAddmodal] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wispernotification, setWispernotification] = useState(0);
  const [openbox, setOpenbox] = useState("");
  
 // comment to check

  const handleTitleInput = (input) => {
    setTitle(input.target.value);
  };

  const handleDescriptionInput = (input) => {
    setDescription(input.target.value);
  };

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

  useEffect(() => {
    fetch("http://localhost:5000/getContent").then(async (response) => {
      const data = await response.json();
      setWispers(data.data);
    });
  }, [wispernotification]);

  const setUserToken = (tokenFromChild) =>{
    setToken(tokenFromChild);
  }

  const handleOpenBox = (id) =>{
    if(openbox===id){
      setOpenbox("")
    }else{
      setOpenbox(id)
    }
  }

  return (
    <div className="box-border">
    <Navbar setUserToken={setUserToken}/>
    <div className="pl-5 pr-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <button onClick={openAddmodal} className="bg-pink-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-300 ease-in-out" >Wisper Something</button>
      {addmodal ? (
        <div className="my-4 mx-4 p-4 border border-gray-300 rounded" >
          <input
            value={title}
            placeholder="Enter title"
            onInput={handleTitleInput}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          ></input>
          <input
            value={description}
            placeholder="Enter description"
            onInput={handleDescriptionInput}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          ></input>
          <button onClick={handleWisper} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600" >Submit</button>
        </div>
      ) : (
        <div></div>
      )}

{wispers && (
        <div >
          {wispers.map((wisper, id) => (
            <div key={id} onClick={() => handleOpenBox(id)}  className="hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer my-4 p-4 w-full border border-gray-300 rounded relative group">
              <h2 className="text-xl font-bold relative">{wisper.title}</h2>
              <div className="">
                <p>
                {id === openbox ? wisper.description : truncateText(wisper.description, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;