const { Retailer, Customer, Reservation } = require("../models");

const customerController = {
  getAllRetailers(req, res) {
    console.log("get all retail route works");
    Retailer.find(
      {},
      "retailerId retailerName address phoneNumber storeHours capacity timers"
    ).then((results) => {
      if (!results)
        res.status(404).json({ message: "No retailers found in database" });

      res.json(results);
    });
  },
  searchRetailers({ params, body }, res) {
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
  getCustomerReservations({ params }, res) {
    Customer.find(
      { customerId: params.customerId },
      "retailerId queueStatus replyStatus partySize"
    ).then((results) => {
      if (!results || results.length === 0)
        res.status(404).json({ message: "No reservations made." });
      res.json(results);
    });
  },
};

module.exports = customerController;
