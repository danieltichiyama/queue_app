const { Schema, model, Types } = require("mongoose");

const ReservationSchema = new Schema(
  {
    retailerId: { type: Schema.Types.ObjectId, ref: "Retailer" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    queueStatus: { type: String },
    replyStatus: { type: String },
    partySize: { Type: Number },
    archivedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Reservation = model("Reservation", ReservationSchema);

module.exports = Reservation;
