const {averageListingSelling} = require("./controllers/averageListingSelling.controller.js");
const {percentualDistribution} = require("./controllers/percentualDistribution.controller.js");

const routes = (router) => {
    router.get("/api/average-listing", averageListingSelling);
    router.get("/api/percentual-distribution", percentualDistribution);
};

module.exports = routes;
