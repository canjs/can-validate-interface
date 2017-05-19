function getInterfaceValidator(interfacePropArrays) {
	var props = flatten(interfacePropArrays);

	return function(base) {
			var missingProps = props.reduce(function(missing, prop) {
				return prop in base ? missing : missing.concat(prop)
			}, []);

		return missingProps.length ? {message:"missing expected properties", related: missingProps} : undefined;
	}
}

function validateArgumentInterface(func, argIndex, interfaces, errorHandler) {
	return function() {
		var errors = getInterfaceValidator(interfaces)(arguments[argIndex]);
		if (errors && errorHandler) {
			errorHandler(errors, arguments[argIndex]);
		}

		return func.apply(this, arguments);
	}
}

function flatten(arrays) {
	return arrays.reduce(function(ret, val) {
		return ret.concat(val)
	}, [])
}

module.exports = {getInterfaceValidator, validateArgumentInterface};