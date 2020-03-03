// ----------------------------------------
// src/includes/input.js
// ----------------------------------------

// ----------------------------------------
// Input
// ----------------------------------------

/**
 * @summary Executes a shell command and returns the result.
 * @description Executes a shell command and returns the result, currently Mac only.
 *
 * BE CAREFUL!
 *
 * @cat     Input
 * @method  shellExecute
 *
 * @param   {String} cmd The shell command to execute
 * @return  {String} { description_of_the_return_value }
 */
pub.shellExecute = function(cmd) {
  if (Folder.fs === "Macintosh") {
    try {
      return app.doScript("return do shell script item 1 of arguments", ScriptLanguage.applescriptLanguage, [cmd]);
    } catch (e) {
      error("shellExecute(): " + e);
    }
  } else {
    error("shellExecute() is a Mac only feature at the moment. Sorry!");
  }
};

// ----------------------------------------
// Input/Files
// ----------------------------------------

/**
 * @summary Downloads an URL to a file.
 * @description Downloads an URL to a file, currently Mac only.
 *
 * @cat     Input
 * @subcat  Files
 * @method  download
 *
 * @param   {String} url The download url
 * @param   {String|File} [file] A relative file path in the project folder or a File instance
 */
pub.download = function(url, file) {
  var projPath = pub.projectFolder().fsName.replace(" ", "\\ ");
  // var scriptPath = "~/Documents/basiljs/bundle/lib/download.sh";
  // This is more portable then a fixed location
  // the Script looks for the lib folder next to itself
  var currentBasilFolderPath = File($.fileName).parent.fsName;
  var scriptPath = currentBasilFolderPath + "/lib/download.sh";
  if(File(scriptPath).exists === true) {
    // the script is there. Great
    scriptPath = File(scriptPath).fsName;
  } else {
    // if not lets create it on the fly
    var scriptContent = [
      "#!/bin/bash",
      "mkdir -p \"$1\"",
      "cd \"$1\"",
      "if [ -z \"$3\" ]",
      "  then",
      "    # echo \"-O\"",
      "    curl -L -O $2",
      "  else",
      "    # echo \"-o\"",
      "    curl -L -o \"$3\" $2",
      "fi"];
    // check if the lib folder is there.
    if(Folder(currentBasilFolderPath + "/lib").exists !== true) {
      // no its not lets create ot
      // should be functionalized
      // will be needed for loop and stop.jsx as well
      var res = Folder(currentBasilFolderPath + "/lib").create();
      if(res === false) {
        // ! Error creating folder :-(
        // uh this should never happen
        error("An error occurred while creating the \"/lib\" folder. Please report this issue");
        return;
      }
    } // end of lib folder check
    // the folder should be there.
    // lets get it
    var libFolder = Folder(currentBasilFolderPath + "/lib");
    // now create the script file
    var downloadScript = new File(libFolder.fsName + "/download.sh");
    downloadScript.open("w", undefined, undefined);
    // set encoding and linefeeds
    downloadScript.lineFeed = "Unix";
    downloadScript.encoding = "UTF-8";
    downloadScript.write(scriptContent.join("\n"));
    downloadScript.close();
  } // end of file and folder creation

  if (isURL(url)) {
    var cmd = null;

    if (file) {
      if (file instanceof File) {
        var downloadFolder = file.parent.fsName;
        var fileName = file.displayName;
        downloadFolder = downloadFolder.replace(" ", "\\ ");
        fileName = fileName.replace(" ", "\\ ");
        cmd = ["sh", scriptPath, downloadFolder, url, fileName].join(" ");

      } else {
        var downloadFolder = file.substr(0, file.lastIndexOf("/"));
        var fileName = file.substr(file.lastIndexOf("/") + 1);

        // get rif of some special cases
        if(startsWith(downloadFolder, "./")) downloadFolder.substr(2);
        if(startsWith(downloadFolder, "/")) downloadFolder.substr(1);

        downloadFolder = downloadFolder.replace(" ", "\\ ");
        fileName = fileName.replace(" ", "\\ ");
        downloadFolder = projPath + "/data/" + downloadFolder;
        cmd = ["sh", scriptPath, downloadFolder, url, fileName].join(" ");

      }

    } else {
      var downloadFolder = projPath + "/data/download";
      var cmd = ["sh", scriptPath, downloadFolder, url].join(" ");
    }

    println(cmd);
    pub.shellExecute(cmd);

  } else {
    error("The url " + url + " is not a valid one. Please double check!");
  }
};

