const Controller = require('./controllerGenerator');
const UserMessageResponse = require('../models/index').km_user_message_response;
const UserOfferResponse = require('../models/index').km_user_offer_response;

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
                    read: false
                }
            })
        ]);

        return fetches.then(res => {
            const messages = res[0].length;
            const offers = res[1].length;
            return {
                newMessages: messages,
                newOffers: offers
            }
        });
    }

}

module.exports = NotificationController;