var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

//"node":"4.2.4","npm":"3.5.2"

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/Shared/Jenkins/Home/jobs/microgearlib_testing_mocha/workspace/specs/microgear.cache";
//var topModule = module;
//var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/microgear.cache";
console.log(filePath);



describe('Code 1: Create microgear with different parameters', function () {
    var microgear;
    var appkey;
    var appsecret;

    beforeEach(function () {
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        expect(microgear).to.be.undefined;
    });

    it('should save gearkey', function () {
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).to.be.an('object');
        expect(microgear.gearkey).to.equal(appkey);

    });

    it('should save appsecret', function () {
        expect(microgear).not.to.be.an('object');
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).to.be.an('object');
        expect(microgear.gearsecret).to.equal(appsecret);
    });

    it('should ignore empty gearkey', function () {
        appkey = '';
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).to.be.null;
    });

    it('should save the info only the lastest one when create microgear twice', function () {




        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear.gearkey).to.equal(appkey);
        expect(microgear.gearsecret).to.equal(appsecret);

        var appkey2 = 'Ziyur6AwgArePdZ';
        var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
        microgear = MicroGear.create({
            key : appkey2,
            secret : appsecret2
        });
        expect(microgear).to.be.an('object');
        expect(microgear.gearkey).not.to.equal(appkey);
        expect(microgear.gearsecret).not.to.equal(appsecret);
        expect(microgear.gearkey).to.equal(appkey2);
        expect(microgear.gearsecret).to.equal(appsecret2);

    });

    it('should ignore empty gearsecret', function () {
        appsecret = '';
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).to.be.null;
    });

});

describe('Code 2: Connect successfully, valid input', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var isConnected;

    beforeEach(function () {
        appkey    = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        isConnected =false;

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});
    });
    afterEach(function (done){
        //should fail here if microgear is not connect
        this.timeout(10000);

        microgear.on('disconnected', function() {
            console.log("disconnected");
            done();
        });
        console.log("cut connection");
        microgear.disconnect();
    });

    it('should be able to connect without any errors', function (done) {
        this.timeout(10000);
        var stubConnect = sinon.spy();
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            expect(stubConnect.callCount).to.equal(1);
            stubConnect.restore;

            done();
        }, 4000);
        microgear.connect(appid);
    });
});

