const mysql = require("mysql");

const getConnection = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
  });
};

module.exports = getConnection;
