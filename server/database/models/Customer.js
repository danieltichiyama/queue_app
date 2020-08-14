const { Schema, model } = require("mongoose");
const moment = require("moment");

const CustomerSchema = new Schema(
  {
    customer_id: mongoose.ObjectId,
    name: { type: String },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    }
  }
);

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;
