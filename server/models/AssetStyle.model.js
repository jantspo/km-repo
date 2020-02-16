const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const assetStyle = sequelize.define("asset_style", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "asset_styles", underscored: true});

    assetStyle.associate = (models) => {
        assetStyle.hasMany(models.asset_detail, {foreignKey: "asset_style_id"});
    };

    return assetStyle;
};
