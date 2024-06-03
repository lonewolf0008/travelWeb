const db = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await db.connect("mongodb://127.0.0.1:27017/travel");
}

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Database err => " + err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "664ab6af3a149397c0defe06" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
