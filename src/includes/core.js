// ----------------------------------------
// src/includes/core.js
// ----------------------------------------

// all initialisations should go here
function init() {

  welcome();

  // -- init internal state vars --
  startTime = Date.now();
  currStrokeWeight = 1;
  currStrokeTint = 100;
  currFillTint = 100;
  currCanvasMode = PAGE;
  currColorMode = RGB;
  currGradientMode = LINEAR;
  currDialogFolder = Folder("~");
  currMode = DEFAULTMODE;  // temporary, implement properly later

  var execTime;  // re-enable later
  appSettings = {
    enableRedraw: app.scriptPreferences.enableRedraw,
    preflightOff: app.preflightOptions.preflightOff
  };

  try {
    if (!currMode) {
      currMode = DEFAULTMODE;
    }

    // app settings
    app.scriptPreferences.enableRedraw = (currMode === MODEVISIBLE || currMode === MODEHIDDEN);
    app.preflightOptions.preflightOff = true;

    currentDoc(currMode);

    if (currMode === MODEHIDDEN || currMode === MODESILENT) {
      progressPanel = new Progress();
    }

    if (typeof $.global.setup === "function") {
      runSetup();
    }

    if (typeof $.global.draw === "function") {
      runDrawOnce();
    }
  } catch (e) {
    execTime = executionDuration();

    if(e.userCancel) {
      println("[Cancelled by user after " + execTime + "]");
    } else {
      println("[Cancelled after " + execTime + "]");
      alert(e);
    }

  } finally {

    if(!execTime) {
      println("[Finished in " + executionDuration() + "]");
    }

    if(currDoc && !currDoc.windows.length) {
      currDoc.windows.add(); // open the hidden doc
    }
    closeHiddenDocs();
    if (progressPanel) {
      progressPanel.closePanel();
    }
    if (addToStoryCache) {
      addToStoryCache.close();
    }

    // resetUserSettings();    // re-enable later

    exit(); // quit program execution
  }

};


// ----------------------------------------
// execution

/**
 * EXPERIMENTAL!
 *
 * Causes basil to continuously execute the code within draw() when InDesign is idle.
 * #targetengine "loop"; must be at the very top in the script file.
 * If noLoop() is called, the code in draw() stops executing.
 * It is essential to call noLoop() or execute the script lib/stop.jsx when the script is finished!
 * The framerate property determines how often draw() is called per second, e.g. a framerate of 20 will 20times call draw() per second.
 *
 * @cat Environment
 * @method loop
 * @param  {Number} framerate   The framerate per second, determines how often draw() is called per second.
 */
function loop(framerate) {
  // before running the loop we need to check if
  // the stop script exists
    // the Script looks for the lib folder next to itself
  var currentBasilFolderPath = File($.fileName).parent.fsName;
  var scriptPath = currentBasilFolderPath + "/lib/stop.jsx";
  if(File(scriptPath).exists !== true) {
    // the script is not there. lets create it
    var scriptContent = [
      "//@targetengine \"loop\"",
      "//@include \"../basil.js\";",
      "b.noLoop();",
      "if (typeof cleanUp === \"function\") {",
      "cleanUp();",
      "}",
      "cleanUp = null;"
    ];
    if(Folder(currentBasilFolderPath + "/lib").exists !== true) {
      // the lib folder also does not exist
      var res = Folder(currentBasilFolderPath + "/lib").create();
      if(res === false) {
        error("An error occurred while creating the \"/lib\" folder. Please report this issue");
        return;
      }else{
        // the folder is there
      }
      var libFolder = Folder(currentBasilFolderPath + "/lib");
      var stopScript = new File(libFolder.fsName + "/stop.jsx");
      stopScript.open("w", undefined, undefined);
    // set encoding and linefeeds
      stopScript.lineFeed = Folder.fs === "Macintosh" ? "Unix" : "Windows";
      stopScript.encoding = "UTF-8";
      stopScript.write(scriptContent.join("\n"));
      stopScript.close();
    }
  }else{
    // the script is there
    // awesome
  }
  var sleep = null;
  if (arguments.length === 0) sleep = Math.round(1000 / 25);
  else sleep = Math.round(1000 / framerate);

  if ($.engineName !== "loop") {
    error("b.loop(), Add #targetengine \"loop\"; at the very top of your script.");
  }

  currentDoc();
  runSetup();

  var idleTask = app.idleTasks.add({name: "basil_idle_task", sleep: sleep});
  idleTask.addEventListener(IdleEvent.ON_IDLE, function() {
    runDrawLoop();
  }, false);
  println("Run the script lib/stop.jsx to end the draw loop and clean up!");
//    println("loop()");
};

