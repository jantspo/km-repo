const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const user = sequelize.define("km_user", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        company_name: {type: Sequelize.STRING(125), defaultValue: null},
        first_name: {type: Sequelize.STRING(25), defaultValue: null},
        initial: {type: Sequelize.STRING(11), defaultValue: null},
        last_name: {type: Sequelize.STRING(25), defaultValue: null},
        address: {type: Sequelize.STRING, defaultValue: null},
        address_2: {type: Sequelize.STRING, defaultValue: null},
        city: {type: Sequelize.STRING(25), defaultValue: null},
        state: {type: Sequelize.STRING(25), defaultValue: null},
        zip: {type: Sequelize.STRING(15), defaultValue: null},
        cell: {type: Sequelize.STRING(15), defaultValue: null},
        email: {type: Sequelize.STRING(50), defaultValue: null, unique: true},
        password: {type: Sequelize.STRING(150), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        email_validated: {type: Sequelize.BOOLEAN, defaultValue: false}
    }, {underscored: true});

    user.associate = (models) => {
        user.hasMany(models.km_user_favorite, {as: "favorites", foreignKey: "user_id"});
        user.hasMany(models.km_user_saved_search, {as: "searches", foreignKey: "user_id"});
    };

    return user
};