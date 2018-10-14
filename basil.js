
/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  Bringing the spirit of the Processing visualization language to Adobe InDesign.

  License        - MIT

  Core
                 - Ted Davis http://teddavis.org
                 - Benedikt Groß http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
  Members
                 - Philipp Adrian http://www.philippadrian.com/
                 - be:screen GmbH http://bescreen.de
                 - Stefan Landsbek http://47nord.de
                 - Ken Frederick http://kennethfrederick.de/
                 - Timo Rychert http://timorychert.de/
                 - Fabian Morón Zirfas http://fabianmoronzirfas.me/

  Web Site       - http://basiljs.ch
  Github Repo.   - https://github.com/basiljs/basil.js
  Processing     - http://processing.org
  Processing.js  - http://processingjs.org

  basil.js was conceived and is generously supported by
  The Visual Communication Institute / The Basel School of Design
  Department of the Academy of Art and Design Basel (HGK FHNW)

  http://thebaselschoolofdesign.ch

  Please note: Big general parts e.g. random() of the basil.js source code are copied
  from processing.js by the Processing.js team. We would have had a hard time
  to figure all of that out on our own!

  The Lorem ipsum string of LOREM is taken from https://indieweb.org/Lorem_ipsum and
  is available under a CC0 public domain dedication.

  Supported Adobe InDesign versions: CS 5+

  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/
/* globals init */
// @target "InDesign";


// clearing global space if it is still populated from previous run of a loop script
// to ensure basil methods work properly
if($.engineName === "loop" && $.global.basilGlobal) {
  for (var i = basilGlobal.length - 1; i >= 0; i--) {
    if($.global.hasOwnProperty(basilGlobal[i])) {
      try{
        delete $.global[basilGlobal[i]];
      } catch(e) {
        // could not delete
      }
    }
  }
  delete $.global.basilGlobal;
}

if(!$.global.hasOwnProperty("basilTest")) {
  // load global vars of the user script
  var sourceScript;
  try {
    app.nonExistingProperty;
  } catch(e) {
    sourceScript = e.source;
  }

  var userScript = sourceScript.replace(/[\s\S]*[#@]\s*[i]nclude\s+.+basil\.js["']*[\s;)}]*/, "");
  app.doScript(userScript);
}


(function() {

var pub = {};

// ----------------------------------------
// src/includes/constants.js
// ----------------------------------------

/**
 * Used with units() to set the coordinate system to points.
 */
pub.PT = "pt";

/**
 * Used with units() to set the coordinate system to pixels.
 */
pub.PX = "px";

/**
 * Used with units() to set the coordinate system to centimeters.
 */

pub.CM = "cm";

/**
 * Used with units() to set the coordinate system to millimeters.
 */
pub.MM = "mm";

/**
 * Used with units() to set the coordinate system to inches.
 */
pub.IN = "inch";

/**
 * Used with colorMode() to set the color space.
 */
pub.RGB = "rgb";

/**
 * Used with colorMode() to set the color space.
 */
pub.CMYK = "cmyk";

/**
 * Used with gradientMode() to set the gradient mode.
 */
pub.LINEAR = "linear";

/**
 * Used with gradientMode() to set the gradient mode.
 */
pub.RADIAL = "radial";

/**
 * Corner, used for drawing modes.
 */
pub.CORNER = "corner";

/**
 * Corners, used for drawing modes.
 */
pub.CORNERS = "corners";

/**
 * Center, used for drawing modes or used with referencePoint() to set the reference point of transformations to the center of the page item.
 */
pub.CENTER = "center";
pub.CENTER_CENTER = "center";

/**
 * Radius, used for drawing modes.
 */
pub.RADIUS = "radius";

/**
 * Used with referencePoint() to set the reference point of transformations to the top left of the page item.
 */
pub.TOP_LEFT = "topLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the top center of the page item.
 */
pub.TOP_CENTER = "topCenter";

/**
 * Used with referencePoint() to set the reference point of transformations to the top right of the page item.
 */
pub.TOP_RIGHT = "topRight";

/**
 * Used with referencePoint() to set the reference point of transformations to the center left of the page item.
 */
pub.CENTER_LEFT = "centerLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the center right of the page item.
 */
pub.CENTER_RIGHT = "centerRight";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom left of the page item.
 */
pub.BOTTOM_LEFT = "bottomLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom center of the page item.
 */
pub.BOTTOM_CENTER = "bottomCenter";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom right of the page item.
 */
pub.BOTTOM_RIGHT = "bottomRight";

/**
 * Close, used for endShape() modes.
 */
pub.CLOSE = "close";

/**
 * Open, used for arc() modes.
 */
pub.OPEN = "open";

/**
 * Chord, used for arc() modes.
 */
pub.CHORD = "chord";

/**
 * Pie, used for arc() modes.
 */
pub.PIE = "pie";

/**
 * Used with canvasMode() to set the canvas to the full current page.
 */
pub.PAGE = "page";

/**
 * Used with canvasMode() to set the canvas to the full current page minus the margins.
 */
pub.MARGIN = "margin";

/**
 * Used with canvasMode() to set the canvas to the full current page plus the bleed.
 */
pub.BLEED = "bleed";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages.
 */
pub.FACING_PAGES = "facing_pages";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages plus bleeds.
 */
pub.FACING_BLEEDS = "facing_bleeds";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages minus margins.
 */
pub.FACING_MARGINS = "facing_margins";

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AT_END = LocationOptions.AT_END;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.BEFORE = LocationOptions.BEFORE;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AFTER = LocationOptions.AFTER;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.NONE = "noneMasterSpread";

/**
 * Used with arrange() to bring a page item to the front or to bring it in front of a given reference object.
 */
pub.FRONT = "front";

/**
 * Used with arrange() to send a page item to the back or to send it behind a given reference object.
 */
pub.BACK = "back";

/**
 * Used with arrange() to bring a page item one level forward in its layer.
 */
pub.FORWARD = "forward";

/**
 * Used with arrange() to send a page item one level backward in its layer.
 */
pub.BACKWARD = "backward";

/**
 * Used with size() to set the orientation of a given page size to portrait.
 */
pub.PORTRAIT = PageOrientation.PORTRAIT;

/**
 * Used with size() to set the orientation of a given page size to landscape.
 */
pub.LANDSCAPE = PageOrientation.LANDSCAPE;

/**
* Used with `mode()` to set performance mode. Disables screen redraw during processing.
*/
pub.SILENT = "silent";

/**
 * Used with `mode()` to set performance mode. Processes the document in background mode. The document will not be visible until the script is done or until the mode is changed back to `VISIBLE`. The document will be removed from the display list and added again after the script is done. In this mode you will likely look at InDesign with no open document for quite some time – do not work in InDesign during this time. You may want to use `println("yourMessage")` in your script and look at the console to get information about the process. Note: In order to enter this mode either a saved document needs to be open or no document at all. If you have an unsaved document open, basil will automatically save it for you. If it has not been saved before, you will be prompted to save it to your hard drive.
 */
pub.HIDDEN = "hidden";

/**
 * Default mode. Used with `mode()` to set performance mode. Processes the document with screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time.
 */
pub.VISIBLE = "visible";


var ERROR_PREFIX = "\nBasil.js Error -> ",
  WARNING_PREFIX = "### Basil Warning -> ";

// ----------------------------------------
// src/includes/private-vars.js
// ----------------------------------------

var addToStoryCache = null, /* tmp cache, see addToStroy(), via InDesign external library file*/
  appSettings = null,
  currAlign = null,
  currCanvasMode = null,
  currColorMode = null,
  currDialogFolder = null,
  currDoc = null,
  currDocSettings = null,
  currEllipseMode = null,
  currFillColor = null,
  currFillTint = null,
  currFont = null,
  currFontSize = null,
  currGradientMode = null,
  currImageMode = null,
  currKerning = null,
  currLayer = null,
  currLeading = null,
  currMatrix = null,
  currMode = null,
  currOriginX = null,
  currOriginY = null,
  currPage = null,
  currPathPointer = null,
  currPolygon = null,
  currRefPoint = null,
  currRectMode = null,
  currShapeMode = null,
  currStrokeColor = null,
  currStrokeTint = null,
  currStrokeWeight = null,
  currTracking = null,
  currUnits = null,
  currVertexPoints = null,
  currYAlign = null,
  currFrameRate = null,
  currIdleTask = null,
  matrixStack = null,
  noneSwatchColor = null,
  progressPanel = null,
  startTime = null;


// ----------------------------------------
// src/includes/core.js
// ----------------------------------------

// all initialisations should go here
var init = function() {

  welcome();
  populateGlobal();

  // -- init internal state vars --
  startTime = Date.now();
  currStrokeWeight = 1;
  currStrokeTint = 100;
  currFillTint = 100;
  currOriginX = 0;
  currOriginY = 0;
  currCanvasMode = pub.PAGE;
  currColorMode = pub.RGB;
  currGradientMode = pub.LINEAR;
  currDocSettings = {};
  currDialogFolder = Folder("~");
  currMode = pub.VISIBLE;

  appSettings = {
    enableRedraw: app.scriptPreferences.enableRedraw,
    preflightOff: app.preflightOptions.preflightOff,
    adjustStrokeWeight: app.transformPreferences.adjustStrokeWeightWhenScaling,
    whenScaling: app.transformPreferences.whenScaling
  };

  app.doScript(runScript, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, pub.SCRIPTNAME);

  if($.global.hasOwnProperty("basilTest")) {
    return;
  }

  exit(); // quit program execution
};


// ----------------------------------------
// execution

var runScript = function() {

  var execTime;

  try {

    if($.global.loop instanceof Function) {
      if ($.engineName !== "loop") {
        error("function loop(), no target engine! To use basil's loop function, add the code line\n\n #targetengine \"loop\";\n\n at the very top of your script.");
      } else {
        prepareLoop();
      }
    }

    // app settings
    app.scriptPreferences.enableRedraw = true;
    app.preflightOptions.preflightOff = true;
    app.transformPreferences.adjustStrokeWeightWhenScaling = true;
    app.transformPreferences.whenScaling = WhenScalingOptions.APPLY_TO_CONTENT;

    currentDoc();

    appSettings.refPoint = app.activeWindow.transformReferencePoint;
    currRefPoint = pub.referencePoint(app.activeWindow.transformReferencePoint);

    if ($.global.setup instanceof Function) {
      setup();
    }

    if ($.global.draw instanceof Function) {
      draw();
    } else if ($.global.loop instanceof Function) {
      var sleep = null;
      if (arguments.length === 0) sleep = Math.round(1000 / currFrameRate);
      else sleep = Math.round(1000 / framerate);

      currIdleTask = app.idleTasks.add({name: "basil_idle_task", sleep: sleep});
      currIdleTask.addEventListener(IdleEvent.ON_IDLE, function() {
        loop();
      }, false);
      println("Run the script lib/stop.jsx to end the loop, clean up and quit the script!");
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

    if((!execTime) && !($.global.loop instanceof Function)) {
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

    if (!($.global.loop instanceof Function) || $.global.draw instanceof Function) {
      resetUserSettings();
    }
  }

}

var prepareLoop = function() {
  // before running the loop we need to check if the stop script exists
  // the script looks for the lib folder next to itself
  var currentBasilFolderPath = File($.fileName).parent.fsName;
  var scriptPath = currentBasilFolderPath + "/lib/stop.jsx";

  var stopScriptFile = pub.file(scriptPath);
  if(stopScriptFile.exists !== true) {
    // the script is not there, let's create it
    var scriptContent = [
      "#targetengine \"loop\"",
      "noLoop(true);",
      "if (typeof cleanUp === \"function\") {",
      "  cleanUp();",
      "  cleanUp = null;",
      "}"
    ];
    pub.saveStrings(stopScriptFile, scriptContent);
  }
  currFrameRate = 25;
}

// ----------------------------------------
// all private from here

var welcome = function() {
  clearConsole();
  println("Running "
      + pub.SCRIPTNAME
      + " using basil.js "
      + pub.VERSION
      + " ...");
};

var populateGlobal = function() {
  // inject all functions of pub into global space
  // to make them available to the user

  $.global.basilGlobal = [];
  for(var key in pub) {
    if(pub.hasOwnProperty(key)) {
      if($.global.hasOwnProperty(key)) {
        // the user created a function or variable
        // with the same name as a basil has
        var pubFuncVar = pub[key] instanceof Function ? "function \"" : "variable \"";
        var globFuncVar = $.global[key] instanceof Function ? "function" : "variable";
        error("basil had problems creating the global " + pubFuncVar + key + "\", possibly because your code is already using that name as a " + globFuncVar + ". You may want to rename your " + globFuncVar + " to something else.");
      } else {
        $.global[key] = pub[key];
        $.global.basilGlobal.push(key);
      }
    }
  }
}

var currentDoc = function(mode) {
  if (!currDoc) {
    var doc = null;
    if (app.documents.length && app.windows.length) {
      doc = app.activeDocument;
      if (mode === pub.HIDDEN) {
        if (!doc.saved) {
          try {
            doc.save();
          } catch(e) {
            throw {userCancel: true};
          }
          warning("Document was not saved and has now been saved to your hard drive in order to enter HIDDEN.");
        } else if (doc.modified) {
          doc.save(File(doc.fullName));
          warning("Document was modified and has now been saved to your hard drive in order to enter HIDDEN.");
        }
        var docPath = doc.fullName;
        doc.close(); // Close the doc and reopen it without adding to the display list
        doc = app.open(File(docPath), false);
      }
    } else {
      doc = app.documents.add(mode !== pub.HIDDEN);
    }
    if(!doc.saved && !doc.modified) {
      setCurrDoc(doc, true);
    } else {
      setCurrDoc(doc);
    }
  }
  return currDoc;
};

var closeHiddenDocs = function () {
    // in Case we break the Script during execution in HIDDEN we might have documents open that are not on the display list. Close them.
  for (var i = app.documents.length - 1; i >= 0; i -= 1) {
    var d = app.documents[i];
    if (!d.windows.length) {
      d.close(SaveOptions.NO);
    }
  }
};

var setCurrDoc = function(doc, skipStyles) {
  resetCurrDoc();
  currDoc = doc;
  // -- setup document --
  // save initial doc settings for later resetting
  currDocSettings.rulerOrigin = currDoc.viewPreferences.rulerOrigin;
  currDocSettings.hUnits = currDoc.viewPreferences.horizontalMeasurementUnits;
  currDocSettings.vUnits = currDoc.viewPreferences.verticalMeasurementUnits;

  currDocSettings.pStyle = currDoc.textDefaults.appliedParagraphStyle;
  currDocSettings.cStyle = currDoc.textDefaults.appliedCharacterStyle;
  currDocSettings.otxtStyle = currDoc.pageItemDefaults.appliedTextObjectStyle;
  currDocSettings.ograStyle = currDoc.pageItemDefaults.appliedGraphicObjectStyle;
  currDocSettings.ogriStyle = currDoc.pageItemDefaults.appliedGridObjectStyle;

  // set document to default values
  pub.units(currDoc.viewPreferences.horizontalMeasurementUnits);

  if(!skipStyles) {
    // in a fresh, unsaved document, those styles should not be set
    // in order not to modify the doc and be able to enter mode(HIDDEN) without saving
    currDoc.textDefaults.appliedParagraphStyle = currDoc.paragraphStyles.firstItem();
    currDoc.textDefaults.appliedCharacterStyle = currDoc.characterStyles.firstItem();
    currDoc.pageItemDefaults.appliedTextObjectStyle = currDoc.objectStyles.firstItem();
    currDoc.pageItemDefaults.appliedGraphicObjectStyle = currDoc.objectStyles.firstItem();
    currDoc.pageItemDefaults.appliedGridObjectStyle = currDoc.objectStyles.firstItem();
  }

  currAlign = currDoc.textDefaults.justification;
  currFont = currDoc.textDefaults.appliedFont;
  currFontSize = currDoc.textDefaults.pointSize;
  currKerning = 0;
  currLeading = currDoc.textDefaults.leading;
  currTracking = currDoc.textDefaults.tracking;

  updatePublicPageSizeVars();
};

var Progress = function () {
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
    this.panel.statusbar.text = "Using basil.js " + pub.VERSION + " ... \nEntering background render mode ...";
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

var resetCurrDoc = function() {
  // resets doc and doc specific vars
  currDoc = null;
  currPage = null;
  currLayer = null;
  currFillColor = "Black";
  noneSwatchColor = "None";
  currStrokeColor = "Black";
  currRectMode = pub.CORNER;
  currEllipseMode = pub.CENTER;
  currYAlign = VerticalJustification.TOP_ALIGN;
  currFont = null;
  currImageMode = pub.CORNER;

  pub.resetMatrix();
};

var currentLayer = function() {
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

var currentPage = function() {
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

var updatePublicPageSizeVars = function () {
  var w, h;
  var cm = currCanvasMode;
  var p = currentPage();
  var spread = p.parent;
  var docPrefs = currentDoc().documentPreferences;
  currOriginX = 0;
  currOriginY = 0;

  if(cm === pub.PAGE || cm === pub.MARGIN || cm === pub.BLEED) {
    currDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    pub.resetMatrix();

    var leftHand = (p.side === PageSideOptions.LEFT_HAND);
    w = p.bounds[3] - p.bounds[1];
    h = p.bounds[2] - p.bounds[0];

    if (cm === pub.MARGIN) {
      w -= (p.marginPreferences.left + p.marginPreferences.right);
      h -= (p.marginPreferences.top + p.marginPreferences.bottom);
      currOriginX = leftHand ? p.marginPreferences.right : p.marginPreferences.left;
      currOriginY = p.marginPreferences.top;
    } else if (cm === pub.BLEED) {
      // pub.BLEED
      var leftBleed = 0;
      var rightBleed = 0;
      if(p === spread.pages.firstItem()) {
        leftBleed = leftHand ? docPrefs.documentBleedOutsideOrRightOffset : docPrefs.documentBleedInsideOrLeftOffset;
      }
      if(p === spread.pages.lastItem()) {
        rightBleed = leftHand ? docPrefs.documentBleedInsideOrLeftOffset : docPrefs.documentBleedOutsideOrRightOffset;
      }
      w += leftBleed + rightBleed;
      h += docPrefs.documentBleedTopOffset + docPrefs.documentBleedBottomOffset;
      currOriginX = -leftBleed;
      currOriginY = -docPrefs.documentBleedTopOffset;
    }

  } else {
    // FACING_MODES
    currDoc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN;
    pub.resetMatrix();
    var firstPage = spread.pages.firstItem();
    var lastPage = spread.pages.lastItem();
    var firstPageLeftHand = (firstPage.side === PageSideOptions.LEFT_HAND);
    var lastPageLeftHand = (lastPage.side === PageSideOptions.LEFT_HAND);
    w = lastPage.bounds[3] - firstPage.bounds[1];
    h = p.bounds[2] - p.bounds[0];

    if(cm === pub.FACING_MARGINS) {
      var leftMargin = firstPageLeftHand ? firstPage.marginPreferences.right : firstPage.marginPreferences.left;
      var rightMargin = lastPageLeftHand ? lastPage.marginPreferences.left : lastPage.marginPreferences.right;
      w -= (leftMargin + rightMargin);
      h -= (p.marginPreferences.top + p.marginPreferences.bottom);
      currOriginX = leftMargin;
      currOriginY = p.marginPreferences.top;
    } else if (cm === pub.FACING_BLEEDS) {
      var leftBleed = firstPageLeftHand ? docPrefs.documentBleedOutsideOrRightOffset : docPrefs.documentBleedInsideOrLeftOffset;
      var rightBleed = lastPageLeftHand ? docPrefs.documentBleedInsideOrLeftOffset : docPrefs.documentBleedOutsideOrRightOffset;
      w += leftBleed + rightBleed;
      h += docPrefs.documentBleedTopOffset + docPrefs.documentBleedBottomOffset;
      currOriginX = -leftBleed;
      currOriginY = -docPrefs.documentBleedTopOffset;
    }

  }

  pub.translate(currOriginX, currOriginY);
  pub.width = $.global.width = w;
  pub.height = $.global.height = h;

};

var resetUserSettings = function() {
  // app settings
  app.scriptPreferences.enableRedraw = appSettings.enableRedraw;
  app.preflightOptions.preflightOff  = appSettings.preflightOff;
  app.transformPreferences.adjustStrokeWeightWhenScaling = appSettings.adjustStrokeWeight;
  app.transformPreferences.whenScaling = appSettings.whenScaling;

  if(app.properties.activeWindow instanceof LayoutWindow ) {
    app.activeWindow.transformReferencePoint = appSettings.refPoint;
  }

  // doc settings
  if(currDoc && currDocSettings) {
    resetDocSettings();
  }
}

var resetDocSettings = function() {
  try {
    currDoc.viewPreferences.rulerOrigin = currDocSettings.rulerOrigin;
    currDoc.viewPreferences.horizontalMeasurementUnits = currDocSettings.hUnits;
    currDoc.viewPreferences.verticalMeasurementUnits = currDocSettings.vUnits;

    currDoc.textDefaults.appliedParagraphStyle = currDocSettings.pStyle;
    currDoc.textDefaults.appliedCharacterStyle = currDocSettings.cStyle;
    currDoc.pageItemDefaults.appliedTextObjectStyle = currDocSettings.otxtStyle;
    currDoc.pageItemDefaults.appliedGraphicObjectStyle = currDocSettings.ograStyle;
    currDoc.pageItemDefaults.appliedGridObjectStyle = currDocSettings.ogriStyle;
  } catch (e) {
    // document was closed via non-basil methods
    currDoc = null;
  }
}

var createSelectionDialog = function(settings) {
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
    settings.folder = pub.folder(settings.folder);
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

var isValid = function (item) {

  checkNull(item);

  if (item.hasOwnProperty("isValid")) {
    if (!item.isValid) {
      return false;
    } else {
      return true;
    }
  }
  return true; // if does not have isValid field -> normal array element and not collection

  return false;
};

// internal helper to get a style by name, wether it is nested in a stlye group or not
var findInStylesByName = function(allStylesCollection, name) {
  for (var i = 0; i < allStylesCollection.length; i++) {
    if (allStylesCollection[i].name === name) {
      return allStylesCollection[i];
    }
  }
  return null;
};

// get the name of parent functions; helpful for more meaningful error messages
// level describes how many levels above to find the function whose function name is returned
var getParentFunctionName = function(level) {
    var stackArray = $.stack.
          replace(/\((.+?)\)/g, "").
          split(/[\n]/);
    return stackArray[stackArray.length - 2 - level];
}

var checkNull = function (obj) {
  if(obj === null || typeof obj === undefined) error("Received null object.");
};

var isEnum = function(base, value) {
  var props = base.reflect.properties;
  for (var i = 0; i < props.length; i++) {
    if (base[props[i].name] == value) return true;
  }
  return false;
}

var executionDuration = function() {
  var duration = pub.millis();
  return duration < 1000 ? duration + "ms" : (duration / 1000).toPrecision(3) + "s";
}

var error = function(msg) {
  println(ERROR_PREFIX + msg);
  throw new Error(ERROR_PREFIX + msg);
};

var warning = function(msg) {
  println(WARNING_PREFIX + msg);
};

var clearConsole = function() {
  var bt = new BridgeTalk();
  bt.target = "estoolkit";
  bt.body = "app.clc()"; // works just with cs6
  bt.onError = function(errObj) {};
  bt.onResult = function(resObj) {};
  bt.send();
};


// ----------------------------------------
// src/includes/color.js
// ----------------------------------------

// ----------------------------------------
// Color
// ----------------------------------------

/**
 * @description Sets the Effects blendMode property of an object.
 *
 * @cat     Color
 * @method  blendMode
 *
 * @param   {Object} obj The object to set blendMode of.
 * @param   {Number} blendMode The blendMode must be one of the InDesign BlendMode enum values:
 *   - `BlendMode.NORMAL`
 *   - `BlendMode.MULTIPLY`
 *   - `BlendMode.SCREEN`
 *   - `BlendMode.OVERLAY`
 *   - `BlendMode.SOFT_LIGHT`
 *   - `BlendMode.HARD_LIGHT`
 *   - `BlendMode.COLOR_DODGE`
 *   - `BlendMode.COLOR_BURN`
 *   - `BlendMode.DARKEN`
 *   - `BlendMode.LIGHTEN`
 *   - `BlendMode.DIFFERENCE`
 *   - `BlendMode.EXCLUSION`
 *   - `BlendMode.HUE`
 *   - `BlendMode.SATURATION`
 *   - `BlendMode.COLOR`
 *   - `BlendMode.LUMINOSITY`
 */
pub.blendMode = function(obj, blendMode) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.blendMode = blendMode;
  } else {
    warning("blendMode(), the object " + obj.toString() + " doesn't have a blendMode property");
  }
};

/**
 * @description Creates a new RGB / CMYK color and adds it to the document, or gets a color by name from the document. The default color mode is RGB.
 *
 * @cat     Color
 * @method  color
 *
 * @param   {String|Numbers} Get color: the color name. Create new color: GRAY,[name] / R,G,B,[name] / C,M,Y,K,[name]. Name is always optional.
 * @return  {Color} Found or new color
 */
pub.color = function() {
  var newCol;
  var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2],
    d = arguments[3],
    e = arguments[4];
  var colorErrorMsg = "color(), wrong parameters. Use:\n"
      + "GRAY,[name] or \n"
      + "R,G,B,[name] in colorMode(RGB) or\n"
      + "C,M,Y,K,[name] in colorMode(CMYK).\n"
      + "Name is optional.\n"
      + "NB: In InDesign colors don't have an alpha value, use opacity() to set alpha.";

  if (arguments.length === 1) {
    // get color by name
    if (typeof a === "string") {
      newCol = currentDoc().colors.itemByName(a); // check color
      if (newCol.isValid) {
        return newCol;
      } else {
        error("color(), a color with the provided name doesn't exist.");
      }
    } else if (typeof a === "number") {
      // GRAY
      if (currColorMode === pub.RGB) {
        a = pub.constrain(a, 0, 255);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a, a, a];
        props.name = "R=" + a + " G=" + a + " B=" + a;
      } else {
        a = pub.constrain(a, 0, 100);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0, 0, 0, a];
        props.name = "C=" + 0 + " M=" + 0 + " Y=" + 0 + " K=" + a;
      }
    } else {
      error("color(), wrong type of first parameter.");
    }

  } else if (arguments.length === 2) {
    // GRAY + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, a, a];
      props.name = b;
    } else {
      a = pub.constrain(a, 0, 100);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [0, 0, 0, a];
      props.name = b;
    }

  } else if (arguments.length === 3) {
    // R G B
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      b = pub.constrain(b, 0, 255);
      c = pub.constrain(c, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, b, c];
      props.name = "R=" + a + " G=" + b + " B=" + c;
    } else {
      error(colorErrorMsg);
    }


  } else if (arguments.length === 4 && typeof d === "string") {
    // R G B + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      b = pub.constrain(b, 0, 255);
      c = pub.constrain(c, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, b, c];
      props.name = d;
    } else {
      error(colorErrorMsg);
    }

  } else if (arguments.length === 4 && typeof d === "number") {
    // C M Y K
    if (currColorMode === pub.CMYK) {
      a = pub.constrain(a, 0, 100);
      b = pub.constrain(b, 0, 100);
      c = pub.constrain(c, 0, 100);
      d = pub.constrain(d, 0, 100);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [a, b, c, d];
      props.name = "C=" + a + " M=" + b + " Y=" + c + " K=" + d;
    } else {
      error(colorErrorMsg);
    }

  } else if (arguments.length === 5 && typeof e === "string" && currColorMode === pub.CMYK) {
    // C M Y K + name
    a = pub.constrain(a, 0, 100);
    b = pub.constrain(b, 0, 100);
    c = pub.constrain(c, 0, 100);
    d = pub.constrain(d, 0, 100);
    props.model = ColorModel.PROCESS;
    props.space = ColorSpace.CMYK;
    props.colorValue = [a, b, c, d];
    props.name = e;

  } else {
    error(colorErrorMsg);
  }

  // check whether color was already created and added to colors,
  // keeps the document clean ...
  newCol = currentDoc().colors.itemByName(props.name);
  if (!newCol.isValid) {
    newCol = currentDoc().colors.add();
  }
  newCol.properties = props;
  return newCol;
};

/**
 * @description Sets the colormode for creating new colors with color() to RGB or CMYK. The default color mode is RGB.
 *
 * @cat     Color
 * @method  colorMode
 *
 * @param   {Number} colorMode RGB or CMYK.
 */
pub.colorMode = function(colorMode) {
  checkNull(colorMode);
  if (arguments.length === 0) {
    return currColorMode;
  }
  if (colorMode === pub.RGB || colorMode === pub.CMYK) {
    currColorMode = colorMode;
  } else {
    error("colorMode(), unsupported colormode, use: RGB or CMYK");
  }
};

/**
 * @description Sets the color or gradient used to fill shapes.
 *
 * @cat     Color
 * @method  fill
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} fillColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 * @param   {String} [name] If created with numbers, a custom swatch name can be given.
 */
pub.fill = function (fillColor) {

  checkNull(fillColor);
  if (fillColor instanceof Color || fillColor instanceof Swatch || fillColor instanceof Gradient) {
    currFillColor = fillColor;
  } else {
    if (arguments.length === 1) {
      if (typeof arguments[0] === "string") {
        currFillColor = pub.swatch(arguments[0]);
      }else{
        currFillColor = pub.color(arguments[0]);
      }
    } else if (arguments.length === 2) {
      currFillColor = pub.color(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
      currFillColor = pub.color(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
      currFillColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length === 5) {
      currFillColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    } else {
      error("fill(), wrong parameters. Use:\n"
        + "Swatch name or\n"
        + "GRAY, [name] or\n"
        + "R, G, B, [name] or\n"
        + "C, M, Y, K, [name].\n"
        + "Name is optional.");
    }
  }
};

/**
 * @description Sets the tint of the color used to fill shapes.
 *
 * @cat     Color
 * @method  fillTint
 *
 * @param   {Number} tint Number from 0 to 100
 */
pub.fillTint = function (tint) {
  checkNull(tint);
  if (typeof tint === "string" || typeof tint === "number") {
    currFillTint = tint;
  } else {
    error("fillTint(), unsupported type. Please make sure the fillTint is a number or string");
  }
};

/**
 * @description Creates a new gradient and adds it to the document, or gets a gradient by name from the document.
 * If two colors are given as the first two parameters, a gradient is created that blends between these two colors. If an array of colors is used as the first parameter, a gradient with the contained colors will be created. The colors will be distributed evenly. If additionally to this array a second array of gradient stop positions is given, the colors will be positioned at the given gradient stops. Possible gradient stop positions range from 0 to 100. All parameter options allow for an additional name parameter at the end to name the new gradient. If a string is used as the only parameter, the gradient with that name will be returned, if it exists in the document.
 *
 * @cat     Color
 * @method  gradient
 *
 * @param   {Color|Array|String} c1 First color of the gradient. Alternatively: Array of colors/gradients or name of gradient to get.
 * @param   {Color|Array|String} c2 Second color of the gradient. Alternatively: Array of gradient stop positions (if first parameter is an array of colors).
 * @param   {String} [name] Optional name of the gradient.
 * @return  {Gradient} Found or new gradient
 */
pub.gradient = function() {
  var newGrad;
  // var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2];
  var gradientErrorMsg = "gradient(), wrong parameters. Use:\n"
      + "c1,c2,[name] or\n"
      + "arrayOfColors,[name] or\n"
      + "arrayOfColors,arrayOfGradientStops,[name] or\n"
      + "gradientName";

  if (typeof a === "string" && arguments.length === 1) {
    // get gradient by name
    newGrad = currentDoc().gradients.itemByName(a);
    if (newGrad.isValid) {
      return newGrad;
    } else {
      error("gradient(), a gradient with the provided name doesn't exist.");
    }
  } else if (a instanceof Color && b instanceof Color && (typeof c === "string" || arguments.length === 2)) {
    // c1 and c2
    if (typeof c === "string") {
      if(currentDoc().colors.itemByName(c).isValid) {
        error("gradient(), \"" + c + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(c).isValid) {
        currentDoc().gradients.itemByName(c).remove();
        warning("gradient(), a gradient named \"" + c + "\" already existed. The old gradient is replaced by a new one.");
      }
      newGrad = currentDoc().gradients.add({name: c});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    newGrad.gradientStops[0].stopColor = a;
    newGrad.gradientStops[1].stopColor = b;
    if(currGradientMode === pub.LINEAR) {
      newGrad.type = GradientType.LINEAR;
    } else {
      newGrad.type = GradientType.RADIAL;
    }
    return newGrad;
  } else if (a instanceof Array) {
    // array of colors
    var customStopLocations = false;
    if(arguments.length > 3) {
      error(gradientErrorMsg);
    }
    if(arguments.length > 1 && !(b instanceof Array || typeof b === "string")) {
      error(gradientErrorMsg);
    }
    if(arguments.length === 3 && !(typeof c === "string")) {
      error(gradientErrorMsg);
    }
    if(arguments.length > 1 && b instanceof Array) {
      customStopLocations = true;
    }
    if(customStopLocations && !(a.length === b.length)) {
      error("gradient(), arrayOfColors and arrayOfGradientStops need to have the same length.");
    }
    var z = arguments[arguments.length - 1];
    if (typeof z === "string") {
      if(currentDoc().colors.itemByName(z).isValid) {
        error("gradient(), \"" + z + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(z).isValid) {
        currentDoc().gradients.itemByName(z).remove();
        warning("gradient(), a gradient named \"" + z + "\" already existed. The old gradient is replaced by a new one.");
      }
      newGrad = currentDoc().gradients.add({name: z});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    for (var i = 0; i < a.length; i++) {
      if(!(a[i] instanceof Color || a[i] instanceof Swatch)) {
        error("gradient(), element #" + (i + 1) + " of the given arrayOfColors is not a color or swatch.");
      }
      if(i > newGrad.gradientStops.length - 1) {
        newGrad.gradientStops.add();
      }
      newGrad.gradientStops[i].stopColor = a[i];
      if(customStopLocations) {
        if(!(typeof b[i] === "number")) {
          error("gradient(), element #" + (i + 1) + " of the given arrayOfGradientStops is not a number.");
        }
        newGrad.gradientStops[i].location = pub.constrain(b[i], 0, 100);
      } else {
        newGrad.gradientStops[i].location = pub.map(i, 0, a.length - 1, 0, 100);
      }
    }
    if(currGradientMode === pub.LINEAR) {
      newGrad.type = GradientType.LINEAR;
    } else {
      newGrad.type = GradientType.RADIAL;
    }
    return newGrad;
  } else {
    error(gradientErrorMsg);
  }
};

/**
 * @description Sets the gradient mode for gradient() to `LINEAR` or `RADIAL`. The default gradient mode is `LINEAR`.
 *
 * @cat     Color
 * @method  gradientMode
 *
 * @param   {String} gradientMode `LINEAR` or `RADIAL`.
 */
pub.gradientMode = function(gradientMode) {
  checkNull(gradientMode);
  if (arguments.length === 0) {
    return currGradientMode;
  }
  if (gradientMode === pub.LINEAR || gradientMode === pub.RADIAL) {
    currGradientMode = gradientMode;
  } else {
    error("gradientMode(), unsupported gradient mode, use: LINEAR or RADIAL");
  }
};

/**
 * @description Calculates a color or colors between two colors at a specific increment.
 * The `amt` parameter is the amount to interpolate between the two values where 0.0 equals the first color, 0.5 is half-way in between and 1.0 equals the second color. N.B.: Both colors must be either CMYK or RGB.
 *
 * @cat     Color
 * @method  lerpColor
 *
 * @param   {Color} c1 Input color 1.
 * @param   {Color} c2 Input color 2.
 * @param   {Number} amt The amount to interpolate between the two colors.
 * @return  {Color} Interpolated color
 */
pub.lerpColor = function (c1, c2, amt) {
  checkNull(c1);
  checkNull(c2);
  if ((c1 instanceof Color || c1 instanceof Swatch) &&
     (c2 instanceof Color || c2 instanceof Swatch) &&
      typeof amt === "number") {
    if (c1.space === ColorSpace.CMYK && c2.space === ColorSpace.CMYK) {
      var C1 = c1.colorValue[0];
      var M1 = c1.colorValue[1];
      var Y1 = c1.colorValue[2];
      var K1 = c1.colorValue[3];

      var C2 = c2.colorValue[0];
      var M2 = c2.colorValue[1];
      var Y2 = c2.colorValue[2];
      var K2 = c2.colorValue[3];

      var COut = Math.round(pub.lerp(C1, C2, amt));
      var MOut = Math.round(pub.lerp(M1, M2, amt));
      var YOut = Math.round(pub.lerp(Y1, Y2, amt));
      var KOut = Math.round(pub.lerp(K1, K2, amt));
      return pub.color(COut, MOut, YOut, KOut);

    } else if (c1.space === ColorSpace.RGB && c2.space === ColorSpace.RGB) {
      var R1 = c1.colorValue[0];
      var G1 = c1.colorValue[1];
      var B1 = c1.colorValue[2];

      var R2 = c2.colorValue[0];
      var G2 = c2.colorValue[1];
      var B2 = c2.colorValue[2];

      var ROut = Math.round(pub.lerp(R1, R2, amt));
      var GOut = Math.round(pub.lerp(G1, G2, amt));
      var BOut = Math.round(pub.lerp(B1, B2, amt));
      return pub.color(ROut, GOut, BOut);

    } else {
      error("lerpColor(), both colors must be either CMYK or RGB.");
    }
  } else {
    error("lerpColor(), wrong parameters. Use: two colors (of the same type) and a number.");
  }
};

/**
 * @description Disables filling geometry. If both `noStroke()` and `noFill()` are called, newly drawn shapes will be invisible.
 *
 * @cat     Color
 * @method  noFill
 */
pub.noFill = function () {
  currFillColor = noneSwatchColor;
};

/**
 * @description Disables drawing the stroke. If both noStroke() and noFill() are called, newly drawn shapes will be invisible.
 *
 * @cat     Color
 * @method  noStroke
 */
pub.noStroke = function () {
  currStrokeColor = noneSwatchColor;
};

/**
 * @description Sets the opacity property of an object.
 *
 * @cat     Color
 * @method  opacity
 *
 * @param   {Object} obj The object to set opacity of.
 * @param   {Number} opacity The opacity value from 0 to 100.
 */
pub.opacity = function(obj, opacity) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.opacity = opacity;
  } else {
    warning("opacity(), the object " + obj.toString() + " doesn't have an opacity property");
  }
};

/**
 * @description Sets the color or gradient used to draw lines and borders around shapes.
 *
 * @cat     Color
 * @method  stroke
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} strokeColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 */
pub.stroke = function (strokeColor) {
  checkNull(strokeColor);
  if (strokeColor instanceof Color || strokeColor instanceof Swatch || strokeColor instanceof Gradient) {
    currStrokeColor = strokeColor;
  } else {
    if (arguments.length === 1) {
      if (typeof arguments[0] === "string") {
        currStrokeColor = pub.swatch(arguments[0]);
      }else{
        currStrokeColor = pub.color(arguments[0]);
      }
    } else if (arguments.length === 2) {
      currStrokeColor = pub.color(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
      currStrokeColor = pub.color(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
      currStrokeColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length === 5) {
      currStrokeColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    } else {
      error("stroke(), wrong parameters. Use:\n"
        + "Swatch name or\n"
        + "GRAY, [name] or\n"
        + "R, G, B, [name] or\n"
        + "C, M, Y, K, [name].\n"
        + "Name is optional.");
    }
  }
};

/**
 * @description Sets the tint of the color used to draw lines and borders around shapes.
 *
 * @cat     Color
 * @method  strokeTint
 *
 * @param   {Number} tint Number from 0 to 100.
 */
pub.strokeTint = function (tint) {
  checkNull(tint);
  if (typeof tint === "string" || typeof tint === "number") {
    currStrokeTint = tint;
  } else {
    error("strokeTint(), unsupported type. Please make sure the strokeTint parameter is a number or string");
  }
};

/**
 * @description Gets a swatch by name.
 *
 * @cat     Color
 * @method  swatch
 *
 * @param   {String} swatchName Returns the swatch color/gradient for a given name by string.
 */
pub.swatch = function(){
  var newSwatch;
  var props = {};
  if (arguments.length === 1) {
    var a = arguments[0];
    if (typeof a === "string") {
      newSwatch = currentDoc().swatches.itemByName(a);
      if(newSwatch.isValid){
          return newSwatch;
        }else{
          error("A swatch with the provided name doesn't exist.");
        }
    }else{
      error("swatch() requires a string, the name of an existing swatch.");
    }
  }
}

// ----------------------------------------
// src/includes/data.js
// ----------------------------------------

// ----------------------------------------
// Data/Collections
// ----------------------------------------

/**
 * @description Used to run a function on all elements of an array. Please note the existence of the convenience methods `stories()`, `paragraphs()`, `lines()`, `words()` and `characters()` that are used to iterate through all instances of the given type in the given document.
 *
 * @cat     Data
 * @subcat  Collections
 * @method  forEach
 *
 * @param   {Array} collection The array to be processed.
 * @param   {Function} cb The function that will be called on each element. The call will be like function(item,i) where i is the current index of the item within the array.
 */
forEach = function(collection, cb) {
  for (var i = 0, len = collection.length; i < len; i++) {

    if(!isValid(collection[i])) {
      warning("forEach(), invalid object processed.");
      continue;
    }

    if(cb(collection[i], i) === false) {
      return false;
    }
  }
  return true;
};

// ----------------------------------------
// Data/Conversion
// ----------------------------------------

/**
 * @description Converts a byte, char, int, or color to a String containing the equivalent binary notation. For example `color(0, 102, 153, 255)` will convert to the String `"11111111000000000110011010011001"`. This function can help make your geeky debugging sessions much happier.
 *
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  binary
 *
 * @param   {Number} num value to convert
 * @param   {Number} [numBits] number of digits to return
 * @return  {String} A formatted string
 */
 // From: http://processingjs.org/reference/binary_/
pub.binary = function(num, numBits) {
  var bit;
  if (numBits > 0) bit = numBits;
  else if (num instanceof Char) {
    bit = 16;
    num |= 0;
  } else {
    bit = 32;
    while (bit > 1 && !(num >>> bit - 1 & 1)) bit--;
  }
  var result = "";
  while (bit > 0) result += num >>> --bit & 1 ? "1" : "0";
  return result;
};

/**
 * @description Convert a number to a hex representation.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  hex
 *
 * @param   {Number} value The number to convert
 * @param   {Number} [len] The length of the hex number to be created, default: `8`
 * @return  {String} The hex representation as a string
 */
pub.hex = function(value, len) {
  if (arguments.length === 1) len = 8;
  return decimalToHex(value, len);
};

/**
 * @description Converts a String representation of a binary number to its equivalent integer value. For example, `unbinary("00001000")` will return `8`.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  unbinary
 *
 * @param   {String} binaryString value to convert
 * @return  {Number} The integer representation
 */
 // From: http://processingjs.org/reference/unbinary_/
pub.unbinary = function(binaryString) {
  var i = binaryString.length - 1,
    mask = 1,
    result = 0;
  while (i >= 0) {
    var ch = binaryString[i--];
    if (ch !== "0" && ch !== "1") throw "the value passed into unbinary was not an 8 bit binary number";
    if (ch === "1") result += mask;
    mask <<= 1;
  }
  return result;
};

/**
 * @description Convert a hex representation to a number.
 *
 * @cat     Data
 * @subcat  Conversion
 * @method  unhex
 *
 * @param   {String} hex The hex representation
 * @return  {Number} The number
 */
pub.unhex = function(hex) {
  if (hex instanceof Array) {
    var arr = [];
    for (var i = 0; i < hex.length; i++) arr.push(unhexScalar(hex[i]));
    return arr;
  }
  return unhexScalar(hex);
};

// ----------------------------------------
// Data/CSV
// ----------------------------------------

// Taken and hijacked from d3.js robust csv parser. Hopefully Michael Bostock won't mind.
// https://github.com/mbostock/d3/tree/master/src/dsv
pub.CSV = new CSV();
function CSV() {
  var reParse = null,
    reFormat = null,
    delimiterStr = null,
    delimiterCode = null;

  initDelimiter(",");
  function initDelimiter(delimiter) {
    reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), // field separator regex
    reFormat = new RegExp("[\"" + delimiter + "\n]"),
    delimiterCode = delimiter.charCodeAt(0);
    delimiterStr = delimiter;
  }

  /**
   * @description Function parses a string as CSV-object Array.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.decode
   *
   * @param   {String} String to be parsed as CSV-object.
   * @return  {Array} Returns CSV-object Array
   *
   * @example
   * var arr = CSV.decode(str);
   * var str = CSV.encode(arr);
   */
  this.decode = function(text) {
    var header;
    return parseRows(text, function(row, i) {
      if (i) {
        var o = {}, j = -1, m = header.length;
        while (++j < m) o[header[j]] = row[j];
        return o;
      } else {
        header = row;
        return null;
      }
    });
  };

  /**
   * @description Sets the delimiter of the CSV decode and encode function.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.delimiter
   *
   * @param   {String} [delimiter] Optional Sets the delimiter for CSV parsing
   * @return  {String} Returns the current delimiter if called without argument
   */
  this.delimiter = function(delimiter) {
    if (arguments.length === 0) return delimiterStr;
    if (typeof delimiter === "string") {
      initDelimiter(delimiter);
    } else {
      error("CSV.delimiter, separator has to be a character or string");
    }
  };

  /**
   * @description Function convert an javascript array of objects to a CSV-string.
   *
   * @cat     Data
   * @subcat  CSV
   * @method  CSV.encode
   *
   * @param   {Array} Array to be converted to a CSV-string
   * @return  {String} Returns CSV-string
   *
   * @example
   * var str = CSV.encode(arr);
   * var arr = CSV.decode(str);
   */
  this.encode = function(rows) {
    var csvStrings = [];
    var header = [];
    var firstRow = rows[0]; // all rows have to have the same properties keys
    // gather infos for the header
    for (var propname in firstRow) {
      if (firstRow.hasOwnProperty(propname)) {
        header.push(propname);
      }
    }
    csvStrings.push(formatRow(header));
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var tokens = [];
      for (var ii = 0; ii < header.length; ii++) {
        tokens.push(row[header[ii]]);
      }
      csvStrings.push(formatRow(tokens));
    }
    return csvStrings.join("\n");
  };

  function formatRow(row) {
    for (var i = 0; i < row.length; i++) {
      row[i] = formatValue(row[i]);
    }
    return row.join(delimiterStr);
  }

  function formatValue(text) {
    return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

    reParse.lastIndex = 0; // work-around bug in FF 3.6

    function token() {
      if (reParse.lastIndex >= text.length) return EOF; // special case: end of file
      if (eol) { eol = false; return EOL; } // special case: end of line

      // special case: quotes
      var j = reParse.lastIndex;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < text.length) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            i++;
          }
        }
        reParse.lastIndex = i + 2;
        var c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) reParse.lastIndex++;
        } else if (c === 10) {
          eol = true;
        }
        return text.substring(j + 1, i).replace(/""/g, "\"");
      }

      // common case
      var m = reParse.exec(text);
      if (m) {
        eol = m[0].charCodeAt(0) !== delimiterCode;
        return text.substring(j, m.index);
      }
      reParse.lastIndex = text.length;
      return text.substring(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && !(a = f(a, n++))) continue;
      rows.push(a);
    }

    return rows;
  }
}

