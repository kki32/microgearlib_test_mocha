#!/usr/bin/env node

var topic = "/firstTopic";
var message = "Hello from helper.";
var MicroGear = require('microgear');
var microgear;
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs';


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
microgear.on("message", function(topic,msg) {
	console.log(topic);
	console.log("Incoming message: "+msg);
 }); 

microgear.on('connected', function() {
	console.log("connected");
  setInterval(function () {
  	microgear.publish(topic, message);
  	console.log("publish..");
            }, 1000);
});

microgear.connect(appid);







	// var appdir = require('path').dirname(topModule.filename);   
	// 	console.log(appdir);
	// 	var fs = require('fs');
	// 	// fs.writeFile(appdir, '', function(){console.log('done')})

	// microgear = MicroGear.create({
	// 	key : appkey,
	// 	secret : appsecret
	// 		});

	// microgear.on('connected', function() {
 //    console.log('Connected...');
 //    microgear.setalias("mygear");
 //    console.log(microgear.gearalias());
 //    // setInterval(function() {
 //    	//microgear.chat("mygear", "hello");

 //    // },1000);

	// });

// 	microgear.on('warning', function(err) {
//     console.log("hellodsdss");
// });

// 		microgear.on('info', function(err) {
//     console.log("hellodsd");
// });

// 		microgear.on("message", function(topic,msg) {
//     console.log("Incoming message: "+msg);
// });

// microgear.resettoken(function(result){
// 	console.log("reset");
// })
//  fs.readFile(filePath, 'utf8', function (err, data) {
//                     if (err) {
//                         console.log("no file");
//                         return console.log(err);
//                     }


// console.log(data);
// // }
//                     );



		    // microgear.resettoken(function(result){
//          fs.readFile(filePath, 'utf8', function (err, data) {
//                     if (err) {
//                         console.log("no file");
//                         return console.log(err);
//                     }


// console.log(data);
// }
//                     );
		  //   console.log("reset");
		  //   microgear.connect(appid);
    // });

		// microgear.connect(appid);
		//     setInterval(function() {
		//         microgear.publish('sameTopic', 'Hello world.');

  //   },1000);


		// try{
		// 		microgear.connect(appid);
		// 		throw new Error('Error: request token is not issued, please check your key and secret.');
		// }
		// catch(e){
		// 	console.log("hello~");
		// }

		// console.log("helo");
		// console.log("helo");

	// microgear.client.end();



	// // microgear.on('closed', function() {
	// //     console.log('Closed...');
	// // });
