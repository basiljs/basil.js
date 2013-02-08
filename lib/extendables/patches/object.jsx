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

Object.prototype.merge = function (obj) {
	if (!obj) return;
	
	var merged_obj = this;
	for (var name in obj) {
		merged_obj[name] = obj[name];
	}
	return merged_obj;
}

/**
 * @function
 * @desc An alias for :func:`Object#merge`
 */

Object.prototype.extend = Object.prototype.merge

/**
 * @desc Creates and returns a clone of the object.
 */

Object.prototype.clone = function () {
	// speeds things up if we're cloning an array
	if (this instanceof Array) return this.slice(0);
	if (this instanceof String) return this.substring(0);
	// the normal route for any other object
	// though it might not work on some built-in
	// application-specific objects
	return new this.constructor().merge(this);
}

/**
 * @desc
 *     Returns only the keys (also known as 'names') of an object or associative array.
 *     Will filter out any functions, as these are presumed to be object methods. 
 * @returns {Array} An array with all the keys.
 */

Object.prototype.keys = function () {
	var keys = [];
	for (var key in this) {
        if (this.hasOwnProperty(key) && !(this[key] instanceof Function)) keys.push(key);
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

Object.prototype.values = function () {
	var self = this;
	return this.keys().map(function (key) {
		return self[key];
	});
}

/**
 * @desc An alias for ``this instanceof type``.
 * @returns {Bool} True or false.
 *
 * @example
 *     > [].is(Array);
 *     true
 */
Object.prototype.is = function(type) {
	return this instanceof type;
}

/**
 * @desc Checks whether the object has a value for the specified property.
 * @returns {Bool} True or false.
 */

Object.prototype.has = function (key) {
	// could be just null or an invalid object
	// either way, has() should return false
	if (this == null || this[key] == null) return false; 
	
	if (key in this) {
		return new Boolean(this[key]) != false;
	} else {
		return false;
	}
}

/**
 * @desc Alias for ``obj.hasOwnProperty``
 * @returns {Bool} True or false.
 */

Object.prototype.has_own = function (key) {
	return this.hasOwnProperty(key);
}

/**
 * @desc A debugging utility. When used without the ``dump`` argument,
 * equivalent to ``$.writeln(obj.toString())``.
 * @param {Bool} [dump=false]
 *     Dump all properties of this object;
 *     otherwise just returns a string representation.
 */

Object.prototype.to_console = function (dump) {
	if (dump) {
		var obj = this;
		var out = obj.reflect.properties.map(function (property) {
			return property.name + "\t => " + obj[property.name]; 
		}).join("\n");
	} else {
		var out = this.toString();
	}
	return $.writeln(out);
}