// ----------------------------------------
// Data/HashList
// ----------------------------------------

/**
 * @description HashList is a data container that allows you to store information as key - value pairs. As usual in JavaScript mixed types of keys and values are accepted in one HashList instance.
 *
 * @cat     Data
 * @subcat  HashList
 * @method  HashList
 *
 * @class
 */
// taken from http://pbrajkumar.wordpress.com/2011/01/17/hashmap-in-javascript/
HashList = function () {
  var that = {};
  that.length = 0;
  that.items = {};

  for (var key in that.items) {
    pub.println(key);
  }

  // Please note: this is removing Object fields, but has to be done to have an empty "bucket"
  function checkKey(key) {
    if(that.items[key] instanceof Function) {
      that.items[key] = undefined;
    }
  }

  /**
   * @description Deletes all the key - value pairs in this HashList.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.clear
   */
  that.clear = function() {
    for (var i in that.items) {
      delete that.items[i];
    }
    that.length = 0;
  };

  /**
   * @description This gets a value by its key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.get
   *
   * @param   {String} key The key to look for.
   * @return  {Object} The value.
   */
  that.get = function(key) {
    return that.items[key];
  };

  /**
   * @description Returns an array with all keys.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getKeys
   *
   * @return  {Array} An array with all the keys.
   */
  that.getKeys = function () {
    var keys = [];

    for(var key in that.items)
      {
      if(that.items.hasOwnProperty(key))
          {
        keys.push(key);
      }
    }
    return keys;
  };

  /**
   * @description Returns an array of all keys that are sorted by their values from highest to lowest. Please note that this only works if you have conistently used Numbers for values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getKeysByValues
   *
   * @return  {Array} An array with all the keys.
   */
  that.getKeysByValues = function() {
    var obj = that.items;
    var keys = [];
    for(var key in obj)
        {
      if(typeof obj[key] != "number") error("HashList.getKeysByValues(), only works with Numbers as values. ");
      keys.push(key);
    }
    return keys.sort(function(a, b) {return obj[b] - obj[a];});
  };

  /**
   * @description Returns an array with all keys in a sorted order from higher to lower magnitude.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getSortedKeys
   *
   * @return  {Array} An array with all the keys sorted.
   */
  that.getSortedKeys = function () {
    return that.getKeys().sort(); // ["a", "b", "z"]
  };

  /**
   * @description Returns an array with all values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.getValues
   *
   * @return  {Array} An array with all the values.
   */
  that.getValues = function () {

    var obj = that.items;
    var values = [];

    for(var key in obj) {
      values.push(obj[key]);
    }
    return values;

  };

  /**
   * @description Checks for the existence of a given key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.hasKey
   *
   * @param   {String} key The key to check.
   * @return  {Boolean} Returns true or false.
   */
  that.hasKey = function(key) {
    checkKey(key);
    return typeof that.items[key] != "undefined";
  };

  /**
   * @description Checks if a certain value exists at least once in all of the key - value pairs.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.hasValue
   *
   * @param   {Object|String|Number|Boolean} value The value to check.
   * @return  {Boolean} Returns true or false.
   */
  that.hasValue = function(value) {
    var obj = that.items;
    var found = false;
    for(var key in obj) {
      if (obj[key] === value) {
        found = true;
        break;
      }
    }
    return found;
  };

  /**
   * @description This removes a key - value pair by its key.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.remove
   *
   * @param   {String} key The key to delete.
   * @return  {Object} The value before deletion.
   */
  that.remove = function(key) {
    var tmp_previous;
    if (typeof that.items[key] != "undefined") {
      var tmp_previous = that.items[key];
      delete that.items[key];
      that.length--;
    }
    return tmp_previous;
  };

  /**
   * @description This sets a key - value pair. If a key is already existing, the value will be updated. Please note that Functions are currently not supported as values.
   *
   * @cat     Data
   * @subcat  HashList
   * @method  HashList.set
   *
   * @param   {String} key The key to use.
   * @param   {Object|String|Number|Boolean} value The value to set.
   * @return  {Object} The value after setting.
   */
  that.set = function(key, value) {

    if(value instanceof Function) error("HashList does not support storing Functions as values.");
    checkKey(key);
    if (typeof value != "undefined") {
      if (typeof that.items[key] === "undefined") {
        that.length++;
      }
      that.items[key] = value;
    }
    return that.items[key];
  };

  return that;
};

