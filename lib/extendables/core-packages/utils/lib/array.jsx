// note: the Mozilla stuff is MIT licensed!

var utils = require("utils/object");

/* Javascript 1.6 Array extras, courtesy of Mozilla */

/**
 * @desc Returns the first index at which a given element can be found in the selfay, or -1 if it is not present.
 *
 * @param {Object} element
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 */

exports.indexOf = function(self, elt /*, from*/)
  {
    var len = self.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in self &&
          self[from] === elt)
        return from;
    }
    return -1;
  };

/**
 * @desc Does what it says.
 * Does not check whether there is actually a next element, that's up to you.
 */

exports.indexAfter = function (obj, element) {
	var index = self.indexOf(element);
	if (index == -1) {
		return index;
	} else {
		return index + 1;
	}
}

/**
 * @desc Returns the last index at which a given element can be found in the selfay, 
 * or -1 if it is not present. The selfay is searched backwards, starting at from_index.
 *
 * @param {Object} element
 * @param {Number} from_index
 * 
 * @see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/lastIndexOf
 */

exports.lastIndexOf = function(self, elt /*, from*/)
  {
    var len = self.length;

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
      if (from in self &&
          self[from] === elt)
        return from;
    }
    return -1;
  };

/**
 * @desc Tests whether all elements in the selfay pass the test implemented by the provided function.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
 */

exports.every = function(self, fun /*, thisp*/) {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[2];
    for (var i = 0; i < len; i++)
    {
      if (i in self &&
          !fun.call(thisp, self[i], i, self))
        return false;
    }

    return true;
};

/**
 * @desc Creates a new selfay with all elements that pass the test implemented by the provided function.
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
 */

exports.filter = function(self, fun /*, thisp*/)
  {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[2];
    for (var i = 0; i < len; i++)
    {
      if (i in self)
      {
        var val = self[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, self))
          res.push(val);
      }
    }

    return res;
  };

/**
 * @desc Executes a provided function once per selfay element.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */

 exports.forEach = function(self, fun /*, thisp*/)
  {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[2];
    for (var i = 0; i < len; i++)
    {
      if (i in self)
        fun.call(thisp, self[i], i, self);
    }
  };

/**
 * @desc Creates a new selfay with the results of calling a provided function on every element in this selfay.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
 */

exports.map = function(self, fun /*, thisp*/) {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[2];
    for (var i = 0; i < len; i++)
    {
      if (i in self)
        res[i] = fun.call(thisp, self[i], i, self);
    }

    return res;
 };

/**
 * @desc Tests whether some element in the selfay passes the test implemented by the provided function.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
 */

exports.some = function(self, fun /*, thisp*/)
  {
    var i = 0,
        len = self.length >>> 0;

    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[2];
    for (; i < len; i++)
    {
      if (i in self &&
          fun.call(thisp, self[i], i, self))
        return true;
    }

    return false;
  };

/* Javascript 1.8 Array extras, courtesy of Mozilla */

/**
 * @desc Apply a function against an accumulator and 
 * each value of the selfay (from left-to-right) as to reduce it to a single value.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
 */

  exports.reduce = function(self, fun /*, initial*/)
  {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value and an empty selfay
    if (len == 0 && arguments.length == 2)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 3)
    {
      var rv = arguments[2];
    }
    else
    {
      do
      {
        if (i in self)
        {
          var rv = self[i++];
          break;
        }

        // if selfay contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      }
      while (true);
    }

    for (; i < len; i++)
    {
      if (i in self)
        rv = fun.call(undefined, rv, self[i], i, self);
    }

    return rv;
  };

/**
 * @desc Apply a function simultaneously against two values of the selfay (from right-to-left)
 * as to reduce it to a single value.
 *
 * @param {Function} function
 * 
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
 */

  exports.reduceRight = function(self, fun /*, initial*/)
  {
    var len = self.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value, empty selfay
    if (len == 0 && arguments.length == 2)
      throw new TypeError();

    var i = len - 1;
    if (arguments.length >= 3)
    {
      var rv = arguments[2];
    }
    else
    {
      do
      {
        if (i in self)
        {
          var rv = self[i--];
          break;
        }

        // if selfay contains no values, no initial value to return
        if (--i < 0)
          throw new TypeError();
      }
      while (true);
    }

    for (; i >= 0; i--)
    {
      if (i in self)
        rv = fun.call(undefined, rv, self[i], i, self);
    }

    return rv;
  };

/**
 * @desc Allows you to quickly pluck a single attribute from an selfay of objects.
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

exports.pluck = function (self, name) {
	return exports.map(self, function (item) {
		return item[name];
	});
}

/**
 * @desc Returns the maximum value in an selfay.
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

exports.max = function (self, salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}
	
	function fn (a, b) {
		return mapper(a) > mapper(b);
	}
	var selfay = utils.clone(selfay);
	selfay.sort(fn);
	return selfay.pop();
};

/**
 * @returns The minimum value in an selfay. Works like :func:`Array#max`
 *
 * @param {Function|String} [salient_feature] See ``max``.
 */

exports.min = function (self, salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}
	
	function fn (a, b) {
		return mapper(a) > mapper(b);
	}
	var selfay = utils.clone(self);
	selfay.sort(fn);
	return selfay.shift();
}

/**
 * @returns The sum of all selfay values.
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

exports.sum = function (self, salient) {
	if (salient && salient.is(String)) {
		var mapper = function (obj) { return obj[salient]; }
	} else {
		var mapper = salient || function (obj) { return obj; }
	}

	var features = exports.map(self, mapper);
	return exports.reduce(features, function (a, b) { return a + b; });	
}

/**
 * @desc Alias for :func:`Array#filter`
 * @function
 */

exports.select = exports.filter

/**
 * @desc Does exactly the inverse of :func:`Array#filter` and its alias :func:`Array#select`.
 *
 * @param {Function} fn
 */

exports.reject = function (self, fn) {
	return exports.select(self, function (value) {
		return !fn(value);
	});
}

/**
 * @desc Flattens nested selfays.
 *
 * @example
 *     > var list = [[1, 2, [3, 4, 5], 6], [7, 8], 9];
 *     > list.flatten();
 *     [1,2,3,4,5,6,7,8,9];
 */

exports.flatten = function (self) {
	return exports.reduce(self, function(memo, value) {
		if (value instanceof Array) return memo.concat(value.flatten());
		memo.push(value);
		return memo;
	}, []);
};

/**
 * @desc Returns a copy of the selfay with all falsy values removed.
 * This includes ``false``, ``null``, ``0``, ``""``, ``undefined`` and ``NaN``.
 */

exports.compact = function (self) {
	return exports.reject(self, function (value) {
		return new Boolean(value) == false;
	});
}

/**
 * @desc Returns the first item of this selfay
 */

exports.first = function (self) {
	return self[0];
}

/**
 * @desc Returns the last item of this selfay
 */

exports.last = function (self) {
	return self.slice(-1)[0];
}

/**
 * @desc Similar to indexOf
 */

exports.contains = function (self, obj) {
	return exports.indexOf(self, obj) != -1;
}