'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
 var S3Handler = require('S3Handler');

// Show work in cqrs mode
module.exports.manageEventData = (event, context, cb) => {
  // Is it possible for multiple SNS message delivered at once?
  let snsMessage = JSON.parse(event.Records[0].Sns.Message); 
  let keyName = snsMessage.Records[0].s3.object.key;
  let bucketName = process.env.EVENT_STORE_BUCKET;

  let eventsDataBucket =  process.env.EVENTS_BUCKET;

  S3Handler.readFile(bucketName, keyName).then(function(eventData) {
  	// Update the file based on the new event
  	console.log(eventData)
  	console.log(JSON.parse(eventData).eventId)
 	return S3Handler.saveFile(eventsDataBucket, JSON.parse(eventData).eventId + '.json', eventData)
  }).then(function(){
  	cb(null, null);
  }).catch(function(err){
  	console.log(err)
  	cb(null, err);
  })
};