// ----------------------------------------
// Data/JSON
// ----------------------------------------

pub.JSON = {
  /**
   * @description Function parses and validates a string as JSON-object.
   *
   * @cat     Data
   * @subcat  JSON
   * @method  JSON.decode
   *
   * @param   {String} String to be parsed as JSON-object.
   * @return  {Object} Returns JSON-object or throws an error if invalid JSON has been provided.
   *
   * @example
   * var obj = JSON.decode(str);
   * var str = JSON.encode(obj);
   */
  // From: jQuery JavaScript Library v1.7.1 http://jquery.com/
  decode: function(data) {
    if (typeof data !== "string" || !data) {
      return null;
    }
    var rvalidchars = /^[\],:{}\s]*$/,
      rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if (rvalidchars.test(data.replace(rvalidescape, "@")
      .replace(rvalidtokens, "]")
      .replace(rvalidbraces, ""))) {
      return (new Function("return " + data))();
    }
    error("JSON.decode(), invalid JSON: " + data);
  },

  /**
   * Function convert an javascript object to a JSON-string.
   *
   * @cat     Data
   * @subcat  JSON
   * @method  JSON.encode
   *
   * @param   {Object} Object to be converted to a JSON-string
   * @return  {String} Returns JSON-string
   *
   * @example
   * var str = JSON.encode(obj);
   * var obj = JSON.decode(str);
   */
  // From: https://gist.github.com/754454
  encode: function(obj) {
    var t = typeof (obj);
    if (t !== "object" || obj === null) {
      // simple data type
      if (t === "string") obj = "\"" + obj + "\"";
      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor === Array);

      for (n in obj) {
        v = obj[n];
        t = typeof (v);
        if (obj.hasOwnProperty(n)) {
          if (t === "string") v = "\"" + v + "\""; else if (t === "object" && v !== null) v = pub.JSON.encode(v);
          json.push((arr ? "" : "\"" + n + "\":") + String(v));
        }
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  }
};

// ----------------------------------------
// Data/String Functions
// ----------------------------------------

/**
 * @description Checks whether a string ends with a specific character or string.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  endsWith
 *
 * @param   {String} str A string to be checked
 * @param   {String} suffix The string to look for
 * @return  {Boolean} Returns either true or false
 */
var endsWith = pub.endsWith = function(str, suffix) {
  if(!isString(str) || !isString(suffix)) {
    error("endsWith() requires two strings, the string to be checked and the suffix to look for.");
  }
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * @description Combines an array of Strings into one String, each separated by the character(s) used for the separator parameter. To join arrays of ints or floats, it's necessary to first convert them to strings using `nf()` or `nfs()`.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  join
 *
 * @param   {Array} array A string array
 * @param   {String} separator The separator to be inserted
 * @return  {String} The joined string
 */
 // http://processingjs.org/reference/join_/
pub.join = function(array, separator) {
  return array.join(separator);
};

/**
 * @description Utility function for formatting numbers into strings. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * `nf()` is used to add zeros to the left and/or right of a number. This is typically for aligning a list of numbers. To remove digits from a floating-point number, use the `ceil()`, `floor()`, or `round()` functions.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nf
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nf_/
pub.nf = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits);
};

/**
 * @description Utility function for formatting numbers into strings and placing appropriate commas to mark units of 1000. There are two versions, one for formatting ints and one for formatting an array of ints. The value for the digits parameter should always be a positive integer.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfc
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfc_/
pub.nfc = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits, ",");
};

/**
 * @description Utility function for formatting numbers into strings. Similar to `nf()` but puts a `+` in front of positive numbers and a `-` in front of negative numbers. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfp
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfp_/
pub.nfp = function(value, leftDigits, rightDigits) {
  return nfCore(value, "+", "-", leftDigits, rightDigits);
};

/**
 * @description Utility function for formatting numbers into strings. Similar to `nf()` but leaves a blank space in front of positive numbers so they align with negative numbers in spite of the minus symbol. There are two versions, one for formatting floats and one for formatting ints. The values for the digits, left, and right parameters should always be positive integers.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  nfs
 *
 * @param   {Number} value The Number to convert
 * @param   {Number} leftDigits
 * @param   {Number} rightDigits
 * @return  {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfs_/
pub.nfs = function(value, leftDigits, rightDigits) {
  return nfCore(value, " ", "-", leftDigits, rightDigits);
};

/**
 * @description The `split()` function breaks a string into pieces using a character or string as the divider. The `delim` parameter specifies the character or characters that mark the boundaries between each piece. An array of strings is returned that contains each of the pieces.
 *
 * The `splitTokens()` function works in a similar fashion, except that it splits using a range of characters instead of a specific character or sequence.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  split
 *
 * @param   {String} str the String to be split
 * @param   {String} [delim] The string used to separate the data
 * @return  {Array} Array of strings
 */
 // http://processingjs.org/reference/split_/
pub.split = function(str, delim) {
  return str.split(delim);
};

/**
 * @description The `splitTokens()` function splits a string at one or many character "tokens." The tokens parameter specifies the character or characters to be used as a boundary.
 *
 * If no tokens character is specified, any whitespace character is used to split. Whitespace characters include tab (`\t`), line feed (`\n`), carriage return (`\r`), form feed (`\f`), and space.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  splitTokens
 *
 * @param   {String} str the String to be split
 * @param   {String} [tokens] list of individual characters that will be used as separators
 * @return  {Array} Array of strings
 */
 // From: http://processingjs.org/reference/splitTokens_/
pub.splitTokens = function(str, tokens) {
  if (arguments.length === 1) tokens = "\n\t\r\u000c ";
  tokens = "[" + tokens + "]";
  var ary = [];
  var index = 0;
  var pos = str.search(tokens);
  while (pos >= 0) {
    if (pos === 0) str = str.substring(1);
    else {
      ary[index] = str.substring(0, pos);
      index++;
      str = str.substring(pos);
    }
    pos = str.search(tokens);
  }
  if (str.length > 0) ary[index] = str;
  if (ary.length === 0) ary = undefined;
  return ary;
};

/**
 * @description Checks whether a string starts with a specific character or string.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  startsWith
 *
 * @param   {String} str A string to be checked
 * @param   {String} prefix The string to look for
 * @return  {Boolean} Returns either true or false
 */
var startsWith = pub.startsWith = function(str, prefix) {
  if(!isString(str) || !isString(prefix)) {
    error("startsWith() requires two strings, the string to be checked and the prefix to look for.");
  }
  return str.indexOf(prefix) === 0;
};

/**
 * @description Removes whitespace characters from the beginning and end of a String. In addition to standard whitespace characters such as space, carriage return, and tab, this function also removes the Unicode "nbsp" character.
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  trim
 *
 * @param   {String|Array} str A string or an array of strings to be trimmed
 * @return  {String|Array} Returns the input in a trimmed way
 */
 // From: http://processingjs.org/reference/trim_/
pub.trim = function(str) {
  if (str instanceof Array) {
    var arr = [];
    for (var i = 0; i < str.length; i++) arr.push(str[i].replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, ""));
    return arr;
  }
  return str.replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, "");
};

/**
 * @description Removes multiple, leading or trailing spaces and punctuation from "words". E.g. converts `"word!"` to `"word"`. Especially useful together with `words()`;
 *
 * @cat     Data
 * @subcat  String Functions
 * @method  trimWord
 *
 * @param   {String} s The String to trim
 * @return  {String} The trimmed string
 */
 // from: https://stackoverflow.com/a/25575009/3399765
pub.trimWord = function(s) {
  s = s.replace(/\s*/g, "")
       .replace(/\n*/g, "")
       .replace(/(^[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]*)|([\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]*$)/gi, "");
  return s;
};

// ----------------------------------------
// Data/Type-Check
// ----------------------------------------

/**
 * @description Checks whether a var is an array, returns `true` if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isArray
 *
 * @param   {Object|String|Number|Boolean} obj The object to check
 * @return  {Boolean} returns true if this is the case
 */
var isArray = pub.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

/**
 * @description Checks whether a var is an integer, returns `true` if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isInteger
 *
 * @param   {Object|String|Number|Boolean} num The number to check.
 * @return  {Boolean} Returns true if the given argument is an integer.
 */
var isInteger = pub.isInteger = function(num) {
  return Object.prototype.toString.call(num) === "[object Number]" && num % 1 === 0;
};

/**
 * @description Checks whether a var is a number, returns `true if this is the case.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isNumber
 *
 * @param   {Object|String|Number|Boolean} num The number to check
 * @return  {Boolean} returns true if this is the case
 */
var isNumber = pub.isNumber = function(num) {
  if (num === null) {
    return false;
  }
  if (isNaN(num)) {
    return false;
  }
  return isFinite(num) && num.constructor.name === "Number";
};

/**
 * @description Checks whether a var is a string, returns `true` if this is the case
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isString
 *
 * @param   {Object|String|Number|Boolean} str The string to check
 * @return  {Boolean} returns true if this is the case
 */
var isString = pub.isString = function(str) {
  return Object.prototype.toString.call(str) === "[object String]";
};

/**
 * @description Checks whether a var is an InDesign text object, returns `true` if this is the case.
 * NB: a InDesign text frame will return `false` as it is just a container holding text. So you could say that `isText()` refers to all the things inside a text frame.
 *
 * @cat     Document
 * @subcat  Type-Check
 * @method  isText
 *
 * @param   {Character|InsertionPoint|Line|Paragraph|TextColumn|TextStyleRange|Word} obj The object to check
 * @return  {Boolean} returns true if this is the case
 */
var isText = pub.isText = function(obj) {

  return obj instanceof Character ||
         obj instanceof InsertionPoint ||
         obj instanceof Word ||
         obj instanceof Line ||
         obj instanceof TextStyleRange ||
         obj instanceof Paragraph ||
         obj instanceof TextColumn ||
         obj instanceof Text ||
         obj.constructor.name === "Characters" ||
         obj.constructor.name === "InsertionPoints" ||
         obj.constructor.name === "Words" ||
         obj.constructor.name === "Lines" ||
         obj.constructor.name === "TextStyleRanges" ||
         obj.constructor.name === "Paragraphs" ||
         obj.constructor.name === "TextColumns";
};

/**
 * @description Checks whether an URL string is valid.
 *
 * @cat     Data
 * @subcat  Type-Check
 * @method  isURL
 *
 * @param   {String} url An url string to be checked
 * @return  {Boolean} Returns either true or false
 */
var isURL = pub.isURL = function(url) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
};

// ----------------------------------------
// Data Private
// ----------------------------------------

var decimalToHex = function(d, padding) {
  padding = padding === undefined || padding === null ? padding = 8 : padding;
  if (d < 0) d = 4294967295 + d + 1;
  var hex = Number(d).toString(16).toUpperCase();
  while (hex.length < padding) hex = "0" + hex;
  if (hex.length >= padding) hex = hex.substring(hex.length - padding, hex.length);
  return hex;
};

function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
  if (value instanceof Array) {
    var arr = [];
    for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
    return arr;
  }
  return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
}

function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
  var sign = value < 0 ? minus : plus;
  var autoDetectDecimals = rightDigits === 0;
  var rightDigitsOfDefault = rightDigits === undefined || rightDigits < 0 ? 0 : rightDigits;
  var absValue = Math.abs(value);
  if (autoDetectDecimals) {
    rightDigitsOfDefault = 1;
    absValue *= 10;
    while (Math.abs(Math.round(absValue) - absValue) > 1.0E-6 && rightDigitsOfDefault < 7) {
      ++rightDigitsOfDefault;
      absValue *= 10;
    }
  } else if (rightDigitsOfDefault !== 0) absValue *= Math.pow(10, rightDigitsOfDefault);
  var number, doubled = absValue * 2;
  if (Math.floor(absValue) === absValue) number = absValue;
  else if (Math.floor(doubled) === doubled) {
    var floored = Math.floor(absValue);
    number = floored + floored % 2;
  } else number = Math.round(absValue);
  var buffer = "";
  var totalDigits = leftDigits + rightDigitsOfDefault;
  while (totalDigits > 0 || number > 0) {
    totalDigits--;
    buffer = "" + number % 10 + buffer;
    number = Math.floor(number / 10);
  }
  if (group !== undefined) {
    var i = buffer.length - 3 - rightDigitsOfDefault;
    while (i > 0) {
      buffer = buffer.substring(0, i) + group + buffer.substring(i);
      i -= 3;
    }
  }
  if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
  return sign + buffer;
}

var unhexScalar = function(hex) {
  var value = parseInt("0x" + hex, 16);
  if (value > 2147483647) value -= 4294967296;
  return value;
};

pub.match = function(str, regexp) {
  return str.match(regexp);
};

pub.matchAll = function(aString, aRegExp) {
  var results = [],
    latest;
  var regexp = new RegExp(aRegExp, "g");
  while ((latest = regexp.exec(aString)) !== null) {
    results.push(latest);
    if (latest[0].length === 0)++regexp.lastIndex;
  }
  return results.length > 0 ? results : null;
};

// ----------------------------------------
// src/includes/document.js
// ----------------------------------------

// ----------------------------------------
// Document
// ----------------------------------------

/**
 * @description Removes all page items (including locked ones) in the given Document, Page, Layer or Group. If the selected container is a group, the group itself will be removed as well.
 *
 * @cat     Document
 * @method  clear
 *
 * @param   {Document|Page|Layer|Group} container The container where the PageItems sit in.
 */
pub.clear = function(container) {

  if (container instanceof Document
    || container instanceof Page
    || container instanceof Layer) {

    container.pageItems.everyItem().locked = false;
    container.pageItems.everyItem().remove();

  } else if (container instanceof Group) {

    container.locked = false;
    container.remove();

  } else {
    error("clear(), not a valid container! Use: Document, Page, Layer or Group.");
  }
};

/**
 * @description Closes the current document. If no `saveOptions` argument is used, the user will be asked if they want to save or not.
 *
 * @cat     Document
 * @method  close
 *
 * @param   {Object|Boolean} [saveOptions] The InDesign SaveOptions constant or either true for triggering saving before closing or false for closing without saving.
 * @param   {File} [file] The InDesign file instance to save the document to.
 */
pub.close = function(saveOptions, file) {
  if (currDoc) {
    if(saveOptions === false) {
      saveOptions = SaveOptions.NO;
    } else if(saveOptions === true) {
      saveOptions = SaveOptions.YES;
    } else if(saveOptions === undefined) {
      saveOptions = SaveOptions.ASK;
    } else {
      if(!isEnum(SaveOptions, saveOptions)) {
        error("close(), wrong saveOptions argument. Use True, False, InDesign SaveOptions constant or leave empty.");
      }
    }

    resetDocSettings();

    try {
      currDoc.close(saveOptions, file);
    } catch (e) {
      // the user has cancelled a save dialog, the doc will not be saved
      currDoc.close(saveOptions.NO);
    }
    resetCurrDoc();
  }
};

/**
 * @description Sets or possibly creates the current document and returns it. If the `doc` parameter is not given, the current document gets set to the active document in the application. If no document at all is open, a new document gets created.
 *
 * @cat     Document
 * @method  doc
 *
 * @param   {Document} [doc] The document to set the current document to.
 * @return  {Document} The current document instance.
 */
pub.doc = function(doc) {
  if (doc instanceof Document) {
    // reset the settings of the old doc, before activating the new doc
    resetDocSettings();
    setCurrDoc(doc);
  }
  return currentDoc();
};

/**
 * @description Returns the current layer if no argument is given. Sets active layer if layer object or name of existing layer is given. Newly creates layer and sets it to active if new name is given.
 *
 * @cat     Document
 * @method  layer
 *
 * @param   {Layer|String} [layer] The layer or layer name to set the current layer to.
 * @return  {Layer} The current layer instance.
 */
pub.layer = function(layer) {
  checkNull(layer);
  if (layer instanceof Layer) {
    currLayer = layer;
    currentDoc().activeLayer = currLayer;
  } else if (typeof layer === "string") {
    var layers = currentDoc().layers;
    currLayer = layers.item(layer);
    if (!currLayer.isValid) {
      currLayer = layers.add({name: layer});
    } else {
      currentDoc().activeLayer = currLayer;
    }
  } else if (arguments.length > 0) {
    error("layer(), wrong arguments. Use layer object or string instead.");
  }
  return currentLayer();
};

/**
 * @description Sets the reference point for transformations using the `transform()` function. The reference point will be used for all following transformations, until it is changed again. By default, the reference point is set to the top left.
 * Arguments can be the basil constants `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`, `CENTER_LEFT`, `CENTER`, `CENTER_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER` or `BOTTOM_RIGHT`. Alternatively the digits `1` through `9` (as they are arranged on a num pad) can be used to set the anchor point. Lastly the function can also use an InDesign anchor point enumerator to set the reference point.
 * If the function is used without any arguments the currently set reference point will be returned.
 *
 * @cat     Document
 * @method  referencePoint
 *
 * @param   {String} [referencePoint] The reference point to set.
 * @return  {String} Current reference point setting.
 */
pub.referencePoint = function(rp) {
  if(!arguments.length) {
    return currRefPoint;
  }

  var anchorEnum;

  if(rp === pub.TOP_LEFT || rp === 7 || rp === AnchorPoint.TOP_LEFT_ANCHOR) {
    currRefPoint = pub.TOP_LEFT;
    anchorEnum = AnchorPoint.TOP_LEFT_ANCHOR;
  } else if(rp === pub.TOP_CENTER || rp === 8 || rp === AnchorPoint.TOP_CENTER_ANCHOR) {
    currRefPoint = pub.TOP_CENTER;
    anchorEnum = AnchorPoint.TOP_CENTER_ANCHOR;
  } else if(rp === pub.TOP_RIGHT || rp === 9 || rp === AnchorPoint.TOP_RIGHT_ANCHOR) {
    currRefPoint = pub.TOP_RIGHT;
    anchorEnum = AnchorPoint.TOP_RIGHT_ANCHOR;
  } else if(rp === pub.CENTER_LEFT || rp === 4 || rp === AnchorPoint.LEFT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_LEFT;
    anchorEnum = AnchorPoint.LEFT_CENTER_ANCHOR;
  } else if(rp === pub.CENTER || rp === pub.CENTER_CENTER || rp === 5 || rp === AnchorPoint.CENTER_ANCHOR) {
    currRefPoint = pub.CENTER;
    anchorEnum = AnchorPoint.CENTER_ANCHOR;
  } else if(rp === pub.CENTER_RIGHT || rp === 6 || rp === AnchorPoint.RIGHT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_RIGHT;
    anchorEnum = AnchorPoint.RIGHT_CENTER_ANCHOR;
  } else if(rp === pub.BOTTOM_LEFT || rp === 1 || rp === AnchorPoint.BOTTOM_LEFT_ANCHOR) {
    currRefPoint = pub.BOTTOM_LEFT;
    anchorEnum = AnchorPoint.BOTTOM_LEFT_ANCHOR;
  } else if(rp === pub.BOTTOM_CENTER || rp === 2 || rp === AnchorPoint.BOTTOM_CENTER_ANCHOR) {
    currRefPoint = pub.BOTTOM_CENTER;
    anchorEnum = AnchorPoint.BOTTOM_CENTER_ANCHOR;
  } else if(rp === pub.BOTTOM_RIGHT || rp === 3 || rp === AnchorPoint.BOTTOM_RIGHT_ANCHOR) {
    currRefPoint = pub.BOTTOM_RIGHT;
    anchorEnum = AnchorPoint.BOTTOM_RIGHT_ANCHOR;
  } else {
    error("referencePoint(), wrong argument! Use reference point constant (TOP_LEFT, TOP_CENTER, ...), a digit between 1 and 9 or an InDesign anchor point enumerator.");
  }

  if(app.properties.activeWindow instanceof LayoutWindow ) {
    app.activeWindow.transformReferencePoint = anchorEnum;
  }

  return currRefPoint;
};

/**
 * @description Removes the provided Page, Layer, PageItem, Swatch, etc.
 *
 * @cat     Document
 * @method  remove
 *
 * @param   {PageItem} obj The object to be removed.
 */
pub.remove = function(obj) {

  if(obj.hasOwnProperty("remove")) {
    obj.remove();
  } else {
    error("remove(), provided object cannot be removed.");
  }
};

/**
 * @description Reverts the document to its last saved state. If the current document is not saved yet, this function will close the document without saving it and reopen a fresh document so as to "revert" the unsaved document. This function is helpful during development stage to start from a new or default document each time the script is run.
 *
 * @cat     Document
 * @method  revert
 *
 * @return  {Document} The reverted document.
 */
pub.revert = function() {

  if(currDoc.saved && currDoc.modified) {
    var currFile = currDoc.fullName;
    currDoc.close(SaveOptions.NO);
    currDoc = null;
    app.open(File(currFile));
    currentDoc();
  } else if(!currDoc.saved) {
    currDoc.close(SaveOptions.NO);
    currDoc = null;
    app.documents.add();
    currentDoc();
  }

  return currDoc;
};

/**
 * @description Sets the units of the document (like right clicking the rulers). By default basil uses the units of the user's document or the user's default units.
 *
 * @cat     Document
 * @method  units
 *
 * @param   {String} [units] Supported units: PT, PX, CM, MM or IN.
 * @return  {String} Current unit setting.
 */
var unitsCalledCounter = 0;
pub.units = function (units) {
  checkNull(units);
  if (arguments.length === 0) {
    return currUnits;
  }

  if (units === pub.PT || units === 2054188905) {
    units = pub.PT;
    unitType = MeasurementUnits.points;
  } else if(units === pub.MM || units === 2053991795) {
    units = pub.MM;
    unitType = MeasurementUnits.millimeters;
  } else if(units === pub.CM || units === 2053336435) {
    units = pub.CM;
    unitType = MeasurementUnits.centimeters;
  } else if(units === pub.IN || units === 2053729891) {
    units = pub.IN;
    unitType = MeasurementUnits.inches;
  } else if(units === pub.PX || units === 2054187384) {
    units = pub.PX;
    unitType = MeasurementUnits.pixels;
  } else if(isEnum(MeasurementUnits, units)) {
    // valid enumerator with invalid basil.js unit (from documents that are set to PICAS, CICEROS etc.)
    warning("The document's current units are not supported by basil.js. Units will be set to Points.");
    units = pub.PT;
    unitType = MeasurementUnits.points;
  } else {
    error("units(), invalid unit. Use: PT, MM, CM, IN or PX.");
  }

  currentDoc().viewPreferences.horizontalMeasurementUnits = unitType;
  currentDoc().viewPreferences.verticalMeasurementUnits = unitType;
  currUnits = units;

  updatePublicPageSizeVars();

  if (unitsCalledCounter === 1) {
    warning("Please note that units() will reset the current transformation matrix.");
  }
  unitsCalledCounter++;
  return currUnits;
};

// ----------------------------------------
// Document/Canvas
// ----------------------------------------

/**
 * @description Sets the document bleeds. If one value is given, all 4 are set equally. If 4 values are given, the top/right/bottom/left document bleeds will be adjusted. Calling the function without any values, will return the document bleed settings.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  bleeds
 *
 * @param   {Number} [top] Top bleed or all if only one.
 * @param   {Number} [right] Right bleed.
 * @param   {Number} [bottom] Bottom bleed.
 * @param   {Number} [left] Left bleed.
 * @return  {Object} Current document bleeds settings.
 */
