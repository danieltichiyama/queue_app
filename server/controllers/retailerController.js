const { Retailer } = require("../models");
const passport = require("passport");

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
  createRetailer(req, res, next) {
    passport.authenticate("register", (err, retailer, info) => {
      if (!retailer) {
        return res.status(401).json({ error: err, message: info.message });
      }
      req.body.password = info;
      Retailer.create(req.body)
        .then((results) => res.json(results))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    })(req, res, next);
  },
  updateRetailer({ params, body }, res) {
    let retailerId = params.retailerId;
    Retailer.findByIdAndUpdate({ _id: retailerId }, body, {
      runValidators: true,
      new: true,
    })
      .populate({
        path: "reservations",
        populate: { path: "customerId" }
      })
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
  loginRetailer(req, res, next) {
    console.log("login route hit...")
    passport.authenticate("login", (err, retailer, info) => {
      if (err) {
        return next(err);
      }
      if (!retailer) {
        return res.status(401).json({ message: info.message });
      }

      req.logIn(retailer, (err) => {
        if (err) {
          return next(err);
        }

        return Retailer.findById(req.user._id)
          .populate({ path: "reservations" })
          .then((results) => {
            if (!results) {
              return res.status(404).json({ message: "Retailer not found." });
            }

            return res.json(results);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      });
    })(req, res, next);
  },
  logoutRetailer(req, res) {
    req.logout();
    return res.status(200).json({ message: "Retailer has logged out" })
  },
};

module.exports = retailerController;
