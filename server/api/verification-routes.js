const verificationController = require("../controllers/verificationController");

const verificationRouter = require("express").Router();

const { sendPIN, checkPIN } = require("../controllers/verificationController");

verificationRouter.route("/send").post(sendPIN);
verificationRouter.route("/check").post(checkPIN);

module.exports = verificationRouter;
