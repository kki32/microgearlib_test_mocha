var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

//"node":"4.2.4","npm":"3.5.2"

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

//var filePath = "/Users/Shared/Jenkins/Home/jobs/microgearlib_testing_mocha/workspace/specs/microgear.cache";
//var topModule = module;
var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/microgear.cache";
console.log(filePath);


/**
 * Created by tsn on 1/20/2016 AD.
 */

// //pre-re: should run publish_helper.js 4 first. ensure the test and its helper does not share the same microgear.cache
//describe('Code 1: Unsubscribe the same topic twice starts from unsubscribe', function () {
//   var microgear;
//   var isConnected;
//   var received;
//
//   var unsubscribedOnce;
//   var unsubscribedTwice;
//   var subscribed;
//
//   var topic = "/firstTopic";
//   var message = "Hello from helper.";
//
//   var appkey = 'NLc1b8a3UZPMhOY';
//   var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//   var appid = 'testNodeJs';
//
//   beforeEach(function () {
//     isConnected = false;
//     unsubscribedOnce = false;
//     unsubscribedTwice = false;
//     subscribed = false;
//     received = false;
//
//     microgear = MicroGear.create({
//       key: appkey,
//       secret: appsecret
//     });
//   });
//
//   afterEach(function () {
//     console.log("end-------");
//         // if(connected){
//           console.log("cut connection~");
//           microgear.client.end();
//         // }
//         if (fs.existsSync(filePath)) {
//           console.log("delete microgear.cache");
//           fs.unlinkSync(filePath);
//         }
//       });
//
//   it('Code 1.1: should not receive message again after unsubscribe twice', function (done) {
//     this.timeout(10000);
//
//     var stubMessage = sinon.stub();
//     stubMessage.withArgs('received').returns(true);
//     microgear.on('message', stubMessage);
//
//     var stubConnect = sinon.stub();
//     stubConnect.withArgs('isConnected').returns(true);
//     microgear.on('connected', stubConnect);
//
//          setTimeout(function () {
//           sinon.assert.calledOnce(stubConnect);
//           isConnected = stubConnect('isConnected');
//           expect(isConnected).to.be.true;
//
//           console.log("unsubscribe");
//           unsubscribedOnce = true;
//           microgear.unsubscribe(topic);
//         }, 3000);
//
//          setTimeout(function () {
//            console.log("unsubscribe 2");
//            unsubscribedTwice = true;
//            microgear.unsubscribe(topic);
//          }, 4000);
//
//          setTimeout(function () {
//            console.log("subscribe");
//            subscribed = true;
//            microgear.subscribe(topic);
//          }, 6000);
//
//          setTimeout(function () {
//           expect(message).to.equal(""+stubMessage.args[0][1]);
//           sinon.assert.calledOnce(stubMessage);
//           done();
//         }, 8000);
//
// microgear.connect(appid);
// });
//
// it('Code 1.2: Unsubscribe the same topic twice starts from subscribe', function (done) {
//   console.log("start");
//   this.timeout(10000);
//
//   var stubMessage2 = sinon.stub();
//   stubMessage2.withArgs('received')
//         .onFirstCall().returns(true)
//         .onSecondCall().returns(false);
//   microgear.on('message', stubMessage2);
//
//   var stubConnect = sinon.stub();
//   stubConnect.withArgs('isConnected').returns(true);
//   microgear.on('connected', stubConnect);
//
//   setTimeout(function () {
//     isConnected = stubConnect('isConnected');
//     expect(isConnected).to.be.true;
//     console.log("subscribe");
//     subscribed = true;
//     microgear.subscribe(topic);
//   }, 3000);
//
//   setTimeout(function () {
//     expect(message).to.equal(""+stubMessage2.args[0][1]);
//     sinon.assert.calledOnce(stubMessage2);
//     expect(stubMessage2).to.be.true;
//   }, 4000);
//
//   setTimeout(function () {
//    console.log("unsubscribe 1");
//    unsubscribedOnce = true;
//    microgear.unsubscribe(topic);
//    expect(stubMessage2).to.be.true;
//  }, 6000);
//
//   setTimeout(function () {
//    console.log("unsubscribe 2");
//    subscribed = true;
//    unsubscribedTwice = true;
//    microgear.unsubscribe(topic);
//    expect(stub.Message2).to.be.true;
//    done();
//  }, 8000);
//
//   microgear.connect(appid);
// });
// });
//
//

