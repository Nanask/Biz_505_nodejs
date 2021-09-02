const express = require("express");
const router = express.Router();

// {}에 있는 것들은 변수명을 임의로 지어서는 안된다.
// sequelize는 models에 있는 함수로 import한 것
const { tbl_table_orders, sequelize } = require("../models/index");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const TABLE_COUNT = 12;
  const tables_layout = [];
  // const tables_layout = new Array(TABLE_COUNT);

  /*
  SELECT to_table_id, count(to_table_id) AS count
  FROM tbl_table_orders
  WHERE to_pay IS NULL
  GROUP BY to_table_id;
  */
  const table_order_count = await tbl_table_orders.findAll({
    //SELECT to_table_id
    attributes: ["to_table_id", [sequelize.fn("count", sequelize.col("to_table_id")), "count"]],
    // 주문이 진행중인 것만 불러오기
    where: { to_pay: null },
    group: "to_table_id",
  });
  for (let index = 0; index < TABLE_COUNT; index++) {
    /**
     * table 1번, table 2번에 주문이 있다면
     * table_order_count의 리스트 중에서 해당하는 데이터가 있을 것이다.
     * 그 데이터를 찾아 달라
     */

    // table_order_count를 반복하다가
    // 그 요소중에 to_table_id == index + 1 과 같은 요소가 있으면 retrun한다.
    const result = table_order_count.find((order) => {
      return order.dataValues.to_table_id == index + 1;
    });

    const table_data = {
      id: index + 1,
      table_name: index + 1 + "번 테이블",
    };
    // table_id가 일치하는 데이터를 찾을 경우
    if (result) {
      table_data.order_count = result.dataValues.count;
      // 일치하는 데이터를 찾지 못한 경우
    } else {
      table_data.order_count = 0;
    }
    console.log(table_data);
    tables_layout.push(table_data);
  }

  //1. table_orders에 현재 주문이 있는지 확인하기 위하여 select

  // 배열을 만들어 index에게 넘겨주기
  res.render("index", { TABLES: tables_layout });
});

module.exports = router;
