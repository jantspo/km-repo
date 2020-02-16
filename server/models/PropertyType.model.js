const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const propertyType = sequelize.define("property_type", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "property_types", underscored: true});

    propertyType.associate = (models) => {
        propertyType.hasMany(models.asset_detail, {foreignKey: "property_type_id"});
    };

    return propertyType;
};
