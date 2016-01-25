var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

//"node":"4.2.4","npm":"3.5.2"

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/receiver2.txt";

var connectTimeout = 3000;
var messageTimeout = 4000;
var itTimeout = 20000;
var beforeTimeout = 10000;

//var filePath = "/Users/Shared/Jenkins/Home/jobs/microgearlib_testing_mocha/workspace/specs/microgear.cache";
//var topModule = module;
var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/microgear.cache";

describe('Code 1: Create', function(){
    describe('Code 1, Case 1, 2.1, 3.1, 7: Create microgear with gearkey and gearsecret parameter', function () {
        var microgear;
        var appkey;
        var appsecret;

        beforeEach(function () {
            //initialise variables
            microgear = undefined;
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
        });


        it('Code 1: Case 1 should save gearkey and gearsecret', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret
            });
            //check that microgear is an object and gearkey & gearsecret is saved to the object
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
        });

        it('Code 1: Case 2.1 should ignore empty gearkey', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            //if appkey to empty
            appkey = '';
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret
            });
            //should not generate microgear object
            expect(microgear).to.be.null;
        });

        it('Code 1: Case 3.1 should ignore empty gearsecret', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            //if appsecret is empty
            appsecret = '';
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret
            });
            //should not generate microgear object
            expect(microgear).to.be.null;
        });

        it('Code 1: Case 7 should save the info only the lastest one when create microgear twice', function () {
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            //create first time
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret
            });
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var appkey2 = 'Ziyur6AwgArePdZ';
            var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
            //create second time with new appkey and new appsecret
            microgear = MicroGear.create({
                key : appkey2,
                secret : appsecret2
            });
            //ensure appkey and appsecret is saved in the object
            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey2);
            expect(microgear.gearsecret).to.equal(appsecret2);
        });
    });

    describe('Code 1: Case 2.2, 2.3, 2.4, 3.2, 3.3, 3.4 Create with invalid input - require connect', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function (done) {
            //initialise variables
            this.timeout(beforeTimeout);
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';

            //clear cache file
            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });
        });

        it.skip('Code 1: Case 2.2 should throw error when appkey change its case', function (done) {
            this.timeout(itTimeout);

            //change appkey to lowercase
            var loweredAppkey = appkey.toLowerCase();
            expect(loweredAppkey).to.equal('kzo3i5CapTE1O7b');

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
            expect(addedGearKey).to.equal('kzo3i5CapTE1O7bxx');

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

        it.skip('Code 1: Case 3.2 should throw error when appsecret change its case', function (done) {
            this.timeout(itTimeout);
            var loweredGearSecret = appsecret.toLowerCase();

            expect(loweredGearSecret).to.equal('wdD2LarBlW4C7qeG5RQwDpnx8XWoyNxx');
            microgear = MicroGear.create({
                key : appkey,
                secret : loweredGearSecret
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

            expect(addedGearSecret).to.equal('wdD2LarBlW4C7qeG5RQwDpnx8XWoyNxx');

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

    //pre-re: run helper.js 10 first.
    describe('Code 1: Case 4 Create with setalias parameter', function () {
        var microgear;
        var message
        var appkey;
        var appsecret;
        var appid;
        var gearname;

        beforeEach(function (done) {
            microgear = undefined;
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });
        });

        it('Code 1: Case 4 should save setalias from create and receive message', function (done) {
            this.timeout(itTimeout);
            //ensure microgear is undefined before create
            expect(microgear).to.be.undefined;
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret,
                alias : gearname});

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
                setTimeout(function () {
                    //check if message is received
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
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
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    microgear.setalias("mainNew");
                    //TODO: gearalias not update value
                    //expect(microgear.gearalias).to.equal("mainNew");
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
            gearname = "mainNew";
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
                    microgear.setalias("main");
                    //TODO: gearalias not save new value
                    //expect(microgear.gearalias).to.equal("main");
                    stubMessage.reset();
                    expect(stubMessage.called).to.be.false;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.true;
                        expect(message+"main").to.equal(""+stubMessage.args[0][1]);
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

        it.skip('should save only the latest setalias value when setalias more than once', function (done) {
            this.timeout(itTimeout);
            gearname = "main";
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
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        microgear.setalias("mainNew");
                        //TODO: gearalias not save new value, check topic name
                        //expect(microgear.gearalias).to.equal("main");
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message+"mainNew").to.equal(""+stubMessage.args[0][1]);
                            done();
                        }, messageTimeout+2000);
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

    });
});

describe('Code 2: Connect', function(){
    describe('Code 2: Case 1 Connect with valid appid', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            appkey    = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';


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
        afterEach(function (){
            //should fail here if microgear is not connect
            microgear.client.end();
        });

        it('Code 2: Case 1 should be able to connect without any errors', function (done) {
            this.timeout(itTimeout);
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

    describe('Code 2: Case 2 Connect with invalid appid', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });
        });

        it('Code 2: Case 2.1 should throw error when appid is empty string', function (done) {
            this.timeout(itTimeout);
            var emptyAppid = '';
            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);

            var stubConnect2 = sinon.stub();
            microgear.on('connected', stubConnect2);

            microgear.connect(emptyAppid);
            setTimeout(function () {
                expect(stubConnect2.called).to.be.false;
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
                key : appkey,
                secret : appsecret
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
        var microgear;
        var message
        var appkey;
        var appsecret;
        var appid;
        var gearname;

        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            expect(microgear).to.be.undefined;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                fs.unlinkSync(filePath);
                if (!fs.existsSync(filePath)) {
                    done();
                }

            });
        });

        it('should save setalias and receive message', function (done) {
            this.timeout(itTimeout);
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
                expect(stubConnect.callCount).to.equal(1);
                if (fs.existsSync(filePath)) {
                    done();
                }
            }, connectTimeout);
        });
    });

});

