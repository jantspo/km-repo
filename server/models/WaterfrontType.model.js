const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const waterfrontType = sequelize.define("waterfront_type", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, tableName: "waterfront_types", underscored: true});

    waterfrontType.associate = (models) => {
        waterfrontType.hasMany(models.asset_detail, {foreignKey: "waterfront_type_id"});
    };

    return waterfrontType;
};
