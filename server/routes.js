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
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    const executed = await blockchain.getExecutionStatus(transactionId);
    var dateExecuted = null;
    if (executed) {
      dateExecuted = Date.now();
    }
    var updatedTransaction = await Transaction.findOneAndUpdate(
      {
        transactionId
      },
      {
        confirmedBy,
        executed,
        dateExecuted
      },
      { new: true }
    ).exec();
    res.send(updatedTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

routes.put("/transactions/:transactionId/revoke", async (req, res) => {
  const { transactionId } = req.params;
  const { transaction } = req.body;
  const result = await blockchain.pollForTransactionState(transaction.tx);
  // check for result status before getting transactionId
  if (false) {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    const executed = await blockchain.getExecutionStatus(transactionId);
    var dateExecuted = null;
    if (executed) {
      dateExecuted = Date.now();
    }
    var updatedTransaction = await Transaction.findOneAndUpdate(
      {
        transactionId
      },
      {
        confirmedBy,
        executed,
        dateExecuted
      },
      { new: true }
    ).exec();
    res.send(updatedTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

routes.get("/transactions/:page", async (req, res) => {
  // Transaction.collection.remove();
  const { page } = req.params;
  const results = await Transaction.paginate(
    {},
    { page, limit: 5, sort: { transactionId: -1 } }
  );
  res.send({
    transactionsOnPage: results.docs,
    pageNumber: results.page,
    totalPages: results.pages
  });
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
    const destination = await blockchain.getDestination(transactionId);
    const amount = await blockchain.getAmount(transactionId);
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    const executed = await blockchain.getExecutionStatus(transactionId);

    var newTransaction = new Transaction({
      transactionId,
      transactionHash: transaction.tx,
      destination,
      amount,
      confirmedBy,
      executed,
      dateSubmitted: Date.now(),
      dateExecuted: null
    });
    await newTransaction.save();
    res.send(newTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

module.exports = routes;
