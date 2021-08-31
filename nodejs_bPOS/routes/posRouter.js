const express = require("express")
const router = express.Router();

// localhost:3000/pos/order/3 이라고 URL이 전송되어 오면
// 숫자 3이 변수 table_id에 담겨온다,
// 이 table_id는 req.params.table_id를 getter하여 값을 확인할 수 있다.
router.get("/order/:table_id", (req,res) => {

	const table_id = req.params.table_id
	console.log("table id", table_id);
	// 보내지는지 확인!
	// res.send(table_id);

	// table_id라는 새로 만든 변수에 table id를 넣어서 보내라
	// res.render("order_view", {table_id : table_id})

	// table_id가 같은 값이기 때문에 이렇게 적어도 문제가 없다.
	res.render("order_view", {table_id})

	});

	//:table_id를 넣어주면 URL에서 뽑아 쓸수 있다.
	router.get("/order/:table_id/input/:menu_id",(req,res)=> {
		const table_id = req.params.table_id;
		const menu_id = req.params.menu_id

		const menu = {
			table_id,
			menu_id,
			menu_name: "1000원 김밥",
			menu_price: 1000,
		}
		// json으로 메뉴전송
		res.json(menu)

		// res.send("선택된 메뉴" + menu_id);
	})

module.exports = router;