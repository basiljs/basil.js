// ----------------------------------------
// src/includes/math.js
// ----------------------------------------

var Vector = pub.Vector = function() {

  /**
   * @description A class to describe a two or three dimensional vector. This data type stores two or three variables that are commonly used as a position, velocity, and/or acceleration. Technically, position is a point and velocity and acceleration are vectors, but this is often simplified to consider all three as vectors. For example, if you consider a rectangle moving across the screen, at any given instant it has a position (the object's location, expressed as a point.), a velocity (the rate at which the object's position changes per time unit, expressed as a vector), and acceleration (the rate at which the object's velocity changes per time unit, expressed as a vector). Since vectors represent groupings of values, we cannot simply use traditional addition/multiplication/etc. Instead, we'll need to do some "vector" math, which is made easy by the methods inside the Vector class.
   *
   * Constructor of Vector, can be two- or three-dimensional.
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector
   *
   * @param   {Number} x The first vector.
   * @param   {Number} y The second vector.
   * @param   {Number} [z] The third vector.
   * @class
   */
  function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  /**
   * @description Static function. Calculates the Euclidean distance between two points (considering a point as a vector object). Is meant to be called "static" i.e. `Vector.dist(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.dist
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The distance.
   * @static
   */
  Vector.dist = function(v1, v2) {
    return v1.dist(v2);
  };

  /**
   * @description Static function. Calculates the dot product of two vectors. Is meant to be called "static" i.e. `Vector.dot(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.dot
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The dot product.
   * @static
   */
  Vector.dot = function(v1, v2) {
    return v1.dot(v2);
  };

  /**
   * @description Static function. Calculates the cross product of two vectors. Is meant to be called "static" i.e. `Vector.cross(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.cross
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The cross product.
   * @static
   */
  Vector.cross = function(v1, v2) {
    return v1.cross(v2);
  };

  /**
   * @description Static function. Calculates the angle between two vectors. Is meant to be called "static" i.e. `Vector.angleBetween(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.angleBetween
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The angle.
   * @static
   */
  Vector.angleBetween = function(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };

  Vector.prototype = {

    /**
     * @description Sets the `x`, `y`, and `z` component of the vector using three separate variables, the data from a Vector, or the values from a float array.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.set
     *
     * @param   {Number|Array|Vector} v Either a vector, array or `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    set: function(v, y, z) {
      if (arguments.length === 1) this.set(v.x || v[0] || 0, v.y || v[1] || 0, v.z || v[2] || 0);
      else {
        this.x = v;
        this.y = y;
        this.z = z;
      }
    },
    /**
     * @description Gets a copy of the vector, returns a Vector object.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.get
     *
     * @return  {Vector} A copy of the vector.
     */
    get: function() {
      return new Vector(this.x, this.y, this.z);
    },
    /**
     * @description Calculates the magnitude (length) of the vector and returns the result as a float
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.mag
     *
     * @return  {Number} The length.
     */
    mag: function() {
      var x = this.x,
        y = this.y,
        z = this.z;
      return Math.sqrt(x * x + y * y + z * z);
    },
    /**
     * @description Adds `x`, `y`, and `z` components to a vector, adds one vector to another.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.add
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    add: function(v, y, z) {
      if (arguments.length === 1) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      } else {
        this.x += v;
        this.y += y;
        this.z += z;
      }
    },
    /**
     * @description Substract `x`, `y`, and `z` components or a full vector from this vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.sub
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    sub: function(v, y, z) {
      if (arguments.length === 1) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
      } else {
        this.x -= v;
        this.y -= y;
        this.z -= z;
      }
    },
    /**
     * @description Multiplies this vector with `x`, `y`, and `z` components or another vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.mult
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    mult: function(v) {
      if (typeof v === "number") {
        this.x *= v;
        this.y *= v;
        this.z *= v;
      } else {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
      }
    },
    /**
     * @description Divides this vector through `x`, `y`, and `z` components or another vector.`
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.div
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    div: function(v) {
      if (typeof v === "number") {
        this.x /= v;
        this.y /= v;
        this.z /= v;
      } else {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
      }
    },
    /**
     * @description Calculates the distance from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.dist
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The distance.
     */
    dist: function(v) {
      var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    /**
     * @description Calculates the dot product from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.dot
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The dot product.
     */
    dot: function(v, y, z) {
      if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
      return this.x * v + this.y * y + this.z * z;
    },
    /**
     * @description Calculates the cross product from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.cross
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The cross product.
     */
    cross: function(v) {
      var x = this.x,
        y = this.y,
        z = this.z;
      return new Vector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y);
    },
    /**
     * @description Normalizes the length of this vector to 1.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.normalize
     */
    normalize: function() {
      var m = this.mag();
      if (m > 0) this.div(m);
    },
    /**
     * @description Normalizes the length of this vector to the given parameter.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.limit
     *
     * @param   {Number} high The value to scale to.
     */
    limit: function(high) {
      if (this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
    },
    /**
     * @description The 2D orientation (heading) of this vector in radian.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.heading
     *
     * @return  {Number} A radian angle value.
     */
    heading: function() {
      return -Math.atan2(-this.y, this.x);
    },
    /**
     * @description Returns data about this vector as a string.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.toString
     *
     * @return  {String} The `x`, `y` and `z` components as a string.
     */
    toString: function() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    },
    /**
     * @description Returns this vector as an array `[x,y,z]`.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.array
     *
     * @return  {Array} The `x`, `y` and `z` components as an array of `[x,y,z]`.
     */
    array: function() {
      return [this.x, this.y, this.z];
    }
  };

  function createVectorMethod(method) {
    return function(v1, v2) {
      var v = v1.get();
      v[method](v2);
      return v;
    };
  }
  for (var method in Vector.prototype) if (Vector.prototype.hasOwnProperty(method) && !Vector.hasOwnProperty(method)) Vector[method] = createVectorMethod(method);
  return Vector;
}();


