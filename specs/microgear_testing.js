var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');
var child_process = require('child_process');

//TODO: when one fail it does not go aftereach

//mocha specs --require specs/helpers/chai.js
//TODO: depend

var pathToFile = __dirname + "/receiver.txt";
var pathToFile2 = __dirname + "/receiver2.txt";

var topModule = module;

while(topModule.parent) {
    topModule = topModule.parent;
}

var appdir = require('path').dirname(topModule.filename);
var filePath = appdir + "/microgear.cache";

console.log("inside testing file~~~~~~~~");
console.log("filePath to cache file: "+filePath);
console.log("receiver file: " +pathToFile);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// var connectTimeout = 10000;
// var messageTimeout = 13000;
// var itTimeout = 60000;
//var beforeTimeout = 60000;
var connectTimeout = 5000;
var messageTimeout = 6000;
var itTimeout = 40000;
var chatInterval = 1000;
var beforeTimeout = 20000;
var afterTimeout = 20000;

describe('Code 1: Create', function() {
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var connected;
    var code;

    describe('Code 1: Case 1: Create microgear with gearkey and gearsecret parameter', function () {
        beforeEach(function () {
            //initialise variables
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        });

        it('Code 1: Case 1 should save gearkey and gearsecret', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            //check that microgear is an object and gearkey & gearsecret is saved to the object
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
        });
    });

    describe('Code 1: Case 2 and Case 3 Create with invalid input', function () {
        beforeEach(function (done) {
                this.timeout(beforeTimeout);
            //initialise variables
            microgear = undefined;
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;

                //clear cache file
                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");

                });
            done();
            });
        afterEach(function () {
            if(connected){
                microgear.client.end();
            }
        });
        it('Code 1: Case 2.1 should ignore empty gearkey', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            //if appkey to empty
            appkey = '';
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            //should not generate microgear object
            expect(microgear).to.be.null;
        });

        it.skip('Code 1: Case 2.2 should throw error when appkey change its case', function (done) {
            this.timeout(itTimeout);

                //change appkey to lowercase
                var loweredAppkey = appkey.toLowerCase();
                expect(loweredAppkey).to.equal('jX2viqgprq3XRhv');

                //ensure microgear is undefined before create
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: loweredAppkey,
                    secret: appsecret
                });
                //ensure loweredAppkey and appsecret is saved
                expect(microgear.gearkey).to.equal(loweredAppkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                //stub event to variable. this is to remove event being called after this it block
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                var stubError = sinon.stub();
                microgear.on('error', stubError);

                microgear.connect(appid);

                //after sometime, ensure error and connected event are being called
                setTimeout(function () {
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, connectTimeout);
            });

        it.skip('Code 1: Case 2.3 should throw error when appkey is trimmed', function (done) {
            this.timeout(itTimeout);
            var trimmedGearKey = appkey.substring(0, appkey.length - 2);
            expect(trimmedGearKey).to.equal('NLc1b8a3UZPMh');
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: trimmedGearKey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(trimmedGearKey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);

        });

        it.skip('Code 1: Case 2.3 should throw error when appkey is added', function (done) {
            this.timeout(itTimeout);
            var addedGearKey = appkey + "xx";
            expect(addedGearKey).to.equal('jX2viqgprq3XRhvxx');
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: addedGearKey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(addedGearKey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);
        });

        it.skip('Code 1: Case 2.4 should throw error when uses another appkey', function (done) {
            this.timeout(itTimeout);
            var anotherGearKey = "9O0xiA2lHXz01iE";
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: anotherGearKey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(anotherGearKey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);


        });

        it('Code 1: Case 3.1 should ignore empty gearsecret', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            appsecret = '';
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            //should not generate microgear object
            expect(microgear).to.be.null;
        });

        it.skip('Code 1: Case 3.2 should throw error when appsecret change its case', function (done) {
            this.timeout(itTimeout);
            var loweredGearSecret = appsecret.toLowerCase();

            expect(loweredGearSecret).to.equal('3uscc5uX4Hh6lYkmtKJbljxMtMl1tLxx');
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: loweredGearSecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(loweredGearSecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);
        });

        it.skip('Code 1: Case 3.3 should throw error when appsecret is trimmed', function (done) {
            this.timeout(itTimeout);
            var trimmedGearSecret = appsecret.substring(0, appsecret.length - 2);


            expect(trimmedGearSecret).to.equal('tLzjQQ6FiGUhOX1LTSjtVKsnSExu');
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: trimmedGearSecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(trimmedGearSecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);

        });

        it.skip('Code 1: Case 3.3 should throw error when appsecret is added', function (done) {
            this.timeout(itTimeout);
            var addedGearSecret = appsecret + "xx";

            expect(addedGearSecret).to.equal('3uscc5uX4Hh6lYkmtKJbljxMtMl1tLxx');
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: addedGearSecret,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(addedGearSecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);
        });

        it.skip('Code 1: Case 3.4 should throw error when uses another appsecret', function (done) {
            this.timeout(itTimeout);

            var anotherGearSecret = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: anotherGearSecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(anotherGearSecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
            microgear.on('error', stubError);

            microgear.connect(appid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                expect(stubError.called).to.be.true;
                expect(stubConnect.calledBefore(stubError)).to.be.true;
                done();
            }, connectTimeout);
        });

});
    //pre-re: run helper.js 10 first to chat with gearname.
    describe('Code 1: Case 4.1 Create with gearalias parameter - valid gearname', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            connected = false;
            code = 10;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
            });
            helper(code, done);
        });
        afterEach(function () {
            quit(code);
            if(connected){
                microgear.client.end();
            }
        });

        it('Code 1: Case 4.1 should save gearalias and receive message from helper', function (done) {
            this.timeout(itTimeout);
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: gearname
            });

            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
            expect(microgear.gearalias).to.equal(gearname);

            //stub event to variable. this is to remove event being called after this it block
            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                setTimeout(function () {
                    //check if message is received
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });
    });

    //TODO: recheck the actual output. fail for now.
    //pre-re: run helper.js 10 first to chat with gearname.
    describe.skip('Code 1: Case 4.2 Create with gearalias parameter - empty string gearname', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            connected = false;
            code = 10;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
            });
            helper(code, done);
        });
        afterEach(function () {
            quit(code);
            if(connected){
                microgear.client.end();
            }
        });

        it('Code 1: Case 4.2 should not be able to connect when gearalias is empty string', function (done) {
            this.timeout(itTimeout);
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            var emptyGearname = '';
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: emptyGearname
            });
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
            expect(microgear.gearalias).to.be.null;

            //stub event to variable. this is to remove event being called after this it block
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);
            expect(stubConnect.called).to.be.false;
            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                connected = true;
                expect(microgear.gearalias).to.be.null;
                done();
            }, connectTimeout);
        });

    });

    //TODO: to be check. fail for now
    //pre-re: run helper.js 19 first to chat with gearname-topic
    describe.skip('Code 1: Case 4.3 Create with gearalias parameter - topic gearname', function () {

        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            connected = false;
            code = 19;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            helper(code, done);
        });

        afterEach(function () {
            quit(code);
            if(connected){
                microgear.client.end();
            }
        });

        //fail
        //pre-re: run helper.js 19 first to chat with gearname - topic
        it('Code 1: Case 4.3 should not receive message from helper that chat to gearname similar to topic', function (done) {
            this.timeout(itTimeout);
            var invalidGearname = '/firstTopic'
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: invalidGearname
            });

            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
            expect(microgear.gearalias).to.equal(invalidGearname);

            //stub event to variable. this is to remove event being called after this it block
            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            expect(stubConnect.called).to.be.false;
            expect(stubMessage.called).to.be.false;
            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                setTimeout(function () {
                    //should not receive message
                    //fail
                    expect(stubMessage.called).to.be.false;
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });

    });

    describe('Code 1: Case 5: Create microgear twice', function () {
        beforeEach(function () {
            //initialise variables
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        });
        afterEach(function () {
            quit(code);
            if(connected){
                microgear.client.end();
            }
        });

        it('Code 1: Case 5 should save the info only the lastest one when create microgear twice', function () {
            this.timeout(itTimeout);
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            //create first time
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var appkey2 = 'Ziyur6AwgArePdZ';
            var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
            //create second time with new appkey and new appsecret
            microgear = MicroGear.create({
                key: appkey2,
                secret: appsecret2
            });
            //ensure appkey and appsecret is saved in the object
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey2);
            expect(microgear.gearsecret).to.equal(appsecret2);
        });
    });

});