describe('Code 3: Setalias', function(){

    //pre-re: run helper.js 10 first.
    describe('Code 3: Case 1, 2, 3 Setalias', function () {
        var microgear;
        var message
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var newGearname;

        beforeEach(function (done) {
            microgear = undefined;
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = 'main';
            newGearname = 'mainNew';
            message = 'Hello';
            expect(microgear).to.be.undefined;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });
        });

        afterEach(function () {
            microgear.client.end();
        });

        it('Code 3: Case 1 should receive message from helper', function (done) {
            this.timeout(itTimeout);
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
                expect(stubMessage.called).to.be.false;
                microgear.setalias(gearname);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                        done();
                }, messageTimeout);
            }, connectTimeout);
        });


        it('Code 3: Case 2 should receive message from helper before setalias', function (done) {
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

            //should receive message after setalias
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    microgear.setalias(newGearname);
                    //TODO: fail gearalias not update value
                    //expect(microgear.gearalias).to.equal(newGearname);
                    stubMessage.reset();
                    expect(stubMessage.called).to.be.false;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

        it('Code 3: Case 2 should receive message from helper after setalias', function (done) {
            this.timeout(itTimeout);
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret,
                alias : newGearname});

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
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

        //TODO: not yet
        it.skip('Code 3: Case 3 should save only the latest setalias value when setalias more than once', function (done) {
            this.timeout(itTimeout);
            gearname = "main";
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
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        microgear.setalias("mainNew");
                        //TODO: gearalias not save new value, check topic name
                        //expect(microgear.gearalias).to.equal("main");
                        stubMessage.reset();
                        expect(stubMessage.called).to.be.false;
                        setTimeout(function () {
                            expect(stubMessage.called).to.be.true;
                            expect(message+"mainNew").to.equal(""+stubMessage.args[0][1]);
                            done();
                        }, messageTimeout+2000);
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

    });

    //pre-re: run helper.js 12 first.
    describe('Code 3: Case 4 Setalias empty string topic', function () {
        var microgear;
        var message
        var appkey;
        var appsecret;
        var appid;
        var emptyGearname;

        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            emptyGearname = '';
            message = 'Hello';

            expect(microgear).to.be.undefined;

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

            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
        });

        it.skip('Code 3: Case 4 should receive message when the helper chat to empty string topic', function (done) {
            this.timeout(itTimeout);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                //ensure microgear is connected and that there is no message at the beginning then setalias
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.setalias(emptyGearname);
                //should receive message from helper which chats to empty string gearname
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });

    });

    //TODO: better way to test?
    //pre-re: run helper.js 4 first.
    describe('Code 3: Case 5 Setalias like topic', function () {
        var microgear;
        var topic;
        var message
        var appkey;
        var appsecret;
        var appid;
        var gearname;

        beforeEach(function (done) {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = 'main';
            message = 'Hello';
            topic = '/firstTopic';
            expect(microgear).to.be.undefined;

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

            expect(microgear).to.be.an('object');
            expect(microgear.gearkey).to.equal(appkey);
            expect(microgear.gearsecret).to.equal(appsecret);
        });

        it('should not receive message when helper publishes the topic', function (done) {
            this.timeout(itTimeout);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                setTimeout(function () {
                    expect(stubMessage.called).to.be.false;
                    microgear.setalias(topic);
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);
        });

    });


});

