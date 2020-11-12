const reservationRouter = require("express").Router();

const {
  newReservation,
  updateReservation,
} = require("../controllers/reservationController");

reservationRouter.route("/").post(newReservation);

reservationRouter.route("/:reservationId").put(updateReservation);

module.exports = reservationRouter;
