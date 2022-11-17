import { useState } from "react";
import axios from "axios";
import Item from "./Item.js"
import { USERS_ALREADY_USED, QUERY_ERROR, POST_SUCCESS } from "../js/message.js";


export default function Form(props) {
  const [stateInput, setStateInput] = useState();
  const [stateInput2, setStateInput2] = useState();
  const [stateInput3, setStateInput3] = useState();
  const [toggle, setToggle] = useState(true);
 
  // fonction pour la methode put
  const apiBddUpdate = (newPost) => {
    axios.put(`http://localhost:3030/users`, newPost).then((err, res) => {
      if(err){
        console.log(err)
      }else{
      console.log(res)
      }
    })
  }
  
  // fonction post 
  const addPost = () => {

    const newPost = {}; // creation d'un nouvelle objet qui sera enregistrer dans ma bdd 

    // link entre mets input et mon objet 
    newPost.username = stateInput;
    newPost.mdp = stateInput2;
    newPost.email = stateInput3

    // metohde post
    axios.post(`http://localhost:3030/users`, newPost)
    .then((req, res) => {
        if(req.data.result === 1){
          props.arrUser.push({username: newPost.username, email: newPost.email})
          console.log(props.arrUser);
          alert(POST_SUCCESS)
        }else if(req.data.result === 2){
          alert(USERS_ALREADY_USED)
        }else {
          alert(QUERY_ERROR)
        }
    })
    .catch(function(err) {
      console.log(err)
    })
  };


  // Function de recuperation des id pour pouvoir les modifié
  const selectPost = id => {
    const newArr = [...props.arrUser];

    const index = newArr.findIndex((element) => element._id === id);

    const input1 = newArr[index].username;
    const input2 = newArr[index].mdp;
    const input3 = newArr[index].email;

    setStateInput(input1);
    setStateInput2(input2);
    setStateInput3(input3);

    setToggle(false);
    
  }


  // Function qui indique a la method put quoi modifier 
  const updatePost = () => {
    const input1 = stateInput;
    const input2 = stateInput2;
    const input3 = stateInput3;


    const newPost = {}

    newPost.username = input1
    newPost.mdp = input2
    newPost.email = input3


    apiBddUpdate(newPost)
    
    setToggle(true)
    window.location.reload()
  }

  return (
    
    <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">

      <form onSubmit={addPost} className="mb-3">
        <label htmlFor="username" className="form-label mt-3">
          Username
        </label>
        <input
          value={stateInput}
          
          onChange={(e) => setStateInput(e.target.value)}
          type="text"
          className="form-control"
          id="*username"
        />
        <label htmlFor="mdp" className="form-label mt-3">
          Mdp
        </label>
        <input
          value={stateInput2}
          onChange={(e) => setStateInput2(e.target.value)}
          type="password"
          className="form-control"
          id="*mdp"
        />
        <label htmlFor="email" className="form-label mt-3">
          email
        </label>
        <input
          value={stateInput3}
          onChange={(e) => setStateInput3(e.target.value)}
          type="email"
          className="form-control"
          id="*email"
        />
        <button className="mt-2 btn btn-primary d-block">Envoyer</button>
        {toggle ? <p>x</p> : <button onClick={updatePost}
          className=" btn btn-primary">Modifier</button>}
      </form>

      <h2>Liste des compte enregistré</h2>
      
      <ul className="list-group">
        {props.arrUser.map((item) => {
          return (
            <div key={item._id}>
            <Item
              
              updFunc={updatePost}
              interupteur={toggle}
              selFunc={selectPost}
              deletFunc={props.delFunc}
              pseudo={item.username}
              motdepasse={item.mdp}
              mail={item.email}
              id={item._id}
            />
            </div>
          );
        })}
      </ul>
    </div>
  );
}