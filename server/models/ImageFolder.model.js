const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const imageFolder = sequelize.define("image_folder", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING, required: true},
        public: {type: Sequelize.BOOLEAN, defaultValue: false, required: true},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, { timestamps: true, tableName: "image_folders",underscored: true });

    imageFolder.associate = (models) => {
        imageFolder.hasMany(models.image);
        imageFolder.belongsTo(models.asset, {
            as: "asset",
            foreignKey: "asset_id"
        });

        imageFolder.hasMany(models.image_folder, {
            as: 'sub_folders',
            foreignKey: "parent_folder_id"
        });
        
        imageFolder.belongsTo(models.image_folder, {
            as: 'parent_folder',
            foreignKey: "parent_folder_id"
        })
    };

    return imageFolder;
};