//describe('Code 3: Connect unsuccessfully due to invalid input', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//
//    beforeEach(function (done) {
//        this.timeout(10000);
//        appkey = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//
//     fs.writeFile(filePath, '{"_":null}', function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("clear cache");
//         done();
//     });
//    });
//
//    it.skip('should throw error when appkey change its case', function (done) {
//        this.timeout(10000);
//
//        var loweredAppkey = appkey.toLowerCase();
//        expect(loweredAppkey).to.equal('nlc1b8a3uzpmhoy');
//
//        microgear = MicroGear.create({
//            key: loweredAppkey,
//            secret: appsecret
//        });
//        expect(microgear.gearkey).to.equal(loweredAppkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when appkey is trimmed', function (done) {
//        this.timeout(10000);
//        var trimmedGearKey = appkey.substring(0, appkey.length - 2);
//        expect(trimmedGearKey).to.equal('NLc1b8a3UZPMh');
//
//        microgear = MicroGear.create({
//            key: trimmedGearKey,
//            secret: appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(trimmedGearKey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//
//    });
//
//    it.skip('should throw error when appkey is added', function (done) {
//        this.timeout(10000);
//        var addedGearKey = appkey + "xx";
//        expect(addedGearKey).to.equal('NLc1b8a3UZPMhOYxx');
//
//        microgear = MicroGear.create({
//            key: addedGearKey,
//            secret: appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(addedGearKey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//        expect(stubConnect.called).to.be.false;
//        expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//        done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when uses another appkey', function (done) {
//        this.timeout(10000);
//        var anotherGearKey = "9O0xiA2lHXz01iE";
//        microgear = MicroGear.create({
//            key: anotherGearKey,
//            secret: appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(anotherGearKey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//
//
//
//    });
//
//    it.skip('should throw error when appsecret is trimmed', function (done) {
//        this.timeout(10000);
//        var trimmedGearSecret = appsecret.substring(0, appsecret.length - 2);
//
//
//        expect(trimmedGearSecret).to.equal('tLzjQQ6FiGUhOX1LTSjtVKsnSExu');
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: trimmedGearSecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(trimmedGearSecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//                    expect(stubConnect.called).to.be.false;
//                    expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//                    done();
//            }, 3000);
//
//    });
//
//    it.skip('should throw error when appsecret is added', function (done) {
//        this.timeout(10000);
//        var addedGearSecret = appsecret + "xx";
//
//        expect(addedGearSecret).to.equal('tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7xx');
//
//        microgear = MicroGear.create({
//            key: addedGearSecret,
//            secret: appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(addedGearSecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when appsecret change its case', function (done) {
//        this.timeout(10000);
//        var loweredGearSecret = appsecret.toLowerCase();
//
//        expect(loweredGearSecret).to.equal('tLzjqq6figuhox1ltsjtvksnsexux7xx');
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : loweredGearSecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(loweredGearSecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when uses another appsecret', function (done) {
//        this.timeout(10000);
//
//        var anotherGearSecret = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";
//
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: anotherGearSecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(anotherGearSecret);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubError = sinon.spy();
//        microgear.on('error', stubError);
//
//        microgear.connect(appid, function(){
//            isConnected = true;
//        });
//
//        setTimeout(function () {
//            expect(isConnected).to.be.true;
//            expect(stubConnect.called).to.be.false;
//            expect(stubError.called).to.be.true;
//            expect(stubConnect.calledBefore(stubError)).to.be.true;
//            done();
//        }, 3000);
//    });
//
//    it('should throw error when appid change its case', function (done) {
//
//        fs.readFile(filePath, 'utf8', function (err,data) {
//            if (err) {
//                return console.log(err);
//            }
//            console.log(data);
//        });
//
//        this.timeout(10000);
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var loweredAppid = appid.toLowerCase();
//        expect(loweredAppid).to.equal('testnodejs');
//
//        var stubConnect2 = sinon.spy();
//        microgear.on('connected', stubConnect2);
//
//        console.log(stubConnect2.callCount + 'a');
//        microgear.connect(loweredAppid);
//        console.log(stubConnect2.callCount + 's');
//        setTimeout(function () {
//            console.log(stubConnect2.callCount + 'z');
//            expect(stubConnect2.called).to.be.false;
//
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when appid is trimmed', function (done) {
//        this.timeout(10000);
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var trimmedAppId = appid.substring(0, appid.length - 2);
//        expect(trimmedAppId).to.equal('testNode');
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        microgear.connect(trimmedAppId);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.false;
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when appid is added', function (done) {
//        this.timeout(10000);
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var addedAppId = appid + "xx";
//        expect(addedAppId).to.equal('testNodeJsxx');
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        microgear.connect(addedAppId);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.false;
//            done();
//        }, 3000);
//    });
//
//    it.skip('should throw error when uses another appsecret', function (done) {
//        this.timeout(10000);
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var anotherAppId = "testNodeJsHelper";
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        microgear.connect(anotherAppId);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.false;
//            done();
//        }, 3000);
//    });
//
//});

describe('Chat with myself', function () {
    var message;
    var gearname;
    var microgear;
    var appkey;
    var appsecret;
    var appid;

    beforeEach(function (done) {
        this.timeout(10000);
        microgear = undefined;
        gearname = 'myself';
        message = "Hello myself.";
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';

        expect(microgear).to.be.undefined;

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
            done();
        });
    });

    afterEach(function (){
        //should fail if microgear is not connected
        microgear.client.end();
    });

    it('should receive message', function (done) {
        this.timeout(10000);
        var stubConnect = sinon.spy();
        microgear.on('connected', stubConnect);

        var stubMessage = sinon.spy();
        microgear.on('message', stubMessage);

        microgear.connect(appid);

        setTimeout(function () {
            microgear.setalias(gearname);
            microgear.chat(gearname, message);
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.true;
                expect(stubConnect.callCount).to.equal(1);
                expect(stubMessage.callCount).to.equal(1);
                expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                expect(""+stubMessage.args[0][1]).to.equal(message);
                //TODO: gearalias not set.
                //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                done();
            },4000);
        }, 3000);
    });
});

