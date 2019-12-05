const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const assetType = sequelize.define("asset_type", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(25), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "asset_types", underscored: true});

    assetType.associate = (models) => {
        assetType.hasMany(models.asset);
    };

    return assetType;
};