pub.bleeds = function(top, right, bottom, left) {
  if (arguments.length === 0) {
    return {top: currentDoc().documentPreferences.documentBleedTopOffset,
      right: currentDoc().documentPreferences.documentBleedOutsideOrRightOffset,
      bottom: currentDoc().documentPreferences.documentBleedBottomOffset,
      left: currentDoc().documentPreferences.documentBleedInsideOrLeftOffset
    };
  } else if (arguments.length === 1) {
    right = bottom = left = top;
  }else{
    currentDoc().documentPreferences.documentBleedUniformSize = false;
  }
  currentDoc().documentPreferences.documentBleedTopOffset = top;
  currentDoc().documentPreferences.documentBleedOutsideOrRightOffset = right;
  currentDoc().documentPreferences.documentBleedBottomOffset = bottom;
  currentDoc().documentPreferences.documentBleedInsideOrLeftOffset = left;
};

/**
 * @description Use this to set the dimensions of the canvas. Choose between `PAGE` (default), `MARGIN`, `BLEED` resp. `FACING_PAGES`, `FACING_MARGINS` and `FACING_BLEEDS` for book setups with facing page. Please note: Setups with more than two facing pages are not yet supported.
 * Please note that you will loose your current MatrixTransformation. You should set the canvasMode before you attempt to use `translate()`, `rotate()` and `scale()`.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  canvasMode
 *
 * @param   {String} mode The canvas mode to set.
 * @return  {String} The current canvas mode.
 */
pub.canvasMode = function (m) {
  if(arguments.length === 0) {
    return currCanvasMode;
  } else if (m === pub.PAGE ||
             m === pub.MARGIN ||
             m === pub.BLEED ||
             m === pub.FACING_PAGES ||
             m === pub.FACING_MARGINS ||
             m === pub.FACING_BLEEDS) {
    currCanvasMode = m;
    updatePublicPageSizeVars();
  } else {
    error("canvasMode(), there is a problem setting the canvasMode. Please check the reference for details.");
  }
  return currCanvasMode;
};

/**
 * @description Creates a vertical guide line at the current spread and current layer.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  guideX
 *
 * @param   {Number} x Position of the new guide line.
 * @return  {Guide} New guide line.
 */
pub.guideX = function (x) {
  checkNull(x);
  var guides = currentPage().guides;
  var guide = guides.add(currentLayer());
  guide.fitToPage = true;
  guide.orientation = HorizontalOrVertical.VERTICAL;
  guide.location = x;
  return guide;
};

/**
 * @description Creates a horizontal guide line at the current spread and current layer.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  guideY
 *
 * @param   {Number} y Position of the new guide line.
 * @return  {Guide} New guide line.
 */
pub.guideY = function (y) {
  checkNull(y);
  var guides = currentPage().guides;
  var guide = guides.add(currentLayer());
  guide.fitToPage = true;
  guide.orientation = HorizontalOrVertical.HORIZONTAL;
  guide.location = y;
  return guide;
};

/**
 * @description Sets the margins of a given page. If 1 value is given, all 4 sides are set equally. If 4 values are given, the current page will be adjusted. Adding a 5th value will set the margin of a given page. Calling the function without any values, will return the margins for the current page.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  margins
 *
 * @param   {Number} [top] Top margin or all if only one.
 * @param   {Number} [right] Right margin.
 * @param   {Number} [bottom] Bottom margin.
 * @param   {Number} [left] Left margin.
 * @param   {Number} [pageNumber] Sets margins to selected page, currentPage() if left blank.
 * @return  {Object} Current page margins with the properties: `top`, `right`, `bottom`, `left`.
 */
pub.margins = function(top, right, bottom, left, pageNumber) {
  if (arguments.length === 0) {
    return {top: pub.page(pageNumber).marginPreferences.top,
      right: pub.page(pageNumber).marginPreferences.right,
      bottom: pub.page(pageNumber).marginPreferences.bottom,
      left: pub.page(pageNumber).marginPreferences.left
    };
  } else if (arguments.length === 1) {
    right = bottom = left = top;
  }
  if(pageNumber !== undefined) {
    pub.page(pageNumber).marginPreferences.top = top;
    pub.page(pageNumber).marginPreferences.right = right;
    pub.page(pageNumber).marginPreferences.bottom = bottom;
    pub.page(pageNumber).marginPreferences.left = left;
  }else{
    currentPage().marginPreferences.top = top;
    currentPage().marginPreferences.right = right;
    currentPage().marginPreferences.bottom = bottom;
    currentPage().marginPreferences.left = left;
  }
};

/**
 * @description Returns the current horizontal and vertical pasteboard margins and sets them if both arguements are given.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  pasteboard
 *
 * @param   {Number} h The desired horizontal pasteboard margin.
 * @param   {Number} v The desired vertical pasteboard margin.
 * @return  {Array} The current horizontal, vertical pasteboard margins.
 */
pub.pasteboard = function (h, v) {
  if(arguments.length == 0) {
    return currentDoc().pasteboardPreferences.pasteboardMargins;
  } else if(arguments.length == 1) {
    error("pasteboard() requires both a horizontal and vertical value. Please check the reference for details.");
  }else if (typeof h === "number" && typeof v === "number") {
    currentDoc().pasteboardPreferences.pasteboardMargins = [h, v];
    return currentDoc().pasteboardPreferences.pasteboardMargins;
  }else {
    error("pasteboard(), there is a problem setting the pasteboard. Please check the reference for details.");
  }
};

// ----------------------------------------
// Document/Page
// ----------------------------------------

/**
 * @description Adds a new page to the document. Set the optional location parameter to either `AT_END` (default), `AT_BEGINNING`, `AFTER` or `BEFORE`. `AFTER` and `BEFORE` will use the current page as insertion point.
 *
 * @cat     Document
 * @subcat  Page
 * @method  addPage
 *
 * @param   {String} [location] The location placement mode.
 * @return  {Page} The new page.
 */
pub.addPage = function(location) {

  if(arguments.length) {
    if(!(location === pub.AFTER ||
         location === pub.AT_BEGINNING ||
         location === pub.AT_END ||
         location === pub.BEFORE)) {
      error("addPage(), invalid location argument! Use AT_END, AT_BEGINNING, AFTER or BEFORE.");
    }
  } else {
    location = pub.AT_END;
  }

  return currentDoc().pages.add(location, pub.page());
};

/**
 * @description Applies a master page to the given page.
 *
 * The `page` parameter can be given as a page object, as a page name or as a page number (numbering starts at 1).
 *
 * The `master` parameter can be given as a master spread object or as a string. If a string is used, it can either hold the master page prefix (e.g "A", "B") or the full name *including* the prefix (e.g "A-Master", "B-Master"). The latter is useful, if there are several masters using the same prefix. Alternatively, the constant `NONE` can be used to apply InDesign's `[none]` master to the page and thus remove the previously applied master page from the page.
 *
 * @cat     Document
 * @subcat  Page
 * @method  applyMasterPage
 *
 * @param   {Number|String|Page} page The page to apply the master page to.
 * @param   {String|MasterSpread} master The master page to apply.
 * @return  {Page} The page the master page was applied to.
 *
 * @example <caption>Apply the master with prefix "B" to the documents third page</caption>
 * applyMasterPage(3, "B");
 *
 * @example <caption>In a document with master pages "A-Text" and "A-Images", apply "A-Images" to the current page</caption>
 * applyMasterPage(page(), "A-Images");
 *
 * @example <caption>Remove the master page from the page named "IV"</caption>
 * applyMasterPage("IV", NONE);
 */
pub.applyMasterPage = function(page, master) {

  if(isNumber(page) || isString(page) || page instanceof Page) {
    page = getPage(page, "applyMasterPage");
  } else {
    error("applyMasterPage(), invalid first parameter! Use page number, page name or page object for the page to apply the master to.");
  }

  if(master === pub.NONE) {
    // apply InDesign's [None] master
    page.appliedMaster = NothingEnum.NOTHING;
    return page;
  }

  page.appliedMaster = getMasterSpread(master, "applyMasterPage");

  return page;
};

/**
 * @description Sets a master page to be the active page. This can be used to set up and arrange page items on master pages, so they appear throughout the entire document.
 *
 * The `master` parameter describes the master spread that contains the master page. It can be given as a master spread object or as a string. If a string is used, it can either hold the master page prefix (e.g "A", "B") or the full name *including* the prefix (e.g "A-Master", "B-Master"). The latter is useful, if there are several masters using the same prefix.
 *
 * As master pages cannot directly be targeted by number, the optional `pageIndex` parameter can be used to specify which master page of the given master spread should be set as the active page, in case there are several pages on the master spread. Counting starts from 0, beginning from the leftmost page. If the `pageIndex` parameter is not given, the first page of the master spread is returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  masterPage
 *
 * @param   {String|MasterSpread} master The master spread that contains the master page.
 * @param   {Number} [pageIndex] The index of the page on the master spread, counting from 0.
 * @return  {Page} The active master page.
 *
 * @example <caption>Set master page to be the first page of master "A".</caption>
 * masterPage("A");
 *
 * @example <caption>Set master page to be the second page of master "B".</caption>
 * masterPage("B", 1);
 *
 * @example <caption>Alternate way to set master page ot the second page of master "B".</caption>
 * masterPage("B");
 * nextPage();
 */
pub.masterPage = function(master, pageIndex) {

  var mp;
  var ms = getMasterSpread(master, "masterPage");

  if(arguments.length === 1) {
    mp = ms.pages[0];
  } else {
    if((!isNumber(pageIndex)) || pageIndex > ms.pages.length - 1) {
      error("masterPage(), invalid page index! Use number that describes a valid page index. Counting starts at 0 from the leftmost page of a master spread.");
    }
    mp = ms.pages[pageIndex];
  }

  // set active page
  currPage = mp;
  updatePublicPageSizeVars();
  if (currentDoc().windows.length) {
    // focus GUI on new page, if not in HIDDEN mode
    app.activeWindow.activePage = currPage;
  }

  return mp;
};

/**
 * @description Set the next page of the document to be the active one and returns the new active page. If the current page is the last page or the last master page, this page will be returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  nextPage
 *
 * @return  {Page} The active page.
 */
pub.nextPage = function () {

  var np;
  if(currPage.parent instanceof MasterSpread) {
    // master page
    if(currPage.parent.pages.nextItem(currPage).isValid) {
      np = currPage.parent.pages.nextItem(currPage);
    } else if(currentDoc().masterSpreads.nextItem(currPage.parent).isValid) {
      np = currentDoc().masterSpreads.nextItem(currPage.parent).pages[0];
    } else {
      // last master page
      return currPage;
    }
  } else {
    // regular page
    if(currPage.documentOffset + 1 === currentDoc().documentPreferences.pagesPerDocument) {
      // last page
      return currPage;
    }
    np = currentDoc().pages[currPage.documentOffset + 1];
  }

  return getAndUpdatePage(np, "nextPage");
};

/**
 * @description Returns the current page and sets it if argument page is given. If page is given as string, the page will be set to the page with this name (e.g. "4", "04", "D", "IV"). If the page is given as an integer, the page will be set to the page according to this number, no matter the actual naming of the page. Numbering starts with 1 in this case. If you pass a page item the current page will be set to its containing page. If this page item is off the page (on the pasteboard) the current page will be set to the first page of its containing spread.
 *
 * @cat     Document
 * @subcat  Page
 * @method  page
 *
 * @param   {Number|String|Page|PageItem} [page] The page number (as integer), page name or page object to set the current page to or an page item to refer to its containing page.
 * @return  {Page} The current page instance.
 *
 * @example <caption>Sets the current page to the third page of the document</caption>
 * page(3);
 *
 * @example <caption>Sets the current page to the page named "004"</caption>
 * page("004");
 *
 * @example <caption>Sets the current page to the containing page of a rectangle</caption>
 * var myRect = rect(100, 100, 200, 200);
 * page(myRect);
 */
pub.page = function(page) {

  if(arguments.length) {
    getAndUpdatePage(page, "page");
  }

  return currentPage();
};

/**
 * @description Returns the number of all pages in the current document. If a number is given as an argument, it will set the document's page count to the given number by either adding pages or removing pages until the number is reached. If pages are added, the master page of the document's last page will be applied to the new pages.
 *
 * @cat     Document
 * @subcat  Page
 * @method  pageCount
 *
 * @param   {Number} [pageCount] New page count of the document (integer between 1 and 9999).
 * @return  {Number} The amount of pages.
 */
pub.pageCount = function(pageCount) {
  if(arguments.length) {
    if(pub.isInteger(pageCount) && pageCount > 0 && pageCount < 10000) {
      currentDoc().documentPreferences.pagesPerDocument = pageCount;
    } else {
      error("pageCount(), wrong arguments! Use an integer between 1 and 9999 to set page count.");
    }
  }
  return currentDoc().pages.count();
};

/**
 * @description Returns the current page number of either the current page or the given page name or page object. Numbering of pages starts at 1. Master pages have no real numbering and will return -1 instead.
 *
 * @cat     Document
 * @subcat  Page
 * @method  pageNumber
 *
 * @param   {String|Page} [page] The page name or page object of the page you want to know the number of.
 * @return  {Number} The page number within the document.
 */
pub.pageNumber = function (page) {

  if(arguments.length === 0) {
    return currPage.parent instanceof MasterSpread ? -1 : currPage.documentOffset + 1;
  }

  if(isString(page)) {
    if(currentDoc().pages.item(page).isValid) {
      return currentDoc().pages.item(page).documentOffset + 1;
    } else {
      error("pageNumber(), invalid page name! A page \"" + page + "\" does not exist.");
    }
  }

  if(page instanceof Page) {
    return page.parent instanceof MasterSpread ? -1 : page.documentOffset + 1;
  } else {
    error("pageNumber(), invalid parameter! Use page name as string or page object.");
  }
};

/**
 * @description Set the previous page of the document to be the active one and returns the new active page. If the current page is the first page or the first master page, this page will be returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  previousPage
 *
 * @return  {Page} The active page.
 */
pub.previousPage = function () {

  var pp;
  if(currPage.parent instanceof MasterSpread) {
    // master page
    if(currPage.parent.pages.previousItem(currPage).isValid) {
      pp = currPage.parent.pages.previousItem(currPage);
    } else if(currentDoc().masterSpreads.previousItem(currPage.parent).isValid) {
      pp = currentDoc().masterSpreads.previousItem(currPage.parent).pages.lastItem();
    } else {
      // first master page
      return currPage;
    }
  } else {
    // regular page
    if(currPage.documentOffset === 0) {
      // first page
      return currPage;
    }
    pp = currentDoc().pages[currPage.documentOffset - 1];
  }

  return getAndUpdatePage(pp, "previousPage");
};

/**
 * @description Removes a page from the current document. This will either be the current page if the parameter page is left empty, or the given page object or the page of a specific number or name.
 *
 * @cat     Document
 * @subcat  Page
 * @method  removePage
 *
 * @param   {Number|String|Page} [page] The page to be removed as page number, page name or page object.
 */
pub.removePage = function (page) {

  if(currentDoc().pages.length === 1) {
    error("removePage(), the only page of the document cannot be deleted.");
  }

  if(arguments.length === 0) {
    page = currPage;
  } else if(isNumber(page) || isString(page) || page instanceof Page) {
    page = getPage(page, "removePage");
  } else {
    error("removePage(), invalid parameter! Use page number, page name or page object!");
  }

  page.remove();
  currPage = null; // reset!
  currentPage();
};

// ----------------------------------------
// Document/PageItems
// ----------------------------------------

/**
 * @description Applies an object style to the given page item. The object style can be given as name or as an object style instance.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  applyObjectStyle
 *
 * @param   {PageItem} item The page item to apply the style to.
 * @param   {ObjectStyle|String} style An object style instance or the name of the object style to apply.
 * @return  {PageItem} The page item that the style was applied to.
 */

pub.applyObjectStyle = function(item, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allObjectStyles, name);
    if(!style) {
      error("applyObjectStyle(), an object style named \"" + name + "\" does not exist.");
    }
  }

  if(!(item.hasOwnProperty("appliedObjectStyle")) || !(style instanceof ObjectStyle)) {
    error("applyObjectStyle(), wrong parameters. Use: pageItem, objectStyle|name");
  }

  item.appliedObjectStyle = style;

  return item;
};

/**
 * @description Arranges a page item or a layer before or behind other page items or layers. If using the constants `FORWARD` or `BACKWARD` the object is sent forward or back one step. The constants `FRONT` or `BACK` send the object to the very front or very back. Using `FRONT` or `BACK` together with the optional reference object, sends the object in front or behind this reference object.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  arrange
 *
 * @param   {PageItem|Layer} pItemOrLayer The page item or layer to be moved to a new position.
 * @param   {String} positionOrDirection The position or direction to move the page item or layer. Can be `FRONT`, `BACK`, `FORWARD` or `BACKWARD`.
 * @param   {PageItem|Layer} [reference] A reference object to move the page item or layer behind or in front of.
 * @return  {PageItem|Layer} The newly arranged page item or layer.
 */
pub.arrange = function(pItemOrLayer, positionOrDirection, reference) {
  checkNull(pItemOrLayer);

  if(pItemOrLayer.hasOwnProperty("parentPage")) {
    if(positionOrDirection === pub.BACKWARD) {
      pItemOrLayer.sendBackward();
    } else if (positionOrDirection === pub.FORWARD) {
      pItemOrLayer.bringForward();
    } else if (positionOrDirection === pub.BACK) {
      pItemOrLayer.sendToBack(reference);
    } else if (positionOrDirection === pub.FRONT) {
      pItemOrLayer.bringToFront(reference);
    } else {
      error("arrange(), not a valid position or direction. Please use FRONT, BACK, FORWARD or BACKWARD.");
    }
  } else if (pItemOrLayer instanceof Layer) {
    if(positionOrDirection === pub.BACKWARD) {
      if(pItemOrLayer.index === currentDoc().layers.length - 1) return;
      pItemOrLayer.move(LocationOptions.AFTER, currentDoc().layers[pItemOrLayer.index + 1]);
    } else if (positionOrDirection === pub.FORWARD) {
      if(pItemOrLayer.index === 0) return;
      pItemOrLayer.move(LocationOptions.BEFORE, currentDoc().layers[pItemOrLayer.index - 1]);
    } else if (positionOrDirection === pub.BACK) {
      if(!(reference instanceof Layer)) {
        pItemOrLayer.move(LocationOptions.AT_END);
      } else {
        pItemOrLayer.move(LocationOptions.AFTER, reference);
      }
    } else if (positionOrDirection === pub.FRONT) {
      if(!(reference instanceof Layer)) {
        pItemOrLayer.move(LocationOptions.AT_BEGINNING);
      } else {
        pItemOrLayer.move(LocationOptions.BEFORE, reference);
      }
    } else {
      error("arrange(), not a valid position or direction. Please use FRONT, BACK, FORWARD or BACKWARD.");
    }
  } else {
    error("arrange(), invalid first parameter. Use page item or layer.");
  }

  return pItemOrLayer;
};

/**
 * @description The function calculates the geometric bounds of any given page item or text. Use the `transforms()` function to modify page items. In case the object is any kind of text, additional typographic information `baseline` and `xHeight` are calculated.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  bounds
 *
 * @param   {PageItem|Text} obj The page item or text to calculate the geometric bounds.
 * @return  {Object} Geometric bounds object with these properties: `width`, `height`, `left`, `right`, `top`, `bottom` and for text: `baseline`, `xHeight`.
 */
