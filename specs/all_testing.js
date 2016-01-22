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
describe.skip('skip', function(){
    describe('Code 1: Create', function(){
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

        //pre-re: run helper.js 10 first.
        describe('Code 1: Case 4 Create microgear with setalias parameter', function () {
            var microgear;
            var message
            var appkey;
            var appsecret;
            var appid;
            var gearname;

            beforeEach(function (done) {
                microgear = undefined;
                appkey     = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = 'myself';
                message = 'Hello from helper to ';
                expect(microgear).to.be.undefined;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });
            });

            it('should save setalias and receive message', function (done) {
                this.timeout(itTimeout);
                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret,
                    alias : gearname});

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                expect(microgear.gearalias).to.equal(gearname);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message+gearname).to.equal(""+stubMessage.args[0][1]);
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });

            it.skip('should save setalias value and not create value - chat to old', function (done) {
                this.timeout(itTimeout);
                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret,
                    alias : gearname});

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                expect(microgear.gearalias).to.equal(gearname);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message+gearname).to.equal(""+stubMessage.args[0][1]);
                        microgear.setalias("myselfNew");
                        //TODO: gearalias not update value
                        //expect(microgear.gearalias).to.equal("myselfNew");
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

            it.skip('should save setalias value and not create value - chat to new', function (done) {
                this.timeout(itTimeout);
                gearname = "myselfNew";
                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret,
                    alias : gearname});

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);
                expect(microgear.gearalias).to.equal(gearname);

                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.setalias("myself");
                        //TODO: gearalias not save new value
                        //expect(microgear.gearalias).to.equal("myself");
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message+"myself").to.equal(""+stubMessage.args[0][1]);
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

            it.skip('should save only the latest setalias value when setalias more than once', function (done) {
                this.timeout(itTimeout);
                gearname = "myself";
                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret});

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
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.setalias(gearname);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message+gearname).to.equal(""+stubMessage.args[0][1]);
                            microgear.setalias("myselfNew");
                            //TODO: gearalias not save new value, check topic name
                            //expect(microgear.gearalias).to.equal("myself");
                            stubMessage.reset();
                            expect(stubMessage.called).to.be.false;
                            setTimeout(function () {
                                expect(stubMessage.called).to.be.true;
                                expect(message+"myselfNew").to.equal(""+stubMessage.args[0][1]);
                                done();
                            }, messageTimeout+2000);
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);
            });

        });

    });
    describe('Code 2: Connect', function(){
        describe('Code 2: Case 2 Connect microgear when no microgear.cache file', function () {
            var microgear;
            var message
            var appkey;
            var appsecret;
            var appid;
            var gearname;

            beforeEach(function (done) {
                microgear = undefined;
                appkey     = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = 'myself';
                message = 'Hello from helper to ';
                expect(microgear).to.be.undefined;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    fs.unlinkSync(filePath);
                    if(!fs.existsSync(filePath)){
                        expect(true).to.be.true;
                        done();
                    }

                });
            });

            it('should save setalias and receive message', function (done) {
                this.timeout(itTimeout);
                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret});

                expect(microgear).to.be.an('object');
                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubConnect.callCount).to.equal(1);
                    done();
                }, connectTimeout);
            });

        });

        describe('Code 2: Case 1 Connect successfully, valid input', function () {
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

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });

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
                    stubConnect.restore();
                    done();
                }, 4000);
                microgear.connect(appid);
            });
        });

        describe('Code 2: Case 1 Connect unsuccessfully due to invalid input', function () {
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(10000);
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });
            });

            it.skip('should throw error when appkey change its case', function (done) {
                this.timeout(10000);

                var loweredAppkey = appkey.toLowerCase();
                expect(loweredAppkey).to.equal('nlc1b8a3uzpmhoy');

                microgear = MicroGear.create({
                    key: loweredAppkey,
                    secret: appsecret
                });
                expect(microgear.gearkey).to.equal(loweredAppkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);
            });

            it.skip('should throw error when appkey is trimmed', function (done) {
                this.timeout(10000);
                var trimmedGearKey = appkey.substring(0, appkey.length - 2);
                expect(trimmedGearKey).to.equal('NLc1b8a3UZPMh');

                microgear = MicroGear.create({
                    key: trimmedGearKey,
                    secret: appsecret
                });

                expect(microgear.gearkey).to.equal(trimmedGearKey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);

            });

            it.skip('should throw error when appkey is added', function (done) {
                this.timeout(10000);
                var addedGearKey = appkey + "xx";
                expect(addedGearKey).to.equal('NLc1b8a3UZPMhOYxx');

                microgear = MicroGear.create({
                    key: addedGearKey,
                    secret: appsecret
                });

                expect(microgear.gearkey).to.equal(addedGearKey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);
            });

            it.skip('should throw error when uses another appkey', function (done) {
                this.timeout(10000);
                var anotherGearKey = "9O0xiA2lHXz01iE";
                microgear = MicroGear.create({
                    key: anotherGearKey,
                    secret: appsecret
                });

                expect(microgear.gearkey).to.equal(anotherGearKey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);



            });

            it.skip('should throw error when appsecret is trimmed', function (done) {
                this.timeout(10000);
                var trimmedGearSecret = appsecret.substring(0, appsecret.length - 2);


                expect(trimmedGearSecret).to.equal('tLzjQQ6FiGUhOX1LTSjtVKsnSExu');
                microgear = MicroGear.create({
                    key: appkey,
                    secret: trimmedGearSecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(trimmedGearSecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);

            });

            it.skip('should throw error when appsecret is added', function (done) {
                this.timeout(10000);
                var addedGearSecret = appsecret + "xx";

                expect(addedGearSecret).to.equal('tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7xx');

                microgear = MicroGear.create({
                    key: addedGearSecret,
                    secret: appsecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(addedGearSecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);
            });

            it.skip('should throw error when appsecret change its case', function (done) {
                this.timeout(10000);
                var loweredGearSecret = appsecret.toLowerCase();

                expect(loweredGearSecret).to.equal('tLzjqq6figuhox1ltsjtvksnsexux7xx');
                microgear = MicroGear.create({
                    key : appkey,
                    secret : loweredGearSecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(loweredGearSecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);
            });

            it.skip('should throw error when uses another appsecret', function (done) {
                this.timeout(10000);

                var anotherGearSecret = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";

                microgear = MicroGear.create({
                    key: appkey,
                    secret: anotherGearSecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(anotherGearSecret);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                microgear.connect(appid, function(){
                    isConnected = true;
                });

                setTimeout(function () {
                    expect(isConnected).to.be.true;
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.true;
                    expect(stubConnect.calledBefore(stubError)).to.be.true;
                    done();
                }, 3000);
            });

            it('should throw error when appid change its case', function (done) {

                fs.readFile(filePath, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(data);
                });

                this.timeout(10000);

                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var loweredAppid = appid.toLowerCase();
                expect(loweredAppid).to.equal('testnodejs');

                var stubConnect2 = sinon.spy();
                microgear.on('connected', stubConnect2);

                console.log(stubConnect2.callCount + 'a');
                microgear.connect(loweredAppid);
                console.log(stubConnect2.callCount + 's');
                setTimeout(function () {
                    console.log(stubConnect2.callCount + 'z');
                    expect(stubConnect2.called).to.be.false;

                    done();
                }, 3000);
            });

            it('should throw error when appid is trimmed', function (done) {
                this.timeout(10000);

                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var trimmedAppId = appid.substring(0, appid.length - 2);
                expect(trimmedAppId).to.equal('testNode');

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                microgear.connect(trimmedAppId);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.false;
                    done();
                }, 3000);
            });

            it('should throw error when appid is added', function (done) {
                this.timeout(10000);

                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var addedAppId = appid + "xx";
                expect(addedAppId).to.equal('testNodeJsxx');

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                microgear.connect(addedAppId);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.false;
                    done();
                }, 3000);
            });

            it('should throw error when uses another appsecret', function (done) {
                this.timeout(10000);

                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret
                });

                expect(microgear.gearkey).to.equal(appkey);
                expect(microgear.gearsecret).to.equal(appsecret);

                var anotherAppId = "testNodeJsHelper";
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                microgear.connect(anotherAppId);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.false;
                    done();
                }, 3000);
            });

        });
    });
    describe('Code 3: Setalias', function(){

        describe('Code 3: Case 1 setalias', function () {
            var microgear;
            var message;
            var message2;
            var appkey = 'NLc1b8a3UZPMhOY';
            var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
            var appid = 'testNodeJs';

            beforeEach(function () {
                message = "Hi oldname";
                message2 = "Hello newname";
                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
            });

            afterEach(function () {
                microgear.client.end();
            });

            it('should know only the lastest alias when setalias twice', function (done){
                var oldName = "myself-setalias-old";
                var newName = "myself-setalias-new";
                var counter = 0;
                microgear.on("message", function(topic, msg) {
                    counter += 1;
                    //TODO expect topic
                    expect(msg+"").toBe(message);
                    if(counter > 1) {
                        //TODO expect topic
                        expect(msg+"").toBe(message2);
                        done();
                    }
                });
                microgear.on('connected', function() {
                    connected = true;
                    microgear.setalias(oldName);
                    microgear.setalias(newName);
                    while(counter < 1) {
                        microgear.chat(newName, message2);
                    }
                    while(counter > 1){
                        microgear.chat(oldName, message);
                    }
                },3000);
                microgear.connect(appid);
            }, 10000)
        });

    });
    describe('Code 4: Chat', function(){

//pre-re: should run helper.js 5 first.
        describe('Code 4: Case 2 Chat with other online microgear in same appid', function () {
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var gearname;
            var helperGearname;
            var message;

            beforeEach(function () {
                microgear = undefined;
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = "myself-2";
                helperGearname = 'helper';
                message = 'Hello Helper.';
                expect(microgear).to.be.undefined;

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

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

            });

            afterEach(function () {
                microgear.client.end(); //will fail test if microgear did not connect
                fs.unlinkSync(pathToFile); //delete file
            });

            it('should send the message to helper', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.setalias(gearname);
                    microgear.chat(helperGearname, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function (curr, prev) {
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");
                            expect(data.toString()).to.equal(message);
                            fs.unwatchFile(pathToFile);
                            done();
                        });
                    });
                }, connectTimeout);
                microgear.connect(appid);
            });
        });

