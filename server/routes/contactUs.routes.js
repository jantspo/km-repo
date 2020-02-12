const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
var AWS = require('aws-sdk');
const AWSAccessKeyId = process.env.AWSAccessKeyId;
const AWSSecretKey = process.env.AWSSecretKey;
const env = process.env;
AWS.config.update({
    region: 'us-west-2',
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
});

router.use(bodyParser.json());

router.post('/api/contact-us', async (req, res)=> {
    const data = req.body;
    try{
        const params = {
            Destination: { 
                ToAddresses: [
                    'contact@kastlemark-co.com',
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: `<html>
                                <body>
                                    <div style="width: 100%; background-color: #2889BE">
                                        <img src="${env.SERVER_URL}/src/public/images/km-logo.png" /> 
                                    </div> 
                                    <h3>Name:  ${data.first_name} ${data.last_name}</h1>
                                    <h4>Email: ${data.email}</h2>
                                    <p>
                                        ${data.message}
                                    </p>                                       
                                </body>
                            </html>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data:  `${data.message}`
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `${data.first_name} ${data.last_name} - ${data.message}`
                }
            },
            Source: 'contact@kastlemark-co.com',
        };

        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
        sendPromise.then(
            function(data) {
                console.log(data.MessageId);
                res.status(200).json('success');
            }).catch(
            function(err) {
                console.error(err, err.stack);
            });
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;