#!/usr/bin/env node

var MicroGear = require('microgear');
var fs = require('fs');
var filePath = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/publish_helper/microgear.cache";
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";

var microgear;
var topic;
var gearname;
var appkey; 
var appsecret; 
var appid;

topic = '/firstTopic';
message = 'Hello from helper.';
gearname = "publish-helper";
appkey = 'NLc1b8a3UZPMhOY';
appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
appid = 'testNodeJs';



var subscribe_helper = function() {
	console.log(topic);
	microgear = MicroGear.create({
		key : appkey,
		secret : appsecret
	});

	microgear.on('connected', function() {
		console.log('Connected...');
		setInterval(function() {
			microgear.publish(topic, message);
			console.log("publish message");
		},1000);
	});

	

	microgear.on('warning', function(err) {
		console.log("warn");
	});

	microgear.on('info', function(err) {
		console.log("info");
	});

	microgear.on("message", function(topic,msg) {
		console.log("message");
	});

	microgear.connect(appid);
	
};

exports.subscribe_helper = subscribe_helper;