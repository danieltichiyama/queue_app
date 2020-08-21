const { Retailer, Customer, Reservation } = require("../models");

const customerController = {
  getAllRetailers(req, res) {
    Retailer.find(
      {},
      "retailerId retailerName address phoneNumber storeHours capacity timers"
    )
      .then((retailers) => {
        if (!retailers)
          return res
            .status(404)
            .json({ message: "No retailers found in database" });

        res.json(retailers);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  searchRetailers({ query }, res) {
    Retailer.find({ retailerName: new RegExp(query.searchTerm, "i") })
      .then((searchResults) => {
        if (!searchResults || searchResults.length === 0)
          return res
            .status(404)
            .json({ message: "No retailers match that search term" });

        res.json(searchResults);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getCustomerReservations({ params }, res) {
    Customer.find({ customerId: params.customerId }, "reservations").then(
      (customerReservations) => {
        if (!customerReservations || customerReservations.length === 0)
          res.status(200).json({ message: "No reservations made." });

        res.json(customerReservations);
      }
    );
  },
};

module.exports = customerController;
