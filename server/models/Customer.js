const { Schema, model, Types } = require("mongoose");

const CustomerSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: {
      type: String,
      unique: true,
      validate: [
        (value) => {
          if (value.length !== 11) {
            return false;
          }
          if (value[0] !== "+") {
            return false;
          }
        },
        "invalid phoneNumber, must be a string of 11 numbers",
      ],
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
