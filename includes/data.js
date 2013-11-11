// ----------------------------------------
// Data

pub.JSON = {
  /**
   * Function parses and validates a string as JSON-object. Usage:
   * var obj = b.JSON.decode(str);
   * var str = b.JSON.encode(obj);
   * 
   * @cat Data
   * @subcat JSON
   * @method JSON.decode
   * @param  {String} String to be parsed as JSON-object.
   * @return {Object} Returns JSON-object or throws an error if invalid JSON has been provided.
  */
  // From: jQuery JavaScript Library v1.7.1 http://jquery.com/
  decode: function(data) {
    if ( typeof data !== "string" || !data ) {
      return null;
    }
    var rvalidchars = /^[\],:{}\s]*$/,
      rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if ( rvalidchars.test( data.replace( rvalidescape, "@" )
      .replace( rvalidtokens, "]" )
      .replace( rvalidbraces, "")) ) {
      return ( new Function( "return " + data ) )();
    }
    error( "b.JSON.decode(), invalid JSON: " + data );
  },
  /**
   * Function convert an javascript object to a JSON-string. Usage:
   * var str = b.JSON.encode(obj);
   * var obj = b.JSON.decode(str);
   *
   * @cat Data
   * @subcat JSON
   * @method JSON.encode
   * @param  {Object} Object to be converted to a JSON-string
   * @return {String} Returns JSON-string
   */
  // From: https://gist.github.com/754454
  encode: function(obj) {
    var t = typeof (obj);
    if (t !== "object" || obj === null) {
      // simple data type
      if (t === "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor === Array);

      for (n in obj) {
        v = obj[n];
        t = typeof(v);
        if (obj.hasOwnProperty(n)) {
          if (t === "string") v = '"' + v + '"'; else if (t === "object" && v !== null) v = pub.JSON.encode(v);
          json.push((arr ? "" : '"' + n + '":') + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  }
};

// Taken and hijacked from d3.js robust csv parser. Hopefully Michael Bostock won't mind.
// https://github.com/mbostock/d3/tree/master/src/dsv
pub.CSV = new CSV();
function CSV() {
  var reParse = null, 
      reFormat = null,
      delimiterStr = null,
      delimiterCode = null;

  initDelimiter(',');
  function initDelimiter(delimiter) {
    reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), // field separator regex
    reFormat = new RegExp("[\"" + delimiter + "\n]"),
    delimiterCode = delimiter.charCodeAt(0);
    delimiterStr = delimiter;
  };

  /**
   * Sets the delimiter of the CSV decode and encode function.
   * 
   * @cat Data
   * @subcat CSV
   * @method CSV.delimiter
   * @param  {String} [delimiter] Optional Sets the delimiter for CSV parsing
   * @return {String} Returns the current delimiter if called without argument
  */
  this.delimiter = function(delimiter) {
    if (arguments.length === 0) return delimiterStr;
    if (typeof delimiter === 'string') {
      initDelimiter(delimiter);
    } else {
      error("b.CSV.delimiter, separator has to be a character or string");
    }
  };

  /**
   * Function parses a string as CSV-object Array. Usage:
   * var arr = b.CSV.decode(str);
   * var str = b.CSV.encode(arr);
   * 
   * @cat Data
   * @subcat CSV
   * @method CSV.decode
   * @param  {String} String to be parsed as CSV-object.
   * @return {Array} Returns CSV-object Array
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
   * Function convert an javascript array of objects to a CSV-string. Usage:
   * var str = b.CSV.encode(arr);
   * var arr = b.CSV.decode(str);
   *
   * @cat Data
   * @subcat CSV
   * @method CSV.encode
   * @param  {Array} Array to be converted to a CSV-string
   * @return {String} Returns CSV-string
   */
  this.encode = function(rows) {
    var csvStrings = [];
    var header = [];
    var firstRow = rows[0]; // all rows have to have the same properties keys
    // gather infos for the header
    for (var propname in firstRow) {
      if (firstRow.hasOwnProperty(propname)) {
        header.push(propname);
      };
    };
    csvStrings.push( formatRow(header) );
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var tokens = [];
      for (var ii = 0; ii < header.length; ii++) {
        tokens.push(row[header[ii]]);
      };
      csvStrings.push( formatRow(tokens) );
    };
    return csvStrings.join("\n");
  };

  function formatRow(row) {
    return row.map(formatValue).join(delimiterStr);
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
  };
};

// -- Conversion --

/**  @class b */

/**
 * Converts a byte, char, int, or color to a String containing the
 * equivalent binary notation. For example color(0, 102, 153, 255) 
 * will convert to the String "11111111000000000110011010011001". This 
 * function can help make your geeky debugging sessions much happier.
 *
 
 * @cat Data
 * @subcat Conversion
 * @method binary
 * @param {Number} num value to convert
 * @param {Number} [numBits] number of digits to return
 * @return {String} A formatted string
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
 * Converts a String representation of a binary number to its 
 * equivalent integer value. For example, unbinary("00001000") will 
 * return 8.
 *
 * @cat Data
 * @subcat Conversion
 * @method unbinary
 * @param {String} binaryString value to convert
 * @return {Number} The integer representation
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


var decimalToHex = function(d, padding) {
  padding = padding === undef || padding === null ? padding = 8 : padding;
  if (d < 0) d = 4294967295 + d + 1;
  var hex = Number(d).toString(16).toUpperCase();
  while (hex.length < padding) hex = "0" + hex;
  if (hex.length >= padding) hex = hex.substring(hex.length - padding, hex.length);
  return hex;
};

/**
 * Convert a number to a hex representation. 
 *
 * @cat Data
 * @subcat Conversion
 * @method hex
 * @param {Number} value The number to convert
 * @param {Number} [len] The length of the hex number to be created, default: 8
 * @return {String} The hex representation as a string
 */
pub.hex = function(value, len) {
  if (arguments.length === 1) len = 8;
  return decimalToHex(value, len);
};

var unhexScalar = function(hex) {
  var value = parseInt("0x" + hex, 16);
  if (value > 2147483647) value -= 4294967296;
  return value;
}

/**
 * Convert a hex representation to a number.
 *
 * @cat Data
 * @subcat Conversion
 * @method unhex
 * @param {String} hex The hex representation
 * @return {Number} The number
 */
pub.unhex = function(hex) {
  if (hex instanceof Array) {
    var arr = [];
    for (var i = 0; i < hex.length; i++) arr.push(unhexScalar(hex[i]));
    return arr;
  }
  return unhexScalar(hex);
};


// -- String Functions --



/**
 * Removes multiple, leading or trailing spaces and punctuation from "words". E.g. converts "word!" to "word". Especially useful together with b.words();
 * 
 * @method trimWord
 * @cat Data
 * @subcat String Functions
 * @param {String} s The String to trim
 * @param
 */
 // from: http://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces/
pub.trimWord = function(s) { 
    s = s.replace(/(^[,.!?-]*)|([-,.!?]*$)/gi,"");
    s = s.replace(/\s*/gi,"");
//    s = s.replace(/[ ]{2,}/gi," "); 
    s = s.replace(/\n*/,"");     
    return s;
};

/**
 * Combines an array of Strings into one String, each separated by 
 * the character(s) used for the separator parameter. To join arrays 
 * of ints or floats, it's necessary to first convert them to strings 
 * using nf() or nfs().
 *
 * @method join
 * @cat Data
 * @subcat String Functions
 * @param {Array} array A string array
 * @param {String} separator The separator to be inserted
 * @return {String} The joined string
 */
 // http://processingjs.org/reference/join_/
pub.join = function(array, separator) {
  return array.join(separator);
};

/**
 * The split() function breaks a string into pieces using a
 * character or string as the divider. The delim parameter specifies the
 * character or characters that mark the boundaries between each piece. A
 * String[] array is returned that contains each of the pieces.
 *
 * If the result is a set of numbers, you can convert the String[] array
 * to to a float[] or int[] array using the datatype conversion functions
 * int() and float() (see example above).
 *
 * The splitTokens() function works in a similar fashion, except that it
 * splits using a range of characters instead of a specific character or
 * sequence.    
 *  
 * @cat Data
 * @subcat String Functions
 * @method split
 * @param {String} str the String to be split
 * @param {String} [delim] The string used to separate the data
 * @return {Array} Array of strings
 */
 // http://processingjs.org/reference/split_/
pub.split = function(str, delim) {     
  return str.split(delim);   
};

/**
 * The splitTokens() function splits a String at one or many character 
 * "tokens." The tokens parameter specifies the character or characters 
 * to be used as a boundary.
 *
 * If no tokens character is specified, any whitespace character is used 
 * to split. Whitespace characters include tab (\t), line feed (\n), 
 * carriage return (\r), form feed (\f), and space. To convert a String 
 * to an array of integers or floats, use the datatype conversion functions 
 * int() and float() to convert the array of Strings.
 *  
 * @cat Data
 * @subcat String Functions
 * @method splitTokens
 * @param {String} str the String to be split
 * @param {String} [tokens] list of individual characters that will be used as separators
 * @return {Array} Array of strings
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
  if (ary.length === 0) ary = undef;
  return ary;
};  

/* todo */
pub.match = function(str, regexp) {
  return str.match(regexp);
};

/* todo */
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

function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
  var sign = value < 0 ? minus : plus;
  var autoDetectDecimals = rightDigits === 0;
  var rightDigitsOfDefault = rightDigits === undef || rightDigits < 0 ? 0 : rightDigits;
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
  if (group !== undef) {
    var i = buffer.length - 3 - rightDigitsOfDefault;
    while (i > 0) {
      buffer = buffer.substring(0, i) + group + buffer.substring(i);
      i -= 3;
    }
  }
  if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
  return sign + buffer;
}
function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
  if (value instanceof Array) {
    var arr = [];
    for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
    return arr;
  }
  return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
}

