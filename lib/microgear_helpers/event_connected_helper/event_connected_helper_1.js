#!/usr/bin/env node
var MicroGear = require('microgear');
var helpername = "event-connected-helper-1";
var microgear;
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');
//TODO: path dependent
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/spec/receiver.txt";
var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}
var appdir = require('path').dirname(topModule.filename);  
console.log(appdir);

microgear = MicroGear.create({
	key : appkey,
	secret : appsecret
});

microgear.connect(appid);
