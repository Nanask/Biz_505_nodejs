/**
 * express generator ES6+ template
 * @edit : callor@callor.com
 * @since : 2020-12-10
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 *
 * require() 방식의 코드를 import 방식으로 변경
 * require() 방식의 코드를 CommonJS 코드라고 하며
 * import 방식으로 사용하는 코드를 ES6+ 모듈 방식 코드라고 한다.
 */

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
// 변수를 적을 때는 이렇게 적어야한대요

// const { USERID, PASSWORD } = require("./config/mongoConfig");

// const atlasURL = `mongodb+srv://${USERID}:${PASSWORD}@cluster0.pavjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const localURL = "mongodb://localhost:27017/users";
const dbconn = mongoose.connection;
dbconn.once("open", () => {
  console.log("MongoDB OK");
});
dbconn.on("error", () => {
  console.error;
});

mongoose.connect(localURL);

import session from "express-session";
import passport from "passport";
import passportConfig from "./modules/PassportConfig.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express();

const whilteURL = ["http://localhost:3000"];
const corsOption = {
  origin: (origin, callback) => {
    const isWhiteURL = whilteURL.indexOf(origin) !== -1;
    callback(null, isWhiteURL);
  },
  //로그인 다음 세션정보를 클라이언트에게 전달하겠다는 의미
  credentials: true,
};

app.use(cors(corsOption));

// Disable the fingerprinting of this web technology. 경고
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./public")));

// 세션활성화
// 세션을 저장할 때 어떤식으로 저장하겠다는 의미
// 매번 초기화 시켜서 저장시키는 방식
// app.use(session({ secret: "aa1234", resave: true, saveUninitialized: false }));

// 쿠키를 따로 삭제기간을 정하게 하여
// 하루만 저장되고 삭제되게 설정하기
const oneDay = 1000 * 60 * 60 * 24; // 밀리초 * 60초 * 60분 * 24시간
app.use(
  session({
    secret: "aa1234", // 세션의 비밀키..?
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: oneDay,
    },
  })
);
app.use(passport.initialize()); // passport start
app.use(passport.session());
passportConfig();

// 미들웨어 넣어주기
// response를 할 때 session에 담긴 값을 클라이언트로 전송하기 위한 옵션설정

app.use((req, res, next) => {
  // cors로 허용해준 로컬호스트를 넣어주기
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

export default app;
