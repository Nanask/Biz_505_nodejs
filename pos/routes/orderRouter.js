const express = require("express");
const router = express.Router();

const { tbl_orders, tbl_products } = require("../models/index");

router.get("/detail", (req, res) => {
  const { o_table } = req.query;
  // req.body.o_table = o_table;

  tbl_orders.findOne({ where: { o_table } }).then((result) => {
    console.log("테이블번호", { o_table });
    if (result) {
      res.render("detail", { order: result });
    } else {
      // res.render("order", { order: { o_table } })
      tbl_products.findAndCountAll().then((result) => {
        console.log(result);
        res.render("order", { PD: result.rows, order: { o_table } });
      });
    }
  });
});

router.get("/list", (req, res) => {
  const code = req.query.code;

  tbl_products.findByPk(code).then((result) => {});
});

// router.get("/detail", (req, res) => {
//   // console.log("req.query", req.query);
//   const o_table = req.query.o_table;
//   // const o_seq = tbl_orders.o_seq;

//   // req.body.o_table = o_table;

//   // console.log("테이블이 몇번이냐", o_table);

//   console.log("테이블번호", o_table);
//   // tbl_orders.findByPk(o_table);
//   // console.log("seq", tbl_orders.o_seq);
//   tbl_orders.findOne({ where: { o_table } }).then((result) => {
//     res.render("detail", { o_table });
//   });
// });

module.exports = router;