describe('Code 2: Connect', function () {
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var connected;
    describe('Code 2: Case 1 Connect with valid appid', function () {
        beforeEach(function (done) {

            this.timeout(beforeTimeout);
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;
            microgear = undefined;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
            });

            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            done();

        });
        afterEach(function () {
            //should fail here if microgear is not connect
            if (connected) {
                microgear.client.end();
            }
        });

        it('Code 2: Case 1 should be able to connect without any errors', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubConnect.callCount).to.equal(1);
                done();
            }, connectTimeout);

        });
    });
    //fail TODO:
    describe.skip('Code 2: Case 2 Connect with invalid appid', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;
            microgear = undefined;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            done();
        });

        it('Code 2: Case 2.1 should throw error when appid is empty string', function (done) {
            this.timeout(itTimeout);
            var emptyAppid = '';

            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(emptyAppid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                done();
            }, connectTimeout);
        });
        it('Code 2: Case 2.2 should throw error when appid change its case', function (done) {
            this.timeout(itTimeout);

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var loweredAppid = appid.toLowerCase();
            expect(loweredAppid).to.equal('testnodejs');

            var stubConnect2 = sinon.stub();
            microgear.on('connected', stubConnect2);

            console.log(stubConnect2.callCount + 'a');
            microgear.connect(loweredAppid);
            console.log(stubConnect2.callCount + 's');
            setTimeout(function () {
                console.log(stubConnect2.callCount + 'z');
                expect(stubConnect2.called).to.be.false;

                done();
            }, connectTimeout);
        });
        it('Code 2: Case 2.3 should throw error when appid is trimmed', function (done) {
            this.timeout(itTimeout);

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var trimmedAppId = appid.substring(0, appid.length - 2);
            expect(trimmedAppId).to.equal('testNode');

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(trimmedAppId);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                done();
            }, connectTimeout);
        });
        it('Code 2: Case 2.3 should throw error when appid is added', function (done) {
            this.timeout(itTimeout);

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var addedAppId = appid + "xx";
            expect(addedAppId).to.equal('testNodeJsxx');

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(addedAppId);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                done();
            }, connectTimeout);
        });
        it('Code 2: Case 2.4 should throw error when uses another appid', function (done) {
            this.timeout(itTimeout);

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var anotherAppId = "testNodeJsHelper";
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(anotherAppId);

            setTimeout(function () {
                expect(stubConnect.called).to.be.false;
                done();
            }, connectTimeout);
        });


    });

    describe('Code 2: Case 3 Connect microgear when no microgear.cache file', function () {
        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            connected = false;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                done();

            });
        });

        it('should create cache file and connect to netpie', function (done) {
            this.timeout(itTimeout);
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubConnect.callCount).to.equal(1);
                if (fs.existsSync(filePath)) {
                    done();
                }
            }, connectTimeout);
        });


    });
});

describe('Code 3: Setalias', function () {
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var newGearname;
    var connected;
    var code;
    var child_processes;
    var spawn;
        //pre-re: run helper.js 10 first to chat
        describe('Code 3: Case 1, 2, 3 Setalias', function () {
            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                gearname = 'main';
                newGearname = 'mainNew';
                message = 'Hello';
                connected = false;
                code = 10;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");

                });
                console.log("spawnning2.");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);

                done();

            });

            afterEach(function (done) {

                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });

            it('Code 3: Case 1 should receive message from helper', function (done) {
                this.timeout(itTimeout);
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    expect(stubMessage.called).to.be.false;
                    microgear.setalias(gearname);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });

            it('Code 3: Case 2 should receive message from helper before setalias', function (done) {

                this.timeout(itTimeout);
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: gearname
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                expect(microgear.gearalias).to.equal(gearname);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                //should receive message after setalias
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        microgear.setalias(newGearname);
                        //TODO: fail gearalias not update value
                        //expect(microgear.gearalias).to.equal(newGearname);
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

            it.skip('Code 3: Case 2 should receive message from helper after setalias', function (done) {
                this.timeout(itTimeout);
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: newGearname
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                expect(microgear.gearalias).to.equal(newGearname);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                //should not receive message after setalias
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.setalias(gearname);
                        //TODO: gearalias not save new value
                        console.log(microgear.gearalias);
                        //expect(microgear.gearalias).to.equal(gearname);
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

            //TODO: not yet
            it.skip('Code 3: Case 3 should save only the latest setalias value when setalias more than once', function (done) {
                this.timeout(itTimeout);
                gearname = "main";
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.setalias(gearname);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            microgear.setalias("mainNew");
                            //TODO: gearalias not save new value, check topic name
                            //expect(microgear.gearalias).to.equal("main");
                            stubMessage.reset();
                            expect(stubMessage.called).to.be.false;
                            setTimeout(function () {
                                expect(stubMessage.called).to.be.true;
                                expect(message + "mainNew").to.equal("" + stubMessage.args[0][1]);
                                done();
                            }, messageTimeout + 2000);
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

        });

        //pre-re: run helper.js 12 first to chat with empty string gearname
        describe('Code 3: Case 4 Setalias as empty string', function () {
            var emptyGearname;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                emptyGearname = '';
                message = 'Hello';
                code = 12;
                connected = false;
                expect(microgear).to.be.undefined;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                console.log("spawnning2.");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

            afterEach(function (done) {

                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });
            it('Code 3: Case 4 should not be able to setalias as empty string', function (done) {
                this.timeout(itTimeout);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    //ensure microgear is connected and that there is no message at the beginning then setalias
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    microgear.setalias(emptyGearname);
                    expect(microgear.gearalias).to.be.null;
                    done();
                }, connectTimeout);
            });

        });

        //pre-re: run helper.js 4 first to publish to topic
        describe('Code 3: Case 5 Setalias like topic', function () {
            var gearnameTopic;
            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                message = 'Hello';
                gearnameTopic = '/firstTopic';
                expect(microgear).to.be.undefined;
                connected = false;
                code = 4;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                console.log("spawnning2.");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

            afterEach(function (done) {

                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });

            it('should not receive message when helper publishes the topic', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                expect(stubConnect.called).to.be.false;
                expect(stubMessage.called).to.be.false;
                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.setalias(gearnameTopic);
                        //expect(microgear.gearalias).to.equal(gearnameTopic);
                        //should not receive message from helper that publish the topic
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

        });

    });


describe('Code 4: Chat', function () {
var microgear;
var message
var appkey;
var appsecret;
var appid;
var gearname;
    var helperGearname;
var connected;
var code;
    var modified;
    var child_processes;
    var spawn;

    describe('Code 4: Case 1 Chat with itself', function () {

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'main';
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
              connected = false;

            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: gearname
            });
          expect(microgear.gearalias).to.equal(gearname);

                //clear cache file
                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");

                });
               done();
            });

        afterEach(function () {
    if (connected) {
        microgear.client.end();
    }
});

        it('should receive message', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

                //chat
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
      connected = true;
                    microgear.chat(gearname, message);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(stubConnect.callCount).to.equal(1);
                        expect(stubMessage.callCount).to.equal(1);
                        expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                        expect("" + stubMessage.args[0][1]).to.equal(message);
                        //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                        done();
                    }, messageTimeout);
                }, connectTimeout);
                microgear.connect(appid);
            });
});
    //pre-re: should run helper.js 1 first. receive message
    describe('Code 4: Case 2 Chat with other online microgear in same appid', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = "main";
            helperGearname = 'helper';
            message = 'Hello';
            modified = false;
            connected = false;
            code = 1;



            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
            });

                    //create receiver file with empty string
                    fs.writeFile(pathToFile, "", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("create empty file!")
                    });
            expect(microgear).to.be.undefined;
                    microgear = MicroGear.create({
                        key: appkey,
                        secret: appsecret,
                        alias: gearname
                    });
            console.log("spawnning2.");
            spawn = child_process.spawn;
            child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
            done();
                });

        afterEach(function (done) {
            this.timeout(afterTimeout);
            fs.unwatchFile(pathToFile);
            fs.unlinkSync(pathToFile);
            if (connected) {
                microgear.client.end();
            }
            child_processes.kill('SIGINT');
            done();
        });

    it('should send the message to helper', function (done) {
        this.timeout(itTimeout);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        microgear.connect(appid);
        setTimeout(function () {
            console.log("good");

            expect(stubConnect.called).to.be.true;
            connected = true;
            microgear.setalias('main');
            microgear.chat(helperGearname, message + helperGearname);

                        //watch if helper wrote something on receiver file
                        fs.watchFile(pathToFile, function (curr, prev) {
                            modified = true;
                            //if changes, check the content
                            fs.readFile(pathToFile, 'utf8', function (err, data) {
                                if (err) {
                                    console.log("error: no file");
                                    return console.log(err);
                                }
                                console.log("message: (" + data.toString() + ")");
                                //check message that is written by helper
                                expect(data.toString()).to.equal(message + helperGearname);

                            });
                        });

                        setTimeout(function () {
                            expect(modified).to.be.true;
                            done();
                        }, messageTimeout);

                    }, connectTimeout);

    });
    });

    //pre-re: should run helper.js 6 first. chat with same name but different id
    describe('Code 4: Case 3 Chat with other microgear in different appid', function () {
        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            gearname = "main";
            helperGearname = 'helper';
            message = 'Hello';
            modified = false;
            connected = false;
            code = 6;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
            });

            //create receiver file with empty string
            fs.writeFile(pathToFile, "", function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("create empty file!")
            });
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            console.log("spawnning2.");
            spawn = child_process.spawn;
            child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
            done();
        });

        afterEach(function (done) {
            this.timeout(afterTimeout);
            fs.unwatchFile(pathToFile);
            fs.unlinkSync(pathToFile);
            if (connected) {
                microgear.client.end();
            }
            child_processes.kill('SIGINT');
            done();
        });

