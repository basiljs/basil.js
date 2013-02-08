/*
 * Basic file-based logging, loosely modelled after the logging module
 * in the Python standard library
 */
 
var SEVERITY = ["NOTSET", "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"];
 
var LogMessage = function (severity, message) {
    this.date = new Date().toLocaleString();
    this.severity = severity;
    this.message = message;
    
    this.toString = function () {
        return "{} :: {}\t{}".format(this.date, SEVERITY[this.severity], this.message);
    }
}

/**
 * @class
 * @desc A log file object. Will resume an existing log if it exists, 
 * or make a new one if it doesn't.
 * @param {String} name the filename for this log file
 * @param {String|Number} [log_level=4] the log level above which log messages don't get written, 
 * either a name (e.g. CRITICAL) or the actual log level.
 *
 * @example
 *     var logging = require("logging");
 *     // all logs end up in extendables/log
 *     var log = new Log("example.log");
 *     try {
 *         throw new Error();
 *     } catch (error) {
 *         log.debug("Caught error, will log a debug message now");
 *         log.critical("Something happened: {error} ({env})", {'error': error, 'env': $.os});
  *    }
 */

var Log = function (name, log_level) {
	var self = this;
	this.name = name;
	// log level can be specified both by name or directly as a level.
	if (log_level && log_level.is(String)) log_level = SEVERITY.indexOf(log_level);
	this.log_level = log_level || settings.LOGGING_LOG_LEVEL || 4;
	
	this.truncate = function (forced) {
		// truncate the logfile if it gets bigger than half a megabyte
		self.file.open("e");
		if (forced || self.file.length > 1024*512) {
			self.file.length = 0;
		}
		self.file.close();
	}
	
	this.writeln = function (severity, message) {
		var log = self.file;		
		var logmessage = new LogMessage(severity, message)
		log.open("e");
		log.seek(log.length);	
		log.writeln(logmessage);
		log.close();		
	}

	// basic logger
	this.log = function () {
		var arguments = arguments.to('array');
		var severity  = arguments.shift();
		var template = arguments.shift();
		var message = template.format.apply(template, arguments);
		// only log what's equal to or below the configured logging treshold
		if (severity <= self.log_level) {
			self.writeln(severity, message);
		}
	}

	/**
	 * @desc log a debug message
	 * @param {String} message The log message
	 * @param {String|Object} [replacements] Can take any number of replacements, to be passed along to str.format()
	 */
	this.debug = function () {
		arguments = [5].concat(arguments.to('array'));
		self.log.apply(null, arguments);
	}
	/**
	 * @desc log an info message
	 * @param {String} message The log message
	 * @param {String|Object} [replacements] Can take any number of replacements, to be passed along to str.format()
	 */
	this.info = function () {
		arguments = [4].concat(arguments.to('array'));
		self.log.apply(null, arguments);		
	}
	/**
	 * @desc log a warning
	 * @param {String} message The log message
	 * @param {String|Object} [replacements] Can take any number of replacements, to be passed along to str.format()
	 */
	this.warning = function () {		
		arguments = [3].concat(arguments.to('array'));
		self.log.apply(null, arguments);		
	}
	/**
	 * @desc log an error
	 * @param {String} message The log message
	 * @param {String|Object} [replacements] Can take any number of replacements, to be passed along to str.format()
	 */
	this.error = function () {		
		arguments = [2].concat(arguments.to('array'));
		self.log.apply(null, arguments);		
	}
	/**
	 * @desc log a critical error
	 * @param {String} message The log message
	 * @param {String|Object} [replacements] Can take any number of replacements, to be passed along to str.format()
	 */
	this.critical = function () {			
		arguments = [1].concat(arguments.to('array'));
		self.log.apply(null, arguments);	
	}

	// init
	var logfolder = settings.LOGGING_FOLDER || new Folder("log").at(Folder.extendables);
	this.file = new File(this.name).at(logfolder);
	this.truncate();
}

exports.Log = Log;