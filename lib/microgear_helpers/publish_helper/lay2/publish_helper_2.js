#!/usr/bin/env node
var MicroGear = require('microgear');

var microgear;
var gearname = "publish-helper-2";
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');
var pathToFile = "/Users/tsn/Desktop/microgear_test_jasmine/microgear-test-jasmine/spec/receiver2.txt";
var topic2 = '/secondTopic';
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
	microgear.setalias(gearname);
	microgear.subscribe(topic2);
});

microgear.on('warning', function(err) {
	console.log("warn");
});

microgear.on('info', function(err) {
	console.log("info");
});

microgear.on("message", function(topic,msg) {
	console.log("Incoming message: "+msg);
	if (fs.existsSync(pathToFile2)) {
		fs.writeFile(pathToFile2, msg, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved 2!");
    microgear.client.end();
 }); 
}
else{
	console.log("not found");
}

});

    microgear.connect(appid);



