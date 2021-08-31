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
  return product;
};
