const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const assetTax = sequelize.define("asset_tax", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        property_taxes: {type: Sequelize.FLOAT(6,2), defaultValue: null},
        assessment_year: {type: Sequelize.INTEGER(), defaultValue: null},
        apn: {type: Sequelize.STRING, defaultValue: null},
        legal_description: {type: Sequelize.STRING, defaultValue: null},
        assessed_value_total: {type: Sequelize.FLOAT(7,2), defaultValue: null},
        assessed_value_land: {type: Sequelize.FLOAT(7,2), defaultValue: null},
        assessed_value_building: {type: Sequelize.FLOAT(7,2), defaultValue: null},
        hoa: {type: Sequelize.BOOLEAN, defaultValue: null},
        hoa_fees: {type: Sequelize.FLOAT(7,2), defaultValue: null},
        hoa_name: {type: Sequelize.STRING, defaultValue: null},
        hoa_phone: {type: Sequelize.STRING, defaultValue: null},
        hoa_address: {type: Sequelize.STRING, defaultValue: null},
        hoa_city: {type: Sequelize.STRING, defaultValue: null},
        hoa_state: {type: Sequelize.STRING, defaultValue: null},
        hoa_zip: {type: Sequelize.STRING, defaultValue: null},
        first_due_date: {type: Sequelize.STRING, defaultValue: null},
        second_due_date: {type: Sequelize.STRING, defaultValue: null},
        total_annual_tax_payment: {type: Sequelize.ENUM('1', '2')}
    }, { timestamps: true, underscored: true, tableName: "asset_taxes" });

    assetTax.associate = (models) => {
        assetTax.belongsTo(models.asset, {
            as: 'asset',
            foreignKey: 'asset_id'
        });
    };

    return assetTax;
};