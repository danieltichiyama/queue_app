const retailerRouter = require("express").Router();
const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  loginRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");

retailerRouter
  .route("/:retailerId")
  .get(getAuthRetailer)
  .put(updateRetailer)
  .delete(deleteRetailer);
retailerRouter.route("/register").post(createRetailer);
retailerRouter.route("/login").post(loginRetailer);

module.exports = retailerRouter;