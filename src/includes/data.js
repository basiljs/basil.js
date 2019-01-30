// ----------------------------------------
// src/includes/data.js
// ----------------------------------------

// ----------------------------------------
// Data/Collections
// ----------------------------------------

/**
 * @summary Runs a function on all elements of an array.
 * @description Used to run a function on all elements of an array. `forEach()` calls this callback function on each element of the given array. When the callback function returns false, the loop stops and an array of all elements up to this point is returned.
 * Please note the existence of the convenience methods `stories()`, `paragraphs()`, `lines()`, `words()` and `characters()` that are used to iterate through all instances of the given type in the given document.
 *
 * @cat     Data
 * @subcat  Collections
 * @method  forEach
 *
 * @param   {Array} collection The array to be processed.
 * @param   {Function} cb The function that will be called on each element. The call will be like `function(item, i)` where `i` is the current index of the item within the array.
 * @return  {Array} An array of the input array elements.
 */
forEach = function(collection, cb) {
  for (var i = 0, len = collection.length; i < len; i++) {

    if(!isValid(collection[i])) {
      warning("forEach(), invalid object processed.");
      continue;
    }

    if(cb(collection[i], i) === false) {
      if(collection.hasOwnProperty("everyItem")) {
        return collection.everyItem().getElements().slice(0, i);
      }
      return collection.slice(0, i);
    }
  }
  return collection;
};

// ----------------------------------------
// Data/Conversion
// ----------------------------------------

/**
 * @summary Converts a number to a binary string.
 * @description Converts a byte, char, int, or color to a String containing the equivalent binary notation. For example `color(0, 102, 153, 255)` will convert to the String `"11111111000000000110011010011001"`. This function can help make your geeky debugging sessions much happier.
 *
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  binary
 *
 * @param   {Number} num value to convert
 * @param   {Number} [numBits] number of digits to return
 * @return  {String} A formatted string
 */
 // From: http://processingjs.org/reference/binary_/
pub.binary = function(num, numBits) {
  var bit;
  if (numBits > 0) bit = numBits;
  else if (num instanceof Char) {
    bit = 16;
    num |= 0;
  } else {
    bit = 32;
    while (bit > 1 && !(num >>> bit - 1 & 1)) bit--;
  }
  var result = "";
  while (bit > 0) result += num >>> --bit & 1 ? "1" : "0";
  return result;
};

/**
 * @summary Converts a number to a hex number.
 * @description Convert a number to a hex representation.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  hex
 *
 * @param   {Number} value The number to convert
 * @param   {Number} [len] The length of the hex number to be created, default: `8`
 * @return  {String} The hex representation as a string
 */
pub.hex = function(value, len) {
  if (arguments.length === 1) len = 8;
  return decimalToHex(value, len);
};

/**
 * @summary Converts a binary number string to a number.
 * @description Converts a String representation of a binary number to its equivalent integer value. For example, `unbinary("00001000")` will return `8`.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  unbinary
 *
 * @param   {String} binaryString value to convert
 * @return  {Number} The integer representation
 */
 // From: http://processingjs.org/reference/unbinary_/
pub.unbinary = function(binaryString) {
  var i = binaryString.length - 1,
    mask = 1,
    result = 0;
  while (i >= 0) {
    var ch = binaryString[i--];
    if (ch !== "0" && ch !== "1") throw "the value passed into unbinary was not an 8 bit binary number";
    if (ch === "1") result += mask;
    mask <<= 1;
  }
  return result;
};

/**
 * @summary Converts a hex number to a number.
 * @description Convert a hex representation to a number.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  unhex
 *
 * @param   {String} hex The hex representation
 * @return  {Number} The number
 */
pub.unhex = function(hex) {
  if (hex instanceof Array) {
    var arr = [];
    for (var i = 0; i < hex.length; i++) arr.push(unhexScalar(hex[i]));
    return arr;
  }
  return unhexScalar(hex);
};

// ----------------------------------------
// Data/CSV
// ----------------------------------------

