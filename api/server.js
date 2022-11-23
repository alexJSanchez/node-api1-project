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

server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).json({
          message: "does not exist",
        });
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "does not exist",
        err: err.message,
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  User.remove(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).json({
          message: "does not exist",
        });
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "does not exist",
        err: err.message,
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  User.update(req.params.id, res.body).then((user) => {
    res.status(200).json({
      message: "good",
    });
  });
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