describe('Code 4: Chat', function(){
    describe('Code 4: Case 1 Chat with main', function () {
        var message;
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
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';

            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret,
                alias : gearname});

            //clear cache file
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
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            //chat
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.chat(gearname, message);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(stubConnect.callCount).to.equal(1);
                    expect(stubMessage.callCount).to.equal(1);
                    expect(stubConnect.calledBefore(stubMessage)).to.be.true;
                    expect(""+stubMessage.args[0][1]).to.equal(message);
                    //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                    done();
                }, messageTimeout);
            }, connectTimeout);
            microgear.connect(appid);
        });
    });
//pre-re: should run helper.js 1 first. receive message
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
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = "main";
            helperGearname = 'helper';
            message = 'Hello';
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
                secret: appsecret,
                alias: gearname
            });

        });

        afterEach(function () {
            microgear.client.end(); //will fail test if microgear did not connect
            //clean up
            fs.unwatchFile(pathToFile);
            //fs.unlinkSync(pathToFile); //delete file
        });

        it('should send the message to helper', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);
            setTimeout(function () {
                console.log("good");

                expect(stubConnect.called).to.be.true;
                microgear.setalias('main');
                microgear.chat(helperGearname, message+helperGearname);

                //watch if helper wrote something on receiver file
                fs.watchFile(pathToFile, function (curr, prev) {
                    //if changes, check the content
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("error: no file");
                            return console.log(err);
                        }
                        console.log("message: (" + data.toString() + ")");
                        //check message that is written by helper
                        expect(data.toString()).to.equal(message+helperGearname);

                        done();
                    });
                });
            }, connectTimeout);

        });
    });

    //pre-re: should run helper.js 6 first. chat with same name but different id
    describe('Code 4: Case 3 Chat with other microgear in different appid', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var helperGearname;
        var message;
        var modified;

        beforeEach(function () {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = "main";
            helperGearname = 'helper';
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

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret
            });

        });

        afterEach(function (){
            microgear.client.end();
            fs.unwatchFile(pathToFile);
            fs.unlinkSync(pathToFile);
        });

        it('should not receive the message', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.setalias(gearname);
                microgear.chat(helperGearname, message);

                //watch receive file for changes
                fs.watchFile(pathToFile, function(curr, prev) {
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
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var message;
        var modified;

        beforeEach(function () {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = "main";
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

            microgear = MicroGear.create({
                key: appkey,
                secret: appsecret,
                alias: gearname
            });
        });

        afterEach(function (){
            microgear.client.end();
            fs.unlinkSync(pathToFile);
            fs.unwatchFile(pathToFile);
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
                fs.watchFile(pathToFile, function(curr, prev) {
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
                    expect(""+stubMessage.args[0][1]).to.equal(message);
                    expect(stubConnect.calledBefore(stubMessage)).to.be.true;

                    done();
                }, messageTimeout + 2000);
            }, connectTimeout);

            microgear.connect(appid);
        });
    });

    //TODO: not sure
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
            gearname = 'main';
            message = "Hello";
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubError = sinon.stub();
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


//pre-re: should run helper.js 14 first
    describe('Code 4: Case 8 Chat to microgear that has gearname as topic', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var topic;
        var message;
        var modified;

        beforeEach(function () {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = "main";
            topic = '/firstTopic';
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
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.chat(topic, message);

                //watch receive file for changes
                fs.watchFile(pathToFile, function(curr, prev) {
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
                    fs.unwatchFile(pathToFile);
                    expect(modified).to.be.false;
                    done();
                }, messageTimeout);
            }, connectTimeout);
            microgear.connect(appid);
        });
    });


