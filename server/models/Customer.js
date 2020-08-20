const { Schema, model, Types } = require("mongoose");

const CustomerSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    name: {
      first: String,
      last: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
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
      virtuals: true,
    },
  }
);

CustomerSchema.virtual("reservationsCount").get(function () {
  return this.reservations.length;
});

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;
