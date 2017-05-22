# can-validate-interface

Utility to validate property existence. Test for missing properties before they cause errors later.

- <code>[makeInterfaceValidator(propertyArrays)](#makeinterfacevalidatorpropertyarrays)</code>

## API

### can-validate-interface `function`

Validate objects for property existence

#### <code>__makeInterfaceValidator(propertyArrays)__</code>

Get a function that validates a given object for the provided properties:

```js
var makeInterfaceValidator = require("can-validate-interface");
var dataMethods = ["create","read","update","delete"];
var daoValidator = makeInterfaceValidator([dataMethods, "id"]);

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