//pre-re: should run helper.js 11 first/
    describe('Code 4: Case 9 Chat to microgear that has empty string name', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var helperGearname;
        var message;


        beforeEach(function () {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            gearname = "main";
            message = 'Hello';
            helperGearname = '';

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

        it('should receive the message', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.chat(helperGearname, message);

                //watch receive file for changes
                fs.watchFile(pathToFile, function(curr, prev) {
                    modified = true;
                    //if changes, check the content
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("error: no file");
                            return console.log(err);
                        }
                        console.log("message: (" + data.toString() + ")");
                        expect(data.toString()).to.equal(message);
                        done();
                    });
                });
            }, connectTimeout);
            microgear.connect(appid);
        });
    });

    //TODO: not sure
    //pre-re: should run two helper.js 1 first.
    describe.skip('Code 4: Case 10 Chat with more than one microgear', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var gearname;
        var helperGearname;
        var helperGearname2;
        var message;
        var modified;
        var modified2;

        beforeEach(function () {
            microgear = undefined;
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

        });

        afterEach(function () {
            microgear.client.end(); //will fail test if microgear did not connect
            //clean up
            fs.unwatchFile(pathToFile);
            fs.unlinkSync(pathToFile); //delete file
            fs.unwatchFile(pathToFile2);
            fs.unlinkSync(pathToFile2); //delete file
        });

        it('should send the message to helper', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.chat(helperGearname, message+helperGearname);
                microgear.chat(helperGearname2, message+helperGearname2);
                //watch if helper wrote something on receiver file
                fs.watchFile(pathToFile, function (curr, prev) {
                    modified =true;
                    //if changes, check the content
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("error: no file");
                            return console.log(err);
                        }
                        console.log("message: (" + data.toString() + ")");
                        //check message that is written by helper
                        expect(data.toString()).to.equal(message+helperGearname);
                        done();
                    });
                });

                fs.watchFile(pathToFile2, function (curr, prev) {
                    modified2 = true;
                    //if changes, check the content
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("error: no file");
                            return console.log(err);
                        }
                        console.log("message: (" + data.toString() + ")");
                        //check message that is written by helper
                        expect(data.toString()).to.equal(message+helperGearname2);
                    });
                });

                setTimeout(function () {
                    modified = true;
                    modified2 = true;
                    done();
                }, messageTimeout);

            }, connectTimeout);
            microgear.connect(appid);
        });
    });


});

describe('Code 5: Subscribe', function() {
    //TODO: not sure
    describe.skip('Code 5: Case 8 Subscribe more than one topic', function () {
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            microgear.connect(appid);
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                expect(stubConnect.callCount).to.equal(1);
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    console.log(stubMessage.args[0][1] + "");
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });
    });


//pre-re: run helper.js 4 first to publish topic
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                secret: appsecret,
                alias: gearname
            });
        });

        afterEach(function () {
            microgear.client.end();
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

        it('should not change its behavior -> should still receive message from that topic when the helper publishes', function (done) {
            this.timeout(itTimeout);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage, done);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            //ensure microgear is connected and there is no message initially
            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                //ensure microgear is connected and there is no message initially
                expect(stubConnect.called).to.be.true;
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                key: appkey,
                secret: appsecret
            });
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
                //ensure microgear is connected, then subscribe
                expect(stubConnect.called).to.be.true;
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


    //TODO: check helper
///pre-re: should run helper.js 9 first to publish invalid topic
    describe('Code 5: Case 5 Subscribe invalid topic - no slash', function () {
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                //ensure microgear is connected then subscribe the invalid topic
                expect(stubConnect.called).to.be.true;
                microgear.subscribe(topic);
                setTimeout(function () {
                    //should not receive any message
                    expect(stubMessage.called).to.be.false;
                    done();
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);
        }, itTimeout);
    });

    //TODO: check helper
