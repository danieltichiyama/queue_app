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
    let retailerId = params.retailerId;
    let randomPIN = Math.floor(100000 + Math.random() * 900000);
    let toNumber = body.number;
    let toEmail = "kevinchguo@gmail.com";
    let verificationType = body.verificationType;

    Retailer.findByIdAndUpdate(
      { _id: retailerId },
      { verificationPIN: randomPIN }
    ).then((results) => {
      let verificationPIN = results.verificationPIN;
      if (verificationType === "text") {
        client.messages
          .create({
            body: `Hello RETAILER_NAME, your verification PIN is ${verificationPIN}`,
            from: twilioNumber,
            to: toNumber,
          })
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      } else if (verificationType === "call") {
        client.calls
          .create({
            twiml: `<Response><Say>Hello RETAILER_NAME, this is a call from Queued App. Your verification pin is ${verificationPIN}. Please verify your pin in our app. Again, your verification pin is ${verificationPIN}. Thank you.</Say></Response>`,
          })
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
      } else if (verificationType === "email") {
        sgMail.send({
          to: `${toEmail}`,
          from: "kevinchguo@gmail.com",
          subject: "Subject",
          text: "Hello",
          html: "<body>Hello</body>",
        });
      }
    });
  },
  checkPIN() {},
};

module.exports = verificationController;
