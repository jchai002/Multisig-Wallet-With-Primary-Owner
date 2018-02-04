const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");

routes.post("/transactions", (req, res) => {
  const { tx_hash } = req.body;
  console.log("server tx", tx_hash);
  res.send(null);
});

module.exports = routes;