////pre-re: should run publish_helper.js 4 first.
//describe('Subscribe same topic twice', function () {
//    var microgear;
//    var topic = "/firstTopic";
//    var message = "Hello from helper.";
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function () {
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should not change its behavior -> should receive message from topic that helper publish', function (done) {
//        this.timeout(10000);
//
//        var stubMessage = sinon.stub();
//        microgear.on('message', stubMessage, done);
//
//        var stubConnect = sinon.stub();
//        microgear.on('connected', stubConnect);
//
//        setTimeout(function () {
//            sinon.assert.calledOnce(stubConnect);
//            microgear.subscribe(topic);
//            microgear.subscribe(topic);
//
//            //TODO: topic setalias
//            setTimeout(function () {
//                sinon.assert.calledOnce(stubMessage);
//                expect(message).to.equal(""+stubMessage.args[0][1]);
//                done();
//            }, 2000);
//        }, 3000);
//
//
//        microgear.connect(appid);
//    }, 10000);
//});
//
////pre-re: should run publish_helper.js 4 first.
////TODO: need to think of a better way to test
//describe('Subscribe topic after unsubscribe before', function () {
//    var microgear;
//    var topic = "/firstTopic";
//    var message = "Hello from helper.";
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//    var count;
//    var subscribed;
//
//    beforeEach(function () {
//        count = 0;
//        subscribed = false;
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//    });
//
//    afterEach(function () {
//        if (connected) {
//            microgear.client.end();
//        }
//    });
//
//    it('should receive message when helper publishes topic', function (done) {
//        this.timeout(10000);
//
//        var stubMessage = sinon.stub();
//        microgear.on('message', stubMessage);
//
//        var stubConnect = sinon.stub();
//        microgear.on('connected', stubConnect);
//
//        setTimeout(function () {
//            sinon.assert.calledOnce(stubConnect);
//            microgear.subscribe(topic);
//            setTimeout(function () {
//                sinon.assert.calledOnce(stubMessage);
//                expect(message).to.equal("" + stubMessage.args[0][1]);
//                microgear.unsubscribe(topic);
//                setTimeout(function () {
//                    sinon.assert.calledOnce(stubMessage);
//                    microgear.subscribe(topic);
//                    setTimeout(function () {
//                        sinon.assert.calledTwice(stubMessage);
//                    }, 5000);
//                }, 4000);
//            }, 3000);
//        }, 2000);
//
//
//        //microgear.on("message", function(topic, msg) {
//        //    console.log(count);
//        //    count += 1;
//        //    //TODO: gearalias not set ne
//        //    expect(msg+"").toBe(message);
//        //    if(count > 6){
//        //        expect(subscribed).toBeTruthy();
//        //        done();
//        //    }
//        //});
//        //microgear.on('connected', function() {
//        //    connected = true;
//        //    subscribed = true;
//        //    microgear.subscribe(topic);
//        //    expect(subscribed).toBeTruthy();
//        //    setTimeout(function () {
//        //        subscribed = false;
//        //        microgear.unsubscribe(topic);
//        //        expect(subscribed).toBeFalsy();
//        //        setTimeout(function () {
//        //            subscribed = true;
//        //            microgear.subscribe(topic);
//        //        }, 2000);
//        //    }, 4000);
//        //},5000);
//
//        microgear.connect(appid);
//
//    });
//});
//
////prerequisite: helper code 4. need to end helper. publish_helper.js
//describe('Subscribe invalid topic - no slash', function () {
//    var microgear;
//    var received;
//    var topic = "firstTopic";
//    var message = "Hello from helper.";
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function () {
//        received = false;
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should not receive message from invalid topic', function (done) {
//        microgear.on("message", function(topic, msg) {
//            received = true;
//            //TODO: gearalias not set ne
//        });
//        microgear.on('connected', function() {
//            connected = true;
//            microgear.subscribe(topic);
//        },5000);
//
//        setTimeout(function () {
//            expect(received).toBeFalsy();
//            done();
//        }, 9000);
//
//        microgear.connect(appid);
//    }, 10000);
//});
//
////prerequisite: helper code 4. need to end helper. publish_helper.js
//xdescribe('Unsubscribe topic after subscribe', function () {
//    var microgear;
//    var topic = "/firstTopic";
//    var message = "Hello from helper.";
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//    var count;
//    var previousCount;
//    var subscribed;
//
//    beforeEach(function () {
//        previousCount = 0;
//        count = 0;
//        subscribed = false;
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should receive message when helper publish topic', function (done) {
//        microgear.on("message", function(topic, msg) {
//            console.log(count);
//            console.log(count);
//            count += 1;
//            //TODO: gearalias not set ne
//            expect(msg+"").toBe(message);
//            if(count > 6){
//                expect(subscribed).toBeTruthy();
//                done();
//            }
//        });
//        microgear.on('connected', function() {
//            connected = true;
//            subscribed = true;
//            microgear.subscribe(topic);
//            expect(subscribed).toBeTruthy();
//            setTimeout(function () {
//                subscribed = false;
//                previousCount = count;
//                microgear.unsubscribe(topic);
//                console.log(previousCount);
//                console.log(count);
//
//                setTimeout(function () {
//                    if(previousCount == count){
//                        console.log(previousCount);
//                        console.log(count);
//                        expect(subscribed).toBe(false);
//                        done();
//                    }
//                }, 2000);
//                expect(subscribed).toBeFalsy();
//                console.log(count);
//            }, 4000);
//        },5000);
//
//        microgear.connect(appid);
//    }, 10000);
//});
//
////prerequisite: helper code 4. need to end helper. publish_helper.js
//xdescribe('Unsubscribe topic before subscribe', function () {
//    var microgear;
//    var received;
//    var unsubscribed;
//    var subscribed;
//    var topic = "/firstTopic";
//    var message = "Hello from helper.";
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//
//    beforeEach(function () {
//        subscribed = false;
//        unsubscribed = false;
//
//        received = false;
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should not affect subscribe', function (done) {
//        microgear.on("message", function(topic, msg) {
//            received = true;
//            if(unsubscribed && subscribed){
//                expect(msg+"").toBe(message);
//                done();
//            }
//            else {
//                expect("should not receive message before subscribe").toBeFalsy();
//            }
//            //TODO: gearalias not set
//        });
//        microgear.on('connected', function() {
//            connected = true;
//            microgear.unsubscribe(topic);
//            unsubscribed = true;
//
//            setTimeout(function () {
//                microgear.subscribe(topic);
//                subscribed = true;
//            }, 2000);
//
//        },9000);
//
//
//        microgear.connect(appid);
//    }, 10000);
//});
//
//
////prerequisite: need to call helper before/later code 1. publish_helper.js
//xdescribe('Publish to topic that subscribe afterwards + publish to topic empty string', function () {
//    var microgear;
//    var topic = "/firstTopic";
//    var message = 'Hello subscribers.';
//    var connected = false;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function () {
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//
//        fs.writeFile(pathToFile, "", function(err) {
//            if(err) {
//                return console.log(err);
//            }
//            console.log("create empty file!");
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            console.log("con");
//            microgear.client.end();
//        }
//        fs.unlinkSync(pathToFile);
//    });
//
//    it('subscriber should receive the message when subscribe after start publishing', function (done) {
//        console.log("first");
//        microgear.on('connected', function() {
//            connected = true;
//            setInterval(function() {
//                microgear.publish(topic, message);
//                console.log("publish message");
//            },1000);
//
//            fs.watchFile(pathToFile, function(curr, prev) {
//
//                fs.readFile(pathToFile, 'utf8', function (err, data) {
//                    if (err) {
//                        console.log("no file");
//                        return console.log(err);
//                    }
//                    console.log("this is da" + data.toString() + "her");
//                    expect(data.toString()).to.equal(message);
//                    clearInterval();
//                    fs.unwatchFile(pathToFile);
//                    done();
//                });
//            });
//        },5000);
//        microgear.connect(appid);
//    }, 10000);
//    it('subscriber should receive the message when subscribe empty topic', function (done) {
//        console.log("second");
//        topic = "";
//        microgear.on('connected', function() {
//            connected = true;
//            setInterval(function() {
//                microgear.publish(topic, message);
//                console.log("publish message");
//            },1000);
//
//            fs.watchFile(pathToFile, function(curr, prev) {
//
//                fs.readFile(pathToFile, 'utf8', function (err, data) {
//                    if (err) {
//                        console.log("no file");
//                        return console.log(err);
//                    }
//                    console.log("this is da" + data.toString() + "her");
//                    expect(data.toString()).to.equal(message);
//                    clearInterval();
//                    fs.unwatchFile(pathToFile);
//                    done();
//                });
//            });
//        },5000);
//        microgear.connect(appid);
//    }, 10000);
//});
//
//xdescribe('Publish to topic that the publisher subscribed itself', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//    var connected;
//    var received;
//    var topic;
//    var message;
//
//    beforeEach(function () {
//        topic = '/firstTopic';
//        message = 'Hello myself.';
//        microgear = undefined;
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//        connected = false;
//        received = false;
//        expect(microgear).toBeUndefined();
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should receive message', function (done) {
//
//        microgear.on('connected', function () {
//            connected = true;
//            microgear.subscribe(topic);
//            setInterval(function() {
//                microgear.publish(topic, message);
//                console.log("publish message");
//            },1000);
//
//        });
//
//
//        microgear.on("message", function (topic, msg) {
//            received = true;
//            expect(connected).toBeTruthy();
//            expect(received).toBeTruthy();
//            //TODO: gearalias not set.
//            //expect(topic).toBe(appid + "/" + "gearname" + "/" + microgear.gearalias);
//            expect(msg + "").toBe(message);
//            clearInterval();
//            done();
//        });
//
//
//        microgear.connect(appid);
//    }, 10000);
//
//});
//
//xdescribe('Publish to microgear that subscribe other topic', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//    var connected;
//    var received;
//    var topic;
//    var message;
//    var modified;
//    beforeEach(function () {
//        topic = '/firstTopic';
//        message = 'Hello myself.';
//        microgear = undefined;
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//        connected = false;
//        received = false;
//        modified = false;
//        expect(microgear).toBeUndefined();
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//
//        fs.writeFile(pathToFile, "", function(err) {
//            if(err) {
//                return console.log(err);
//            }
//            console.log("create empty file!");
//        });
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('subscribers should not receive message from topic it does not subscribe', function (done) {
//        console.log("first");
//        microgear.on('connected', function() {
//            connected = true;
//            setInterval(function() {
//                microgear.publish(topic, message);
//                console.log("publish message");
//            },1000);
//
//
//            fs.watchFile(pathToFile, function(curr, prev) {
//                modified = true;
//                fs.readFile(pathToFile, 'utf8', function (err, data) {
//                    if (err) {
//                        console.log("no file");
//                        return console.log(err);
//                    }
//                    console.log("this is da" + data.toString() + "her");
//                    expect(data.toString()).to.equal(message);
//                });
//            });
//
//            setTimeout(function () {
//                expect(modified).toBeFalsy();
//                clearInterval();
//                fs.unwatchFile(pathToFile);
//                done();
//            }, 8000);
//
//
//        },5000);
//        microgear.connect(appid);
//
//
//    }, 10000);
//});
//
//xdescribe('Publish to invalid topic - no slash', function () {
//    var count;
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//    var connected;
//    var received;
//    var invalidTopic;
//    var message;
//
//    beforeEach(function () {
//        count = 0;
//        invalidTopic = 'firstTopic';
//        message = 'Hello myself.';
//        microgear = undefined;
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//        connected = false;
//        received = false;
//        expect(microgear).toBeUndefined();
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//    });
//
//    afterEach(function () {
//        if(connected){
//            microgear.client.end();
//        }
//    });
//
//    it('should have some kind of error/warning', function (done) {
//        microgear.on('connected', function () {
//            count += 1;
//            connected = true;
//            microgear.publish(invalidTopic, message);
//            if(count > 3){
//                done();
//            }
//        }, 1000);
//        microgear.connect(appid);
//    }, 10000);
//
//});