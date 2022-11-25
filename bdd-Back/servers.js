const express = require("express");
const app = express();
const http = require('http').Server(app)
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = procces.env.Salt
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const BDD = proccess.env.BDD

const usersSchema = new mongoose.Schema({ username: String, mdp: String, email: String });

const Users = mongoose.model("users", usersSchema);

app.get("/users", function (req, res) {
  Users.find({}, function (err, user) {
    if (err) {
      return res.json({result: 3})
    } else {
      res.send(user)
    }
  });
});

app.delete("/users/:id", function (req, res) {
  Users.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return res.json({result: 3})
    } else {
      return res.json({result: 4})
    }
  });
});

app.post("/users", function (req, res) {
  const hash = bcrypt.hashSync(req.body.mdp, saltRounds);
  const username = req.body.username;
  const email = req.body.email;
  Users.findOne({username: username}, function(err, user){
    if(user === null){
      Users.create(
        {
          username: username,
          mdp: hash,
          email: email
        },
        function (err) {
          if (err) {
            return res.json({result: 3})
          } else {
           
            return res.json({result: 1})
          }
        }
      );    
    }else{
      
      return res.json({result: 2 });
      
    }
})
}); 

app.put("/users", function(req,res){
  const hash = bcrypt.hashSync(req.body.mdp, saltRounds)
  const username = req.body.username;
  const email = req.body.email;
    Users.updateOne(
      {
        username: username,
        mdp: hash,
        email: email
      },
      function(err){
        if(err){
          return res.json({result: 3})
        }else{
          return res.json({result: 5})
        }
      }
    )
  
})



mongoose.connect(BDD);
http.listen(PORT, function () {
  console.log(`Le serveur express est en route sur le port: ${PORT}`);
});
