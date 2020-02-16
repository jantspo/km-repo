const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("km_user_offer_response", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        read: {type: Sequelize.BOOLEAN, defaultValue: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_user_offer_responses", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.km_offer_response, {as: "offer", foreignKey: "offer_id"});
        message.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
    };

    return message;
};