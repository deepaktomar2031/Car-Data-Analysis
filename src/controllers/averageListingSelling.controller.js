const csvtojson = require("./../utils/csvtojson.js");

const averageListingSelling = async (req, res) => {
    try {
        const listingsFilePath = "public/listings.csv";
        const listingsArray = await csvtojson(listingsFilePath);
        const finalResponse = averageListingSellingHelperFunction(listingsArray);

        return res.status(200).json(finalResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ Message: "Something Went Wrong" });
    }
};

const averageListingSellingHelperFunction = (listingsArray) => {
    let responseObject = listingsArray.reduce(groupFunction, {});

    let finalResponse = [];

    Object.keys(responseObject).forEach((seller_type) => {
        const average_price = averageFunction(responseObject[seller_type].totalPrice, responseObject[seller_type].numberOfCars);
        finalResponse.push({
            seller_type: seller_type,
            average_price: formatOutput(average_price),
        });
    });
    return finalResponse;
};
const formatOutput = (average_price) => {
    return `€ ${average_price},- `;
};

const averageFunction = (totalPrice, numberOfCars) => {
    return Math.ceil(totalPrice / numberOfCars);
};

const groupFunction = (groupedObject, singleListing) => {
    let seller_type = singleListing.seller_type;
    let price = Number(singleListing.price);

    if (!groupedObject[seller_type]) {
        groupedObject[seller_type] = { totalPrice: price, numberOfCars: 1 };
        return groupedObject;
    }
    groupedObject[seller_type].totalPrice += price;
    ++groupedObject[seller_type].numberOfCars;
    return groupedObject;
};

module.exports = { averageListingSelling, averageListingSellingHelperFunction };
