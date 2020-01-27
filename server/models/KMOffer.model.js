const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const offer = sequelize.define("km_offer", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        message: {type: Sequelize.STRING, defaultValue: null},
        offer:{type: Sequelize.FLOAT, defaultValue: null},
        current_offer:{type: Sequelize.FLOAT, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        approved: {type: Sequelize.BOOLEAN, defaultValue: false},
        km_user_approved: {type: Sequelize.BOOLEAN, defaultValue: false},
        finalized: {type: Sequelize.BOOLEAN, defaultValue: false},
        declined: {type: Sequelize.BOOLEAN, defaultValue: false},
    }, {timestamps: true, tableName: "km_offers", underscored: true});

    offer.associate = (models) => {
        offer.belongsTo(models.asset, {as: "asset", foreignKey: "asset_id"});
        offer.belongsTo(models.km_user, {as: "km_user", foreignKey: "km_user_id"});
        offer.hasMany(models.km_offer_response, {as: 'responses', foreignKey: 'thread_id'});
    };

    return offer;
};
