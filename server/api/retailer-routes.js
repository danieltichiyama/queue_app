const retailerRouter = require("express").Router();
const passport = require("passport");
const reservationController = require("../controllers/reservationController");

const {
  createRetailer,
  getAuthRetailer,
  updateRetailer,
  loginRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");

retailerRouter.route("/sse").get(async (req, res) => {
  console.log("connection established.");
  res.set({
    "Content-type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  res.flushHeaders();

  res.write("retry: 5000\n\n");

  let count = 0;

  setInterval(() => {
    console.log("sending...", count);

    res.write(`id: ${count}\n`);
    res.write("event: message\n");
    res.flush();

    count++;
  }, 4000);
});

retailerRouter
  .route("/:retailerId")
  .get(getAuthRetailer)
  .put(updateRetailer)
  .delete(deleteRetailer);
retailerRouter.route("/register").post(createRetailer);
retailerRouter.route("/login").post(loginRetailer);

module.exports = retailerRouter;
