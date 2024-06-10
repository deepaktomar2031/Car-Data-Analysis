const csvtojson = require("./../src/utils/csvtojson.js");
const { averageListingSellingHelperFunction } = require("./../src/controllers/averageListingSelling.controller.js");

const testFilePath = "test/testDataListings.csv";

describe("Car Data Analysis", () => {
    it("Should return € 10,- for seller_type = private", async () => {
        const testListingsArray = await csvtojson(testFilePath);
        expect(averageListingSellingHelperFunction(testListingsArray)[0].average_price).toEqual("€ 10,- ");
    });

    it("Should return € 20,- for seller_type = dealer", async () => {
        const testListingsArray = await csvtojson(testFilePath);
        expect(averageListingSellingHelperFunction(testListingsArray)[1].average_price).toEqual("€ 20,- ");
    });
    it("Should return € 30,- for seller_type = other", async () => {
        const testListingsArray = await csvtojson(testFilePath);
        expect(averageListingSellingHelperFunction(testListingsArray)[2].average_price).toEqual("€ 30,- ");
    });
});