//describe('Resettoken when have microgear.cache and microgear is offline', function () {
//    var message;
//    var gearname;
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//
//    beforeEach(function (done) {
//        this.timeout(10000);
//        microgear = undefined;
//        gearname = 'myself';
//        message = "Hello myself.";
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//
//        fs.writeFileSync(filePath, '{"_":null}', function (err) {
//            if (err) {
//                return console.log(err);
//            }
//            console.log("clear cache");
//        });
//
//        microgear.connect(appid);
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubDisconnect = sinon.spy();
//        microgear.on('disconnected', stubDisconnect);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.true;
//            expect(stubConnect.callCount).to.equal(1);
//            expect(stubDisconnect.notCalled).to.be.true;
//            microgear.disconnect();
//            expect(stubDisconnect.called).to.be.true;
//            expect(stubDisconnect.callCount).to.equal(1);
//            expect(stubDisconnect.notCalled).to.be.true;
//            done();
//        }, 3000);
//    });
//
//    afterEach(function () {
//        microgear.client.end();
//    });
//
//    it('should clear the cache in resettoken', function (done) {
//        this.timeout(10000);
//
//        fs.readFile(filePath, 'utf8', function (err, data) {
//            if (err) {
//                console.log("no file");
//                expect("Pre-requisite: should have microgear.cache file").to.be.false;
//                return console.log(err);
//            }
//            expect(data.toString()).not.to.equal('{"_":null}');
//
//            microgear.resettoken(function (result) {
//                fs.readFile(filePath, 'utf8', function (err, data) {
//                    if (err) {
//                        console.log("no file");
//                        expect("Resettoken should not delete the file").to.be.false;
//                        return console.log(err);
//                    }
//                    expect(data.toString()).to.equal('{"_":null}');
//                    done();
//                });
//            });
//        });
//    }, 10000);
//});
//
//describe('Resettoken twice', function () {
//    var connected;
//    var microgear;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function (done) {
//        this.timeout(10000);
//        connected = false;
//
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//
//        var stubConnect = sinon.stub();
//        microgear.on('connected', stubConnect);
//
//        setTimeout(function () {
//            sinon.assert.calledOnce(stubConnect);
//            connected = true;
//            done();
//        }, 3000);
//
//        microgear.connect(appid);
//    });
//    afterEach(function () {
//        if(connected) {
//            microgear.client.end();
//        }
//        fs.unlinkSync(filePath);
//    });
//
//    it('should just resettoken like usual', function (done) {
//        this.timeout(10000);
//        if(connected) {
//            connected = false;
//            microgear.client.end();
//        }
//        expect(connected).to.be.false;
//
//        var data = fs.readFileSync(filePath, 'utf8');
//        expect(data.toString()).not.to.equal('{"_":null}');
//
//        microgear.resettoken(function (result) {
//            var data2 = fs.readFileSync(filePath, 'utf8');
//            expect(data2.toString()).to.equal('{"_":null}');
//
//            microgear.resettoken(function (result2) {
//                var data4 = fs.readFileSync(filePath, 'utf8');
//                expect(data4.toString()).to.equal('{"_":null}');
//                done();
//            });
//        });
//
//    });
//});
//
//describe('Resettoken when no cache file', function () {
//    var fileExist;
//    var microgear;
//    var appkey = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function (done) {
//        fileExist = false;
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//
//        if(fs.existsSync(filePath)){
//            fileExist = true;
//            fs.unlinkSync(filePath);
//            fileExist = false;
//        }
//        expect(fileExist).to.be.false;
//        done();
//    });
//
//    it('should do nothing', function (done) {
//        microgear.resettoken(function (result) {
//            expect(true).to.be.true;
//            done();
//        });
//    }, 10000);
//});
//
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
//describe('Subscribe one topic', function () {
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
//    it('should receive message from topic that the helper publish', function (done) {
//        this.timeout(10000);
//
//        var stubMessage = sinon.stub();
//        stubMessage.withArgs('received').returns(true);
//        microgear.on('message', stubMessage);
//
//        var stubConnect = sinon.stub();
//        stubConnect.withArgs('isConnected').returns(true);
//        microgear.on('connected', stubConnect);
//
//        setTimeout(function () {
//            sinon.assert.calledOnce(stubConnect);
//            connected = true;
//            microgear.subscribe(topic);
//            setTimeout(function () {
//                sinon.assert.calledOnce(stubMessage);
//                expect(message).to.equal(""+stubMessage.args[0][1]);
//                done();
//            }, 2000);
//        }, 3000);
//
//
//
//
//        microgear.connect(appid);
//    });
//});
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