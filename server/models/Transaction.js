const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactionId: Number,
  transactionHash: String,
  confirmedBy: Array,
  confirmed: Boolean,
  dateSubmitted: Date,
  dateConfirmed: Date
});

transactionSchema.plugin(mongoosePaginate);

mongoose.model("transactions", transactionSchema);
