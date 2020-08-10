require('dotenv').config();

const express = require('express');
const twilioSendRouter = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken)

twilioSendRouter.route('/').post((req, res) => {
    const toNumber = `+18083934251`;
    client.messages.create({
        body: "Your reservation is coming up soon. Please make your way back to the store in the next 5 minutes. You can respond with Y to confirm, P to push back your reservation, or C to cancel.",
        from: `${process.env.TWILIO_NUMBER}`,
        to: `${toNumber}`
    })
        .then((message) => console.log(message))
        .catch((err) => console.log(err))
})

module.exports = twilioSendRouter;