/**    
 * Utility function for formatting numbers into strings. There
 * are two versions, one for formatting floats and one for formatting
 * ints. The values for the digits, left, and right parameters should
 * always be positive integers.

 * As shown in the above example, nf() is used to add zeros to the
 * left and/or right of a number. This is typically for aligning a list
 * of numbers. To remove digits from a floating-point number, use the
 * int(), ceil(), floor(), or round() functions.    
 * 
 * @cat Data
 * @subcat String Functions
 * @method nf
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits   
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nf_/
pub.nf = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits);
};

/**    
 * Utility function for formatting numbers into strings. Similar to nf() 
 * but leaves a blank space in front of positive numbers so they align 
 * with negative numbers in spite of the minus symbol. There are two 
 * versions, one for formatting floats and one for formatting ints. The 
 * values for the digits, left, and right parameters should always be 
 * positive integers.   
 * 
 * @cat Data
 * @subcat String Functions
 * @method nfs
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits   
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfs_/
pub.nfs = function(value, leftDigits, rightDigits) {
  return nfCore(value, " ", "-", leftDigits, rightDigits);
};

/**    
 * Utility function for formatting numbers into strings. Similar to nf() 
 * but puts a "+" in front of positive numbers and a "-" in front of 
 * negative numbers. There are two versions, one for formatting floats 
 * and one for formatting ints. The values for the digits, left, and right 
 * parameters should always be positive integers.      
 * 
 * @cat Data
 * @subcat String Functions
 * @method nfp
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits   
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfp_/
pub.nfp = function(value, leftDigits, rightDigits) {
  return nfCore(value, "+", "-", leftDigits, rightDigits);
};

/**    
 * Utility function for formatting numbers into strings and placing 
 * appropriate commas to mark units of 1000. There are two versions, one 
 * for formatting ints and one for formatting an array of ints. The value 
 * for the digits parameter should always be a positive integer.     
 * 
 * @cat Data
 * @subcat String Functions
 * @method nfc
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits   
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfc_/
pub.nfc = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits, ",");
};


/**    
 * Removes whitespace characters from the beginning and end of a String. 
 * In addition to standard whitespace characters such as space, carriage 
 * return, and tab, this function also removes the Unicode "nbsp" character.    
 * 
 * @cat Data
 * @subcat String Functions
 * @method trim
 * @param {String|Array} str A string or an array of strings to be trimmed
 * @return {String|Array} Returns the input in a trimmed way
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
 * Checks whether an URL string is valid.    
 * 
 * @cat Data
 * @subcat String Functions
 * @method isURL
 * @param {String} url An url string to be checked
 * @return {Boolean} Returns either true or false
 */
