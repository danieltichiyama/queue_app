const retailerRouter = require("express").Router();
const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/:retailerId").get(getAuthRetailer);
retailerRouter.route("/:retailerId/edit").put(updateRetailer);
retailerRouter.route("/register").post(createRetailer);

module.exports = retailerRouter;
