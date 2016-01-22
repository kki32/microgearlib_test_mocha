var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

//"node":"4.2.4","npm":"3.5.2"

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/receiver.txt";

var connectTimeout = 3000;
var messageTimeout = 4000;
var itTimeout = 20000;
var beforeTimeout = 10000;

//var filePath = "/Users/Shared/Jenkins/Home/jobs/microgearlib_testing_mocha/workspace/specs/microgear.cache";
//var topModule = module;
var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/specs/microgear.cache";
console.log(filePath);


describe('Code 7: Publish', function(){
    ///pre-re: should run helper.js 1 first
    describe('Code 7 Case 3 Publish to microgear that subscribe other topic', function () {
        var microgear;
        var appkey;
        var appsecret;
        var appid;
        var topic;
        var message;
        var modified
        beforeEach(function (done) {
            topic = '/firstTopic';
            message = 'Hello myself.';
            modified = false;
            microgear = undefined;
            appkey     = 'NLc1b8a3UZPMhOY';
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
        });

        it('subscribers should not receive message from topic it does not subscribe', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.publish(topic, message);


                fs.watchFile(pathToFile, function(curr, prev) {
                    modified = true;
                    fs.readFile(pathToFile, 'utf8', function (err, data) {
                        if (err) {
                            console.log("no file");
                            return console.log(err);
                        }
                        console.log("this is da" + data.toString() + "her");
                        expect(data.toString()).to.equal(message);
                    });
                });

                setTimeout(function () {
                    expect(modified).to.be.false;
                    fs.unwatchFile(pathToFile);
                    done();
                }, messageTimeout);
            }, connectTimeout);



            microgear.connect(appid);


        });
    });

    describe('Code 7 Case 7 Publish to invalid topic - no slash', function () {
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
            message = 'Hello subscribers.';
            appkey = 'NLc1b8a3UZPMhOY';
            appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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
            microgear.client.end();
        });

        it('subscriber should receive the message when subscribe after start publishing', function (done) {
            var stubConnect = sinon.stub();
            microgear.on('connected', stubConnect);

            microgear.connect(appid);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
                microgear.publish(topic, message);
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
            }, connectTimeout);
        });
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
            },5000);
            microgear.connect(appid);
        }, 10000);
//pre-re: should run helper.js 14 first
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
            },5000);
            microgear.connect(appid);
        }, 10000);
    });
describe('Code 8: Resettoken', function(){
    ///pre-re: should run helper.js 10
    describe.skip('Code 8: Case 5 Resettoken after chat', function () {
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
            message = "Hello from helper to ";
            appkey = 'NLc1b8a3UZPMhOY';
            appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
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

            var stubConnect = sinon.spy();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.spy();
            microgear.on('message', stubMessage);

            var stubDisconnect = sinon.spy();
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

            var stubConnect = sinon.spy();
            microgear.on('connected', stubConnect);

            var stubMessage = sinon.spy();
            microgear.on('message', stubMessage);

            var data = fs.readFileSync(filePath, 'utf8');
            expect(data.toString()).not.to.equal('{"_":null}');

            microgear.resettoken(function (result) {
                var data2 = fs.readFileSync(filePath, 'utf8');
                expect(data2.toString()).to.equal('{"_":null}');
                expect(stubConnect.called).to.be.false;
                expect(stubMessage.called).to.be.false;

                microgear.connect(appid);
                setTimeout(function () {
                    expect(stubConnect.called).to.be.true;
                    setTimeout(function () {
                        expect(stubMessage.called).to.be.false;
                        done();
                    }, connectTimeout + 2000);

                }, connectTimeout+1000);
            });

        });

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
//        fs.writeFile(filePath, '{"_":null}', function (err) {
//            if (err) {
//                return console.log(err);
//            }
//            console.log("clear cache");
//        });
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubDisconnect = sinon.spy();
//        microgear.on('disconnected', stubDisconnect);
//
//        microgear.connect(appid);
//
//        //create state that have microgear.cache but offline
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.true;
//            expect(stubConnect.callCount).to.equal(1);
//            expect(stubDisconnect.notCalled).to.be.true;
//
//            microgear.disconnect();
//
//            expect(stubDisconnect.called).to.be.true;
//            expect(stubDisconnect.callCount).to.equal(1);
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
//        //check the content of microgear cache is not null
//
//        var data = fs.readFileSync(filePath, 'utf8');
//        expect(data.toString()).not.to.equal('{"_":null}');
//
//            //resettoken then check content again
//            microgear.resettoken(function (result) {
//                var data2 = fs.readFileSync(filePath, 'utf8');
//                    expect(data2.toString()).to.equal('{"_":null}');
//                    done();
//                });
//        });
//});
//
//describe('Resettoken twice', function () {
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
//        fs.writeFile(filePath, '{"_":null}', function (err) {
//            if (err) {
//                return console.log(err);
//            }
//            console.log("clear cache");
//        });
//
//        var stubConnect = sinon.spy();
//        microgear.on('connected', stubConnect);
//
//        var stubDisconnect = sinon.spy();
//        microgear.on('disconnected', stubDisconnect);
//
//        microgear.connect(appid);
//
//        setTimeout(function () {
//            expect(stubConnect.called).to.be.true;
//            microgear.disconnect();
//            setTimeout(function () {
//                expect(stubDisconnect.called).to.be.true;
//                done();
//            }, 3000);
//        }, 3000);
//    });
//
//    afterEach(function () {
//        microgear.client.end();
//    });
//
//    it('should just resettoken like usual', function (done) {
//        this.timeout(10000);
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

//describe('Resettoken when no cache file', function () {
//    var message;
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//
//    beforeEach(function () {
//        this.timeout(10000);
//        microgear = undefined;
//        message = "Hello myself.";
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//        //ensure there is no microgear.cache
//        if(fs.existsSync(filePath)){
//            fs.unlinkSync(filePath);
//        }
//    });
//
//    it('should do nothing', function (done) {
//        microgear.resettoken(function (result) {
//            if(fs.existsSync(filePath)){
//                expect('should not create microgear.cache').to.be.false;
//            }
//            expect(true).to.be.true;
//            done();
//        });
//    }, 10000);
//});