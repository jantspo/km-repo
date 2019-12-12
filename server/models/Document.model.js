const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const document = sequelize.define("document", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        key: {type: Sequelize.STRING},
        status: {type: Sequelize.ENUM('active', 'inactive', 'delete')},
        path: {type: Sequelize.STRING, required: true},
        name: {type: Sequelize.STRING, require: true},
        size: {type: Sequelize.INTEGER},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, underscored: true});

    document.associate = (models) => {


            // document.hasMany(models.purchase_info_document, {foreignKey: 'document_id', as: 'purchase_info_documents', onDelete: 'CASCADE'});
            // document.hasOne(models.asset_title, {foreignKey: 'quit_claim_id', onDelete: 'CASCADE'});
            // document.hasOne(models.asset_title, {foreignKey: 'tax_deed_id', onDelete: 'CASCADE'});
            // document.hasOne(models.asset_title, {foreignKey: 'warranty_deed_id', onDelete: 'CASCADE'});
            // document.hasOne(models.asset_title, {foreignKey: 'title_certification_id', onDelete: 'CASCADE'});
            // document.hasOne(models.asset_title, {foreignKey: 'quiet_title_id', onDelete: 'CASCADE'});
        document.hasOne(models.km_file, {foreignKey: "document_id"});
    };

    return document;
};