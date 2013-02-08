/**
 * @desc This is a simple string formatting method, loosely inspired on the one in Python 3.
 * 
 * * In unnamed mode, specify placeholders with the **{}** symbol.
 * * In named mode, specify placeholders with **{propname}**.
 *
 * @param {String} replacements
 *     For each **{}** symbol in the text, ``format`` expects a replacement argument.
 *     Calls `.toString()` on each replacement, so you can pass in any data type.
 *     You may also specify a single replacement object, which will do named formatting.
 *
 * @example
 *     > var person = {'salutation': 'mister', 'name': 'John Smith'};
 *     > var hello = "Hello there, {}, I've heard your name is {}!".format(person.salutation, person.name);
 *     > $.writeln(hello);
 *     "Hello there, mister, I've heard your name is John Smith"
 *
 * @example
 *     > var person = {'salutation': 'mister', 'name': 'John Smith'};
 *     > var hello = "Hello there, {salutation}, I've heard your name is {name}!".format(person);
 *     > $.writeln(hello);
 *     "Hello there, mister, I've heard your name is John Smith"
 */

exports.format = function() {
	var replacements = arguments.to('array');
	var str = replacements.shift();
	var named = replacements.length == 1 && replacements[0].reflect.name == 'Object';
	
	if (named) {
		var dict = replacements[0];
        dict.keys().forEach(function (key) {
			// replace globally (flagged g)
			str = str.replace("{" + key + "}", dict[key], "g");
		});
		return str;
	} else {
		// split the string into parts around the substring replacement symbols ({}).
		var chunks = str.split("{}");
		// fill in the replacements
		for (var i in chunks) {
			var replacement = replacements.shift();
			if (replacement) chunks[i] += replacement.toString();
		}
		// join everything together
		return chunks.join('');		
	}
}

/**
 * @desc Tests whether the string starts with the specified substring.
 * @param {String} substring
 * @returns {Bool} True or false.
 */

exports.startswith = function (self, substring) {
	return new Boolean(selflength && self.indexOf(substring) === 0).valueOf();
}

/**
 * @desc Tests whether the string ends with the specified substring.
 * @param {String} substring
 * @returns {Bool} True or false.
 */

exports.endswith = function (self, substring) {
	return new Boolean(self.length && self.indexOf(substring) == (self.length - substring.length)).valueOf();
}

/**
 * @desc Tests whether the string contains the specified substring.
 * This is equal to ``str.indexOf(substring) != -1``.
 * @param {String} substring
 * @returns {Bool} True or false.
 */

exports.contains = function (self, substring) {
	return self.indexOf(substring) != -1;
}

/**
 * @desc Does what it says.
 * Does not check whether the string actually extends beyond the the substring.
 */

exports.indexAfter = function (self, substring) {
	var index = self.indexOf(substring);
	if (index == -1) {
		return index;
	} else {
		return index + substring.length;
	}
}

/**
 * @desc Removes leading whitespace characters, including tabs, line endings and the like.
 * @param {String} [character] if specified, removes leading characters matching the parameter
 * instead of whitespace.
 *
 * @example
 *     > $.writeln("   hello there   ".trim());
 *     "hello there   "
 */

exports.ltrim = function(self, character) {
	if (character) {
		if (exports.endswith(self, character) == true) {
			return exports.ltrim(self.substr(1), character);
		} else {
			return self;
		}
	} else {
		return self.replace(/^\s+/, "");
	}
}

/**
 * @desc Removes trailing whitespace characters, including tabs, line endings and the like.
 * @param {String} [character] if specified, removes trailing characters matching the parameter
 * instead of whitespace.
 *
 * @example
 *     > $.writeln("   hello there   ".trim());
 *     "   hello there"
 */

exports.rtrim = function (self, character) {
	if (character) {
		if (exports.endswith(self, character) == true) {
			return exports.rtrim(self.slice(0, -1), character);
		} else {
			return self;
		}
	} else {
		return self.replace(/\s+$/, "");
	}
}

/**
 * @desc Removes leading and trailing whitespace characters, including tabs, line endings and the like.
 * @param {String} [character] if specified, removes leading and trailing characters matching the 
 * parameter instead of whitespace.
 * 
 * @example
 *     > $.writeln("   hello there   ".trim());
 *     "hello there"
 */

exports.trim = function(self, character) {
	if (character) {
		return exports.rtrim(exports.ltrim(self, character), character);
	} else {
		return self.replace(/^\s+|\s+$/g, "");
	}
}