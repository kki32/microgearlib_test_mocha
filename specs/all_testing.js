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

    describe('Code 3: Setalias', function(){

        //pre-re: run helper.js 10 first.
        describe('Code 3: Case 1-3 Setalias', function () {
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

        //pre-re: run helper.js 4 first.
        describe('Code 3: Case 4 Setalias like topic', function () {
            var microgear;
            var topic;
            var message
            var appkey;
            var appsecret;
            var appid;
            var gearname;

            beforeEach(function (done) {
                microgear = undefined;
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = 'myself';
                message = 'Hello from helper to ';
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

//pre-re: should run helper.js 14 first
        describe.skip('Code 4: Case 8 Chat to microgear that has gearname as topic', function () {
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
                appkey = 'NLc1b8a3UZPMhOY';
                appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
                appid = 'testNodeJs';
                gearname = "myself-2";
                topic = '/firstTopic';
                message = 'Hello Helper.';
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
                var stubConnect = sinon.spy();
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
            }, itTimeout);
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

                }, messageTimeout);

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
            },connectTimeout);
            microgear.connect(appid);
        }, itTimeout);
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
            },connectTimeout);
            microgear.connect(appid);
        }, itTimeout);
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



//pre-re: should run helper.js 11 first.
    describe('Code 4: Case 9 Chat with empty string', function () {
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
            helperGearname = '';
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

        it('should receive the message from helper that has name with empty string', function (done) {
            this.timeout(itTimeout);
            var stubConnect = sinon.spy();
            microgear.on('connected', stubConnect);

            setTimeout(function () {
                expect(stubConnect.called).to.be.true;
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

describe('Resettoken when have microgear.cache and microgear is offline', function () {
    var message;
    var gearname;
    var microgear;
    var appkey;
    var appsecret;
    var appid;

    beforeEach(function (done) {
        this.timeout(itTimeout);
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
        }, connectTimeout);
    });

    afterEach(function () {
        microgear.client.end();
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

describe('Resettoken twice', function () {
    var message;
    var gearname;
    var microgear;
    var appkey;
    var appsecret;
    var appid;

    beforeEach(function (done) {
        this.timeout(itTimeout);
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

        setTimeout(function () {
            expect(stubConnect.called).to.be.true;
            microgear.disconnect();
            setTimeout(function () {
                expect(stubDisconnect.called).to.be.true;
                done();
            }, connectTimeout);
        }, connectTimeout);
    });

    afterEach(function () {
        microgear.client.end();
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

describe('Resettoken when no cache file', function () {
    var message;
    var microgear;
    var appkey;
    var appsecret;
    var appid;

    beforeEach(function () {
        this.timeout(itTimeout);
        microgear = undefined;
        message = "Hello myself.";
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        //ensure there is no microgear.cache
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
    });

    it('should do nothing', function (done) {
        microgear.resettoken(function (result) {
            if(fs.existsSync(filePath)){
                expect('should not create microgear.cache').to.be.false;
            }
            expect(true).to.be.true;
            done();
        });
    }, itTimeout);
});
})

