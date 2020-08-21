const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReservationSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      ref: "Retailer",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    queueStatus: {
      type: String,
      default: "wait",
      required: true,
      validate: [
        (value) => {
          let statuses = ["wait", "hold", "enter", "cancelled"];

          if (!statuses.includes(value)) {
            return false;
          }
        },
        "invalid value for queueStatus",
      ],
    },
    replyStatus: {
      type: String,
      default: "pending",
      required: true,
      validate: [
        (value) => {
          let statuses = ["pending", "confirmed", "hold", "cancelled"];

          if (!statuses.includes(value)) {
            return false;
          }
        },
        "invalid value for replyStatus",
      ],
    },
    partySize: { type: Number, default: 1, required: true },
    archivedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

const Reservation = model("Reservation", ReservationSchema);

module.exports = Reservation;
