var chai = require('chai');

chai.config.includeStack = true;

global.should = chai.should;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;