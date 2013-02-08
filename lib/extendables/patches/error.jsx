/**
 * @desc This method overloads :func:`Object#is` to combat a problem with some versions of ExtendScript
 * that leads to all error types being considered the base class Error. This problem makes it impossible to
 * do simple comparisons on errors, for example ``new EvalError() instanceof SyntaxError``. The previous 
 * expression should return false but will return true.
 *
 * When testing whether you're dealing with a specific kind of error, use this method, and refrain
 * from using ``instanceof``.
 *
 * @param {Constructor} type Use the constructor itself, not a string or an instance.
 *
 * @example
 *     try {
 *         raise new SyntaxError();
 *     } catch (error if error.is(TypeError)) {
 *         alert("This displays in case of a type error, but not in case of a syntax error.");
 *     }
 *
 * @see :ref:`error-handling` has some useful advice on how to handle errors in ExtendScript.
 *
 * @returns {Bool}
 *     True or false. Any error type matches the base class, so ``new SyntaxError().is(Error)`` would return ``true``.
 */

Error.prototype.is = function (type) {
	if (this instanceof type) {
		if ('_type' in this) {
			return type == Error || this._type == type;
		} else {
			throw new TypeError("This method only works on built-in error types \
				and those created using the Error.factory class method.");
		}
	} else {
		return false;
	}
}

/**
 * @desc Use this classmethod to make sure your custom error types work
 * just like the built-in ones.
 *
 * @param {String} name Preferably the same name as the variable you're associating the error with.
 *
 * @example var DatabaseError = Error.factory("DatabaseError");
 */

Error.factory = function (name) {
	var error = function (msg, file, line) {
		this.name = name;
		this.description = msg;
		this._type = error;
	}
	error.prototype = new Error();
	return error;
}

/**
 * @class
 * @name Error
 * @desc A general-purpose error
 */

Error.prototype._type = Error;

/**
 * @class
 * @name EvalError
 * @desc An error that occurs regarding the global function eval()
 */

EvalError.prototype._type = EvalError;

/**
 * @class
 * @name RangeError
 * @desc An error that occurs when a numeric variable or parameter is outside of its valid range
 */

RangeError.prototype._type = RangeError;

/**
 * @class
 * @name ReferenceError
 * @desc An error that occurs when de-referencing an invalid reference
 */

ReferenceError.prototype._type = ReferenceError;

/**
 * @class
 * @name SyntaxError
 * @desc An error that occurs regarding the global function eval()
 */

SyntaxError.prototype._type = SyntaxError;

/**
 * @class
 * @name TypeError
 * @desc An error that occurs when a variable or parameter is not of a valid type
 */

TypeError.prototype._type = TypeError;

/**
 * @class
 * @name IOError
 * @desc Use when an IO operation (loading a file, writing to a file, an internet connection) fails.
 */

IOError.prototype._type = IOError;

/**
 * @class
 * @name ArithmeticError
 * @desc Use when a calculation misbehaves.
 */

var ArithmeticError = Error.factory("ArithmeticError");

/**
 * @class
 * @name ImportError
 * @desc Use when an import fails. More specific than IOError.
 */

var ImportError = Error.factory("ImportError");

/**
 * @class
 * @name EnvironmentError
 * @desc Use for exceptions that have nothing to do with Extendables or ExtendScript.
 */

var EnvironmentError = Error.factory("EnvironmentError");

/**
 * @class
 * @name ParseError
 * @desc Much like EvalError, but for your own parsers.
 */

var ParseError = Error.factory("ParseError");

/**
 * @class
 * @name SystemError
 * @desc Use when the system (either the Creative Suite app or the operating system) malfunctions.
 */

var SystemError = Error.factory("SystemError");

/**
 * @class
 * @name NotImplementedError
 * @desc Use to warn people that a feature has not yet been implemented, as a placeholder
 * to remind yourself or to indicate that a subclass needs to overload the parent method.
 */

var NotImplementedError = Error.factory("NotImplementedError");

if (app.name.to('lower').contains("indesign")) {
	/**
	 * @class
	 * @name ValidationError
	 */
	ValidationError.prototype._type = ValidationError;
}