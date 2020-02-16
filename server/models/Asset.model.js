const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {
    const asset = sequelize.define("asset", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        address: {type: Sequelize.STRING(100), allowNull: false},
        address2: {type: Sequelize.TEXT('tiny'), allowNull: true},
        city: { type: Sequelize.STRING(50), allowNull: false},
        state: {type: Sequelize.STRING(2), allowNull: false},
        zip: { type: Sequelize.STRING(15), allowNull: false},
        status: { type: Sequelize.STRING(50), allowNull: true},
        county: { type: Sequelize.STRING(50), allowNull: true},
        latitude: {type: Sequelize.FLOAT(11, 7)},
        longitude: {type: Sequelize.FLOAT(11,7)},
        aquired_date: {type: Sequelize.DATE, defaultValue: null},
        CaseID: {type: Sequelize.INTEGER},
        image_path: {type: Sequelize.STRING},
        active: {type: Sequelize.BOOLEAN, defaultValue: true},
        km_listed: {type: Sequelize.BOOLEAN, defaultValue: false}
    }, { timestamps: true });

    asset.associate = (models) => {
        asset.belongsTo(models.asset_type, {
            as: "asset_type",
            foreignKey: "asset_type_id"
        });
        asset.belongsTo(models.user, {
            as: "manager",
            foreignKey: "user_id"
        });
        // asset.belongsTo(models.bundle, {
        //     as: "bundle",
        //     foreignKey: "bundle_id"
        // });
        // asset.belongsTo(models.pipeline_status, {
        //     as: 'pipeline_status',
        //     foreignKey: 'pipeline_status_id'
        // });

        // asset.belongsTo(models.sales_type, {
        //     as: 'sales_type',
        //     foreignKey: 'sales_type_id'
        // });

        // asset.hasMany(models.asset_income_and_expense, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.asset_lender, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.buyer, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.document_folder, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.image_folder, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.owner,{
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.property_contact, {
        //     foreignKey: 'property_id'
        // });
        // asset.hasMany(models.seller, {
        //     foreignKey: 'asset_id'
        // });
        // asset.hasMany(models.negotiation, {
        //     foreignKey: 'asset_id'
        // });

        // asset.hasMany(models.repair, {
        //     foreignKey: 'asset_id'
        // });

        asset.hasMany(models.asset_associate, {
            foreignKey: 'asset_id'
        });

        // asset.hasMany(models.rehab, {
        //     foreignKey: 'asset_id'
        // });

        // asset.hasMany(models.asset_occupancy, {
        //     foreignKey: 'asset_id'
        // });

        // asset.hasOne(models.purchase_info, {foreignKey: "asset_id", as: "purchase_info"});

        asset.hasOne(models.km_listing, {
            foreignKey: "asset_id",
            as: "km_listing"
        })

        // asset.hasOne(models.asset_appliance, {foreignKey: 'asset_id'});
        // asset.hasOne(models.asset_title, {foreignKey: 'asset_id', as: 'title'});
        // asset.hasOne(models.asset_material, {foreignKey: 'asset_id'});
        asset.hasOne(models.asset_detail, {foreignKey: 'asset_id'});
        // asset.hasOne(models.asset_utility, {foreignKey: 'asset_id'});
        // asset.hasOne(models.property_checklist, {foreignKey: 'asset_id'});
        asset.hasMany(models.km_user_favorite, {foreignKey: 'asset_id', as: 'favorite'});
        asset.hasMany(models.km_offer, {foreignKey: 'asset_id', as: 'offers'});
        asset.hasMany(models.km_message, {foreignKey: 'asset_id', as: 'messages'});
        // asset.hasOne(models.rental_information, {foreignKey: 'asset_id', as:"rental_info"});
        // asset.hasMany(models.task, {foreignKey: 'asset_id', as: 'tasks'});
        // asset.hasMany(models.mortgage, {foreignKey: 'asset_id', as: 'mortgage'});
        // asset.hasMany(models.purchase_info_document, {foreignKey: 'asset_id', as: 'purchase_info_documents'});
        // asset.hasMany(models.mls_listing, {foreignKey: 'asset_id', as: 'mls_listings'});
    };

    return asset;
};