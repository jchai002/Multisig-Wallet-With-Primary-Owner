const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactionId: Number,
  transactionHash: String,
  confirmedBy: Array,
  confirmed: Boolean,
  dateSubmitted: Date,
  dateConfirmed: Date
});

mongoose.model("transactions", transactionSchema);
