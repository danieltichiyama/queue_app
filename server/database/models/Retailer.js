const { Schema, model, Types } = require("mongoose");

const RetailerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    retailerName: {
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
    openingTime: { type: Number },
    closingTime: { type: Number },
    maxCapacity: { type: Number },
    avgWaitTime: { type: Number },
    notificationTimer: { type: Number },
    waitList: [{ type: Types.ObjectId, ref: "Customer" }],
    holdList: [{ type: Types.ObjectId, ref: "Customer" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

RetailerSchema.virtual("waitListCount").get(function () {
  return this.waitList.length;
});

RetailerSchema.virtual("holdListCount").get(function () {
  return this.holdList.length;
});

const Retailer = model("Retailer", RetailerSchema);

module.exports = Retailer;
