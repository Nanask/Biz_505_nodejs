/**
 * MySQL Table 구조체 파일
 * 이 파일은 models/index.js가 실행되면서
 * 자동으로 scan되고, 설정된 코드에 따라
 * table을 자동으로 만든다.
 */

module.exports = (sequelize, DataTypes) => {
  // sequelisze를 사용하여 tbl_bbs table을 생성하겠다.
  const bbs = sequelize.define("tbl_bbs", {
    // id 칼럼을 정수형으로 선언
    b_id: {
      type: DataTypes.INTEGER,
      // 자동증가 값 칼럼으로 설정하기
      autoIncrement: true,
      // 기본키 칼럼으로 설정하기
      primaryKey: true,
    },
    // b_date 칼럼을 문자열형 10자리로 선언
    b_date: {
      type: DataTypes.STRING(10),
      //null값을 사용하지 말라
      allowNull: false,
    },
    b_time: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    // b_writer 칼럼을 문자열형 기본으로 설정
    b_writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    b_subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // BLOB : Text보다 겁나게 큰 칼럼
    b_text: {
      type: DataTypes.BLOB,
    },
    b_count: {
      type: DataTypes.INTEGER,
    },
  });

  return bbs;
};

// module.exports = bbs;
