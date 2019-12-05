const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const sell = sequelize.define("sales_info", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        appraisal_value: {type: Sequelize.STRING, defaultValue: null},
        appraisal_link: {type: Sequelize.STRING, defaultValue: null},
        inspection_report: {type: Sequelize.STRING, defaultValue: null},
        rehab_estimate: {type: Sequelize.STRING, defaultValue: null},
        roi_estimate: {type: Sequelize.STRING, defaultValue: null},
        arv_report: {type: Sequelize.STRING, defaultValue: null},
        km_sell_price: {type: Sequelize.INTEGER, defaultValue: null},
        km_rehab_estimate: {type: Sequelize.STRING, defaultValue: null},
        km_holding_amount: {type: Sequelize.STRING, defaultValue: null},
        km_selling_amount: {type: Sequelize.STRING, defaultValue: null},
        km_arv: {type: Sequelize.INTEGER, defaultValue: null},
        km_estimated_profit: {type: Sequelize.STRING, defaultValue: null},
        km_roi: {type: Sequelize.STRING, defaultValue: null},
        km_total_cost: {type: Sequelize.STRING, defaultValue: null},
        km_estimated_rent: {type: Sequelize.STRING, defaultValue: null},
        km_coc_roi: {type: Sequelize.STRING, defaultValue: null},
        km_equity: {type: Sequelize.STRING, defaultValue: null},
    }, {timestamps: true, tableName: "sales_infos", underscored: true});

    sell.associate = (models) => {
        sell.belongsTo(models.asset, {as: "asset", foreignKey: "asset_id"});
    };

    return sell;
};
