const express = require("express");
const router = express.Router();

const { tbl_bbs } = require("../models/index");

router.get("/write", (req, res) => {
  res.render("write");
});

// create 를 생성해서 테이블 생성하기
router.post("/write", (req, res) => {
  tbl_bbs.create(req.body).then((result) => {
    res.json(result);
  });
});

router.get("/update", (req, res) => {
  let id = req.query.seq;
  tbl_bbs.findByPk(id).then((result) => {
    console.log("seq",id);
    res.render("update", { BBS: result });
  });
});

module.exports = router;
