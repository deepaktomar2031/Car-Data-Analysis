require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const setCache = require("./middlewares/browser-cache");
const routes = require("./routes.js");
const LogErrorMessage = require("./utils/error-handler.js");

const app = express();
const PORT = process.env.Port || 8000;

const listenPort = (PORT) => {
    app.listen(PORT, () => console.log(`Server is up & running on http://localhost:${PORT}`));
};

const useBodyParser = () => {
    app.use(bodyparser.json());
};

const useCache = () => {
    app.use(setCache);
};

const createRoutes = () => {
    routes(app);
};

const start = async () => {
    try {
        listenPort(Number(PORT));
        useBodyParser();
        useCache();
        createRoutes();
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

module.exports = { start, app };
