#!/usr/bin/env node


var MicroGear2 = require('microgear');
var microgear2;
var appkey2 = "9O0xiA2lHXz01iE";
var appsecret2 = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";
var appid2 = "testNodeJsHelper";
var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}

var appdir = require('path').dirname(topModule.filename);   
console.log(appdir);

microgear2 = MicroGear2.create({
	key: appkey2,
	secret: appsecret2
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

