var express = require("express");
const { tbl_bbs } = require("../models/index");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  tbl_bbs.findAndCountAll().then((result) => {
    res.render("index", { BBS: result.rows });
  });
});

// router.get("/", function (req, res, next) {
//   let id = res.query;
//   console.log("seq", id);
//   tbl_bbs.findByPk(seq).then((result) => {
//     res.render("index",;
//   });
// });

module.exports = router;
