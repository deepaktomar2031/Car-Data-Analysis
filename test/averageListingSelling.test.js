const csv = require("csvtojson");
const averageListingSelling = require("./../src/averageListingSelling");

const testFilePath = "./test/testDataListings.csv";

const csvtojson = async (filePath) => {
  try {
    return await csv().fromFile(filePath);
  } catch (error) {
    console.log(error);
  }
};

describe("Autoscout24 test App", () => {
  it("Should return € 10,- for seller_type = private", async () => {
    const testListingsArray = await csvtojson(testFilePath);
    expect(averageListingSelling(testListingsArray)[0].average_price).toEqual(
      "€ 10,- "
    );
  });

  it("Should return € 20,- for seller_type = dealer", async () => {
    const testListingsArray = await csvtojson(testFilePath);
    expect(averageListingSelling(testListingsArray)[1].average_price).toEqual(
      "€ 20,- "
    );
  });
  it("Should return € 30,- for seller_type = other", async () => {
    const testListingsArray = await csvtojson(testFilePath);
    expect(averageListingSelling(testListingsArray)[2].average_price).toEqual(
      "€ 30,- "
    );
  });
});
