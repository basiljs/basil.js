// ----------------------------------------
// src/includes/global-functions.js
// ----------------------------------------

/**
 * @description The <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter">filter()</a> method creates a new array with all elements that pass the test implemented by the provided function.
 *
 * @cat    Data
 * @subcat Array
 * @method Array.filter
 * @param  {Function} callback The Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.
 * @return {Array} The new array with the elements that pass the test.
 */
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun) {
    if (this === null) throw new TypeError();
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") throw new TypeError();
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) res.push(val);
      }
    }
    return res;
  };
}

/**
 * @description The <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map">map()</a> method creates a new array with the results of calling a provided function on every element in this array.
 *
 * @cat    Data
 * @subcat Array
 * @method Array.map
 * @param  {Function} callback Function that produces an element of the new Array.
 * @return {Array} The new array with each element being the result of the callback function.
 */
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while(k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[ k ];
        mappedValue = callback.call(T, kValue, k, O);
        A[ k ] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

/**
 * @description Used to run a function on all elements of an array. Please note the existence of the convenience methods `stories()`, `paragraphs()`, `lines()`, `words()` and `characters()` that are used to iterate through all instances of the given type in the given document.
 *
 * @cat     Data
 * @subcat  Array
 * @method  Array.forEach
 *
 * @param   {Array} collection The array to be processed.
 * @param   {Function} cb The function that will be called on each element. The call will be like function(item,i) where i is the current index of the item within the array.
 */
forEach = function(collection, cb) {
  for (var i = 0, len = collection.length; i < len; i++) {

    if(!isValid(collection[i])) {
      warning("forEach(), invalid object processed.");
      continue;
    }

    if(cb(collection[i], i) === false) {
      return false;
    }
  }
  return true;
};

/**
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

  /**
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
  return that;
};
