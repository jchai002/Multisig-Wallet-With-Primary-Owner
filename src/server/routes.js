const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");
const faceOff = require("./interfaces/faceOff");
var transactions = [];

routes.get("/transactions", (req, res) => {
  res.send(transactions);
});

routes.post("/transactions", async (req, res) => {
  var { tx_hash } = req.body;
  if (typeof tx_hash === "undefined") {
    return res.send(400, "Invalid arguments");
  }
  // might not need this
  transactions.push(tx_hash);
  // wait for poll to come back with status
  const { status } = await blockchain.pollForTransactionState(tx_hash);
  res.send(status);
  // TODO: send blockchain res to faceOff api
});

routes.post("/get-user-session-data", async (req, res) => {
  let { authorization, exchange_id } = req.body;
  if (typeof authorization === "undefined") {
    return res.send(401, "Invalid arguments");
  }
  let authRes = await faceOff.getUserSessionData(authorization, exchange_id);
  res.send(authRes);
});

module.exports = routes;
