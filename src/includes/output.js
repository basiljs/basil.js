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
