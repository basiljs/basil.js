/**
 * @class
 * @name File
 */

function from_basepath 

/**
 * @function
 * @desc Get a file or folder starting from an existing path.
 * A foolproof way to join paths together.
 *
 * Similar to ``File#getRelativeURI``, but returns a new File object
 * instead of a path.
 */

exports.at = function (self, folder) {
	if (folder.is(String)) folder = new Folder(folder);
	
	var path = [folder.relativeURI, self.relativeURI].join('/');
	return new self.constructor(path);
};

/**
 * @desc Easy extraction of path, name, basename and extension from a
 * :func:`File` object.
 * @param {String} type ``path``, ``name``, ``basename`` or ``extension``
 */

exports.component = function (self, type) {
	switch (type) {
		case 'path':
			return self.path;
		break;
		case 'name':
			return self.name;
		break;
		case 'basename':
			var extlen = self.component('extension').length;
			if (extlen) {
				return self.name.slice(0, -1 * extlen).rtrim('.');
			} else {
				return self.name;
			}
		break;
		case 'extension':
			var name = self.name.split('.');
			if (name.length > 1) {
				return name.last();
			} else {
				return '';
			}
		break;
	}
}