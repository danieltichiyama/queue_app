const { Retailer } = require("../models");
const verificationRouter = require("../api/verification-routes");
const { twiml } = require("twilio");
const sgMail = require("@sendgrid/mail");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require("twilio")(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const verificationController = {
  sendPIN({ params, body }, res) {
    let verificationType = body.verificationType;
    let retailerId = params.retailerId;
    let randomPIN = Math.floor(100000 + Math.random() * 900000);
    let toNumber = body.number;
    let toEmail = body.email;

    Retailer.findByIdAndUpdate(
      { _id: retailerId },
      { verificationPIN: randomPIN }
    ).then((results) => {
      let retailerName = results.retailerName;
      let verificationPIN = results.verificationPIN;
      if (verificationType === "text") {
        client.messages
          .create({
            body: `Hello ${retailerName}, your verification PIN is ${verificationPIN}`,
            from: twilioNumber,
            to: toNumber,
          })
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      } else if (verificationType === "call") {
        client.calls
          .create({
            twiml: `<Response><Say>Hello ${retailerName}, this is a call from Queue App. Your verification pin is ${verificationPIN}. Please verify your pin in our app. Again, your verification pin is ${verificationPIN}. Thank you.</Say></Response>`,
          })
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      } else if (verificationType === "email") {
        sgMail
          .send({
            to: `${toEmail}`,
            from: "kevinchguo@gmail.com",
            subject: "Queue App Verification",
            text: `Hello ${retailerName}, your PIN is ${verificationPIN}. Please verify through our app. Thank you!`,
            html: `<body><h1>Hello ${retailerName},</h1><p>your PIN is ${verificationPIN}. Please verify through our app. Thank you!</p></body>`,
          })
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      }
    });
  },
  checkPIN() {},
};

module.exports = verificationController;