pub.bounds = function (obj) {
  var x1, y1, x2, y2, w, h;
  var offsets = [0, 0];

  if (isText(obj)) {
    var baseline = obj.baseline;
    var ascent = obj.ascent;
    var descent = obj.descent;

    x1 = obj.horizontalOffset;
    y1 = baseline - ascent;
    x2 = obj.endHorizontalOffset;
    y2 = baseline + descent;
    w = x2 - x1;
    h = y2 - y1;

    if (w < 0 || h < 0) {
      warning("bounds(), not possible to get correct bounds, possible line break within textObj");
    }

    // We not sure if this 100% correct, check
    // http://en.wikipedia.org/wiki/File:Typography_Line_Terms.svg
    var xHeight = y1 + descent;

    return {"width": w,
            "height": h,
            "left": x1 + currOriginX,
            "right": x2 + currOriginX,
            "top": y1 + currOriginY,
            "bottom": y2 + currOriginY,
            "baseline": baseline + currOriginY,
            "xHeight": xHeight + currOriginY};
  } else {
    // is it a pageItem?
    if (obj.hasOwnProperty("geometricBounds")) {
      var geometricBounds = obj.geometricBounds; // [y1, x1, y2, x2]
      x1 = geometricBounds[1] + currOriginX;
      y1 = geometricBounds[0] + currOriginY;
      x2 = geometricBounds[3] + currOriginX;
      y2 = geometricBounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // everything else e.g. page, spread
    else if (obj.hasOwnProperty("bounds")) {
      var bounds = obj.bounds; // [y1, x1, y2, x2]
      x1 = bounds[1] + currOriginX;
      y1 = bounds[0] + currOriginY;
      x2 = bounds[3] + currOriginX;
      y2 = bounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // no idea what that might be, give up
    else {
      error("bounds(), invalide type of parameter! Can't get bounds for this object.");
    }
  }
};

/**
 * @description Duplicates the given page after the current page or the given page item to the current page and layer. Use `rectMode()` to set center point.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  duplicate
 *
 * @param   {PageItem|Page} item The page item or page to duplicate.
 * @return  {Object} The new page item or page.
 */
pub.duplicate = function(item) {

  if(!(item instanceof Page) && typeof (item) !== "undefined" && item.hasOwnProperty("duplicate")) {

    var newItem = item.duplicate(currentPage().parent);
    newItem.move(currentLayer());

    return newItem;

  } else if(item instanceof Page) {

    var newPage = item.duplicate(LocationOptions.AFTER, pub.page());
    return newPage;

  } else {
    error("Please provide a valid Page or PageItem as parameter for duplicate().");
  }

};

/**
 * @description Returns the Group instance and sets it if argument Group is given. Groups items to a new group. Returns the resulting group instance. If a string is given as the only argument, the group by the given name will be returned.
 *
 * @cat     Document
 * @subCat  Page Items
 * @method  group
 *
 * @param   {Array} pItems An array of page items (must contain at least two items) or name of group instance.
 * @param   {String} [name] The name of the group, only when creating a group from page items.
 * @return  {Group} The group instance.
 */
pub.group = function (pItems, name) {
  checkNull(pItems);
  var group;
  if(pItems instanceof Array) {
    if(pItems.length < 2) {
      error("group(), the array passed to group() must at least contain two page items.");
    }
    // creates a group from Page Items
    group = currentDoc().groups.add(pItems);
    if(typeof name !== "undefined") {
      group.name = name;
    }
  } else if(typeof pItems === "string") {
    // get the Group of the given name
    group = currentDoc().groups.item(pItems);
    if (!group.isValid) {
      error("group(), a group with the provided name doesn't exist.");
    }
  } else {
    error("group(), not a valid argument. Use an array of page items to group or a name of an existing group.");
  }

  return group;
};

/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function for each of the PageItems in the given Document, Page, Layer or Group.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  items
 *
 * @param   {Document|Page|Layer|Group} container The container where the PageItems sit in
 * @param   {Function|Boolean} [cb] Optional: The callback function to call for each PageItem. When this function returns false the loop stops. Passed arguments: `item`, `loopCount`.
 * @return  {PageItems} A collection of PageItem objects.
 */
pub.items = function(container, cb) {

  if (container instanceof Document
    || container instanceof Page
    || container instanceof Layer
    || container instanceof Group) {

    if(arguments.length === 1 || cb === false) {
      return container.allPageItems;
    } else if(cb instanceof Function) {
      return forEach(container.allPageItems, cb);
    }
  }
  error("items(), Not a valid PageItem container, should be Document, Page, Layer or Group");
  return null;
};

/**
 * @description Returns the first item that is tagged with the given label in the InDesign Script Label pane (`Window -> Utilities -> Script Label`). Use this instead of `labels()`, when you know you just have one thing with that label and don't want to deal with a single-element array.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  label
 *
 * @param   {String} label The label identifier.
 * @return  {PageItem} The first page item with the given label.
 */
pub.label = function(label) {
  checkNull(label);
  var doc = currentDoc();
  for (var i = 0, len = doc.pageItems.length; i < len; i++) {
    var pageItem = doc.pageItems[i];
    if (pageItem.label === label) {
      return pageItem;
    }
  }
  error("label(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
};

/**
 * @description Returns items tagged with the given label in the InDesign Script Label pane (`Window -> Utilities -> Script Label`).
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  labels
 *
 * @param   {String} label The label identifier.
 * @param   {Function} [cb] The callback function to call with each item in the search result. When this function returns `false`, the loop stops. Passed arguments: `item`, `loopCount`.
 * @return  {Array} Array of concrete page item instances, e.g. text frame or spline item.
 */
pub.labels = function(label, cb) {
  checkNull(label);
  var result = [];
  var doc = currentDoc();
  for (var i = 0, len = doc.pageItems.length; i < len; i++) {
    var pageItem = doc.pageItems[i];
    if (pageItem.label === label) {
      // push pageItem's 1st element to get the concrete PageItem instance, e.g. a TextFrame
      result.push(pageItem.getElements()[0]);
    }
  }
  if (arguments.length === 2 && cb instanceof Function) {
    return forEach(result, cb);
  }
  if(result.length === 0) {
    error("labels(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
  }
  return result;
};

/**
 * @description Returns the first item on the active page that is named by the given name in the Layers pane (`Window -> Layer`).
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  nameOnPage
 *
 * @return  {Object} The first object on the active page with the given name.
 */
pub.nameOnPage = function(name) {
  checkNull(name);
  var result = null;
  var page = currentPage();
  for (var i = 0, len = page.allPageItems.length; i < len; i++) {
    var pageItem = page.allPageItems[i];
    if (pageItem.name === name) {
      result = pageItem.getElements()[0];
      break;
    }
  }
  if(result === null) {
    error("nameOnPage(), no item found with the name '" + name + "' on page " + pub.pageNumber());
  }
  return result;
};

/**
 * @description Returns the object style of a given page item or the object style with the given name. If an object style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the object style's properties.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  objectStyle
 *
 * @param   {PageItem|String} itemOrName A page item whose style to return or the name of the object style to return.
 * @param   {Object} [props] An object of property name/value pairs to set the style's properties.
 * @return  {ObjectStyle} The object style instance.
 */
pub.objectStyle = function(itemOrName, props) {
  var styleErrorMsg = "objectStyle(), wrong parameters. Use: pageItem|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(itemOrName.hasOwnProperty("appliedObjectStyle")) {
    // pageItem is given
    style = itemOrName.appliedObjectStyle;
  } else if(isString(itemOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allObjectStyles, itemOrName);
    if(!style) {
      style = currentDoc().objectStyles.add({name: itemOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("objectStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * @description Returns the first currently selected object. Use this if you know you only have one selected item and don't want to deal with an array.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  selection
 *
 * @return  {Object} The first selected object.
 */
pub.selection = function() {
  if(app.selection.length === 0) {
    error("selection(), selection is empty. Please select something.");
  }
  return app.selection[0];
};

/**
 * @description Returns the currently selected object(s)
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  selections
 *
 * @param   {Function} [cb] The callback function to call with each item in the selection. When this function returns false the loop stops. Passed arguments: item, loopCount.
 * @return  {Array} Array of selected object(s).
 */
pub.selections = function(cb) {
  if(app.selection.length === 0) {
    error("selections(), selection is empty. Please select something.");
  }
  if (arguments.length === 1 && cb instanceof Function) {
    return forEach(app.selection, cb);
  }
  return app.selection;
};

/**
 * @description Ungroups an existing group. Returns an array of the items that were within the group before ungroup() was called.
 *
 * @cat     Document
 * @subCat  Page Items
 * @method  ungroup
 *
 * @param   {Group|String} group The group instance or name of the group to ungroup.
 * @return  {Array} An array of the ungrouped page items.
 */
pub.ungroup = function(group) {
  checkNull(group);
  var ungroupedItems = null;
  if(group instanceof Group) {
    ungroupedItems = pub.items(group);
    group.ungroup();
  } else if(typeof group === "string") {
    // get the Group of the given name
    group = currentDoc().groups.item(group);
    if (!group.isValid) {
      error("ungroup(), a group with the provided name doesn't exist.");
    }
    ungroupedItems = pub.items(group);
    group.ungroup();
  } else {
    error("ungroup(), not a valid group. Please select a valid group.");
  }
  return ungroupedItems;
};

// ----------------------------------------
// Document/Text
// ----------------------------------------

/**
 * @description Adds a page item or a string to an existing story. You can control the position of the insert via the last parameter. It accepts either an insertion point or one the following constants: `AT_BEGINNING` and `AT_END`.
 *
 * @cat     Document
 * @subcat  Text
 * @method  addToStory
 *
 * @param   {Story} story The story.
 * @param   {PageItem|String} itemOrString Either a page item or a string.
 * @param   {InsertionPoint|String} insertionPointOrMode Insertion point object or one the following constants: `AT_BEGINNING` and `AT_END`.
 */
pub.addToStory = function(story, itemOrString, insertionPointorMode) {

  checkNull(story);
  checkNull(itemOrString);

  // init
  var libFileName = "addToStoryLib.indl";

  var libFile = new File(Folder.temp + "/" + libFileName);
  addToStoryCache = app.libraries.itemByName(libFileName);
  // if and a cache is existing from previous executions, remove it
  if (addToStoryCache.isValid) {
    addToStoryCache.close();
    libFile.remove();
  }
  // create an InDesign library for caching the page items
  addToStoryCache = app.libraries.add(libFile);


  if (story instanceof Story && arguments.length >= 2) {
    // add string
    if (isString(itemOrString)) {
      if (insertionPointorMode instanceof InsertionPoint) {
        insertionPointorMode.contents = itemOrString;
      } else if (insertionPointorMode === pub.AT_BEGINNING) {
        story.insertionPoints.firstItem().contents = itemOrString;
      } else {
        story.insertionPoints.lastItem().contents = itemOrString;
      }
    } else {
      // store the item as first asset in cache
      addToStoryCache.store(itemOrString);

      var insertionPoint = null;
      if (insertionPointorMode instanceof InsertionPoint) {
        insertionPoint = insertionPointorMode;
      } else if (insertionPointorMode === pub.AT_BEGINNING) {
        insertionPoint = story.insertionPoints.firstItem();
      } else {
        insertionPoint = story.insertionPoints.lastItem();
      }

      // place & remove from cache
      addToStoryCache.assets.firstItem().placeAsset(insertionPoint);
      addToStoryCache.assets.firstItem().remove();
    }
  } else {
    error("addToStory(), wrong arguments! Please use: addToStory(story, itemOrString, insertionPointorMode). Parameter insertionPointorMode is optional.");
  }
};

/**
 * @description If no callback function is given it returns a Collection of characters in the container otherwise calls the given callback function with each character of the given document, page, story, textFrame, paragraph, line or word.
 *
 * @cat     Document
 * @subcat  Text
 * @method  characters
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line|Word} container The document, page, story, textFrame, paragraph, line or word instance to  iterate the characters in.
 * @param   {Function} [cb] Optional: The callback function to call with each character. When this function returns false the loop stops. Passed arguments: `character`, `loopCount`
 * @return  {Characters} A collection of Character objects.
 */
pub.characters = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph, Line or Word.";
  return textCollection("characters", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of lines in the container otherwise calls the given callback function with each line of the given document, page, story, textFrame or paragraph.
 *
 * @cat     Document
 * @subcat  Text
 * @method  lines
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph} container The document, page, story, textFrame or paragraph instance to iterate the lines in.
 * @param   {Function} [cb] Optional: The callback function to call with each line. When this function returns false the loop stops. Passed arguments: `line`, `loopCount`.
 * @return  {Lines} A collection of Line objects.
 */
pub.lines = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame or Paragraph.";
  return textCollection("lines", legalContainers, container, cb);

};

/**
 * @description Links the stories of two textframes to one story. Text of first textframe overflows to second one.
 *
 * @cat     Document
 * @subcat  Text
 * @method  linkTextFrames
 *
 * @param   {TextFrame} textFrameA
 * @param   {TextFrame} textFrameB
 */
pub.linkTextFrames = function (textFrameA, textFrameB) {
  if (textFrameA instanceof TextFrame && textFrameB instanceof TextFrame) {
    textFrameA.nextTextFrame = textFrameB;
  } else {
    error("linkTextFrames(), wrong type of parameter! linkTextFrames() needs two textFrame objects to link the stories. Use: textFrameA, textFrameB");
  }
};

/**
 * @description If no callback function is given it returns a Collection of paragraphs in the container otherwise calls the given callback function with each paragraph of the given document, page, story or textFrame.
 *
 * @cat     Document
 * @subcat  Text
 * @method  paragraphs
 *
 * @param   {Document|Page|Story|TextFrame} container The document, story, page or textFrame instance to iterate the paragraphs in.
 * @param   {Function} [cb] Optional: The callback function to call with each paragraph. When this function returns false the loop stops. Passed arguments: `para`, `loopCount`.
 * @return  {Paragraphs} A collection of Paragraph objects.
 */
pub.paragraphs = function(container, cb) {

  var legalContainers = "Document, Story, Page or TextFrame.";
  return textCollection("paragraphs", legalContainers, container, cb);

};

/**
 * @description Fills the given text frame and all linked text frames with random placeholder text. The placeholder text will be added at the end of any already existing text in the text frame.
 *
 * @cat     Document
 * @subcat  Text
 * @method  placeholder
 *
 * @param   {TextFrame} textFrame The text frame to fill.
 * @return  {Text} The inserted placeholder text.
 */
pub.placeholder = function (textFrame) {
  if (textFrame instanceof TextFrame) {
    var startIx = textFrame.parentStory.insertionPoints[-1].index;
    textFrame.contents = TextFrameContents.PLACEHOLDER_TEXT;
    var endIx = textFrame.parentStory.insertionPoints[-1].index - 1;
    return textFrame.parentStory.characters.itemByRange(startIx, endIx);
  } else {
    error("placeholder(), wrong type of parameter! Use: textFrame");
  }
};

/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function with each story of the given document.
 *
 * @cat     Document
 * @subcat  Text
 * @method  stories
 *
 * @param   {Document} doc The document instance to iterate the stories in
 * @param   {Function} [cb] The callback function to call with each story. When this function returns `false` the loop stops. Passed arguments: `story`, `loopCount`.
 * @return  {Stories} A collection of Story objects.
 *
 * @example
 * stories(doc(), function(story, loopCount){
 *   println("Number of words in each Story:");
 *   println(story.words.length);
 * });
 */
pub.stories = function(doc, cb) {

  checkNull(doc);

  if(arguments.length === 1 && doc instanceof Document) {
    return doc.stories;
  } else if (cb instanceof Function) {
    return forEach(doc.stories, cb);
  }
  error("stories(), incorrect call. Wrong parameters!");
  return null;
};

/**
 * @description If no callback function is given it returns a Collection of words in the container otherwise calls the given callback function with each word of the given document, page, story, textFrame, paragraph or line.
 *
 * @cat     Document
 * @subcat  Text
 * @method  words
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line} container The document, page, story, textFrame, paragraph or line instance to iterate the words in.
 * @param   {Function} [cb] The callback function to call with each word. When this function returns false the loop stops. Passed arguments: `word`, `loopCount`.
 * @return  {Words} A collection of Word objects.
 */
pub.words = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph or Line.";
  return textCollection("words", legalContainers, container, cb);

};

// ----------------------------------------
// Document Private
// ----------------------------------------

var forEachTextCollection = function(container, collection, cb) {
  // var collection;
  if(container instanceof Document) {
    collection = container.stories.everyItem()[collection];
  } else {
    collection = container.textFrames.everyItem()[collection];
  }

  for (var i = 0; i < collection.length; i++) {
    if(cb(collection[i], i) === false) {
      return false;
    }
  }
  return true;
};

var getPage = function(page, parentFunctionName) {
  // get a page by number, name, page object or page item, without jumping to the page
  if(isNumber(page)) {
    // target page by document offset
    if(isInteger(page) && page > 0 && page <= currentDoc().pages.length) {
      return currentDoc().pages[page - 1];
    } else {
      error(parentFunctionName + "(), page " + page + " does not exist.");
    }
  } else if(isString(page)) {
    // target page by name
    if(currentDoc().pages.item(page).isValid) {
      return currentDoc().pages.item(page);
    } else {
      error(parentFunctionName + "(), the page \"" + page + "\" does not exist.");
    }
  } else if(page instanceof Page) {
    // target page object
    return page;
  } else if (page.hasOwnProperty("parentPage")) {
    // target page via page item
    if(page.parentPage === null) {
      // page item is on the pasteboard, return first page of spread
      while(!(page.parent instanceof Spread)) {
        if(page.parent instanceof Character) {
          // anchored page item
          page = page.parent.parentTextFrames[0];
        } else {
          // nested page item
          page = page.parent;
        }
      }
      return page.parent.pages[0];
    } else {
      return page.parentPage;
    }
  } else {
    // TODO make this message work for all parent functions
    error(parentFunctionName + "(), invalid parameter. Use page number, page name, page object or a page item.");
  }

}

var getAndUpdatePage = function(page, parentFunctionName) {

    currPage = getPage(page, parentFunctionName)
    updatePublicPageSizeVars();
    if (currentDoc().windows.length) {
      // focus GUI on new page, if not in HIDDEN mode
      app.activeWindow.activePage = currPage;
    }

}

var getMasterSpread = function(master, parentFunctionName) {

  if(isString(master)) {

    var ms = currentDoc().masterSpreads;

    if(master.indexOf("-") > 0) {
      // full name is presumably given
      for (var i = 0; i < ms.length; i++) {
        if(ms[i].name === master) {
          master = ms[i];
          break;
        }
      }
    }

    if(isString(master) && master.length <= 4) {
      // suffix is given
      for (var j = 0; j < ms.length; j++) {
        if(ms[j].namePrefix === master) {
          master = ms[j];
          break;
        }
      }
    }

    if(isString(master)) {
      var prefixErrorMsg = master.length <= 4 ? "or with prefix \"" + master + "\" " : "";
      error(parentFunctionName + "(), the master page named \"" + master + "\" " + prefixErrorMsg + "does not exist.");
    }

  }

  if(!(master instanceof MasterSpread)) {
    error(parentFunctionName + "(), invalid master parameter! Use full master page name, master page prefix or master spread object.");
  }

  return master;
}

var textCollection = function(collection, legalContainers, container, cb) {

  checkNull(container);

  if(!(container.hasOwnProperty("contents") || container instanceof Document || container instanceof Page)) {
    error(collection + "(), wrong object type. Use: " + legalContainers);
  }

  if(cb instanceof Function) {
    // callback function is passed
    if (container instanceof Document || container instanceof Page) {
      return forEachTextCollection(container, collection, cb);
    }
    return forEach(container[collection], cb);

  }
    // no callback function is passed
  if(container instanceof Document) {
    return container.stories.everyItem()[collection];
  } else if (container instanceof Page) {
    return container.textFrames.everyItem()[collection];
  }
  return container[collection];


};

// ----------------------------------------
// src/includes/environment.js
// ----------------------------------------

// ----------------------------------------
// Environment
// ----------------------------------------

/**
 * @description Suspends the calling thread for a number of milliseconds.
 * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
 *
 * @cat     Environment
 * @method  delay
 *
 * @param   {Number} milliseconds The delay time in milliseconds.
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};

/**
 * @description Sets the framerate per second to determine how often `loop()` is called per second. If the processor is not fast enough to maintain the specified rate, the frame rate will not be achieved. Setting the frame rate within `setup()` is recommended. The default rate is 25 frames per second. Calling `frameRate()` with no arguments returns the currently set framerate.
 *
 * @cat     Environment
 * @method  frameRate
 *
 * @param   {Number} [fps] Frames per second.
 * @return  {Number} Currently set frame rate.
 */
pub.frameRate = function(fps) {
  if(arguments.length) {
    if(!isNumber(fps) || fps <= 0) {
      error("frameRate(), invalid argument. Use a number greater than 0.")
    }

    currFrameRate = fps;
    if(currIdleTask) {
      currIdleTask.sleep = Math.ceil(1000 / fps);
    }
  }
  return currFrameRate;
};

/**
 * @description System variable which stores the height of the current page.
 *
 * @cat      Environment
 * @property {Number} height Height of the current page.
 */
pub.height = null;

/**
 * @description Inspects a given object or any other data item and prints the result to the console. This is useful for inspecting or debugging any kind of variable or data item. The optional settings object allows to control the function's output. The following parameters can be set in the settings object:
 * - `showProps`: Show or hide properties. Default: `true`
 * - `showValues`: Show or hide values. Default: `true`
 * - `showMethods`: Show or hide methods. Default: `false`
 * - `maxLevel`: Chooses how many levels of properties should be inspected recursively. Default: `1`
 * - `propList`: Allows to pass an array of property names to show. If `propList` is not set all properties will be shown. Default: `[]` (no propList)
 * If no settings object is set, the default values will be used.
 *
 * @cat     Environment
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

/**
 * @description Print numerous information about the current environment to the console.
 *
 * @cat     Environment
 * @method  printInfo
 */
pub.printInfo = function() {

  pub.println("###");
  pub.println("OS: " + $.os);
  pub.println("ExtendScript Build: " + $.build);
  pub.println("ExtendScript Version:" + $.version);
  pub.println("Engine: " + $.engineName);
  pub.println("memCache: " + $.memCache + " bytes");
  pub.println("###");

};

/**
 * @description Get the folder of the active document as a Folder object. Use .absoluteURI to access a string representation of the folder path.
 *
 * @cat     Environment
 * @method  projectFolder
 *
 * @return  {Folder} The folder of the the active document
 */
pub.projectFolder = function() {
  if(!currentDoc().saved) {
    error("The current document must be saved before its project directory can be accessed.");
  }
  return currentDoc().filePath;
};

/**
 * @description Sets a property of an object or of any other given data item to the specified value. Alternatively an object of key value pairs can be used as the second argument to set several properties to specified values at once. To retrieve a list of available properties for the different data types, the inspect() method can be used.
 *
 * @cat     Environment
 * @method  property
 *
 * @param   {Any} obj An object or any other data item whose properties to change.
 * @param   {String|Object} prop A string describing an object's property or alternatively an object containing key value pairs.
 * @param   {Any} [value] A value of the appropriate type to set the object's property to.
 * @return  {Any} The object or other data item with the newly set property.
 *
 * @example <caption>Sets name and fill color of an ellipse</caption>
 * var ell = ellipse(100, 100, 50, 50);
 * property(ell, "name", "Red Circle");
 * property(ell, "fillColor", color(255, 0, 0));
 *
 * @example <caption>Sets name and fill color of a rectangle and locks it, using an object with key value pairs</caption>
 * var blueSquare = rect(100, 100, 50, 50);
 * var squareProps = {
 *   name: "Blue Square",
 *   fillColor: color(0, 0, 255),
 *   locked: true
 * }
 * property(blueSquare, squareProps);
 */
pub.property = function(obj, prop, value) {

  if(obj === null || obj === undefined) {
    error("property(), given object is undefined or does not exist.");
  }

  if(obj.hasOwnProperty(isValid) && !obj.isValid) {
    error("property(), object does not exist.");
  }

  if(isString(prop)) {

    if(!obj.hasOwnProperty(prop)) {
      error("property(), invalid property. The given " + (obj.constructor.name).toLowerCase() + " does not have a property \"" + prop + "\".");
    }

    try {
      obj[prop] = value;
    } catch(e) {
      error("property(), invalid arguments.\n" +
            "(" + obj + ", \"" + prop + "\", " + value + ");\n\n" +
            e.message);
    }

  } else if(prop instanceof Object) {

    for(var key in prop) {
      pub.property(obj, key, prop[key]);
    }

  } else {
    error("property(), invalid second argument. Use property name string or an object with key value pairs.");
  }

  return obj;
};

/**
 * @description Sets the size of the current document, if arguments are given. If only one argument is given, both the width and the height are set to this value. Alternatively, a string can be given as the first argument to apply an existing page size preset (`"A4"`, `"Letter"` etc.). In this case, either `PORTRAIT` or `LANDSCAPE` can be used as a second argument to determine the orientation of the page. If no argument is given, an object containing the current document's width and height is returned.
 *
 * @cat     Environment
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
 * @description System variable which stores the width of the current page.
 *
 * @cat      Environment
 * @property {Number} width Width of the current page.
 */
pub.width = null;

// ----------------------------------------
// Environment/Constants
// ----------------------------------------

/**
 * @description The name of the current script.
 *
 * @cat      Environment
 * @subcat   Constants
 * @property SCRIPTNAME {String}
 */
var stackArray = $.stack.
            replace(/[\n]toString\(\)[\n]$/,'').
            replace(/[\[\]']+/g,'').
            split(/[\n]/);
pub.SCRIPTNAME = stackArray[0] === "jsRunner.jsx" ? stackArray[1] : stackArray[0];

/**
 * @description The basil version
 *
 * @cat      Environment
 * @subcat   Constants
 * @property VERSION {String}
 */
pub.VERSION = "1.1.0";

// ----------------------------------------
// src/includes/image.js
// ----------------------------------------

// ----------------------------------------
// Image
// ----------------------------------------

/**
 * @description Adds an image to the document. If the image argument is given as a string the image file must be in the document's data directory which is in the same directory where the document is saved in. The image argument can also be a File instance which can be placed even before the document was saved. The second argument can either be the `x` position of the frame to create or an instance of a rectangle, oval or polygon to place the image in. If an `x` position is given, a `y` position must be given, too. If `x` and `y` positions are given and width and height are not given, the frame's size gets set to the original image size.
 *
 * @cat     Image
 * @method  image
 *
 * @param   {String|File} img The image file name in the document's data directory or a File instance.
 * @param   {Number|Rectangle|Oval|Polygon|TextFrame} x The `x` position on the current page or the item instance to place the image in.
 * @param   {Number} [y] The `y` position on the current page. Ignored if `x` is not a number.
 * @param   {Number} [w] The width of the rectangle to add the image to. Ignored if `x` is not a number.
 * @param   {Number} [h] The height of the rectangle to add the image to. Ignored if `x` is not a number.
 * @return  {Rectangle|Oval|Polygon} The item instance the image was placed in.
 */
pub.image = function(img, x, y, w, h) {
  var file = initDataFile(img),
    frame = null,
    styleFrame = true,
    fitOptions = FitOptions.FILL_PROPORTIONALLY,
    width = null,
    height = null,
    imgErrorMsg = "image(), wrong parameters. Use:\n"
      + "image( {String|File}, {Rectangle|Oval|Polygon|TextFrame} ) or\n"
      + "image( {String|File}, x, y ) or\n"
      + "image( {String|File}, x, y, w, h )";

  if(arguments.length < 2 || arguments.length === 4 || arguments.length > 5) {
    error(imgErrorMsg);
  }

  if (x instanceof Rectangle ||
      x instanceof Oval ||
      x instanceof Polygon ||
      x instanceof TextFrame) {
    frame = x;
    styleFrame = false;
  } else if (isNumber(x) && isNumber(y)) {
    width = 1;
    height = 1;
    if (currImageMode === pub.CORNERS) {
      if (isNumber(w) && isNumber(h)) {
        width = w - x;
        height = h - y;
        fitOptions = FitOptions.FILL_PROPORTIONALLY;
      } else if (arguments.length === 3) {
        fitOptions = FitOptions.FitOptions.FRAME_TO_CONTENT;
      } else {
        error(imgErrorMsg);
      }
    } else {
      if (isNumber(w) && isNumber(h)) {
        if (w <= 0 || h <= 0) {
          error("image(), invalid parameters. When using image(img, x, y, w, h) with the default imageMode CORNER, parameters w and h need to be greater than 0.");
        }
        width = w;
        height = h;
        fitOptions = FitOptions.FILL_PROPORTIONALLY;
      } else if (arguments.length === 3) {
        fitOptions = FitOptions.FRAME_TO_CONTENT;
      } else {
        error(imgErrorMsg);
      }
    }

    frame = currentPage().rectangles.add(currentLayer(),
      {geometricBounds:[y, x, y + height, x + width]}
    );
  } else {
    error(imgErrorMsg);
  }

  frame.place(file);
  frame.fit(fitOptions);

  if(styleFrame) {
    if (currImageMode === pub.CENTER) {
      var bounds = frame.geometricBounds;
      width = bounds[3] - bounds[1];
      height = bounds[2] - bounds[0];
      frame.move(null, [-(width / 2), -(height / 2)]);
      frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix(x, y));
    } else {
      frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix(x, y));
    }

    frame.strokeWeight = currStrokeWeight;
    frame.strokeTint = currStrokeTint;
    frame.strokeColor = currStrokeColor;
  }


  return frame;
};

/**
 * @description Modifies the location from which images draw. The default mode is `CORNER`, which specifies the location to be the upper left corner and uses the fourth and fifth parameters of `image()` to set the image's width and height. The syntax `imageMode(CORNERS)` uses the second and third parameters of `image()` to set the location of one corner of the image and uses the fourth and fifth parameters to set the opposite corner. Use `imageMode(CENTER)` to draw images centered at the given `x` and `y` position. If no parameter is passed the currently set mode is returned as String.
 *
 * @cat     Image
 * @method  imageMode
 *
 * @param   {String} [mode] Either `CORNER`, `CORNERS`, or `CENTER`.
 * @return  {String} The current mode.
 */
pub.imageMode = function(mode) {
  if (arguments.length === 0) return currImageMode;

  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER) {
    currImageMode = mode;
  } else {
    error("imageMode(), unsupported imageMode. Use: CORNER, CORNERS, CENTER.");
  }
  return currImageMode;
};

// ----------------------------------------
// src/includes/input.js
// ----------------------------------------

// ----------------------------------------
// Input
// ----------------------------------------

/**
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
 * @description Reads the contents of a file or loads an URL into a String. If the file is specified by name as String, it must be located in the document's data directory.
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
 * @description Reads the contents of a file or loads an URL and creates a string array of its individual lines. If the file is specified by name as string, it must be located in the document's data directory.
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

  var result = null;
  if (file instanceof File) {
    result = file;
  } else {
    result = new File(pub.projectFolder().absoluteURI + "/data/" + file);
  }
  if (!result.exists) {
    error(getParentFunctionName(1) + "(), could not load file. The file \"" + result + "\" does not exist.");
  }
  return result;
};

// ----------------------------------------
// src/includes/math.js
// ----------------------------------------
/* global precision */

// ----------------------------------------
// Math/Calculation
// ----------------------------------------

/**
 * @description Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  abs
 *
 * @param   {Number} val A number.
 * @return  {Number} The absolute value of that number.
 */
pub.abs = Math.abs;

/**
 * @description Calculates the closest integer value that is greater than or equal to the value of the parameter. For example, `ceil(9.03)` returns the value `10`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  ceil
 *
 * @param   {Number} val An arbitrary number.
 * @return  {Number} The next highest integer value.
 */
pub.ceil = Math.ceil;

/**
 * @description Constrains a value to not exceed a maximum and minimum value.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  constrain
 *
 * @param   {Number} aNumber The value to constrain.
 * @param   {Number} aMin Minimum limit.
 * @param   {Number} aMax Maximum limit.
 * @return  {Number} The constrained value.
 */
pub.constrain = function(aNumber, aMin, aMax) {
  if(arguments.length !== 3) error("constrain(), wrong argument count.");
  if(aNumber <= aMin) return aMin;
  if(aNumber >= aMax) return aMax;
  return aNumber;
};

/**
 * @description Calculates the distance between two points.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  dist
 *
 * @param   {Number} x1 The x-coordinate of the first point.
 * @param   {Number} y1 The y-coordinate of the first point.
 * @param   {Number} x2 The x-coordinate of the second point.
 * @param   {Number} y2 The y-coordinate of the second point.
 * @return  {Number} The distance.
 */
pub.dist = function() {
  var dx, dy, dz;
  if (arguments.length === 4) {
    dx = arguments[0] - arguments[2];
    dy = arguments[1] - arguments[3];
    return Math.sqrt(dx * dx + dy * dy);
  } else {
    error("dist(), wrong argument count.");
  }
};

/**
 * @description The `exp()` function returns `ex`, where `x` is the argument, and `e` is Euler's number (also known as Napier's constant), the base of the natural logarithms.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  exp
 *
 * @param   {Number} x A number.
 * @return  {Number} A number representing `ex`.
 */
pub.exp = Math.exp;

/**
 * @description Calculates the closest integer value that is less than or equal to the value of the parameter.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  floor
 *
 * @param   {Number} a A number.
 * @return  {Number} Integer number.
 */
pub.floor = Math.floor;

/**
 * @description Calculates a number between two numbers at a specific increment. The `amt` parameter is the amount to interpolate between the two values where `0.0` is equal to the first point, `0.1` is very near the first point, `0.5` is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  lerp
 *
 * @param   {Number} value1 First value.
 * @param   {Number} value2 Second value.
 * @param   {Number} amt Amount between 0.0 and 1.0.
 * @return  {Number} The mapped value.
 */
pub.lerp = function(value1, value2, amt) {
  if(arguments.length !== 3) error("lerp(), wrong argument count.");
  return (value2 - value1) * amt + value1;
};

/**
 * @description Calculates the natural logarithm (the base-e logarithm) of a number. This function expects the values greater than `0`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  log
 *
 * @param   {Number} x A number, must be greater than `0`.
 * @return  {Number} The natural logarithm.
 */
pub.log = Math.log;

/**
 * @description Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly used in computer graphics and linear algebra. Because it has no "start" position, the magnitude of a vector can be thought of as the distance from coordinate `(0,0)` to its `(x,y)` value. Therefore, `mag()` is a shortcut for writing `dist(0, 0, x, y)`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  mag
 *
 * @param   {Number} x Coordinate.
 * @param   {Number} y Coordinate.
 * @param   {Number} [z] Coordinate, optional.
 * @return  {Number} The magnitude.
 */
pub.mag = function(a, b, c) {
  if(!(arguments.length === 2 || arguments.length === 3)) error("mag(), wrong argument count.");
  if (c) return Math.sqrt(a * a + b * b + c * c);
  return Math.sqrt(a * a + b * b);
};

/**
 * @description Re-maps a number from one range to another.
 * Numbers outside the range are not clamped to `0` and `1`, because out-of-range values are often intentional and useful.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  map
 *
 * @param   {Number} value The value to be mapped.
 * @param   {Number} istart The start of the input range.
 * @param   {Number} istop The end of the input range.
 * @param   {Number} ostart The start of the output range.
 * @param   {Number} ostop The end of the output range.
 * @return  {Number} The mapped value.
 */
pub.map = function(value, istart, istop, ostart, ostop) {
  if(arguments.length !== 5) error("map(), wrong argument count. Use: map(value, istart, istop, ostart, ostop)");
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

/**
 * @description Determines the largest value in a sequence of numbers.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  max
 *
 * @param   {Number|Array} a A value or an array of Numbers.
 * @param   {Number} [b] Another value to be compared.
 * @param   {Number} [c] Another value to be compared.
 * @return  {Number} The highest value.
 */
pub.max = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("max(), non-empty array is expected");
  var max = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (max < numbers[i]) max = numbers[i];
  return max;
};

/**
 * @description Determines the smallest value in a sequence of numbers.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  min
 *
 * @param   {Number|Array} a A value or an array of Numbers.
 * @param   {Number} [b] Another value to be compared.
 * @param   {Number} [c] Another value to be compared.
 * @return  {Number} The lowest value.
 */
pub.min = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("min(), non-empty array is expected");
  var min = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (min > numbers[i]) min = numbers[i];
  return min;
};

/**
 * @description Normalizes a number from another range into a value between `0` and `1`.
 * Identical to `map(value, low, high, 0, 1);`
 * Numbers outside the range are not clamped to `0` and `1`, because out-of-range values are often intentional and useful.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  norm
 *
 * @param   {Number} aNumber The value to be normed.
 * @param   {Number} low The lowest value to be expected.
 * @param   {Number} high The highest value to be expected.
 * @return  {Number} The normalized value.
 */
pub.norm = function(aNumber, low, high) {
  if(arguments.length !== 3) error("norm(), wrong argument count.");
  return (aNumber - low) / (high - low);
};

/**
 * @description Facilitates exponential expressions. The `pow()` function is an efficient way of multiplying numbers by themselves (or their reciprocal) in large quantities. For example, `pow(3, 5)` is equivalent to the expression `3 * 3 * 3 * 3 * 3` and `pow(3, -5)` is equivalent to `1 / 3 * 3 * 3 * 3 * 3`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  pow
 *
 * @param   {Number} num Base of the exponential expression.
 * @param   {Number} exponent Power of which to raise the base.
 * @return  {Number} the result
 */
pub.pow = Math.pow;

/**
 * @description Calculates the integer closest to the value parameter. For example, `round(9.2)` returns the value `9`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  round
 *
 * @param   {Number} value The value to be rounded.
 * @return  {Number} The rounded value.
 */
pub.round = Math.round;

/**
 * @description Squares a number (multiplies a number by itself). The result is always a positive number, as multiplying two negative numbers always yields a positive result. For example, `-1 * -1 = 1`.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  sq
 *
 * @param   {Number} aNumber The value to be squared.
 * @return  {Number} Squared number.
 */
pub.sq = function(aNumber) {
  if(arguments.length !== 1) error("sq(), wrong argument count.");
  return aNumber * aNumber;
};

/**
 * @description Calculates the square root of a number. The square root of a number is always positive, even though there may be a valid negative root. The square root s of number a is such that `s * s = a`. It is the opposite of squaring.
 *
 * @cat     Math
 * @subcat  Calculation
 * @method  sqrt
 *
 * @param   {Number} val A value.
 * @return  {Number} Square root.
 */
pub.sqrt = Math.sqrt;

// ----------------------------------------
// Math/Random
// ----------------------------------------

/**
 * @description Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more natural ordered, harmonic succession of numbers compared to the standard `random()` function. It was invented by Ken Perlin in the 1980s and been used since in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.
 *
 * The main difference to the `random()` function is that Perlin noise is defined in an infinite n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value (fixed only for the lifespan of the program). The resulting value will always be between `0` and `1`. basil.js can compute 1D, 2D and 3D noise, depending on the number of coordinates given. The noise value can be animated by moving through the noise space. The 2nd and 3rd dimension can also be interpreted as time.
 *
 * The actual noise is structured similar to an audio signal, in respect to the function's use of frequencies. Similar to the concept of harmonics in physics, perlin noise is computed over several octaves which are added together for the final result.
 *
 * Another way to adjust the character of the resulting sequence is the scale of the input coordinates. As the function works within an infinite space the value of the coordinates doesn't matter as such, only the distance between successive coordinates does (eg. when using `noise()` within a loop). As a general rule the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of `0.005`- `0.03` work best for most applications, but this will differ depending on use.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noise
 *
 * @param   {Number} x Coordinate in x space.
 * @param   {Number} [y] Coordinate in y space.
 * @param   {Number} [z] Coordinate in z space.
 * @return  {Number} The noise value.
 */
pub.noise = function(x, y, z) {
  if (noiseProfile.generator === undefined) noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
  var generator = noiseProfile.generator;
  var effect = 1,
    k = 1,
    sum = 0;
  for (var i = 0; i < noiseProfile.octaves; ++i) {
    effect *= noiseProfile.fallout;
    switch (arguments.length) {
      case 1:
        sum += effect * (1 + generator.noise1d(k * x)) / 2;
        break;
      case 2:
        sum += effect * (1 + generator.noise2d(k * x, k * y)) / 2;
        break;
      case 3:
        sum += effect * (1 + generator.noise3d(k * x, k * y, k * z)) / 2;
        break;
    }
    k *= 2;
  }
  return sum;
};

/**
 * @description Adjusts the character and level of detail produced by the Perlin noise function. Similar to harmonics in physics, noise is computed over several octaves. Lower octaves contribute more to the output signal and as such define the overal intensity of the noise, whereas higher octaves create finer grained details in the noise sequence. By default, noise is computed over 4 octaves with each octave contributing exactly half than its predecessor, starting at 50% strength for the 1st octave. This falloff amount can be changed by adding an additional function parameter. Eg. a falloff factor of `0.75` means each octave will now have 75% impact (25% less) of the previous lower octave. Any value between `0` and `1` is valid, however note that values greater than `0.5` might result in greater than `1` values returned by `noise()`.
 *
 * By changing these parameters, the signal created by the `noise()` function can be adapted to fit very specific needs and characteristics.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noiseDetail
 *
 * @param   {Number} octaves Number of octaves to be used by the noise() function.
 * @param   {Number} fallout Falloff factor for each octave.
 */
pub.noiseDetail = function(octaves, fallout) {
  noiseProfile.octaves = octaves;
  if (fallout !== undefined) noiseProfile.fallout = fallout;
};

/**
 * @description Sets the seed value for `noise()`. By default, `noise()` produces different results each time the program is run. Set the value parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * @cat     Math
 * @subcat  Random
 * @method  noiseSeed
 *
 * @param   {Number} seed Noise seed value.
 */
pub.noiseSeed = function(seed) {
  noiseProfile.seed = seed;
  noiseProfile.generator = undefined;
};

/**
 * @description Generates random numbers. Each time the `random()` function is called, it returns an unexpected value within the specified range. If one parameter is passed to the function it will return a float between zero and the value of the high parameter. The function call `random(5)` returns values between `0` and `5`. If two parameters are passed, it will return a float with a value between the the parameters. The function call `random(-5, 10.2)` returns values between `-5` and `10.2`.
 * One parameter sets the range from `0` to the given parameter, while with two parameters present you set the range from `val1` to `val2`.
 *
 * @cat     Math
 * @subcat  Random
 * @method  random
 *
 * @param   {Number} [low] The low border of the range.
 * @param   {Number} [high] The high border of the range.
 * @return  {Number} A random number.
 */
pub.random = function() {
  if (arguments.length === 0) return currentRandom();
  if (arguments.length === 1) return currentRandom() * arguments[0];
  var aMin = arguments[0],
    aMax = arguments[1];
  return currentRandom() * (aMax - aMin) + aMin;
};

/**
 * @description Sets the seed value for `random()`.
 * By default, `random()` produces different results each time the program is run. Set the seed parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * @cat     Math
 * @subcat  Random
 * @method  randomSeed
 *
 * @param   {Number} seed The seed value.
 */
pub.randomSeed = function(seed) {
  currentRandom = (new Marsaglia(seed)).nextDouble;
};

// ----------------------------------------
// Math/Trigonometry
// ----------------------------------------

/**
 * @description The inverse of `cos()`, returns the arc cosine of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  acos
 *
 * @param   {Number} value The value whose arc cosine is to be returned.
 * @return  {Number} The arc cosine.
 */
pub.acos = Math.acos;

/**
 * @description The inverse of `sin()`, returns the arc sine of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  asin
 *
 * @param   {Number} value The value whose arc sine is to be returned.
 * @return  {Number} The arc sine.
 */
pub.asin = Math.asin;

/**
 * @description The inverse of `tan()`, returns the arc tangent of a value. This function expects the values in the range of `-1` to `1` and values are returned in the range `0` to `PI` (`3.1415927`).
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  atan
 *
 * @param   {Number} value The value whose arc tangent is to be returned.
 * @return  {Number} The arc tangent.
 */
pub.atan = Math.atan;

/**
 * @description Calculates the angle (in radians) from a specified point to the coordinate origin as measured from the positive x-axis. Values are returned as a float in the range from `PI` to `-PI`. The `atan2()` function is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  atan2
 *
 * @param   {Number} y The y coordinate.
 * @param   {Number} x The x coordinate.
 * @return  {Number} The atan2 value.
 */
pub.atan2 = Math.atan2;

/**
 * @description Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `PI * 2`). Values are returned in the range `-1` to `1`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  cos
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The cosine.
 */
pub.cos = Math.cos;

/**
 * @description Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and `2 * PI` radians in a circle. For example, `90° = PI / 2 = 1.5707964`. All trigonometric methods in basil require their parameters to be specified in radians.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  degrees
 *
 * @param   {Number} aAngle An angle in radians.
 * @return  {Number} The given angle in degree.
 */
pub.degrees = function(aAngle) {
  return aAngle * 180 / Math.PI;
};

/**
 * @description Converts a degree measurement to its corresponding value in radians. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and `2 * PI` radians in a circle. For example, `90° = PI / 2 = 1.5707964`. All trigonometric methods in basil require their parameters to be specified in radians.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  radians
 *
 * @param   {Number} aAngle An angle in degree.
 * @return  {Number} The given angle in radians.
 */
pub.radians = function(aAngle) {
  return aAngle / 180 * Math.PI;
};

/**
 * @description Calculates the sine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `6.28`). Values are returned in the range `-1` to `1`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  sin
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The sine value.
 */
pub.sin = Math.sin;

/**
 * @description Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from `0` to `PI * 2`). Values are returned in the range `infinity` to `-infinity`.
 *
 * @cat     Math
 * @subcat  Trigonometry
 * @method  tan
 *
 * @param   {Number} rad A value in radians.
 * @return  {Number} The tangent value.
 */
pub.tan = Math.tan;

// ----------------------------------------
// Math/Vector
// ----------------------------------------

var Vector = pub.Vector = function() {

  /**
   * @description A class to describe a two or three dimensional vector. This data type stores two or three variables that are commonly used as a position, velocity, and/or acceleration. Technically, position is a point and velocity and acceleration are vectors, but this is often simplified to consider all three as vectors. For example, if you consider a rectangle moving across the screen, at any given instant it has a position (the object's location, expressed as a point.), a velocity (the rate at which the object's position changes per time unit, expressed as a vector), and acceleration (the rate at which the object's velocity changes per time unit, expressed as a vector). Since vectors represent groupings of values, we cannot simply use traditional addition/multiplication/etc. Instead, we'll need to do some "vector" math, which is made easy by the methods inside the Vector class.
   *
   * Constructor of Vector, can be two- or three-dimensional.
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector
   *
   * @param   {Number} x The first vector.
   * @param   {Number} y The second vector.
   * @param   {Number} [z] The third vector.
   * @class
   */
  function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  /**
   * @description Static function. Calculates the angle between two vectors. Is meant to be called "static" i.e. `Vector.angleBetween(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.angleBetween
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The angle.
   * @static
   */
  Vector.angleBetween = function(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };

  /**
   * @description Static function. Calculates the cross product of two vectors. Is meant to be called "static" i.e. `Vector.cross(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.cross
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The cross product.
   * @static
   */
  Vector.cross = function(v1, v2) {
    return v1.cross(v2);
  };

  /**
   * @description Static function. Calculates the Euclidean distance between two points (considering a point as a vector object). Is meant to be called "static" i.e. `Vector.dist(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.dist
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The distance.
   * @static
   */
  Vector.dist = function(v1, v2) {
    return v1.dist(v2);
  };

  /**
   * @description Static function. Calculates the dot product of two vectors. Is meant to be called "static" i.e. `Vector.dot(v1, v2);`
   *
   * @cat     Math
   * @subcat  Vector
   * @method  Vector.dot
   *
   * @param   {Vector} v1 The first vector.
   * @param   {Vector} v2 The second vector.
   * @return  {Number} The dot product.
   * @static
   */
  Vector.dot = function(v1, v2) {
    return v1.dot(v2);
  };

  Vector.prototype = {

    /**
     * @description Adds `x`, `y`, and `z` components to a vector, adds one vector to another.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.add
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    add: function(v, y, z) {
      if (arguments.length === 1) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      } else {
        this.x += v;
        this.y += y;
        this.z += z;
      }
    },

    /**
     * @description Returns this vector as an array `[x,y,z]`.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.array
     *
     * @return  {Array} The `x`, `y` and `z` components as an array of `[x,y,z]`.
     */
    array: function() {
      return [this.x, this.y, this.z];
    },

    /**
     * @description Calculates the cross product from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.cross
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The cross product.
     */
    cross: function(v) {
      var x = this.x,
        y = this.y,
        z = this.z;
      return new Vector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y);
    },

    /**
     * @description Calculates the distance from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.dist
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The distance.
     */
    dist: function(v) {
      var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    /**
     * @description Divides this vector through `x`, `y`, and `z` components or another vector.`
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.div
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    div: function(v) {
      if (typeof v === "number") {
        this.x /= v;
        this.y /= v;
        this.z /= v;
      } else {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
      }
    },

    /**
     * @description Calculates the dot product from this vector to another as `x`, `y`, and `z` components or full vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.dot
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     * @return  {Number} The dot product.
     */
    dot: function(v, y, z) {
      if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
      return this.x * v + this.y * y + this.z * z;
    },

    /**
     * @description Gets a copy of the vector, returns a Vector object.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.get
     *
     * @return  {Vector} A copy of the vector.
     */
    get: function() {
      return new Vector(this.x, this.y, this.z);
    },

    /**
     * @description The 2D orientation (heading) of this vector in radian.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.heading
     *
     * @return  {Number} A radian angle value.
     */
    heading: function() {
      return -Math.atan2(-this.y, this.x);
    },

    /**
     * @description Normalizes the length of this vector to the given parameter.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.limit
     *
     * @param   {Number} high The value to scale to.
     */
    limit: function(high) {
      if (this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
    },

    /**
     * @description Calculates the magnitude (length) of the vector and returns the result as a float
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.mag
     *
     * @return  {Number} The length.
     */
    mag: function() {
      var x = this.x,
        y = this.y,
        z = this.z;
      return Math.sqrt(x * x + y * y + z * z);
    },

    /**
     * @description Multiplies this vector with `x`, `y`, and `z` components or another vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.mult
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    mult: function(v) {
      if (typeof v === "number") {
        this.x *= v;
        this.y *= v;
        this.z *= v;
      } else {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
      }
    },

    /**
     * @description Normalizes the length of this vector to 1.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.normalize
     */
    normalize: function() {
      var m = this.mag();
      if (m > 0) this.div(m);
    },

    /**
     * @description Sets the `x`, `y`, and `z` component of the vector using three separate variables, the data from a Vector, or the values from a float array.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.set
     *
     * @param   {Number|Array|Vector} v Either a vector, array or `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    set: function(v, y, z) {
      if (arguments.length === 1) this.set(v.x || v[0] || 0, v.y || v[1] || 0, v.z || v[2] || 0);
      else {
        this.x = v;
        this.y = y;
        this.z = z;
      }
    },

    /**
     * @description Substract `x`, `y`, and `z` components or a full vector from this vector.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.sub
     *
     * @param   {Vector|Number} v Either a full vector or an `x` component.
     * @param   {Number} [y] The `y` component.
     * @param   {Number} [z] The `z` component.
     */
    sub: function(v, y, z) {
      if (arguments.length === 1) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
      } else {
        this.x -= v;
        this.y -= y;
        this.z -= z;
      }
    },

    /**
     * @description Returns data about this vector as a string.
     *
     * @cat     Math
     * @subcat  Vector
     * @method  Vector.toString
     *
     * @return  {String} The `x`, `y` and `z` components as a string.
     */
    toString: function() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    }
  };

  function createVectorMethod(method) {
    return function(v1, v2) {
      var v = v1.get();
      v[method](v2);
      return v;
    };
  }
  for (var method in Vector.prototype) if (Vector.prototype.hasOwnProperty(method) && !Vector.hasOwnProperty(method)) Vector[method] = createVectorMethod(method);
  return Vector;
}();

// ----------------------------------------
// Math/Constants
// ----------------------------------------

/**
 * @description Epsilon
 *
 * @cat      Math
 * @subcat   Constants
 * @property EPSILON {Number}
 */
pub.EPSILON = 10e-12;

/**
 * @description Half Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property HALF_PI {Number}
 */
pub.HALF_PI = Math.PI / 2;

/**
 * @description Kappa
 *
 * @cat      Math
 * @subcat   Constants
 * @property KAPPA {Number}
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
pub.KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);

/**
 * @description Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property PI {Number}
 */
pub.PI = Math.PI;

/**
 * @description Quarter Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property QUARTER_PI {Number}
 */
pub.QUARTER_PI = Math.PI / 4;

/**
 * @description Sin Cos Length
 *
 * @cat      Math
 * @subcat   Constants
 * @property SINCOS_LENGTH {Number}
 */
pub.SINCOS_LENGTH = 720;

/**
 * @description Two Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property TWO_PI {Number}
 */
pub.TWO_PI = Math.PI * 2;

// ----------------------------------------
// Math Private
// ----------------------------------------

var currentRandom = Math.random;

function Marsaglia(i1, i2) {
  var z = i1 || 362436069,
    w = i2 || 521288629;
  var nextInt = function() {
    z = 36969 * (z & 65535) + (z >>> 16) & 4294967295;
    w = 18E3 * (w & 65535) + (w >>> 16) & 4294967295;
    return ((z & 65535) << 16 | w & 65535) & 4294967295;
  };
  this.nextDouble = function() {
    var i = nextInt() / 4294967296;
    return i < 0 ? 1 + i : i;
  };
  this.nextInt = nextInt;
}
Marsaglia.createRandomized = function() {
  var now = new Date();
  return new Marsaglia(now / 6E4 & 4294967295, now & 4294967295);
};

var noiseProfile = {
  generator: undefined,
  octaves: 4,
  fallout: 0.5,
  seed: undefined
};

function PerlinNoise(seed) {
  var rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
  var i, j;
  var perm = [];
  for (i = 0; i < 256; ++i) perm[i] = i;
  for (i = 0; i < 256; ++i) {
    var t = perm[j = rnd.nextInt() & 255];
    perm[j] = perm[i];
    perm[i] = t;
  }
  for (i = 0; i < 256; ++i) perm[i + 256] = perm[i];

  function grad3d(i, x, y, z) {
    var h = i & 15;
    var u = h < 8 ? x : y,
      v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  function grad2d(i, x, y) {
    var v = (i & 1) === 0 ? x : y;
    return (i & 2) === 0 ? -v : v;
  }

  function grad1d(i, x) {
    return (i & 1) === 0 ? -x : x;
  }
  function lerp(t, a, b) {
    return a + t * (b - a);
  }

  this.noise3d = function(x, y, z) {
    var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    var fx = (3 - 2 * x) * x * x,
      fy = (3 - 2 * y) * y * y,
      fz = (3 - 2 * z) * z * z;
    var p0 = perm[X] + Y,
      p00 = perm[p0] + Z,
      p01 = perm[p0 + 1] + Z,
      p1 = perm[X + 1] + Y,
      p10 = perm[p1] + Z,
      p11 = perm[p1 + 1] + Z;
    return lerp(fz, lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x - 1, y, z)), lerp(fx, grad3d(perm[p01], x, y - 1, z), grad3d(perm[p11], x - 1, y - 1, z))), lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z - 1), grad3d(perm[p10 + 1], x - 1, y, z - 1)), lerp(fx, grad3d(perm[p01 + 1], x, y - 1, z - 1), grad3d(perm[p11 + 1], x - 1, y - 1, z - 1))));
  };

  this.noise2d = function(x, y) {
    var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    var fx = (3 - 2 * x) * x * x,
      fy = (3 - 2 * y) * y * y;
    var p0 = perm[X] + Y,
      p1 = perm[X + 1] + Y;
    return lerp(fy, lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x - 1, y)), lerp(fx, grad2d(perm[p0 + 1], x, y - 1), grad2d(perm[p1 + 1], x - 1, y - 1)));
  };

  this.noise1d = function(x) {
    var X = Math.floor(x) & 255;
    x -= Math.floor(x);
    var fx = (3 - 2 * x) * x * x;
    return lerp(fx, grad1d(perm[X], x), grad1d(perm[X + 1], x - 1));
  };
}