/**
 * @summary Returns a file.
 * @description Returns a file object.
 * Note that the resulting file object can either refer to an already existing file or if the file does not exist, it can create a preliminary "virtual" file that refers to a file that could be created later (i.e. by an export command).
 *
 * @cat     Input
 * @subcat  Files
 * @method  file
 *
 * @param   {String} filePath The file path.
 * @return  {File} File at the given path.
 *
 * @example <caption>Get an image file from the desktop and place it in the document</caption>
 * var myImage = file("~/Desktop/myImage.jpg");
 * image(myImage, 0, 0);
 *
 * @example <caption>Create a file and export it to the desktop</caption>
 * var myExportFile = file("~/Desktop/myNewExportFile.pdf");
 * savePDF(myExportFile);
 */
pub.file = function(filePath) {
  if(! isString(filePath)) {
    error("file(), wrong argument. Use a string that describes a file path.");
  }

  // check if user is referring to a file in the data directory
  if(currentDoc().saved) {
    var file = new File(pub.projectFolder() + "/data/" + filePath);
    if(file.exists) {
      return file;
    }
  }

  // add leading slash to avoid errors on file creation
  if(filePath[0] !== "~" && filePath[0] !== "/") {
    filePath = "/" + filePath;
  }

  return new File(filePath);
};

/**
 * @summary Gets all files of a folder.
 * @description Gets all files of a folder and returns them in an array of file objects. The settings object can be used to restrict the search to certain file types only, to include hidden files and to include files in subfolders.
 *
 * @cat     Input
 * @subcat  Files
 * @method  files
 *
 * @param   {Folder|String} [folder] The folder that holds the files or a string describing the path to that folder.
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {String|Array} [settings.filter] Suffix(es) of file types to include. Default: `"*"` (include all file types)
 * @param   {Boolean} [settings.hidden] Hidden files will be included. Default: `false`
 * @param   {Boolean} [settings.recursive] Searches subfolders recursively for matching files. Default: `false`
 * @return  {Array} Array of the resulting file(s). If no files are found, an empty array will be returned.
 *
 * @example <caption>Get a folder from the desktop and load all its JPEG files</caption>
 * var myImageFolder = folder("~/Desktop/myImages/");
 * var myImageFiles = files(myImageFolder, {filter: ["jpeg", "jpg"]});
 *
 * @example <caption>If the document is saved, load all files from its data folder, including from its subfolders</caption>
 * var myDataFolder = folder();
 * var allMyDataFiles = files(myDataFolder, {recursive: true});
 */
pub.files = function(folder, settings, collectedFiles) {
  var topLevel;
  if (collectedFiles === undefined) {
    if(folder === undefined && currentDoc().saved) {
      folder = pub.folder();
    } else if (folder === undefined) {
      error("files(), missing first argument. Use folder or a string to describe a folder path or save your document to access the data folder.");
    }
    if(isString(folder)) {
      folder = pub.folder(folder);
    }
    if(!(folder instanceof Folder)) {
      error("files(), wrong first argument. Use folder or a string to describe a folder path.");
    } else if (!folder.exists) {
      error("files(), the folder \"" + folder + "\" does not exist.");
    }

    topLevel = true;
    collectedFiles = [];

    if(!settings) {
      settings = {};
    }

    // set settings object to given values or defaults
    settings.filter = settings.hasOwnProperty("filter") ? settings.filter : "*";
    settings.hidden = settings.hasOwnProperty("hidden") ? settings.hidden : false;
    settings.recursive = settings.hasOwnProperty("recursive") ? settings.recursive : false;

    if(!(settings.filter instanceof Array)) {
      settings.filter = [settings.filter];
    }
  } else {
    topLevel = false;
  }

  if(settings.recursive) {
    var folderItems = folder.getFiles();
    for (var i = folderItems.length - 1; i >= 0; i--) {
      if (folderItems[i] instanceof Folder) {
        if(!settings.hidden && folderItems[i].displayName[0] === ".") continue;
        collectedFiles = pub.files(folderItems[i], settings, collectedFiles);
      }
    }
  }

  for (var i = settings.filter.length - 1; i >= 0; i--) {
    var mask = "*." + settings.filter[i];
    var fileItems = folder.getFiles(mask);
    for (var j = fileItems.length - 1; j >= 0; j--) {
      if(!settings.hidden && fileItems[j].displayName[0] === ".") continue;
      if(!(fileItems[j] instanceof File)) continue;
      collectedFiles.push(fileItems[j]);
    }
  }

  return topLevel ? collectedFiles.reverse() : collectedFiles;
};