///pre-re: should run helper.js 8 first to publish empty topic
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                //ensure microgear is connected then subscribe empty string topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                console.log(topic);
                setTimeout(function () {
                    //should receive message from helper that publishes empty topic
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal("" + stubMessage.args[0][1]);
                    done();
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);
        });
    });

});
describe('Code 6: Unsubscribe', function(){
    ///pre-re: should run helper.js 4 first to publish to topic
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                //prerequisite: subscribe before*---------
                //ensure microgear is connected then subscribe topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    //*---------
                    //unsubscribe topic
                    microgear.unsubscribe(topic);
                    //reset the count, this stub should not be called after unsubscribe
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

///pre-re: should run helper.js 4 first to publish to topic
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                //ensure microgear is connected, then unsubscribe topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.unsubscribe(topic);
                setTimeout(function () {
                    //should not affect anything when subscribe
                    expect(stubMessage.called).to.be.false;
                    microgear.subscribe(topic);
                    setTimeout(function () {
                        //should be able to receive message helper publishes as usual
                        expect(stubMessage.called).to.be.true;
                        expect(message).to.equal(""+stubMessage.args[0][1]);
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);
        });
    });

///pre-re: should run helper.js 4 first to publish to topic
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                //ensure microgear is connected then unsubscribe the topic
                expect(stubConnect.called).to.be.true;
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
                //ensure microgear is connected then subscribe the topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                console.log("sub");
                setTimeout(function () {
                    //should receive message then unsubscribe the topic
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    //reset the count, it should not receive message after this
                    stubMessage.reset();
                    console.log("unsub");
                    microgear.unsubscribe(topic);

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
                        }, messageTimeout + 2000);
                    }, messageTimeout + 1000);
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);
        });
    });

    //TODO: check subscribe empty string topic and helper
///pre-re: should run helper.js 4 first
    describe.skip('Code 6: Case 4 Unsubscribe the empty string topic', function () {
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
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                //ensure microgear is connected, then subscribe the empty string topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(topic);
                setTimeout(function () {
                    //should receive message
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal(""+stubMessage.args[0][1]);
                    //unsubscribe topic
                    microgear.unsubscribe(topic);
                    //reset the count, it should not receive message after this
                    stubMessage.reset();
                    setTimeout(function () {
                        //should not receive message
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, messageTimeout+1000);
                }, messageTimeout);
            }, connectTimeout);

            microgear.connect(appid);
        });
    });

    //TODO: check subscribe invalid topic and helper
///pre-re: should run helper.js 4 first
    describe.skip('Code 6: Case 5 Unsubscribe invalid topic - no slash', function () {
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
            invalidTopic = "firstTopic";
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
                //ensure microgear is connected then subscribe invalid topic
                expect(stubConnect.called).to.be.true;
                expect(stubMessage.called).to.be.false;
                microgear.subscribe(invalidTopic);
                setTimeout(function () {
                    //should receive message then unsubscribe
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

describe('Code 7: Publish', function(){
    ///pre-re: should run helper.js 4 to publish topic
    describe('Code 7 Case 3 Publish to microgear that subscribe other topic', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var anotherTopic;
        var message;
        var modified
        beforeEach(function (done) {
            anotherTopic = '/secondTopic';
            message = 'Hello';
            modified = false;
            microgear = undefined;
            appkey     = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';
            expect(microgear).to.be.undefined;

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });

            fs.writeFile(pathToFile, "", function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("create empty file!");
            });
            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret});
        });

        afterEach(function () {
            microgear.client.end();
            fs.unwatchFile(pathToFile);
        });

        it('subscribers should not receive message from topic it does not subscribe', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);


            setTimeout(function () {
                //ensure microgear is connected before publish to the topic the helper subscribes
                expect(stubConnect.called).to.be.true;
                microgear.publish(anotherTopic, message);

                //watch the receiver file for changes. this happens when the helper writes down the message
                fs.watchFile(pathToFile, function(curr, prev) {
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
                    //the helper should not modify the file
                    expect(modified).to.be.false;
                    done();
                }, messageTimeout);
            }, connectTimeout);



            microgear.connect(appid);


        });
    });

    //TODO: not sure
    describe.skip('Code 7 Case 7 Publish to invalid topic - no slash', function () {
        var message;
        var invalidTopic;
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            invalidTopic = "firstTopic";
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
            appid = 'testNodeJs';

            fs.writeFile(filePath, '{"_":null}', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("clear cache");
                done();
            });
            expect(microgear).to.be.undefined;

            microgear = MicroGear.create({
                key : appkey,
                secret : appsecret});
        });

        afterEach(function () {
            microgear.client.end();
        });


        it('should have some kind of error/warning', function (done) {
            this.timeout(itTimeout);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                expect(stubConnect.callCount).to.equal(1);
                microgear.publish(invalidTopic, message);
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    expect(stubConnect.callCount).to.be.above(1);
                    done();
                }, messageTimeout);
            }, connectTimeout);
        });

    });

