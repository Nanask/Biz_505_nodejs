//express frame work의 객체 선언
const express = require('express');

//express framework 에서 routing을 수행하기 위한 sub객체 선언
// controller로 변경해도 문제생기지 않음, 변수는 내가 원하는대로 설정하자
const controller = express.Router();
// const router = express.Router();

/* GET home page. */
controller.get('/', function (req, res, next) {
  //index.파일을 열어서 랜더링하라
  res.render('index', { title: 'Express' });
});

controller.get("/home", function (req, res, next) {
  // 문자열을 화면에 보여라
  res.send("Hello Korea")
})

controller.get("/json", function (req, res) {
  let mData = {
    name: "홍길동",
    tel: "010-000-0000",
    age: 33,
  }
  res.json(mData)
}

// 다른 js에서 import(require)하여 사용할 수 있도록 
// controller 객체를 내보내기
// 모듈화를 하고 항상 맨 밑에 이 코드를 입력해야 함
module.exports = controller;
