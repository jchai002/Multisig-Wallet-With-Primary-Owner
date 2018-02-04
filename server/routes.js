const express = require("express");
const routes = express.Router();
const blockchain = require("./services/blockchain");
const utils = require("./services/utils");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

routes.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.send(transactions);
});
routes.post("/transactions", async (req, res) => {
  const { transaction } = req.body;
  const result = await blockchain.pollForTransactionState(transaction.tx);
  // check for result status before getting transactionId
  if (false) {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    const transactionId = utils.getParamFromTxEvent(
      transaction,
      "transactionId",
      "Submission"
    );
    const sender = utils.getParamFromTxEvent(
      transaction,
      "sender",
      "Confirmation"
    );
    const newTransaction = new Transaction({
      transactionId,
      transactionHash: transaction.tx,
      confirmedBy: [sender],
      confirmed: false,
      dateSubmitted: Date.now(),
      dateConfirmed: null
    });
    await newTransaction.save();

    res.send(newTransaction);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = routes;
