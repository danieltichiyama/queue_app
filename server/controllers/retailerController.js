const { Retailer } = require("../models");
const passport = require("passport");

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
  createRetailer(req, res, next) {
    passport.authenticate("register", (err, retailer, info) => {
      console.log(retailer, info);
      if (!retailer) {
        return res.status(401).json({ message: info.message })
      }
      req.body.password = info;
      Retailer.create(req.body)
        .then((results) => res.json(results))
        .catch((err) => {
          console.log(err)
          res.status(400).json(err);
        });
    })(req, res, next);
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
  loginRetailer(req, res, next) {
    passport.authenticate("login", (err, retailer, info) => {
      if (!retailer) {
        return res.status(404).json({ message: info.message });
      }
      req.logIn(retailer, (err) => {
        if (err) { return err; }
      });
    })(req, res, next);
  }
};

module.exports = retailerController;
