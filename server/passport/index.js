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
      passwordField: "password",
    },
    (username, password, done) => {
      console.log('111111')
      return Retailer.findOne({ username: username }, "password")
        .then(async (retailer) => {
          console.log('test1')

          if (!retailer) {
            return done(null, false, {
              message: "Username or password invalid.",
            });
          } else {
            bcrypt
              .compare(password, retailer.password)
              .then((result) => {
                console.log('test2')
                if (!result) {
                  return done(null, false, {
                    message: "Username or password invalid.",
                  });
                }
                return done(null, retailer);
              })
              .catch((err) => {
                console.log(err);
                return done(err, false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          done(err, false, { message: "something went wrong." });
        });
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      return Retailer.findOne({ username: username })
        .then(async (retailer) => {
          if (retailer) {
            return done(null, false, { message: "Username already taken." });
          } else {
            await bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                return err;
              }
              return done(null, true, hash);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          done(err, false, { message: "something went wrong." });
        });
    }
  )
);

passport.serializeUser(function (retailer, done) {
  console.log("serializing user...");
  return done(null, retailer._id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializing user...", id);
  return Retailer.findById({ _id: id })
    .then((user) => {
      if (!user) {
        return done(new Error({ message: "User cannot be found." }));
      }

      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
    });
});
