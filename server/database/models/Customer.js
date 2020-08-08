const { Schema, model } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    partySize: { type: Number },
    status: { type: Number }
  }
)

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;