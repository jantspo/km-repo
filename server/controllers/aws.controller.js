const env = process.env;
var AWS = require('aws-sdk');

const AwsController = {
    sendNotification(emails, address, message, link) {
        const offer = message.offer ? `<p style="color: black; font-size: 15px">New Offer: <span style="color: #2560A3; font-weight: 600; font-size: 16px;" >${message.offer}</span></p>` : '';
        const messageBody = message.message ? `<p style="color: black; font-size: 15px">${message.message}</p>` : '';
        const params = {
            Destination: { 
                ToAddresses: emails
            },
            Message: { 
                Body: { 
                    Html: {
                        Charset: "UTF-8",
                        Data: `<html>
                                    <body>
                                        <div style="display: none; font-size: 0px; line-height: 0px; max-height: 0px; max-width: 0px; width: 0px; opacity: 0; overflow: hidden;">
                                            ${offer}
                                            ${messageBody}
                                        </div>
                                        <div style="width: 100%; background-color: #2889BE">
                                            <img src="${env.SERVER_URL}/images/logo.jpg" /> 
                                        </div> 
                                        <h3 style="background-color: #2889BE; padding: 8px 10px 5px; color: white; font-size: 18px;">${address}</h3>
                                        <h4 style="background-color: lightgrey; color: black; display: inline-block; padding: 5px 10px; border-radius: 25px;">${message.km_user.first_name} ${message.km_user.last_name} posted:</h4>
                                        ${offer}
                                        ${messageBody}
                                        <a href=${env.ASSETMANAGER_URL + link  }>Click here to view on HGM Dashboard.</a>
                                        <p style="color: black;">Created On: ${new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                                hour: 'numeric', minute: 'numeric', second: 'numeric',
                                                hour12: true,
                                                timeZone: 'America/Los_Angeles'
                                            }).format(new Date(message.createdAt))}
                                        </p>
                                    </body>
                                </html>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: `${message.km_user.first_name} ${message.km_user.last_name} posted on ${address} the following...`
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `${message.km_user.first_name} ${message.km_user.last_name} posted a new message for asset: ${address}`
                }
            },
            Source: 'offer@hgm-co.com',
        };
        console.log(params);
        let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
        return sendPromise.then(
            function(data) {
                console.log(data.MessageId);
                return true;
            }).catch(
            function(err) {
                console.error(err, err.stack);
            });
    }
};

module.exports = AwsController;