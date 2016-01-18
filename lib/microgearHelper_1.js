module.exports = {

    run_helper: function () {
        var topModule = module;
        while(topModule.parent) {
            topModule = topModule.parent;
            console.log(topModule)
        }

        var appdir = require('path').dirname(topModule.filename);
        console.log(appdir);

            var MicroGear = require('microgear');
            var received = false;
            var appkey2 = "9O0xiA2lHXz01iE";
            var appsecret2 = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";
            var appid2 = "testNodeJsHelper";

            microgearHelper = MicroGear.create({
                key: appkey2,
                secret: appsecret2
            });

            microgearHelper.on('connected', function () {
                console.log('Connected...');
                microgearHelper.setalias("helper_1");
            });

            microgearHelper.on("message", function (topic, msg) {
                console.log("Incoming message: " + msg);
                received = true;
                microgearHelper.client.end();
                return;
            });

            microgearHelper.connect(appid2);
        }
};
