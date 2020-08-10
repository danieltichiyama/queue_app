const Retailer = require("../models/Retailer");
const Customer = require("../models/Customer");

const retailerController = {
  getAllRetailers(req, res) {
    Retailer.find({})
      .populate({
        path: "waitList",
        select: "-__v",
      })
      .populate({
        path: "holdList",
        select: "-__v",
      })
      .then((results) => {
        if (!results)
          res.status(404).json({ message: "No retailers found in database" });

        res.json(results);
      });
  },
  getAllRetailersBasedOnSearch({ params, body }, res) {
    Retailer.find({ retailerName: new RegExp(params.searchTerm, "i") }).then(
      (results) => {
        if (!results || results.length === 0)
          res
            .status(404)
            .json({ message: "No retailers match that search term." });

        res.json(results);
      }
    );
  },
  getRetailerById({ params }, res) {
    Retailer.findOne({ retailerName: params.retailerName })
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
    Retailer.findOneAndUpdate({ retailerName: params.retailerName }, body, {
      new: true,
    })
      .populate({
        path: "waitList",
        select: "-__v",
      })
      .populate({
        path: "holdList",
        select: "-__v",
      })
      .then((results) => {
        if (!results) {
          res.status(404).json({ message: "No retailer found with this id." });
          return;
        }
        res.json(results);
      });
  },
  deleteRetailer({ params }, res) {
    Retailer.findOneAndDelete({ retailerName: retailerName }).then(
      (results) => {
        if (!results) {
          res.status(404).json({ message: "No retailer found with this id." });
          return;
        }

        res.json({ message: "Retailer has been removed from the database." });
      }
    );
  },
  addCustomerToWaitList({ params, body }, res) {
    Customer.findOneAndUpdate({ phoneNumber: body.phoneNumber }, body, {
      upsert: true,
      new: true,
    }).then((results) => {
      return Retailer.findOneAndUpdate(
        { retailerName: params.retailerName },
        { $addToSet: { waitList: results._id } },
        {
          new: true,
        }
      ).then((results) => {
        if (!results)
          res.status(404).json({ message: "No retailer found with this id." });

        res.json(results);
      });
    });
  },
  removeCustomerFromWaitList({ params, body }, res) {
    Retailer.findByOneAndUpdate(
      { retailerName: params.retailerName },
      { $pull: { waitList: params.customerId } },
      { new: true }
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailer found with this id." });

      res.json(results);
    });
  },
  moveCustomerFromWaitListToHoldList({ params }, res) {
    Retailer.findOneAndUpdate(
      { retailerName: params.retailerName },
      {
        $pull: { waitList: params.customerId },
        $addToSet: { holdList: { _id: params.customerId } },
      },
      { new: true }
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailer found with this id" });

      res.json(results);
    });
  },
  removeCustomerFromHoldList({ params, body }, res) {
    Retailer.findOneAndUpdate(
      { retailerName: params.retailerName },
      { $pull: { holdList: params.customerId } },
      { new: true }
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailer found with this id." });

      res.json(results);
    });
  },
  moveCustomerFromHoldListToWaitList({ params }, res) {
    Retailer.findByIdAndUpdate(
      { retailerName: params.retailerName },
      {
        $pull: { holdList: params.customerId },
        $addToSet: { waitList: { _id: params.customerId } },
      },
      { new: true }
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailer found with this id" });

      res.json(results);
    });
  },
};

module.exports = retailerController;
