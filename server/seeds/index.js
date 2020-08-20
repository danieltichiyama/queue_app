const { Seeder } = require("mongo-seeding");
const path = require("path");

const config = {
  database: "mongodb://127.0.0.1:27017/queue-app",
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve("./server/seeds/data")
);

seeder
  .import(collections)
  .then(() => {
    console.log("Database Seeding Complete");
  })
  .catch((err) => {
    console.log(err);
  });
