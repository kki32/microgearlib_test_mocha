#!/usr/bin/env node

var MicroGear = require('microgear');
var fs = require('fs');
var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/microgear.cache";
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
// if (fs.existsSync(filePath)) {
// 	fs.unlinkSync(filePath);
// }

var publish_helper = function() {
// exports.publish_helper = function(callback) {



	console.log(topic);
	microgear = MicroGear.create({
		key : appkey,
		secret : appsecret
	});

	microgear.on('connected', function() {
		console.log('Connected...');
		microgear.subscribe(topic);
	});

	microgear.on('warning', function(err) {
		console.log("warn");
	});

	microgear.on('info', function(err) {
		console.log("info");
	});

	microgear.on("message", function(topic,msg) {
		console.log("Incoming message: "+msg);
		if (fs.existsSync(pathToFile)) {
			fs.writeFile(pathToFile, msg, function(err) {
				if(err) {
					return console.log(err);
				}
				console.log("The file was saved!");
				microgear.client.end();
				callback();
			}); 
		}
		else{
			console.log("not found");
		}
	});

	microgear.connect(appid);
};

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
		},2000);
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

var args = process.argv.slice(2);
for(var i = 0; i < args.length; i++){
	switch(parseInt(args[i])){
		case 1:
		publish_helper();
		break;
		case 2:
		topic = '';
		publish_helper();
		break;
		case 3:
		topic = "/notFirstTopic";
		publish_helper();
		break;
		case 4:
		console.log(topic);
		subscribe_helper();
		break;
	}
}




