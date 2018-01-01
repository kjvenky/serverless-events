'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var S3Handler = require('S3Handler');
var _ = require('lodash');

// Show work in cqrs mode
module.exports.manageEventData = (event, context, cb) => {
  // Is it possible for multiple SNS message delivered at once?
  let snsMessage = JSON.parse(event.Records[0].Sns.Message); 

  // Handle Messages Based on the event
  let keyName = snsMessage.Records[0].s3.object.key;
  let bucketName = process.env.EVENT_STORE_BUCKET;
  let eventsDataBucket =  process.env.EVENTS_BUCKET;
  let newEventData;
  
  S3Handler.readFile(bucketName, keyName).then((eventData) => {
  	if(JSON.parse(eventData).eventType == 'EventCreated') {
  		saveEventData(eventsDataBucket,
	  			JSON.parse(eventData).eventId + '.json',
	  			JSON.stringify(JSON.parse(eventData).payload)
  			);
  		throw new Error();
  	} else {
  		newEventData = JSON.parse(eventData).payload; 
  		return  S3Handler.readFile(eventsDataBucket, JSON.parse(eventData).eventId + '.json'); 
  	}
  }).then((eventData) => {
  	// Merge them and save them
  	return S3Handler.saveFile(
	  		eventsDataBucket,
	  		newEventData.eventId + '.json',
	  		JSON.stringify(_.merge(JSON.parse(eventData), newEventData))
  		)
  }).catch(function(err){
  	console.log(err)
  })
};

function saveEventData(Bucket, Key, Body) {
	S3Handler.saveFile(Bucket, Key, Body);
}