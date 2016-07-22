// all initialisations should go here
var init = function() {
  glob.b = pub;


  welcome();

  // -- init internal state vars --
  startTime = Date.now();
  currStrokeWeight = 1;
  currStrokeTint = 100;
  currFillTint = 100;
  currCanvasMode = pub.PAGE;
  currColorMode = pub.RGB;
};


// ----------------------------------------
// execution

/**
 * Run the sketch! Has to be called in every sketch a the very end of the code.
 * You may add performance setting options when calling b.go():<br /><br />
 *
 * b.go(b.MODEVISIBLE) or alternatively: b.go()<br />
 * b.go(b.MODESILENT) <br />
 * b.go(b.MODEHIDDEN)<br /><br />
 *
 * Currently there is no performance optimization in b.loop()<br />
 * @cat Environment
 * @method go
 * @param {MODESILENT|MODEHIDDEN|MODEVISIBLE} [modes] Optional: Switch performanceMode
 */
pub.go = function (mode) {
  if (!mode) {
    mode = pub.DEFAULTMODE;
  }
  app.scriptPreferences.enableRedraw = (mode == pub.MODEVISIBLE || mode == pub.MODEHIDDEN);
  app.preflightOptions.preflightOff = true;

  currentDoc(mode);
  if (mode == pub.MODEHIDDEN || mode == pub.MODESILENT) {
    progressPanel = new Progress();
  }

  try {
    if (typeof glob.setup === "function") {
      runSetup();
    };

    if (typeof glob.draw === "function") {
      runDrawOnce();
    };
  } catch (e) {
    // A bit more verbose error reporting
    // if the DEBUG flag is true the error gets passed up
    // into this try catch
    if(pub.VERBOSE_ERRORS === true || pub.DEBUG === true) {
      var msg = verboseErrorMsg(e);
      alert(msg);
    }else{
      alert(e);
    }
    exit();
  }

  var executionDuration = pub.millis();
  if (executionDuration < 1000) {
    println("[Finished in " + executionDuration + "ms]");
  } else {
    println("[Finished in " + (executionDuration/1000).toPrecision(3) + "s]");
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
  app.scriptPreferences.enableRedraw = true;
  app.preflightOptions.preflightOff = false;
  exit(); // quit program execution
};

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
pub.loop = function(framerate) {
  var sleep = null;
  if (arguments.length === 0) sleep = Math.round(1000/25);
  else sleep = Math.round(1000/framerate);

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
pub.noLoop = function() {
  var allIdleTasks = app.idleTasks;
  for (var i = app.idleTasks.length - 1; i >= 0; i--) {
    allIdleTasks[i].remove();
  }
  println("noLoop()");
};


// ----------------------------------------
// all private from here


var runSetup = function() {
  if(pub.DEBUG === false) {

    app.doScript(function() {
      if (typeof glob.setup === "function") {
        glob.setup();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT);
  }else{
    if (typeof glob.setup === "function") {  // eslint-disable-line no-lonely-if
      glob.setup();
    }
  }
};

var runDrawOnce = function() {
  if(pub.DEBUG === false) {

    app.doScript(function() {
      if (typeof glob.draw === "function") {
        glob.draw();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT);
  } else {
    if (typeof glob.draw === "function") {  // eslint-disable-line no-lonely-if
      glob.draw();
    }
  }
};

var runDrawLoop = function() {
  if(pub.DEBUG === false) {

    app.doScript(function() {
      if (typeof glob.draw === "function") {
        glob.draw();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT);
  } else {
    if (typeof glob.draw === "function") { // eslint-disable-line no-lonely-if
      glob.draw();
    }
  }
};

var welcome = function() {
  clearConsole();
  println("Using basil.js "
      + pub.VERSION
      + " ...");
};

var currentDoc = function (mode) {
  if (!currDoc) {
    var stack = $.stack;
    if (!(stack.match(/go\(.*\)/)||stack.match(/loop\(.*\)/))) {
      warning("Do not initialize Variables with dependency to b outside the setup() or the draw() function. If you do so, basil will not be able to run in performance optimized Modes! If you really need them globally we recommend to only declare them gobally but initialize them in setup()! Current Stack is " + stack);
    }
    var doc = null;
    if (app.documents.length) {
      doc = app.activeDocument;
      if (mode == b.MODEHIDDEN) {
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
      // println("new doc");
      doc = app.documents.add(mode != b.MODEHIDDEN);
    }
    setCurrDoc(doc);
  }
  return currDoc;
};

var closeHiddenDocs = function () {
    //in Case we break the Script during execution in MODEHIDDEN we might have documents open that are not on the display list. Close them.
    for (var i = app.documents.length - 1; i >= 0; i -= 1) {
        var d = app.documents[i];
        if (!d.windows.length) {
            d.close(SaveOptions.NO);
        }
    }
};

var setCurrDoc = function(doc) {
  resetCurrDoc();
  currDoc = doc;
  // -- setup document --

  currDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
//  currDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
//  currDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;

  currFont = currDoc.textDefaults.appliedFont.name;
  currFontSize = currDoc.textDefaults.pointSize;
  currAlign = currDoc.textDefaults.justification;
  currLeading = currDoc.textDefaults.leading;
  currKerning = 0;
  currTracking = currDoc.textDefaults.tracking;
  pub.units(pub.PT);

  updatePublicPageSizeVars();
};

var progressPanel = null;

var Progress = function () {
  this.init = function () {
    this.panel = Window.find("window", "processing...");
    if (this.panel === null) {
      this.panel = new Window('window', "processing...");
      var logo = (Folder.fs == "Macintosh" ) ? new File("~/Documents/basiljs/bundle/lib/basil.png") : new File("%USERPROFILE%Documents/basiljs/bundle/lib/basil.png");
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
    if (Folder.fs == "Macintosh") { //Indesign Bug on Mac: Need to set app.scriptPreferences.enableRedraw = true to redraw window....
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
  if (!currLayer) {
    currentDoc();
    if (currDoc.windows.length)
      currLayer = app.activeDocument.activeLayer;
     else
      currLayer = currDoc.layers[0];

  }
  return currLayer;
};

var currentPage = function() {
  if (!currPage) {
    currentDoc();
      if (currDoc.windows.length)
        currPage = app.activeWindow.activePage;
      else
        currPage = currDoc.pages[0];
  }
  return currPage;
};

var updatePublicPageSizeVars = function () {
  var pageBounds = currentPage().bounds; // [y1, x1, y2, x2]
  var facingPages = currDoc.documentPreferences.facingPages;
  var singlePageMode = false;

  var widthOffset = heightOffset = 0;

  switch(pub.canvasMode()) {

    case pub.PAGE:
      widthOffset = 0;
      heightOffset = 0;
      b.resetMatrix();
      singlePageMode = true;
      break;

    case pub.MARGIN:
      widthOffset = - currentPage().marginPreferences.left - currentPage().marginPreferences.right;
      heightOffset = - currentPage().marginPreferences.top - currentPage().marginPreferences.bottom;
      b.resetMatrix();
      b.translate(currentPage().marginPreferences.left, currentPage().marginPreferences.top);
      singlePageMode = true;
      break;

    case pub.BLEED:
      widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset + b.doc().documentPreferences.documentBleedOutsideOrRightOffset;
      if(facingPages){
        widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset;
      }
      heightOffset = b.doc().documentPreferences.documentBleedBottomOffset + b.doc().documentPreferences.documentBleedTopOffset;
      b.resetMatrix();
      b.translate( -b.doc().documentPreferences.documentBleedInsideOrLeftOffset, -b.doc().documentPreferences.documentBleedTopOffset );

      if(facingPages && currentPage().side === PageSideOptions.RIGHT_HAND){
        b.resetMatrix();
        b.translate( 0, -b.doc().documentPreferences.documentBleedTopOffset );
      }
      singlePageMode = true;
      break;

    case pub.FACING_PAGES:
      widthOffset = 0;
      heightOffset = 0;
      b.resetMatrix();

      var w = pageBounds[3] - pageBounds[1] + widthOffset;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;

      pub.width = w * 2;

      if(currentPage().name === '1') {
        pub.width = w;
      } else if (currentPage().side === PageSideOptions.RIGHT_HAND){
        pub.translate(-w,0);
      }


      pub.height = h;
      break;

    case pub.FACING_BLEEDS:
      widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset + b.doc().documentPreferences.documentBleedOutsideOrRightOffset;
      heightOffset = b.doc().documentPreferences.documentBleedBottomOffset + b.doc().documentPreferences.documentBleedTopOffset;
      b.resetMatrix();
      b.translate( -b.doc().documentPreferences.documentBleedInsideOrLeftOffset, -b.doc().documentPreferences.documentBleedTopOffset );

      var w = pageBounds[3] - pageBounds[1] + widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;

      pub.width = w * 2;
      pub.height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND){
        pub.translate(-w+widthOffset/2,0);
      }

      break;

    case pub.FACING_MARGINS:
      widthOffset = currentPage().marginPreferences.left + currentPage().marginPreferences.right;
      heightOffset = currentPage().marginPreferences.top + currentPage().marginPreferences.bottom;
      b.resetMatrix();
      b.translate( currentPage().marginPreferences.left, currentPage().marginPreferences.top );

      var w = pageBounds[3] - pageBounds[1] - widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] - heightOffset;

      pub.width = w * 2;
      pub.height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND){
        pub.translate(-w-widthOffset/2,0);
      }

      return; // early exit

    default:
      b.error("b.canvasMode(), basil.js canvasMode seems to be messed up, please use one of the following modes: b.PAGE, b.MARGIN, b.BLEED, b.FACING_PAGES, b.FACING_MARGINS, b.FACING_BLEEDS");
      break;
  }

  if(singlePageMode){
    var w = pageBounds[3] - pageBounds[1] + widthOffset;
    var h = pageBounds[2] - pageBounds[0] + heightOffset;

    pub.width = w;
    pub.height = h;
  }
};

// internal helper to get around try/catch for finding eg. a color in the swatches
var findInCollectionByName = function(collection, name) {

/*  var found = collection.itemByName(name);
  if (!found || !found.isValid) return null;
  return found;*/

   var found = null;
   for (var i = 0; i < collection.length; i++) {
     if (collection[i].name === name) return collection[i];
   };
   return found;

};

var checkNull = pub.checkNull = function (obj) {

  if(obj === null || typeof obj === undefined) error("Received null object.");
};

var isNull = checkNull; // legacy

var error = pub.error = function(msg) {
  println(ERROR_PREFIX + msg);
  if(pub.VERBOSE_ERRORS === false) {
    throw new Error(ERROR_PREFIX + msg);
  } else {
    // this is not the place catching errors when developing on basil
    // the Error here is especially created by Basil and not by InDesign itself
    // to have more informational errors we need to work on call of the draw/setup functions
    // we could provide some more information just by extending the message
    // but we can't trace the error as long as we use the app.doScript function
    // a possibility would be calling $.eval
    //
    // For this function here I would suggest something like
    // error(msg, description)
    // but that would mean to write a extended description every time we use this.
    throw new Error(ERROR_PREFIX + msg);
  }
};

var warning = pub.warning = function(msg) {
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

// internal funtion for creating more verbose error messages
var verboseErrorMsg = pub.verboseErrorMsg = function(err) {
  var txt = [];
  txt.push("Error: " + err.name);
  txt.push("Description: " + err.description);
  txt.push("Message: " + err.message);
  txt.push("Line: " + err.line);
  txt.push("File: " + err.fileName);
  txt.push("Number: " + err.number);
  txt.push("Stack: " + $.stack);
  return txt.join("\n");
};