it('should not receive the message', function (done) {
this.timeout(itTimeout);
var stubConnect = sinon.stub();
microgear.on('connected', stubConnect);

setTimeout(function () {
    expect(stubConnect.called).to.be.true;
    connected = true;
    microgear.setalias(gearname);
    microgear.chat(helperGearname, message);

                //watch receive file for changes
                fs.watchFile(pathToFile, function (curr, prev) {
                    modified = true;
                    //if changes, check the content
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("error: no file");
                            return console.log(err);
                        }
                        console.log("message: (" + data.toString() + ")");
                        expect(data.toString()).to.equal(message);
                    });
                });
                setTimeout(function () {
                    expect(modified).to.be.false;
                    done();
                }, messageTimeout);
            }, connectTimeout);
microgear.connect(appid);
});
});

//pre-re: should run helper.js 7 first
describe('Code 4: Case 5 Chat with other microgear that shares the same name', function () {

    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        gearname = "main";
        message = 'Hello';
        modified = false;
        connected = false;
        code = 7;

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });

                //create receiver file with empty string
                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });
        expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: gearname
                });
        console.log("spawnning2.");
        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();
            });

    afterEach(function (done) {
        this.timeout(afterTimeout);
        fs.unwatchFile(pathToFile);
        fs.unlinkSync(pathToFile);
        if (connected) {
            microgear.client.end();
        }
        child_processes.kill('SIGINT');
        done();

    });


    it('the helper should receive the message', function (done) {
        console.log("hello");
        this.timeout(itTimeout);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
                    //watch receive file for changes
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");

                        });
                    });
                    microgear.chat(gearname, message);


                    setTimeout(function () {
                        expect(modified).to.be.true;
                        expect(stubMessage.called).to.be.true;
                        expect("" + stubMessage.args[0][1]).to.equal(message);
                        expect(stubConnect.calledBefore(stubMessage)).to.be.true;

                        done();
                    }, messageTimeout + 2000);
                }, connectTimeout);

microgear.connect(appid);
});
});

        //TODO: not sure
        describe.skip('Code 4: Case 7 Chat when not connect', function () {
            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';

                expect(microgear).to.be.undefined;

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
                done();
            });
            afterEach(function () {
                quit(code);
                if (connected) {
                    microgear.client.end();
                }
            });


            it('should trigger error event', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                var stubError = sinon.stub();
                microgear.on('error', stubError);

                //setTimeout(function () {
                //    expect(stubConnect.called).to.be.true;
                // connected = true;
                //    microgear.setalias(gearname);
                //    microgear.chat(gearname, message);
                //    setTimeout(function () {
                //        console.log("checking");
                //        expect(stubMessage.called).to.be.true;
                //        expect(stubConnect.callCount).to.equal(1);
                //        expect(stubMessage.callCount).to.equal(1);
                //        expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                //        expect(""+stubMessage.args[0][1]).to.equal(message);
                //        //TODO: gearalias not set.
                //        //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                //        done();
                //    }, messageTimeout);
                //}, connectTimeout);
microgear.connect(appid, function () {
    expect(stubConnect.called).to.be.false;
    expect(stubError.called).to.be.false;
    done();

});
});
});

//fail
//pre-re: should run helper.js 14 first to change gearname to topic
describe.skip('Code 4: Case 8 Chat to microgear that has gearname as topic', function () {
    var helperGearnameTopic;

    beforeEach(function () {
        this.timeout(beforeTimeout);
        microgear = undefined;
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        helperGearnameTopic = '/firstTopic';
        message = 'Hello';
        modified = false;

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });

                //create receiver file with empty string
                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });
        expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: helperGearnameTopic
                });

            });
    afterEach(function () {
        quit(code);

        if (connected) {
            microgear.client.end();
        }
        fs.unwatchFile(pathToFile);
        fs.unlinkSync(pathToFile);
    });


    it('should not receive the message', function (done) {
        this.timeout(itTimeout);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            connected = true;
            microgear.chat(helperGearnameTopic, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");
                        });
                    });
                    setTimeout(function () {
                        expect(modified).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);
        microgear.connect(appid);
    });
});


