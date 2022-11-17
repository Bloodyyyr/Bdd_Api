import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Components/Form.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {GET_SUCCESS , DELETE_SUCCESS} from "./js/message.js"


function App() {
  const [usersBdd, setUsersBdd] = useState([{}]);

  // mehtode get 
  const getUsers = () => {
    const newArr = [];
    axios.get("http://localhost:3030/users").then((res) => {
      const data = res.data;
      newArr.push(...data);
      setUsersBdd(newArr);
      console.log(GET_SUCCESS)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  // methode Delet
  const deletePost = (id) => {
    axios.delete(`http://localhost:3030/users/${id}`)
    .then((res) => {
      if(res.data.result === 4){
      alert(DELETE_SUCCESS);
    }})
    .catch(function(err){console.log(err)});
    window.location.reload();
  };

  useEffect(() => {

    getUsers();

  }, []);



  return (
    <div className="app">
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form arrUser={usersBdd} delFunc={deletePost} getFunc={getUsers} />}>
        
        </Route>
      </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
