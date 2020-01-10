const Controller = require('./controllerGenerator');
const MessageResponse = require('../models/index').km_message_response;
const UserMessageResponse = require('../models/index').user_message_response;
const KMUserMessageResponse = require('../models/index').km_user_message_response;
const UserMessage = require('../models/index').user_message;
const Asset = require('../models/index').asset;
const Associates = require('../models/index').asset_associate;
const User = require('../models/index').user;
module.exports = class KMMessageController extends Controller{
    constructor(model) {
        super(model);
    }

    findAll() {
        return this.model.findAll()
    }

    findById(id) {
        return this.model.findOne({
            where: {id: id}
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
        return this.model.create(data)
            .then(mess => {
                return mess;
            }).then(mess => {
                const message = JSON.parse(JSON.stringify(mess));
                return Asset.findOne({
                    where: {id: message.asset_id},
                    include: [
                        {
                            model: Associates
                        }
                    ]
                }).then(res => {
                    const onlyUnique = (value, index, self) => { 
                        return self.indexOf(value) === index;
                    }
                    const asset = JSON.parse(JSON.stringify(res));
                    let users = [];
                    console.log(asset.user_id);
                    if(asset.user_id) users.push(asset.user_id);
                    asset.asset_associates.forEach(assoc => {
                        users.push(assoc.user_id);
                    });
                    users = users.filter(onlyUnique);
                    const promises = Promise.all(users.map(user => {
                        const data = {
                            user_id: user,
                            message_id: message.id
                        }
                        return UserMessage.create(data);
                    })).catch(err => {
                        console.log(err);
                    });

                    return promises.then(res => {
                        console.log(res);
                        return message;
                    }).catch(err => {
                        console.log(err);
                    });
                })
            });
    }

    createResponse(data) {
        return MessageResponse.create(data).then(mess => {
            return mess;
        }).then(mess => {
            return this.model.findOne({
                where: {
                    id: mess.thread_id
                }
            }).then(res => {
                return {
                    mess: mess,
                    thread: res
                }
            });
        }).then(res =>{
            return Asset.findOne({
                where: {id: res.thread.asset_id},
                include: [
                    {
                        model: Associates
                    }
                ]
            }).then(resp => {
                const onlyUnique = (value, index, self) => { 
                    return self.indexOf(value) === index;
                }
                const asset = JSON.parse(JSON.stringify(resp));
                let users = [];
                if(asset.user_id) users.push(asset.user_id);
                asset.asset_associates.forEach(assoc => {
                    users.push(assoc.user_id);
                });
                users = users.filter(onlyUnique);
                const promises = Promise.all(users.map(user => {
                    const data = {
                        user_id: user,
                        message_id: res.mess.id
                    }
                    return UserMessageResponse.create(data);
                }));

                return promises.then(response => {
                    return MessageResponse.findOne({
                        where: {id: res.mess.id}
                    });
                }).catch(err => {
                    console.log(err);
                });
            })
        })
    }

    update(id, data) {
        return this.model.findOne({where: {id: id}})
            .then(mess => {
                return mess.update(data).then(res => res);
            })
    }
};