// -- Calculation --

/**
 * @description Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  abs
 *
 * @param   {Number} val A number.
 * @return  {Number} The absolute value of that number.
 */
pub.abs = Math.abs;

/**
 * @description Calculates the closest integer value that is greater than or equal to the value of the parameter. For example, `ceil(9.03)` returns the value `10`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  ceil
 *
 * @param   {Number} val An arbitrary number.
 * @return  {Number} The next highest integer value.
 */
pub.ceil = Math.ceil;

/**
 * @description Constrains a value to not exceed a maximum and minimum value.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  constrain
 *
 * @param   {Number} aNumber The value to constrain.
 * @param   {Number} aMin Minimum limit.
 * @param   {Number} aMax Maximum limit.
 * @return  {Number} The constrained value.
 */
pub.constrain = function(aNumber, aMin, aMax) {
  if(arguments.length !== 3) error("constrain(), wrong argument count.");
  if(aNumber <= aMin) return aMin;
  if(aNumber >= aMax) return aMax;
  return aNumber;
};

/**
 * @description Calculates the distance between two points.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  dist
 *
 * @param   {Number} x1 The x-coordinate of the first point.
 * @param   {Number} y1 The y-coordinate of the first point.
 * @param   {Number} x2 The x-coordinate of the second point.
 * @param   {Number} y2 The y-coordinate of the second point.
 * @return  {Number} The distance.
 */
pub.dist = function() {
  var dx, dy, dz;
  if (arguments.length === 4) {
    dx = arguments[0] - arguments[2];
    dy = arguments[1] - arguments[3];
    return Math.sqrt(dx * dx + dy * dy);
  } else {
    error("dist(), wrong argument count.");
  }
};

/**
 * @description The `exp()` function returns `ex`, where `x` is the argument, and `e` is Euler's number (also known as Napier's constant), the base of the natural logarithms.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  exp
 *
 * @param   {Number} x A number.
 * @return  {Number} A number representing `ex`.
 */
pub.exp = Math.exp;

/**
 * @description Calculates the closest integer value that is less than or equal to the value of the parameter.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  floor
 *
 * @param   {Number} a A number.
 * @return  {Number} Integer number.
 */
pub.floor = Math.floor;

/**
 * @description Calculates a number between two numbers at a specific increment. The `amt` parameter is the amount to interpolate between the two values where `0.0` is equal to the first point, `0.1` is very near the first point, `0.5` is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  lerp
 *
 * @param   {Number} value1 First value.
 * @param   {Number} value2 Second value.
 * @param   {Number} amt Amount between 0.0 and 1.0.
 * @return  {Number} The mapped value.
 */
pub.lerp = function(value1, value2, amt) {
  if(arguments.length !== 3) error("lerp(), wrong argument count.");
  return (value2 - value1) * amt + value1;
};

