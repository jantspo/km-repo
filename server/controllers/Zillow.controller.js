const Asset = require('../models/index').asset;
const Zillow = require('node-zillow');
const zKey = process.env.ZILLOW_KEY;
//Instantiate
const zillow = new Zillow(zKey);

module.exports = {
    get: (params) => {
        return zillow.get('GetDeepSearchResults',
        {
            address: params.address,
            citystatezip: params.zip
        })
    }
};
