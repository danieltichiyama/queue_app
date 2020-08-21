const { Schema, model, Types } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
    phoneNumber: {
      type: String,
    },
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;
