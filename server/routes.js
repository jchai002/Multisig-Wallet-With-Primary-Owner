const express = require("express");
const routes = express.Router();
const blockchain = require("./services/blockchain");

routes.post("/transactions", async (req, res) => {
  const { tx } = req.body;
  await blockchain.pollForTransactionState(tx);
  console.log("server tx", tx);
  res.send(null);
});

module.exports = routes;
