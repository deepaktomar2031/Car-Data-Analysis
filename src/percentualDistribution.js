const percentualDistribution = (listingsArray) => {
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

module.exports = percentualDistribution;
