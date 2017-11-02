'use strict';

var QUnit = require('steal-qunit');
var connect = require('can-connect');
var makeInterfaceValidator = require('./index.js');

var BaseInterface = ['id', 'idProp', 'listSet', 'listSetProp'];

QUnit.module('can-validate-interface/makeInterfaceValidator');

QUnit.test('should return can-validate style error when can-connect connection is missing property', function() {
	var testBehavior = function(baseBehavior) {
		var validator = makeInterfaceValidator([BaseInterface, 'testProp']),
			error = validator(baseBehavior);

		equal(error.message, 'missing expected properties', 'missing property validation error raised');
		deepEqual(error.related, ['testProp'], 'error contains missing property name');

		return baseBehavior;
	};

	connect([testBehavior], {});
});