//pre-re: should run helper.js 6 first.
        describe('Code 4: Case 3 Chat with other microgear in different appid', function () {
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var gearname;
            var helperGearname;
            var message;

            beforeEach(function () {
                microgear = undefined;
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = "myself-2";
                helperGearname = 'helper';
                message = 'Hello Helper.';

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

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

            });

            afterEach(function (){
                microgear.client.end();
                fs.unlinkSync(pathToFile);
            });

            it('should not receive the message', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.setalias(gearname);
                    microgear.chat(helperGearname, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function(curr, prev) {
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
                        fs.unwatchFile(pathToFile);
                        expect(true).to.be.true;
                        done();
                    }, messageTimeout);
                }, connectTimeout);
                microgear.connect(appid);
            });
        });

//pre-re: should run helper.js 7 first.
        describe('Code 4: Case 5 Chat with other microgear that shares the same name', function () {
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var gearname;
            var message;

            beforeEach(function () {
                microgear = undefined;
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = "myself";
                message = 'Hello Helper.';

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

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });
            });

            afterEach(function (){
                microgear.client.end();
                fs.unlinkSync(pathToFile);
            });

            it('the helper should receive the message', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.setalias(gearname);
                    microgear.chat(gearname, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function(curr, prev) {
                        //if changes, check the content
                        fs.readFile(pathToFile, 'utf8', function (err, data) {
                            if (err) {
                                console.log("error: no file");
                                return console.log(err);
                            }
                            console.log("message: (" + data.toString() + ")");
                            expect(false).to.be.false;
                        });
                    });
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(""+stubMessage.args[0][1]).to.equal(message);
                        expect(stubConnect.calledBefore(stubMessage)).to.be.true;

                        fs.unwatchFile(pathToFile);
                        expect(true).to.be.true;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });


        describe('Code 4: Case 1 Chat with myself', function () {
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
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
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.setalias(gearname);
                    microgear.chat(gearname, message);
                    setTimeout(function () {
                        console.log("checking");
                        expect(stubMessage.called).to.be.true;
                        expect(stubConnect.callCount).to.equal(1);
                        expect(stubMessage.callCount).to.equal(1);
                        expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                        expect(""+stubMessage.args[0][1]).to.equal(message);
                        //TODO: gearalias not set.
                        //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                        done();
                    }, messageTimeout);
                }, connectTimeout);
                microgear.connect(appid);
            });
        });

        describe.skip('Code 4: Case 7 Chat when not connect', function () {
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
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

            it('should trigger error event', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubError = sinon.spy();
                microgear.on('error', stubError);

                //setTimeout(function () {
                //    expect(stubConnect.called).to.be.true;
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
                microgear.connect(appid, function(){
                    expect(stubConnect.called).to.be.false;
                    expect(stubError.called).to.be.false;
                    done();

                });
            });
        });

