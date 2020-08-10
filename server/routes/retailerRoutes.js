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
  .route("/:retailerName")
  .get(getRetailerById)
  .put(updateRetailer)
  .delete(deleteRetailer);

router.route("/:retailerName/waitlist").put(addCustomerToWaitList);

router
  .route("/:retailerName/waitlist/:customerId")
  .put(moveCustomerFromWaitListToHoldList)
  .delete(removeCustomerFromWaitList);

router
  .route("/:retailerName/holdlist/:customerId")
  .put(moveCustomerFromHoldListToWaitList)
  .delete(removeCustomerFromHoldList);

module.exports = router;