// Taken and hijacked from d3.js robust csv parser. Hopefully Michael Bostock won't mind.
// https://github.com/mbostock/d3/tree/master/src/dsv
pub.CSV = new CSV();
function CSV() {
  var reParse = null,
    reFormat = null,
    delimiterStr = null,
    delimiterCode = null;

  initDelimiter(",");
  function initDelimiter(delimiter) {
    reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), // field separator regex
    reFormat = new RegExp("[\"" + delimiter + "\n]"),
    delimiterCode = delimiter.charCodeAt(0);
    delimiterStr = delimiter;
  }

  /**
   * @summary Decodes a CSV string to an array.
   * @description Function parses a string as CSV-object Array.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.decode
   *
   * @param   {String} String to be parsed as CSV-object.
   * @return  {Array} Returns CSV-object Array
   *
   * @example
   * var arr = CSV.decode(str);
   * var str = CSV.encode(arr);
   */
  this.decode = function(text) {
    var header;
    return parseRows(text, function(row, i) {
      if (i) {
        var o = {}, j = -1, m = header.length;
        while (++j < m) o[header[j]] = row[j];
        return o;
      } else {
        header = row;
        return null;
      }
    });
  };

  /**
   * @summary Sets the delimiter of the CSV decode and encode function.
   * @description Sets the delimiter of the CSV decode and encode function.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.delimiter
   *
   * @param   {String} [delimiter] Optional Sets the delimiter for CSV parsing
   * @return  {String} Returns the current delimiter if called without argument
   */
  this.delimiter = function(delimiter) {
    if (arguments.length === 0) return delimiterStr;
    if (typeof delimiter === "string") {
      initDelimiter(delimiter);
    } else {
      error("CSV.delimiter, separator has to be a character or string");
    }
  };

  /**
   * @summary Encodes an array to a CSV string.
   * @description Function convert an javascript array of objects to a CSV-string.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.encode
   *
   * @param   {Array} Array to be converted to a CSV-string
   * @return  {String} Returns CSV-string
   *
   * @example
   * var str = CSV.encode(arr);
   * var arr = CSV.decode(str);
   */
  this.encode = function(rows) {
    var csvStrings = [];
    var header = [];
    var firstRow = rows[0]; // all rows have to have the same properties keys
    // gather infos for the header
    for (var propname in firstRow) {
      if (firstRow.hasOwnProperty(propname)) {
        header.push(propname);
      }
    }
    csvStrings.push(formatRow(header));
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var tokens = [];
      for (var ii = 0; ii < header.length; ii++) {
        tokens.push(row[header[ii]]);
      }
      csvStrings.push(formatRow(tokens));
    }
    return csvStrings.join("\n");
  };

  function formatRow(row) {
    for (var i = 0; i < row.length; i++) {
      row[i] = formatValue(row[i]);
    }
    return row.join(delimiterStr);
  }

  function formatValue(text) {
    return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

    reParse.lastIndex = 0; // work-around bug in FF 3.6

    function token() {
      if (reParse.lastIndex >= text.length) return EOF; // special case: end of file
      if (eol) { eol = false; return EOL; } // special case: end of line

      // special case: quotes
      var j = reParse.lastIndex;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < text.length) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            i++;
          }
        }
        reParse.lastIndex = i + 2;
        var c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) reParse.lastIndex++;
        } else if (c === 10) {
          eol = true;
        }
        return text.substring(j + 1, i).replace(/""/g, "\"");
      }

      // common case
      var m = reParse.exec(text);
      if (m) {
        eol = m[0].charCodeAt(0) !== delimiterCode;
        return text.substring(j, m.index);
      }
      reParse.lastIndex = text.length;
      return text.substring(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && !(a = f(a, n++))) continue;
      rows.push(a);
    }

    return rows;
  }
}

// ----------------------------------------
// Data/HashList
// ----------------------------------------

/**
 * @summary HashList is a data container to store key - value pairs.
 * @description HashList is a data container that allows you to store information as key - value pairs. As usual in JavaScript mixed types of keys and values are accepted in one HashList instance.
 *
 * @cat     Data
 * @subcat  HashList
 * @method  HashList
 *
 * @class
 */
