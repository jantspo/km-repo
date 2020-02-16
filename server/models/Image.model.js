const Sequelize = require('sequelize');

module.exports = function (sequelize, DateTypes) {

    const image = sequelize.define("image", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        key: {type: Sequelize.STRING},
        status: {type: Sequelize.ENUM('active', 'inactive', 'delete')},
        path: {type: Sequelize.STRING, required: true},
        thumbnail_path: {type: Sequelize.STRING, required: true},
        name: {type: Sequelize.STRING, require: true},
        size: {type: Sequelize.INTEGER},
        active: {type: Sequelize.BOOLEAN, defaultValue: true}
    }, {timestamps: true, underscored: true});

    image.associate = (models) => {
        image.belongsTo(models.image_folder, {
            as: "image_folder",
            foreignKey: "image_folder_id"
        });
    };

    return image;
};