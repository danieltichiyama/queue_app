const { Retailer } = require("../models");
const { Customer } = require("../models");

const retailerController = {
  getAuthRetailer({ params }, res) {
    Retailer.findOne(
      { retailerId: params.retailerId },
      "retailerId retailerName address phoneNumber storeHours capacity timers"
    )
      .then((results) => {
        if (!results) {
          res.status(404).json({ message: "No retailer found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  createRetailer({ body }, res) {
    Retailer.create(body)
      .then((results) => res.json(results))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

module.exports = retailerController;
