const { Retailer } = require("../models");

const retailerController = {
  getAuthRetailer({ params }, res) {
    let retailerId = params.retailerId;
    Retailer.findById({ _id: retailerId }, "-password")
      .then((results) => {
        if (!results) {
          return res
            .status(404)
            .json({ message: "No retailer found with this id." });
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
  updateRetailer({ params, body }, res) {
    let retailerId = params.retailerId;
    Retailer.findByIdAndUpdate({ _id: retailerId }, body, { new: true })
      .select("-password")
      .then((results) => {
        if (!results) {
          return res
            .status(404)
            .json({ message: "No retailer found with this id." });
        }
        res.json(results);
      });
  },
};

module.exports = retailerController;
