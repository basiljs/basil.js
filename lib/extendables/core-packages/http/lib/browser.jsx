var http = require("http");

/**
 * @description Open a URL in a browser
 * @author Gabe Harbs
 * @requires CS4+
 */
function URL(location) {
	this.location = location;
}

/**
 * @description Fetch a URL
 */
URL.prototype.open = function () {
	return http.get(this.location);
}

/**
 * @description Open a URL in a browser
 */
URL.prototype.visit = function () {
	if (File.fs == "Macintosh") {
		var body = 'tell application "Finder"\ropen location "{}"\rend tell'.format(this.location);
		app.doScript(body,ScriptLanguage.APPLESCRIPT_LANGUAGE);
	} else {
		var body =  'dim objShell\rset objShell = CreateObject("Shell.Application")\rstr = "{}"\robjShell.ShellExecute str, "", "", "open", 1 '.format(this.location);
		app.doScript(body,ScriptLanguage.VISUAL_BASIC);
	}	
}