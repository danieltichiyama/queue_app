const { Schema, model } = require("mongoose");
const moment = require("moment");

const CustomerSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    partySize: { type: Number },
    status: { type: String, default: "pending" },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        moment.updateLocale("en", {
          relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "just now",
            ss: "just now",
            m: "%d min",
            mm: "%d mins",
            h: "%d hour",
            hh: "%d hours",
          },
        });

        return moment(timestamp).fromNow(true);
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

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;
