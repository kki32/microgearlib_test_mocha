#!/usr/bin/env node

var MicroGear = require('microgear');
var fs = require('fs');

var topModule = module;

while(topModule.parent) {
  topModule = topModule.parent;
}

var appdir = require('path').dirname(topModule.filename); 

var filePath =  appdir + "/microgear.cache";
var pathToFile = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/receiver.txt";
console.log("in helper file", "pathToFile in helper file: "+pathToFile);

var microgear;
var topic;
var helperGearname;
var gearname;
var appkey; 
var appsecret; 
var appid;
var subscribeAfter;

topic = '/firstTopic';
//same with message from test side
message = 'Hello';

//TODO
// message = 'from publish';
//how to know whether that message is from chat or from publish
helperGearname = 'helper';
gearname = "main";
appkey = 'jX2viqgprq3XRhv';
appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
appid = 'testNodeJs';
subscribeAfter = false;
// if (fs.existsSync(filePath)) {
// 	fs.unlinkSync(filePath);
// }
//
fs.writeFile(filePath, '{"_":null}', function (err) {
	if (err) {
		return console.log(err);
	}
	console.log("clear cache");
});

var helper = function(setaliasx, chatx, publishx, subscribex, unsubscribex, appid2, secondHelper) {

	if(appid2){
		console.log("different app id");
		appkey = 'AhN6RJub8Ragthy';
		appsecret = 'qohmHwEuypFgpSRnaJWRfXBjSlU4m6';
		appid = 'testNodeJsHelper';
	}
	microgear = MicroGear.create({
		key : appkey,
		secret : appsecret,
		alias : helperGearname
	});

// microgear.on("message", function(topic,msg) {
// // 	console.log(topic);
// 	console.log("Incoming message: "+msg);
// });

microgear.on("message", function(topic,msg) {
// 	console.log(topic);
console.log("Incoming message: "+msg);

	// 	//check if receiver file exists then write down message when received
	if (fs.existsSync(pathToFile)) {
		fs.writeFile(pathToFile, msg, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
			if(chatx){
				clearInterval(cleanIntervalChat);
			}
			//TODO: should it be here?
			if(publishx){
				clearInterval(cleanIntervalPublish);
			}

			microgear.client.end();
		}); 
	}
	else{
		console.log("not found");
	}
});
microgear.on('connected', function() {
	console.log("Connected...");
	if(setaliasx){
		console.log('setaliasx to ' + helperGearname);
		microgear.setalias(helperGearname);
		console.log(helperGearname);
	}
	if(chatx){
			// console.log(helperGearname);

			console.log(helperGearname + ' chatx to ' + gearname);
			var cleanIntervalChat = setInterval(function() {
				microgear.chat(gearname, message);
				console.log("chat message");

			},1000);
		}

		if(subscribex){
			if(subscribeAfter){
				setTimeout(function(){
					microgear.subscribe(topic);
				},6000)
			}
			else{

			console.log('subscribex to' + topic);
			microgear.subscribe(topic);
			}
		}

		if(unsubscribex){
			console.log('unsubscribex to' + topic);
			microgear.unsubscribex(topic);
		}
		if(publishx){
			console.log('publishx to' + topic);
			var cleanIntervalPublish = setInterval(function() {

				microgear.publish(topic, message);
				console.log("publish message");
			},1000);
		}
	});

microgear.on('warning', function(err) {
	console.log("warn");
});

microgear.on('info', function(err) {
	console.log("info");
});

microgear.on("error", function(err) {
	console.log("!! Error: "+err);
});

microgear.on('disconnected', function() {
	console.log("disconnected");
  // setInterval(function () {
  // 	microgear.publish(topic, message);
  // 	console.log("publish..");
  //           }, 1000);
});


microgear.connect(appid);
};


// var subscribe_helper = function() {
// 	microgear = MicroGear.create({
// 		key : appkey,
// 		secret : appsecret
// 	});

// 	microgear.on('connected', function() {
// 		console.log('Connected...');
// 		setInterval(function() {
// 			microgear.publish(topic, message);
// 			console.log("publish message");
// 		},1000);
// 	});

