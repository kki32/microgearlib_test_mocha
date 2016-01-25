echo "start"
cd /Users/tsn/Desktop/MyMochaChaiSinonExample

# echo "Code 1"
# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 10 &
# sleep 3
# mocha -g 'Code 1' specs --require specs/helpers/chai.js
# killall node
# sleep 3


# echo "next Code 2"
# sleep 3
# mocha -g 'Code 2' specs --require specs/helpers/chai.js
# sleep 3

# echo "next Code 3"
# sleep 3
# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 10 &
# sleep 3
# mocha -g 'Code 3: Case 1, 2, 3 Setalias' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 4 &
# sleep 3
# mocha -g 'Code 3: Case 4' specs --require specs/helpers/chai.js
# killall node
# sleep 3


echo "next Code 4"
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


# sleep 3
# mocha -g 'Code 4: Case 7' specs --require specs/helpers/chai.js
# killall node
# sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 14 &
sleep 3
mocha -g 'Code 4: Case 8' specs --require specs/helpers/chai.js
killall node
sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 11 &
sleep 3
mocha -g 'Code 4: Case 9' specs --require specs/helpers/chai.js
killall node
sleep 3

node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 1 &
sleep 3
mocha -g 'Code 4: Case 10' specs --require specs/helpers/chai.js
killall node
sleep 3





# echo "next"
# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 4 &
# sleep 3
# mocha -g 'Code 5: Case 1' specs --require specs/helpers/chai.js

# sleep 3
# mocha -g 'Code 5: Case 2' specs --require specs/helpers/chai.js
# sleep 3

# sleep 3
# mocha -g 'Code 5: Case 3' specs --require specs/helpers/chai.js
# sleep 3

# sleep 3
# mocha -g 'Code 5: Case 4' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 8 &
# sleep 3
# mocha -g 'Code 5: Case 5' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 9 &
# sleep 3
# mocha -g 'Code 5: Case 6' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# echo "next"

# node /Users/tsn/Desktop/microgear_helpers/publish_helper/publish_helper.js 4 &
# sleep 3
# mocha -g 'Code 6: Case 1' specs --require specs/helpers/chai.js
# sleep 3

# mocha -g 'Code 6: Case 2' specs --require specs/helpers/chai.js
# sleep 3

# mocha -g 'Code 6: Case 3' specs --require specs/helpers/chai.js
# sleep 3

# mocha -g 'Code 6: Case 4' specs --require specs/helpers/chai.js
# sleep 3

# mocha -g 'Code 6: Case 5' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3
