'use strict';
var AWS = require('aws-sdk');

module.exports.updateEvent = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Updating event with Id!',
      input: event,
    }),
  };

  callback(null, response);
};