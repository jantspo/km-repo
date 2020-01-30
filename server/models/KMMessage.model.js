const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("km_message", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        message: {type: Sequelize.STRING, defaultValue: null},
        email_alerts: {type: Sequelize.BOOLEAN, defaultValue: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_messages", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.asset, {as: "asset", foreignKey: "asset_id"});
        message.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
        message.hasMany(models.km_message_response, {as: "responses", foreignKey: 'thread_id'})
    };

    return message;
};