// 	microgear.on('warning', function(err) {
// 		console.log("warn");
// 	});

// 	microgear.on('info', function(err) {
// 		console.log("info");
// 	});

// 	microgear.on("message", function(topic,msg) {
// 		console.log("message");
// 	});

// 	microgear.connect(appid);
// };

//setalias, chat, publish, subscribe, unsubscribe, differentAppid, secondHelper

var args = process.argv.slice(2);
for(var i = 0; i < args.length; i++){
	switch(parseInt(args[i])){
		//receive message, write it to receiver file
		case 1: 
		//publish to topic that the publisher subscribe, publish topic that does not subscribe, chat to name same with topic that subscribe
		//chat with other online microgear in same appid
		helper(setaliasx=false, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		// //receive message, 
		// case 2:
		// topic = '';
		// helper();
		// break;

		// case 3:
		// topic = "/notFirstTopic";
		// helper();
		// break;

		//publish to topic
		case 4:
		//subscribe one topic, subscribe the same topic twice, subscribe topic after unsubscribe before, subscribe invalid topic
		//unsubscribe twice, unsubscribe topic after subscribe, unsubscribe topic before subscribe, unsubscribe invalid topic
		//publish only topic
		helper(setaliasx=false, chatx=false, publishx=true, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		console.log(topic);
		// subscribe_helper();
		break;

		//chat, 
		// case 5:
		// //chat with other online microgear in same appid
		// helper();
		// break;

		//create microgear in different id then wait to receive message from gearname
		case 6:
		//chat with other online microgear in other appid

		helper(setaliasx=false, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=true, secondHelper=false);
		break;

		//receive message from gearname
		case 7:
		//chat with microgear sharing the same name
		helperGearname = 'main';

		helper(setaliasx=true, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//publish empty topic
		case 8:
		//subscribe empty topic
		topic = '';
		helper(setaliasx=false, chatx=false, publishx=true, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//publish invalid topic - no slash
		case 9:
		//subscribe no slash topic
		topic = 'firstTopic';
		helper(setaliasx=false, chatx=false, publishx=true, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//chat with gearname
		case 10:
		//create, setalias after create, resettoken after setalias
		helper(setaliasx=false, chatx=true, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;
//(subscribex, publishx, differentAppId, name, chatx)
		//setalias to empty 
		case 11:
		//chat with empty setalias
		helperGearname = "";
		helper(setaliasx=true, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//chat to empty gearname
		case 12:
		//unsubscribe empty topic
		gearname = "";
		helper(setaliasx=false, chatx=true, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//setalias to same name as gearname in differentid
		case 13:
		//unsubscribe empty topic
		helperGearname = "main";
		helper(setaliasx=true, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=true, secondHelper=false);
		break;

		//setalias to name similar to topic, receive message
		case 14:
		//publish to gearname similar to topic
		helperGearname = '/firstTopic';
		helper(setaliasx=true, chatx=false, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;
		//subscribe
		case 15:
		//	publish to gearname similar to topic
		helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//publish to different topic
		case 16:
		//	subscribe more than one topic
		topic = '/secondTopic';
		helper(setaliasx=false, chatx=false, publishx=true, subscribex=false, unsubscribex=false, appid2=false, secondHelper=true);
		break;
		case 17:
		//	publish more than one topic
		topic = '/secondTopic';
		helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=true);
		break;
		case 18:
		topic = 'firstTopic';
		helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=false);
		break;
		//chat to invalid topic
		case 19:

		gearname = '/firstTopic';
		helper(setaliasx=false, chatx=true, publishx=false, subscribex=false, unsubscribex=false, appid2=false, secondHelper=false);
		break;

		//subscribe empty topic
		case 20:

		topic = '';
		helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=false);
		break;

				//subscribe invalid topic
				case 21:

				topic = 'firstTopic';
				helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=false);
				break;
				case 22:

				subscribeAfter = true;
				helper(setaliasx=false, chatx=false, publishx=false, subscribex=true, unsubscribex=false, appid2=false, secondHelper=false);
				break;
			}
		}




