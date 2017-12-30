'use strict';
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
var qs = require('qs')
var S3Handler = require('S3Handler');

module.exports.createEvent = (event, context, callback) => {

  // Do any Processing here for backend validations before accepting the event
  let eventId = uuidv4();
  let eventData = qs.parse(event.body);

  eventData.versionId =  1;
  eventData.status =  'CREATED';
  eventData.eventId =  eventId;

  let Bucket = process.env.EVENT_STORE_BUCKET;
  let Key = eventId + '/' + uuidv4() + '.json';
  let Body =  JSON.stringify({
                eventId,
                eventType: "EventCreated",
                payload: eventData
              });

  S3Handler.saveFile(Bucket, Key, Body).then(function(err, data) {
      if (err) callback(err, err.stack);

      let response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'EventCreated',
          eventId
        }),
      };

      callback(null, response); // successful response
    }).catch(function(err){
      callback(null, err);
  })
  
};