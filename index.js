// initialize as no-op functions so no overhead is introduced in production mode
var getInterfaceValidator = function() { return function() { return undefined; } },
	validateArgumentInterface = function(func) { return func };

//!steal-remove-start
getInterfaceValidator = function(interfacePropArrays) {
	var props = flatten(interfacePropArrays);

	return function(base) {
			var missingProps = props.reduce(function(missing, prop) {
				return prop in base ? missing : missing.concat(prop)
			}, []);

		return missingProps.length ? {message:"missing expected properties", related: missingProps} : undefined;
	}
};

validateArgumentInterface = function(func, argIndex, interfaces, errorHandler) {
	return function() {
		var errors = getInterfaceValidator(interfaces)(arguments[argIndex]);
		if (errors && errorHandler) {
			errorHandler(errors, arguments[argIndex]);
		}

		return func.apply(this, arguments);
	}
};
//!steal-remove-end

function flatten(arrays) {
	return arrays.reduce(function(ret, val) {
		return ret.concat(val)
	}, [])
}

module.exports = {getInterfaceValidator, validateArgumentInterface};