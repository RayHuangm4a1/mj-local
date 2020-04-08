const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes/mobile"));
app.use("/api/v1", require("./routes/mobile-api/index.v1"));

app.get("/health", require("ljit-db/middlewares/health").pong);
app.get("/healthz", require("ljit-db/middlewares/health").ping(global.MONGO_URL));

app.use(require("./middlewares/error-logger"), require("ljit-error/middlewares"));

module.exports = app;
