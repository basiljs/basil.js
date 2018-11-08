// ----------------------------------------
// src/includes/core.js
// ----------------------------------------

// all initialisations should go here
var init = function() {

  welcome();

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

  registerPlugins();
  populateGlobal();

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

var registerPlugins = function() {
  var mainPluginsFolder = Folder(File($.fileName).parent + "/plugins");

  if(mainPluginsFolder.exists) {
    var plugins = mainPluginsFolder.getFiles();
    for (var i = plugins.length - 1; i >= 0; i--) {
      var p = plugins[i];

      if(p instanceof Folder &&
         p.name.charAt(0) !== "_" &&
         File(p + "/" + p.name + ".jsx").exists) {
        app.doScript(File(p + "/" + p.name + ".jsx"), ScriptLanguage.JAVASCRIPT);
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
