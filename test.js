var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var connect = require('can-connect');
var {getInterfaceValidator, validateArgumentInterface} = require('./index.js');

var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;
var equal = chai.assert;
var BaseInterface = ['id', 'idProp', 'listSet', 'listSetProp'];

describe('can-interface', function() {

	describe('getInterfaceValidator', function() {
		it('should return can-validate style error when can-connect connection is missing property', function() {
			var testBehavior = function(baseBehavior) {
				var validator = getInterfaceValidator([BaseInterface, 'testProp']),
					error = validator(baseBehavior);

				equal(error.message, 'missing expected properties', 'missing property validation error raised');
				equal(error.related, ['testProp'], 'error contains missing property name');

				return baseBehavior;
			};

			connect([testBehavior], {});
		});
	});

	describe('validateArgumentInterface', function() {
		it('should call error handler with can-validate style error and specified argument when that argument is ' +
			'missing interface properties', function() {

			var testArgument = null;

			var testBehavior = function(baseBehavior) {
				equal(baseBehavior, testArgument, 'error handler was called with correct argument');
				return baseBehavior;
			};

			testBehavior = validateArgumentInterface(testBehavior, 0, [BaseInterface, 'testProp'], function(error, base) {
				equal(error.message, 'missing expected properties', 'missing property validation error raised');
				equal(error.related, ['testProp'], 'error contains missing property name');
				testArgument = base;
			});

			connect([testBehavior], {});
		});
	});
});