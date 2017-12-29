'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
  
module.exports.getEvent = (event, context, cb) => {
  let eventId = event.pathParameters.id;
  var  bucketName = 'test-bucket-hyperhuddle';
  var  keyName = eventId + '.json';

  readFile(bucketName, keyName, readFileContent, onError, cb);
};

function readFile (bucketName, filename, onFileContent, onError, cb) {
	var params = { Bucket: bucketName, Key: filename };
    s3.getObject(params, function (err, data) {
    	if (!err) 
        	onFileContent(filename, data.Body.toString(), cb);
        else
        	console.log(err);
    });
}
        
function readFileContent(filename, data, cb) {
	//do something with the content of the file
	let response = {
		statusCode: 200,
	    body: JSON.stringify({
	      message: 'EventData!',
	      data
	    })
	}
	console.log(data)
	cb(null, response)
}
        
function onError (err) {
	console.log('error: ' + err);
}            
