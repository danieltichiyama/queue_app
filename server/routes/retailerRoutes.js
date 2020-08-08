const router = require("express").Router();
const {
  getRetailerById,
  createRetailer,
} = require("../database/controllers/retailerController");

// Set up GET all and POST at /api/pizzas
router.route("/").post(createRetailer);

// Set up GET one, PUT, and DELETE and /api/pizzas/:id
router.route("/:id").get(getRetailerById);

module.exports = router;
