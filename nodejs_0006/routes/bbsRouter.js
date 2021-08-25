const express = require("express");
const router = express.Router();
// JS, nodejs에서 날짜 시간을 취급하는 가장 많이 사용되는 middleware
const moment = require("moment");
const { route } = require(".");

const { tbl_bbs, tbl_reply } = require("../models/index");

// 설정된 root get은 URL에서 localhost:3000/bbs/write 요청할 때
router.get("/write", (req, res) => {
  const BBS = {
    b_date: moment().format("YYYY[-]MM[-]DD"),
    b_time: moment().format("HH:mm:ss"),
  };
  res.render("write", { BBS });
});
router.post("/write", (req, res) => {
  // form을 통해서 POST로 전송되어 온 데이터는 req.body에 담겨서 온다.
  // 이 때 버튼도 form 안에 넣어줘야 한다.
  tbl_bbs.create(req.body).then((result) => res.redirect("/"));
});

router.get("/detail", (req, res) => {
  // list에서 게시물을 클릭했을 때 게시물의 id값(b_id)를 queryString으로 가지고 여기에 도달한다
  const b_id = req.query.b_id;

  // PK를 기준으로 1개의 데이터를 추출하라
  // tbl_bbs.findByPk(b_id).then((result) => {
  //   console.table(result);
  //   // res.json(result);
  //   res.render("detail", { BBS: result });
  // });

  // tbl_bbs에서 b_id 칼럼값으로 데이터를 1개 SELECT하고
  // tbl_reply.r_postId = b_id로 WHERE를 실행하여
  // tbl_reply를 SELECT하고 그 LIST를 함께 묶어서 결과로 달라
  tbl_bbs
    .findOne({ where: { b_id }, include: { model: tbl_reply } })
    .then((result) => {
      console.log(result);
      res.render("detail", { BBS: result });
    });
});

router.get("/delete", (req, res) => {
  const b_id = req.query.b_id;
  //
  tbl_bbs.destroy({ where: { b_id } }).then(() => {
    res.redirect("/");
  });
});

router.get("/update", (req, res) => {
  const b_id = req.query.b_id;

  // PK 또는 일반 칼럼에 조건을 주어 1개의 데이터를 SELECT 할 때
  // tbl_bbs.findOne({ where: { b_id } });

  tbl_bbs.findByPk(b_id).then((result) => {
    res.render("write", { BBS: result });
  });
});
router.post("/update", (req, res) => {
  const b_id = req.query.b_id;
  // body에 b_id가 추가됨.
  req.body.b_id = b_id;

  tbl_bbs.update(req.body, { where: { b_id } }).then((result) => {
    res.redirect("/");
  });
});

router.post("/reply", (req, res) => {
  tbl_reply.create(req.body).then((result) => {
    res.redirect("/bbs/detail?b_id=" + req.body.r_postId);
  });
});
/**
 * HTML에서 서버로 데이터를 보낼 때 받는 방법
 *
 * 1. queryString
 * http://localhost:3000/bbs/detail?b_id=3 이렇게 보낼 때
 * req.query.b_id로 받기
 * const b_id = req.query.b_id
 *
 * 2. body
 * form의 POST로 전송했을 때
 * req.body.b_title, 등등으로 받기
 * const b_title = req.body.b_title
 * 이렇게 받은 데이터를 sequelize를 사용하여 DB에 insert,update
 * table.create(req.body), table.update(req.body,{b_id})
 *
 * 3. pathVarriable
 * http://localhost:3000/bbs/reply/delete/3 이렇게 보낼때
 *
 * router.get("reply/delete/{rid}")로 URL path를 설정하고
 * req.params.rid로 데이터를 받는다.
 * const rid = req.params.rid 와 같이 받는다.
 */

router.get("/reply/delete/:rid", (req, res) => {
  const rid = req.params.rid;

  tbl_reply.findByPk(rid).then((result) => {
    const postId = result.r_postId;
    tbl_reply.destroy({ where: { id: rid } }).then(() => {
      res.redirect(`/bbs/detail?b_id=${postId}`);
    });
  });
});

module.exports = router;
