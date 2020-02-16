const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("user_message_response", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        read: {type: Sequelize.BOOLEAN, defaultValue: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "user_message_responses", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.km_message_response, {as: "message", foreignKey: "message_id"});
        message.belongsTo(models.user, {as: "user", foreignKey: "user_id"});
    };

    return message;
};