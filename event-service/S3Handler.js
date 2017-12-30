'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports.readFile = function (Bucket, Key) {
	const p = new Promise(function(res, rej){
		var params = { Bucket, Key};
	    s3.getObject(params, function (err, data) {
	    	if (!err) 
	        	// onFileContent(Key, data.Body.toString(), cb);
	        	res(data.Body.toString());
	        else
	        	rej(err)
	    });
	})
    return p;
}   

module.exports.saveFile = function (Bucket, Key, Body) {
	const p = new Promise(function(res, rej){
		var params = {
			Bucket, Key, Body
        }
	    s3.putObject(params, function (err) {
	    	if (!err) 
	        	res();
	        else
	        	rej(err)
	    });
	})
    return p;
}     

