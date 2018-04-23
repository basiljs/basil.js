// ----------------------------------------
// src/includes/output.js
// ----------------------------------------

// ----------------------------------------
// Output/Console
// ----------------------------------------

/**
 * @description Prints a message to the console output in the ExtendScript editor, but unlike `println()` it doesn't return the carriage to a new line at the end.
 *
 * @cat     Output
 * @subcat  Console
 * @method  print
 *
 * @param   {Any} msg Any combination of Number, String, Object, Boolean, Array to print.
 */
pub.print = function() {
  var msg = Array.prototype.slice.call(arguments).join(" ");
  $.write(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg);
};

/**
 * @description Prints a message line to the console output in the ExtendScript editor.
 *
 * @cat     Output
 * @subcat  Console
 * @method  println
 *
 * @param   {Any} msg Any combination of Number, String, Object, Boolean, Array to print.
 */
var println = pub.println = function() {
  var msg = Array.prototype.slice.call(arguments).join(" ");
  $.writeln(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg + "\n");
};

// ----------------------------------------
// Output/Files
// ----------------------------------------

/**
 * @description Exports the current document as PDF to the documents folder. Please note that export options default to the last used export settings.
 *
 * @cat     Output
 * @subcat  Files
 * @method  savePDF
 *
 * @param   {String|File} file The file name or a File instance.
 * @param   {Boolean} [showOptions] Whether to show the export dialog.
 * @return  {File} The exported PDF file.
 */
pub.savePDF = function(file, showOptions) {
  var outputFile = initExportFile(file);
  if (showOptions !== true) showOptions = false;
  try{
    var myPDF = currentDoc().exportFile(ExportFormat.PDF_TYPE, outputFile, showOptions);
  } catch(e) {
    error("savePDF(), PDF could not be saved. Possibly you are trying to save to a write protected location.\n\n" +
      "InDesign cannot create top level folders outside the user folder. If you are trying to write to such a folder, first create it manually.");
  }
  return outputFile;
};

/**
 * @description Exports the current document as PNG (or sequence of PNG files) to the documents folder. Please note, that export options default to the last used export settings.
 *
 * @cat     Output
 * @subcat  Files
 * @method  savePNG
 *
 * @param   {String|File} file The file name or a File instance
 * @param   {Boolean} [showOptions] Whether to show the export dialog
 * @return  {File} The exported PNG file.
 */
pub.savePNG = function(file, showOptions) {
  var outputFile = initExportFile(file);
  if (showOptions !== true) showOptions = false;
  try{
    currentDoc().exportFile(ExportFormat.PNG_FORMAT, outputFile, showOptions);
  } catch(e) {
    error("savePNG(), PNG could not be saved. Possibly you are trying to save to a write protected location.\n\n" +
      "InDesign cannot create top level folders outside the user folder. If you are trying to write to such a folder, first create it manually.");
  }
  return outputFile;
};

/**
 * @description Writes a string to a file. If the given file exists it gets overridden.
 *
 * @cat     Output
 * @subcat  Files
 * @method  saveString
 *
 * @param   {String|File} file The file name or a File instance.
 * @param   {String} string The string to be written.
 * @return  {File} The file the string was written to.
 */
pub.saveString = function(file, string) {
  if(!isString(string)) {
    error("saveString(), invalid second argument. Use a string.");
  }
  var outputFile = initExportFile(file);
  outputFile.open("w");
  outputFile.lineFeed = Folder.fs === "Macintosh" ? "Unix" : "Windows";
  outputFile.encoding = "UTF-8";
  outputFile.write(string);
  outputFile.close();
  return outputFile;
};

/**
 * @description Writes an array of strings to a file, one line per string. If the given file exists it gets overridden.
 *
 * @cat     Output
 * @subcat  Files
 * @method  saveStrings
 *
 * @param   {String|File} file The file name or a File instance
 * @param   {Array} strings The string array to be written
 * @return  {File} The file the strings were written to.
 */
pub.saveStrings = function(file, strings) {
  if(!isArray(strings)) {
    error("saveStrings(), invalid second argument. Use an array of strings.");
  }
  var outputFile = initExportFile(file);
  outputFile.open("w");
  outputFile.lineFeed = Folder.fs === "Macintosh" ? "Unix" : "Windows";
  outputFile.encoding = "UTF-8";
  forEach(strings, function(s) {
    outputFile.writeln(s);
  });
  outputFile.close();
  return outputFile;
};

// ----------------------------------------
// Output Private
// ----------------------------------------

var initExportFile = function(file) {

  if(!(isString(file) || file instanceof File)) {
    error(getParentFunctionName(1) + "(), invalid first argument. Use File or a String describing a file path.");
  }

  var result, tmpPath = null;
  var isFile = file instanceof File;
  var filePath = isFile ? file.absoluteURI : file;

  // if parent folder already exists, the rest can be skipped
  if(isFile && File(filePath).parent.exists) {
    // remove file as in some circumstances file cannot be overwritten
    // (if file is on top level outside user folder)
    // also improves performance considerably
    File(filePath).remove();
    return File(filePath);
  }

  // clean up string path
  if((!isFile) && filePath[0] !== "~") {
    if(filePath[0] !== "/") {
      filePath = "/" + filePath;
    }
    // check if file path is a relative URI ( /Users/username/examples/... )
    // if so, turn it into an absolute URI ( ~/examples/... )
    var userRelURI = Folder("~").relativeURI;
    if(startsWith(filePath, userRelURI)) {
      filePath = "~" + filePath.substring(userRelURI.length);
    }
  }

  // clean up path and convert to array
  var pathNormalized = filePath.split("/");
  for (var i = 0; i < pathNormalized.length; i++) {
    if (pathNormalized[i] === "" || pathNormalized[i] === ".") {
      pathNormalized.splice(i, 1);
    }
  }

  if(filePath[0] === "~") {
    tmpPath = "~";
    pathNormalized.splice(0, 1);
  } else if (isFile) {
    // file objects that are outside the user folder
    tmpPath = "";
  } else {
    // string paths relative to the project folder
    tmpPath = pub.projectFolder().absoluteURI;
  }
  var fileName = pathNormalized[pathNormalized.length - 1];

  // does the path contain folders? if not, create them ...
  if (pathNormalized.length > 1) {
    var folders = pathNormalized.slice(0, -1);
    for (var i = 0; i < folders.length; i++) {
      tmpPath += "/" + folders[i];
      var f = new Folder(tmpPath);
      if (!f.exists) {
        f.create();

        if(!f.exists) {
          // in some cases, folder creation does not throw an error, yet folder does not exist
          error(getParentFunctionName(1) + "(), folder \"" + tmpPath + "\" could not be created.\n\n" +
            "InDesign cannot create top level folders outside the user folder. If you are trying to write to such a folder, first create it manually.");
        }
      }
    }
  }

  if(File(tmpPath + "/" + fileName).exists) {
    // remove existing file to avoid save errors
    File(tmpPath + "/" + fileName).remove();
  }

  return File(tmpPath + "/" + fileName);
};
