module.exports = [
  {
    username: "queue_admin",
    password: "password",
    retailerName: "QueueApp",
    address: {
      street: "Kapiolani Blvd",
      streetNumber: 1234,
      city: "Honolulu",
      state: "HI",
      zipcode: 96813,
    },
    phoneNumber: "8087730442",
    storeHours: {
      open: 800,
      close: 2100,
    },
    capacity: {
      max: 4,
    },
    timers: {
      notification: 60,
    },
    reservations: [],
  },
  {
    username: "hotTopic808",
    password: "password",
    retailerName: "HotTopic",
    address: {
      street: "Cool Street",
      streetNumber: 666,
      city: "Honolulu",
      state: "HI",
      zipcode: 96813,
    },
    phoneNumber: "18086661337",
    storeHours: {
      open: 1000,
      close: 2100,
    },
    capacity: {
      max: 3,
    },
    timers: {
      notification: 300,
    },
  },
];
