const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("km_user_message_response", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        read: {type: Sequelize.BOOLEAN, defaultValue: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_user_message_responses", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.km_message_response, {as: "message", foreignKey: "message_id"});
        message.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
    };

    return message;
};
