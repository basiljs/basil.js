Math.sum = function () {
	return arguments.to('array').sum();
}

/**
 * @desc A factory method that creates arithmetic progressions, similar to what you'll find in PHP and Python.
 * @returns {Array}
 * @example
 * > Number.range(10);
 * [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * > Number.range(1, 11);
 * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * > Number.range(0, 30, 5);
 * [0, 5, 10, 15, 20, 25]
 * > Number.range(0, 10, 3);
 * [0, 3, 6, 9]
 * > Number.range(0, -10, -1);
 * [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
 * > Number.range(0);
 * []
 * > Number.range(1, 0);
 * []
 */

Number.range = function () {
	var step = arguments[2] || 1;
	if (arguments.length === 1) {
		var from = 0;
		var to = arguments[0];		
	} else {
		var from = arguments[0];
		var to = arguments[1];		
	}
	
	var range = [];
	for (var i = from; Math.abs(i) < Math.abs(to); i = i+step) {
		range.push(i);
	}
	return range;
}