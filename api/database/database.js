const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nuktastore",
  port: 3306,
});

connection.connect((err) => {
  if (!err) console.log("database connected successfully");
  else console.error(JSON.stringify(err));
});

module.exports = connection;
