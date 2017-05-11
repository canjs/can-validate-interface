// Currently expects interface as list(s) of property names
// Could add interface names to lists to give more detailed error messages
// eg.
//    can-interface: base object missing expected properties: "add", "remove", "save", "hydrate"
// vs.
//    can-interface: base object missing properties expected of interfaces:
//        Composite, missing: "add", "remove"
//        Model, missing: "save"
//        anonymous interface, missing: "hydrate"
//
// Named interfaces could also give more information during documentation building phase


function hasInterface(base, propArrays) {
	var props = flatten(propArrays),
		missingProps = props.reduce(function(missing, prop) {
			return prop in base ? missing : missing.concat(prop)
		}, []);

	if (missingProps.length > 0) {
		var missingPropsString = '"' + missingProps.join('", "') + '"';
		console.warn('can-interface: object missing expected properties: ' + missingPropsString);
	}

	return missingProps.length === 0;
}

function checkArgumentInterface(func, argIndex, interfaces) {
	return function() {
		hasInterface(arguments[argIndex], interfaces);
		return func.apply(this, arguments);
	}
}

function flatten(arrays) {
	return arrays.reduce(function(ret, val) {
		return ret.concat(val)
	}, [])
}

module.exports = {hasInterface, checkArgumentInterface};