// ----------------------------------------
// src/includes/environment.js
// ----------------------------------------

/**
 * @description Sets the size of the current document, if arguments are given. If only one argument is given, both the width and the height are set to this value. Alternatively, a string can be given as the first argument to apply an existing page size preset (`"A4"`, `"Letter"` etc.). In this case, either `PORTRAIT` or `LANDSCAPE` can be used as a second argument to determine the orientation of the page. If no argument is given, an object containing the current document's width and height is returned.
 *
 * @cat     Document
 * @method  size
 *
 * @param   {Number|String} [widthOrPageSize] The desired width of the current document or the name of a page size preset.
 * @param   {Number|String} [heightOrOrientation] The desired height of the current document. If not provided the width will be used as the height. If the first argument is a page size preset, the second argument can be used to set the orientation.
 * @return  {Object} Object containing the current `width` and `height` of the document.
 *
 * @example <caption>Sets the document size to 70 x 100 units</caption>
 * size(70, 100);
 *
 * @example <caption>Sets the document size to 70 x 70</caption>
 * size(70);
 *
 * @example <caption>Sets the document size to A4, keeps the current orientation in place</caption>
 * size("A4");
 *
 * @example <caption>Sets the document size to A4, set the orientation to landscape</caption>
 * size("A4", LANDSCAPE);
 */
pub.size = function(widthOrPageSize, heightOrOrientation) {
  if(app.documents.length === 0) {
    // there are no documents
    warning("size()", "You have no open document.");
    return;
  }
  if (arguments.length === 0) {
    // no arguments given
    // return the current values
    return {width: pub.width, height: pub.height};
  }

  var doc = currentDoc();

  if(isString(widthOrPageSize)) {
    try {
      doc.documentPreferences.pageSize = widthOrPageSize;
    } catch (e) {
      error("size(), could not find a page size preset named \"" + widthOrPageSize + "\".");
    }
    if(heightOrOrientation === pub.PORTRAIT || heightOrOrientation === pub.LANDSCAPE) {
      doc.documentPreferences.pageOrientation = heightOrOrientation;
    }
    pub.width = $.global.width = doc.documentPreferences.pageWidth;
    pub.height = $.global.height = doc.documentPreferences.pageHeight;
    return {width: pub.width, height: pub.height};
  } else if(arguments.length === 1) {
    // only one argument set the first to the secound
    heightOrOrientation = widthOrPageSize;
  }
  // set the document's pageHeight and pageWidth
  doc.properties = {
    documentPreferences: {
      pageHeight: heightOrOrientation,
      pageWidth: widthOrPageSize
    }
  };
  // set height and width
  pub.width = $.global.width = widthOrPageSize;
  pub.height = $.global.height = heightOrOrientation;

  return {width: pub.width, height: pub.height};

};

/**
 * @description Inspects a given object or any other data item and prints the result to the console. This is useful for inspecting or debugging any kind of variable or data item. The optional settings object allows to control the function's output. The following parameters can be set in the settings object:
 * - `showProps`: Show or hide properties. Default: `true`
 * - `showValues`: Show or hide values. Default: `true`
 * - `showMethods`: Show or hide methods. Default: `false`
 * - `maxLevel`: Chooses how many levels of properties should be inspected recursively. Default: `1`
 * - `propList`: Allows to pass an array of property names to show. If `propList` is not set all properties will be shown. Default: `[]` (no propList)
 * If no settings object is set, the default values will be used.
 *
 * @cat     Output
 * @method  inspect
 *
 * @param   {Object} obj An object or any other data item to be inspected.
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {Boolean} [settings.showProps] Show or hide properties. Default: `true`
 * @param   {Boolean} [settings.showValues] Show or hide values. Default: `true`
 * @param   {Boolean} [settings.showMethods] Show or hide methods. Default: `false`
 * @param   {Number} [settings.maxLevel] How many levels of properties should be inspected recursively. Default: `1`
 * @param   {Array} [settings.propList] Array of properties to show. Default: `[]` (no propList)
 *
 * @example <caption>Inspecting a string</caption>
 * inspect("foo");
 *
 * @example <caption>Inspecting the current page, its methods and an additional level of properties</caption>
 * inspect(page(), {showMethods: true, maxLevel: 2})
 *
 * @example <caption>Inspecting an ellipse, listing only the properties "geometricBounds" and "strokeWeight"</caption>
 * var myEllipse = ellipse(0, 0, 10, 10);
 * inspect(myEllipse, {maxLevel: 2, propList: ["geometricBounds, strokeWeight"]});
 */
