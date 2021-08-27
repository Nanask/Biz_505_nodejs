module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "tbl_products",
    {
      p_code: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      p_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      p_pirce: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_rem: {
        type: DataTypes.BLOB,
      },
    },
    { timestamps: false }
  );
  return product;
};
