/**
 * @class
 * @name Application
 * @desc An instance of this class is available as ``app`` in every Adobe 
 * application with an ExtendScript engine.
 */

/**
 * @desc Check the host app.
 * @param {String} application The application name. Case-insensitive. 
 * @param {String|Number} [version] 
 *     The application version number. Add two to your CS version number.
 *     or pass in the version number as a string prefixed with 'CS', like ``app.is('indesign', 'CS5')``.
 *
 * @example
 *     alert(app.is('toolkit'));          // any version
 *     alert(app.is('indesign', 'CS2'));  // Creative Suite 2
 *     alert(app.is('indesign', 4));      // Creative Suite 2
 *     alert(app.is('indesign', '6.0'));  // Creative Suite 4.0
 */

Application.prototype.is = function (application, version) {
	if (version && version.to('lower').contains('cs')) {
		if (!application.contains('toolkit')) {
			version = version.replace(/cs/gi, "").to('int') + 2;
		}
	}
	var version = version || this.version;
	var is_app = this.name.to('lower').contains(application.to('lower'));
	var is_version = this.version.to('string').startswith(version);
	return is_app && is_version;
}