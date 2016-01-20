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


//describe('Code 1: Create microgear with different parameters', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//
//    beforeEach(function () {
//        microgear = undefined;
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        expect(microgear).to.be.undefined;
//    });
//
//    it('should save gearkey', function () {
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).to.be.an('object');
//        expect(microgear.gearkey).to.equal(appkey);
//
//    });
//
//    it('should save appsecret', function () {
//        expect(microgear).not.to.be.an('object');
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).to.be.an('object');
//        expect(microgear.gearsecret).to.equal(appsecret);
//    });
//
//    it('should ignore empty gearkey', function () {
//        appkey = '';
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).to.be.null;
//    });
//
//    it('should save the info only the lastest one when create microgear twice', function () {
//
//
//
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear.gearkey).to.equal(appkey);
//        expect(microgear.gearsecret).to.equal(appsecret);
//
//        var appkey2 = 'Ziyur6AwgArePdZ';
//        var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
//        microgear = MicroGear.create({
//            key : appkey2,
//            secret : appsecret2
//        });
//        expect(microgear).to.be.an('object');
//        expect(microgear.gearkey).not.to.equal(appkey);
//        expect(microgear.gearsecret).not.to.equal(appsecret);
//        expect(microgear.gearkey).to.equal(appkey2);
//        expect(microgear.gearsecret).to.equal(appsecret2);
//
//    });
//
//    it('should ignore empty gearsecret', function () {
//        appsecret = '';
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).to.be.null;
//    });
//
//});
//
//describe('Code 2: Connect successfully, valid input', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//    var isConnected;
//
//    beforeEach(function () {
//        appkey    = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//        isConnected =false;
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//    });
//    afterEach(function (done){
//        //should fail here if microgear is not connect
//        this.timeout(10000);
//
//        microgear.on('disconnected', function() {
//            console.log("disconnected");
//            done();
//        });
//        console.log("cut connection");
//        microgear.disconnect();
//    });
//
//    it('should be able to connect without any errors', function (done) {
//        this.timeout(10000);
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.true;
//            expect(stubConnect.callCount).to.equal(1);
//            stubConnect.restore;
//
//            done();
//        }, 4000);
//        microgear.connect(appid);
//    });
//});
//
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
//
//describe('Chat with myself', function () {
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
//        expect(microgear).to.be.undefined;
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//
//        fs.writeFile(filePath, '{"_":null}', function (err) {
//            if (err) {
//                return console.log(err);
//            }
//            console.log("clear cache");
//            done();
//        });
//    });
//
//    afterEach(function (){
//        //should fail if microgear is not connected
//        microgear.client.end();
//    });
//
//    it('should receive message', function (done) {
//        this.timeout(10000);
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubMessage = sinon.spy();
//        microgear.on('message', stubMessage);
//
//        microgear.connect(appid);
//
//        setTimeout(function () {
//            microgear.setalias(gearname);
//            microgear.chat(gearname, message);
//            setTimeout(function () {
//                expect(stubConnect.called).to.be.true;
//                expect(stubMessage.called).to.be.true;
//                expect(stubConnect.callCount).to.equal(1);
//                expect(stubMessage.callCount).to.equal(1);
//                expect(stubConnect.calledBefore(stubMessage)).to.be.true;
//                expect(""+stubMessage.args[0][1]).to.equal(message);
//                //TODO: gearalias not set.
//                //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
//                done();
//            },4000);
//        }, 3000);
//    });
//});
//

describe('Resettoken when have microgear.cache and microgear is offline', function () {
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

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });

        var stubConnect = sinon.spy();
        microgear.on('connected', stubConnect);

        var stubDisconnect = sinon.spy();
        microgear.on('disconnected', stubDisconnect);

        microgear.connect(appid);

        //create state that have microgear.cache but offline
        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            expect(stubConnect.callCount).to.equal(1);
            expect(stubDisconnect.notCalled).to.be.true;

            microgear.disconnect();

            expect(stubDisconnect.called).to.be.true;
            expect(stubDisconnect.callCount).to.equal(1);
            done();
        }, 3000);
    });

    afterEach(function () {
        microgear.client.end();
    });

    it('should clear the cache in resettoken', function (done) {
        this.timeout(10000);
        //check the content of microgear cache is not null
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                console.log("no file");
                expect("Pre-requisite: should have microgear.cache file").to.be.false;
                return console.log(err);
            }
            expect(data.toString()).not.to.equal('{"_":null}');
            //resettoken then check content again
            microgear.resettoken(function (result) {
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        expect("Resettoken should not delete the file").to.be.false;
                        return console.log(err);
                    }
                    expect(data.toString()).to.equal('{"_":null}');
                    done();
                });
            });
        });
    }, 10000);
});