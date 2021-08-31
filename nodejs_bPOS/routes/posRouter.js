const express = require("express");
const router = express.Router();

const moment = require("moment");
const { tbl_product, tbl_table_orders } = require("../models/index");

router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  console.log("table id", table_id);

  const MENU = await tbl_product.findAll().then({
    order: ["p_name", "ASC"],
  });
  res.render("order_view", { table_id, MENU });
});

router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  tbl_product.findByPk(menu_id).then((product) => {
    const table_orders = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: product.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };

    tbl_table_orders.create(table_orders).then((result) => {
      tbl_table_orders.findAll({ where: { to_table_id: table_id } }).then((order_list) => {
        res.json({ table_id, order_list });
      });
    });
  });
});

router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;

  tbl_table_orders.findAll({ where: { to_table_id: table_id } }).then((result) => res.json(result));
});
module.exports = router;
