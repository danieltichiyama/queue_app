const router = require("express").Router();
const retailerRouter = require("./retailer-routes");
const twilioRouter = require("./twilio-routes");
const customerRouter = require("./customer-routes");
const verificationRouter = require("./verification-routes");
const reservationRouter = require("./reservation-routes");

router.use("/retailers", retailerRouter);
router.use("/customers", customerRouter);
router.use("/sms", twilioRouter);
router.use("/verification", verificationRouter);
router.use("/reservations", reservationRouter);

module.exports = router;
