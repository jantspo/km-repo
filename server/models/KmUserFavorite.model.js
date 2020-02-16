const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const userFav = sequelize.define("km_user_favorite", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        favorited:{type: Sequelize.BOOLEAN, defaultValue: true}
    }, {underscored: true});

    userFav.associate = (models) => {
        userFav.belongsTo(models.asset, {as: "asset", foreignKey: "asset_id"});
        userFav.belongsTo(models.km_user, {as: "user", foreignKey: "user_id"});
    };

    return userFav
};