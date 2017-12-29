'use strict';
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
var s3 = new AWS.S3();
var qs = require('qs')

module.exports.createEvent = (event, context, callback) => {

  let eventId = uuidv4();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'EventCreated',
      eventId
    }),
  };

  console.log(event);

  // Do any Processing here for backend validations
  let eventData = qs.parse(event.body)
  var params = {
            Bucket : process.env.BUCKET_NAME,
            Key : eventId+'.json',
            Body : JSON.stringify({
              eventId,
              eventType: "EventCreated",
              payload: eventData,
              version: 1
            })
        }

  s3.putObject(params, function(err, data) {
    if (err)  { 
      callback(err, err.stack); // an error occurred
    } else { 
      callback(null, response); // successful response
    }
  });
  
};