/**
 * @description Calculates the natural logarithm (the base-e logarithm) of a number. This function expects the values greater than `0`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  log
 *
 * @param   {Number} x A number, must be greater than `0`.
 * @return  {Number} The natural logarithm.
 */
pub.log = Math.log;

/**
 * @description Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly used in computer graphics and linear algebra. Because it has no "start" position, the magnitude of a vector can be thought of as the distance from coordinate `(0,0)` to its `(x,y)` value. Therefore, `mag()` is a shortcut for writing `dist(0, 0, x, y)`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  mag
 *
 * @param   {Number} x Coordinate.
 * @param   {Number} y Coordinate.
 * @param   {Number} [z] Coordinate, optional.
 * @return  {Number} The magnitude.
 */
pub.mag = function(a, b, c) {
  if(!(arguments.length === 2 || arguments.length === 3)) error("mag(), wrong argument count.");
  if (c) return Math.sqrt(a * a + b * b + c * c);
  return Math.sqrt(a * a + b * b);
};

/**
 * @description Re-maps a number from one range to another.
 * Numbers outside the range are not clamped to `0` and `1`, because out-of-range values are often intentional and useful.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  map
 *
 * @param   {Number} value The value to be mapped.
 * @param   {Number} istart The start of the input range.
 * @param   {Number} istop The end of the input range.
 * @param   {Number} ostart The start of the output range.
 * @param   {Number} ostop The end of the output range.
 * @return  {Number} The mapped value.
 */
pub.map = function(value, istart, istop, ostart, ostop) {
  if(arguments.length !== 5) error("map(), wrong argument count. Use: map(value, istart, istop, ostart, ostop)");
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

/**
 * @description Determines the largest value in a sequence of numbers.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  max
 *
 * @param   {Number|Array} a A value or an array of Numbers.
 * @param   {Number} [b] Another value to be compared.
 * @param   {Number} [c] Another value to be compared.
 * @return  {Number} The highest value.
 */
pub.max = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("max(), non-empty array is expected");
  var max = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (max < numbers[i]) max = numbers[i];
  return max;
};

/**
 * @description Determines the smallest value in a sequence of numbers.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  min
 *
 * @param   {Number|Array} a A value or an array of Numbers.
 * @param   {Number} [b] Another value to be compared.
 * @param   {Number} [c] Another value to be compared.
 * @return  {Number} The lowest value.
 */
pub.min = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("min(), non-empty array is expected");
  var min = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (min > numbers[i]) min = numbers[i];
  return min;
};

/**
 * @description Normalizes a number from another range into a value between `0` and `1`.
 * Identical to `map(value, low, high, 0, 1);`
 * Numbers outside the range are not clamped to `0` and `1`, because out-of-range values are often intentional and useful.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  norm
 *
 * @param   {Number} aNumber The value to be normed.
 * @param   {Number} low The lowest value to be expected.
 * @param   {Number} high The highest value to be expected.
 * @return  {Number} The normalized value.
 */
pub.norm = function(aNumber, low, high) {
  if(arguments.length !== 3) error("norm(), wrong argument count.");
  return (aNumber - low) / (high - low);
};

/**
 * @description Facilitates exponential expressions. The `pow()` function is an efficient way of multiplying numbers by themselves (or their reciprocal) in large quantities. For example, `pow(3, 5)` is equivalent to the expression `3 * 3 * 3 * 3 * 3` and `pow(3, -5)` is equivalent to `1 / 3 * 3 * 3 * 3 * 3`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  pow
 *
 * @param   {Number} num Base of the exponential expression.
 * @param   {Number} exponent Power of which to raise the base.
 * @return  {Number} the result
 */
pub.pow = Math.pow;

/**
 * @description Calculates the integer closest to the value parameter. For example, `round(9.2)` returns the value `9`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  round
 *
 * @param   {Number} value The value to be rounded.
 * @return  {Number} The rounded value.
 */
pub.round = Math.round;

/**
 * @description Squares a number (multiplies a number by itself). The result is always a positive number, as multiplying two negative numbers always yields a positive result. For example, `-1 * -1 = 1`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  sq
 *
 * @param   {Number} aNumber The value to be squared.
 * @return  {Number} Squared number.
 */
pub.sq = function(aNumber) {
  if(arguments.length !== 1) error("sq(), wrong argument count.");
  return aNumber * aNumber;
};

// -- Trigonometry --

