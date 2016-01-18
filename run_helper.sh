#!/bin/sh


echo "The test is starting..."

# node /Users/tsn/Desktop/microgearlib_test_jasmine/helper/publish_helper/publish_helper.js 4
osascript -e 'tell app "Terminal"
	set currentTab to do script "node /Users/tsn/Desktop/MyMochaChaiSinonExample/lib/microgear_helpers/publish_helper/publish_helper.js 4"
end tell'

sleep 6

# /Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/jasmine-node -m create /Users/tsn/Desktop/microgearlib_test_jasmine/spec 
cd /Users/tsn/Desktop/MyMochaChaiSinonExample
mocha -g 'Code 1.2' specs --require specs/helpers/chai.js

osascript -e 'tell application "Terminal" to close (every window whose name contains "node")'

sleep 5
echo "Next test"

osascript -e 'tell app "Terminal"
	set currentTab to do script "node /Users/tsn/Desktop/MyMochaChaiSinonExample/lib/microgear_helpers/publish_helper/publish_helper.js 4"
end tell'

sleep 6

mocha -g 'Code 1.1' specs --require specs/helpers/chai.js

osascript -e 'tell application "Terminal" to close (every window whose name contains "node")'

echo "The test has finished..."