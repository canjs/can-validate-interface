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
});