//pre-re: should run helper.js 6 first.
        describe('Code 4: Case 5 Chat with other microgears that are in different appid but shares the same name', function () {
            var microgear;
            var appkey;
            var appsecret;
            var appid;
            var gearname;
            var helperGearname;
            var message;

            beforeEach(function () {
                microgear = undefined;
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = "myself-2";
                helperGearname = 'helper';
                message = 'Hello Helper.';

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

                microgear = MicroGear.create({
                    key: appkey,
                    secret: appsecret
                });

            });

            afterEach(function (){
                microgear.client.end();
                fs.unlinkSync(pathToFile);
            });

            it('should not receive the message', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.setalias(gearname);
                    microgear.chat(helperGearname, message);

                    //watch receive file for changes
                    fs.watchFile(pathToFile, function(curr, prev) {
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
                        fs.unwatchFile(pathToFile);
                        expect(true).to.be.true;
                        done();
                    }, messageTimeout);
                }, connectTimeout);
                microgear.connect(appid);
            });
        });

    });
    describe('Code 5: Subscribe', function(){

//pre-re: run helper.js 4 first.
        describe('Code 5: Case 1 Subscribe one topic', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey     = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should receive message from topic that the helper publish', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                microgear.connect(appid);
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubConnect.callCount).to.equal(1);
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        console.log(stubMessage.args[0][1]+"");
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        done();
                    }, messageTimeout);
                }, connectTimeout);
            });
        });

