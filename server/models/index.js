'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env;
const db        = {};

const readJson = (path, cb) => {
    fs.readFile(require.resolve(path), (err, data) => {
        if (err)
            cb(err);
        else
            cb(null, JSON.parse(data))
    })
};

let sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    port: env.DB_PORT || 3306,
    dialect: env.DB_LANG,
    socketPath: '/var/run/postgresql/.s.PGSQL.5432'
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//
db.sequelize.sync().then((res) => {
    // fs.readdirSync(`${__dirname}/seeds`)
    //     .filter(file => {
    //         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.json');
    //     })
    //     .forEach(file => {
    //         readJson(`${__dirname}/seeds/${file}`, (err, data) => {
    //             if(data.model === "pipeline_status"){
    //                 db.sequelize.models[data.model].count().then(res => {
    //                     if(!res > 0) {
    //                         const items = data.data.map(item => {
    //                             return {name: item.primary, statuses: item.enums, active: true};
    //                         });
    //                         db.sequelize.models[data.model].bulkCreate(items).then(res => console.log(res));
    //                         console.log(items);
    //                     }
    //                 });
    //             }else{
    //                 db.sequelize.models[data.model].count().then(res => {
    //                     if(!res > 0) {
    //                         const items = data.data.map(item => {
    //                             return {name: item, active: true};
    //                         });
    //                         db.sequelize.models[data.model].bulkCreate(items).then(res => console.log(res));
    //                         console.log(items);
    //                     }
    //                 });
    //             }

    //         })
    //     });
});




module.exports = db;