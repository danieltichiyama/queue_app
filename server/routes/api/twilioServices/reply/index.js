const express = require('express');
const twilioReplyRouter = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;


twilioReplyRouter.route('/').post((req, res) => {
    let reply = req.body.Body;
    const twiml = new MessagingResponse();

    if (reply === "Y" || reply === 'y') {
        twiml.message('Thank you for confirming your reservation');
        res.writeHead(200, { 'Content-Type': 'text/xml' })
        res.end(twiml.toString())
    } else if (reply === "P" || reply === "p") {
        twiml.message('Your reservation has been put on hold.');
        res.writeHead(200, { 'Content-Type': 'text/xml' })
        res.end(twiml.toString())
    } else if (reply === "C" || reply === "c") {
        twiml.message('Your reservation has been canceled.');
        res.writeHead(200, { 'Content-Type': 'text/xml' })
        res.end(twiml.toString())
    }

});

module.exports = twilioReplyRouter;