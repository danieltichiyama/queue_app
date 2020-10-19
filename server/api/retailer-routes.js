const retailerRouter = require("express").Router();
const passport = require("passport");
const reservationController = require("../controllers/reservationController");

const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  loginRetailer,
  logoutRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");

<<<<<<< HEAD
retailerRouter.route("/register").post(createRetailer);
retailerRouter.route("/login").post(loginRetailer);
=======
retailerRouter.route("/logout").get(logoutRetailer);
>>>>>>> dev

retailerRouter
  .route("/:retailerId")
  .get(getAuthRetailer)
  .put(updateRetailer)
  .delete(deleteRetailer);

module.exports = retailerRouter;