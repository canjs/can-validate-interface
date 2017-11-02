/*can-validate-interface@0.1.1#index*/
'use strict';
function flatten(arrays) {
    return arrays.reduce(function (ret, val) {
        return ret.concat(val);
    }, []);
}
function makeInterfaceValidator(interfacePropArrays) {
    var props = flatten(interfacePropArrays);
    return function (base) {
        var missingProps = props.reduce(function (missing, prop) {
            return prop in base ? missing : missing.concat(prop);
        }, []);
        return missingProps.length ? {
            message: 'missing expected properties',
            related: missingProps
        } : undefined;
    };
}
module.exports = makeInterfaceValidator;