import express from "express";
import passport from "passport";
import users from "../models/User.js";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// BBs.jsx에서 POST로 보낸 데이터를 받기
// http://localhost/users 응답
router.post("/", (req, res) => {
  // 로그인이 수행되어서 session이 유효한 경우에는
  // req.user 속성이 존재한다
  // 로그인이 안되거나 session이 유효하지 않으면
  // req.user가 없다

  if (req.user) {
    console.log("session OK");
    res.json(req.user);
  } else {
    // 데이터가 없다면 빈 배열을 넣어주기, 이러면 자동 로그아웃을 시킬수 있다?
    res.json([]);
  }
});

/**
 * react와 nodejs API를 연동하여 login 구현하기
 * login router는 반드시 POST 구현해야한다.
 * getter방식으로 하면 왜 안되죠
 * oAuth2.0 passport 방식으로 login을 할 때는 정책상 반드시 POST로
 * 요청을 해야한다.
 *
 * passport를 사용하여 Login을 수행할 때 router의
 * path와 callback 함수사이에서 login 정책을 수행할 미들웨어
 * passport.authenticate("local")
 *
 *
 */
// passport에 authenticate를 거치게 되면 req에 user가 추가가 된다
router.post("/login", passport.authenticate("local"), (req, res) => {
  // res.json({ result: "OK" });
  console.log(req.user); // passport가 거쳤을때 확인하는 절차?
  // res.json({ user : req.user });p
  res.json({
    userid: req.user.userid,
    password: req.user.password,
  });
});

/**
 * 클라이언트에서 서버로 데이터를 전송하는 방법
 * queryString : 주소창에 ?변수1 = 값&변수2=값 과 같은 형식으로 전송
 * http:localhost:8080/user?id=root&password=1234 로 보내면
 * URL에 다 보여지기 때문에 보안상에 문제가 생긴다
 * => 서버에서 데이터를 받을 때는 req.query.변수
 *
 * pathVarriable : 주소창에 보내는데 URL과 섞어서 보내는 방식
 * http:localhost:8080/user/callor/1234
 * => router.get("/user/:id/:password")
 * => 서버에서 받을 때 req.params.변수
 *
 * POST로 전송된 데이터는 전송되는 순간 노출을 최소화 할수있다
 * https 를 사용하면 데이터가 암호화 되어 전송된다
 * => 서버에서 받을때는 req.body.변수
 */
router.post("/join", async (req, res) => {
  // const { userid, password, email } = req.body;

  const userVO = new users(req.body);

  userVO.save((err, data) => {
    res.json(data);
  });
  // })
  // console.log("userid", userid), console.log("password", password), console.log("email", email), res.json("받았는지 확인");
  // const result = await users.create(req.body);
  // console.log(result);
});

export default router;
