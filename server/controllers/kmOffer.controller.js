const Controller = require('./controllerGenerator');
const UserOffer = require('../models/index').user_offer;
const Asset = require('../models/index').asset;
const Associates = require('../models/index').asset_associate;
const OfferResponse = require('../models/index').km_offer_response;
const UserOfferResponse = require('../models/index').user_offer_response;
const KMUserOfferResponse = require('../models/index').km_user_offer_response;
const User = require('../models/index').user;

module.exports = class KMOfferController extends Controller{
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

    findByAssetId(id) {
        return this.model.findOne({
            where: {asset_id: id}
        })
    }

    create(data) {
        return this.model.create(data)
           .then(off => {
                const offer = JSON.parse(JSON.stringify(off));
                return Asset.findOne({
                    where: {id: offer.asset_id},
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
                    if(asset.user_id) users.push(asset.user_id);
                    asset.asset_associates.forEach(assoc => {
                        users.push(assoc.user_id);
                    });
                    users = users.filter(onlyUnique);
                    const promises = Promise.all(users.map(user => {
                        const data = {
                            user_id: user,
                            offer_id: offer.id
                        }
                        return UserOffer.create(data);
                    }))

                    return promises.then(res => {
                        console.log(res);
                        return offer;
                    })
                })
            })
    }

    createResponse(data) {
        return OfferResponse.create(data).then(mess => {
            // return mess;
            return this.model.findOne({
                where: {id: data.thread_id},
                include: [
                    {
                        model: Asset,
                        include: [
                            {
                                model: Associates
                            }
                        ]
                    }
                ]
            }).then(model => {
                const offer = JSON.parse(JSON.stringify(model));
                const asset = offer.asset;
                const onlyUnique = (value, index, self) => { 
                    return self.indexOf(value) === index;
                }
                let users = [];
                if(asset.user_id) users.push(asset.user_id);
                asset.asset_associates.forEach(assoc => {
                    users.push(assoc.user_id);
                });
                users = users.filter(onlyUnique);
                const promises = Promise.all(users.map(user => {
                    const data = {
                        user_id: user,
                        offer_id: offer.id
                    }
                    return UserOffer.create(data);
                }))

                return promises.then(res => {
                    console.log(res);
                    return mess;
                })
            })
        });
    }

    update(id, data) {
        return this.model.findOne({where: {id: id}})
            .then(mess => {
                return mess.update(data).then(res => res);
            })
    }
};