//pre-re: run helper.js 4 first.
        describe('Code 5: Case 2 Subscribe same topic twice', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should not change its behavior -> should receive message from topic that helper publish', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage, done);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        microgear.subscribe(topic);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal("" + stubMessage.args[0][1]);
                            done();
                        }, messageTimeout + 1000);
                    }, messageTimeout);

                }, connectTimeout);
                microgear.connect(appid);
            });
        });

///pre-re: run helper.js 4 first.
        describe('Code 5: Case 3 Subscribe topic after unsubscribe before', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should receive message when helper publishes topic', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        microgear.unsubscribe(topic);
                        setTimeout(function () {
                            stubMessage.reset();
                            expect(stubMessage.called).to.be.false;
                            microgear.subscribe(topic);
                            setTimeout(function () {
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

///pre-re: should run helper.js 4 first.
        describe('Code 5: Case 5 Unsubscribe invalid topic - no slash', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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
                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            }, 10000);
        });

///pre-re: should run helper.js 1 first
        describe('Code 5: Case 4 Subscribe topic that it publishes', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello myself.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                expect(microgear).to.be.undefined;

                fs.writeFile(filePath, '{"_":null}', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("clear cache");
                    done();
                });

                microgear = MicroGear.create({
                    key : appkey,
                    secret : appsecret});
            });

            afterEach(function () {
                microgear.client.end();
            });

            it('should receive message', function (done) {
                this.timeout(itTimeout);
                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);
                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    microgear.subscribe(topic);
                    expect(stubMessage.called).to.be.false;
                    setTimeout(function() {
                        microgear.publish(topic, message);
                        setTimeout(function() {
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal(""+stubMessage.args[0][1]);
                            done();
                        },messageTimeout+1000);
                    },messageTimeout);

                }, connectTimeout);

            });

        });

