const verificationController = require("../controllers/verificationController");

const verificationRouter = require("express").Router();

const { sendPIN, checkPIN } = require("../controllers/verificationController");

verificationRouter.route("/:retailerId/send").post(sendPIN);
verificationRouter.route("/:retailerId/check").post(checkPIN);

module.exports = verificationRouter;
