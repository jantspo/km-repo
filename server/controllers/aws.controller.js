const env = process.env;
var AWS = require('aws-sdk');

const AwsController = {
    sendNotification(emails, address, message, link) {
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
                                        <h3>${address}</h3>
                                        <h4>${message.km_user.first_name} ${message.km_user.last_name} posted:</h4>
                                        <p>${message.message}</p>
                                        <a href=${'http://' + env.CLIENT_HOST + link  }>Click here to view on HGM Dashboard.</a>
                                        <p>Created On: ${new Intl.DateTimeFormat('en-US', {
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
            Source: 'tasks@hgm-co.com',
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