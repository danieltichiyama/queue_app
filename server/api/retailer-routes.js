const retailerRouter = require("express").Router();
const {
  getRetailerById,
  createRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/:retailerId").get(getRetailerById);
retailerRouter.route("/register").post(createRetailer);

module.exports = retailerRouter;
