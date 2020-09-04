const { Retailer } = require("../models");

const verificationController = {
  sendPIN({ params }, res) {
    let retailerId = params.retailerId;
    let randomPIN = Math.floor(100000 + Math.random() * 900000);
    Retailer.findByIdAndUpdate(
      { _id: retailerId },
      { verificationPIN: randomPIN }
    ).then(results => {});
  },
  checkPIN() {}
};

module.exports = verificationController;
