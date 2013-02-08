var settings = {};

/* configuration */
$.level = 2;
$.strict = false;

/* extendables settings */
settings.package_directories = ['./core-packages', './site-packages'];

/* module settings */
// don't log debug messages, but do log everything else
settings.LOGGING_LOG_LEVEL = 4; 
settings.LOGGING_FOLDER = new Folder("log").at(Folder.extendables);