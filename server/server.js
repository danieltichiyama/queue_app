require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const client = redis.createClient(6379, "localhost");
const passport = require("passport");
const compression = require("compression");

require("./passport");

const app = express();

const PORT = process.env.EXPRESS_HOST_PORT || 3001;

app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const api = require("./api");

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

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Port ${PORT} at your service BRIAN`);
});
