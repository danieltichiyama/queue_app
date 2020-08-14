const { Schema, model, Mongoose } = require("mongoose");
const moment = require("moment");

const ReservationSchema = new Schema(
    {
        reservation_id: mongoose.ObjectId,
        retailer_id: { type: Schema.Types.ObjectId, ref: "Retailer" },
        customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
        queueStatus: { type: String },
        replyStatus: { type: String },
        partySize: { Type: Number },
        archivedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)

const Reservation = model("Reservation", ReservationSchema);

module.exports = Reservation;