/**
 * @description Calculates the square root of a number. The square root of a number is always positive, even though there may be a valid negative root. The square root s of number a is such that `s * s = a`. It is the opposite of squaring.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  sqrt
 *
 * @param   {Number} val A value.
 * @return  {Number} Square root.
 */
pub.sqrt = Math.sqrt;

/**
 * @description The inverse of `cos()`, returns the arc cosine of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  acos
 *
 * @param   {Number} value The value whose arc cosine is to be returned.
 * @return  {Number} The arc cosine.
 */
pub.acos = Math.acos;

/**
 * @description The inverse of `sin()`, returns the arc sine of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  asin
 *
 * @param   {Number} value The value whose arc sine is to be returned.
 * @return  {Number} The arc sine.
 */
pub.asin = Math.asin;

/**
 * @description The inverse of `tan()`, returns the arc tangent of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  atan
 *
 * @param   {Number} value The value whose arc tangent is to be returned.
 * @return  {Number} The arc tangent.
 */
pub.atan = Math.atan;

/**
 * @description Calculates the angle (in radians) from a specified point to the coordinate origin as measured from the positive x-axis. Values are returned as a float in the range from `PI` to `-PI`. The `atan2()` function is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  atan2
 *
 * @param   {Number} y The y coordinate.
 * @param   {Number} x The x coordinate.
 * @return  {Number} The atan2 value.
 */
pub.atan2 = Math.atan2;

/**
 * @description Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `PI * 2`). Values are returned in the range `-1` to `1`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  cos
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The cosine.
 */
pub.cos = Math.cos;

/**
 * @description Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and `2 * PI` radians in a circle. For example, `90° = PI / 2 = 1.5707964`. All trigonometric methods in basil require their parameters to be specified in radians.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  degrees
 *
 * @param   {Number} aAngle An angle in radians.
 * @return  {Number} The given angle in degree.
 */
pub.degrees = function(aAngle) {
  return aAngle * 180 / Math.PI;
};

/**
 * @description Converts a degree measurement to its corresponding value in radians. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and `2 * PI` radians in a circle. For example, `90° = PI / 2 = 1.5707964`. All trigonometric methods in basil require their parameters to be specified in radians.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  radians
 *
 * @param   {Number} aAngle An angle in degree.
 * @return  {Number} The given angle in radians.
 */
pub.radians = function(aAngle) {
  return aAngle / 180 * Math.PI;
};

/**
 * @description Calculates the sine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `6.28`). Values are returned in the range `-1` to `1`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  sin
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The sine value.
 */
pub.sin = Math.sin;

/**
 * @description Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `PI * 2`). Values are returned in the range `infinity` to `-infinity`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  tan
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The tangent value.
 */
pub.tan = Math.tan;

// -- Random --

var currentRandom = Math.random;

/**
 * @description Generates random numbers. Each time the `random()` function is called, it returns an unexpected value within the specified range. If one parameter is passed to the function it will return a float between zero and the value of the high parameter. The function call `random(5)` returns values between `0` and `5`. If two parameters are passed, it will return a float with a value between the the parameters. The function call `random(-5, 10.2)` returns values between `-5` and `10.2`.
 * One parameter sets the range from `0` to the given parameter, while with two parameters present you set the range from `val1` to `val2`.
 *
 * @cat     Math
 * @subcat  Random
 * @method  random
 *
 * @param   {Number} [low] The low border of the range.
 * @param   {Number} [high] The high border of the range.
 * @return  {Number} A random number.
 */
pub.random = function() {
  if (arguments.length === 0) return currentRandom();
  if (arguments.length === 1) return currentRandom() * arguments[0];
  var aMin = arguments[0],
    aMax = arguments[1];
  return currentRandom() * (aMax - aMin) + aMin;
};

function Marsaglia(i1, i2) {
  var z = i1 || 362436069,
    w = i2 || 521288629;
  var nextInt = function() {
    z = 36969 * (z & 65535) + (z >>> 16) & 4294967295;
    w = 18E3 * (w & 65535) + (w >>> 16) & 4294967295;
    return ((z & 65535) << 16 | w & 65535) & 4294967295;
  };
  this.nextDouble = function() {
    var i = nextInt() / 4294967296;
    return i < 0 ? 1 + i : i;
  };
  this.nextInt = nextInt;
}
Marsaglia.createRandomized = function() {
  var now = new Date();
  return new Marsaglia(now / 6E4 & 4294967295, now & 4294967295);
};
/**
 * @description Sets the seed value for `random()`.
 * By default, `random()` produces different results each time the program is run. Set the seed parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * @cat     Math
 * @subcat  Random
 * @method  randomSeed
 *
 * @param   {Number} seed The seed value.
 */
