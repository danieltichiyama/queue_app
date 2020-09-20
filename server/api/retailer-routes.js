const retailerRouter = require("express").Router();
const passport = require("passport");
const reservationController = require("../controllers/reservationController");

const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  loginRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/register").post(createRetailer);
retailerRouter.route("/login").post(loginRetailer);

retailerRouter
  .route("/:retailerId")
  .get(getAuthRetailer)
  .put(updateRetailer)
  .delete(deleteRetailer);

module.exports = retailerRouter;