var isURL = pub.isURL = function(url) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
};

/**    
 * Checks whether a string ends with a specific character or string.    
 * 
 * @cat Data
 * @subcat String Functions
 * @method endsWith
 * @param {String} str A string to be checked
 * @return {Boolean} Returns either true or false
 */
var endsWith = pub.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**    
 * Checks whether a string starts with a specific character or string.    
 * 
 * @cat Data
 * @subcat String Functions
 * @method startsWith
 * @param {String} str A string to be checked
 * @return {Boolean} Returns either true or false
 */
var startsWith = pub.startsWith = function(str, prefix) {
  return str.indexOf(prefix) === 0;
};


/**
 * Checks whether a var is an Array, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isArray
 * @param  {Object|String|Number|Boolean} obj The object to check
 * @return {Boolean} returns true if this is the case
 */
var isArray = pub.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * Checks whether a var is a number, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isNumber
 * @param  {Object|String|Number|Boolean}  num The number to check
 * @return {Boolean} returns true if this is the case
 */
var isNumber = pub.isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * Checks whether a var is a string, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isString
 * @param  {Object|String|Number|Boolean} str The string to check
 * @return {Boolean} returns true if this is the case
 */
var isString = pub.isString = function(str) {
  return Object.prototype.toString.call(str) === '[object String]';
};

