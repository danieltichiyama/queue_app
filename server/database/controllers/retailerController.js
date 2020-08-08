const Retailer = require("../models/Retailer");

const retailerController = {
  getRetailerById({ params }, res) {
    Retailer.findOne({ _id: params.id })
      .populate({
        path: "waitList",
        select: "-__v",
      })
      .populate({
        path: "holdList",
        select: "-__v",
      })
      .select("-__v")
      .then((results) => {
        if (!results) {
          res.status(404).json({ message: "No retailer found with this id." });
          return;
        }
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
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
