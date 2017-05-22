@module {{}} can-validate-interface
@parent can-infrastructure
@package ./package.json

@description `can-validate-interface` provides simple property existence validation. Use to prevent errors resulting
from missing properties on input objects.


@signature `makeInterfaceValidator(propertyArrays)`

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

@param {Array.<String, Array.<String>>} propertyArrays Property names and arrays of property names to validate existence of

@return {function({*}): {{message:String, related:Array.<String>}}} Function that validates an object for properties in propertyArrays and returns an error record or undefined if no properties are missing.