pub.randomSeed = function(seed) {
  currentRandom = (new Marsaglia(seed)).nextDouble;
};

function PerlinNoise(seed) {
  var rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
  var i, j;
  var perm = [];
  for (i = 0; i < 256; ++i) perm[i] = i;
  for (i = 0; i < 256; ++i) {
    var t = perm[j = rnd.nextInt() & 255];
    perm[j] = perm[i];
    perm[i] = t;
  }
  for (i = 0; i < 256; ++i) perm[i + 256] = perm[i];

  function grad3d(i, x, y, z) {
    var h = i & 15;
    var u = h < 8 ? x : y,
      v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  function grad2d(i, x, y) {
    var v = (i & 1) === 0 ? x : y;
    return (i & 2) === 0 ? -v : v;
  }

  function grad1d(i, x) {
    return (i & 1) === 0 ? -x : x;
  }
  function lerp(t, a, b) {
    return a + t * (b - a);
  }

  this.noise3d = function(x, y, z) {
    var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    var fx = (3 - 2 * x) * x * x,
      fy = (3 - 2 * y) * y * y,
      fz = (3 - 2 * z) * z * z;
    var p0 = perm[X] + Y,
      p00 = perm[p0] + Z,
      p01 = perm[p0 + 1] + Z,
      p1 = perm[X + 1] + Y,
      p10 = perm[p1] + Z,
      p11 = perm[p1 + 1] + Z;
    return lerp(fz, lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x - 1, y, z)), lerp(fx, grad3d(perm[p01], x, y - 1, z), grad3d(perm[p11], x - 1, y - 1, z))), lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z - 1), grad3d(perm[p10 + 1], x - 1, y, z - 1)), lerp(fx, grad3d(perm[p01 + 1], x, y - 1, z - 1), grad3d(perm[p11 + 1], x - 1, y - 1, z - 1))));
  };

  this.noise2d = function(x, y) {
    var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    var fx = (3 - 2 * x) * x * x,
      fy = (3 - 2 * y) * y * y;
    var p0 = perm[X] + Y,
      p1 = perm[X + 1] + Y;
    return lerp(fy, lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x - 1, y)), lerp(fx, grad2d(perm[p0 + 1], x, y - 1), grad2d(perm[p1 + 1], x - 1, y - 1)));
  };

  this.noise1d = function(x) {
    var X = Math.floor(x) & 255;
    x -= Math.floor(x);
    var fx = (3 - 2 * x) * x * x;
    return lerp(fx, grad1d(perm[X], x), grad1d(perm[X + 1], x - 1));
  };
}
var noiseProfile = {
  generator: undefined,
  octaves: 4,
  fallout: 0.5,
  seed: undefined
};

/**
 * @description Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more natural ordered, harmonic succession of numbers compared to the standard `random()` function. It was invented by Ken Perlin in the 1980s and been used since in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.
 *
 * The main difference to the `random()` function is that Perlin noise is defined in an infinite n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value (fixed only for the lifespan of the program). The resulting value will always be between `0` and `1`. basil.js can compute 1D, 2D and 3D noise, depending on the number of coordinates given. The noise value can be animated by moving through the noise space. The 2nd and 3rd dimension can also be interpreted as time.
 *
 * The actual noise is structured similar to an audio signal, in respect to the function's use of frequencies. Similar to the concept of harmonics in physics, perlin noise is computed over several octaves which are added together for the final result.
 *
 * Another way to adjust the character of the resulting sequence is the scale of the input coordinates. As the function works within an infinite space the value of the coordinates doesn't matter as such, only the distance between successive coordinates does (eg. when using `noise()` within a loop). As a general rule the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of `0.005`- `0.03` work best for most applications, but this will differ depending on use.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noise
 *
 * @param   {Number} x Coordinate in x space.
 * @param   {Number} [y] Coordinate in y space.
 * @param   {Number} [z] Coordinate in z space.
 * @return  {Number} The noise value.
 */
