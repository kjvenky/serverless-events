'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var S3Handler = require('S3Handler');

// Show work in cqrs mode
module.exports.getEvent = (event, context, cb) => {
  let eventId = event.pathParameters.id;
  var bucketName = process.env.EVENTS_BUCKET;
  var keyName = eventId + '.json';

  S3Handler.readFile(bucketName, keyName).then(function(data) {
  	let response = {
		statusCode: 200,
	    body: JSON.stringify({
	      message: 'EventData',
	      data: JSON.parse(data).payload
	    })
	}
	cb(null, response);
  }).catch(function(err){
  	cb(null, err);
  })
};