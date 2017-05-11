var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var connect = require('can-connect');
var {hasInterface, checkArgumentInterface} = require('./index.js');

var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;
var before = mocha.before;
var after = mocha.after;
var beforeEach = mocha.beforeEach;
var consoleWarn = null;
var BaseInterface = ['id', 'idProp', 'listSet', 'listSetProp'];

describe('can-interface', function() {
	before(function() {
		consoleWarn = console.warn;
	});

	after(function() {
		console.warn = consoleWarn;
	});


	describe('hasInterface', function() {
		beforeEach(function() {
			console.warn = sinon.spy();
		});

		it('should log meaningful warnings when can-connect connection is missing properties', function() {
			var testBehavior = function(baseBehavior) {
				hasInterface(baseBehavior, [BaseInterface, 'testProp']);
				return baseBehavior;
			};

			connect([testBehavior], {});
			assert(console.warn.calledOnce, 'logs one warning');
			assert(console.warn.firstCall.args[0].indexOf('testProp') > -1, 'warning contains missing property name');
		});
	});


	describe('checkArgumentInterface', function() {
		beforeEach(function() {
			console.warn = sinon.spy();
		});

		it('should log meaningful warnings when function argument is missing properties', function() {
			var testBehavior = function(baseBehavior) {
				return baseBehavior;
			};

			testBehavior = checkArgumentInterface(testBehavior, 0, [BaseInterface, 'testProp']);

			connect([testBehavior], {});
			assert(console.warn.calledOnce, 'logs one warning');
			assert(console.warn.firstCall.args[0].indexOf('testProp') > -1, 'warning contains missing property name');
		});
	});

	//describe('should log warnings when base object is missing properties', function() {
	//	var exampleObject
	//
	//	hasInterface();
	//
	//	debugger;
	//});

	//describe('should log warnings when decorated function argument is missing properties', function() {
	//
	//});

	//describe('should log warnings when annotation mixed-in constructor is missing properties', function() {
	//	hasInterface()
	//});
	//
	//describe('should log warnings when native class is missing properties', function() {
	//	hasInterface()
	//});
	//
	//describe('should log warnings when annotated native class is missing properties', function() {
	//	hasInterface()
	//});
});