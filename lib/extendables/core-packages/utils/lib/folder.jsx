/**
 * @class
 * @name Folder
 */

/**
 * @desc The extendables base directory. Other notable class properties
 * include ``current``, ``desktop``, ``userData``, ``temp`` and ``trash``. 
 */

exports.extendables = new File($.fileName).parent.parent;

/**
 * @function
 * @desc Get a file or folder starting from an existing path.
 * A foolproof way to join paths together.
 *
 * Similar to ``File#getRelativeURI``, but returns a new Folder object
 * instead of a path.
 */

exports.at = require("utils/file").at;

/**
 * @desc Works just like ``Folder#getFiles``, but returns only files, not folders.
 * @param {String|Function} [mask]
 */

exports.files = function (self, mask) {
	return self.getFiles(mask).reject(function (file_or_folder) {
		return file_or_folder.is(Folder);
	});
}

/**
 * @desc Works just like ``Folder#getFiles``, but returns only folders, not files.
 * @param {String|Function} [mask]
 */

exports.folders = function (self, mask) {
	return self.getFiles(mask).reject(function (file_or_folder) {
		return file_or_folder.is(File);
	});
}