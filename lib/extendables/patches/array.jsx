// note: the Mozilla stuff is MIT licensed!

/* Javascript 1.6 Array extras, courtesy of Mozilla */

/**
 * @desc Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @param {Object} element
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 */

  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };

/**
 * @desc Does what it says.
 * Does not check whether there is actually a next element, that's up to you.
 */

Array.prototype.indexAfter = function (element) {
	var index = this.indexOf(element);
	if (index == -1) {
		return index;
	} else {
		return index + 1;
	}
}

/**
 * @desc Returns the last index at which a given element can be found in the array, 
 * or -1 if it is not present. The array is searched backwards, starting at from_index.
 *
 * @param {Object} element
 * @param {Number} from_index
 * 
 * @see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/lastIndexOf
 */

  Array.prototype.lastIndexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]);
    if (isNaN(from))
    {
      from = len - 1;
    }
    else
    {
      from = (from < 0)
           ? Math.ceil(from)
           : Math.floor(from);
      if (from < 0)
        from += len;
      else if (from >= len)
        from = len - 1;
    }

    for (; from > -1; from--)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };

/**
 * @desc Tests whether all elements in the array pass the test implemented by the provided function.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
 */

  Array.prototype.every = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this &&
          !fun.call(thisp, this[i], i, this))
        return false;
    }

    return true;
  };

/**
 * @desc Creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
 */

  Array.prototype.filter = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
      {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
          res.push(val);
      }
    }

    return res;
  };

/**
 * @desc Executes a provided function once per array element.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */

  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };

/**
 * @desc Creates a new array with the results of calling a provided function on every element in this array.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
 */

  Array.prototype.map = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };

/**
 * @desc Tests whether some element in the array passes the test implemented by the provided function.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
 */

  Array.prototype.some = function(fun /*, thisp*/)
  {
    var i = 0,
        len = this.length >>> 0;

    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (; i < len; i++)
    {
      if (i in this &&
          fun.call(thisp, this[i], i, this))
        return true;
    }

    return false;
  };

/* Javascript 1.8 Array extras, courtesy of Mozilla */

/**
 * @desc Apply a function against an accumulator and 
 * each value of the array (from left-to-right) as to reduce it to a single value.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
 */

  Array.prototype.reduce = function(fun /*, initial*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 2)
    {
      var rv = arguments[1];
    }
    else
    {
      do
      {
        if (i in this)
        {
          var rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      }
      while (true);
    }

    for (; i < len; i++)
    {
      if (i in this)
        rv = fun.call(undefined, rv, this[i], i, this);
    }

    return rv;
  };

/**
 * @desc Apply a function simultaneously against two values of the array (from right-to-left)
 * as to reduce it to a single value.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
 */

  Array.prototype.reduceRight = function(fun /*, initial*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value, empty array
    if (len == 0 && arguments.length == 1)
      throw new TypeError();

    var i = len - 1;
    if (arguments.length >= 2)
    {
      var rv = arguments[1];
    }
    else
    {
      do
      {
        if (i in this)
        {
          var rv = this[i--];
          break;
        }

        // if array contains no values, no initial value to return
        if (--i < 0)
          throw new TypeError();
      }
      while (true);
    }

    for (; i >= 0; i--)
    {
      if (i in this)
        rv = fun.call(undefined, rv, this[i], i, this);
    }

    return rv;
  };

/**
 * @desc Allows you to quickly pluck a single attribute from an array of objects.
 *
 * @example
 *     > var people = [{'name': 'Alfred', age: 33}, {'name': 'Zed', age: 45}];
 *     > people.pluck('age');
 *     [33,45]
 *     > people.pluck('age').sum();
 *     78
 *     > people.sum('age');
 *     78
 *     > people.sum(function (person) { return person.age });
 *     78
 */

Array.prototype.pluck = function (name) {
	return this.map(function (item) {
		return item[name];
	});
}

/**
 * @desc Returns the maximum value in an array.
 *
 * @param {Function|String} [salient_feature] ``min`` can also order objects
 *     if you provide a salient feature for it to work on, either a function
 *     or the name of an object property
 *
 * @example
 *     > var people = [{'name': 'Alfred'}, {'name': 'Zed'}];
 *     > people.max(function (obj) {
 *     ... return obj.name;
 *     ... });
 *     {'name': 'Zed'}
 */

Array.prototype.max = function (salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}
	
	function fn (a, b) {
		return mapper(a) > mapper(b);
	}
	var array = this.clone();
	array.sort(fn);
	return array.pop();
};

/**
 * @returns The minimum value in an array. Works like :func:`Array#max`
 *
 * @param {Function|String} [salient_feature] See ``max``.
 */

Array.prototype.min = function (salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}
	
	function fn (a, b) {
		return mapper(a) > mapper(b);
	}
	var array = this.clone();
	array.sort(fn);
	return array.shift();
}

/**
 * @returns The sum of all array values.
 *
 * @param {Function|String} [salient_feature] See ``max``.
 *
 * @example
 *     > var persons = [
 *     ... {'name': 'Abraham', 'children': 5},
 *     ... {'name': 'Joe', 'children': 3},
 *     ... {'name': 'Zed', 'children': 0}
 *     ... ];
 *     > persons.sum('children');
 *     8
 */

Array.prototype.sum = function (salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}

	var features = this.map(mapper);
	
	return features.reduce(function (a, b) { return a + b; });	
}

/**
 * @desc Alias for :func:`Array#filter`
 * @function
 */

Array.prototype.select = Array.prototype.filter

/**
 * @desc Does exactly the inverse of :func:`Array#filter` and its alias :func:`Array#select`.
 *
 * @param {Function} fn
 */

Array.prototype.reject = function (fn) {
	return this.select(function (value) {
		return !fn(value);
	});
}

/**
 * @desc Flattens nested arrays.
 *
 * @example
 *     > var list = [[1, 2, [3, 4, 5], 6], [7, 8], 9];
 *     > list.flatten();
 *     [1,2,3,4,5,6,7,8,9];
 */

Array.prototype.flatten = function () {
	return this.reduce(function(memo, value) {
		if (value instanceof Array) return memo.concat(value.flatten());
		memo.push(value);
		return memo;
	}, []);
};

/**
 * @desc Returns a copy of the array with all falsy values removed.
 * This includes ``false``, ``null``, ``0``, ``""``, ``undefined`` and ``NaN``.
 */

Array.prototype.compact = function () {
	return this.reject(function (value) {
		return new Boolean(value) == false;
	});
}

/**
 * @desc Returns the first item of this array
 */

Array.prototype.first = function () {
	return this[0];
}

/**
 * @desc Returns the last item of this array
 */

Array.prototype.last = function () {
	return this.slice(-1)[0];
}

/**
 * @desc Similar to indexOf
 */

Array.prototype.contains = function (obj) {
	return this.indexOf(obj) != -1;
}