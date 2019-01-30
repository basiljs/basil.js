// ----------------------------------------
// src/includes/structure.js
// ----------------------------------------

// ----------------------------------------
// Structure
// ----------------------------------------

/**
 * @summary Sets the performance mode to allow hiding or freezing the document during script execution.
 * @description Used to set the performance mode. While modes can be switched during script execution, to use a mode for the entire script execution, `mode()` should be placed in the beginning of the script. In basil there are three different performance modes:
 *
 * - `VISIBLE` is the default mode. In this mode, during script execution the document will be processed with screen redraw, allowing to see direct results during the process. As the screen needs to redraw continuously, this is slower than the other modes.
 * - `HIDDEN` allows to process the document in background mode. The document is not visible in this mode, which speeds up the script execution. In this mode you will likely look at InDesign with no open document for quite some time – do not work in InDesign during this time. You may want to use `println("yourMessage")` in your script and look at the console to get information about the process. Note: In order to enter this mode either a saved document needs to be open or no document at all. If you have an unsaved document open, basil will automatically save it for you. If it has not been saved before, you will be prompted to save it to your hard drive.
 * - `SILENT` processes the document without redrawing the screen. The document will stay visible and only update once the script is finished or once the mode is changed back to `VISIBLE`.
 *
 * @cat     Structure
 * @method  mode
 *
 * @param   {String} mode The performance mode to switch to.
 */
pub.mode = function(mode) {

  if(!(mode === pub.VISIBLE || mode === pub.HIDDEN || mode === pub.SILENT)) {
    error("mode(), invalid argument. Use VISIBLE, HIDDEN or SILENT.");
  }

  app.scriptPreferences.enableRedraw = (mode === pub.VISIBLE || mode === pub.HIDDEN);

  if(!currDoc) {
    // initiate new document in given mode
    currentDoc(mode);
  } else {

    if (!currDoc.saved && !currDoc.modified && pub.HIDDEN) {
      // unsaved, unmodified doc at the beginning of the script that needs to be hidden
      // -> will be closed without saving, fresh hidden document will be opened
      currDoc.close(SaveOptions.NO);
      currDoc = app.documents.add(false);
      setCurrDoc(currDoc);
    } else if (mode === pub.HIDDEN && currMode !== pub.HIDDEN) {
      // existing document needs to be hidden
      if (!currDoc.saved && currDoc.modified) {
        try {
          currDoc.save();
        } catch(e) {
          throw {userCancel: true};
        }
        warning("Document was not saved and has now been saved to your hard drive in order to enter HIDDEN.");
      } else if (currDoc.modified) {
        currDoc.save(File(currDoc.fullName));
        warning("Document was modified and has now been saved to your hard drive in order to enter HIDDEN.");
      }
      var docPath = currDoc.fullName;
      currDoc.close(); // close the doc and reopen it without adding to the display list
      currDoc = app.open(File(docPath), false);

      setCurrDoc(currDoc);
    } else if (mode !== pub.HIDDEN && currMode === pub.HIDDEN) {
      // existing document needs to be unhidden
      currDoc.windows.add();
      app.activeWindow.bounds = currWindowBounds;
    }
  }

  if (!progressPanel && (mode === pub.HIDDEN || mode === pub.SILENT)) {
    // turn on progress panel
    progressPanel = new Progress();
  } else if (progressPanel && mode === pub.VISIBLE) {
    // turn off progress panel
    progressPanel.closePanel();
    progressPanel = null;
  }

  currMode = mode;
};

/**
 * @summary Stops basil from looping.
 * @description Stops basil from continuously executing the code within `loop()` and quits the script.
 *
 * @cat     Structure
 * @method  noLoop
 */
pub.noLoop = function(printFinished) {
  var allIdleTasks = app.idleTasks;
  for (var i = app.idleTasks.length - 1; i >= 0; i--) {
    allIdleTasks[i].remove();
  }
  if(printFinished) {
    println("Basil.js -> Stopped looping.");
    println("[Finished in " + executionDuration() + "]");
  };
  resetUserSettings();
};