////prerequisite: need to call helper before/later code 1. publish_helper.js
    //TODO: subscribe or publish
    describe('Code 7: Case Publish to topic that subscribe afterwards + publish to topic empty string', function () {
        var message;
        var topic;
        var gearname;
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function () {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'myself';
            topic = "/firstTopic";
            message = 'Hello';
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

            fs.writeFile(pathToFile, "", function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("create empty file!");
            });
        });

        afterEach(function () {
            fs.unwatchFile(pathToFile);
            microgear.client.end();
        });
        //TODO: not yet
        it('the helper should receive the message when the helper subscribe - subscribe after start publishing', function (done) {
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                //ensure microgear is connected then publish topic to helper
                expect(stubConnect.called).to.be.true;
                microgear.publish(topic, message);
                //watch file for changes
                fs.watchFile(pathToFile, function(curr, prev) {
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("no file");
                            return console.log(err);
                        }
                        console.log("this is da" + data.toString() + "her");
                        expect(data.toString()).to.equal(message);
                        done();
                    });
                });

            }, messageTimeout);

        }, connectTimeout);
    });
    //TODO: not yet
    it('subscriber should receive the message when subscribe empty topic', function (done) {
        console.log("second");
        topic = "";
        microgear.on('connected', function() {
            connected = true;
            setInterval(function() {
                microgear.publish(topic, message);
                console.log("publish message");
            },1000);

            fs.watchFile(pathToFile, function(curr, prev) {

                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).to.equal(message);
                    clearInterval();
                    fs.unwatchFile(pathToFile);
                    done();
                });
            });
        },connectTimeout);
        microgear.connect(appid);
    }, itTimeout);
//pre-re: should run helper.js 14 first
    //TODO: not yet
    it('Code 7 Case x Publish to microgear that has name similar to topic', function (done) {

        microgear.on('connected', function() {
            connected = true;
            setInterval(function() {
                microgear.publish(topic, message);
                console.log("publish message");
            },1000);

            fs.watchFile(pathToFile, function(curr, prev) {

                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).to.equal(message);
                    clearInterval();
                    fs.unwatchFile(pathToFile);
                    done();
                });
            });
        },connectTimeout);
        microgear.connect(appid);
    }, itTimeout);
});


describe('Code 8: Resettoken', function(){
    ///pre-re: should run helper.js 10
    describe('Code 8: Case 5 Resettoken after setalias', function () {
        var message;
        var gearname;
        var newGearname;
        var microgear;
        var appkey;
        var appsecret;
        var appid;

        beforeEach(function (done) {
            this.timeout(beforeTimeout);
            microgear = undefined;
            gearname = 'myself';
            newGearname = 'myselfNew';
            message = "Hello";
            appkey = 'kzo3i5CapTE1O7b';
            appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

            //prerequisite: chat
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

            var stubDisconnect = sinon.stub();
            microgear.on('disconnected', stubDisconnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.setalias(gearname);
                setTimeout(function () {
                    expect(stubMessage.called).to.be.true;
                    expect(message).to.equal("" + stubMessage.args[0][1]);

                    microgear.disconnect();
                    expect(stubDisconnect.called).to.be.true;
                    done();

                }, messageTimeout);

            }, connectTimeout);
        });

        after(function () {
            console.log("cut");
            microgear.client.end();
        });

        it('should not receive any message after resettoken', function (done) {
            this.timeout(itTimeout);

            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.stub();
            microgear.on('message', stubMessage);

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
                    microgear.setalias(newGearname);
                    setTimeout(function () {
                        //should not receive message from the gearname before
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, connectTimeout + 2000);

                }, connectTimeout+1000);
            });

        });

    });

});