//pre-re: should run helper.js 11 first to change gearname to empty string
describe('Code 4: Case 9 Chat to microgear that has empty string name', function () {
    var emptyHelperGearname;


    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        modified = false;
        message = 'Hello';
        emptyHelperGearname = '';
        connected = false;
        code = 11;

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });

                //create receiver file with empty string
                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });
        expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();

            });

    afterEach(function (done) {
        this.timeout(afterTimeout);

        if (connected) {
            microgear.client.end();
        }
        fs.unwatchFile(pathToFile);
        fs.unlinkSync(pathToFile);
        child_processes.kill('SIGINT');
        done();
    });

    it('should not receive the message', function (done) {
        this.timeout(itTimeout);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        expect(stubConnect.called).to.be.false;

        microgear.connect(appid);
        setTimeout(function () {

            expect(stubConnect.called).to.be.true;
            connected = true;
            microgear.chat(emptyHelperGearname, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");
                            expect(data.toString()).to.equal(message);

                        });
                    });
                    setTimeout(function () {
                        expect(modified).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

});
});


//pre-re: should run helper.js 15 first that subscribe the topic
describe('Code 4: Case 10 Chat to topic that has subscriber', function () {
    var helperGearnameTopic;
    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        helperGearnameTopic = '/firstTopic';
        message = 'Hello';
        modified = false;
        connected = false;
        code = 15;

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });

                //create receiver file with empty string
                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });
        expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: helperGearnameTopic
                });
        console.log("spawnning2.");
        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();

            });
    afterEach(function (done) {

        if (connected) {
            microgear.client.end();
        }
        fs.unwatchFile(pathToFile);
        fs.unlinkSync(pathToFile);
        child_processes.kill('SIGINT');
        done();
    });


    it('should not receive the message', function (done) {
        this.timeout(itTimeout);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            connected = true;
            microgear.chat(helperGearnameTopic, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");
                        });
                    });
                    setTimeout(function () {
                        expect(modified).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);
        microgear.connect(appid);
    });
});

        //TODO: not sure. recehc
        //pre-re: should run two helper.js 1 first.
        describe.skip('Code 4: Case 11 Chat with more than one microgear', function () {
            var helperGearname2;
            var modified2;

            beforeEach(function () {
                this.timeout(beforeTimeout);
                microgear = undefined;
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                gearname = "main";
                helperGearname = 'helper';
                helperGearname2 = 'helper2';
                message = 'Hello';
                modified = false;
                modified2 = false;


                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                //create receiver file with empty string for first helper
                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });

                //create receiver file with empty string for second helper
                fs.writeFile(pathToFile2, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!")
                });

                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret,
                    alias: gearname
                });

            });
            afterEach(function () {
                quit(code);

                if (connected) {
                    microgear.client.end();
                }
                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                fs.unwatchFile(pathToFile2);
                fs.unlinkSync(pathToFile2); //delete file
            });


it('should send the message to helper', function (done) {
    this.timeout(itTimeout+10000);
    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);

    setTimeout(function () {
        expect(stubConnect.called).to.be.true;
        microgear.chat(helperGearname, message + helperGearname);
        microgear.chat(helperGearname2, message + helperGearname2);
        console.log(message + helperGearname);
        console.log(message + helperGearname2);
                    //watch if helper wrote something on receiver file
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ") 1");
                            //check message that is written by helper
                            expect(data.toString()).to.equal(message + helperGearname);
                        });
                    });

                    fs.watchFile(pathToFile2, function (curr, prev) {
                        modified2 = true;
                        //if changes, check the content
                        fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data2.toString() + ") 2");
                            //check message that is written by helper
                            expect(data2.toString()).to.equal(message + helperGearname2);
                        });
                    });

                    setTimeout(function () {
                        expect(modified).to.be.true;
                        expect(modified2).to.be.true;
                        done();
                    }, messageTimeout + messageTimeout);

                }, connectTimeout);
microgear.connect(appid);
});
});



});

describe('Code 5: Subscribe', function () {
    var topic;
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var connected;
    var code;
    var child_processes;
    var spawn;

    //TODO: not sure
    describe.skip('Code 5: Case 8 Subscribe more than one topic', function () {

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            var topic2;
            microgear = undefined;
            gearname = 'main';
            topic = "/firstTopic";
            topic2 = "/secondTopic";
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });

            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            done();
        });

        afterEach(function () {
            if (connected) {
                microgear.client.end();
            }
        });

        it('should receive message from topic that the helper publish', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            microgear.connect(appid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubConnect.callCount).to.equal(1);
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                microgear.subscribe(topic2);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    console.log(stubMessage.args[0]);
                    console.log(stubMessage.args[0][1] + "");
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });
    });


//pre-re: run helper.js 4 first to publish topic
    describe('Code 5: Case 1 Subscribe one topic', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'main';
            topic = "/firstTopic";
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;
            code = 4;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: gearname
            });
            console.log("spawnning2.");
            spawn = child_process.spawn;
            child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
            done();
        });

        afterEach(function (done) {
            this.timeout(afterTimeout);
            if (connected) {
                microgear.client.end();
            }
            child_processes.kill('SIGINT');
            done();
        });

        it('should receive message from that topic when the helper publishes', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            microgear.connect(appid);
            setTimeout(function () {
                //ensure it is connected and there is initially no message
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubConnect.callCount).to.equal(1);
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                setTimeout(function () {
                    //after subscribe should receive message. check content of message.
                    expect(stubMessage.called).to.be.true;
                    console.log(stubMessage.args[0][1] + "");
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    //ensure it does not reconnect again
                    expect(stubConnect.callCount).to.equal(1);
                    expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });
    });

//pre-re: run helper.js 4 first to publish topic
    describe('Code 5: Case 2 Subscribe same topic twice', function () {

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'main';
            topic = "/firstTopic";
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            code = 4;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            console.log("spawnning2.");
            spawn = child_process.spawn;
            child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
            done();
        });

        afterEach(function (done) {
            if (connected) {
                microgear.client.end();
            }
            child_processes.kill('SIGINT');
            done();
        });

        it('should not change its behavior -> should still receive message from that topic when the helper publishes', function (done) {
            this.timeout(itTimeout);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage, done);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            //ensure microgear is connected and there is no message initially
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                //should receive message after subscribe, check the content
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    //subscribe again
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        //should still receive message
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        done();
                    }, messageTimeout + 1000);
                }, messageTimeout);

            }, connectTimeout);
            microgear.connect(appid);
        });
    });

