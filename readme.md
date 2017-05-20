# can-interface

Utility to validate property existence.  Test for missing properties before they cause errors later.

- <code>[__can-interface__ Object](#caninterfaceobject)</code>
  - <code>[getInterfaceValidator(propertyArrays)](#getinterfacevalidatorpropertyarrays)</code>
  - <code>[validateArgumentInterface(func, argIndex, propertyArrays, errorHandler)](#validateargumentinterfacefunc-argindex-propertyarrays-callback)</code>

## API

## can-interface `{Object}`

Functions that validate objects for property existence

#### <code>__getInterfaceValidator(propertyArrays)__</code>

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

1. __propertyArrays__ `{Array<String, Array<String>}`:
  Property names and arrays of property names to validate existence of.

- __returns__ `{function(object): {{message:String, related:Array<String>}}`:
  Function that validates an object for properties in `propertyArrays` and returns an error record or undefined if no properties are missing.


#### <code>validateArgumentInterface(func, argIndex, propertyArrays, errorHandler)</code>

Get a function that wraps the provided function, validating an indicated argument for the provided
properties and calling a callback if properties are missing:

```js
var interface = require("can-interface");
var dataMethods = ["create","read","update","delete"];
var serializeDao = function(format, dao) {
    // example method
};

serializeDao = interface.validateArgumentInterface(
    serializeDao, 1, [dataMethods, 'id'],
    function(error, argument) {
        throw new Error(error.message + ':' + JSON.stringify(error.related));
    }
);

var dao = {
    create: function() {},
    read: function() {},
    update: function() {},
    delete: function() {}
};

serializeDao('json', dao);
// throws Error: missing expected properties:["id"]
```

1. __func__ `{function(...)}`:
  A function to validate an argument of.

2. __argIndex__ `{Number}`:
  The index of the argument of `func` that should be validated.

3. __propertyArrays__ `{Array<String, Array<String>>}`:
  Property names and arrays of property names to validate existence of.

4. __errorHandler__ `{function({{message:String, related:Array<String>}}, {*})}`:
  Function called if validation fails that receives the error record and the argument that failed validation.

- __returns__ `{function(...)}`:
  Function that calls `func` after validating the existence of properties on the specified argument and calling
  errorHandler if any properties are missing

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run
```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```