const { Retailer, Customer, Reservation } = require("../models");

const customerController = {
  getAllRetailers(req, res) {
    Retailer.find(
      {},
      "-username -notification -averageWait -reservations -createdAt -updatedAt"
    )
      .then((results) => {
        if (!results)
          return res
            .status(404)
            .json({ message: "No retailers found in database" });

        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  searchRetailers({ query }, res) {
    Retailer.find({ retailerName: new RegExp(query.searchTerm, "i") })
      .select(
        "-username -notification -averageWait -reservations -createdAt -updatedAt"
      )
      .then((results) => {
        if (!results || results.length === 0)
          return res
            .status(404)
            .json({ message: "No retailers match that search term" });

        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getCustomerReservations({ params }, res) {
    Customer.find({ customerId: params.customerId }, "reservations")
      .then((results) => {
        if (!results || results.length === 0)
          res.status(200).json({ message: "No reservations made." });

        res.json(results);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = customerController;