var precision = function(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

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

// ----------------------------------------
// src/includes/shape.js
// ----------------------------------------

// ----------------------------------------
// Shape/Attributes
// ----------------------------------------

/**
 * @description The origin of new ellipses is modified by the `ellipseMode()` function. The default configuration is `ellipseMode(CENTER)`, which specifies the location of the ellipse as the center of the shape. The `RADIUS` mode is the same, but the `w` and `h` parameters to `ellipse()` specify the radius of the ellipse, rather than the diameter. The `CORNER` mode draws the shape from the upper-left corner of its bounding box. The `CORNERS` mode uses the four parameters to `ellipse()` to set two opposing corners of the ellipse's bounding box.
 *
 * @cat     Shape
 * @subcat  Attributes
 * @method  ellipseMode
 *
 * @param   {String} mode The ellipse mode to switch to: either `CENTER`, `RADIUS`, `CORNER`, or `CORNERS`.
 */
pub.ellipseMode = function (mode) {
  if (arguments.length === 0) return currEllipseMode;
  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER || mode === pub.RADIUS) {
    currEllipseMode = mode;
    return currEllipseMode;
  } else {
    error("ellipseMode(), unsupported ellipseMode. Use: CENTER, RADIUS, CORNER, CORNERS.");
  }
};

