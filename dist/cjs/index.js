/*can-validate-interface@0.1.0#index*/
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
function flatten(arrays) {
    return arrays.reduce(function (ret, val) {
        return ret.concat(val);
    }, []);
}
module.exports = makeInterfaceValidator;