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

  console.log(event);

  callback(null, response);
};