/**
 * EXPERIMENTAL!
 *
 * Stops basil from continuously executing the code within draw().
 *
 * @cat Environment
 * @method noLoop
 */
function noLoop() {
  var allIdleTasks = app.idleTasks;
  for (var i = app.idleTasks.length - 1; i >= 0; i--) {
    allIdleTasks[i].remove();
  }
  println("noLoop()");
};


// ----------------------------------------
// all private from here


function runSetup() {
  app.doScript(function() {
    if (typeof $.global.setup === "function") {
      $.global.setup();
    }
  }, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, SCRIPTNAME);
};

function runDrawOnce() {
  app.doScript(function() {
    if (typeof $.global.draw === "function") {
      $.global.draw();
    }
  }, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, SCRIPTNAME);
};

function runDrawLoop() {
  app.doScript(function() {
    if (typeof $.global.draw === "function") {
      $.global.draw();
    }
  }, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, SCRIPTNAME);
};

function welcome() {
  clearConsole();
  println("Running "
      + SCRIPTNAME
      + " using basil.js "
      + VERSION
      + " ...");
};

function currentDoc(mode) {
  if (currDoc === null || !currDoc) {
    var stack = $.stack;
    if (!(stack.match(/go\(.*\)/) || stack.match(/loop\(.*\)/))) {
      warning("Do not initialize Variables with dependency to b outside the setup() or the draw() function. If you do so, basil will not be able to run in performance optimized Modes! If you really need them globally we recommend to only declare them gobally but initialize them in setup()! Current Stack is " + stack);
    }
    var doc = null;
    if (app.documents.length) {
      doc = app.activeDocument;
      if (mode == MODEHIDDEN) {
        if (doc.modified) {
          doc.save();
          warning("Document was unsaved and has now been saved to your hard drive in order to enter MODEHIDDEN.");
        }
        var docPath = doc.fullName;
        doc.close(); // Close the doc and reopen it without adding to the display list
        doc = app.open(File(docPath), false);
      }
    }
    else {
      doc = app.documents.add(mode != MODEHIDDEN);
    }
    setCurrDoc(doc);
  }
  return currDoc;
};

function closeHiddenDocs() {
    // in Case we break the Script during execution in MODEHIDDEN we might have documents open that are not on the display list. Close them.
  for (var i = app.documents.length - 1; i >= 0; i -= 1) {
    var d = app.documents[i];
    if (!d.windows.length) {
      d.close(SaveOptions.NO);
    }
  }
};

function setCurrDoc(doc) {
  resetCurrDoc();
  currDoc = doc;
  // -- setup document --

  currDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

  currFont = currDoc.textDefaults.appliedFont;
  currFontSize = currDoc.textDefaults.pointSize;
  currAlign = currDoc.textDefaults.justification;
  currLeading = currDoc.textDefaults.leading;
  currKerning = 0;
  currTracking = currDoc.textDefaults.tracking;
  units(PT);

  updatePublicPageSizeVars();
};

var progressPanel = null;

function Progress() {
  this.init = function () {
    this.panel = Window.find("window", "processing...");
    if (this.panel === null) {
      this.panel = new Window("window", "processing...");
      var logo = (Folder.fs == "Macintosh") ? new File("~/Documents/basiljs/bundle/lib/basil.png") : new File("%USERPROFILE%Documents/basiljs/bundle/lib/basil.png");
      if (logo.exists) {
        this.panel.add("image", undefined, logo);
      }
      this.panel.statusbar = this.panel.add("edittext", [0, 0, 400, 300], "", {multiline: true, scrolling: false, readonly: true});
    }
    this.panel.statusbar.text = "Using basil.js " + VERSION + " ... \nEntering background render mode ...";
    this.panel.show();
  };
  this.closePanel = function () {
    if (this.panel) {
      this.panel.hide();
      this.panel.close();
    }
  };
  this.writeMessage = function (msg) {
    if (Folder.fs == "Macintosh") { // Indesign Bug on Mac: Need to set app.scriptPreferences.enableRedraw = true to redraw window....
      var rd = app.scriptPreferences.enableRedraw;
      app.scriptPreferences.enableRedraw = true;
    }
    var lines = this.panel.statusbar.text.split(/\n/);
    if (lines.length > 17)
      lines.shift();
    lines.push(msg);
    this.panel.statusbar.text = lines.join("\n");
    this.panel.layout.layout();
    if (Folder.fs == "Macintosh") {
      app.scriptPreferences.enableRedraw = rd;
    }
  };
  this.init();
};

