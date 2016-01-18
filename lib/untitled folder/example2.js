var MicroGear = require('microgear');
var microgear;
var appkey    = 'NLc1b8a3UZPMhOY'; //invalid appkey
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs';
var topic = '/firstTopic';
var message = 'Hello from helper.';

var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}

var appdir = require('path').dirname(topModule.filename);   
console.log(appdir);

microgear = MicroGear.create({
	key : appkey,
	secret : appsecret
});

microgear.on("message", function(topic,msg) {
	console.log(topic);
	console.log("Incoming message: "+msg);
 }); 

microgear.on('connected', function() {
	console.log('Connected...');

                microgear.subscribe(topic);
	 setTimeout(function () {
	 	  console.log("un");
                microgear.unsubscribe(topic);
              
            }, 2000);
            setTimeout(function () {
            	        console.log("un2");
                microgear.unsubscribe(topic);
        
            
            }, 4000);

});

microgear.on('error', function(){
	console.log('There is an error');
});


microgear.connect(appid);

