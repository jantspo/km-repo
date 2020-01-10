const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("km_message_response", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        message: {type: Sequelize.STRING, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_message_responses", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.km_message, {as: "thread", foreignKey: "thread_id"});
        message.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
        message.belongsTo(models.user, {as: "user", foreignKey: "user_id"});
        message.hasOne(models.km_user_message_response, {foreignKey: 'message_id', as:'km_user_viewed'})
    };

    return message;
};
