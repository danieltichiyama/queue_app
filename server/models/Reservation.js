const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReservationSchema = new Schema(
  {
    reservationId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
    queueStatus: { type: String, default: "wait", required: true },
    replyStatus: { type: String, default: "pending", required: true },
    partySize: { type: Number, default: 1, required: true },
    archivedAt: {
      type: Date,
      default: null,
      get: (archivedAtVal) => {
        if (!archivedAtVal) {
          return null;
        }
        return moment(archivedAtVal).format("MMM DD, YYYY [at] hh:mm:ss a");
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        moment.updateLocale("en", {
          relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            w: "a week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years",
          },
        });

        return moment(createdAtVal).fromNow();
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Reservation = model("Reservation", ReservationSchema);

module.exports = Reservation;
