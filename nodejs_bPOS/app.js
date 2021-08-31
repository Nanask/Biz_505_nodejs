var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 선언한 sequelize에 미들웨어에 들어있는 sync를 호출한다?
// 커넥션이 완료되면 then이 호출된다.
const sequelize = require("./models/index");
sequelize.sequelize.sync().then((result) => {
  console.log("HOST", result.options.host);
  console.log("Database", result.options.database);
  console.log("DB 연결 OK");
});

// 위에와 같은 코드
// const sequelize = require("./models/index").sequelize
// sequelize.sync();

var indexRouter = require("./routes/index");

// 주석쓰기
const posRouter = require("./routes/posRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// import된 router를 RequestMapping하기
app.use("/pos", posRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
