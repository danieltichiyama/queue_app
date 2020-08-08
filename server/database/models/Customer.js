const { Schema, model } = require("mongoose");
const moment = require("moment");

const CustomerSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    partySize: { type: Number },
    status: { type: Number },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        moment(timestamp).format("MMM Do, YYYY [at] hh:mm a");
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// const Customer = model("Customer", CustomerSchema);

module.exports = CustomerSchema;
