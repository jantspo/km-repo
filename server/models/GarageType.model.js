const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const garageType = sequelize.define("garage_type", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "garage_types", underscored: true});

    garageType.associate = (models) => {
        garageType.hasMany(models.asset_detail, {foreignKey: "garage_type_id"});
    };

    return garageType;
};
