const router = require("express").Router();
const {
  getRetailerById,
  getAllRetailersBasedOnSearch,
  createRetailer,
  updateRetailer,
  deleteRetailer,
  addCustomerToWaitList,
  getAllRetailers,
  removeCustomerFromWaitList,
  moveCustomerFromWaitListToHoldList,
  removeCustomerFromHoldList,
  moveCustomerFromHoldListToWaitList,
} = require("../database/controllers/retailerController");

router.route("/").get(getAllRetailers).post(createRetailer);

router.route("/search/:searchTerm").get(getAllRetailersBasedOnSearch);
router
  .route("/:id")
  .get(getRetailerById)
  .put(updateRetailer)
  .delete(deleteRetailer);

router.route("/:id/waitlist").put(addCustomerToWaitList);

router
  .route("/:id/waitlist/:customerId")
  .put(moveCustomerFromWaitListToHoldList)
  .delete(removeCustomerFromWaitList);

router
  .route("/:id/holdlist/:customerId")
  .put(moveCustomerFromHoldListToWaitList)
  .delete(removeCustomerFromHoldList);

module.exports = router;
