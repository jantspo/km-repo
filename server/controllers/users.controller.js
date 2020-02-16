const Controller = require('./controllerGenerator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const AWSAccessKeyId = process.env.AWSAccessKeyId;
const AWSSecretKey = process.env.AWSSecretKey;
const host = process.env.CLIENT_HOST;
const userSearches = require('../models/index').km_user_saved_search;
const userFavorites = require('../models/index').km_user_favorite;
const Assets = require('../models/index').asset;
const userOffers = require('../models/index').km_offer;
const userMessages = require('../models/index').km_message;
var AWS = require('aws-sdk');
const env = process.env;
AWS.config.update({
    region: 'us-west-2',
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
});

module.exports = class UsersController extends Controller{
    constructor(model) {
        super(model);
    }

    findAll() {
        return this.model.findAll({
            exclude: ['password']
        })
    }

    findById(id) {
        return this.model.findOne({
            where: {id: id},
            attributes: {exclude: ['password']}
        })
    }

    create(data) {
        return this.model.findOne({
            where: {
                email: data.email
            }
        }).then(res => {
            if(res){
                return false;
            }
            data.password = this.hashPassword(data.password);
            return this.model.create(data).then(user => {
                this.sendEmailVerification(user);
                return true;
            });
        })
        
    }

    sendEmailVerification(user) {
        const simpleUser =  JSON.parse(JSON.stringify(user));
        delete simpleUser.password;
        const email =  simpleUser.email;
        let token = jwt.sign(simpleUser, secret, {expiresIn: '24h'});
        const params = {
            Destination: { /* required */
                ToAddresses: [
                    email
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: `<html>
                                <body>
                                    <div style="width: 100%; background-color: #2889BE">
                                        <img src="${env.SERVER_URL}/images/logo.jpg" /> 
                                    </div> 
                                    <h1>Hello  ${simpleUser.first_name},</h1>
                                    
                                    <p>Click here to validate your account: <a href='http://${host}/email-validate?token=${token}'>Validate account</a></p> <p>${new Date().toString()}</p>
                                </body>
                            </html>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data:  `Hello ${simpleUser.first_name}, Click here to validate your account.`
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Kastlemark account verification'
                }
            },
            Source: 'support@kastlemark-co.com',
        };

        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
        sendPromise.then(
            function(data) {
                console.log(data.MessageId);
            }).catch(
            function(err) {
                console.error(err, err.stack);
            });
    }

    update(id, data) {
        return this.model.findOne({where: {id: id}})
            .then(user => {
                if(data.password){
                    data.password = this.hashPassword(data.password);
                }
                console.log(data);
                return user.update(data).then(res => res);
            })
    }

    resetPassword(email) {
        return this.model.findOne({
            where: {email: email},
            exclude: ['password']
        })
            .then(user => {
                if (user) {
                    const data = {
                        password: this.hashPassword(this.generatePassword())
                    };
                    return user.update(data).then(res => {

                        const simpleUser =  JSON.parse(JSON.stringify(user));
                        delete simpleUser.password;
                        const email =  simpleUser.email;
                        let token = jwt.sign(simpleUser, secret, {expiresIn: '24h'});
                        const params = {
                            Destination: { /* required */
                                ToAddresses: [
                                    email
                                ]
                            },
                            Message: { /* required */
                                Body: { /* required */
                                    Html: {
                                        Charset: "UTF-8",
                                        Data: `<html>
                                        <body>
                                            <div style="width: 100%; background-color: #2889BE">
                                                <img src="${env.SERVER_URL}/src/public/images/logo.jpg" /> 
                                            </div> 
                                            <h1>Hello  ${simpleUser.first_name},</h1>
                                            
                                            <p>Click here to change your password: <a href='http://${host}/reset-password?token=${token}'>Change Password</a></p> <p>${new Date().toString()}</p>                                        </body>
                                        </html>`
                                    },
                                    Text: {
                                        Charset: "UTF-8",
                                        Data: `Hello ${simpleUser.first_name}, Click here to change your password: Change Password`
                                    }
                                },
                                Subject: {
                                    Charset: 'UTF-8',
                                    Data: 'Kastlemark Password Reset Request'
                                }
                            },
                            Source: 'support@kastlemark-co.com',
                        };

                        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
                        sendPromise.then(
                            function(data) {
                                console.log(data.MessageId);
                            }).catch(
                            function(err) {
                                console.error(err, err.stack);
                            });
                        return simpleUser;
                    });
                } else {
                    return new Error('No user found');
                }
            })
    }

    hashPassword (password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    generatePassword() {
        return Math.random().toString(36).slice(-8);
    }

    getUserSearches(id) {
        return userSearches.findAll({
            where: {user_id: id}
        });
    }

    saveUserSearch(data) {
        return userSearches.create(data);
    }

    deleteUserSearch(id) {
        return userSearches.destroy({where: {id: id}});
    }

    getUserFavorites(id) {
        return userFavorites.findAll({
            where: {user_id: id},
            include: [
                {
                    model: Assets
                }
            ]
        });
    }

    saveUserFavorite(data) {
        return userFavorites.create(data);
    }

    deleteUserFavorite(id) {
        return userFavorites.destroy({where: {id: id}});
    }

    async updateUserNotification(id, data) {
        console.log(data);
        const offers = await this.getUserOffers(id, data.email_alerts);
        const messages = await this.getUserMessages(id, data.email_alerts);
        const updatedOffers = Promise.all(offers.map(offer => this.changeOfferNotifications(offer, data.email_alerts)));
        const updatedMessages = Promise.all(messages.map(message => this.changeMessageNotifications(message, data.email_alerts)));
        return this.model.findOne({
            where: {
                id: id
            }
        }).then(user => {
            return user.update(data);
        })
    }

    getUserOffers (id, alerts) {
        return userOffers.findAll({
            where: {
                km_user_id: id,
                email_alerts: !alerts
            }
        })
    }

    getUserMessages (id, alerts) {
        return userMessages.findAll({
            where: {
                km_user_id: id,
                email_alerts: !alerts
            }
        })
    }

    changeOfferNotifications (model, val) {
        // return models.forEach(model => {
            return model.update({email_alerts: val})
        // })
    }

    changeMessageNotifications (model, val) {
        // return models.forEach(model => {
            return model.update({email_alerts: val})
        // })
    }
};