/**
 * @summary Returns a folder.
 * @description Returns a folder object.
 * Note that the resulting folder object can either refer to an already existing folder or if the folder does not exist, it can create a preliminary "virtual" folder that refers to a folder that could be created later.
 *
 * @cat     Input
 * @subcat  Files
 * @method  folder
 *
 * @param   {String} [folderPath] The path of the folder.
 * @return  {Folder} Folder at the given path. If no path is given, but the document is already saved, the document's data folder will be returned.
 *
 * @example <caption>Get a folder from the desktop and load its files</caption>
 * var myImageFolder = folder("~/Desktop/myImages/");
 * var myImageFiles = files(myImageFolder);
 *
 * @example <caption>Get the data folder, if the document is already saved</caption>
 * var myDataFolder = folder();
 */
pub.folder = function(folderPath) {
  if(folderPath === undefined) {
    if(currentDoc().saved) {
      return new Folder(pub.projectFolder() + "/data/");
    } else {
      error("folder(), no data folder. The document has not been saved yet, so there is no data folder to access.");
    }
  }
  if(! isString(folderPath)) {
    error("folder(), wrong argument. Use a string that describes the path of a folder.");
  }

  // check if user is referring to a folder in the data directory
  if(currentDoc().saved) {
    var folder = new Folder(pub.projectFolder() + "/data/" + folderPath);
    if(folder.exists) {
      return folder;
    }
  }

  // add leading slash to avoid errors on folder creation
  if(folderPath[0] !== "~" && folderPath[0] !== "/") {
    folderPath = "/" + folderPath;
  }

  return new Folder(folderPath);
};

/**
 * @summary Gets and parses the contents of a JSON file.
 * @description Reads the contents of a JSON file and returns an object with the data. If the file is specified by name as string, the path can point either directly at a file in the document's data directory or be specified as an absolute path.
 *
 * @cat     Input
 * @subcat  Files
 * @method  loadJSON
 *
 * @param   {String|File} file The JSON file name in the document's data directory, an absolute path to a JSON file, a File instance or an URL.
 * @return  {Object} The resulting data object.
 */
pub.loadJSON = function(file) {

  var jsonString;

  if (isURL(file)) {
    jsonString = getURL(file);
  } else {
    var inputFile = initDataFile(file),
      data = null;
    inputFile.open("r");
    jsonString = inputFile.read();
    inputFile.close();
  }

  return pub.JSON.parse(jsonString);
};

/**
 * @summary Gets the contents of a file or loads an URL into a string.
 * @description Reads the contents of a file or loads an URL into a String. If the file is specified by name as string, the path can point either directly at a file in the document's data directory or be specified as an absolute path.
 *
 * @cat     Input
 * @subcat  Files
 * @method  loadString
 *
 * @param   {String|File} file The text file name in the document's data directory or a File instance or an URL
 * @return  {String} String file or URL content.
 */
pub.loadString = function(file) {
  if (isURL(file)) {
    return getURL(file);
  } else {
    var inputFile = initDataFile(file),
      data = null;
    inputFile.open("r");
    data = inputFile.read();
    inputFile.close();
    return data;
  }
};

/**
 * @summary Gets the contents of a file or loads an URL into an array of its individual lines.
 * @description Reads the contents of a file or loads an URL and creates a string array of its individual lines. If the file is specified by name as string, the path can point either directly at a file in the document's data directory or be specified as an absolute path.
 *
 * @cat     Input
 * @subcat  Files
 * @method  loadStrings
 *
 * @param   {String|File} file The text file name in the document's data directory or a file instance or an URL
 * @return  {Array} Array of the individual lines in the given file or URL
 */
pub.loadStrings = function(file) {
  if (isURL(file)) {
    var result = getURL(file);
    return result.match(/[^\r\n]+/g);
  } else {
    var inputFile = initDataFile(file),
      result = [];
    inputFile.open("r");
    while (!inputFile.eof) {
      result.push(inputFile.readln());
    }
    inputFile.close();
    return result;
  }
};

