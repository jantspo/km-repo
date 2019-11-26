const User = require('../models/index').km_user;

module.exports = {
    find: (email) => {
        return User.findOne({ where: {email: email, email_validated: true}});
    },
};