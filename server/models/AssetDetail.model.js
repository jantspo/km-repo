const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const assetDetail = sequelize.define("asset_detail", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        beds: {type: Sequelize.INTEGER, defaultValue: null},
        baths: {type: Sequelize.FLOAT, defaultValue: null},
        sq_ft: {type: Sequelize.FLOAT, defaultValue: null},
        lot_sq_ft: {type: Sequelize.FLOAT, defaultValue: null},
        built_year: {type: Sequelize.INTEGER, defaultValue: null},
        has_garage: {type: Sequelize.BOOLEAN, defaultValue: null},
        garage_spaces: {type: Sequelize.ENUM('1 Car', '2 Car', '3 Car', 'Other'), defaultValue: null},
        has_basement: {type: Sequelize.BOOLEAN, defaultValue: null},
        has_pool: {type: Sequelize.BOOLEAN, defaultValue: null},
        has_jacuzzi: {type: Sequelize.BOOLEAN, defaultValue: null},
        amenities: {type: Sequelize.TEXT, defaultValue: null},
        has_view: {type: Sequelize.BOOLEAN, defaultValue: null},
        is_waterfront: {type: Sequelize.BOOLEAN, defaultValue: null},
        stories: {type: Sequelize.INTEGER, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, { timestamps: true, tableName: "asset_details" });

    assetDetail.associate = (models) => {

        assetDetail.belongsTo(models.asset, {
            as: 'asset',
            foreignKey: 'asset_id'
        });

        assetDetail.belongsTo(models.property_type, {
            as: 'property_type',
            foreignKey: 'property_type_id'
        });

        assetDetail.belongsTo(models.garage_type, {
            as: 'garage_type',
            foreignKey: 'garage_type_id',
            constraints: false
        });

        assetDetail.belongsTo(models.asset_style, {
            as: 'asset_style',
            foreignKey: 'asset_style_id',
            constraints: false
        });

        assetDetail.belongsTo(models.basement_type, {
            as: 'basement_type',
            foreignKey: 'basement_type_id',
            constraints: false
        });

        assetDetail.belongsTo(models.view_type, {
            as: 'view_type',
            foreignKey: 'view_type_id',
            constraints: false
        });

        assetDetail.belongsTo(models.waterfront_type, {
            as: 'waterfront_type',
            foreignKey: 'waterfront_type_id',
            constraints: false
        });

    };

    return assetDetail;
};