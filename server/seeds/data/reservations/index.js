const { Types } = require("mongoose");

module.exports = [
  {
    _id: new Types.ObjectId("111111111111111111111111"),
    customerId: "111111111111111111111111",
    retailerId: "111111111111111111111111",
  },
  {
    _id: new Types.ObjectId("222222222222222222222222"),
    customerId: "222222222222222222222222",
    retailerId: "111111111111111111111111",
  },
  {
    _id: new Types.ObjectId("333333333333333333333333"),
    customerId: "333333333333333333333333",
    retailerId: "111111111111111111111111",
  },
  {
    _id: new Types.ObjectId("444444444444444444444444"),
    customerId: "444444444444444444444444",
    retailerId: "111111111111111111111111",
  },
  {
    _id: new Types.ObjectId("555555555555555555555555"),
    customerId: "111111111111111111111111",
    retailerId: "222222222222222222222222",
  },
  {
    _id: new Types.ObjectId("666666666666666666666666"),
    customerId: "222222222222222222222222",
    retailerId: "222222222222222222222222",
  },
  {
    _id: new Types.ObjectId("777777777777777777777777"),
    customerId: "333333333333333333333333",
    retailerId: "222222222222222222222222",
  },
  {
    _id: new Types.ObjectId("888888888888888888888888"),
    customerId: "444444444444444444444444",
    retailerId: "222222222222222222222222",
  },
];
