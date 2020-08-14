const router = require("express").Router();
const retailerRouter = require("./retailer-routes");
const twilioRouter = require("./twilio-routes");

router.use("/retailers", retailerRouter);
router.use("/sms", twilioRouter);

module.exports = router;