/**
 * @description Modifies the location from which rectangles or text frames draw. The default mode is `rectMode(CORNER)`, which specifies the location to be the upper left corner of the shape and uses the `w` and `h` parameters to specify the width and height. The syntax `rectMode(CORNERS)` uses the `x` and `y` parameters of `rect()` or `text()` to set the location of one corner and uses the `w` and `h` parameters to set the opposite corner. The syntax `rectMode(CENTER)` draws the shape from its center point and uses the `w` and `h` parameters to specify the shape's width and height. The syntax `rectMode(RADIUS)` draws the shape from its center point and uses the `w` and `h` parameters to specify half of the shape's width and height.
 *
 * @cat     Shape
 * @subcat  Attributes
 * @method  rectMode
 *
 * @param   {String} mode The rectMode to switch to: either `CORNER`, `CORNERS`, `CENTER`, or `RADIUS`.
 */
pub.rectMode = function (mode) {
  if (arguments.length === 0) return currRectMode;
  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER || mode === pub.RADIUS) {
    currRectMode = mode;
    return currRectMode;
  } else {
    error("rectMode(), unsupported rectMode. Use: CORNER, CORNERS, CENTER, RADIUS.");
  }
};

/**
 * @description Sets the width of the stroke used for lines and the border around shapes.
 *
 * @cat     Shape
 * @subcat  Attributes
 * @method  strokeWeight
 *
 * @param   {Number} weight The width of the stroke in points.
 */
pub.strokeWeight = function (weight) {
  if (typeof weight === "string" || typeof weight === "number") {
    currStrokeWeight = weight;
  } else {
    error("strokeWeight(), not supported type. Please make sure the strokeweight is a number or string");
  }
};

// ----------------------------------------
// Shape/Primitives
// ----------------------------------------

/**
 * @description The `arc()` function draws an arc. Arcs are drawn along the outer edge of an ellipse defined by the `x`, `y`, `width` and `height` parameters. The origin or the arc's ellipse may be changed with the `ellipseMode()` function. The start and stop parameters specify the angles at which to draw the arc.
 *
 * @cat     Shape
 * @subcat  Primitives
 * @method  arc
 *
 * @param   {Number} cx X-coordinate of the arc's center.
 * @param   {Number} cy Y-coordinate of the arc's center.
 * @param   {Number} w Width of the arc's ellipse.
 * @param   {Number} h Height of the arc's ellipse.
 * @param   {Number} startAngle Starting angle of the arc in radians.
 * @param   {Number} endAngle Ending angle of the arc in radians.
 * @param   {String} [mode] Mode to define the rendering technique of the arc: `OPEN` (default), `CHORD`, or `PIE`.
 * @return  {GraphicLine|Polygon} The resulting GraphicLine or Polygon object (in InDesign Scripting terms the corresponding type is GraphicLine or Polygon, not Arc).
 */
pub.arc = function(cx, cy, w, h, startAngle, endAngle, mode) {
  if (w <= 0 || endAngle < startAngle) {
    return false;
  }
  if (arguments.length < 6) error("arc(), not enough parameters to draw an arc! Use: x, y, w, h, startAngle, endAngle");

  var o = pub.radians(1); // add 1 degree to ensure angles of 360 degrees are drawn
  startAngle %= pub.TWO_PI + o;
  endAngle %= pub.TWO_PI + o;
  w /= 2;
  h /= 2;

  if (currEllipseMode === pub.CORNER) {
    cx = (cx - w);
    cy = (cy + h);
  }
  else if (currEllipseMode === pub.CORNERS) {
    // cx = (cx-w);
    // cy = (cy-h);
    // w -= cx;
    // h -= cy;
  }
  else if (currEllipseMode === pub.RADIUS) {
    w *= 2;
    h *= 2;
  }

  var delta = pub.abs(endAngle - startAngle);
  var direction = (startAngle < endAngle) ? 1 : -1;
  var thetaStart = startAngle;

  if(mode == pub.CHORD) {
    pub.beginShape(pub.CLOSE);
  }
  else if(mode == pub.PIE) {
    pub.beginShape(pub.CLOSE);
    pub.vertex(cx, cy);
  }
  else {
    pub.beginShape();
  }
  for (var theta = pub.min(pub.TWO_PI, delta); theta > pub.EPSILON;) {
    var thetaEnd = thetaStart + direction * pub.min(theta, pub.HALF_PI);
    var points = calculateEllipticalArc(w, h, thetaEnd, thetaStart);

    pub.vertex(
      cx + points.startx,
      cy + points.starty,
      cx + points.startx,
      cy + points.starty,
      cx + points.handle1x,
      cy + points.handle1y
    );
    pub.vertex(
      cx + points.endx,
      cy + points.endy,
      cx + points.handle2x,
      cy + points.handle2y,
      cx + points.endx,
      cy + points.endy
    );

    theta -= pub.abs(thetaEnd - thetaStart);
    thetaStart = thetaEnd;
  }
  return pub.endShape();
};

/**
 * @description Draws an ellipse (oval) in the display window. An ellipse with an equal width and height is a circle. The first two parameters set the location, the third sets the width, and the fourth sets the height.
 *
 * @cat     Shape
 * @subcat  Primitives
 * @method  ellipse
 *
 * @param   {Number} x X-coordinate of the ellipse.
 * @param   {Number} y Y-coordinate of the ellipse.
 * @param   {Number} w Width of the ellipse.
 * @param   {Number} h Height of the ellipse.
 * @return  {Oval} New Oval (in InDesign Scripting terms the corresponding type is Oval, not Ellipse).
 */
pub.ellipse = function(x, y, w, h) {
  if (arguments.length !== 4) error("ellipse(), not enough parameters to draw an ellipse! Use: x, y, w, h");
  var ellipseBounds = [];
  if (currEllipseMode === pub.CORNER) {
    ellipseBounds[0] = y;
    ellipseBounds[1] = x;
    ellipseBounds[2] = y + h;
    ellipseBounds[3] = x + w;
  } else if (currEllipseMode === pub.CORNERS) {
    ellipseBounds[0] = y;
    ellipseBounds[1] = x;
    ellipseBounds[2] = h;
    ellipseBounds[3] = w;
  } else if (currEllipseMode === pub.CENTER) {
    ellipseBounds[0] = y - (h / 2);
    ellipseBounds[1] = x - (w / 2);
    ellipseBounds[2] = y + (h / 2);
    ellipseBounds[3] = x + (w / 2);
  } else if (currEllipseMode === pub.RADIUS) {
    ellipseBounds[0] = y - h;
    ellipseBounds[1] = x - w;
    ellipseBounds[2] = y + h;
    ellipseBounds[3] = x + w;
  }

  if(w === 0 || h === 0)
    {return false;}

  var ovals = currentPage().ovals;
  var newOval = ovals.add(currentLayer());

  newOval.strokeWeight = currStrokeWeight;
  newOval.strokeTint = currStrokeTint;
  newOval.fillColor = currFillColor;
  newOval.fillTint = currFillTint;
  newOval.strokeColor = currStrokeColor;
  newOval.geometricBounds = ellipseBounds;

  if (currEllipseMode === pub.CENTER || currEllipseMode === pub.RADIUS) {
    newOval.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix(x, y));
  } else {
    newOval.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix(x, y));
  }
  return newOval;
};

/**
 * @description Draws a line (a direct path between two points) to the page.
 *
 * @cat     Shape
 * @subcat  Primitives
 * @method  line
 *
 * @param   {Number} x1 X-coordinate of Point 1.
 * @param   {Number} y1 Y-coordinate of Point 1.
 * @param   {Number} x2 X-coordinate of Point 2.
 * @param   {Number} y2 Y-coordinate of Point 2.
 * @return  {GraphicLine} New GraphicLine.
 *
 * @example
 * var vec1 = new Vector(x1, y1);
 * var vec2 = new Vector(x2, y2);
 * line( vec1, vec2 );
 */
pub.line = function(x1, y1, x2, y2) {
  if (arguments.length !== 4) {
    error("line(), not enough parameters to draw a line! Use: x1, y1, x2, y2");
  }
  var lines = currentPage().graphicLines;
  var newLine = lines.add(currentLayer());
  newLine.strokeWeight = currStrokeWeight;
  newLine.strokeTint = currStrokeTint;
  newLine.fillColor = currFillColor;
  newLine.fillTint = currFillTint;
  newLine.strokeColor = currStrokeColor;
  newLine.paths.item(0).entirePath = [[x1, y1], [x2, y2]];
  newLine.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.CENTER_ANCHOR,
                   currMatrix.adobeMatrix( (x1 + x2) / 2, (y1 + y2) / 2 ));
  return newLine;
};

/**
 * @description Draws a rectangle on the page.
 * By default, the first two parameters set the location of the upper-left corner, the third sets the width, and the fourth sets the height. The way these parameters are interpreted, however, may be changed with the `rectMode()` function.
 * The fifth, sixth, seventh and eighth parameters, if specified, determine corner radius for the top-right, top-left, lower-right and lower-left corners, respectively. If only a fifth parameter is provided, all corners will be set to this radius.
 *
 * @cat     Shape
 * @subcat  Primitives
 * @method  rect
 *
 * @param   {Number} x X-coordinate of the rectangle.
 * @param   {Number} y Y-coordinate of the rectangle.
 * @param   {Number} w Width of the rectangle.
 * @param   {Number} h Height of the rectangle.
 * @param   {Number} [tl] Radius of top left corner or radius of all 4 corners (optional).
 * @param   {Number} [tr] Radius of top right corner (optional).
 * @param   {Number} [br] Radius of bottom right corner (optional).
 * @param   {Number} [bl] Radius of bottom left corner (optional).
 * @return  {Rectangle} The rectangle that was created.
 */
pub.rect = function(x, y, w, h, tl, tr, br, bl) {
  if (w === 0 || h === 0) {
    // InDesign doesn't draw a rectangle if width or height are set to 0
    return false;
  }
  if (arguments.length < 4) error("rect(), not enough parameters to draw a rect! Use: x, y, w, h");

  var rectBounds = [];
  if (currRectMode === pub.CORNER) {
    rectBounds[0] = y;
    rectBounds[1] = x;
    rectBounds[2] = y + h;
    rectBounds[3] = x + w;
  } else if (currRectMode === pub.CORNERS) {
    rectBounds[0] = y;
    rectBounds[1] = x;
    rectBounds[2] = h;
    rectBounds[3] = w;
  } else if (currRectMode === pub.CENTER) {
    rectBounds[0] = y - (h / 2);
    rectBounds[1] = x - (w / 2);
    rectBounds[2] = y + (h / 2);
    rectBounds[3] = x + (w / 2);
  } else if (currRectMode === pub.RADIUS) {
    rectBounds[0] = y - h;
    rectBounds[1] = x - w;
    rectBounds[2] = y + h;
    rectBounds[3] = x + w;
  }

  var newRect = currentPage().rectangles.add(currentLayer());
  newRect.geometricBounds = rectBounds;
  newRect.strokeWeight = currStrokeWeight;
  newRect.strokeTint = currStrokeTint;
  newRect.fillColor = currFillColor;
  newRect.fillTint = currFillTint;
  newRect.strokeColor = currStrokeColor;

  if (currRectMode === pub.CENTER || currRectMode === pub.RADIUS) {
    newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix(x, y));
  } else {
    newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix(x, y));
  }

  if(arguments.length > 4) {
    for(var i = 4; i < arguments.length;i++){
      if(arguments[i] < 0 ){
        error("rect(), needs positive values as arguments for the rounded corners.");
      }
    }
    newRect.topLeftCornerOption = newRect.topRightCornerOption = newRect.bottomRightCornerOption = newRect.bottomLeftCornerOption = CornerOptions.ROUNDED_CORNER;
    if(arguments.length === 8) {
      newRect.topLeftCornerRadius = tl;
      newRect.topRightCornerRadius = tr;
      newRect.bottomRightCornerRadius = br;
      newRect.bottomLeftCornerRadius = bl;
    } else {
      newRect.topLeftCornerRadius = newRect.topRightCornerRadius = newRect.bottomRightCornerRadius = newRect.bottomLeftCornerRadius = tl;
    }
  }
  return newRect;
};

// ----------------------------------------
// Shape/Vertex
// ----------------------------------------

/**
 * @description `addPath()` is used to create multi component paths. Call `addPath()` to add the vertices drawn so far to a single path. New vertices will then end up in a new path and `endShape()` will return a multi path object. All component paths will account for the setting (see `CLOSE`) given in `beginShape(shapeMode)`.
 *
 * @cat     Shape
 * @subcat  Vertex
 * @method  addPath
 */
pub.addPath = function() {
  doAddPath();
  currPathPointer++;
};

/**
 * @description Using the `beginShape()` and `endShape()` functions allows to create more complex forms. `beginShape()` begins recording vertices for a shape and `endShape()` stops recording. After calling the `beginShape()` function, a series of `vertex()` commands must follow. To stop drawing the shape, call `endShape()`. The shapeMode parameter allows to close the shape (to connect the beginning and the end).
 *
 * @cat     Shape
 * @subcat  Vertex
 * @method  beginShape
 *
 * @param   {String} shapeMode Set to `CLOSE` if the new path should be auto-closed.
 */
pub.beginShape = function(shapeMode) {
  currVertexPoints = [];
  currPathPointer = 0;
  currPolygon = null;
  if(typeof shapeMode != null) {
    currShapeMode = shapeMode;
  } else {
    currShapeMode = null;
  }
};

/**
 * @description The `endShape()` function is the companion to `beginShape()` and may only be called after `beginShape()`.
 *
 * @cat     Shape
 * @subcat  Vertex
 * @method  endShape
 *
 * @return  {GraphicLine|Polygon} The GraphicLine or Polygon object that was created.
 */
pub.endShape = function() {
  doAddPath();
  currPolygon.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix(currPolygon.geometricBounds[1], currPolygon.geometricBounds[0]));
  return currPolygon;
};

/**
 * @description Shapes are constructed by connecting a series of vertices. `vertex()` is used to specify the vertex coordinates of lines and polygons. It is used exclusively between the `beginShape()` and `endShape()` functions.
 *
 * Use either `vertex(x, y)` for drawing straight corners or `vertex(x, y, xLeftHandle, yLeftHandle, xRightHandle, yRightHandle)` for drawing bezier shapes. You can also mix the two approaches.
 *
 * @cat     Shape
 * @subcat  Vertex
 * @method  vertex
 *
 * @param   {Number} x X-coordinate of the vertex.
 * @param   {Number} y Y-coordinate of the vertex.
 * @param   {Number} [xLeftHandle] X-coordinate of the left-direction point.
 * @param   {Number} [yLeftHandle] Y-coordinate of the left-direction point.
 * @param   {Number} [xRightHandle] X-coordinate of the right-direction point.
 * @param   {Number} [yRightHandle] Y-coordinate of the right-direction point.
 */
pub.vertex = function() {
  if (isArray(currVertexPoints)) {
    if (arguments.length === 2) {
      currVertexPoints.push([arguments[0], arguments[1]]);
    } else if (arguments.length === 6) {
      // [[xL1, YL1], [x1, y1], [xR1, yR1]]
      currVertexPoints.push([[arguments[2], arguments[3]],
                              [arguments[0], arguments[1]],
                              [arguments[4], arguments[5]]]);
    } else {
      error("vertex(), wrong argument count: Please use either vertex(x, y) or vertex(x, y, xLeftHandle, yLeftHandle, xRightHandle, yRightHandle)!");
    }
  } else {
    notCalledBeginShapeError();
  }
};

// ----------------------------------------
// Shape Private
// ----------------------------------------

function addPolygon() {
  if (currShapeMode === pub.CLOSE) {
    currPolygon = currentPage().polygons.add(currentLayer());
  } else {
    currPolygon = currentPage().graphicLines.add(currentLayer());
  }

  currPolygon.strokeWeight = currStrokeWeight;
  currPolygon.strokeTint = currStrokeTint;
  currPolygon.fillColor = currFillColor;
  currPolygon.fillTint = currFillTint;
  currPolygon.strokeColor = currStrokeColor;
}

/*
 * Cubic bezier approximation of a eliptical arc
 *
 * intial source code: Golan Levin golan@flong.com
 * http://www.flong.com/blog/2009/bezier-approximation-of-a-circular-arc-in-processing/
 *
 * The solution is taken from this PDF by Richard DeVeneza:
 * http://www.tinaja.com/glib/bezcirc2.pdf linked from this excellent site by
 * Don Lancaster: http://www.tinaja.com/cubic01.asp
 */
function calculateEllipticalArc(w, h, startAngle, endAngle) {
  var theta = (endAngle - startAngle);

  var x0 = pub.cos(theta / 2.0);
  var y0 = pub.sin(theta / 2.0);
  var x3 = x0;
  var y3 = 0 - y0;
  var x1 = (4.0 - x0) / 3.0;
  var y1 = ((1.0 - x0) * (3.0 - x0)) / (3.0 * y0);
  var x2 = x1;
  var y2 = 0 - y1;

  var bezAng = startAngle + theta / 2.0;
  var cBezAng = pub.cos(bezAng);
  var sBezAng = pub.sin(bezAng);

  return {
    startx:   w * (cBezAng * x0 - sBezAng * y0),
    starty:   h * (sBezAng * x0 + cBezAng * y0),
    handle1x: w * (cBezAng * x1 - sBezAng * y1),
    handle1y: h * (sBezAng * x1 + cBezAng * y1),

    handle2x: w * (cBezAng * x2 - sBezAng * y2),
    handle2y: h * (sBezAng * x2 + cBezAng * y2),
    endx:     w * (cBezAng * x3 - sBezAng * y3),
    endy:     h * (sBezAng * x3 + cBezAng * y3)
  };
}

function doAddPath() {
  if (isArray(currVertexPoints)) {
    if (currVertexPoints.length > 0) {

      if(currPolygon === null) {
        addPolygon();
      } else {
        currPolygon.paths.add();
      }

      currPolygon.paths.item(currPathPointer).entirePath = currVertexPoints;
      currVertexPoints = [];
    }
  } else {
    notCalledBeginShapeError();
  }
}

function notCalledBeginShapeError () {
  error("endShape(), you have to call first beginShape(), before calling vertex() and endShape()");
}

// ----------------------------------------
// src/includes/structure.js
// ----------------------------------------

// ----------------------------------------
// Structure
// ----------------------------------------

/**
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

// ----------------------------------------
// src/includes/transform.js
// ----------------------------------------

// ----------------------------------------
// Transform
// ----------------------------------------

/**
 * @description Multiplies the current matrix by the one specified through the parameters.
 *
 * @cat     Transform
 * @method  applyMatrix
 *
 * @param   {Matrix2D} matrix The matrix to be applied.
 */
pub.applyMatrix = function (matrix) {
  currMatrix.apply(matrix);
};

/**
 * @description Pops the current transformation matrix off the matrix stack. Understanding pushing and popping requires understanding the concept of a matrix stack. The `pushMatrix()` function saves the current coordinate system to the stack and `popMatrix()` restores the prior coordinate system. `pushMatrix()` and `popMatrix()` are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat     Transform
 * @method  popMatrix
 */
pub.popMatrix = function () {
  if (matrixStack.length > 0) {
    currMatrix.set(matrixStack.pop());
  } else {
    error("popMatrix(), missing a pushMatrix() to go with that popMatrix()");
  }
};

/**
 * @description Prints the current matrix to the console window.
 *
 * @cat     Transform
 * @method  printMatrix
 */
pub.printMatrix = function () {
  currMatrix.print();
};

/**
 * @description Pushes the current transformation matrix onto the matrix stack. Understanding `pushMatrix()` and `popMatrix()` requires understanding the concept of a matrix stack. The `pushMatrix()` function saves the current coordinate system to the stack and `popMatrix()` restores the prior coordinate system. `pushMatrix()` and `popMatrix()` are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat     Transform
 * @method  pushMatrix
 */
pub.pushMatrix = function () {
  matrixStack.push(currMatrix.array());
};

/**
 * @description Replaces the current matrix with the identity matrix.
 *
 * @cat     Transform
 * @method  resetMatrix
 */
pub.resetMatrix = function () {
  matrixStack = [];
  currMatrix = new Matrix2D();

  pub.translate(currOriginX, currOriginY);
};

/**
 * @description Rotates an object the amount specified by the angle parameter. Angles should be specified in radians (values from 0 to `PI`*2) or converted to radians with the `radians()` function. Objects are always rotated around their relative position to the origin and positive numbers rotate objects in a clockwise direction with 0 radians or degrees being up and `HALF_PI` being to the right etc. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling `rotate(PI/2)` and then `rotate(PI/2)` is the same as `rotate(PI)`. If `rotate()` is called within the `draw()`, the transformation is reset when the loop begins again. Technically, `rotate()` multiplies the current transformation matrix by a rotation matrix. This function can be further controlled by the `pushMatrix()` and `popMatrix()`.
 *
 * @cat     Transform
 * @method  rotate
 *
 * @param   {Number} angle The angle specified in radians
 */
pub.rotate = function (angle) {
  if(typeof arguments[0] === "undefined") {
    error("Please provide an angle for rotation.");
  }
  currMatrix.rotate(angle);
};

/**
 * @description Increasing and decreasing the size of an object by expanding and contracting vertices. Scale values are specified as decimal percentages. The function call `scale(2.0)` increases the dimension of a shape by 200%. Objects always scale from their relative origin to the coordinate system. Transformations apply to everything that happens after and subsequent calls to the function multiply the effect. For example, calling `scale(2.0)` and then `scale(1.5)` is the same as `scale(3.0)`. If `scale()` is called within `draw()`, the transformation is reset when the loop begins again. This function can be further controlled by `pushMatrix()` and `popMatrix()`. If only one parameter is given, it is applied on X and Y axis.
 *
 * @cat     Transform
 * @method  scale
 *
 * @param   {Number} scaleX The amount to scale the X axis.
 * @param   {Number} scaleY The amount to scale the Y axis.
 */
pub.scale = function (scaleX, scaleY) {
  if(typeof arguments[0] != "number" || (arguments.length === 2 && typeof arguments[1] != "number")) {
    error("Please provide valid x and/or y factors for scaling.");
  }
  currMatrix.scale(scaleX, scaleY);
};

/**
 * @description Transforms a given page item. The type of transformation is determinded with the second parameter. The third parameter is the transformation value, either a number or an array of x and y values. The transformation's reference point (top left, bottom center etc.) can be set beforehand by using the `referencePoint()` function. If the third parameter is ommited, the function can be used to measure the value of the page item. There are 10 different transformation types:
 * - `"translate"`: Translates the page item by the given `[x, y]` values. Returns the coordinates of the page item's anchor point as anray.
 * - `"rotate"`: Rotates the page item to the given degree value. Returns the page item's rotation value in degrees.
 * - `"scale"`: Scales the page item to the given `[x, y]` scale factor values. Alternatively, a single scale factor value can be usto scale the page item uniformely. Returns the scale factor values of the page item's current scale as an array.
 * - `"shear"`: Shears the page item to the given degree value. Returns the page item's shear value in degrees.
 * - `"size"`: Sets the page item's size to the given `[x, y]` dimensions. Returns the size of the page item as an array.
 * - `"width"`: Sets the page item's width to the given value. Returns the width of the page item.
 * - `"height"`: Sets the page item's height to the given value. Returns the height of the page item.
 * - `"position"`: Sets the position of the page item's anchor point to the given `[x, y]` coordinates. Returns the coordinates of the page item's anchor point as an array.
 * - `"x"`: Sets the x-position of the page item's anchor point to the given value. Returns the x-coordinate of the page item's anr point.
 * - `"y"`: Sets the y-position of the page item's anchor point to the given value. Returns the y-coordinate of the page item's anchor point.
 *
 * @cat     Transform
 * @method  transform
 *
 * @param   {PageItem} pItem The page item to transform.
 * @param   {String} type The type of transformation.
 * @param   {Number|Array} [value] The value(s) of the transformation.
 * @return  {Number|Array} The current value(s) of the specified transformation.
 *
 * @example <caption>Rotating a rectangle to a 25 degrees angle</caption>
 * var r = rect(20, 40, 200, 100);
 * transform(r, "rotate", 25);
 *
 * @example <caption>Measure the width of a rectangle</caption>
 * var r = rect(20, 40, random(100, 300), 100);
 * var w = transform(r, "width");
 * println(w); // prints the rectangle's random width between 100 and 300
 *
 * @example <caption>Position a rectangle's lower right corner at a certain position</caption>
 * var r = rect(20, 40, random(100, 300), random(50, 150));
 * referencePoint(BOTTOM_RIGHT);
 * transform(r, "position", [40, 40]);
 */
