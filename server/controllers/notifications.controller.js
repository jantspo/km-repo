const Controller = require('./controllerGenerator');
const UserMessageResponse = require('../models/index').km_user_message_response;
const UserOfferResponse = require('../models/index').km_user_offer_response;
const OfferResponse = require('../models/index').km_offer_response;
const MessageResponse = require('../models/index').km_message_response;
const Offer = require('../models/index').km_offer;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class NotificationController extends Controller{
    constructor(model) {
        super(model);
    }

    getNewNotifications(id){
        const fetches = Promise.all([
            UserMessageResponse.findAll({
                where: {
                    km_user_id: id,
                    read: false
                }
            }),
            UserOfferResponse.findAll({
                where: {
                    km_user_id: id,
                    read: false,
                    offer_id: {
                        [Op.ne]: null
                    }
                    
                }
            })
        ]);

        return fetches.then(res => {
            return {
                messages: res[0].length,
                offers: res[1].length
            }
        });
    }

    getNewNotificationsByType(id) {
        const fetches = Promise.all([
            UserMessageResponse.findAll({
                where: {
                    km_user_id: id,
                    read: false
                }
            }),
            UserOfferResponse.findAll({
                where: {
                    km_user_id: id,
                    read: false,  
                    offer_id: {
                        [Op.ne]: null
                    }   
                },
                include: [
                    {
                        model: OfferResponse,
                        as: 'offer',
                        include: [
                            {
                                model: Offer,
                                as: 'thread',
                                // where: {
                                //     active: true,
                                //     approved: false, 
                                //     finalized: false
                                // }
                            }
                        ]
                    }
                ]
            }),
            // UserOfferResponse.findAll({
            //     where: {
            //         km_user_id: id,
            //         read: false,
            //         offer_id: {
            //             [Op.ne]: null
            //         }
            //     },
            //     include: [
            //         {
            //             model: OfferResponse,
            //             as: 'offer',
            //             include: [
            //                 {
            //                     model: Offer,
            //                     as: 'thread',
            //                     where: {
            //                         active: true,
            //                         approved: true, 
            //                         finalized: false
            //                     }
            //                 }
            //             ]
            //         },
                    
            //     ]
            // }),
            // UserOfferResponse.findAll({
            //     where: {
            //         km_user_id: id,
            //         read: false,
            //         offer_id: {
            //             [Op.ne]: null
            //         }
            //     },
            //     include: [
            //         {
            //             model: OfferResponse,
            //             as: 'offer',
            //             include: [
            //                 {
            //                     model: Offer,
            //                     as: 'thread',
            //                     where: {
            //                         active: true,
            //                         finalized: true
            //                     }
            //                 }
            //             ]
            //         },
                   
            //     ]
            // }),
            // UserOfferResponse.findAll({
            //     where: {
            //         km_user_id: id,
            //         read: false,
            //         offer_id: {
            //             [Op.ne]: null
            //         }
            //     },
            //     include: [
            //         {
            //             model: OfferResponse,
            //             as: 'offer',
            //             include: [
            //                 {
            //                     model: Offer,
            //                     as: 'thread',
            //                     where: {
            //                         active: false,
            //                     }
            //                 }
            //             ]
            //         },
                   
            //     ]
            // })
        ]);

        return fetches.then(res => {
            console.log(res[1]);
            const parsedRes = JSON.parse(JSON.stringify(res[1]));
            const offers = parsedRes.filter(res => {
                const origOffer = res.offer.thread
                return origOffer.active === true && origOffer.approved === false && origOffer.finalized === false;
    
            });
            const closing = parsedRes.filter(res => {
                const origOffer = res.offer.thread
                return origOffer.active === true && origOffer.approved === true && origOffer.finalized === false;
    
            });
            const aquired = parsedRes.filter(res => {
                const origOffer = res.offer.thread
                return origOffer.active === true && origOffer.approved === true && origOffer.finalized === true;
    
            });
            const noDeals = parsedRes.filter(res => {
                const origOffer = res.offer.thread
                return origOffer.active === false;
    
            });
            return {
                messages: res[0].length,
                offers: offers.length,
                closing: closing.length,
                aquired: aquired.length,
                noDeals: noDeals.length
            }
        });
    }

    getMessageResponseCount(id) {
        return MessageResponse.count({
            where: {
                thread_id: id
            }
        })
    }

    getOfferResponseCount(id) {
        return OfferResponse.count({
            where: {
                thread_id: id
            }
        })
    }

}

module.exports = NotificationController;