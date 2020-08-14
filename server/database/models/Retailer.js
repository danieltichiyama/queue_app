const { Schema, model, Types } = require("mongoose");

const RetailerSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      street: String,
      streetNumber: Number,
      city: String,
      state: String,
      zipcode: Number,
    },
    phoneNumber: { type: String },
    storeHours: {
      open: Number,
      close: Number
    },
    capacity: {
      max: Number,
      current: {
        type: Number,
        default: 0
      },
    },
    timers: {
      averageWait: { type: Number },
      notification: { type: Number }
    },
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation"
      }
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  }
);

RetailerSchema.virtual("waitListCount").get(function () {
  let waitList = this.reservations.filter((i) => i.queueStatus === "wait");
  return waitList.length;
});

RetailerSchema.virtual("holdListCount").get(function () {
  let holdList = this.reservations.filter((i) => i.queueStatus === "hold");
  return holdList.length;
});

const Retailer = model("Retailer", RetailerSchema);

module.exports = Retailer;
