'use strict';
var AWS = require('aws-sdk');
var qs = require('qs')
const uuidv4 = require('uuid/v4');
var S3Handler = require('S3Handler');

module.exports.updateEvent = (event, context, callback) => {

  // Do any Processing here for backend validations before accepting the event
  let eventId;
  let eventData = qs.parse(event.body);
  if (eventData.eventId) { 
  	eventId = eventData.eventId;
  } else {
  	callback(null, {
  		statusCode: 200,
  		body: JSON.stringify({
          message: 'Please specify valid EventId'
        })
  	});
  }

  let Bucket = process.env.EVENT_STORE_BUCKET;
  let Key = eventId + '/' + uuidv4() + '.json';
  let Body =  JSON.stringify({
                eventId,
                eventType: "EventDataChanged",
                payload: eventData
              });

  S3Handler.saveFile(Bucket, Key, Body).then(function(err, data) {
      if (err) callback(err, err.stack);

      let response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'EventDataUpdated',
          eventId
        }),
      };

      callback(null, response); // successful response
    }).catch(function(err){
      callback(null, err);
  });
};