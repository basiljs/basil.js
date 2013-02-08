/* 
 * Patches for functional programming. 
 * Inspired by and sometimes copied from underscore.js 
 */

/**
 * @desc Merge two objects together. This modifies the original object.
 * First use :func:`Object#clone` on the object if you want to keep the original object intact.
 * 
 * @param {Object} obj The object to merge into this one.
 *
 * @returns {Object} Returns the merged object (``this``);
 */

exports.merge = function (self, obj) {
	if (!obj) return;
	
	var merged_obj = self;
	for (var name in obj) {
		merged_obj[name] = obj[name];
	}
	return merged_obj;
}

/**
 * @function
 * @desc An alias for :func:`Object#merge`
 */

exports.extend = exports.merge

/**
 * @desc Creates and returns a clone of the object.
 */

exports.clone = function (self) {
	// speeds things up if we're cloning an array
	if (this instanceof Array) return self.slice(0);
	if (this instanceof String) return self.substring(0);
	// the normal route for any other object
	// though it might not work on some built-in
	// application-specific objects
	return new self.constructor().merge(self);
}

/**
 * @desc
 *     Returns only the keys (also known as 'names') of an object or associative array.
 *     Will filter out any functions, as these are presumed to be object methods. 
 * @returns {Array} An array with all the keys.
 */

exports.keys = function (self) {
	var keys = [];
	for (var key in self) {
        if (self.hasOwnProperty(key) && !(self[key] instanceof Function)) keys.push(key);
    }
	return keys;
}

/**
 * @desc Returns only the values of an object or associative array.
 * @returns {Array} An array with all the values.
 *
 * @example
 *     > var nation = {'name': 'Belgium', 'continent': 'Europe'}
 *     > nation.values();
 *     ['Belgium', 'Europe']
 */

exports.values = function (self) {
	var keys = exports.keys(self);
	var values = [];
	for (var i = 0; i < keys.length; i++) {
		values.push(self[keys[i]]);
	}
	
	return values;
}

/**
 * @desc An alias for ``this instanceof type``.
 * @returns {Bool} True or false.
 *
 * @example
 *     > [].is(Array);
 *     true
 */
exports.is = function(self, type) {
	return self instanceof type;
}

/**
 * @desc Checks whether the object has a value for the specified property.
 * @returns {Bool} True or false.
 */

exports.has = function (self, key) {
	// could be just null or an invalid object
	// either way, has() should return false
	if (self == null || self[key] == null) return false; 
	
	if (key in self) {
		return new Boolean(self[key]) != false;
	} else {
		return false;
	}
}

/**
 * @desc Alias for ``obj.hasOwnProperty``
 * @returns {Bool} True or false.
 */

exports.has_own = function (self, key) {
	return self.hasOwnProperty(key);
}

/**
 * @desc A debugging utility. When used without the ``dump`` argument,
 * equivalent to ``$.writeln(obj.toString())``.
 * @param {Bool} [dump=false]
 *     Dump all properties of this object;
 *     otherwise just returns a string representation.
 */

exports.log = function (self, dump) {
	if (dump) {
		var props = exports.keys(self.reflect.properties);
		for (var i = 0; i < props.length; i++) {
			var property = props[i];
			props[i] = property.name + "\t => " + self[property.name];
		}
		var out = props.join("\n");
	} else {
		var out = self.toString();
	}
	return $.writeln(out);
}