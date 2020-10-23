const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const RetailerSchema = new Schema(
  {
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
      select: false,
    },
    verificationPIN: {
      type: Number,
      select: false,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          console.log(value.length);
          if (value.length !== 11) {
            return false;
          }
        },
        message: () => "invalid phoneNumber, must be a string of 11 numbers",
      },
    },
    open: { type: String, required: true },
    close: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    currentCapacity: {
      type: Number,
      default: 0,
      required: true,
    },
    averageWait: { type: Number, default: 0, required: true },
    notification: { type: Number, default: 300, required: true },
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
