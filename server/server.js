var mysql = require("mysql");
const app = require("./app");
const db = require("./models");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

var connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6689445",
  password: "BkxjYDFqIv",
  database: "sql6689445",
  port: "3306",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("DB connected successfull!");
});

const port = 3000;
let server;
db.sequelize.sync().then(() => {
  server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = connection;