// taken from http://pbrajkumar.wordpress.com/2011/01/17/hashmap-in-javascript/
HashList = function () {
  var that = {};
  that.length = 0;
  that.items = {};

  for (var key in that.items) {
    pub.println(key);
  }

  // Please note: this is removing Object fields, but has to be done to have an empty "bucket"
  function checkKey(key) {
    if(that.items[key] instanceof Function) {
      that.items[key] = undefined;
    }
  }

  /**
   * @summary Deletes all key - value pairs in a HashList.
   * @description Deletes all the key - value pairs in this HashList.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.clear
   */
  that.clear = function() {
    for (var i in that.items) {
      delete that.items[i];
    }
    that.length = 0;
  };

  /**
   * @summary Gets a HashList value by its key.
   * @description This gets a value by its key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.get
   *
   * @param   {String} key The key to look for.
   * @return  {Object} The value.
   */
  that.get = function(key) {
    return that.items[key];
  };

  /**
   * @summary Gets an array of all HashList keys.
   * @description Returns an array with all keys.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getKeys
   *
   * @return  {Array} An array with all the keys.
   */
  that.getKeys = function () {
    var keys = [];

    for(var key in that.items)
      {
      if(that.items.hasOwnProperty(key))
          {
        keys.push(key);
      }
    }
    return keys;
  };

  /**
   * @summary Gets an array of all HashList keys sorted by their values.
   * @description Returns an array of all keys that are sorted by their values from highest to lowest. Please note that this only works if you have conistently used Numbers for values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getKeysByValues
   *
   * @return  {Array} An array with all the keys.
   */
  that.getKeysByValues = function() {
    var obj = that.items;
    var keys = [];
    for(var key in obj)
        {
      if(typeof obj[key] != "number") error("HashList.getKeysByValues(), only works with Numbers as values. ");
      keys.push(key);
    }
    return keys.sort(function(a, b) {return obj[b] - obj[a];});
  };

  /**
   * @summary Gets an array of all HashList keys in a sorted order from higher to lower magnitude.
   * @description Returns an array with all keys in a sorted order from higher to lower magnitude.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getSortedKeys
   *
   * @return  {Array} An array with all the keys sorted.
   */
  that.getSortedKeys = function () {
    return that.getKeys().sort(); // ["a", "b", "z"]
  };

  /**
   * @summary Gets an array of all HashList values.
   * @description Returns an array with all values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getValues
   *
   * @return  {Array} An array with all the values.
   */
  that.getValues = function () {

    var obj = that.items;
    var values = [];

    for(var key in obj) {
      values.push(obj[key]);
    }
    return values;

  };

  /**
   * @summary Checks if a HashList key exists.
   * @description Checks for the existence of a given key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.hasKey
   *
   * @param   {String} key The key to check.
   * @return  {Boolean} Returns true or false.
   */
  that.hasKey = function(key) {
    checkKey(key);
    return typeof that.items[key] != "undefined";
  };

  /**
   * @summary Checks if a HashList value exists.
   * @description Checks if a certain value exists at least once in all of the key - value pairs.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.hasValue
   *
   * @param   {Object|String|Number|Boolean} value The value to check.
   * @return  {Boolean} Returns true or false.
   */
  that.hasValue = function(value) {
    var obj = that.items;
    var found = false;
    for(var key in obj) {
      if (obj[key] === value) {
        found = true;
        break;
      }
    }
    return found;
  };

  /**
   * @summary Removes a HashList key - value pair by its key.
   * @description This removes a key - value pair by its key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.remove
   *
   * @param   {String} key The key to delete.
   * @return  {Object} The value before deletion.
   */
  that.remove = function(key) {
    var tmp_previous;
    if (typeof that.items[key] != "undefined") {
      var tmp_previous = that.items[key];
      delete that.items[key];
      that.length--;
    }
    return tmp_previous;
  };

  /**
   * @summary Sets a HashList key - value pair.
   * @description This sets a key - value pair. If a key is already existing, the value will be updated. Please note that Functions are currently not supported as values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.set
   *
   * @param   {String} key The key to use.
   * @param   {Object|String|Number|Boolean} value The value to set.
   * @return  {Object} The value after setting.
   */
  that.set = function(key, value) {

    if(value instanceof Function) error("HashList does not support storing Functions as values.");
    checkKey(key);
    if (typeof value != "undefined") {
      if (typeof that.items[key] === "undefined") {
        that.length++;
      }
      that.items[key] = value;
    }
    return that.items[key];
  };

  return that;
};

// ----------------------------------------
// Data/JSON
// ----------------------------------------

