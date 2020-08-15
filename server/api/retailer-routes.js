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
  createReservation,
  createCustomer,
  getAllRes,
} = require("../controllers/retailerController");

router.route("/").get(getAllRetailers).post(createRetailer);

router.route("/search/:searchTerm").get(getAllRetailersBasedOnSearch);
// router
//   .route("/:retailerName")
//   .get(getRetailerById)
//   .put(updateRetailer)
//   .delete(deleteRetailer);

router.route("/:retailerName/waitlist").put(addCustomerToWaitList);

router
  .route("/:retailerName/waitlist/:customerId")
  .put(moveCustomerFromWaitListToHoldList)
  .delete(removeCustomerFromWaitList);

router
  .route("/:retailerName/holdlist/:customerId")
  .put(moveCustomerFromHoldListToWaitList)
  .delete(removeCustomerFromHoldList);

router.route("/createRes").get(getAllRes).post(createReservation);
router.route("/createCustomer").post(createCustomer);

module.exports = router;
