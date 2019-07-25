module.exports = (sequelize, DataTypes) => {
    const board = sequelize.define('board', {
        boardId: {
            type: DataTypes.STRING(20),     // 20글자 이하
            allowNull: false,               
            unique: true                    // 고유한 값(기본값)
        },
        boardGuid: {
            type: DataTypes.STRING(32),
            allowNull:false,
        },
        col1: {
            type: DataTypes.STRING(100),    // 100글자 이하
            allowNull: false,               // 널 허용 x
        }
    }, {
        charset: 'utf8',
        collate: 'utf-_general_ci',         // 한글 허용
    });

    // 다른 테이블과의 관계 형성
    board.associate = (db) => {

    };

    return board;
}