/**
 * Checks whether a var is an indesign text object, returns true if this is the case
 * NB: a indesign TextFrame will return false as it is just a container holding text. 
 * So you could say that isText() refers to all the things inside a TextFrame.
 *
 * @cat Document
 * @subcat Type-Check
 * @method isText
 * @param  {Character|InsertionPoint|Line|Paragraph|TextColumn|TextStyleRange|Word}  obj The object to check
 * @return {Boolean} returns true if this is the case
 */
var isText = pub.isText = function(obj) {
  return obj instanceof Character ||
         obj instanceof InsertionPoint ||
         obj instanceof Line ||
         obj instanceof Paragraph ||
         obj instanceof TextColumn ||
         obj instanceof TextStyleRange ||
         obj instanceof Word;
};


var initDataFile = function(file, mustExist) {
  var result = null;
  if (file instanceof File) {
    result = file;
  } else {
    var folder = new Folder(projectPath().absoluteURI + '/data');
    folder.create(); // creates data folder if not existing, otherwise it just skips
    result = new File(folder.absoluteURI + '/' + file);
  }
  if (mustExist && !result.exists) {
    error('The file "' + result + '" does not exist.');
  }
  return result;
};

var initExportFile = function(file, mustExist) {
  var result = null;
  if (file instanceof File) {
    result = file;
  } else {

    // get rid of some special cases the user might specify
    var pathNormalized = file.split("/");
    for (var i = 0; i < pathNormalized.length; i++) {
      if (pathNormalized[i] === "" || pathNormalized[i] === ".") {
        pathNormalized.splice(i,1);
      };
    };

    var tmpPath = projectPath().absoluteURI;
    var fileName = pathNormalized[pathNormalized.length-1];
    
    // contains the path folders? if so create them ...
    if (pathNormalized.length > 1) {
      var folders = pathNormalized.slice(0,-1);
      for (var i = 0; i < folders.length; i++) {
        tmpPath += "/"+folders[i] 
        var f = new Folder(tmpPath);
        if (!f.exists) f.create();
      };
    } 

    // result = new File(projectPath().absoluteURI + '/' + file);
    result = new File(tmpPath + '/' + fileName);
  }
  if (mustExist && !result.exists) {
    error('The file "' + result + '" does not exist.');
  }
  return result;
};

