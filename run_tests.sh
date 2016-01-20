echo "start"
cd /Users/tsn/Desktop/MyMochaChaiSinonExample
node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 4 &
mocha -g 'Code 1' specs --require specs/helpers/chai.js
killall node

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 4 &
mocha -g 'Code 4' specs --require specs/helpers/chai.js
killall node

mocha -g 'Code 2' specs --require specs/helpers/chai.js