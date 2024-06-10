const csvtojson = require("./../utils/csvtojson.js");

const percentualDistribution = async (req, res) => {
    try {
        const listingsFilePath = "public/listings.csv";
        const listingsArray = await csvtojson(listingsFilePath);

        const arrayWithCarMakeCount = percentualDistributionHelperFunction(listingsArray);

        return res.status(200).json(arrayWithCarMakeCount);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ Message: "Something Went Wrong" });
    }
};

const percentualDistributionHelperFunction = (listingsArray) => {
    const totalCars = listingsArray.length;
    const dataGroupedByCar = listingsArray.reduce(groupedCar, {});
    let arrayWithCarMakeCount = [];

    Object.keys(dataGroupedByCar).forEach((item) => {
        arrayWithCarMakeCount.push({
            carMake: item,
            percentage: getPercentage(dataGroupedByCar[item].numberofCars, totalCars),
        });
    });

    arrayWithCarMakeCount.sort((a, b) => b.percentage - a.percentage);
    arrayWithCarMakeCount.forEach((item) => {
        item.percentage = formatPercentage(item.percentage);
    });
    return arrayWithCarMakeCount;
};
const formatPercentage = (inputPercentage) => {
    return `${inputPercentage} %`;
};

const getPercentage = (numberofCars, totalCars) => {
    return ((numberofCars / totalCars) * 100).toFixed(2);
};

const groupedCar = (groupedByCar, item) => {
    let make = item.make;
    if (!groupedByCar[make]) {
        groupedByCar[make] = { numberofCars: 1 };
        return groupedByCar;
    }
    ++groupedByCar[make].numberofCars;
    return groupedByCar;
};

module.exports = { percentualDistribution, percentualDistributionHelperFunction };
