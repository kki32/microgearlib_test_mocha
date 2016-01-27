echo "start"
cd /Users/tsn/Desktop/MyMochaChaiSinonExample
echo "


"


echo "Code 1 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
node_modules/mocha/bin/mocha -g 'Code 1: Case 1' specs --require specs/helpers/chai.js
sleep 3

node_modules/mocha/bin/mocha -g 'Code 1: Case 2.2' specs --require specs/helpers/chai.js
sleep 3

node ./microgear_helpers/helper.js 10 &
sleep 3
node_modules/mocha/bin/mocha -g 'Code 1: Case 4 C' specs --require specs/helpers/chai.js
sleep 3
killall node
sleep 3

node ./microgear_helpers/helper.js 19 &
sleep 3
node_modules/mocha/bin/mocha -g 'Code 1: Case 4.3' specs --require specs/helpers/chai.js
sleep 3
killall node
sleep 3
echo "Code 1 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"



# echo "Code 2 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node_modules/mocha/bin/mocha -g 'Code 2' specs --require specs/helpers/chai.js
# sleep 3
# echo "Code 2 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"


# echo "Code 3 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node ./microgear_helpers/helper.js 10 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 3: Case 1, 2, 3 Setalias' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 12 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 3: Case 4' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 4 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 3: Case 5' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3
# echo "Code 3 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"



# echo "Code 4 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node_modules/mocha/bin/mocha -g 'Code 4: Case 1' specs --require specs/helpers/chai.js
# sleep 3

# node ./microgear_helpers/helper.js 1 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 2' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 6 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 3' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3


# node ./microgear_helpers/helper.js 7 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 5' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3


# node_modules/mocha/bin/mocha -g 'Code 4: Case 7' specs --require specs/helpers/chai.js
# sleep 3

# node ./microgear_helpers/helper.js 14 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 8' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 11 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 9' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 1 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 10' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 1 &
# node ./microgear_helpers/2/helperNo2.js 1 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 4: Case 11' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# echo "Code 4 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"


#not yet
# echo "Code 5 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node ./microgear_helpers/helper.js 4 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 5: Case 1' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 5: Case 2' specs --require specs/helpers/chai.js
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 5: Case 3' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 5: Case 4' specs --require specs/helpers/chai.js
# sleep 3

# node ./microgear_helpers/helper.js 9 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 5: Case 5' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 8 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 5: Case 6' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# node ./microgear_helpers/helper.js 4 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 5: Case 7' specs --require specs/helpers/chai.js
# killall node
# sleep 3

# echo "Code 5 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"

echo "Code 6 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node ./microgear_helpers/helper.js 4 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 6: Case 1' specs --require specs/helpers/chai.js
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 6: Case 2' specs --require specs/helpers/chai.js
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 6: Case 3' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

 # node ./microgear_helpers/helper.js 8 &
# node_modules/mocha/bin/mocha -g 'Code 6: Case 4' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

 # node ./microgear_helpers/helper.js 9 &
# node_modules/mocha/bin/mocha -g 'Code 6: Case 5' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

echo "Code 6 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"

echo "Code 7 start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# node ./microgear_helpers/helper.js 4 &
# sleep 3
# node_modules/mocha/bin/mocha -g 'Code 6: Case 1' specs --require specs/helpers/chai.js
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 6: Case 2' specs --require specs/helpers/chai.js
# sleep 3

# node_modules/mocha/bin/mocha -g 'Code 6: Case 3' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

 # node ./microgear_helpers/helper.js 8 &
# node_modules/mocha/bin/mocha -g 'Code 6: Case 4' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3

 # node ./microgear_helpers/helper.js 9 &
# node_modules/mocha/bin/mocha -g 'Code 6: Case 5' specs --require specs/helpers/chai.js
# sleep 3
# killall node
# sleep 3
echo "Code 7 done~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
