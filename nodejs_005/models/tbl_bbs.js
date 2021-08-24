module.exports = (sequelize, DataTypes) => {
    return sequelize.define("tbl_bbs", {
        b_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        b_date: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        b_time: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        b_writer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        b_subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        b_text: { type: DataTypes.BLOB },
        b_count: { type: DataTypes.INTEGER }

    });
}

// 스프링에서 다오나 서비스를 리턴하던 기능과 같음
// 길이를 지정하지 않으면 최대 255개로 설정이된다.
// allowNull: false null값을 허용하지 않는다.
