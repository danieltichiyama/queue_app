const Retailer = require("../models/Retailer");

const retailerController = {
  getAllRetailers(req, res) {
    Retailer.find({}).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailers found in database" });

      res.json(results);
    });
  },
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
  updateRetailer({ params, body }, res) {
    Retailer.findByIdAndUpdate({ _id: params.id }, body, { new: true }).then(
      (results) => {
        if (!results) {
          res.status(404).json({ message: "No retailer found with this id." });
          return;
        }
        res.json(results);
      }
    );
  },
  deleteRetailer({ params }, res) {
    Retailer.findByIdAndDelete({ _id: params.id }).then((results) => {
      if (!results) {
        res.status(404).json({ message: "No retailer found with this id." });
        return;
      }

      res.json({ message: "Retailer has been removed from the database." });
    });
  },
  addCustomerToWaitList({ params, body }, res) {
    Retailer.findByIdAndUpdate(
      { _id: params.id },
      { $addToSet: { waitList: body } },
      { new: true }
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailer found with this id." });

      res.json(results);
    });
  },
};

module.exports = retailerController;
