const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

/**
 * multer를 사용하여 fileUpload 하기
 *
 */
// 파일의 저장소 정보를 설정하기
const saveOption = multer.diskStorage({
  // 파일이 업로드 된 후 저장소 위치 지정하기
  destination: (req, file, cb) => {
    // 현재 폴더(__dirname,routes)에서 cd..을 실행하고
    // cd public을 실행하고
    // cd images를 실행한 곳(폴더)를 저장소로 지정하겠다.
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    // 현재 날짜를 이용해서 처리하기, 이전 스프링에서 uuID를 사용했던 것과 같이 해킹에 대비하기 위해 이름을 변경한 것
    // 파일을 지정할 때 해킹에 대비하여 임의의 일련번호를 파일명 앞에 붙여 새로운 이름을 생성하라
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// ajax를 통해서 전달된 upFile에 담긴 파일정보를
// saveOption에 설정된 저장소 정보를 기준으로 저장을 실행할 함수 선언
const uploadFile = multer({
  storage: saveOption,
}).single("upFile");

router.post("/fileup", uploadFile, (req, res) => {
  // router.post()가 실행돠는 과정에서
  // uploadFile middleware가 중간에 실행되면
  // diskStrorage에 설정된 정보에 따라
  // 코드가 실행되면서 여기에서 새로 생성된 파일 이름을
  // req.file.filename에 추가해준다.
  res.json({ fileName: req.file.filename });
});

module.exports = router;