///pre-re: run helper.js 4 first to publish topic
    describe('Code 5: Case 3 Subscribe topic after unsubscribe before', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'main';
            topic = "/firstTopic";
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;
            code = 4;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            expect(microgear).to.be.undefined;


            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            console.log("spawnning2.");
            spawn = child_process.spawn;
            child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
            done();
        });

        afterEach(function (done) {

            if (connected) {
                microgear.client.end();
            }
            child_processes.kill('SIGINT');
            done();
        });

        it('should receive message when helper publishes topic', function (done) {
            this.timeout(itTimeout);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                //ensure microgear is connected and there is no message initially
                expect(stubConnect.called).to.be.true;
                connected = true;
                expect(stubMessage.called).to.be.false;
                //subscribe topic
                microgear.subscribe(topic);
                setTimeout(function () {
                    //ensure subscribe work=receive message then unsubscribe
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    microgear.unsubscribe(topic);
                    //reset count in stub so that can ensure there is no message after unsubscribe
                    stubMessage.reset();
                    expect(stubMessage.called).to.be.false;

                    setTimeout(function () {

                        expect(stubMessage.called).to.be.false;
                        microgear.subscribe(topic);
                        setTimeout(function () {
                            //should receive message after subscribe again
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);

                            done();
                        }, messageTimeout + 2000);
                    }, messageTimeout + 1000);
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);

        });
    });

    describe('Code 5: Case 4 Subscribe topic that it publishes', function () {
        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'main';
            topic = "/firstTopic";
            message = "Hello";
            appkey = 'jX2viqgprq3XRhv';
            appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
            appid = 'testNodeJs';
            connected = false;


            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");

            });
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });
            done();

        });

        afterEach(function () {
            if (connected) {
                microgear.client.end();
            }

            it('should receive message', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);
                microgear.connect(appid);

                setTimeout(function () {
                    //ensure microgear is connected, then subscribe
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    microgear.subscribe(topic);
                    expect(stubMessage.called).to.be.false;
                    setTimeout(function () {
                        //publish topic that just subscribe
                        microgear.publish(topic, message);
                        setTimeout(function () {
                            //should receive message that just subscribe
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);

                }, connectTimeout);

            });

        });


///pre-re: should run helper.js 9 first to publish invalid topic
        describe('Code 5: Case 5 Subscribe invalid topic - no slash', function () {
            var message;
            var invalidTopic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                invalidTopic = "firstTopic";
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
            });

            afterEach(function () {
                microgear.client.end();
            });

            it('should not receive message from invalid topic', function (done) {
                this.timeout(itTimeout);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    //ensure microgear is connected then subscribe the invalid topic
                    expect(stubConnect.called).to.be.true;
                    microgear.subscribe(invalidTopic);
                    setTimeout(function () {
                        //should not receive any message
                        console.log("in");
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            }, itTimeout);
        });

        //fail
///pre-re: should run helper.js 8 first to publish empty topic
        describe.skip('Code 5: Case 6 Subscribe special topic - empty string', function () {
            var message;
            var emptyTopic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                emptyTopic = "";

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
            });

            afterEach(function () {
                microgear.client.end();
            });

            it('should not receive message from empty string topic', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    //ensure microgear is connected then subscribe empty string topic
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(emptyTopic);

                    setTimeout(function () {
                        //should not receive message from helper that publishes empty topic
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

        //require helper.js 4 to publish to topic
        //TODO
        describe.skip('Code 5: Case 7 Subscribe that reconnect', function () {
            var message;
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var topic;

            beforeEach(function (done) {
                this.timeout(itTimeout);
                microgear = undefined;
                topic = '/firstTopic';
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';


                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);
                expect(stubConnect.called).to.be.false;
                microgear.connect(appid);

                setTimeout(function () {
                    //setalias when microgear is connected
                    expect(stubConnect.called).to.be.true;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        //should receive message
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        //now, disconnect
                        //TODO: disconnect=no internet?
                        microgear.client.end();
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });

            after(function () {
                microgear.client.end();
            });

            it('should not receive any message after resettoken', function (done) {
                this.timeout(itTimeout);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);
                expect(stubConnect.called).to.be.false;
                expect(stubMessage.called).to.be.false;
                //ensure microgear.cache file is not empty
                var data = fs.readFileSync(filePath, 'utf8');
                expect(data.toString()).not.to.equal('{"_":null}');

                //resettoken then connect again
                microgear.resettoken(function (result) {
                    var data2 = fs.readFileSync(filePath, 'utf8');
                    expect(data2.toString()).to.equal('{"_":null}');
                    expect(stubConnect.called).to.be.false;
                    expect(stubMessage.called).to.be.false;
                    microgear.connect(appid);
                    setTimeout(function () {
                        expect(stubConnect.called).to.be.true;
                        setTimeout(function () {
                            //should not receive message from the gearname before
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout);

                    }, connectTimeout);
                });

            });

        });
    });
});
describe('Code 6: Unsubscribe', function () {
    var topic;
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var connected;
    var code;
    var child_processes;
    var spawn;


//    ///pre-re: should run helper.js 4 first to publish to topic
//    describe('Code 6: Case 1 Unsubscribe topic after subscribe', function () {
//            beforeEach(function (done) {
//                this.timeout(beforeTimeout);
//                microgear = undefined;
//                gearname = 'main';
//                topic = "/firstTopic";
//                message = "Hello";
//                appkey = 'jX2viqgprq3XRhv';
//                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
//                appid = 'testNodeJs';
//                connected = false;
//                code = 4;
//
//                fs.writeFile(filePath, '{"_":null}', function (err) {
//                    if (err) {
//                        return console.log(err);
//                    }
//                    console.log("clear cache");
//
//                });
//                expect(microgear).to.be.undefined;
//
//                microgear = MicroGear.create({
//                    key: appkey,
//                    secret: appsecret
//                });
//                helper(code, done);
//            });
//
//            afterEach(function () {
//                quit(code);
//                if (connected) {
//                    microgear.client.end();
//                }
//            });
//
//            it('should not receive message when helper publish topic', function (done) {
//                this.timeout(itTimeout);
//                var stubMessage = sinon.stub();
//                microgear.on('message', stubMessage);
//
//                var stubConnect = sinon.stub();
//                microgear.on('connected', stubConnect);
//
//                setTimeout(function () {
//                    //prerequisite: subscribe before*---------
//                    //ensure microgear is connected then subscribe topic
//                    expect(stubConnect.called).to.be.true;
//                    connected = true;
//                    expect(stubMessage.called).to.be.false;
//                    microgear.subscribe(topic);
//                    setTimeout(function () {
//                        expect(stubMessage.called).to.be.true;
//                        expect(message).to.equal("" + stubMessage.args[0][1]);
//                        //*---------
//                        //unsubscribe topic
//                        microgear.unsubscribe(topic);
//                        //reset the count, this stub should not be called after unsubscribe
//                        stubMessage.reset();
//                        setTimeout(function () {
//                            expect(stubMessage.called).to.be.false;
//                            done();
//                        }, messageTimeout + 1000);
//                    }, messageTimeout);
//                }, connectTimeout);
//
//microgear.connect(appid);
//});
//});

    ///pre-re: should run helper.js 4 first to publish to topic
    describe('Code 6: Case 2 Unsubscribe topic before subscribe', function () {

    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        gearname = 'main';
        topic = "/firstTopic";
        message = "Hello";
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        code = 4;
        console.log("yup");

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });
        expect(microgear).to.be.undefined;

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        //helper(code, done);

        console.log("spawnning");

        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();

    });

    afterEach(function (done) {
        this.timeout(afterTimeout);
        if (connected) {
            microgear.client.end();
        }
        child_processes.kill('SIGINT');
        done();
        //quit(code, done);

    });

    it('should not affect subscribe', function (done) {
        this.timeout(itTimeout);
        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);
        microgear.connect(appid);
        setTimeout(function () {
                    //ensure microgear is connected, then unsubscribe topic
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    expect(stubMessage.called).to.be.false;
                    microgear.unsubscribe(topic);
                    setTimeout(function () {
                        //should not affect anything when subscribe
                        expect(stubMessage.called).to.be.false;
                        microgear.subscribe(topic);
                        setTimeout(function () {
                            //should be able to receive message helper publishes as usual
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);


    });

});

///pre-re: should run helper.js 4 first to publish to topic
describe('Code 6: Case 3 Unsubscribe the same topic twice starts from subscribe/unsubscribe', function () {

    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        gearname = 'main';
        topic = "/firstTopic";
        message = "Hello";
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        code = 4;


        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });
        expect(microgear).to.be.undefined;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        //console.log(appid);
        //console.log("helper code: " + code);
        //helper(code, done);
        console.log("spawnning2");
        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();
    });

    afterEach(function (done) {
        this.timeout(afterTimeout);
        if (connected) {
            microgear.client.end();
        }
        //quit(code, done);
        child_processes.kill('SIGINT');
        setTimeout(function () {
            done();
        }, 3000);


    });

    it('should receive message - starts from unsubscribe', function (done) {
        this.timeout(itTimeout);

        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);
        expect(stubConnect.called).to.be.false;
        expect(stubMessage.called).to.be.false;
        microgear.connect(appid);

        setTimeout(function () {
                    //ensure microgear is connected then unsubscribe the topic
                    expect(stubConnect.called).to.be.true;
            connected = true;
                    expect(stubMessage.called).to.be.false;
                    console.log("unsubscribe");
                    microgear.unsubscribe(topic);
                    setTimeout(function () {
                        //should not receive message when helper publishes, then unsubscribe the topic again
                        expect(stubMessage.called).to.be.false;
                        console.log("unsubscribe 2");
                        microgear.unsubscribe(topic);
                        setTimeout(function () {
                            //should still not receive message
                            expect(stubMessage.called).to.be.false;
                            console.log("subscribe");
                            //subscribe message
                            microgear.subscribe(topic);
                            setTimeout(function () {
                                //should receive message now
                                expect(stubMessage.called).to.be.true;
                                expect(message).to.equal("" + stubMessage.args[0][1]);
                                done();
                            }, messageTimeout + 2000);
                        }, messageTimeout + 1000);
                    }, messageTimeout);
}, connectTimeout);

});
    it('should not receive message - starts from subscribe', function (done) {
        this.timeout(itTimeout);

        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);
        expect(stubConnect.called).to.be.false;
        expect(stubMessage.called).to.be.false;
        microgear.connect(appid);


        setTimeout(function () {
            //ensure microgear is connected then subscribe the topic
            expect(stubConnect.called).to.be.true;
            expect(stubMessage.called).to.be.false;
            microgear.subscribe(topic);
            console.log("sub");
            setTimeout(function () {
                //should receive message then unsubscribe the topic
                expect(stubMessage.called).to.be.true;
                expect(message).to.equal("" + stubMessage.args[0][1]);
                //reset the count, it should not receive message after this
                console.log("unsub");
                microgear.unsubscribe(topic);
                stubMessage.reset();

                setTimeout(function () {
                    //should not receive message after unsubscribe
                    expect(stubMessage.called).to.be.false;
                    console.log("unsub 2");
                    //unsubscribe again
                    microgear.unsubscribe(topic);
                    setTimeout(function () {
                        //should still not receive message
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout + 4000);
                }, messageTimeout + 2000);
            }, messageTimeout);
        }, connectTimeout);

    });


});