pub.JSON = {
  /**
   * @summary Decodes a string to a JSON object.
   * @description Function parses and validates a string as JSON-object.
   *
   * @cat     Data
   * @subcat  JSON
   * @method  JSON.decode
   *
   * @param   {String} String to be parsed as JSON-object.
   * @return  {Object} Returns JSON-object or throws an error if invalid JSON has been provided.
   *
   * @example
   * var obj = JSON.decode(str);
   * var str = JSON.encode(obj);
   */
  // From: jQuery JavaScript Library v1.7.1 http://jquery.com/
  decode: function(data) {
    if (typeof data !== "string" || !data) {
      return null;
    }
    var rvalidchars = /^[\],:{}\s]*$/,
      rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if (rvalidchars.test(data.replace(rvalidescape, "@")
      .replace(rvalidtokens, "]")
      .replace(rvalidbraces, ""))) {
      return (new Function("return " + data))();
    }
    error("JSON.decode(), invalid JSON: " + data);
  },

  /**
   * @summary Encodes an object to a JSON string.
   * @description Function convert an javascript object to a JSON-string.
   *
   * @cat     Data
   * @subcat  JSON
   * @method  JSON.encode
   *
   * @param   {Object} Object to be converted to a JSON-string
   * @return  {String} Returns JSON-string
   *
   * @example
   * var str = JSON.encode(obj);
   * var obj = JSON.decode(str);
   */
  // From: https://gist.github.com/754454
  encode: function(obj) {
    var t = typeof (obj);
    if (t !== "object" || obj === null) {
      // simple data type
      if (t === "string") obj = "\"" + obj + "\"";
      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor === Array);

      for (n in obj) {
        v = obj[n];
        t = typeof (v);
        if (obj.hasOwnProperty(n)) {
          if (t === "string") v = "\"" + v + "\""; else if (t === "object" && v !== null) v = pub.JSON.encode(v);
          json.push((arr ? "" : "\"" + n + "\":") + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  }
};

// ----------------------------------------
// Data/String Functions
// ----------------------------------------

/**
 * @summary Checks wether a string ends with a specific character or string.
 * @description Checks whether a string ends with a specific character or string.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  endsWith
 *
 * @param   {String} str A string to be checked
 * @param   {String} suffix The string to look for
 * @return  {Boolean} Returns either true or false
 */
var endsWith = pub.endsWith = function(str, suffix) {
  if(!isString(str) || !isString(suffix)) {
    error("endsWith() requires two strings, the string to be checked and the suffix to look for.");
  }
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * @summary Combines an array into a string.
 * @description Combines an array of Strings into one String, each separated by the character(s) used for the separator parameter. To join arrays of ints or floats, it's necessary to first convert them to strings using `nf()` or `nfs()`.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  join
 *
 * @param   {Array} array A string array
 * @param   {String} separator The separator to be inserted
 * @return  {String} The joined string
 */
 // http://processingjs.org/reference/join_/
pub.join = function(array, separator) {
  return array.join(separator);
};

/**
 * @summary Formats numbers into strings, with options for leading and trailing zeros.
 * @description Utility function for formatting numbers into strings. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * `nf()` is used to add zeros to the left and/or right of a number. This is typically for aligning a list of numbers. To remove digits from a floating-point number, use the `ceil()`, `floor()`, or `round()` functions.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nf
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nf_/
pub.nf = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits);
};

/**
 * @summary Formats numbers into strings, including comma separators to mark units of 1000.
 * @description Utility function for formatting numbers into strings and placing appropriate commas to mark units of 1000. There are two versions, one for formatting ints and one for formatting an array of ints. The value for the digits parameter should always be a positive integer.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfc
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfc_/
pub.nfc = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits, ",");
};

/**
 * @summary Formats numbers into strings, including a leading + or -.
 * @description Utility function for formatting numbers into strings. Similar to `nf()` but puts a `+` in front of positive numbers and a `-` in front of negative numbers. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfp
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfp_/
pub.nfp = function(value, leftDigits, rightDigits) {
  return nfCore(value, "+", "-", leftDigits, rightDigits);
};

/**
 * @summary Formats numbers into strings, including a blank space before positive numbers.
 * @description Utility function for formatting numbers into strings. Similar to `nf()` but leaves a blank space in front of positive numbers so they align with negative numbers in spite of the minus symbol. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfs
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfs_/
pub.nfs = function(value, leftDigits, rightDigits) {
  return nfCore(value, " ", "-", leftDigits, rightDigits);
};

/**
 * @summary Splits a string using a specific string or character as divider.
 * @description The `split()` function breaks a string into pieces using a character or string as the divider. The `delim` parameter specifies the character or characters that mark the boundaries between each piece. An array of strings is returned that contains each of the pieces.
 *
 * The `splitTokens()` function works in a similar fashion, except that it splits using a range of characters instead of a specific character or sequence.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  split
 *
 * @param   {String} str the String to be split
 * @param   {String} [delim] The string used to separate the data
 * @return  {Array} Array of strings
 */
 // http://processingjs.org/reference/split_/
pub.split = function(str, delim) {
  return str.split(delim);
};

/**
 * @summary Splits a string using a list of strings as dividers.
 * @description The `splitTokens()` function splits a string at one or many character "tokens." The tokens parameter specifies the character or characters to be used as a boundary.
 *
 * If no tokens character is specified, any whitespace character is used to split. Whitespace characters include tab (`\t`), line feed (`\n`), carriage return (`\r`), form feed (`\f`), and space.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  splitTokens
 *
 * @param   {String} str the String to be split
 * @param   {String} [tokens] list of individual characters that will be used as separators
 * @return  {Array} Array of strings
 */
 // From: http://processingjs.org/reference/splitTokens_/
pub.splitTokens = function(str, tokens) {
  if (arguments.length === 1) tokens = "\n\t\r\u000c ";
  tokens = "[" + tokens + "]";
  var ary = [];
  var index = 0;
  var pos = str.search(tokens);
  while (pos >= 0) {
    if (pos === 0) str = str.substring(1);
    else {
      ary[index] = str.substring(0, pos);
      index++;
      str = str.substring(pos);
    }
    pos = str.search(tokens);
  }
  if (str.length > 0) ary[index] = str;
  if (ary.length === 0) ary = undefined;
  return ary;
};

/**
 * @summary Checks whether a string starts with a specific character or string.
 * @description Checks whether a string starts with a specific character or string.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  startsWith
 *
 * @param   {String} str A string to be checked
 * @param   {String} prefix The string to look for
 * @return  {Boolean} Returns either true or false
 */
var startsWith = pub.startsWith = function(str, prefix) {
  if(!isString(str) || !isString(prefix)) {
    error("startsWith() requires two strings, the string to be checked and the prefix to look for.");
  }
  return str.indexOf(prefix) === 0;
};

/**
 * @summary Removes whitespace from the beginning or end of a string.
 * @description Removes whitespace characters from the beginning and end of a String. In addition to standard whitespace characters such as space, carriage return, and tab, this function also removes the Unicode "nbsp" character.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  trim
 *
 * @param   {String|Array} str A string or an array of strings to be trimmed
 * @return  {String|Array} Returns the input in a trimmed way
 */
 // From: http://processingjs.org/reference/trim_/
pub.trim = function(str) {
  if (str instanceof Array) {
    var arr = [];
    for (var i = 0; i < str.length; i++) arr.push(str[i].replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, ""));
    return arr;
  }
  return str.replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, "");
};

/**
 * @summary Removes whitespace and punctuation from the beginning and end of a string.
 * @description Removes multiple, leading or trailing spaces and punctuation from "words". E.g. converts `"word!"` to `"word"`. Especially useful together with `words()`;
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  trimWord
 *
 * @param   {String} s The String to trim
 * @return  {String} The trimmed string
 */
 // from: https://stackoverflow.com/a/25575009/3399765
pub.trimWord = function(s) {
  s = s.replace(/\s*/g, "")
       .replace(/\n*/g, "")
       .replace(/(^[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]*)|([\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]*$)/gi, "");
  return s;
};

// ----------------------------------------
// Data/Type-Check
// ----------------------------------------

/**
 * @summary Checks wether a var is an array.
 * @description Checks whether a var is an array, returns `true` if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isArray
 *
 * @param   {Object|String|Number|Boolean} obj The object to check
 * @return  {Boolean} returns true if this is the case
 */
var isArray = pub.isArray = function(obj) {
  if(obj === undefined || obj === null) {
    return false;
  }
  return obj.constructor.name === "Array";
};

/**
 * @summary Checks wether a var is an integer.
 * @description Checks whether a var is an integer, returns `true` if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isInteger
 *
 * @param   {Object|String|Number|Boolean} num The number to check.
 * @return  {Boolean} Returns true if the given argument is an integer.
 */
var isInteger = pub.isInteger = function(num) {
  return Object.prototype.toString.call(num) === "[object Number]" && num % 1 === 0;
};

/**
 * @summary Checks wether a var is a number.
 * @description Checks whether a var is a number, returns `true if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isNumber
 *
 * @param   {Object|String|Number|Boolean} num The number to check
 * @return  {Boolean} returns true if this is the case
 */
var isNumber = pub.isNumber = function(num) {
  if (num === null) {
    return false;
  }
  if (isNaN(num)) {
    return false;
  }
  return isFinite(num) && num.constructor.name === "Number";
};

/**
 * @summary Checks wether a var is a string.
 * @description Checks whether a var is a string, returns `true` if this is the case
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isString
 *
 * @param   {Object|String|Number|Boolean} str The string to check
 * @return  {Boolean} returns true if this is the case
 */
var isString = pub.isString = function(str) {
  return Object.prototype.toString.call(str) === "[object String]";
};

/**
 * @summary Checks wether a var is an InDesign text object.
 * @description Checks whether a var is an InDesign text object, returns `true` if this is the case.
 * NB: a InDesign text frame will return `false` as it is just a container holding text. So you could say that `isText()` refers to all the things inside a text frame.
 *
 * @cat     Document
 * @subcat  Type-Check
 * @method  isText
 *
 * @param   {Character|InsertionPoint|Line|Paragraph|TextColumn|TextStyleRange|Word} obj The object to check
 * @return  {Boolean} returns true if this is the case
 */
var isText = pub.isText = function(obj) {

  return obj instanceof Character ||
         obj instanceof InsertionPoint ||
         obj instanceof Word ||
         obj instanceof Line ||
         obj instanceof TextStyleRange ||
         obj instanceof Paragraph ||
         obj instanceof TextColumn ||
         obj instanceof Text ||
         obj.constructor.name === "Characters" ||
         obj.constructor.name === "InsertionPoints" ||
         obj.constructor.name === "Words" ||
         obj.constructor.name === "Lines" ||
         obj.constructor.name === "TextStyleRanges" ||
         obj.constructor.name === "Paragraphs" ||
         obj.constructor.name === "TextColumns";
};

/**
 * @summary Checks wether a var is a valid URL string.
 * @description Checks wether an URL string is valid.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isURL
 *
 * @param   {String} url An url string to be checked
 * @return  {Boolean} Returns either true or false
 */
var isURL = pub.isURL = function(url) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
};