pub.inspect = function (obj, settings, level, branchArray, branchEnd) {

  var output, indent;
  output = indent = "";

  if (!level) {
    level = 0;
    branchArray = [];

    if(!settings) {
      settings = {};
    }

    // set settings object to given values or defaults
    settings.showProps = settings.hasOwnProperty("showProps") ? settings.showProps : true;
    settings.showValues = settings.hasOwnProperty("showValues") ? settings.showValues : true;
    settings.showMethods = settings.hasOwnProperty("showMethods") ? settings.showMethods : false;
    settings.maxLevel = settings.hasOwnProperty("maxLevel") ? settings.maxLevel : 1;
    settings.propList = settings.hasOwnProperty("propList") ? settings.propList : [];

    if(obj === null || obj === undefined) {
      println(obj + "");
      return;
    }

    if(obj.constructor.name === "Array") {
      if(obj.length > 0 && obj.reflect.properties.length < 3) {
        // fixing InDesign's buggy implementation of certain arrays
        // see: https://forums.adobe.com/message/9408120#9408120
        obj = Array.prototype.slice.call(obj, 0);
      }
      output += "[" + obj.join(", ") + "] (Array)";
    } else if (obj.constructor.name === "String") {
      output += "\"" + obj + "\" (String)";
    } else {
      output += obj + " (" + obj.constructor.name + ")";
    }
  } else {
    // setting up tree structure indent
    if(branchArray.length < level) {
      branchArray.push(branchEnd);
    } else if (branchArray.length > level) {
      branchArray.pop();
    }
    if(branchEnd) {
      if(!(level === 1 && settings.showMethods)) {
        branchArray[branchArray.length - 1] = true;
      }
    }
    for (var i = 0; i < level; i++) {
      if(branchArray[i]) {
        indent += "    ";
      } else {
        indent += "|   ";
      }
    }
  }

  if(settings.showProps) {
    var propArray, value, usePropList;

    if(level === 0 && settings.propList.length > 0 && settings.propList.constructor.name === "Array") {
      usePropList = true;
      propArray = settings.propList.reverse();
    } else if (obj.constructor.name === "Array") {
      // correct sorting for Array number properties (0, 1, 2 etc.)
      propArray = obj.reflect.properties.sort(function(a, b) {return a - b}).reverse();
    } else {
      propArray = obj.reflect.properties.sort().reverse();
    }

    if(propArray.length > 1 || usePropList) {
      output += "\n" + indent + "|";

      for (var i = propArray.length - 1; i >= 0; i--) {
        if(propArray[i] == "__proto__" || propArray[i] == "__count__" || propArray[i] == "__class__"|| propArray[i] == "reflect") {
          if(!i) {
            output += "\n" + indent;
          }
          continue;
        }

        if(settings.showValues) {

          try {
            var propValue = obj[propArray[i]];
            if (usePropList && !obj.hasOwnProperty(propArray[i]) && propArray[i] != "length") {
              // in case a non-existing prop is passed via propList
              // "length" needs special handling as it is not correctly recognized as a property
              value = ": The inspected item has no such property.";
            } else if (propValue === null || propValue === undefined) {
              value = ": " + propValue;
            } else if (propValue.constructor.name === "Array") {
              if(propValue.length > 0 && propValue.reflect.properties.length < 3) {
                propValue = Array.prototype.slice.call(propValue, 0);
              }
              value = ": Array (" + propValue.length + ")";
              if(propValue.length && level < settings.maxLevel - 1) {
                // recursive inspecting of Array properties
                value += pub.inspect(propValue, settings, level + 1, branchArray, !i);
              }
            } else if (typeof propValue === "object" && propValue.constructor.name !== "Enumerator"  && propValue.constructor.name !== "Date") {
              value = ": " + propValue;
              if(level < settings.maxLevel - 1) {
                // recursive inspecting of Object properties
                value += pub.inspect(propValue, settings, level + 1, branchArray, !i);
              }
            } else {
              value = ": " + propValue.toString();
            }
          } catch (e) {
            if(e.number === 30615) {
              value = ": The property is not applicable in the current state.";
            } else if (e.number === 55) {
              value = ": Object does not support the property '" + propArray[i] + "'.";
            } else {
              // other InDesign specific error messages
              value = ": " + e.message;
            }
          }

        } else {
          value = "";
        }

        output += "\n" + indent + "|-- " + propArray[i] + value;


        if(!i && !branchEnd && level !== 0) {
          // separation space when a sub-branch ends
          output += "\n" + indent;
        }
      } // end for-loop
    } // end if(propArray.length > 1 || usePropList)
  } // end if(settings.showProps)

  if(level === 0 && settings.showMethods) {

    var methodArray = settings.showMethods ? obj.reflect.methods.sort().reverse() : [];

    if(methodArray.length) {
      output += "\n|" +
                "\n|   METHODS";
    }

    for (var i = methodArray.length - 1; i >= 0; i--) {
      if(methodArray[i].name.charAt(0) === "=") {continue;}
      output += "\n|-- " + methodArray[i] + "()";
    }
  }

  if(level > 0) {
    // return for recursive calls
    return output;
  }
  // print for top level call
  println(output);

};

