const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const message = sequelize.define("user_offer", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        read: {type: Sequelize.BOOLEAN, defaultValue: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "user_offers", underscored: true});

    message.associate = (models) => {
        message.belongsTo(models.km_offer, {as: "offer", foreignKey: "offer_id"});
        message.belongsTo(models.user, {as: "user", foreignKey: "user_id"});
    };

    return message;
};