/**
 * Get the full path to the folder of the active document.
 *
 * @cat Document
 * @subcat Misc
 * @method projectPath
 * @return {File} The folder of the the active document
 */
var projectPath = pub.projectPath = function() {
  var docPath = null;
  try {
    docPath = currentDoc().filePath;
  } catch (e) {
    error("The current document must be saved before its project directory can be accessed.");
  }
  return docPath;
};


/**
 * Executes a shell command and returns the result, currently Mac only.
 * 
 * BE CAREFUL!
 * 
 * @cat Data
 * @subcat Input
 * @method shellExecute
 * @param  {String} cmd The shell command to execute
 * @return {String}
 */
pub.shellExecute = function(cmd) {
  if (Folder.fs === "Macintosh") {
    try {
      return app.doScript("return do shell script item 1 of arguments", ScriptLanguage.applescriptLanguage, [cmd]);
    } catch (e) {
      error("b.shellExecute(): "+e);
    }
  } else {
    error("b.shellExecute() is a Mac only feature at the moment. Sorry!")
  }
};

/**
 * Reads the contents of a file or loads an URL into a String.
 * If the file is specified by name as String, it must be located in the document's data directory.
 *
 * @cat Data
 * @subcat Input
 * @method loadString
 * @param  {String|File} fileOrString The text file name in the document's data directory or a File instance or an URL
 * @return {String}  String file or URL content.
 */
pub.loadString = function(fileOrString) {
  if (isURL(fileOrString)) {
    return getURL(fileOrString);
  } else {
    var inputFile = initDataFile(fileOrString, true),
    data = null;
    inputFile.open('r');
    data = inputFile.read();
    inputFile.close();
    return data;
  }
};

var getURL = function(url) {
  if (isURL(url)) {
    if (Folder.fs === "Macintosh") {
      return pub.shellExecute("curl -m 15 -L '"+url+"'");
    } else {
      error("Loading of strings via an URL is a Mac only feature at the moment. Sorry!")
    }
  } else {
    error("The url "+url+" is not a valid one. Please double check!")
  }
};

/**
 * Reads the contents of a file or loads an URL and creates a String array of its individual lines.
 * If the file is specified by name as String, it must be located in the document's data directory.
 *
 * @cat Data
 * @subcat Input
 * @method loadStrings
 * @param  {String|File} file The text file name in the document's data directory or a File instance or an URL
 * @return {String[]}  Array of the individual lines in the given File or URL
 */
pub.loadStrings = function(file) {
  if (isURL(file)) {
    var result = getURL(file);
    return result.match(/[^\r\n]+/g);
  } else {
    var inputFile = initDataFile(file, true),
    result = [];
    inputFile.open('r');
    while (!inputFile.eof) {
      result.push(inputFile.readln());
    }
    inputFile.close();
    return result;
  }
};


// ----------------------------------------
// Output

/**
 * Prints a message line to the console output in the ExtendScript editor. 
 * 
 * @cat Output
 * @method println
 * @param {String} msg The message to print
 */
var println = pub.println = function(msg) {
  $.writeln(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg + "\n");
};

/**
 * Prints a message to the console output in the ExtendScript editor, but unlike b.println() it doesn't return the carriage to a new line at the end.
 * 
 * @cat Output
 * @method print
 * @param {String} msg The message to print
 */
pub.print = function(msg) {
  $.write(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg);
};

/**
 * Print numerous information about the current environment to the console
 * 
 * @cat Output
 * @method printInfo
 */
