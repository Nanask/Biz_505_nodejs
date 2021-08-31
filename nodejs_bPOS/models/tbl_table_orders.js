module.exports = (seq, DataType) => {
  const table_orders = seq.define("tbl_table_orders", {
    to_seq: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, // 일련번호(PK)
    to_table_id: {
      type: DataType.STRING(5),
      allowNull: false,
    }, // 주문이 진행중인 table id
    to_pcode: {
      type: DataType.STRING(5),
      allowNull: false,
    }, // 주문된 상품 코드
    to_qty: {
      type: DataType.INTEGER,
    }, // 수량
    to_price: {
      type: DataType.INTEGER,
    }, // 단가
    to_date: {
      type: DataType.STRING(10),
    }, // 주문한 시점의 날짜
    to_time: {
      type: DataType.STRING(10),
    }, // 주문한 시점의 시간
    to_pay: {
      type: DataType.STRING(1),
    }, // 결제 여부
    to_pay_qty: {
      type: DataType.STRING(10),
    }, // 결제 종류(현금, 카드)
  });
  return table_orders;
};
