const { Customer } = require("../models");
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
    // req.body.number === "+12345678901"
    const toNumber = req.body.number;
    client.messages
      .create({
        body:
          "Your reservation is coming up soon. Please make your way back to the store in the next 5 minutes. You can respond with Y to confirm, P to push back your reservation, or C to cancel.",
        from: twilioNumber,
        to: toNumber,
      })
      .then((message) => console.log(message))
      .catch((err) => console.log(err));
  },
};

module.exports = twilioController;