pub.printInfo = function() {

  pub.println("###");
  pub.println("OS: " + $.os);
  pub.println("ExtendScript Build: " + $.build);
  pub.println("ExtendScript Version:" + $.version);                    
  pub.println("Engine: " + $.engineName);         
  pub.println("memCache: " + $.memCache + " bytes");            
  pub.println("###");

};

/**
 * Writes an array of strings to a file, one line per string.
 * If the given file exists it gets overridden.
 *
 * @cat Output
 * @method saveStrings
 * @param  {String|File} file The file name or a File instance
 * @param  {String[]} strings The string array to be written
 */
pub.saveStrings = function(file, strings) {
  var outputFile = initExportFile(file);
  outputFile.open('w');
  forEach(strings, function(s) {
    outputFile.writeln(s);
  });
  outputFile.close();
};

/**
 * Writes a string to a file.
 * If the given file exists it gets overridden.
 *
 * @cat Output
 * @method saveString
 * @param  {String|File} file The file name or a File instance
 * @param  {String} string The string to be written
 */
pub.saveString = function(file, string) {
  var outputFile = initExportFile(file);
  outputFile.open('w');
  outputFile.write(string);
  outputFile.close();
};

// TODO: make savePDF and savePNG D.R.Y.
/**
 * Exports the current document as PDF to the documents folder. Please note, that export options default to the last used export settings.
 *
 * @cat Output
 * @method savePDF
 * @param {String|File} file The file name or a File instance
 * @param {Boolean} [showOptions] Whether to show the export dialog
 */
pub.savePDF = function(file, showOptions){
  var outputFile = initExportFile(file);
  if (typeof showOptions !== "boolean") showOptions = false;
  currentDoc().exportFile(ExportFormat.PDF_TYPE, outputFile, showOptions);
};

/**
 * Exports the current document as PNG (or sequence of PNG files) to the documents folder. Please note, that export options default to the last used export settings.
 *
 * @cat Output
 * @method savePNG
 * @param {String|File} file The file name or a File instance
 * @param {Boolean} [showOptions] Whether to show the export dialog
 */
pub.savePNG = function(file, showOptions){
  var outputFile = initExportFile(file);
  if (typeof showOptions !== "boolean") showOptions = false;
  currentDoc().exportFile(ExportFormat.PNG_FORMAT, outputFile, showOptions);
};

/**
 * Downloads an URL to a file, currently Mac only.
 *
 * @cat Output
 * @method download
 * @param {String} url The download url
 * @param {String|File} [file] A relative file path in the project folder or a File instance
 */
pub.download = function(url, file){
  var projPath = projectPath().fsName.replace(" ","\\ ");
  var scriptPath = "~/Documents/basiljs/bundle/lib/download.sh";

  if (isURL(url)) {
    var cmd = null;

    if (file) {
      if (file instanceof File) {
        var downloadFolder = file.parent.fsName;
        var fileName = file.displayName;
        downloadFolder = downloadFolder.replace(" ","\\ ");
        fileName = fileName.replace(" ","\\ ");
        cmd = ["sh",scriptPath,downloadFolder,url,fileName].join(" ");

      } else { 
        var downloadFolder = file.substr(0,file.lastIndexOf("/"));
        var fileName = file.substr(file.lastIndexOf("/")+1);

        // get rif of some special cases
        if(startsWith(downloadFolder,"./")) downloadFolder.substr(2);
        if(startsWith(downloadFolder,"/")) downloadFolder.substr(1);

        downloadFolder = downloadFolder.replace(" ","\\ ");
        fileName = fileName.replace(" ","\\ ");
        downloadFolder = projPath + "/data/"+ downloadFolder;  
        cmd = ["sh",scriptPath,downloadFolder,url,fileName].join(" ");
        
      }

    } else {
      var downloadFolder = projPath + "/data/download";
      var cmd = ["sh",scriptPath,downloadFolder,url].join(" ");
    }

    println(cmd);
    pub.shellExecute(cmd);

  } else {
    error("The url "+url+" is not a valid one. Please double check!")
  }
};


