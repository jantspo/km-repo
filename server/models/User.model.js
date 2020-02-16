const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const user = sequelize.define("user", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        company_name: {type: Sequelize.STRING(125), defaultValue: null},
        first_name: {type: Sequelize.STRING(25), defaultValue: null},
        initial: {type: Sequelize.STRING(11), defaultValue: null},
        last_name: {type: Sequelize.STRING(25), defaultValue: null},
        address: {type: Sequelize.STRING, defaultValue: null},
        city: {type: Sequelize.STRING(25), defaultValue: null},
        state: {type: Sequelize.STRING(25), defaultValue: null},
        zip: {type: Sequelize.STRING(15), defaultValue: null},
        cell: {type: Sequelize.STRING(15), defaultValue: null},
        email: {type: Sequelize.STRING(50), defaultValue: null},
        password: {type: Sequelize.STRING(150), allowNull: false},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        admin_level: {type: Sequelize.ENUM('Admin', 'Manager', 'Viewer')}
    }, {underscored: true});

    user.associate = (models) => {
        user.hasMany(models.km_message_response, {foreignKey: 'km_message_response'});
        user.hasMany(models.km_offer_response, {foreignKey: 'km_offer_response'});
        user.hasMany(models.asset, {foreignKey: 'user_id'});
    };

    return user
};