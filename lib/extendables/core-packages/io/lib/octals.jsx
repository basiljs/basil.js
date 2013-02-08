exports.ByteString = ByteString;

/**
 * @desc provides ByteString / ByteArray functionality for ExtendScript.
 * Handy when handling HTTP responses: UTF-8 can be multi-byte, but
 * the content-length header is always passed along as the number of octals, 
 * not the number of characters.
 *
 * Be aware that the implementation is not particularly fast: it takes
 * about 75 milliseconds to process a 1000 character string.
 *
 * @param {String|Array} input Accepts either a plain string or a byte array;
 */

function ByteString (input) {
	var self = this;
	
	if (input.is(String)) {
		var string = input;
		this._bytearray = null;
	} else if (input.is(Array)) {
		var string = input.join('');
		this._bytearray = input;
	}
	
	this.as_bytearray = function () {
		if (self._bytearray !== null) {
			return self._bytearray;
		} else {
			self._bytearray = [];
		}

		var characters = [];
		for (i = 0; i < string.length; i++) {
			characters.push(string.charAt(i));
		}
	
		// map/reduce/flatten would've been more elegant
		// but it chucks performance down the drain
		characters.forEach(function (character) {
			var length = ByteString.count_bytes(character);
			for (i = 1; i <= length; i++) {
				if (i == length) {
					self._bytearray.push(character);
				} else {
					self._bytearray.push('');
				}
			}
		});
		return self._bytearray;
	}

	this.length = this.as_bytearray().length;

	this.slice = function (start, end) {
		var end = end || self.length;
		return new ByteString(self.as_bytearray().slice(start, end).join(''));		
	}

	this.substr = function (start, length) {
		if (length) {
			var end = start + length;
		} else {
			var end = undefined;
		}
		return this.slice(start, end);
	}

	this.indexOf = function (character) {
		return this.as_bytearray().indexOf(character);
	}

	this.indexAfter = function (character) {
		var index = this.indexOf(character);
		if (index == -1) {
			return index;
		} else {
			return index + 1;
		}		
	}

	this.toString = function () {
		return string;
	}
}

ByteString.count_bytes = function (character) {
	var code = character.charCodeAt(0);
			
	if (code >= 65535) {
		return 4;
	} else if (code >= 2048) {
		return 3;
	} else if (code >= 128) {
		return 2;
	} else {
		return 1;
	}
}