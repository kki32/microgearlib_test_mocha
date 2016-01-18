var MicroGear = require('microgear');
var chai = require('chai');
var fs = require('fs');
var sinon = require('sinon');

//"node":"4.2.4","npm":"3.5.2"

//mocha specs --require specs/helpers/chai.js
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/tsn/Desktop/MyMochaChaiSinonExample/microgear.cache";

describe('Create microgear with different parameters', function () {
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

describe('Connect successfully, valid input', function () {
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
    afterEach(function (){
        //should fail here if microgear is not connect
        if(isConnected){
            console.log("cut connection");
            microgear.client.end();
        }
    });

    it('should be able to connect without any errors', function (done) {
        this.timeout(10000);
        var stubConnect = sinon.stub();
        stubConnect.withArgs('isConnected').returns(true);
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            sinon.assert.calledOnce(stubConnect);
            isConnected = stubConnect('isConnected');
            expect(isConnected).to.be.true;
            done();
        }, 3000);

        microgear.connect(appid);
    });

});

//require token first
describe('Chat with myself', function () {
    var isConnected;
    var received;
    var message;

    var microgear;
    var appkey;
    var appsecret;
    var appid;

    beforeEach(function () {
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        message = "Hello myself.";
        isConnected = false;
        received = false;
        expect(microgear).to.be.undefined;

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});
    });

    afterEach(function (){
        //should fail if microgear is not connected
        if(isConnected) {
            microgear.client.end();
        }
    });

    it('should receive message', function (done) {
        this.timeout(10000);
        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        var stubMessage = sinon.stub();
        microgear.on('message', stubMessage);


        setTimeout(function () {
            microgear.setalias("myself");
                   microgear.chat('myself', message);
            setTimeout(function () {
                sinon.assert.calledOnce(stubMessage);
                expect(""+stubMessage.args[0][1]).to.equal(message);
                       //TODO: gearalias not set.
                       //expect(topic).to.be(appid + "/" + "gearname" + "/" + microgear.gearalias);
                done();
            }, 4000);
        }, 3000);

        microgear.connect(appid);

    }, 10000);
});

describe('Resettoken when have microgear.cache and microgear is offline', function () {
    var connected;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        this.timeout(10000);
        connected = false;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            sinon.assert.calledOnce(stubConnect);
            connected = true;
            done();
        }, 3000);

        microgear.connect(appid);
    });
    afterEach(function () {
        if(connected) {
            microgear.client.end();
        }
        fs.unlinkSync(filePath);
    });

    it('should clear the cache in resettoken', function (done) {
        this.timeout(10000);
        microgear.client.end();
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                console.log("no file");
                expect("Pre-requisite: should have microgear.cache file").to.be.false;
                return console.log(err);
            }
            expect(data.toString()).not.to.equal('{"_":null}');

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

describe('Resettoken twice', function () {
    var connected;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        this.timeout(10000);
        connected = false;

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        var stubConnect = sinon.stub();
        microgear.on('connected', stubConnect);

        setTimeout(function () {
            sinon.assert.calledOnce(stubConnect);
            connected = true;
            done();
        }, 3000);

        microgear.connect(appid);
    });
    afterEach(function () {
        if(connected) {
            microgear.client.end();
        }
        fs.unlinkSync(filePath);
    });

    it('should just resettoken like usual', function (done) {
        this.timeout(10000);
        if(connected) {
            connected = false;
            microgear.client.end();
        }
        expect(connected).to.be.false;

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

describe.only('Resettoken when no cache file', function () {
    var fileExist;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        fileExist = false;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        if(fs.existsSync(filePath)){
            fileExist = true;
            fs.unlinkSync(filePath);
            fileExist = false;
        }
        expect(fileExist).to.be.false;
        done();
    });

    it('should do nothing', function (done) {
        microgear.resettoken(function (result) {
            expect(true).to.be.true;
            done();
        });
    }, 10000);
});

 //pre-re: should run publish_helper.js 4 first. ensure the test and its helper does not share the same microgear.cache
describe('Code 1: Unsubscribe the same topic twice starts from unsubscribe', function () {
   var microgear;
   var isConnected;
   var received;

   var unsubscribedOnce;
   var unsubscribedTwice;
   var subscribed;

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

 microgear.connect(appid);
 });

 it('Code 1.2: Unsubscribe the same topic twice starts from subscribe', function (done) {
   console.log("start");
   this.timeout(10000);

   var stubMessage2 = sinon.stub();
   stubMessage2.withArgs('received')
         .onFirstCall().returns(true)
         .onSecondCall().returns(false);
   microgear.on('message', stubMessage2);

   var stubConnect2 = sinon.stub();
   stubConnect2.withArgs('isConnected').returns(true);
   microgear.on('connected', stubConnect2);

   setTimeout(function () {
     isConnected = stubConnect2('isConnected');
     expect(isConnected).to.be.true;
     console.log("subscribe");
     subscribed = true;
     microgear.subscribe(topic);
   }, 3000);

   setTimeout(function () {
     expect(message).to.equal(""+stubMessage2.args[0][1]);
     sinon.assert.calledOnce(stubMessage2);
     expect(stubMessage2).to.be.true;
   }, 4000);

   setTimeout(function () {
    console.log("unsubscribe 1");
    unsubscribedOnce = true;
    microgear.unsubscribe(topic);
    expect(stubMessage2).to.be.true;
  }, 6000);

   setTimeout(function () {
    console.log("unsubscribe 2");
    subscribed = true;
    unsubscribedTwice = true;
    microgear.unsubscribe(topic);
    expect(stub.Message2).to.be.true;
    done();
  }, 8000);

   microgear.connect(appid);
 });
 });