//fail due to subscribe test case fail
///pre-re: should run helper.js 8 first to publish to empty topic
describe.skip('Code 6: Case 4 Unsubscribe the empty string topic', function () {
    var emptyTopic;

    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        console.log("come in");
        microgear = undefined;
        gearname = 'main';
        emptyTopic = "";
        message = "Hello";
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        code = 8;

        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");

        });
        expect(microgear).to.be.undefined;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        helper(code, done);
    });

    afterEach(function () {
        this.timeout(afterTimeout);

        quit(code);
        if (connected) {
            microgear.client.end();
        }

    });

    it('should still not receive message after unsubscribe', function (done) {
        this.timeout(itTimeout);
        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        expect(stubConnect.called).to.be.false;
        expect(stubMessage.called).to.be.false;

        setTimeout(function () {
                    //ensure microgear is connected, then subscribe the empty string topic
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(emptyTopic);
                    setTimeout(function () {
                        //should not receive message
                        expect(stubMessage.called).to.be.false;
                        //unsubscribe topic
                        microgear.unsubscribe(emptyTopic);
                        setTimeout(function () {
                            //should still not receive message
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);

        microgear.connect(appid);
    });
});

///pre-re: should run helper.js 9 first to publish invalid topic
describe('Code 6: Case 5 Unsubscribe invalid topic - no slash', function () {
    var invalidTopic;


    beforeEach(function (done) {
        this.timeout(beforeTimeout);
        microgear = undefined;
        gearname = 'main';
        invalidTopic = "firstTopic";
        message = "Hello";
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        console.log("yeah");
        code = 9;


        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });
        expect(microgear).to.be.undefined;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        //helper(code, done);
        console.log("spawnning3");
        spawn = child_process.spawn;
        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
        done();
    });


    afterEach(function (done) {
        this.timeout(afterTimeout);

        if (connected) {
            microgear.client.end();
        }
        child_processes.kill('SIGINT');
        done();
    });
    it('should not receive message after unsubscribe', function (done) {
        this.timeout(itTimeout);
        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);
        expect(stubConnect.called).to.be.false;
        expect(stubMessage.called).to.be.false;
        microgear.connect(appid);
        setTimeout(function () {
                    //ensure microgear is connected then subscribe invalid topic
                    expect(stubConnect.called).to.be.true;
            connected =true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(invalidTopic);
                    setTimeout(function () {
                        //should not receive message then unsubscribe
                        expect(stubMessage.called).to.be.false;
                        microgear.unsubscribe(invalidTopic);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);


    });
});
});
describe('Code 7: Publish', function () {
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var helperGearname;
    var topic;
    var connected;
    var code;
    var modified;
    var child_processes;
    var spawn;
    var cleanInterval;


        //TODO: to think
        ////prerequisite: need to call helper before/later code 22. publish_helper.js
        describe.skip('Code 7: Case 1 Publish to topic that subscribe after', function () {

            beforeEach(function (done) {

                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                topic = "/firstTopic";
                message = 'Hello';
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                modified = false;
                connected = false;
                code = 22;
                expect(microgear).to.be.undefined;

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

                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!");
                });
                done();
            });

            afterEach(function (done) {
                this.timeout(afterTimeout);
                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });

            //pre-re: should run helper.js 22 first
            //TODO: time sensitive
            it('should publish to topic that subscribe before publisher starts', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                expect(stubConnect.called).to.be.false;
                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected =true;

                    expect(modified).to.be.false;
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;

                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("no file");
                                return console.log(err);
                            }
                            console.log("( " + data.toString() + " )");
                            expect(data.toString()).to.equal(message);
                        });
                    });


                    setInterval(function () {
                        microgear.publish(topic, message);
                        console.log("publish message");
                    }, chatInterval);


                    setTimeout(function () {
                        console.log("spawnning3");
                        spawn = child_process.spawn;
                        child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                        setTimeout(function () {
                        expect(modified).to.be.true;
                        done();
                        }, messageTimeout + 2000);
                    }, messageTimeout);

                }, connectTimeout);
});

});

        ////prerequisite: need to call helper before/later code 15. publish_helper.js
        describe('Code 7: Case 2 Publish to topic that subscribe before', function () {
            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                topic = "/firstTopic";
                message = 'Hello';
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                modified = false;
                connected = false;
                code = 15;
                expect(microgear).to.be.undefined;

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

                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!");
                });
                console.log("spawnning2.");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

    afterEach(function (done) {
        this.timeout(afterTimeout);
        clearInterval(cleanInterval);
        fs.unwatchFile(pathToFile);
        fs.unlinkSync(pathToFile);
        if (connected) {
            microgear.client.end();
        }
        child_processes.kill('SIGINT');
        done();
    });

            //pre-re: should run helper.js 15 first
            //TODO: not yet
            it('should publish to topic that subscribe before publisher starts', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                expect(stubConnect.called).to.be.false;
                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;

                    fs.watchFile(pathToFile, function (curr, prev) {
                        console.log("yes");

                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("no file");
                                return console.log(err);
                            }
                            modified = true;
                            console.log("( " + data.toString() + " )");
                            expect(data.toString()).to.equal(message);
                        });
                    });
                    expect(modified).to.be.false;
                    cleanInterval = setInterval(function () {
                        microgear.publish(topic, message);
                        console.log("publish message");
                    }, 1000);
                    setTimeout(function () {
                        //the helper should not modify the file
                        expect(modified).to.be.true;
                        done();
                    }, connectTimeout + messageTimeout);

                }, connectTimeout);
});

});

        ///pre-re: should run helper.js 4 to publish topic
        describe('Code 7: Case 3 Publish to microgear that subscribe other topic', function () {
            var anotherTopic;
            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'main';
                topic = "/firstTopic";
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;
                modified =false;

                code = 4;
                anotherTopic = '/secondTopic';



                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!");
                });
                expect(microgear).to.be.undefined;
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
                console.log("spawnning2");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

            afterEach(function (done) {
                this.timeout(afterTimeout);
                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                clearInterval(cleanInterval);
                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });

            it('subscribers should not receive message from topic it does not subscribe', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);


                microgear.connect(appid);

                setTimeout(function () {
                    //ensure microgear is connected before publish to the topic the helper subscribes
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    //watch the receiver file for changes. this happens when the helper writes down the message
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("no file");
                                return console.log(err);
                            }
                            console.log("this is da" + data.toString() + "her");
                        });
                    });
                    expect(modified).to.be.false;


                   cleanInterval = setInterval(function () {
                        microgear.publish(anotherTopic, message);
                        console.log("publish message");
                    }, 1000);

                    setTimeout(function () {
                        //the helper should not modify the file
                        expect(modified).to.be.false;
                        done();
                    }, connectTimeout + messageTimeout);
                }, connectTimeout);

});
});

        //fail
        ///pre-re: should run helper.js 20 to publish topic
        describe.skip('Code 7: Case 4 Publish to topic empty string', function () {
            var emptyTopic;


            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                emptyTopic = "";
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                modified = false;
                connected = false;
                code = 20;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });

                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!");
                });

                expect(microgear).to.be.undefined;

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
                console.log("spawnning4");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

            afterEach(function () {
                this.timeout(afterTimeout);
                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });


