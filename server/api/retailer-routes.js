const retailerRouter = require("express").Router();
const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");

retailerRouter
  .route("/:retailerId")
  .get(getAuthRetailer)
  .put(updateRetailer)
  .delete(deleteRetailer);
retailerRouter.route("/register").post(createRetailer);

module.exports = retailerRouter;