// ----------------------------------------
// Files & Folders

/**
 * @description Returns a file object.
 * Note that the resulting file object can either refer to an already existing file or if the file does not exist, it can create a preliminary "virtual" file that refers to a file that could be created later (i.e. by an export command).
 *
 * @cat     Files
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
 * @description Returns a folder object.
 * Note that the resulting folder object can either refer to an already existing folder or if the folder does not exist, it can create a preliminary "virtual" folder that refers to a folder that could be created later.
 *
 * @cat     Files
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
 * @description Gets all files of a folder and returns them in an array of file objects. The settings object can be used to restrict the search to certain file types only, to include hidden files and to include files in subfolders.
 *
 * @cat     Files
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
 * @description Opens a selection dialog that allows to select one file. The settings object can be used to add a prompt text at the top of the dialog, to restrict the selection to certain file types and to set the dialog's starting folder.
 *
 * @cat     Files
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
 * @description Opens a selection dialog that allows to select one or multiple files. The settings object can be used to add a prompt text at the top of the dialog, to restrict the selection to certain file types and to set the dialog's starting folder.
 *
 * @cat     Files
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
 * @description Opens a selection dialog that allows to select a folder. The settings object can be used to add a prompt text at the top of the dialog and to set the dialog's starting folder.
 *
 * @cat     Files
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
// Date

/**
 * @description The `year()` function returns the current year as a number (`2018`, `2019` etc).
 *
 * @cat     Environment
 * @subcat  Date
 * @method  year
 *
 * @return  {Number} The current year.
 */
pub.year = function() {
  return (new Date()).getFullYear();
};


/**
 * @description The `month()` function returns the current month as a value from `1`-`12`.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  month
 *
 * @return  {Number} The current month number.
 */
pub.month = function() {
  return (new Date()).getMonth() + 1;
};


/**
 * @description The `day()` function returns the current day as a value from `1`-`31`.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  day
 *
 * @return  {Number} The current day number.
 */
pub.day = function() {
  return (new Date()).getDate();
};


/**
 * @description The `weekday()` function returns the current weekday as a string from `Sunday`, `Monday`, `Tuesday` ...
 *
 * @cat     Environment
 * @subcat  Date
 * @method  weekday
 *
 * @return  {String} The current weekday name.
 */
pub.weekday = function() {
  var weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  return weekdays[(new Date()).getDay()];
};


/**
 * @description The `hour()` function returns the current hour as a value from `0` - `23`.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  hour
 *
 * @return  {Number} The current hour.
 */
pub.hour = function() {
  return (new Date()).getHours();
};


/**
 * @description The `minute()` function returns the current minute as a value from `0` - `59`.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  minute
 *
 * @return  {Number} The current minute.
 */
pub.minute = function() {
  return (new Date()).getMinutes();
};


/**
 * @description The `second()` function returns the current second as a value from `0` - `59`.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  second
 *
 * @return  {Number} The current second.
 */
pub.second = function() {
  return (new Date()).getSeconds();
};


/**
 * @description Returns the number of milliseconds (thousandths of a second) since starting the script.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  millis
 *
 * @return  {Number} The current milli.
 */
pub.millis = function() {
  return Date.now() - startTime;
};


/**
 * @description The `millisecond()` function differs from `millis()`, in that it returns the exact millisecond (thousandths of a second) of the current time.
 *
 * @cat     Environment
 * @subcat  Date
 * @method  millisecond
 *
 * @return  {Number} The current millisecond.
 */
pub.millisecond = function() {
  return (new Date()).getMilliseconds();
};


/**
 * @description The `timestamp()` function returns the current date formatted as `YYYYMMDD_HHMMSS` for useful unique filenaming.
 *
 * @cat     Environment
 * @subcat  Date
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
