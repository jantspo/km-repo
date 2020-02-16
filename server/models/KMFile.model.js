const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const listing = sequelize.define("km_file", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        km_displayed: {type: Sequelize.BOOLEAN, defaultValue: false},
        type: {type: Sequelize.STRING, defaultValue: null},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
    }, {timestamps: true, tableName: "km_files", underscored: true});

    listing.associate = (models) => {
        listing.belongsTo(models.km_listing, {as: "listing", foreignKey: "listing_id"});
        listing.belongsTo(models.document, {as: "document", foreignKey: "document_id"});
    };

    return listing;
};
