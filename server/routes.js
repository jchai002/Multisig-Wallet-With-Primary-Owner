const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");

routes.get("/", (req, res) => {
  res.send(null);
});

module.exports = routes;
