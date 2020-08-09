const Customer = require('../models/Customer');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const twilioController = {
    changeCustomerStatus(req, res) {
        const phoneNumber = req.body.From.slice(1);
        let reply = req.body.Body.charAt(0).toUpperCase();
        const twiml = new MessagingResponse();

        if (reply === 'Y') {
            reply = "confirmed";
            Customer.findOneAndUpdate({ phoneNumber: phoneNumber, status: reply }, { new: true }).then((results) => {
                twiml.message('Thank you for confirming your reservation');
                res.writeHead(200, { 'Content-Type': 'text/xml' })
                res.end(twiml.toString())
            })
        } else if (reply === "P") {
            reply = 'hold';
            Customer.findOneAndUpdate({ phoneNumber: phoneNumber, status: reply }, { new: true }).then((results) => {
                twiml.message('Your reservation has been put on hold.');
                res.writeHead(200, { 'Content-Type': 'text/xml' })
                res.end(twiml.toString())
            })
        } else if (reply === "C") {
            reply = "canceled";
            Customer.findOneAndUpdate({ phoneNumber: phoneNumber, status: reply }, { new: true }).then((results) => {
                twiml.message('Your reservation has been canceled.');
                res.writeHead(200, { 'Content-Type': 'text/xml' })
                res.end(twiml.toString())
            })
        }

    }
}

module.exports = twilioController;