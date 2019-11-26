const sequelize = require('./models/index').sequelize;
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

var myStore = new SequelizeStore({
    db: sequelize
});

module.exports = myStore;