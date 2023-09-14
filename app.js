require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var bodyParser = require('body-parser');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstor",
      version: "1.0.0",
      description: "Bookstor REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://bookstor-fri.herokuapp.com/api" }
    ]
  },
  apis: [
    "./app_api/models/models.js",
    "./app_api/routes/index.js"
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

require("./app_api/models/db")
require("./app_api/config/passport");

//var indexRouter = require('./app_server/routes/index');
var indexApi = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

require("./app_server/views/helpers/hbsh");

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use(passport.initialize());

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
//app.use('/', indexRouter);
app.use("/api", indexApi);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
});

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:5000000}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError")
    res.status(401).json({ message: err.name + ": " + err.message + "." });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