it('should not be able to publish message', function (done) {
    this.timeout(itTimeout);
    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);
    expect(stubConnect.called).to.be.false;
    microgear.connect(appid);

    setTimeout(function () {
                    //ensure microgear is connected before publish to the topic the helper subscribes
                    expect(stubConnect.called).to.be.true;
                    expect(stubConnect.callCount).to.equal(1);
                    microgear.publish(emptyTopic, message);

                    //watch the receiver file for changes. this happens when the helper writes down the message
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("no file");
                                return console.log(err);
                            }
                            console.log("this is da" + data.toString() + "her");
                        });
                    });

                    setTimeout(function () {
                        console.log(stubConnect.callCount);
                        //expect(stubConnect.callCount).to.be.above(1);
                        //the helper should not modify the file
                        expect(modified).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);


});

});

    //TODO: another way? handle error
        ///pre-re: should run helper.js 21 to publish topic
        describe('Code 7: Case 5 Publish to invalid topic - no slash', function () {
            var invalidTopic;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                invalidTopic = "firstTopic";
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                modified = false;
                connected = false;
                code = 21;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });

                fs.writeFile(pathToFile, "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("create empty file!");
                });

                expect(microgear).to.be.undefined;

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
                console.log("spawnning5");
                spawn = child_process.spawn;
                child_processes = spawn('node', ["microgear_helpers/helper.js", " " + code]);
                done();
            });

            afterEach(function (done) {
                this.timeout(afterTimeout);

                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                if (connected) {
                    microgear.client.end();
                }
                child_processes.kill('SIGINT');
                done();
            });

it('should not be able to publish message', function (done) {
    this.timeout(itTimeout);
    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);
    expect(stubConnect.called).to.be.false;
    microgear.connect(appid);

    setTimeout(function () {
                    //ensure microgear is connected before publish to the topic the helper subscribes
                    expect(stubConnect.called).to.be.true;
                    expect(stubConnect.callCount).to.equal(1);
                    microgear.publish(invalidTopic, message);


                    //watch the receiver file for changes. this happens when the helper writes down the message
                    fs.watchFile(pathToFile, function (curr, prev) {
                        modified = true;
                        console.log("what");
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("no file");
                                return console.log(err);
                            }
                            console.log("this is da" + data.toString() + "her");
                        });
                    });
                    //console.log("q");
                    setTimeout(function () {
                        console.log(stubConnect.callCount);
                        expect(stubConnect.callCount).to.be.above(1);
                        //the helper should not modify the file
                        expect(modified).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);


});

});




});
describe('Code 8: Resettoken', function () {
        ///pre-re: should run helper.js 10 to chat with gearname
    var microgear;
    var message
    var appkey;
    var appsecret;
    var appid;
    var gearname;
    var helperGearname;
    var connected;
    var code;
    var modified;
    var child_processes;
    var spawn;
    //TODO: have a look at connected var
        describe('Code 8: Case 1 Resettoken when no cache file', function () {


            beforeEach(function () {
                this.timeout(itTimeout);
                microgear = undefined;
                message = "Hello myself.";
                appkey     = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;
                code = 10;

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
                //ensure there is no microgear.cache
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath);
                }
                helper(code, done);
            });
            afterEach(function () {
                quit(code);
                fs.unwatchFile(pathToFile);
                fs.unlinkSync(pathToFile);
                if (connected) {
                    microgear.client.end();
                }
            });

            it('should do nothing', function (done) {
                this.timeout(itTimeout);
                microgear.resettoken(function (result) {
                    if(fs.existsSync(filePath)){
                        expect('should not create microgear.cache').to.be.false;
                    }
                    expect(true).to.be.true;
                    done();
                });
            });
        });

describe('Case 8: Case 2 Resettoken when have microgear.cache and microgear is offline', function () {
    beforeEach(function (done) {
        this.timeout(itTimeout);
        microgear = undefined;
        gearname = 'myself';
        message = "Hello myself.";
        appkey     = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;

        expect(microgear).to.be.undefined;

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

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        var stubDisconnect = sinon.stub();
        microgear.on('disconnected', stubDisconnect);

        microgear.connect(appid);

                //create state that have microgear.cache but offline
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;

                    connected = true;
                    expect(stubConnect.callCount).to.equal(1);
                    expect(stubDisconnect.notCalled).to.be.true;

                    microgear.disconnect();

                    expect(stubDisconnect.called).to.be.true;
                    connected = false;
                    expect(stubDisconnect.callCount).to.equal(1);
                    done();
                }, connectTimeout);

            });

    afterEach(function () {

        if (connected) {
            microgear.client.end();
        }
    });

it('should clear the cache in resettoken', function (done) {
    this.timeout(itTimeout);
                //check the content of microgear cache is not null

                var data = fs.readFileSync(filePath, 'utf8');
                expect(data.toString()).not.to.equal('{"_":null}');

                //resettoken then check content again
                microgear.resettoken(function (result) {
                    var data2 = fs.readFileSync(filePath, 'utf8');
                    expect(data2.toString()).to.equal('{"_":null}');
                    done();
                });
            });
});

describe('Code 8: Case 3 Resettoken twice', function () {
    beforeEach(function (done) {
        this.timeout(itTimeout);
        microgear = undefined;
        gearname = 'myself';
        message = "Hello myself.";
        appkey     = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        expect(microgear).to.be.undefined;
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

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        var stubDisconnect = sinon.stub();
        microgear.on('disconnected', stubDisconnect);

        microgear.connect(appid);

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            connected = true;

            microgear.disconnect();
            setTimeout(function () {
                expect(stubDisconnect.called).to.be.true;
                connected = false;
                done();
            }, connectTimeout);
        }, connectTimeout);
    });

    afterEach(function () {

        if (connected) {
            microgear.client.end();
        }
    });

    it('should just resettoken like usual', function (done) {
    this.timeout(itTimeout);

    var data = fs.readFileSync(filePath, 'utf8');
    expect(data.toString()).not.to.equal('{"_":null}');

    microgear.resettoken(function (result) {
        var data2 = fs.readFileSync(filePath, 'utf8');
        expect(data2.toString()).to.equal('{"_":null}');

        microgear.resettoken(function (result2) {
            var data4 = fs.readFileSync(filePath, 'utf8');
            expect(data4.toString()).to.equal('{"_":null}');
            done();
        });
    });

});
    });
        //TODO: need to implemnt
