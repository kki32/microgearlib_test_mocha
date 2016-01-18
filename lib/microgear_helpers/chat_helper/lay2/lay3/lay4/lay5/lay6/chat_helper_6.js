#!/usr/bin/env node
var MicroGear = require('microgear');
var gearname = "mygear";
var helpername = "chat-helper-6";
var microgear;
var invalidAppkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');
//TODO: path dependent
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}
var appdir = require('path').dirname(topModule.filename);  
console.log(appdir);

microgear = MicroGear.create({
	key : invalidAppkey,
	secret : appsecret
});




microgear.on('connected', function() {
	console.log("Connected...");
	microgear.setalias(helpername);
	    setInterval(function() {
       	microgear.publish("tests", "Can you hear me ?");
    },1000);

});

microgear.on("message", function(topic,msg) {
	console.log(topic);
	console.log("Incoming message: "+msg);
});

microgear.connect(appid);
