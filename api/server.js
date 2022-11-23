// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
server.use(express.json());
const User = require("./users/model");

server.get("/api/users/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        err: err.message,
      });
    });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({
      message: "provide name and bio",
    });
  } else {
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
