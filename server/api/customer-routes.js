const customerRouter = require("express").Router();
const {
  getAllRetailers,
  getCustomerReservations,
  searchRetailers,
} = require("../controllers/customerController");

customerRouter.route("/").get(getAllRetailers);
customerRouter.route("/search").get(searchRetailers);
customerRouter.route("/:customerId/reservations").get(getCustomerReservations);

module.exports = customerRouter;