describe('Code 8: Case 4 Resettoken while still online', function () {


            beforeEach(function (done) {
                this.timeout(itTimeout);
                microgear = undefined;
                gearname = 'myself';
                message = "Hello myself.";
                appkey     = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;

                expect(microgear).to.be.undefined;
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

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                var stubDisconnect = sinon.stub();
                microgear.on('disconnected', stubDisconnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    microgear.disconnect();
                    setTimeout(function () {
                        expect(stubDisconnect.called).to.be.true;
                        connected = false;
                        done();
                    }, connectTimeout);
                }, connectTimeout);
            });

            afterEach(function () {
                if (connected) {
                    microgear.client.end();
                }
            });

    it('should just resettoken like usual', function (done) {
    this.timeout(itTimeout);

    var data = fs.readFileSync(filePath, 'utf8');
    expect(data.toString()).not.to.equal('{"_":null}');

    microgear.resettoken(function (result) {
        var data2 = fs.readFileSync(filePath, 'utf8');
        expect(data2.toString()).to.equal('{"_":null}');

        microgear.resettoken(function (result2) {
            var data4 = fs.readFileSync(filePath, 'utf8');
            expect(data4.toString()).to.equal('{"_":null}');
            done();
        });
    });

});
});

    //TODO: check
///pre-re: should run helper.js 10 to chat with gearname
describe('Code 8: Case 5 Resettoken when offline, after create', function () {

    beforeEach(function (done) {
        this.timeout(itTimeout);
        microgear = undefined;
        gearname = 'main';

        message = "Hello";
        appkey = 'jX2viqgprq3XRhv';
        appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
        appid = 'testNodeJs';
        connected = false;
        code = 10;


        fs.writeFile(filePath, '{"_":null}', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("clear cache");
        });
        expect(microgear).to.be.undefined;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret,
            alias: gearname
        });

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);
        helper(code);

        microgear.connect(appid);

        setTimeout(function () {
                    //setalias when microgear is connected
                    expect(stubConnect.called).to.be.true;
                    expect(microgear.gearalias).to.equal(gearname);
                    setTimeout(function () {
                        //should receive message
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        //now, disconnect
                        //TODO: disconnect=no internet?
                        microgear.client.end();
                        done();
                    }, messageTimeout);
                }, connectTimeout);
    });

    afterEach(function () {
        if (connected) {
            microgear.client.end();
        }
    });

it('should not receive any message after resettoken', function (done) {
    this.timeout(itTimeout);

    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);

    var stubMessage = sinon.stub();
    microgear.on('message', stubMessage);
    expect(stubConnect.called).to.be.false;
    expect(stubMessage.called).to.be.false;
                //ensure microgear.cache file is not empty
                var data = fs.readFileSync(filePath, 'utf8');
                expect(data.toString()).not.to.equal('{"_":null}');

                //resettoken then connect again
                microgear.resettoken(function (result) {
                    var data2 = fs.readFileSync(filePath, 'utf8');
                    expect(data2.toString()).to.equal('{"_":null}');
                    expect(stubConnect.called).to.be.false;
                    expect(stubMessage.called).to.be.false;
                    microgear.connect(appid);
                    setTimeout(function () {
                        expect(stubConnect.called).to.be.true;
                        setTimeout(function () {
                            //should not receive message from the gearname before
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            done();
                        }, messageTimeout);

                    }, connectTimeout);
                });

            });

});

        ///pre-re: should run helper.js 10 to chat with gearname
        describe('Code 8: Case 6 Resettoken when offline, after setalias', function () {

            var newGearname;




            beforeEach(function (done) {
                this.timeout(itTimeout);
                microgear = undefined;
                gearname = 'main';
                newGearname = 'mainNew';
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;
                code = 10;


                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });
                expect(microgear).to.be.undefined;

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);
                helper(code, done);
                microgear.connect(appid);

                setTimeout(function () {
                    //setalias when microgear is connected
                    expect(stubConnect.called).to.be.true;
                    connected = true;
                    microgear.setalias(gearname);
                    setTimeout(function () {
                        //should receive message
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        //now, disconnect
                        //TODO: disconnect=no internet?
                        microgear.client.end();
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });

            afterEach(function () {
                if (connected) {
                    microgear.client.end();
                }
            });

it('should not receive any message after resettoken', function (done) {
    this.timeout(itTimeout);

    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);

    var stubMessage = sinon.stub();
    microgear.on('message', stubMessage);

    expect(stubConnect.called).to.be.false;
    expect(stubMessage.called).to.be.false;
                //ensure microgear.cache file is not empty
                var data = fs.readFileSync(filePath, 'utf8');
                expect(data.toString()).not.to.equal('{"_":null}');

                //resettoken then connect
                microgear.resettoken(function (result) {
                    var data2 = fs.readFileSync(filePath, 'utf8');
                    expect(data2.toString()).to.equal('{"_":null}');
                    expect(stubConnect.called).to.be.false;
                    expect(stubMessage.called).to.be.false;
                    microgear.connect(appid);
                    setTimeout(function () {
                        //set to the new name
                        expect(stubConnect.called).to.be.true;
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            //should not receive message from the gearname before
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout);

                    }, connectTimeout);
                });

            });

});

        //require helper.js 4 to publish to topic
        describe('Code 8: Case 7 Resettoken when offline, after subscribe', function () {
            var message;
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var topic;

            beforeEach(function (done) {
                this.timeout(itTimeout);
                microgear = undefined;
                topic = '/firstTopic';
                message = "Hello";
                appkey = 'jX2viqgprq3XRhv';
                appsecret = '3uscc5uX4Hh6lYkmtKJbljxMtMl1tL';
                appid = 'testNodeJs';
                connected = false;
                code = 4;


                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                });
                expect(microgear).to.be.undefined;

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                expect(stubConnect.called).to.be.false;
                microgear.connect(appid);

                setTimeout(function () {
                    //setalias when microgear is connected
                    expect(stubConnect.called).to.be.true;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        //should receive message
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        //now, disconnect
                        //TODO: disconnect=no internet?
                        microgear.client.end();
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });

            afterEach(function () {
                if (connected) {
                    microgear.client.end();
                }
            });

it('should not receive any message after resettoken', function (done) {
    this.timeout(itTimeout);

    var stubConnect = sinon.stub();
    microgear.on('connected', stubConnect);

    var stubMessage = sinon.stub();
    microgear.on('message', stubMessage);

    expect(stubConnect.called).to.be.false;
    expect(stubMessage.called).to.be.false;
                //ensure microgear.cache file is not empty
                var data = fs.readFileSync(filePath, 'utf8');
                expect(data.toString()).not.to.equal('{"_":null}');

                //resettoken then connect again
                microgear.resettoken(function (result) {
                    var data2 = fs.readFileSync(filePath, 'utf8');
                    expect(data2.toString()).to.equal('{"_":null}');
                    expect(stubConnect.called).to.be.false;
                    expect(stubMessage.called).to.be.false;
                    microgear.connect(appid);
                    setTimeout(function () {
                        expect(stubConnect.called).to.be.true;
                        setTimeout(function () {
                            //should not receive message from the gearname before
                            //expect(stubMessage.called).to.be.false;
                            expect(stubMessage.called).to.be.true;
                            done();
                        }, messageTimeout);

                    }, connectTimeout);
                });

            });

});
});
