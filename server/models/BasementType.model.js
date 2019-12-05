const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const basementType = sequelize.define("basement_type", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "basement_types", underscored: true});

    basementType.associate = (models) => {
        basementType.hasMany(models.asset_detail, {foreignKey: "basement_type_id"});
    };

    return basementType;
};
