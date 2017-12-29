'use strict';
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
var s3 = new AWS.S3();
var sqs = new AWS.SQS();

module.exports.createEvent = (event, context, callback) => {

  let eventId = uuidv4();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'EventCreated',
      eventId
    }),
  };

  var params = {
            Bucket : 'test-bucket-hyperhuddle',
            Key : eventId+'.json',
            Body : JSON.stringify({
              eventId,
              eventType: "EventCreated",
              name: "AWS MeetUps"
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