pub.transform = function(pItem, type, value) {

  if(!pItem || !pItem.hasOwnProperty("geometricBounds")) {
    error("transform(), invalid first parameter. Use page item.");
  }

  app.transformPreferences.adjustStrokeWeightWhenScaling = false;
  app.transformPreferences.whenScaling = WhenScalingOptions.ADJUST_SCALING_PERCENTAGE;

  var result = null;
  var idAnchorPoints = {
    topLeft: AnchorPoint.TOP_LEFT_ANCHOR,
    topCenter: AnchorPoint.TOP_CENTER_ANCHOR,
    topRight: AnchorPoint.TOP_RIGHT_ANCHOR,
    centerLeft: AnchorPoint.LEFT_CENTER_ANCHOR,
    center: AnchorPoint.CENTER_ANCHOR,
    centerRight: AnchorPoint.RIGHT_CENTER_ANCHOR,
    bottomLeft: AnchorPoint.BOTTOM_LEFT_ANCHOR,
    bottomCenter: AnchorPoint.BOTTOM_CENTER_ANCHOR,
    bottomRight: AnchorPoint.BOTTOM_RIGHT_ANCHOR
  };
  var basilUnits = {
    pt: MeasurementUnits.POINTS,
    mm: MeasurementUnits.MILLIMETERS,
    cm: MeasurementUnits.CENTIMETERS,
    inch: MeasurementUnits.INCHES,
    px: MeasurementUnits.PIXELS
  }

  var aPoint = idAnchorPoints[currRefPoint];
  var unitEnum = basilUnits[currUnits];

  var tm = app.transformationMatrices.add();
  var bounds = pItem.geometricBounds;
  var w = Math.abs(bounds[3] - bounds[1]);
  var h = Math.abs(bounds[2] - bounds[0]);

  if(type === "width") {
    if(isNumber(value)) {
      tm = tm.scaleMatrix(value / w, 1);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else {
      result = precision(w, 12);
    }

  } else if (type === "height") {
    if(isNumber(value)) {
      tm = tm.scaleMatrix(1, value / h);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else {
      result = precision(h, 12);
    }

  } else if (type === "size") {
    if(isArray(value)) {
      tm = tm.scaleMatrix(value[0] / w, value[1] / h);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else {
      result = [precision(w, 12), precision(h, 12)];
    }

  } else if(type === "translate" || type === "translation") {
    if(isArray(value)) {

      // for proper matrix translation, convert units to points
      value[0] = UnitValue(value[0], unitEnum).as(MeasurementUnits.POINTS);
      value[1] = UnitValue(value[1], unitEnum).as(MeasurementUnits.POINTS);

      tm = tm.translateMatrix(value[0], value[1]);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = transform(pItem, "position");

  } else if (type === "rotate" || type === "rotation") {
    if(isNumber(value)) {
      tm = tm.rotateMatrix(-pItem.rotationAngle - value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = -pItem.rotationAngle;

  } else if (type === "scale" || type === "scaling") {
    if(isNumber(value)) {
      tm = tm.scaleMatrix(value, value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else if(isArray(value)) {
      tm = tm.scaleMatrix(value[0], value[1]);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = [pItem.horizontalScale / 100, pItem.verticalScale / 100];

  } else if (type === "shear"  || type === "shearing") {
    if(isNumber(value)) {
      tm = tm.shearMatrix(-pItem.shearAngle - value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = -pItem.shearAngle;

  } else if (type === "position" || type === "x" || type === "y") {

    // find page that holds the top left corner of the current canvas mode
    var refPage = currPage;
    if(!(currCanvasMode === PAGE || currCanvasMode === MARGIN || currCanvasMode === BLEED)) {
      refPage = currPage.parent.pages.firstItem();
    }

    var topLeft = refPage.resolve([AnchorPoint.TOP_LEFT_ANCHOR, BoundingBoxLimits.GEOMETRIC_PATH_BOUNDS, CoordinateSpaces.INNER_COORDINATES], CoordinateSpaces.SPREAD_COORDINATES)[0];

    topLeft[0] += UnitValue(currOriginX, unitEnum).as(MeasurementUnits.POINTS);
    topLeft[1] += UnitValue(currOriginY, unitEnum).as(MeasurementUnits.POINTS);

    var anchorPosOnSpread = pItem.resolve([aPoint, BoundingBoxLimits.GEOMETRIC_PATH_BOUNDS, CoordinateSpaces.INNER_COORDINATES], CoordinateSpaces.SPREAD_COORDINATES)[0];
    var anchorPosOnPagePt = [anchorPosOnSpread[0] - topLeft[0], anchorPosOnSpread[1] - topLeft[1]];

    // convert position to user units
    var anchorPosOnPage = [
      UnitValue(anchorPosOnPagePt[0], MeasurementUnits.POINTS).as(unitEnum),
      UnitValue(anchorPosOnPagePt[1], MeasurementUnits.POINTS).as(unitEnum),
    ];

    if(type === "x") {
      if(isNumber(value)) {
        transform(pItem, "position", [value, anchorPosOnPage[1]]);
        return value;
      } else {
        result = precision(anchorPosOnPage[0], 12);
      }

    } else if (type === "y") {
      if(isNumber(value)) {
        transform(pItem, "position", [anchorPosOnPage[0], value]);
        return value;
      } else {
        result = precision(anchorPosOnPage[1], 12);
      }

    } else {
      if(isArray(value)) {
        var offset = [value[0] - anchorPosOnPage[0], value[1] - anchorPosOnPage[1]];
        transform(pItem, "translate", offset);
        return value;
      } else {
        result = [precision(anchorPosOnPage[0], 12), precision(anchorPosOnPage[1], 12)];
      }
    }

  } else {
    error("transform(), invalid transform type. Use \"translate\", \"rotate\", \"scale\", \"shear\", \"size\", \"width\", \"height\", \"position\", \"x\" or \"y\".");
  }

  app.transformPreferences.adjustStrokeWeightWhenScaling = true;
  app.transformPreferences.whenScaling = WhenScalingOptions.APPLY_TO_CONTENT;

  if(result === null) {
    result = value;
  }
  return result;

}

/**
 * @description Specifies an amount to displace objects within the page. The `x` parameter specifies left/right translation, the `y` parameter specifies up/down translation. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling `translate(50, 0)` and then `translate(20, 0)` is the same as `translate(70, 0)`. This function can be further controlled by the `pushMatrix()` and `popMatrix()`.
 *
 * @cat     Transform
 * @method  translate
 *
 * @param   {Number} tx The amount of offset on the X axis.
 * @param   {Number} ty The amount of offset on the Y axis.
 */
pub.translate = function (tx, ty) {
  if(typeof arguments[0] === "undefined" || typeof arguments[1] === "undefined") {
    error("Please provide x and y coordinates for translation.");
  }
  currMatrix.translate(tx, ty);
};

// ----------------------------------------
// Transform Private
// ----------------------------------------

var Matrix2D = function() {
  if (arguments.length === 0) {
    this.reset();
  } else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) {
    this.set(arguments[0].array());
  } else if (arguments.length === 6) {
    this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
  }
};

Matrix2D.prototype = {

  // Set a Matrix.
  set: function() {
    if (arguments.length === 6) {
      var a = arguments;
      this.set([a[0], a[1], a[2], a[3], a[4], a[5]]);
    } else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) {
      this.elements = arguments[0].array();
    } else if (arguments.length === 1 && arguments[0] instanceof Array) {
      this.elements = arguments[0].slice();
    }
  },

  // Get a Matrix.
  get: function() {
    var outgoing = new Matrix2D();
    outgoing.set(this.elements);
    return outgoing;
  },

  // Reset the Matrix.
  reset: function() {
    this.set([1, 0, 0, 0, 1, 0]);
  },

  // Slice the Matrix into an array.
  array: function array() {
    return this.elements.slice();
  },

  adobeMatrix: function array(x, y) {
    // this seems to work:
    // it's important to know the position of the object around which it will be rotated and scaled.

    // 1. making a copy of this matrix
    var tmpMatrix = this.get();

    // 2. pre-applying a translation as if the object was starting from the origin
    tmpMatrix.preApply([1, 0, -x, 0, 1, -y]);

    // 3. move to object to its given coordinates
    tmpMatrix.apply([1, 0, x, 0, 1, y]);

    var uVX = new UnitValue(tmpMatrix.elements[2], currUnits);
    var uVY = new UnitValue(tmpMatrix.elements[5], currUnits);

    return [
      tmpMatrix.elements[0],
      tmpMatrix.elements[3],
      tmpMatrix.elements[1],
      tmpMatrix.elements[4],
      uVX.as("pt"),
      uVY.as("pt")
    ];
  },

  translate: function(tx, ty) {
    this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
    this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
  },

  scale: function(sx, sy) {
    if (sx && !sy) {
      sy = sx;
    }
    if (sx && sy) {
      this.elements[0] *= sx;
      this.elements[1] *= sy;
      this.elements[3] *= sx;
      this.elements[4] *= sy;
    }
  },

  apply: function() {
    var source;
    if (arguments.length === 1 && arguments[0] instanceof Matrix2D) {
      source = arguments[0].array();
    } else if (arguments.length === 6) {
      source = Array.prototype.slice.call(arguments);
    } else if (arguments.length === 1 && arguments[0] instanceof Array) {
      source = arguments[0];
    }
    var result = [0, 0, this.elements[2], 0, 0, this.elements[5]];
    var e = 0;
    for (var row = 0; row < 2; row++) {
      for (var col = 0; col < 3; col++, e++) {
        result[e] += this.elements[row * 3 + 0] * source[col + 0] + this.elements[row * 3 + 1] * source[col + 3];
      }
    }
    this.elements = result.slice();
  },

  preApply: function() {
    var source;
    if (arguments.length === 1 && arguments[0] instanceof Matrix2D) {
      source = arguments[0].array();
    } else if (arguments.length === 6) {
      source = Array.prototype.slice.call(arguments);
    } else if (arguments.length === 1 && arguments[0] instanceof Array) {
      source = arguments[0];
    }
    var result = [0, 0, source[2], 0, 0, source[5]];
    result[2] = source[2] + this.elements[2] * source[0] + this.elements[5] * source[1];
    result[5] = source[5] + this.elements[2] * source[3] + this.elements[5] * source[4];
    result[0] = this.elements[0] * source[0] + this.elements[3] * source[1];
    result[3] = this.elements[0] * source[3] + this.elements[3] * source[4];
    result[1] = this.elements[1] * source[0] + this.elements[4] * source[1];
    result[4] = this.elements[1] * source[3] + this.elements[4] * source[4];
    this.elements = result.slice();
  },

  rotate: function(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var temp1 = this.elements[0];
    var temp2 = this.elements[1];
    this.elements[0] = c * temp1 + s * temp2;
    this.elements[1] = -s * temp1 + c * temp2;
    temp1 = this.elements[3];
    temp2 = this.elements[4];
    this.elements[3] = c * temp1 + s * temp2;
    this.elements[4] = -s * temp1 + c * temp2;
  },

  print: function() {
    var digits = printMatrixHelper(this.elements);
    var output = "" + pub.nfs(this.elements[0], digits, 4) + " " + pub.nfs(this.elements[1], digits, 4) + " " + pub.nfs(this.elements[2], digits, 4) + "\n" + pub.nfs(this.elements[3], digits, 4) + " " + pub.nfs(this.elements[4], digits, 4) + " " + pub.nfs(this.elements[5], digits, 4) + "\n\n";
    pub.println(output);
  }
};

var printMatrixHelper = function(elements) {
  var big = 0;
  for (var i = 0; i < elements.length; i++) {
    if (i !== 0) {
      big = Math.max(big, Math.abs(elements[i]));

    } else {
      big = Math.abs(elements[i]);
    }
  }
  var digits = (big + "").indexOf(".");
  if (digits === 0) {
    digits = 1;
  } else if (digits === -1) {
    digits = (big + "").length;
  }
  return digits;
};

// ----------------------------------------
// src/includes/typography.js
// ----------------------------------------

// ----------------------------------------
// Typography
// ----------------------------------------

/**
 * @description Creates a text frame on the current layer on the current page in the current document. The text frame gets created in the position specified by the `x` and `y` parameters. The default document font will be used unless a font is set with the `textFont()` function. The default document font size will be used unless a font size is set with the `textSize()` function. Change the color of the text with the `fill()` function. The text displays in relation to the `textAlign()` and `textYAlign()` functions. The `width` and `height` parameters define a rectangular area.
 *
 * @cat     Typography
 * @method  text
 *
 * @param   {String} txt The text content to set in the text frame.
 * @param   {Number|Rectangle|Oval|Polygon|GraphicLine} x x-coordinate of text frame or item to place the text in or graphic line to place the text onto as a text path.
 * @param   {Number} y y-coordinate of text frame
 * @param   {Number} w width of text frame
 * @param   {Number} h height of text frame
 * @return  {TextFrame|TextPath} The created text frame instance
 */
pub.text = function(txt, x, y, w, h) {
  if (!(isString(txt) || isNumber(txt))) {
    error("text(), the first parameter has to be a string! But is something else: " + typeof txt + ". Use: text(txt, x, y, w, h)");
  }

  var textContainer;

  if (x instanceof Rectangle ||
      x instanceof Oval ||
      x instanceof Polygon) {
    x.contentType = ContentType.TEXT_TYPE;
    textContainer = x.getElements()[0];
    textContainer.contents = txt.toString();
  } else if (x instanceof GraphicLine) {
    textContainer = x.textPaths.add();
    textContainer.contents = txt.toString();
  } else if (isNumber(x) && arguments.length === 5) {
    var textBounds = [];
    if (currRectMode === pub.CORNER) {
      textBounds[0] = y;
      textBounds[1] = x;
      textBounds[2] = y + h;
      textBounds[3] = x + w;
    } else if (currRectMode === pub.CORNERS) {
      textBounds[0] = y;
      textBounds[1] = x;
      textBounds[2] = h;
      textBounds[3] = w;
    } else if (currRectMode === pub.CENTER) {
      textBounds[0] = y - (h / 2);
      textBounds[1] = x - (w / 2);
      textBounds[2] = y + (h / 2);
      textBounds[3] = x + (w / 2);
    } else if (currRectMode === pub.RADIUS) {
      textBounds[0] = y - h;
      textBounds[1] = x - w;
      textBounds[2] = y + h;
      textBounds[3] = x + w;
    }

    textContainer = currentPage().textFrames.add(currentLayer());
    textContainer.contents = txt.toString();
    textContainer.geometricBounds = textBounds;
    textContainer.textFramePreferences.verticalJustification = currYAlign;

    if (currRectMode === pub.CENTER || currRectMode === pub.RADIUS) {
      textContainer.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix(x, y));
    } else {
      textContainer.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix(x, y));
    }
  } else {
    error("text(), invalid parameters. Use: text(txt, x, y, w, h) or text(txt, obj).");
  }

  pub.typo(textContainer, {
    appliedFont: currFont,
    pointSize: currFontSize,
    fillColor: currFillColor,
    justification: currAlign,
    leading: currLeading,
    kerningValue: currKerning,
    tracking: currTracking
  });

  return textContainer;
};

// ----------------------------------------
// Typography/Attributes
// ----------------------------------------

/**
 * @description Sets the current horizontal and vertical text alignment.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textAlign
 *
 * @param   {String} align The horizontal text alignment to set. Must be one of the InDesign `Justification` enum values:
 * - `Justification.AWAY_FROM_BINDING_SIDE`
 * - `Justification.CENTER_ALIGN`
 * - `Justification.CENTER_JUSTIFIED`
 * - `Justification.FULLY_JUSTIFIED`
 * - `Justification.LEFT_ALIGN`
 * - `Justification.RIGHT_ALIGN`
 * - `Justification.RIGHT_JUSTIFIED`
 * - `Justification.TO_BINDING_SIDE`
 * @param   {String} [yAlign] The vertical text alignment to set. Must be one of the InDesign `VerticalJustification` enum values:
 * - `VerticalJustification.BOTTOM_ALIGN`
 * - `VerticalJustification.CENTER_ALIGN`
 * - `VerticalJustification.JUSTIFY_ALIGN`
 * - `VerticalJustification.TOP_ALIGN`
 */
pub.textAlign = function(align, yAlign) {
  currAlign = align;
  if (arguments.length === 2) currYAlign = yAlign;
};

/**
 * @description Returns the current font and sets it if argument `fontName` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textFont
 *
 * @param   {String} [fontName] The name of the font to set e.g. Helvetica
 * @param   {String} [fontStyle] The font style e.g. Bold
 * @return  {Font} The current font object
 */
pub.textFont = function(fontName, fontStyle) {

  if (arguments.length === 2) {
    fontName = fontName + "\t" + fontStyle;
  } else if (arguments.length === 1) {
    fontName = fontName + "\tRegular";
  } else if (arguments.length === 0) {
    return currFont;
  } else {
    error("textFont(), wrong parameters. To set font use: fontName, fontStyle. fontStyle is optional.");
  }

  if(app.fonts.itemByName(fontName).status !== FontStatus.INSTALLED) {
    warning("textFont(), font \"" + fontName.replace("\t", " ") + "\" not installed. "
      + "Using current font \"" + currFont.fontFamily + " " + currFont.fontStyleName + "\" instead.");
  } else {
    currFont = app.fonts.itemByName(fontName);
  }

  return currFont;
};

/**
 * @description Returns the current kerning and sets it if argument `kerning` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textKerning
 *
 * @param   {Number} [kerning] The value to set.
 * @return  {Number} The current kerning.
 */
pub.textKerning = function(kerning) {
  if (arguments.length === 1) {
    currKerning = kerning;
  }
  return currKerning;
};

/**
 * @description Returns the spacing between lines of text in units of points and sets it if argument `leading` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textLeading
 *
 * @param   {Number|String} [leading] The spacing between lines of text in units of points or the default InDesign enum value `Leading.AUTO`.
 * @return  {Number|String} The current leading.
 */
pub.textLeading = function(leading) {
  if (arguments.length === 1) {
    currLeading = leading;
  }
  return currLeading;
};

/**
 * @description Returns the current font size in points and sets it if argument `pointSize` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textSize
 *
 * @param   {Number} [pointSize] The size in points to set.
 * @return  {Number} The current point size.
 */
pub.textSize = function(pointSize) {
  if (arguments.length === 1) {
    currFontSize = pointSize;
  }
  return currFontSize;
};

/**
 * @description Returns the current tracking and sets it if argument `tracking` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textTracking
 *
 * @param   {Number} [tracking] The value to set.
 * @return  {Number} The current tracking.
 */
pub.textTracking = function(tracking) {
  if (arguments.length === 1) {
    currTracking = tracking;
  }
  return currTracking;
};

/**
 * @description Sets text properties to the given item. If the item is not an instance the text property can be set to, the property gets set to the direct descendants of the given item, e.g. all stories of a given document.
 *
 * If no value is given and the given property is a string, the function acts as a getter and returns the corresponding value(s) in an array. This can either be an array containing the value of the concrete item (e.g. character) the values of the item's descendants (e.g. paragraphs of given text frame).
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  typo
 *
 * @param   {Document|Spread|Page|Layer|Story|TextFrame|Text} item The object to apply the property to.
 * @param   {String|Object} property The text property name or an object of key/value property/value pairs. If property is a string and no value is given, the function acts as getter.
 * @param   {String|Number|Object} [value] The value to apply to the property.
 * @return  {String[]|Number[]|Object[]} The property value(s) if the function acts as getter or the items the property was assigned to.
 */
pub.typo = function(item, property, value) {
  var result = [],
    actsAsGetter = typeof property === "string" && (value === undefined || value === null),
    getOrSetProperties = function(textItem) {
      if (actsAsGetter) {
        result.push(textItem[property]);
      } else {
        setProperties(textItem);
      }
    },
    setProperties = function(textItem) {
      if (typeof property === "string") {
        result.push(textItem);
        setProperty(textItem, property, value);
      } else if (typeof property === "object") {
        result.push(textItem);
        for (var prop in property) {
          setProperty(textItem, prop, property[prop]);
        }
      }
    },
    setProperty = function(textItem, prop, val) {
      textItem[prop] = val;
    };

  if(typeof item === "string") error("typo() cannot work on strings. Please pass a Text object to modify.");

  if(!isValid(item)) {
    warning("typo(), invalid object passed");
    return;
  }

  if (item instanceof Document ||
      item instanceof Spread ||
      item instanceof Page ||
      item instanceof Layer) {
    forEach(item.textFrames, function(textFrame) {
      pub.typo(textFrame, property, value);
    });
  } else if (item instanceof Story ||
             item instanceof TextFrame) {
    var paras = item.paragraphs;
    // loop backwards to prevent invalid object reference error when
    // start of para is overflown in "invisible" textFrame area after
    // applying prop to previous para(s)
    for (var i = paras.length - 1; i >= 0; i--) {
      getOrSetProperties(paras[i]);
    }
  } else if (isText(item)) {
    getOrSetProperties(item);
  }
  return result;
};

// ----------------------------------------
// Typography/Styles
// ----------------------------------------

/**
 * @description Applies a character style to the given text object, text frame or story. The character style can be given as name or as character style instance.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  applyCharacterStyle
 *
 * @param   {TextFrame|TextObject|Story} text The text frame, text object or story to apply the style to.
 * @param   {CharacterStyle|String} style A character style instance or the name of the character style to apply.
 * @return  {Text} The text that the style was applied to.
 */

pub.applyCharacterStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allCharacterStyles, name);
    if(!style) {
      error("applyCharacterStyle(), a character style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof CharacterStyle)) {
    error("applyCharacterStyle(), wrong parameters. Use: textObject|textFrame|story, characterStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.characters.everyItem();
  }

  text.appliedCharacterStyle = style;

  return text;
};

/**
 * @description Applies a paragraph style to the given text object, text frame or story. The paragraph style can be given as name or as paragraph style instance.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  applyParagraphStyle
 *
 * @param   {TextFrame|TextObject|Story} text The text frame, text object or story to apply the style to.
 * @param   {ParagraphStyle|String} style A paragraph style instance or the name of the paragraph style to apply.
 * @return  {Text} The text that the style was applied to.
 */

pub.applyParagraphStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allParagraphStyles, name);
    if(!style) {
      error("applyParagraphStyle(), a paragraph style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof ParagraphStyle)) {
    error("applyParagraphStyle(), wrong parameters. Use: textObject|textFrame|story, paragraphStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.paragraphs.everyItem();
  }

  text.appliedParagraphStyle = style;

  return text;
};

/**
 * @description Returns the character style of a given text object or the character style with the given name. If a character style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the character style's properties.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  characterStyle
 *
 * @param   {Text|String} textOrName A text object whose style to return or the name of the character style to return.
 * @param   {Object} [props] Optional: An object of property name/value pairs to set the style's properties.
 * @return  {CharacterStyle} The character style instance.
 */
pub.characterStyle = function(textOrName, props) {
  var styleErrorMsg = "characterStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(isText(textOrName)) {
    // text object is given
    style = textOrName.appliedCharacterStyle;
  } else if(isString(textOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allCharacterStyles, textOrName);
    if(!style) {
      style = currentDoc().characterStyles.add({name: textOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("characterStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * @description Returns the paragraph style of a given text object or the paragraph style with the given name. If a paragraph style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the paragraph style's properties.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  paragraphStyle
 *
 * @param   {Text|String} textOrName A text object whose style to return or the name of the paragraph style to return.
 * @param   {Object} [props] Optional: An object of property name/value pairs to set the style's properties.
 * @return  {ParagraphStyle} The paragraph style instance.
 */
pub.paragraphStyle = function(textOrName, props) {
  var styleErrorMsg = "paragraphStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(isText(textOrName)) {
    // text object is given
    style = textOrName.appliedParagraphStyle;
  } else if(isString(textOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allParagraphStyles, textOrName);
    if(!style) {
      style = currentDoc().paragraphStyles.add({name: textOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("paragraphStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

// ----------------------------------------
// Typography/Constants
// ----------------------------------------

/**
 * @description Returns a Lorem ipsum string that can be used for testing.
 *
 * @cat      Typography
 * @subcat   Constants
 * @property LOREM {String}
 */
pub.LOREM = "Lorem ipsum is dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

// ----------------------------------------
// src/includes/ui.js
// ----------------------------------------

// Hey Ken, this is your new home...

init();

})();
