var express = require('express');
var router = express.Router();

// models 폴더에서 정보를 읽어서
// tbl_bbs 객체를 사용할 수 있도록 선언, 초기화
// models/index.js는 models 폴더에 있는
// table 설정과 관련된 파일들을 읽어서 객체로 return을 한다.
// return 된 객체에서 table 객체 요소만 추출하여 사용하도록 전개연산을 수행한다.
const { tbl_bbs } = require("../models/index")

/* GET home page. */
router.get('/', function (req, res, next) {

  // 구분하지 않고 전체 데이터가 나오는 것
  tbl_bbs.findAndCountAll().then((result) => {
    console.log(result);

    res.render("index", { BBS: result.rows })
  });

});

module.exports = router;
