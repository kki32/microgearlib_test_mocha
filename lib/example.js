#!/usr/bin/env node

var topic = "/firstTopic";
var message = "Hello from helper.";
var MicroGear = require('microgear');
var microgear;
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testnodejs';


var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
}

var appdir = require('path').dirname(topModule.filename);   

microgear = MicroGear.create({
	key : appkey,
	secret : appsecret
});
console.log(microgear);
microgear.on("message", function(topic,msg) {
	console.log(topic);
	console.log("Incoming message: "+msg);
 }); 

microgear.on("error", function(err) {
    console.log("Error: hello "+err);
});

microgear.on('disconnected', function() {
	console.log("disconnected");
  // setInterval(function () {
  // 	microgear.publish(topic, message);
  // 	console.log("publish..");
  //           }, 1000);
});

microgear.on('connected', function() {
	console.log("connected");
	microgear.disconnect();
  // setInterval(function () {
  // 	microgear.publish(topic, message);
  // 	console.log("publish..");
  //           }, 1000);
});
//   setTimeout(function () {
// try{

	microgear.resettoken(function(){
			var good = false;
	microgear.connect(appid, function(err){
		console.log("inisde");
		good = true;
	});
	console.log(good);
	})

// }
// catch(error){
// 	console.log(error + "hdsds");
// }
// }, 100);


// describe.only('EventEmitter', function(){
//   describe('#emit()', function(){
//      var microgear;
//      var received;
//      var subscribed;
//      var count;
//      var previousCount;
//      var unsubscribedOnce;
//      var unsubscribedTwice;
//      var topic = "/firstTopic";
//      var message = "Hello from helper.";
//      var connected = false;
//      var appkey = 'NLc1b8a3UZPMhOY';
//      var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//      var appid = 'testNodeJs';
//      var timerCallback;


//      beforeEach(function () {
//         unsubscribedOnce = false;
//         unsubscribedTwice = false;
//         subscribed = false;
//         received = false;
//         count = 0;
//         previousCount = 0;
//         microgear = MicroGear.create({
//             key: appkey,
//             secret: appsecret
//         });
//     });
//     // it('should invoke the callback', function(){
//     //   var stub = sinon.stub();
//     //   var emitter = new EventEmitter;

//     //   emitter.on('microgear', stub);
//     //   // emitter.emit('on', 'conected');
//     //   expect(stub.calledWith('connected'));
//     // })

// it('should pass arguments to the callbacks', function(done){
//     this.timeout(10000);
//     var stub = sinon.stub();
//     stub.withArgs("connect").returns("yes");
// console.log(stub("connect"));
//     microgear.on('connected', stub);


//         // microgear.on('connected', function () {
//         //     console.log("i am connected...");
//         // });
//     setTimeout(function () {
//        console.log("check");
//        sinon.assert.calledOnce(stub);
//        done();
//    }, 3000);

//     // microgear.connect(appid);
// });

// it('should pass arguments to the callbacks', function(){
//       this.timeout(10000);
//       // sinon.assert.calledOnce(stub);
//      var stub2 = sinon.stub();
//      microgear.on('connected', stub2);
//           // sinon.assert.calledOnce(stub2);

//     setTimeout(function () {
//        console.log("check");
//        sinon.assert.calledOnce(stub2);
//        done();
//    }, 3000);

//     microgear.connect(appid);
// });

// });
// });




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
