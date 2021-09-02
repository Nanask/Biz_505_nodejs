module.exports = (sequelize, DataTypes) => {
  //sequelize 속에 있는 define을 이용하는 것

  // tbl_product가 table의 이름(변수, 객체)
  // tbl_product.findAll().... 처럼 사용한다.
  // tbl_products.findAll() 처럼 사용금지!!
  // 실제테이블과 사용하는 이름을 잘 구분하자.
  const product = sequelize.define(
    "tbl_product",
    {
      p_code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      p_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_rem: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

  // tbl_table_order와 tbl_product를 JOIN 할 수 있도록 설정
  // 상품1 : 주문서 : N
  // tbl_table_orders의 to_pcode 칼럼과 현재 tbl_product와 연계하겠다.
  //associate 를 하지않으면 조인이 되지 않는다?
  product.associate = (models) => {
	product.hasMany(models.tbl_table_orders, { foreignKey: "to_pcode" });
 };
  return product;
};
