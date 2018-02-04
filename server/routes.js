const express = require("express");
const routes = express.Router();
const blockchain = require("./services/blockchain");
const utils = require("./services/utils");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

routes.post("/transactions", async (req, res) => {
  const { transaction } = req.body;
  const result = await blockchain.pollForTransactionState(transaction.tx);
  // check for result status before getting transactionId
  if (true) {
    var transactionId = utils.getParamFromTxEvent(
      transaction,
      "transactionId",
      "Submission"
    );
    console.log(result.transactionHash, transaction.tx);
  }

  res.send(null);
});

module.exports = routes;
