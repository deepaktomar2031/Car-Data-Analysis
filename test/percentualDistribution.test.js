const csv = require("csvtojson");
const percentualDistribution = require("./../src/percentualDistribution");

// const testFilePath = "./test/testDataListings.csv";

const csvtojson = async (filePath) => {
  try {
    return await csv().fromFile(filePath);
  } catch (error) {
    console.log(error);
  }
};

describe("Autoscout24 test App", () => {
  it("Should return € 10,- for seller_type = private", async () => {
    // const testListingsArray = await csvtojson(testFilePath);
  });
});