///pre-re: should run helper.js 8 first.
        describe('Code 5: Case 6 Subscribe special topic - empty string', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should receive message from empty string topic', function (done) {
                this.timeout(itTimeout);
                topic = "";
                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    console.log(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal("" + stubMessage.args[0][1]);
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

///pre-re: should run helper.js 9 first.
//TODO
        describe('Code 5: Case 7 Subscribe special topic - no slash', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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
                topic = "firstTopic";
                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });


    });
    describe('Code 6: Unsubscribe', function(){
        ///pre-re: should run helper.js 4 first
        describe('Code 6: Case 1 Unsubscribe topic after subscribe', function () {
            var topic;
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should not receive message when helper publish topic', function (done) {
                this.timeout(itTimeout);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        microgear.unsubscribe(topic);
                        stubMessage.reset();
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

///pre-re: should run helper.js 4 first
        describe('Code 6: Case 2 Unsubscribe topic before subscribe', function () {
            var topic;
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should not affect subscribe', function (done) {
                this.timeout(itTimeout);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.unsubscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        microgear.subscribe(topic);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message).to.equal(""+stubMessage.args[0][1]);
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

///pre-re: should run helper.js 4 first.
        describe('Code 6: Case 3 Unsubscribe the same topic twice starts from subscribe/unsubscribe', function () {
            var message;
            var topic;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;


            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                message = "Hello from helper.";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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
                fs.unlinkSync(filePath);
            });

            it('should receive message - starts from unsubscribe', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    console.log("unsubscribe");

                    microgear.unsubscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        console.log("unsubscribe 2");
                        microgear.unsubscribe(topic);
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            console.log("subscribe");
                            microgear.subscribe(topic);
                            setTimeout(function () {
                                expect(stubMessage.called).to.be.true;
                                expect(message).to.equal(""+stubMessage.args[0][1]);
                                done();
                            }, messageTimeout + 2000);
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);

            });

            it('should not receive message - starts from subscribe', function (done) {
                this.timeout(itTimeout);

                var stubMessage = sinon.spy();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.spy();
                microgear.on('connected', stubConnect);

                microgear.connect(appid);


                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    console.log("sub");
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        stubMessage.reset();
                        console.log("unsub");
                        microgear.unsubscribe(topic);

                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            console.log("unsub 2");
                            microgear.unsubscribe(topic);
                            stubMessage.reset();
                            setTimeout(function () {
                                expect(stubMessage.called).to.be.false;
                                done();
                            }, messageTimeout + 2000);
                        }, messageTimeout + 1000);
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

///pre-re: should run helper.js 4 first
        describe('Code 6: Case 4 Unsubscribe the empty string topic', function () {
            var topic;
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "";
                message = "Hello from helper to ";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should not receive message after unsubscribe', function (done) {
                this.timeout(itTimeout);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        microgear.unsubscribe(topic);
                        stubMessage.reset();
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.false;
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });

///pre-re: should run helper.js 4 first
        describe('Code 6: Case 5 Unsubscribe invalid topic', function () {
            var topic;
            var invalidTopic;
            var message;
            var gearname;
            var microgear;
            var appkey;
            var appsecret;
            var appid;

            beforeEach(function (done) {
                this.timeout(beforeTimeout);
                microgear = undefined;
                gearname = 'myself';
                topic = "/firstTopic";
                invalidTopic = "firstTopic";
                message = "Hello from helper to ";
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            it('should not receive message after unsubscribe', function (done) {
                this.timeout(itTimeout);
                var stubMessage = sinon.stub();
                microgear.on('message', stubMessage);

                var stubConnect = sinon.stub();
                microgear.on('connected', stubConnect);

                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        microgear.unsubscribe(invalidTopic);
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            done();
                        }, messageTimeout+1000);
                    }, messageTimeout);
                }, connectTimeout);

                microgear.connect(appid);
            });
        });
    });
})
