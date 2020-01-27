const Controller = require('./controllerGenerator');
const MessageResponse = require('../models/index').km_message_response;
const UserMessageResponse = require('../models/index').user_message_response;
const KMUserMessageResponse = require('../models/index').km_user_message_response;
const UserMessage = require('../models/index').user_message;
const Asset = require('../models/index').asset;
const Associates = require('../models/index').asset_associate;
const User = require('../models/index').user;
const KMUser = require('../models/index').km_user;
const AwsController = require('./aws.controller');

module.exports = class KMMessageController extends Controller{
    constructor(model) {
        super(model);
    }

    findAll() {
        return this.model.findAll()
    }

    getMessageResponse(id) {
        return MessageResponse.findAll({
            where: {
                thread_id: id
            },
            include: [
                {
                    model: KMUserMessageResponse,
                    as: "km_user_viewed"
                },
                {
                    model: User,
                    as: "user"
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        })
    }

    findById(id) {
        return this.model.findOne({
            where: {id: id},
            include: [
                {
                    model: Asset,
                    as: "asset"
                }
            ],
        })
    }

    findByUserId(id) {
        return this.model.findAll({
            where: {km_user_id: id},
            include: [
                {
                    model: Asset,
                    as: "asset"
                },
                {
                    model: MessageResponse,
                    as: "responses",
                    include: [
                        {
                            model: KMUserMessageResponse,
                            as: "km_user_viewed"
                        },
                        {
                            model: User,
                            as: "user"
                        }
                    ],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }


    findByAssetId(id) {
        return this.model.findOne({
            where: {asset_id: id}
        })
    }

    create(data) {
        return this.model.create(data, {
            include: [
                {
                    model: KMUser,
                    as: "km_user"
                }
            ]
        })
            .then(async mess => {
                try{
                    let message = await this.model.findOne({
                        where: {
                            id: mess.id,
                        },
                        include: [
                            {
                                model: KMUser,
                                as: "km_user",
                                attributes: ['first_name', 'email', 'last_name']
                            }
                        ]
                    });
                    message = JSON.parse(JSON.stringify(message));
                    const {users, address} = await this.getAsset(mess.asset_id);
                    await this.createUserMessages(users, message);
                    await this.sendNotifications(users, address, message);
                    return message;
                }catch(err){
                    return err;
                }
            });
    }

    sendNotifications(users, address, message) {
        const emails = users.map(user => user.email);
        const link = '/message?id=' + message.id;
        return AwsController.sendNotification(emails, address, message, link);
    }

    getAsset(id) {
        return Asset.findOne({
            where: {id: id},
            include: [
                {
                    model: Associates,
                    include: [
                        {
                            model: User,
                            as: 'user'
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['email', 'first_name', 'last_name', 'id'],
                    as: "manager"
                }
            ]
        }).then(res => {
            const onlyUnique = (value, index, self) => { 
                return self.indexOf(value) === index;
            }
            const asset = JSON.parse(JSON.stringify(res));
            let users = [];
            if(asset.manager) users.push(asset.manager);
            asset.asset_associates.forEach(assoc => {
                users.push(assoc.user);
            });
            users = users.filter(onlyUnique);
            return {users: users, address: `${asset.address}, ${asset.city}, ${asset.state} ${asset.zip}`};
        })
    }

    createUserMessages(users, message) {
        const promises = Promise.all(users.map(user => {
            const data = {
                user_id: user.id,
                message_id: message.id
            }
            return UserMessage.create(data);
        }));

        return promises.then(res => {
            return message;
        });
    }

    createResponse(data) {
        return MessageResponse.create(data).then(async mess => {
            try{
                
                let message = await MessageResponse.findOne({
                    where: {
                        id: mess.id,
                    },
                    include: [
                        {
                            model: KMUser,
                            as: "km_user",
                            attributes: ['first_name', 'email', 'last_name']
                        },
                        {
                            model: this.model,
                            as: "thread"
                        }
                    ]
                });

                message = JSON.parse(JSON.stringify(message));
                const {users, address} = await this.getAsset(message.thread.asset_id);
                await this.createUserMessageResponse(users, message.id);
                await this.sendNotifications(users, address, message);
                return message;
            }catch(err){
                console.log(err);
                return err;
            }
        });
    }

    createUserMessageResponse(users, messageId) {
        const promises = Promise.all(users.map(user => {
            const data = {
                user_id: user.id,
                message_id: messageId
            }
            return UserMessageResponse.create(data);
        }));

        return promises;
    }

    update(id, data) {
        return this.model.findOne({where: {id: id}})
            .then(mess => {
                return mess.update(data).then(res => res);
            })
    }

    setUserResponsesRead(resps) {
        const promises = Promise.all([
            resps.map(resp => {
                return KMUserMessageResponse.findOne({
                    where: {
                        id: resp
                    }
                }).then(found => {
                    console.log(found);
                    return found.update({
                        read: true
                    })
                })
            })
        ]);

        return promises;
    }
};