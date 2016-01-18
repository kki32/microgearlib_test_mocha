var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

var EventEmitter = require('events').EventEmitter;

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/microgear.cache";

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

//pre-re: should run publish_helper.js 4 first. ensure the test and its helper does not share the same microgear.cache
describe('Code 1: Unsubscribe the same topic twice starts from unsubscribe', function () {
  var microgear;
  var isConnected;
  var received;
  var subscribed;

  var count;
  var previousCount;
  var unsubscribedOnce;
  var unsubscribedTwice;

  var topic = "/firstTopic";
  var message = "Hello from helper.";

  var appkey = 'NLc1b8a3UZPMhOY';
  var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
  var appid = 'testNodeJs';

  beforeEach(function () {
    isConnected = false;
    unsubscribedOnce = false;
    unsubscribedTwice = false;
    subscribed = false;
    received = false;
    count = 0;
    previousCount = 0;

    microgear = MicroGear.create({
      key: appkey,
      secret: appsecret
    });
  });

  afterEach(function () {
    console.log("end-------");
        // if(connected){
          console.log("cut connection~");
          microgear.client.end();
        // }
        if (fs.existsSync(filePath)) {
          console.log("delete microgear.cache");
          fs.unlinkSync(filePath);
        }
      });

  it('Code 1.1: should not receive message again after unsubscribe twice', function (done) {
    this.timeout(10000);

    var stubMessage = sinon.stub();
    stubMessage.withArgs('received').returns(true);
    microgear.on('message', stubMessage);

    var stubConnect = sinon.stub();
    stubConnect.withArgs('isConnected').returns(true);
    microgear.on('connected', stubConnect);

        // microgear.on('connected', function() {
         setTimeout(function () {
          sinon.assert.calledOnce(stubConnect);
          isConnected = stubConnect('isConnected');
          expect(isConnected).to.be.true;

          console.log("unsubscribe");
          unsubscribedOnce = true;
          microgear.unsubscribe(topic);
        }, 3000);

         setTimeout(function () {
           console.log("unsubscribe 2");
           previousCount = count;

           unsubscribedTwice = true;
           microgear.unsubscribe(topic);
         }, 4000);

         setTimeout(function () {
           console.log("subscribe");
           subscribed = true;
           microgear.subscribe(topic);
         }, 6000);

         setTimeout(function () {
          expect(message).to.equal(""+stubMessage.args[0][1]);
          sinon.assert.calledOnce(stubMessage);
          done();
        }, 8000);
     // }, 9000);
microgear.connect(appid);
});

it('Code 1.2: Unsubscribe the same topic twice starts from subscribe', function (done) {
  console.log("start");
  this.timeout(10000);

  var stubMessage2 = sinon.stub();
  stubMessage2.withArgs('received').returns(true);
  microgear.on('message', stubMessage2);

  var stubConnect2 = sinon.stub();
  stubConnect2.withArgs('isConnected').returns(true);
  microgear.on('connected', stubConnect2);

        // microgear.on('connected', function() {
         setTimeout(function () {
          isConnected = stubConnect2('isConnected');
          expect(isConnected).to.be.true;

          console.log("unsubscribex");
          unsubscribedOnce = true;
          microgear.unsubscribe(topic);
        }, 3000);

         setTimeout(function () {
           console.log("unsubscribe 2x");
           previousCount = count;

           unsubscribedTwice = true;
           microgear.unsubscribe(topic);
         }, 4000);

         setTimeout(function () {
           console.log("subscribex");
           subscribed = true;
           microgear.subscribe(topic);
         }, 6000);

         setTimeout(function () {
          expect(message).to.equal(""+stubMessage2.args[0][1]);
          sinon.assert.calledOnce(stubMessage2);
          done();
        }, 8000);
         microgear.connect(appid);
       });
});


//prerequisite: helper code 4. need to end helper. publish_helper.js
// describe('Unsubscribe the same topic twice starts from subscribe', function () {
//     this.timeout(12000);
//     var microgear;
//     var received;
//     var subscribed;
//     var count;
//     var previousCount;
//     var unsubscribedOnce;
//     var unsubscribedTwice;
//     var topic = "/firstTopic";
//     var message = "Hello from helper.";
//     var connected = false;
//     var appkey = 'NLc1b8a3UZPMhOY';
//     var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//     var appid = 'testNodeJs';
//     var timerCallback;


//     beforeEach(function () {
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

//     afterEach(function () {
//         console.log("in");
//         if(connected){
//             console.log("cut");
//             microgear.client.end();
//         }

//     });


//     it('should not receive message again after unsubscribe twice', function (done) {

//         microgear.on('connected', function() {
//             console.log("connected...");
//             connected = true;
//             subscribed = false;
//             microgear.subscribe(topic);
//             setTimeout(function () {
//                 console.log("unsub");
//                 previousCount = count;
//                 microgear.unsubscribe(topic);
//                 unsubscribedOnce = true;
//             }, 3000);
//             setTimeout(function () {
//                 console.log("unsub");
//                 microgear.unsubscribe(topic);
//                 unsubscribedTwice = true;
//             }, 4000);

//             setTimeout(function () {
//                 // expect(count).to.be(previousCount);
//                 console.log("wait");
//                 done();
//             }, 6000);
//         });

//         microgear.on("message", function(topic, msg) {
//             console.log("inside");
//             received = true;
//             if(subscribed && !unsubscribedOnce && !unsubscribedTwice){
//                 count += 1;
//             }
//             //TODO: gearalias not set
//         });


//         microgear.connect(appid);


//     }, 10000);
// }, 12000);
