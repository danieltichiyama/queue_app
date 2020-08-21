const router = require("express").Router();
const retailerRouter = require("./retailer-routes");
const twilioRouter = require("./twilio-routes");
const customerRouter = require("./customer-routes")

router.use("/retailers", retailerRouter);
router.use("/customers", customerRouter);
router.use("/sms", twilioRouter);

module.exports = router;