function resetCurrDoc() {
  // resets doc and doc specific vars
  currDoc = null;
  currPage = null;
  currLayer = null;
  currFillColor = "Black";
  noneSwatchColor = "None";
  currStrokeColor = "Black";
  currRectMode = CORNER;
  currEllipseMode = CENTER;
  currYAlign = VerticalJustification.TOP_ALIGN;
  currFont = null;
  currImageMode = CORNER;

  resetMatrix();
};

function currentLayer() {
  if (currLayer === null || !currLayer) {
    currentDoc();
    if (currDoc.windows.length) {
      currLayer = app.activeDocument.activeLayer;
    } else {
      currLayer = currDoc.layers[0];
    }
  }
  return currLayer;
};

function currentPage() {
  if (currPage === null || !currPage) {
    currentDoc();
    if (currDoc.windows.length) {
      currPage = app.activeWindow.activePage;
    } else {
      currPage = currDoc.pages[0];
    }
  }
  return currPage;
};

function updatePublicPageSizeVars() {
  var pageBounds = currentPage().bounds; // [y1, x1, y2, x2]
  var facingPages = currDoc.documentPreferences.facingPages;
  var singlePageMode = false;

  var widthOffset = heightOffset = 0;

  switch(canvasMode()) {

    case PAGE:
      widthOffset = 0;
      heightOffset = 0;
      resetMatrix();
      singlePageMode = true;
      break;

    case MARGIN:
      widthOffset = -currentPage().marginPreferences.left - currentPage().marginPreferences.right;
      heightOffset = -currentPage().marginPreferences.top - currentPage().marginPreferences.bottom;
      resetMatrix();
      translate(currentPage().marginPreferences.left, currentPage().marginPreferences.top);
      singlePageMode = true;
      break;

    case BLEED:
      widthOffset = doc().documentPreferences.documentBleedInsideOrLeftOffset + doc().documentPreferences.documentBleedOutsideOrRightOffset;
      if(facingPages) {
        widthOffset = doc().documentPreferences.documentBleedInsideOrLeftOffset;
      }
      heightOffset = doc().documentPreferences.documentBleedBottomOffset + doc().documentPreferences.documentBleedTopOffset;
      resetMatrix();
      translate(-doc().documentPreferences.documentBleedInsideOrLeftOffset, -doc().documentPreferences.documentBleedTopOffset);

      if(facingPages && currentPage().side === PageSideOptions.RIGHT_HAND) {
        resetMatrix();
        translate(0, -doc().documentPreferences.documentBleedTopOffset);
      }
      singlePageMode = true;
      break;

    case FACING_PAGES:
      widthOffset = 0;
      heightOffset = 0;
      resetMatrix();

      var w = pageBounds[3] - pageBounds[1] + widthOffset;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;

      width = w * 2;

      if(currentPage().name === "1") {
        width = w;
      } else if (currentPage().side === PageSideOptions.RIGHT_HAND) {
        translate(-w, 0);
      }


      height = h;
      break;

    case FACING_BLEEDS:
      widthOffset = doc().documentPreferences.documentBleedInsideOrLeftOffset + doc().documentPreferences.documentBleedOutsideOrRightOffset;
      heightOffset = doc().documentPreferences.documentBleedBottomOffset + doc().documentPreferences.documentBleedTopOffset;
      resetMatrix();
      translate(-doc().documentPreferences.documentBleedInsideOrLeftOffset, -doc().documentPreferences.documentBleedTopOffset);

      var w = pageBounds[3] - pageBounds[1] + widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;

      width = w * 2;
      height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND) {
        translate(-w + widthOffset / 2, 0);
      }

      break;

    case FACING_MARGINS:
      widthOffset = currentPage().marginPreferences.left + currentPage().marginPreferences.right;
      heightOffset = currentPage().marginPreferences.top + currentPage().marginPreferences.bottom;
      resetMatrix();
      translate(currentPage().marginPreferences.left, currentPage().marginPreferences.top);

      var w = pageBounds[3] - pageBounds[1] - widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] - heightOffset;

      width = w * 2;
      height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND) {
        translate(-w - widthOffset / 2, 0);
      }

      return; // early exit

    default:
      error("b.canvasMode(), basil.js canvasMode seems to be messed up, please use one of the following modes: b.PAGE, b.MARGIN, b.BLEED, b.FACING_PAGES, b.FACING_MARGINS, b.FACING_BLEEDS");
      break;
  }

  if(singlePageMode) {
    var w = pageBounds[3] - pageBounds[1] + widthOffset;
    var h = pageBounds[2] - pageBounds[0] + heightOffset;

    width = w;
    height = h;
  }
};

