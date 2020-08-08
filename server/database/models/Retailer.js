const { Schema, model } = require("mongoose");
const CustomerSchema = require("../models/Customer");

const RetailerSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true
    },
    retailerName: { 
      type: String,
      required: true
    },
    address: { 
      street: String,
      streetNumber: Number,
      city: String,
      state: String,
      zipcode: Number
    },
    phoneNumber: { type: String },
    openingTime: { type: Number },
    closingTime: { type: Number },
    maxCapacity: { type: Number },
    avgWaitTime: { type: Number },
    notificationTimer: { type: Number },
    waitList: [CustomerSchema],
    holdList: [CustomerSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

RetailerSchema.virtual("waitListCount").get(function() {
  return this.waitList.length;
})

RetailerSchema.virtual("holdListCount").get(function() {
  return this.holdList.length;
})

const Retailer = model("Retailer", RetailerSchema);

module.exports = Retailer;