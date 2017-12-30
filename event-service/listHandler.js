'use strict';
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
var s3 = new AWS.S3();
var sqs = new AWS.SQS();

module.exports.getEventList = (event, context, callback) => {

  let eventId = uuidv4();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GetEventList',
      eventId
    }),
  };

  callback(null, response);
};

module.exports.listProjection = (event, context, callback) => {

  // Is it possible for multiple SNS message delivered at once?
  let snsMessage = JSON.parse(event.Records[0].Sns.Message); 
  console.log(JSON.parse(event.Records[0].Sns.Message).Records[0].eventTime);
  console.log(JSON.parse(event.Records[0].Sns.Message).Records[0].s3.object);
  console.log(JSON.parse(event.Records[0].Sns.Message).Records[0].s3.object.key);
};