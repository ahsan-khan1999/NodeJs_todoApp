var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var { mongodb_url } = require("./database_layer/database_config");
var app = express();

mongoose.connect(mongodb_url, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true",
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongodb_url.split("@")[1]}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

BASE_URL = "/api/v1";
app.use("/", require("./routes/index"));
app.use(BASE_URL + "/user", require("./routes/user_route"));
app.use(BASE_URL + "/todo", require("./routes/todo_route"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ response_message: "API End Point not Found" });
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // display logs
  console.log(err)
});

module.exports = app;
