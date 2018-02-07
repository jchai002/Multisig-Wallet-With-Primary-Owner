const express = require("express");
const routes = express.Router();
const blockchain = require("./services/blockchain");
const utils = require("./services/utils");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

routes.get("/cleardb", (req, res) => {
  Transaction.collection.remove();
  console.log("Transaction collection remove");
  res.send(null);
});

routes.put("/transactions/:transactionId/confirm", async (req, res) => {
  const { transactionId } = req.params;
  const { transaction } = req.body;
  const result = await blockchain.pollForTransactionState(transaction.tx);
  // check for result status before getting transactionId
  if (false) {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    const confirmations = await blockchain.getConfirmations(transactionId);
    const confirmationStatus = await blockchain.getConfirmationStatus(
      transactionId
    );

    // var dateConfirmed = null;
    // if (confirmationStatus) {
    //   dateConfirmed = Date.now();
    // }
    var dateConfirmed = null;
    if (confirmationStatus) {
      dateConfirmed = Date.now();
    }
    var updatedTransaction = await Transaction.findOneAndUpdate(
      {
        transactionId
      },
      {
        confirmedBy: confirmations,
        confirmed: confirmationStatus,
        dateConfirmed
      },
      { new: true }
    ).exec();
    console.log("updatedTransaction", updatedTransaction);
    res.send(updatedTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

routes.get("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const transactions = await Transaction.findOne({ _id: id });
  res.send(null);
});

routes.get("/transactions", async (req, res) => {
  // Transaction.collection.remove();
  // console.log("Transaction collection remove");
  // res.send(null);
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
    const confirmations = await blockchain.getConfirmations(transactionId);
    const confirmationStatus = await blockchain.getConfirmationStatus(
      transactionId
    );

    var dateConfirmed = null;
    if (confirmationStatus) {
      dateConfirmed = Date.now();
    }

    var newTransaction = new Transaction({
      transactionId,
      transactionHash: transaction.tx,
      confirmedBy: confirmations,
      confirmed: confirmationStatus,
      dateSubmitted: Date.now(),
      dateConfirmed: null
    });
    await newTransaction.save();
    res.send(null);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

module.exports = routes;
