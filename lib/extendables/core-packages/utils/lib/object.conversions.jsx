var exports = {};
var base64 = exports;
#include "../dependencies/base64.js"
#include "../dependencies/json2.js"

// keyvalue encoding comes in handy to create things like INI files and HTTP headers

var object = require("utils/object");
var string = require("utils/string");
var array = require("utils/array");

var keyvalue = {};
keyvalue.encode = function (obj, options) {
	var separator = options["separator"] || "=";
	var eol = options["eol"] || "\n";
	var output = "";
	var properties = array.reject(obj.reflect.properties, function (property) {
		return string.startswith(property.name, "_") || property.name == 'reflect';
	});
	array.forEach(properties, function (property) {
		output += property.name + separator + obj[property.name] + eol;
	});
	return output;
}
keyvalue.decode = function (str, options) {
	var separator = options["separator"] || "=";
	var eol = options["eol"] || "\n";
	var obj = {};
	var pairs = str.split(eol);
	array.forEach(pairs, function (pair) {
		pair = pair.split(separator);
		obj[pair[0]] = pair[1];
	});
	return obj;	
}

/**
 * @desc Object serialization.
 * 
 * The result of serialization followed by deserialization is the original object, whereas
 * a conversion is not reversible.
 *
 * @param {String} type Either ``base64`` or ``key-value``.
 * @param {Object} [options] Options, if applicable for the serialization type.
 *
 * @example
 *     > var obj = {'key1': 'value1', 'key2': 'value2'};
 *     > obj.serialize('key-value', {'separator': ': ', 'eol': '\n'});
 *     "key1: value1\nkey2: value2\n"
 */

exports.serialize = function (self, type, options) {
	var options = options || {};
	// type: json, keyvalue
	var serializations = {
		'xml': function () { throw new NotImplementedError(); },
		'json': function () { return JSON.stringify(self); },
		'base64': function () { return base64.encode64(self); },
		'key-value': function () { return keyvalue.encode(self, options); }
	};

	if (serializations.hasOwnProperty(type)) {
		return serializations[type]();
	} else {
		throw RangeError(string.format("This method cannot convert from {} to {}", self.prototype.name, type));
	}
}

/**
 * @desc Object deserialization.
 *
 * @param {String} type Either ``xml``, ``base64`` or ``key-value``.
 * @param {Object} [options] Options, if applicable for the deserialization type.
 */

exports.deserialize = function (self, type, options) {
	var deserializations = {
		'xml': function () { return new XML(self); },
		'json': function () { return JSON.parse(self); },
		'base64': function () { return base64.decode64(self); },
		'key-value': function () { return keyvalue.decode(self, options); }
	}

	if (deserializations.hasOwnProperty(type)) {
		return deserializations[type]();
	} else {
		throw RangeError(string.format("This method cannot convert from {} to {}", self.prototype.name, type));
	}
}

/**
 * @desc Provides easy shortcuts to a number of common conversions, like lowercasing a string or 
 * converting the ``arguments`` object to an array.
 * 
 * All of these conversions return a new object, they do not modify the original.
 * 
 * A ``slug`` is a string that's usable as a filename or in an URL: it's
 * a lowercased string with all non-alphanumeric characters stripped out, and spaces replaced by
 * hyphens.
 *
 * Use this method instead of functions like ``parseInt`` and methods like ``str.toLowerCase()``.
 *
 * @param {String} type
 *     One of ``boolean``, ``number``, ``int``, ``float``, ``string``, ``array``, ``alphanumeric``, ``slug``, ``lower`` and ``upper``.
 *
 * @example
 *     > var list = [1.4, 2.2, 4.3];
 *     > function to_integers () {
 *     ... return arguments.to('array').map(function (item) { return item.to('int'); });
 *     ... }
 *     > to_integers(list);
 *     [1,2,3]
 */

exports.to = function (self, type) {
	// never, ever modify the original object
	var result = object.clone(self);
	
	var conversions = {
		/* types */
		// REFACTOR: 'int' should be 'number', to correspond to the class name!
		'boolean': function () { return !!result; },
		'number': function () { return new Number(result); },
		'int': function () { return parseInt(result); },
		'float': function () { return parseFloat(result); },
		'string': function () { return result.toString() },
		'array': function () { return Array.prototype.slice.call(result); },
		/* other conversions */
		'alphanumeric': function () { return result.replace(/[^a-zA-Z0-9 ]/g, ""); },
		'slug': function () { return result.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().replace(" ", "-"); },
		'lower': function () { return result.toLowerCase(); },
		'upper': function () { return result.toUpperCase(); }
	};

	if (conversions.hasOwnProperty(type)) {
		return conversions[type]();
	} else {
		throw RangeError(string.format("This method cannot convert from {} to {}", self.prototype.name, type));
	}
}