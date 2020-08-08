const { Schema, model } = require("mongoose");
const Customer = require("../models/Customer");

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
    retailerName: { type: String },
    address: { 
      street: String,
      zipcode: Number
    },
    openingTime: { type: Number },
    closingTime: { type: Number },
    maxCapacity: { type: Number },
    avgWaitTime: { type: Number },
    notificationTimer: { type: Number },
    waitlist: [Customer],
  }
)

const Retailer = model("Retailer", RetailerSchema);

module.exports = Retailer;