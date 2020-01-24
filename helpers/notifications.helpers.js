import http from './http.helper';

async function checkForNew (id, cb) {
    try{
        const res = await http.get(`api/new-notifications-by-type/${id}`);
        const notifications = await res.json();
        cb(notifications);
    }catch(err){
        console.log(err);
    }
}

const defaultNotifications = {
    messages: 0,
    offers: 0,
    closing: 0,
    aquired: 0,
    noDeals: 0
};

function intervalCheckForNew (id, cb) {
    return setInterval(() => {
        console.log('checking');
        checkForNew(id, cb);
    }, 45000)
}

async function getMessageResponseCount(id, cb) {
    try{
        const res = await http.get(`api/message-response-count/${id}`);
        const notifications = await res.json();
        cb(notifications);
    }catch(err){
        console.log(err);
    }
}

async function getOfferResponseCount(id, cb) {
    try{
        const res = await http.get(`api/offer-response-count/${id}`);
        const notifications = await res.json();
        cb(notifications);
    }catch(err){
        console.log(err);
    }
}

function intervalCountCheck(id, cb1, cb2){
    return setInterval(() => {
        cb1(id, cb2);
    }, 45000)
}

export {checkForNew, defaultNotifications, intervalCheckForNew, getOfferResponseCount, getMessageResponseCount, intervalCountCheck}