function createSelectionDialog(settings) {
  var result;
  if(!settings) {
    settings = {};
  }

  // set settings object to given values or defaults
  settings.prompt = settings.hasOwnProperty("prompt") ? settings.prompt : "";
  settings.filter = settings.hasOwnProperty("filter") ? settings.filter : [""];
  settings.folder = settings.hasOwnProperty("folder") ? settings.folder : currDialogFolder;
  settings.multiFile = settings.hasOwnProperty("multiFile") ? true : false;
  settings.folderSelect = settings.hasOwnProperty("folderSelect") ? true : false;

  if(!isString(settings.prompt)) {
    settings.prompt = "";
  }
  if(!isString(settings.filter) && !isArray(settings.filter)) {
    settings.filter = [""];
  }
  if(isString(settings.filter)) {
    settings.filter = [settings.filter];
  }
  if(isString(settings.folder)) {
    settings.folder = folder(settings.folder);
  }
  if(!(settings.folder instanceof Folder) || !settings.folder.exists) {
    settings.folder = currDialogFolder;
  }

  if(settings.folderSelect) {
    result = Folder(settings.folder).selectDlg(settings.prompt);
  } else {
    function filterFiles(file){
      if (file instanceof Folder) { return true }
      for (var i = settings.filter.length - 1; i >= 0; i--) {
        if (isString(settings.filter[i]) && endsWith(file.name.toLowerCase(), settings.filter[i].toLowerCase())) { return true }
      }
      return false;
    }

    result = File(settings.folder).openDlg(settings.prompt, filterFiles, settings.multiFile);
  }

  if(result instanceof File) {
    currDialogFolder = result.parent;
  } else if (isArray(result)) {
    currDialogFolder = result[0].parent;
  } else if (result instanceof Folder) {
    currDialogFolder = result;
  }

  if(result === null && settings.multiFile) {
    result = [];
  }

  return result;
}

// internal helper to get a style by name, wether it is nested in a stlye group or not
function findInStylesByName(allStylesCollection, name) {
  for (var i = 0; i < allStylesCollection.length; i++) {
    if (allStylesCollection[i].name === name) {
      return allStylesCollection[i];
    }
  }
  return null;
};

// get the name of parent functions; helpful for more meaningful error messages
// level describes how many levels above to find the function whose function name is returned
function getParentFunctionName(level) {
    var stackArray = $.stack.
          replace(/\((.+?)\)/g, "").
          split(/[\n]/);
    return stackArray[stackArray.length - 2 - level];
}

function checkNull(obj) {

  if(obj === null || typeof obj === undefined) error("Received null object.");
};

function executionDuration() {
  var duration = pub.millis();
  return duration < 1000 ? duration + "ms" : (duration / 1000).toPrecision(3) + "s";
}

function error(msg) {
  println(ERROR_PREFIX + msg);
  throw new Error(ERROR_PREFIX + msg);
};

function warning (msg) {
  println(WARNING_PREFIX + msg);
};

function clearConsole() {
  var bt = new BridgeTalk();
  bt.target = "estoolkit";
  bt.body = "app.clc()"; // works just with cs6
  bt.onError = function(errObj) {};
  bt.onResult = function(resObj) {};
  bt.send();
};
