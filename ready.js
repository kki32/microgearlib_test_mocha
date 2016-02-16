describe.skip('skip', function(){



 



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
           appkey = 'kzo3i5CapTE1O7b';
           appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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

//describe('Resettoken when have microgear.cache and microgear is offline', function () {
//    var message;
//    var gearname;
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//
//    beforeEach(function (done) {
//        this.timeout(itTimeout);
//        microgear = undefined;
//        gearname = 'myself';
//        message = "Hello myself.";
//        appkey     = 'kzo3i5CapTE1O7b';
//        appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
//        }, connectTimeout);
//    });
//
//    afterEach(function () {
//        microgear.client.end();
//    });
//
//    it('should clear the cache in resettoken', function (done) {
//        this.timeout(itTimeout);
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
//        this.timeout(itTimeout);
//        microgear = undefined;
//        gearname = 'myself';
//        message = "Hello myself.";
//        appkey     = 'kzo3i5CapTE1O7b';
//        appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
//            }, connectTimeout);
//        }, connectTimeout);
//    });
//
//    afterEach(function () {
//        microgear.client.end();
//    });
//
//    it('should just resettoken like usual', function (done) {
//        this.timeout(itTimeout);
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
//        this.timeout(itTimeout);
//        microgear = undefined;
//        message = "Hello myself.";
//        appkey     = 'kzo3i5CapTE1O7b';
//        appsecret = 'wdD2LarBlW4C7qeG5RQwDpnx8XWoyN';
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
//    }, itTimeout);
//});
})
