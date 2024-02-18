const express = require("express");
const app = express();
const csv = require("csvtojson");
const port = 3000;

const listingsFilePath = "./public/listings.csv";

const averageListingSelling = require("./averageListingSelling");
const percentualDistribution = require("./percentualDistribution");

let averageListingData;

const csvtojson = async (filePath) => {
  try {
    return await csv().fromFile(filePath);
  } catch (error) {
    console.log(error);
  }
};

app.get("/average-listing", async (req, res) => {
  const listingsArray = await csvtojson(listingsFilePath);
  averageListingData = averageListingSelling(listingsArray);
  return res.status(200).json(averageListingData);
});

app.get("/percentual-distribution", async (req, res) => {
  const listingsArray = await csvtojson(listingsFilePath);
  averageListingData = percentualDistribution(listingsArray);
  return res.status(200).json(averageListingData);
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server is up & running on port ${port}`)
);

module.exports = app;
