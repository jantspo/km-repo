const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const listing = sequelize.define("km_listing", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        property_value: {type: Sequelize.FLOAT, defaultValue: null},
        expense_per: {type: Sequelize.FLOAT, deafultValue: null},
        cap_rate: {type: Sequelize.FLOAT, defaultValue: null},
        list_price: {type: Sequelize.FLOAT, defaultValue: null},
        rehab_estimate: {type: Sequelize.FLOAT, defaultValue: null},
        holding_exp: {type: Sequelize.FLOAT, defaultValue: null},
        selling_exp: {type: Sequelize.FLOAT, defaultValue: null},
        arv: {type: Sequelize.FLOAT, defaultValue: null},
        estimated_profit: {type: Sequelize.FLOAT, defaultValue: null},
        roi: {type: Sequelize.FLOAT, defaultValue: null},
        total_cost: {type: Sequelize.FLOAT, defaultValue: null},
        rent_total_cost: {type: Sequelize.FLOAT, defaultValue: null},
        estimated_rent: {type: Sequelize.FLOAT, defaultValue: null},
        appraisal_link: {type: Sequelize.FLOAT, defaultValue: null},
        inspection_report: {type: Sequelize.FLOAT, defaultValue: null},
        arv_report: {type: Sequelize.FLOAT, defaultValue: null},
        equity: {type: Sequelize.FLOAT, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        cash_on_cash: {type: Sequelize.FLOAT, defaultValue: null},
        down_payment: {type: Sequelize.FLOAT, defaultValue: null},
    }, {timestamps: true, tableName: "km_listings", underscored: true});

    listing.associate = (models) => {
        listing.belongsTo(models.asset, {as: "asset", foreignKey: "asset_id"});
    };

    return listing;
};
