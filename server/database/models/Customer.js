const { Schema, model } = require("mongoose");
const moment = require("moment");

const CustomerSchema = new Schema(
  {
    customer_id: mongoose.ObjectId,
    name: { first: String, last: String },
    phoneNumber: { type: String },
    queue: [{
      type: Schema.Types.ObjectId,
      ref: "Reservation"
    }]
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
