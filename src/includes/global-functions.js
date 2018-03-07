// ----------------------------------------
// src/includes/global-functions.js
// ----------------------------------------

/**
* Used to run a function on all elements of an array. Please note the existance of the convenience methods <code>stories()</code>, <code>paragraphs()</code>, <code>lines()</code>, <code>words()</code> and <code>characters()</code> that are used to iterate through all instances of the given type in the given document.
*
* @cat Data
* @subcat Array
* @method Array.forEach
* @param {Array} collection The array to be processed.
* @param {Function} cb The function that will be called on each element. The call will be like function(item,i) where i is the current index of the item within the array.
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
 * HashList is a data container that allows you to store information as key - value pairs. As usual in JavaScript mixed types of keys and values are accepted in one HashList instance.
 *
 * @constructor
 * @cat Data
 * @subcat HashList
 * @method HashList
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
   *
   * This removes a key - value pair by its key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.remove
   * @param {String} key The key to delete.
   * @return {Object} The value before deletion.
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
   * This gets a value by its key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.get
   * @param {String} key The key to look for.
   * @return {Object} The value.
   */
  that.get = function(key) {
    return that.items[key];
  };

  /**
   * This sets a key - value pair. If a key is already existing, the value will be updated. Please note that Functions are currently not supported as values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.set
   * @param {String} key The key to use.
   * @param {Object|String|Number|Boolean} value The value to set.
   * @return {Object} The value after setting.
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
   * Checks for the existence of a given key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.hasKey
   * @param {String} key The key to check.
   * @return {Boolean} Returns true or false.
   */
  that.hasKey = function(key) {
    checkKey(key);
    return typeof that.items[key] != "undefined";
  };

  /**
   * Checks if a certain value exists at least once in all of the key - value pairs.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.hasValue
   * @param {Object|String|Number|Boolean} value The value to check.
   * @return {Boolean} Returns true or false.
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
   * Returns an array of all keys that are sorted by their values from highest to lowest. Please note that this only works if you have conistently used Numbers for values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getKeysByValues
   * @return {Array} An array with all the keys.
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
   * Returns an array with all keys in a sorted order from higher to lower magnitude.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getSortedKeys
   * @return {Array} An array with all the keys sorted.
   */
  that.getSortedKeys = function () {
    return that.getKeys().sort(); // ["a", "b", "z"]
  };

  /**
   * Returns an array with all keys.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getKeys
   * @return {Array} An array with all the keys.
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
   * Returns an array with all values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getValues
   * @return {Array} An array with all the values.
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
   * Deletes all the key - value pairs in this HashList.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.clear
   */
  that.clear = function() {
    for (var i in that.items) {
      delete that.items[i];
    }
    that.length = 0;
  };
  return that;
};
