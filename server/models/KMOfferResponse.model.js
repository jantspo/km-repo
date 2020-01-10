const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const offer = sequelize.define("km_offer_response", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        message: {type: Sequelize.STRING, defaultValue: null},
        offer:{type: Sequelize.FLOAT, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        approved: {type: Sequelize.BOOLEAN, defaultValue: true},
        declined: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_offer_responses", underscored: true});

    offer.associate = (models) => {
        offer.belongsTo(models.asset, {as: "thread", foreignKey: "thread_id"});
        offer.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
        offer.belongsTo(models.user, {as: "user", foreignKey: "user_id"});
        offer.hasOne(models.km_user_offer_response, {as: "km_user_viewed", foreignKey: "offer_id"});
    };

    return offer;
};
