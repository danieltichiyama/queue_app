const reservationRouter = require("express").Router();

const {
  newReservation,
  updateReservation,
  testUpdateReservation
} = require("../controllers/reservationController");

reservationRouter.route("/").post(newReservation);

// reservationRouter.route("/:reservationId").put(updateReservation);
reservationRouter.route("/:reservationId").put(testUpdateReservation);

module.exports = reservationRouter;