// ----------------------------------------
// Data Private
// ----------------------------------------

var decimalToHex = function(d, padding) {
  padding = padding === undefined || padding === null ? padding = 8 : padding;
  if (d < 0) d = 4294967295 + d + 1;
  var hex = Number(d).toString(16).toUpperCase();
  while (hex.length < padding) hex = "0" + hex;
  if (hex.length >= padding) hex = hex.substring(hex.length - padding, hex.length);
  return hex;
};

function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
  if (value instanceof Array) {
    var arr = [];
    for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
    return arr;
  }
  return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
}

function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
  var sign = value < 0 ? minus : plus;
  var autoDetectDecimals = rightDigits === 0;
  var rightDigitsOfDefault = rightDigits === undefined || rightDigits < 0 ? 0 : rightDigits;
  var absValue = Math.abs(value);
  if (autoDetectDecimals) {
    rightDigitsOfDefault = 1;
    absValue *= 10;
    while (Math.abs(Math.round(absValue) - absValue) > 1.0E-6 && rightDigitsOfDefault < 7) {
      ++rightDigitsOfDefault;
      absValue *= 10;
    }
  } else if (rightDigitsOfDefault !== 0) absValue *= Math.pow(10, rightDigitsOfDefault);
  var number, doubled = absValue * 2;
  if (Math.floor(absValue) === absValue) number = absValue;
  else if (Math.floor(doubled) === doubled) {
    var floored = Math.floor(absValue);
    number = floored + floored % 2;
  } else number = Math.round(absValue);
  var buffer = "";
  var totalDigits = leftDigits + rightDigitsOfDefault;
  while (totalDigits > 0 || number > 0) {
    totalDigits--;
    buffer = "" + number % 10 + buffer;
    number = Math.floor(number / 10);
  }
  if (group !== undefined) {
    var i = buffer.length - 3 - rightDigitsOfDefault;
    while (i > 0) {
      buffer = buffer.substring(0, i) + group + buffer.substring(i);
      i -= 3;
    }
  }
  if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
  return sign + buffer;
}

var unhexScalar = function(hex) {
  var value = parseInt("0x" + hex, 16);
  if (value > 2147483647) value -= 4294967296;
  return value;
};

pub.match = function(str, regexp) {
  return str.match(regexp);
};

pub.matchAll = function(aString, aRegExp) {
  var results = [],
    latest;
  var regexp = new RegExp(aRegExp, "g");
  while ((latest = regexp.exec(aString)) !== null) {
    results.push(latest);
    if (latest[0].length === 0)++regexp.lastIndex;
  }
  return results.length > 0 ? results : null;
};
