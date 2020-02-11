const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const axios = require('axios');
const env = process.env;
const mailchimp_api_key = env.MAILCHIMP_KEY;
const mailchimp_audience = env.MAILCHIMP_AUDIENCE_ID;
router.use(bodyParser.json());

router.post('/api/subscribe', async (req, res)=> {
    try{
        const config = {
            url: `https://us4.api.mailchimp.com/3.0/lists/${mailchimp_audience}/members/`,
            method: "POST",
            data: {
                "email_address": req.body.email,
                "status": "subscribed"
            },
            auth: {
                user : 'any',
                password : mailchimp_api_key
            }
        };
        return axios(config)
            .then(resp => {
                return res.status(200).json('success');
            }).catch(err => {
                console.log(err)
                res.status(500).json('error');
            });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;