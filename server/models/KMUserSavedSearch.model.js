const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const searches = sequelize.define("km_user_saved_search", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        propertyTypes: {type: Sequelize.STRING, defaultValue: null},
        minPrice: {type: Sequelize.STRING, defaultValue: null},
        maxPrice: {type: Sequelize.STRING, defaultValue: null},
        minARV: {type: Sequelize.STRING, defaultValue: null},
        maxARV: {type: Sequelize.STRING, defaultValue: null},
        minInvest: {type: Sequelize.STRING, defaultValue: null},
        maxInvest: {type: Sequelize.STRING, defaultValue: null},
        state: {type: Sequelize.STRING, defaultValue: null},
        cities: {type: Sequelize.STRING, defaultValue: null},
        beds: {type: Sequelize.STRING, defaultValue: null},
        baths: {type: Sequelize.STRING, defaultValue: null},
        sq_ft: {type: Sequelize.STRING, defaultValue: null},
        name: {type: Sequelize.STRING, defaultValue: null}
    }, {underscored: true});

    searches.associate = (models) => {
        searches.belongsTo(models.km_user, {as: "user", foreignKey: "user_id"});
    };

    return searches
};