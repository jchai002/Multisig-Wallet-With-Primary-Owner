const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");
const faceOff = require("./interfaces/faceOff");
var transactions = [];

routes.get("/", (req, res) => {
  res.send(null);
});

module.exports = routes;
