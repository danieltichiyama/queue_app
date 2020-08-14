require("dotenv").config();

const express = require("express");
const twilioRouter = express.Router();
const {
  changeCustomerStatus,
  twilioSend,
} = require("../controllers/twilioController");

twilioRouter.route("/reply").post(changeCustomerStatus);

twilioRouter.route("/send").post(twilioSend);

module.exports = twilioRouter;
