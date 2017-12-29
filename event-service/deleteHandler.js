'use strict';
var AWS = require('aws-sdk');

module.exports.deleteEvent = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Delete a event data!',
      input: event,
    }),
  };

  callback(null, response);
};
