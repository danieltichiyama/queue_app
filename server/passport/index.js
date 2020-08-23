const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { Retailer } = require("../models");

const saltRounds = 12;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      try {
        Retailer.findOne({ username: username })
        .then(async retailer => {
          if (!retailer) {
            return done(null, false, {message: "Username or password invalid." });
          } else {
            bcrypt.compare(password, retailer.password).then(result => {
              if (!result) {
                return done(null, false, { message: 'Username or password invalid. '});
              }
              console.log("user found & authenticated");
              return done(null, true, "Success");
            })
          }
        })
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      try {
        Retailer.findOne({ username: username })
        .then(async retailer => {
          if (retailer) {
            return done(null, false, { message: 'Email already taken.' });
          } else {
            await bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                return err;
              }
              return done(null, true, hash)
            })
          }
        })
      } catch (err) {
        done(err);
      }
    }
  )
)

passport.serializeUser(function(retailer, done) {
  return done(null, { id: retailer._id, username: retailer.username, name: retailer.retailerName });
});

passport.deserializeUser(function(retailer, done) {
  return done(null, retailer);
});