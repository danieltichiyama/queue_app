const customerRouter = require("express").Router();
const {
  getAllRetailers,
  getCustomerReservations,
} = require("../controllers/customerController");

customerRouter.route("/").get(getAllRetailers);
customerRouter.route("/:customerId/reservations").get(getCustomerReservations);

module.exports = customerRouter;
