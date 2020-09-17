const { Reservation, Customer, Retailer } = require("../models");

const reservationController = {
  newReservation({ body }, res) {
    Customer.findOneAndUpdate(
      { phoneNumber: body.phoneNumber },
      {},
      {
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
        new: true,
      }
    )
      .then((customer) => {
        let reservation = { ...body, customerId: customer._id };
        Reservation.create(reservation)
          .then((reservation) => {
            Retailer.findByIdAndUpdate(
              body.retailerId,
              {
                $push: { reservations: reservation._id },
              },
              { new: true }
            )
              .populate({
                path: "reservations",
                populate: { path: "customerId" },
              })
              .then((retailer) => {
                Customer.findByIdAndUpdate(customer._id, {
                  $push: { reservations: reservation._id },
                })
                  .then((customer) => {
                    return res.json(retailer);
                  })
                  .catch((err) => {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ message: "something went wrong", error: err });
                  });
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(500)
                  .json({ message: "could not find or update the retailer" });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "could not create the reservation.",
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "could not find or create a new customer",
          error: err,
        });
      });
  },
  updateReservation({ params, body }, res) {
    Reservation.findByIdAndUpdate(params.reservationId, body, {
      runValidators: true,
      new: true,
    })
      .then((reservation) => {
        if (
          reservation.queueStatus === "enter" ||
          reservation.queueStatus === "cancelled"
        ) {
          return Customer.findOneAndUpdate(
            { _id: reservation.customerId },
            { $pullAll: { reservations: [params.reservationId] } },
            { new: true }
          )
            .then((customer) => {
              return Retailer.findOneAndUpdate(
                { _id: reservation.retailerId },
                { $pullAll: { reservations: [params.reservationId] } },
                { new: true }
              )
                .populate({ path: "reservations" })
                .then((retailer) => {
                  return res.json(retailer);
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({
                    message: "could not find the retailer with that id",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                message: "could not find the customer with that id",
                error: err,
              });
            });
        } else {
          return Retailer.findById(reservation.retailerId)
            .populate({ path: "reservations" })
            .then((retailer) => {
              return res.json(retailer);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "could not updated the reservation with that id",
          error: err,
        });
      });
  },
};

module.exports = reservationController;
