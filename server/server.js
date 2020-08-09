require("dotenv").config({ path: __dirname + './../.env' });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.EXPRESS_HOST_PORT || 3001;

app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

const twilioServices = require('./routes/api/twilioServices/send')
const twilioReplyServices = require('./routes/api/twilioServices/reply')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/queue-app", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Use this to log mongo queries being executed
mongoose.set("debug", true);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, smoke: "hello brian" });
});

app.use("/api/retailers", require("./routes/retailerRoutes"));
app.use("/api/sms/send", twilioServices)
app.use('/api/sms/reply', twilioReplyServices)
app.listen(PORT, () => {
  console.log(`Port ${PORT} at your service BRIAN`);
});
