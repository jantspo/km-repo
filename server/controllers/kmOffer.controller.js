const Controller = require('./controllerGenerator');
const UserOffer = require('../models/index').user_offer;
const Asset = require('../models/index').asset;
const Associates = require('../models/index').asset_associate;
const OfferResponse = require('../models/index').km_offer_response;
const UserOfferResponse = require('../models/index').user_offer_response;
const KMUserOfferResponse = require('../models/index').km_user_offer_response;
const User = require('../models/index').user;
const KMUser = require('../models/index').km_user;
const AwsController = require('./aws.controller');

module.exports = class KMOfferController extends Controller{
    constructor(model) {
        super(model);
    }

    findAll() {
        return this.model.findAll()
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

    getOfferResponse(id) {
        return OfferResponse.findAll({
            where: {
                thread_id: id
            },
            include: [
                {
                    model: KMUserOfferResponse,
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

    findByUserId(id, query) {
        let whereQuery = {
            km_user_id: id,
            approved: false,
            active: true,
            km_show: true
        };
        whereQuery = {...whereQuery, ...query};
        return this.model.findAll({
            where: whereQuery,
            include: [
                {
                    model: Asset,
                    as: "asset"
                },
                {
                    model: OfferResponse,
                    as: "responses",
                    include: [
                        {
                            model: KMUserOfferResponse,
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

    findCountByUserId(id, query) {
        let whereQuery = {
            km_user_id: id,
            approved: false,
            active: true,
            finalized: false,
        };
    
        whereQuery = {...whereQuery, ...query};
        return this.model.count({
            where: whereQuery,
            limit: query.count || 20,
            offset: query.offset || 0,
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
            .then(async off => {
                try{
                    let offer = await this.model.findOne({
                        where: {
                            id: off.id,
                        },
                        include: [
                            {
                                model: KMUser,
                                as: "km_user",
                                attributes: ['first_name', 'email', 'last_name']
                            }
                        ]
                    });
                    offer = JSON.parse(JSON.stringify(offer));
                    const {users, address} = await this.getAsset(offer.asset_id);
                    await this.createUserOffers(users, offer);
                    await this.sendNotifications(users, address, offer);
                    return offer;
                }catch(err){
                    return err;
                }
            });
    }

    sendNotifications(users, address, offer) {
        const emails = users.map(user => user.email);
        const link = '/offer?id=' + offer.id;
        let message = offer;
        if(offer.offer){
            function offerAmount (value) {
                return new Intl.NumberFormat('en-US', 
                { style: 'currency', currency: 'USD' }
                ).format(value);
            }
            message.offer = `${offerAmount(offer.offer)}`
        }
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

    createUserOffers(users, message) {
        const promises = Promise.all(users.map(user => {
            const data = {
                user_id: user.id,
                offer_id: message.id
            }
            return UserOffer.create(data);
        }));

        return promises.then(res => {
            return message;
        });
    }

    createResponse(data) {
        return OfferResponse.create(data).then(async off => {
            try{
                
                let offer = await OfferResponse.findOne({
                    where: {
                        id: off.id,
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

                offer = JSON.parse(JSON.stringify(offer));
                const {users, address} = await this.getAsset(offer.thread.asset_id);
                await this.createUserOfferResponse(users, offer.id);
                await this.sendNotifications(users, address, offer);
                return offer;
            }catch(err){
                console.log(err);
                return err;
            }
        });
    }

    createUserOfferResponse(users, offerId) {
        const promises = Promise.all(users.map(user => {
            const data = {
                user_id: user.id,
                offer_id: offerId
            }
            return UserOfferResponse.create(data);
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
                return KMUserOfferResponse.findOne({
                    where: {
                        id: resp
                    }
                }).then(found => {
                    return found.update({
                        read: true
                    })
                })
            })
        ]);

        return promises;
    }
};