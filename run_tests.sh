echo "start"
cd /Users/tsn/Desktop/MyMochaChaiSinonExample

# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 10 &
# sleep 3
# mocha -g 'Code 1' specs --require specs/helpers/chai.js
# killall node

# sleep 3
# echo "next"
# # sleep 3
# mocha -g 'Code 2' specs --require specs/helpers/chai.js

# echo "next"

sleep 3
node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 10 &
sleep 3
mocha -g 'Code 3' specs --require specs/helpers/chai.js
killall node
sleep 3


mocha -g 'Code 4: Case 1' specs --require specs/helpers/chai.js
sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 1 &
sleep 3
mocha -g 'Code 4: Case 2' specs --require specs/helpers/chai.js
killall node
sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 6 &
sleep 3
mocha -g 'Code 4: Case 3' specs --require specs/helpers/chai.js
killall node
sleep 3


node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 7 &
sleep 3
mocha -g 'Code 4: Case 5' specs --require specs/helpers/chai.js
killall node
sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 14 &
sleep 3
mocha -g 'Code 4: Case 8' specs --require specs/helpers/chai.js
killall node