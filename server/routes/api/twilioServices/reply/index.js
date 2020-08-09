const express = require('express');
const twilioReplyRouter = express.Router();
const { changeCustomerStatus } = require('../../../../database/controllers/twilioController')


twilioReplyRouter.route('/').post(changeCustomerStatus);

module.exports = twilioReplyRouter;