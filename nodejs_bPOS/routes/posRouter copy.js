const express = require("express");
const router = express.Router();

const moment = require("moment");
const { tbl_product, tbl_table_orders } = require("../models/index");

// localhost:3000/pos/order/3 이라고 URL이 전송되어 오면
// 숫자 3이 변수 table_id에 담겨온다,
// 이 table_id는 req.params.table_id를 getter하여 값을 확인할 수 있다.
router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  console.log("table id", table_id);

  const MENU = await tbl_product.findAll().then({
    order: ["p_name", "ASC"],
  });
  // .then((result) => {
  //   res.render("order_view", { table_id, MENU: result });
  // });
  const order_list = await tbl_table_orders.findAll({
    where: { to_table_id: table_id },
  });
  res.render("order_view", { table_id, MENU, order_list });
  // 보내지는지 확인!
  // res.send(table_id);

  // table_id라는 새로 만든 변수에 table id를 넣어서 보내라
  // res.render("order_view", {table_id : table_id})

  // table_id가 같은 값이기 때문에 이렇게 적어도 문제가 없다.
  //
  //res.render("order_view", { table_id });
});

//:table_id를 넣어주면 URL에서 뽑아 쓸수 있다.
// table id와 menu id가 web으로 부터 전달되어 왔다.
// 현재 table에 손님이 있고 메뉴를 주문하기 시작했다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// let menu_list = []; // blank 배열 생성
router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  // 선택된 메뉴를 menu_list에 추가
  tbl_product.findByPk(menu_id).then((product) => {
    //   선택하는 값에 따라서 메뉴 리스트가 추가 된다!!
    // menu_list.push(result);

    // tbl_table_orders에 insert 할 데이터 준비
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
        // order_list 로 menu_list를 바꿔주기
      });
    });
  });

  //   const menu = {
  //     table_id,
  //     menu_id,
  //     menu_name: "1000원 김밥",
  //     menu_price: 1000,
  //   };
  // json으로 메뉴전송
  //   res.json(menu);

  // res.send("선택된 메뉴" + menu_id);
});

router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;

  tbl_table_orders.findAll({ where: { to_table_id: table_id } }).then((result) => res.json(result));
});
module.exports = router;