/**
 * @summary Opens a dialog to select a file.
 * @description Opens a selection dialog that allows to select one file. The settings object can be used to add a prompt text at the top of the dialog, to restrict the selection to certain file types and to set the dialog's starting folder.
 *
 * @cat     Input
 * @subcat  Files
 * @method  selectFile
 *
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {String} [settings.prompt] The prompt text at the top of the file selection dialog. Default: `""` (no prompt)
 * @param   {String|Array} [settings.filter] String or an array containing strings of file endings to include in the dialog. Default: `""` (include all)
 * @param   {Folder|String} [settings.folder] Folder or a folder path string defining the start location of the dialog. Default: most recent dialog folder or main user folder.
 * @return  {File|Null} The selected file. If the user cancels, `null` will be returned.
 *
 * @example <caption>Open file selection dialog with a prompt text</caption>
 * selectFile({prompt: "Please select a file."});
 *
 * @example <caption>Open selection dialog starting at the user's desktop, allowing to only select PNG or JPEG files</caption>
 * selectFile({folder: "~/Desktop/", filter: ["jpeg", "jpg", "png"]});
 */
pub.selectFile = function(settings) {
  return createSelectionDialog(settings);
};

/**
 * @summary Opens a dialog to select multiple files.
 * @description Opens a selection dialog that allows to select one or multiple files. The settings object can be used to add a prompt text at the top of the dialog, to restrict the selection to certain file types and to set the dialog's starting folder.
 *
 * @cat     Input
 * @subcat  Files
 * @method  selectFiles
 *
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {String} [settings.prompt] The prompt text at the top of the file selection dialog. Default: `""` (no prompt)
 * @param   {String|Array} [settings.filter] String or an array containing strings of file endings to include in the dialog. Default: `""` (include all)
 * @param   {Folder|String} [settings.folder] Folder or a folder path string defining the start location of the dialog. Default: most recent dialog folder or main user folder.
 * @return  {Array} Array of the selected file(s). If the user cancels, an empty array will be returned.
 *
 * @example <caption>Open file selection dialog with a prompt text</caption>
 * selectFiles({prompt: "Please select your files."});
 *
 * @example <caption>Open selection dialog starting at the user's desktop, allowing to only select PNG or JPEG files</caption>
 * selectFiles({folder: "~/Desktop/", filter: ["jpeg", "jpg", "png"]});
 */
pub.selectFiles = function(settings) {
  if(!settings) {
    settings = {};
  }
  settings.multiFile = true;

  return createSelectionDialog(settings);
};

/**
 * @summary Opens a dialog to select a folder.
 * @description Opens a selection dialog that allows to select a folder. The settings object can be used to add a prompt text at the top of the dialog and to set the dialog's starting folder.
 *
 * @cat     Input
 * @subcat  Files
 * @method  selectFolder
 *
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {String} [settings.prompt] The prompt text at the top of the folder selection dialog. Default: `""` (no prompt)
 * @param   {Folder|String} [settings.folder] Folder or a folder path string defining the start location of the dialog. Default: most recent dialog folder or main user folder.
 * @return  {Folder|Null} The selected folder. If the user cancels, `null` will be returned.
 *
 * @example <caption>Open folder selection dialog with a prompt text</caption>
 * selectFolder({prompt: "Please select a folder."});
 *
 * @example <caption>Open folder selection dialog starting at the user's desktop</caption>
 * selectFolder({folder: "~/Desktop/"});
 */
pub.selectFolder = function(settings) {
  if(!settings) {
    settings = {};
  }
  settings.folderSelect = true;

  return createSelectionDialog(settings);
};

// ----------------------------------------
// Input/Time & Date
// ----------------------------------------

/**
 * @summary Returns the current day of the month.
 * @description The `day()` function returns the current day as a value from `1`-`31`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  day
 *
 * @return  {Number} The current day number.
 */
pub.day = function() {
  return (new Date()).getDate();
};

/**
 * @summary Returns the current hour.
 * @description The `hour()` function returns the current hour as a value from `0` - `23`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  hour
 *
 * @return  {Number} The current hour.
 */
pub.hour = function() {
  return (new Date()).getHours();
};

/**
 * @summary Returns the milliseconds since starting the script.
 * @description Returns the number of milliseconds (thousandths of a second) since starting the script.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  millis
 *
 * @return  {Number} The current milli.
 */
pub.millis = function() {
  return Date.now() - startTime;
};

