const { Customer, Reservation } = require("../models");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require("twilio")(accountSid, authToken);

const twilioController = {
  changeCustomerStatus(req, res) {
    const phoneNumber = req.body.From;
    let reply = req.body.Body.charAt(0).toUpperCase();
    const twiml = new MessagingResponse();

    if (reply === "Y") {
      reply = "confirmed";
      Customer.findOneAndUpdate(
        { phoneNumber: phoneNumber, status: reply },
        { new: true }
      ).then((results) => {
        twiml.message("Thank you for confirming your reservation");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      });
    } else if (reply === "P") {
      reply = "hold";
      Customer.findOneAndUpdate(
        { phoneNumber: phoneNumber, status: reply },
        { new: true }
      ).then((results) => {
        twiml.message("Your reservation has been put on hold.");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      });
    } else if (reply === "C") {
      reply = "canceled";
      Customer.findOneAndUpdate(
        { phoneNumber: phoneNumber, status: reply },
        { new: true }
      ).then((results) => {
        twiml.message("Your reservation has been canceled.");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      });
    }
  },
  twilioSend(req, res) {
    // req.body.number example "+12345678901"
    const toNumber = req.body.phoneNumber;
    const retailer = req.body.retailerName;
    client.messages
      .create({
        body: `Your reservation at ${retailer} is coming up soon. Please make your way back to the store in the next 5 minutes. You can respond with Y to confirm, P to push back your reservation, or C to cancel.`,
        from: twilioNumber,
        to: toNumber,
      })
      .then((response) => {
        if (response.status !== "queued") {
          res.status(500).json({ message: "Could not send text message." });
          return;
        }
        // changes replyStatus from null to pending
        Reservation.findOneAndUpdate(
          { _id: req.body.reservationId },
          { replyStatus: "pending" },
          { new: true }
        )
          .populate({ path: "customerId" })
          .then((results) => {
            return res.json(results);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Something went wrong with api/sms/send",
          error: err,
        });
      });
  },
};

module.exports = twilioController;
