const spawn = require('child_process').spawn;
var bat;
function help(code){
bat = spawn('pkill',['-f', 'node microgear_helpers/helper.js']);
// setTimeout(function(){
// 	bat.kill('SIGINT');
// }, 2000);


bat.stdout.on('data', (data) => {
  console.log(data+"");
});

bat.stderr.on('data', (data) => {
  console.log(data+"");
});

bat.on('exit', (code) => {
  console.log('Child exited with code ${code}');
});

}

function cancel(){
	bat.kill('SIGINT');
}
help()
