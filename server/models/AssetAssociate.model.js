const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const asset = sequelize.define("asset_associate", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, { timestamps: true });

    asset.associate = (models) => {
        asset.belongsTo(models.asset, {
            as: "asset",
            foreignKey: "asset_id"
        });
        asset.belongsTo(models.user, {
            as: "user",
            foreignKey: "user_id"
        });
    };

    return asset;
};