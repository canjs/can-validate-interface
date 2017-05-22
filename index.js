// initialize as no-op functions so no overhead is introduced in production mode
var makeInterfaceValidator = function() { return function() { return undefined; } };

//!steal-remove-start
makeInterfaceValidator = function(interfacePropArrays) {
	var props = flatten(interfacePropArrays);

	return function(base) {
			var missingProps = props.reduce(function(missing, prop) {
				return prop in base ? missing : missing.concat(prop)
			}, []);

		return missingProps.length ? {message:"missing expected properties", related: missingProps} : undefined;
	}
};
//!steal-remove-end

function flatten(arrays) {
	return arrays.reduce(function(ret, val) {
		return ret.concat(val)
	}, [])
}

module.exports = {makeInterfaceValidator};