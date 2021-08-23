const express = require('express');
const router = express.Router();


// "/" subpath부분 , app.js에서 기본 home에 대한 값을 만들었기 때문에 여기서는 subpath기능만 구현 
router.get("/", function (req, res) {
    res.render("home", { nation: "대한민국" });
})

router.get("/my", function (req, res) {
    res.render("home", { nation: "대한민국" });
})

module.exports = router;