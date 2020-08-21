const retailerRouter = require("express").Router();
const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  loginRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/:retailerId").get(getAuthRetailer);
retailerRouter.route("/:retailerId/edit").put(updateRetailer);
retailerRouter.route("/register").post(createRetailer);

retailerRouter.route("/login").post(loginRetailer);

module.exports = retailerRouter;