pub.noise = function(x, y, z) {
  if (noiseProfile.generator === undefined) noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
  var generator = noiseProfile.generator;
  var effect = 1,
    k = 1,
    sum = 0;
  for (var i = 0; i < noiseProfile.octaves; ++i) {
    effect *= noiseProfile.fallout;
    switch (arguments.length) {
      case 1:
        sum += effect * (1 + generator.noise1d(k * x)) / 2;
        break;
      case 2:
        sum += effect * (1 + generator.noise2d(k * x, k * y)) / 2;
        break;
      case 3:
        sum += effect * (1 + generator.noise3d(k * x, k * y, k * z)) / 2;
        break;
    }
    k *= 2;
  }
  return sum;
};

/**
 * @description Adjusts the character and level of detail produced by the Perlin noise function. Similar to harmonics in physics, noise is computed over several octaves. Lower octaves contribute more to the output signal and as such define the overal intensity of the noise, whereas higher octaves create finer grained details in the noise sequence. By default, noise is computed over 4 octaves with each octave contributing exactly half than its predecessor, starting at 50% strength for the 1st octave. This falloff amount can be changed by adding an additional function parameter. Eg. a falloff factor of `0.75` means each octave will now have 75% impact (25% less) of the previous lower octave. Any value between `0` and `1` is valid, however note that values greater than `0.5` might result in greater than `1` values returned by `noise()`.
 *
 * By changing these parameters, the signal created by the `noise()` function can be adapted to fit very specific needs and characteristics.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noiseDetail
 *
 * @param   {Number} octaves Number of octaves to be used by the noise() function.
 * @param   {Number} fallout Falloff factor for each octave.
 */
pub.noiseDetail = function(octaves, fallout) {
  noiseProfile.octaves = octaves;
  if (fallout !== undefined) noiseProfile.fallout = fallout;
};

/**
 * @description Sets the seed value for `noise()`. By default, `noise()` produces different results each time the program is run. Set the value parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noiseSeed
 *
 * @param   {Number} seed Noise seed value.
 */
pub.noiseSeed = function(seed) {
  noiseProfile.seed = seed;
  noiseProfile.generator = undefined;
};


// ----------------------------------------
// Transform
// geometricBounds hint: [y1, x1, y2, x2]

var precision = function(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

/**
 * @description The function calculates the geometric bounds of any given page item or text. Use the `transforms()` function to modify page items. In case the object is any kind of text, additional typographic information `baseline` and `xHeight` are calculated.
 *
 * @cat     Document
 * @subcat  Transformation
 * @method  bounds
 *
 * @param   {PageItem|Text} obj The page item or text to calculate the geometric bounds.
 * @return  {Object} Geometric bounds object with these properties: `width`, `height`, `left`, `right`, `top`, `bottom` and for text: `baseline`, `xHeight`.
 */
pub.bounds = function (obj) {
  var x1, y1, x2, y2, w, h;
  var offsets = [0, 0];

  if (isText(obj)) {
    var baseline = obj.baseline;
    var ascent = obj.ascent;
    var descent = obj.descent;

    x1 = obj.horizontalOffset;
    y1 = baseline - ascent;
    x2 = obj.endHorizontalOffset;
    y2 = baseline + descent;
    w = x2 - x1;
    h = y2 - y1;

    if (w < 0 || h < 0) {
      warning("bounds(), not possible to get correct bounds, possible line break within textObj");
    }

    // We not sure if this 100% correct, check
    // http://en.wikipedia.org/wiki/File:Typography_Line_Terms.svg
    var xHeight = y1 + descent;

    return {"width": w,
            "height": h,
            "left": x1 + currOriginX,
            "right": x2 + currOriginX,
            "top": y1 + currOriginY,
            "bottom": y2 + currOriginY,
            "baseline": baseline + currOriginY,
            "xHeight": xHeight + currOriginY};
  } else {
    // is it a pageItem?
    if (obj.hasOwnProperty("geometricBounds")) {
      var geometricBounds = obj.geometricBounds; // [y1, x1, y2, x2]
      x1 = geometricBounds[1] + currOriginX;
      y1 = geometricBounds[0] + currOriginY;
      x2 = geometricBounds[3] + currOriginX;
      y2 = geometricBounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // everything else e.g. page, spread
    else if (obj.hasOwnProperty("bounds")) {
      var bounds = obj.bounds; // [y1, x1, y2, x2]
      x1 = bounds[1] + currOriginX;
      y1 = bounds[0] + currOriginY;
      x2 = bounds[3] + currOriginX;
      y2 = bounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // no idea what that might be, give up
    else {
      error("bounds(), invalide type of parameter! Can't get bounds for this object.");
    }
  }
};
