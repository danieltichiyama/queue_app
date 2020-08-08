const router = require("express").Router();
const {
  getRetailerById,
  createRetailer,
  updateRetailer,
  deleteRetailer,
  addCustomerToWaitList,
  getAllRetailers,
} = require("../database/controllers/retailerController");

// Set up GET all and POST at /api/pizzas
router.route("/").get(getAllRetailers).post(createRetailer);

// Set up GET one, PUT, and DELETE and /api/pizzas/:id
router
  .route("/:id")
  .get(getRetailerById)
  .put(updateRetailer)
  .delete(deleteRetailer);

router.route("/:id/waitlist").put(addCustomerToWaitList);

module.exports = router;
