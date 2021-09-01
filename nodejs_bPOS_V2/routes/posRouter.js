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
		res.json(result);
    //   tbl_table_orders.findAll({ 
	// 	  where: { to_table_id: table_id } ,
	// 	  include : [{model: tbl_product, require:false}]
	// 	}).then((order_list) => {
    //     res.json({ table_id, order_list });
    //   });
    });
  });
});

// table Layout에서 주문서화면으로 진입할 때 현재 table에 
// 주문리스트가 있으면 화면에 출력하기 위해
// Request 처리

router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;

  //[Op.eq] , pay값이 null값인 것만 보여라, 이렇게 하면 결제가 완료된 것들은 보이지 않게 된다.
/*
주문이 진행중인 상태에서는 orders들의 to_pay 칼럼이 null이고 결제가 완료된 상태는 to_pay에
문자열 P가 담기게 되므로 table layout에서 table을 선택하고 주문으로 돌아오면
해당 table id의 데이터들 중에서 to_pay가 null 값만 select하여 보여주기
*/
  tbl_table_orders
  .findAll({ 
	  where: { to_table_id: table_id, to_pay: null}, 
	  // 원하는 조인이 안될 수 있기 때문에 아웃조인을 하기 위한 조치??
	  include : [{model:tbl_product, require:false}] 
	})
	.then((result) => res.json(result));
});


router.get("/order/:order_seq/delete", (req,res)=> {

	const order_seq = req.params.order_seq
	tbl_table_orders.destroy({
		where : {to_seq : order_seq}
	})
	.then(()=> {
		res.send("OK")
	})
	// 실패했을 때 나타내는 코드
	.catch(()=> {
		res.send("FAIL");
	})

})

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
