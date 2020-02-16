var aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
    region: 'us-west-2', // Put your aws region here
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    signature: 'v4'
});

const base64MimeType = (base64) => {
    let result = null;
    if (typeof encoded !== 'string') {
        return result;
    }

    var mime = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
        result = mime[1];
    }

    return result;
};

const S3_BUCKET = process.env.Bucket;
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {

    const data = req.body.file.blob.split(';base64,');
    const blob = new Buffer.from(data[1], 'base64');

    const fileHeader = req.body.file.blob.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.file.name.replace(/ /g,"_");
    const fileType = req.body.file.type;
    const folder = req.body.folder ? req.body.folder.name.replace(/ /g,"_") : undefined;
    const noteId = req.body.asset_id ? req.body.asset_id : req.body.note ? req.body.note.asset_id : undefined;
    const key = `${process.env.NODE_ENV === 'development' ? 'Dev/' : ''}${noteId ? noteId + '/' : ''}${folder ? folder + '/' : ''}${fileName}`;
// Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: key,
        ContentType: fileHeader,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        Expires: 1000
    };

    return s3.upload({...s3Params, Body: blob}, (error, data) => {
        if(error){
            console.log(error)
            return error;
        }
        return {
            location: data.Location,
            key: data.Key
        }
    } );
};

exports.fetch_s3 = (req, res) =>{

    const s3 = new aws.S3();  // Create a new instance of S3
    const key = req.body.key;
// Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: key
    };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
    return s3.getSignedUrl('getObject', s3Params, (err, data) => {
        if(err){
            return {success: false, error: err}
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = data;
        // Send it all back
        res.status(200).json({success:true, data:{returnData}});
    });
};

exports.upload_s3 = (req, res) => {
    const s3 = new aws.S3();
    s3.putObject({
        Bucket: S3_BUCKET,
        Key: req.body.key,
        Body: req.body.file,
        ACL: 'public-read'
    }, function(err, data) {
        if (err) {
            return alert('There was an error uploading your photo: ', err.message);
        }
        res.status(200).json(data);
    });
};
