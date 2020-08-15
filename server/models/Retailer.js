const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const RetailerSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      index: true,
    },
    retailerName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      streetNumber: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: Number, required: true },
    },
    phoneNumber: { type: String, required: true },
    storeHours: {
      open: { type: Number, required: true },
      close: { type: Number, required: true },
    },
    capacity: {
      max: { type: Number, required: true },
      current: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    timers: {
      averageWait: { type: Number, default: 0, required: true },
      notification: { type: Number, required: true },
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

RetailerSchema.virtual("waitListCount").get(function () {
  if (!this.reservations) {
    return 0;
  }
  let waitList = this.reservations.filter((i) => i.queueStatus === "wait");
  return waitList.length;
});

RetailerSchema.virtual("holdListCount").get(function () {
  if (!this.reservations) {
    return 0;
  }
  let holdList = this.reservations.filter((i) => i.queueStatus === "hold");
  return holdList.length;
});

const Retailer = model("Retailer", RetailerSchema);

module.exports = Retailer;
