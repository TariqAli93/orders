const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const upload = require("express-fileupload");
const app = express();

app.use(cors());
app.use(upload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

require("./api/routes/products")(app);
require("./api/routes/orders")(app);
require("./api/routes/Admin")(app);

app.use("/attachments", express.static("./api/attachments/"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
