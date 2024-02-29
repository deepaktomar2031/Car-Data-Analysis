const express = require("express");
const app = express();
require("dotenv").config();
const csv = require("csvtojson");
const bodyParser = require("body-parser");

const setCache = require("../lib/browser-cache");
const dbConnection = require("../lib/database");
const redisClient = require("./../lib/redis");

const PORT1 = 3000;
const PORT2 = 3030;

app.use(bodyParser.json());
app.use(setCache);

const listingsFilePath = "./public/listings.csv";

const averageListingSelling = require("./averageListingSelling");
const percentualDistribution = require("./percentualDistribution");

let averageListingData;

app.get("/", (req, res) => {
  const queryString = "SELECT * FROM Student";
  try {
    dbConnection().query(queryString, (err, rows, field) => {
      if (err) {
        console.log("something went wrong", err);
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        console.log("Information fetched successfully of all students ");
        res.status(200).json(rows);
      } else {
        console.log("no student found saved in table");
        res.status(200).send();
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const getStudentDetails = (req, res) => {
  const { id } = req.params;
  const queryString = `SELECT * FROM Student where id=${id}`;
  try {
    dbConnection().query(queryString, async (err, rows, field) => {
      if (err) {
        console.log("something went wrong", err);
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        console.log("Served from DB");
        await redisClient.set(id, JSON.stringify(rows));
        res.status(200).json(rows);
      } else {
        console.log("no student found saved in table");
        res.status(200).send(`no student found with id ${id}`);
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const checkRedisCache = (req, res, next) => {
  const { id } = req.params;
  redisClient.get(id, (err, data) => {
    if (err) {
      console.log("something went wrong", err);
      return;
    }
    if (data != null) {
      console.log("Served from Redis");
      res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  });
};

app.get("/student/:id", checkRedisCache, getStudentDetails);

app.post("/", (req, res) => {
  if (Object.keys(req.body).length > 0) {
    res.json({
      received: req.body,
    });
  } else {
    res.send("Got the post!");
  }
});

app.get("/auth-endpoint", (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization == "my-api-key-123"
  ) {
    res.send("Authorized!");
  } else {
    res.status(401).send();
  }
});

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

app.listen(process.env.PORT1 || PORT1, () =>
  console.log(`Server is up & running on port ${PORT1}`)
);

module.exports = app;

const app2 = express();
app2.use(bodyParser.json());
app2.get("/", (req, res) => res.send("Hello from the other environment!"));
app2.listen(process.env.PORT2 || PORT2, () =>
  console.log(`Server is up & running on port ${PORT2}`)
);
