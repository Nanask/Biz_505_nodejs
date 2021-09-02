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

/**
 * promise
 * 지금까지 사용된 JS코드는 대부분이 비동기방식이고 코드(함수)들의 순서가 보장되지 않았다.
 * 순서대로 작성된 코드가 지 맘대로 실행되기 때문에 그 부분을 해결하기 위해 call back이라는 개념으로 코딩을 했다.
 *
 * call back이 계속 겹치는 상황이 발생할 수 있고
 * 그러다 보면 가독성이 매우 떨어지는 코드가 된다.
 * a(call()=> {
 * b(call()=> )})
 *
 * js에서 이러한 상황을 callback Hell
 *
 * async를 사용하겠다고 알려줌
 * await => 순서를 정해주기
 */

router.get("/order/:table_id/input/:menu_id", async (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  // menu_id를 찾아서 menu에 담지 않는 이상 그 다음 코드로 넘어가지 않게 만든다?
  // await가 부착된 함수는
  // 함수의 실행이 완료되고 menu 변수에 결과값이 담기기 전에는
  // 다음 코드로 진행이 되지 않는다.
  const menu = await tbl_product.findByPk(menu_id);

  // 선택된 상품이 order list에 있는지를 검사하기 위해서
  // table_orders 에서 데이터 select 하기
  // to_pay: null 주문결제가 완료되면!
  const table_order = await tbl_table_orders.findOne({
    where: { to_table_id: table_id, to_pcode: menu_id, to_pay: null },
  });
  // 객체가 null 이 아니면
  // findOne() 한 결과가 있으면 (not null이면)
  // 수량만 ++ 하여 update를 수행하자
  if (table_order) {
    // 두개의 값 추출하기
    const order_qty = table_order.dataValues.to_qty;
    const order_seq = table_order.dataValues.to_seq;

    //  select한 결과에 update 수행
    const result = await table_order.update({ to_qty: order_qty + 1 }, { where: { to_seq: order_seq } });
    res.json(result);
  } else {
    // .then((product) => {

    const table_order_menu = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: menu.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };
    const result = tbl_table_orders.create(table_order_menu);
    res.json(result);
  }
  // }
});

//   tbl_table_orders.create(table_orders).then((result) => {
//     res.json(result);
//     //   tbl_table_orders.findAll({
//     // 	  where: { to_table_id: table_id } ,
//     // 	  include : [{model: tbl_product, require:false}]
//     // 	}).then((order_list) => {
//     //     res.json({ table_id, order_list });
//     //   });
//   });
// });
// });

// table Layout에서 주문서화면으로 진입할 때 현재 table에
// 주문리스트가 있으면 화면에 출력하기 위해
// Request 처리

router.get("/order/:table_id/getlist", (req, res) => {
  const table_id = req.params.table_id;

  //[Op.eq] , pay값이 null값인 것만 보여라, 이렇게 하면 결제가 완료된 것들은 보이지 않게 된다.
  /*
주문이 진행중인 상태에서는 orders들의 to_pay 칼럼이 null이고 결제가 완료된 상태는 to_pay에
문자열 P가 담기게 되므로 table layout에서 table을 선택하고 주문으로 돌아오면
해당 table id의 데이터들 중에서 to_pay가 null 값만 select하여 보여주기
*/
  tbl_table_orders
    .findAll({
      where: { to_table_id: table_id, to_pay: null },
      // 원하는 조인이 안될 수 있기 때문에 아웃조인을 하기 위한 조치??
      include: [{ model: tbl_product, require: false }],
    })
    .then((result) => res.json(result));
});

router.get("/order/:order_seq/delete", (req, res) => {
  const order_seq = req.params.order_seq;
  tbl_table_orders
    .destroy({
      where: { to_seq: order_seq },
    })
    .then(() => {
      res.send("OK");
    })
    // 실패했을 때 나타내는 코드
    .catch(() => {
      res.send("FAIL");
    });
});

router.get("/paycomplete/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  // table_id값을 받아와서 table을 update 한다.
  tbl_table_orders
    .update(
      // 주문 시에 결제가 완료된 표식으로 to_pay 칼럼에 문자열 P 업데이트
      { to_pay: "P" },
      { where: { to_table_id: table_id } }
    )
    .then(() => {
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

module.exports = router;
