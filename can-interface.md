@module {{}} can-interface
@parent can-infrastructure
@package ./package.json

@description `can-interface` provides simple property existence validation. Use to prevent errors resulting from
missing properties on input objects.



@signature `getInterfaceValidator(propertyArrays)`

Get a function that validates a given object for the provided properties:

```js
var interface = require("can-interface");
var dataMethods = ["create","read","update","delete"];
var daoValidator = interface.getInterfaceValidator([dataMethods, "id"]);

var dao = {
    create: function() {},
    read: function() {},
    update: function() {},
    delete: function() {}
};

var errors = daoValidator(dao);
// errors == {message:"missing expected properties", related: ["id"]}

dao.id = 10;

errors = daoValidator(dao);
// errors == undefined
```

@param {Array.<String, Array.<String>>} propertyArrays Property names and arrays of property names to validate existence of

@return {function({*}): {{message:String, related:Array.<String>}}} Function that validates an object for properties in propertyArrays and returns an error record or undefined if no properties are missing.



@signature `validateArgumentInterface(func, argIndex, propertyArrays, errorHandler)`

Get a function that wraps the provided function, validating an indicated argument for the provided
properties and calling a callback if properties are missing:

```js
var interface = require("can-interface");
var dataMethods = ["create","read","update","delete"];
var serializeDao = function(format, dao) {
    // example method
};

serializeDao = interface.validateArgumentInterface(serializeDao, 1, [dataMethods, 'id'], function(error, argument) {
    throw new Error(error.message + ':' + JSON.stringify(error.related));
});

var dao = {
    create: function() {},
    read: function() {},
    update: function() {},
    delete: function() {}
};

serializeDao('json', dao);
// throws Error: missing expected properties:["id"]
```

@param {function(...[{*}])} func A function to validate an argument of

@param {Number} argIndex The index of the argument of func that should be validated

@params {Array.<String, Array.<String>>} propertyArrays Property names and arrays of property names to validate existence of

@params {function({{message:String, related:Array.<String>}}, {*})} errorHandler Function that receives the error record and argument that failed validation

@return {function(...[{*}])} Function that calls `func` after validating the existence of properties on the specified argument and calling errorHandler if any properties are missing