/**
 * @summary Returns the milliseconds of the current time.
 * @description The `millisecond()` function differs from `millis()`, in that it returns the exact millisecond (thousandths of a second) of the current time.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  millisecond
 *
 * @return  {Number} The current millisecond.
 */
pub.millisecond = function() {
  return (new Date()).getMilliseconds();
};

/**
 * @summary Returns the current minute.
 * @description The `minute()` function returns the current minute as a value from `0` - `59`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  minute
 *
 * @return  {Number} The current minute.
 */
pub.minute = function() {
  return (new Date()).getMinutes();
};

/**
 * @summary Returns the current month.
 * @description The `month()` function returns the current month as a value from `1`-`12`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  month
 *
 * @return  {Number} The current month number.
 */
pub.month = function() {
  return (new Date()).getMonth() + 1;
};

/**
 * @summary Returns the current second.
 * @description The `second()` function returns the current second as a value from `0` - `59`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  second
 *
 * @return  {Number} The current second.
 */
pub.second = function() {
  return (new Date()).getSeconds();
};

/**
 * @summary Returns a timestamp.
 * @description The `timestamp()` function returns the current date formatted as `YYYYMMDD_HHMMSS` for useful unique filenaming.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  timestamp
 *
 * @return  {String} The current time in `YYYYMMDD_HHMMSS`.
 */
pub.timestamp = function() {
  var dt = new Date();
  var dtf = dt.getFullYear();
  dtf += pub.nf(dt.getMonth() + 1, 2);
  dtf += pub.nf(dt.getDate(), 2);
  dtf += "_";
  dtf += pub.nf(dt.getHours(), 2);
  dtf += pub.nf(dt.getMinutes(), 2);
  dtf += pub.nf(dt.getSeconds(), 2);
  return dtf;
};

/**
 * @summary Returns the current week number of the year.
 * @description The `week()` function returns the current week as a value from `1`-`52`.
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  week
 *
 * @return  {Number} The current week number of the year.
 */
pub.week = function() {
  var dt = new Date();
  var dtJan = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil((((dt - dtJan) / 86400000) + dtJan.getDay() + 1) / 7);
};

/**
 * @summary Returns the current day of the week.
 * @description The `weekday()` function returns the current weekday as a string from `Sunday`, `Monday`, `Tuesday` ...
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  weekday
 *
 * @return  {String} The current weekday name.
 */
pub.weekday = function() {
  var weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  return weekdays[(new Date()).getDay()];
};

/**
 * @summary Returns the current day number of the week.
 * @description The `weekdayCount()` function returns the current weekday as value from `1` - `7` (starting Monday).
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  weekdayCount
 *
 * @return  {Number} The current weekday as number.
 */
pub.weekdayCount = function() {
  var dt = new Date().getDay();
  if(dt === 0) {
    dt = 7;
  }
  return dt;
};

/**
 * @summary Returns the current year.
 * @description The `year()` function returns the current year as a number (`2018`, `2019` etc).
 *
 * @cat     Input
 * @subcat  Time & Date
 * @method  year
 *
 * @return  {Number} The current year.
 */
pub.year = function() {
  return (new Date()).getFullYear();
};

// ----------------------------------------
// Input Private
// ----------------------------------------

var getURL = function(url) {
  if (isURL(url)) {
    if (Folder.fs === "Macintosh") {
      return pub.shellExecute("curl -m 15 -L '" + url + "'");
    } else {
      error(getParentFunctionName(1) + "(), loading of strings via an URL is a Mac only feature at the moment. Sorry!");
    }
  } else {
    error(getParentFunctionName(1) + "(), the url " + url + " is invalid. Please double check!");
  }
};

var initDataFile = function(file) {

  if(!(isString(file) || file instanceof File)) {
    error(getParentFunctionName(1) + "(), invalid first argument. Use File or a String describing a file path.");
  }

  var fileString = "" + file;

  var result = null;
  if (file instanceof File) {
    result = file;
  } else {

    // if the document has been saved, check for the file in the data folder
    if(currentDoc().saved) {
      result = new File(pub.projectFolder().absoluteURI + "/data/" + file);
      if(!result.exists) {
        result = null;
      }
    }

    // otherwise, assume a file path outside the data folder
    if(!result) {
      result = new File(file);
    }

  }
  if (!result.exists) {
    error(getParentFunctionName(1) + "(), could not load file. The file \"" + fileString + "\" does not exist.");
  }
  return result;
};
