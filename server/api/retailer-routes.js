const retailerRouter = require("express").Router();
const {
  createRetailer,
  getAuthRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/:retailerId").get(getAuthRetailer);
retailerRouter.route("/register").post(createRetailer);

module.exports = retailerRouter;
