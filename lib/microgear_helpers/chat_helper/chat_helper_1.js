#!/usr/bin/env node
var MicroGear = require('microgear');
var helpername = "chat-helper-1";
var microgear;
var appkey    = 'NLc1b8a3UZPMhOY';
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
	key : appkey,
	secret : appsecret
});

microgear.on('connected', function() {
	console.log('Connected...');
	microgear.setalias(helpername);

});

microgear.on("message", function(topic,msg) {
	console.log(topic);
	console.log("Incoming message: "+msg);
	if (fs.existsSync(pathToFile)) {
		fs.writeFile(pathToFile, msg, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    microgear.client.end();
 }); 
}
else{
	console.log("not found");
}

});

 microgear.connect(appid);
