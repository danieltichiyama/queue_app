const { Retailer } = require("../models");

const retailerController = {
  getAuthRetailer({ params }, res) {
    let retailerId = params.retailerId;
    Retailer.findById({ _id: retailerId })
      .populate({ path: "reservations", populate: { path: "customerId" } })
      .then((results) => {
        if (!results) {
          return res
            .status(404)
            .json({ message: "No retailer found with this id." });
        }
        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createRetailer({ body }, res) {
    Retailer.create(body)
      .then((results) => {
        return results.toJSON();
      })
      .then((results) => {
        delete results.password;
        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateRetailer({ params, body }, res) {
    let retailerId = params.retailerId;
    Retailer.findByIdAndUpdate({ _id: retailerId }, body, {
      runValidators: true,
      new: true,
    })
      .populate({ path: "reservations" })
      .then((results) => {
        if (!results) {
          return res
            .status(404)
            .json({ message: "No retailer found with this id." });
        }
        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteRetailer({ params }, res) {
    let retailerId = params.retailerId;
    Retailer.findByIdAndDelete({ _id: retailerId })
      .then((results) => {
        if (!results) {
          return res
            .status(404)
            .json({ message: "No retailer found with this id." });
        }
        res.json({
          message: `${results.retailerName} has been successfully deleted.`,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = retailerController;
