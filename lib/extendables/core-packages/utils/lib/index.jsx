exports.object = require("utils/object");
exports.array = require("utils/array");

function mix (cls, mixin, name) {
	if (!name) var name = mixin.name;
	var type = typeof mixin;

	if (type === 'function') {
		cls.prototype[name] = function () {
			return mixin.apply(this, [this].concat(Array.prototype.slice.call(arguments)));
		}
	} else {
		cls.prototype[name] = mixin;
	}
}

function extend (cls, patches) {
	for (var name in patches) {
		if (patches.hasOwnProperty(name)) {
			// safer not to replace existing properties
			if (!cls.hasOwnProperty(name)) {
				mix(cls, patches[name], name);
			}
		}
	}
}

/* Monkeypatching, for they who so choose */
function patch () {
	extend(Object, exports.object);
	extend(Array, exports.array);	
}

exports.mix = mix;
exports.extend = extend;