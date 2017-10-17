
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

  The Lorem ipsum string of b.LOREM is taken from https://indieweb.org/Lorem_ipsum and
  is available under a CC0 public domain dedication.

  Supported Adobe InDesign versions: CS 5+

  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/
/* globals init */
// @target "InDesign";

(function(glob, app, undef) {

  /**
   * @class b
   * @static
   */
  var pub = {};

  /**
   * The basil version
   * @property VERSION {String}
   * @cat Environment
   */
  pub.VERSION = "1.1.0";

/**
 * Used with b.units() to set the coordinate system to points.
 * @property PT {String}
 * @cat Document
 * @subcat Units
 */
pub.PT = "pt";

/**
 * Used with b.units() to set the coordinate system to pixels.
 * @property PX {String}
 * @cat Document
 * @subcat Units
 */
pub.PX = "px";

/**
 * Used with b.units() to set the coordinate system to centimeters.
 * @property CM {String}
 * @cat Document
 * @subcat Units
 */

pub.CM = "cm";

/**
 * Used with b.units() to set the coordinate system to millimeters.
 * @property MM {String}
 * @cat Document
 * @subcat Units
 */
pub.MM = "mm";

/**
 * Used with b.units() to set the coordinate system to inches.
 * @property IN {String}
 * @cat Document
 * @subcat Units
 */
pub.IN = "inch";

/**
 * Used with b.colorMode() to set the color space.
 * @property RGB {String}
 * @cat Color
 */
pub.RGB = "rgb";

/**
 * Used with b.colorMode() to set the color space.
 * @property CMYK {String}
 * @cat Color
 */
pub.CMYK = "cmyk";

/**
 * Used with b.gradientMode() to set the gradient mode.
 * @property LINEAR {String}
 * @cat Color
 */
pub.LINEAR = "linear";

/**
 * Used with b.gradientMode() to set the gradient mode.
 * @property RADIAL {String}
 * @cat Color
 */
pub.RADIAL = "radial";

/**
 * Corner, used for drawing modes.
 * @property CORNER {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CORNER = "corner";

/**
 * Corners, used for drawing modes.
 * @property CORNERS {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CORNERS = "corners";

/**
 * Center, used for drawing modes.
 * @property CENTER {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CENTER = "center";

/**
 * Radius, used for drawing modes.
 * @property RADIUS {String}
 * @cat Document
 * @subcat Primitives
 */
pub.RADIUS = "radius";

/**
 * Close, used for endShape() modes.
 * @property CLOSE {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CLOSE = "close";

/**
 * Open, used for arc() modes.
 * @property OPEN {String}
 * @cat Document
 * @subcat Primitives
 */
pub.OPEN = "open";

/**
 * Chord, used for arc() modes.
 * @property CHORD {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CHORD = "chord";

/**
 * Pie, used for arc() modes.
 * @property PIE {String}
 * @cat Document
 * @subcat Primitives
 */
pub.PIE = "pie";

/**
 * Two Pi
 * @property TWO_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.TWO_PI = Math.PI * 2;

/**
 * Pi
 * @property PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.PI = Math.PI;

/**
 * Half Pi
 * @property HALF_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.HALF_PI = Math.PI / 2;

/**
 * Quarter Pi
 * @property QUARTER_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.QUARTER_PI = Math.PI / 4;

/**
 * Sin Cos Length
 * @property SINCOS_LENGTH {Number}
 * @cat Math
 * @subcat Constants
 */
pub.SINCOS_LENGTH = 720;

/**
 * Epsilon
 * @property EPSILON {Number}
 * @cat Math
 * @subcat Constants
 */
pub.EPSILON = 10e-12;

/**
 * Kappa
 * @property KAPPA {Number}
 * @cat Math
 * @subcat Constants
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
pub.KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);

/**
 * Used with b.canvasMode() to set the canvas to the full current page.
 * @property PAGE {String}
 * @cat Document
 * @subcat Page
 */
pub.PAGE = "page";

/**
 * Used with b.canvasMode() to set the canvas to the full current page minus the margins.
 * @property MARGIN {String}
 * @cat Document
 * @subcat Page
 */
pub.MARGIN = "margin";

/**
 * Used with b.canvasMode() to set the canvas to the full current page plus the bleed.
 * @property BLEED {String}
 * @cat Document
 * @subcat Page
 */
pub.BLEED = "bleed";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages.
 * @property FACING_PAGES {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_PAGES = "facing_pages";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages plus bleeds.
 * @property FACING_BLEEDS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_BLEEDS = "facing_bleeds";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages minus margins.
 * @property FACING_MARGINS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_MARGINS = "facing_margins";

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_BEGINNING {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_END {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_END = LocationOptions.AT_END;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property BEFORE {String}
 * @cat Document
 * @subcat Page
 */
pub.BEFORE = LocationOptions.BEFORE;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AFTER {String}
 * @cat Document
 * @subcat Page
 */
pub.AFTER = LocationOptions.AFTER;

/**
 * Used with b.size() to set the orientation of a given page size to portrait.
 * @property PORTRAIT {String}
 * @cat Document
 * @subcat Page
 */
pub.PORTRAIT = PageOrientation.PORTRAIT;

/**
 * Used with b.size() to set the orientation of a given page size to landscape.
 * @property LANDSCAPE {String}
 * @cat Document
 * @subcat Page
 */
pub.LANDSCAPE = PageOrientation.LANDSCAPE;

/**
 * Returns a Lorem ipsum string that can be used for testing.
 * @property LOREM {String}
 * @cat Typography
 */
pub.LOREM = "Lorem ipsum is dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/**
* The name of the current script.
* @property SCRIPTNAME {String}
* @cat Environment
*/
var stackArray = $.stack.
            replace(/[\n]toString\(\)[\n]$/,'').
            replace(/[\[\]']+/g,'').
            split(/[\n]/);
pub.SCRIPTNAME = stackArray[0] === "jsRunner.jsx" ? stackArray[1] : stackArray[0];

/**
* Used with b.go() to set Performance Mode. Disables ScreenRedraw during processing.
* @property MODESILENT {String}
* @cat Environment
* @subcat modes
*/
pub.MODESILENT = "ModeSilent";

/**
 * Used with b.go() to set Performance Mode. Processes Document in background mode. Document will not be visible until the script is done. If you are firing on a open document you'll need to save it before calling b.go(). The document will be removed from the display list and added again after the script is done. In this mode you will likely look at indesign with no open document for quite some time - do not work in indesign during this time. You may want to use b.println("yourMessage") in your script and look at the Console in estk to get information about the process.
 * @property MODEHIDDEN {String}
 * @cat Environment
 * @subcat modes
 */
pub.MODEHIDDEN = "ModeHidden";

/**
 * Default mode. Used with b.go() to set Performance Mode. Processes Document with Screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time. This mode was also the default in Versions prior to 0.22
 * @property MODEVISIBLE {String}
 * @cat Environment
 * @subcat modes
 */
pub.MODEVISIBLE = "ModeVisible";
pub.DEFAULTMODE = pub.MODEVISIBLE; // FIXME, DEFAULTMODE shouldn't be public, move init to init()


var ERROR_PREFIX = "\nBasil.js Error -> ",
  WARNING_PREFIX = "### Basil Warning -> ";

// ----------------------------------------
// public vars

/**
 * System variable which stores the width of the current page.
 * @property {Number} width Width of the current page.
 * @cat Environment
 */
pub.width = null;

/**
 * System variable which stores the height of the current page.
 * @property {Number} height Height of the current page.
 * @cat Environment
 */
pub.height = null;

// ----------------------------------------
// private vars
var addToStoryCache = null, /* tmp cache, see addToStroy(), via indesign external library file*/
  currAlign = null,
  currCanvasMode = null,
  currColorMode = null,
  currDoc = null,
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
  currPage = null,
  currPathPointer = null,
  currPolygon = null,
  currRectMode = null,
  currShapeMode = null,
  currStrokeColor = null,
  currStrokeTint = null,
  currStrokeWeight = null,
  currTracking = null,
  currUnits = null,
  currVertexPoints = null,
  currYAlign = null,
  matrixStack = null,
  noneSwatchColor = null,
  startTime = null;

// ----------------------------------------
// global functions


/**
 * @description The <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter">filter()</a> method creates a new array with all elements that pass the test implemented by the provided function.
 * @cat Data
 * @subcat Array
 * @method Array.filter
 * @param  {Function} callback The Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.
 * @return {Array} The new array with the elements that pass the test.
 */
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun) {
    if (this === null) throw new TypeError();
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") throw new TypeError();
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) res.push(val);
      }
    }
    return res;
  };
}

/**
 * @description The <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map">map()</a> method creates a new array with the results of calling a provided function on every element in this array.
 * @cat Data
 * @subcat Array
 * @method Array.map
 * @param  {Function} callback Function that produces an element of the new Array.
 * @return {Array} The new array with each element being the result of the callback function.
 */
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while(k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[ k ];
        mappedValue = callback.call(T, kValue, k, O);
        A[ k ] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

/**
* Used to run a function on all elements of an array. Please note the existance of the convenience methods b.stories(), b.paragraphs(), b.lines(), b.words() and b.characters() that are used to iterate through all instances of the given type in the given document.
*
* @cat Data
* @subcat Array
* @method Array.forEach
* @param {Array} collection The array to be processed.
* @param {Function} cb The function that will be called on each element. The call will be like function(item,i) where i is the current index of the item within the array.
*/
if (!glob.forEach) {
  glob.forEach = function(collection, cb) {
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
}
pub.forEach = glob.forEach;

/**
 * HashList is a data container that allows you to store information as key - value pairs. As usual in JavaScript mixed types of keys and values are accepted in one HashList instance.
 *
 * @constructor
 * @cat Data
 * @subcat HashList
 * @method HashList
 */
// taken from http://pbrajkumar.wordpress.com/2011/01/17/hashmap-in-javascript/
glob.HashList = function () {
  var that = {};
  that.length = 0;
  that.items = {};

  for (var key in that.items) {
    b.println(key);
  }

  // Please note: this is removing Object fields, but has to be done to have an empty "bucket"
  function checkKey(key) {
    if(that.items[key] instanceof Function) {
      that.items[key] = undefined;
    }
  }

  /**
   *
   * This removes a key - value pair by its key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.remove
   * @param {String} key The key to delete.
   * @return {Object} The value before deletion.
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
   * This gets a value by its key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.get
   * @param {String} key The key to look for.
   * @return {Object} The value.
   */
  that.get = function(key) {
    return that.items[key];
  };

  /**
   * This sets a key - value pair. If a key is already existing, the value will be updated. Please note that Functions are currently not supported as values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.set
   * @param {String} key The key to use.
   * @param {Object|String|Number|Boolean} value The value to set.
   * @return {Object} The value after setting.
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

  /**
   * Checks for the existence of a given key.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.hasKey
   * @param {String} key The key to check.
   * @return {Boolean} Returns true or false.
   */
  that.hasKey = function(key) {
    checkKey(key);
    return typeof that.items[key] != "undefined";
  };

  /**
   * Checks if a certain value exists at least once in all of the key - value pairs.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.hasValue
   * @param {Object|String|Number|Boolean} value The value to check.
   * @return {Boolean} Returns true or false.
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
   * Returns an array of all keys that are sorted by their values from highest to lowest. Please note that this only works if you have conistently used Numbers for values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getKeysByValues
   * @return {Array} An array with all the keys.
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
   * Returns an array with all keys in a sorted order from higher to lower magnitude.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getSortedKeys
   * @return {Array} An array with all the keys sorted.
   */
  that.getSortedKeys = function () {
    return that.getKeys().sort(); // ["a", "b", "z"]
  };

  /**
   * Returns an array with all keys.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getKeys
   * @return {Array} An array with all the keys.
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
   * Returns an array with all values.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.getValues
   * @return {Array} An array with all the values.
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
   * Deletes all the key - value pairs in this HashList.
   *
   * @cat Data
   * @subcat HashList
   * @method HashList.clear
   */
  that.clear = function() {
    for (var i in that.items) {
      delete that.items[i];
    }
    that.length = 0;
  };
  return that;
};


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
  currGradientMode = pub.LINEAR;
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
    }

    if (typeof glob.draw === "function") {
      runDrawOnce();
    }
  } catch (e) {
    alert(e);
    exit();
  }

  var executionDuration = pub.millis();
  if (executionDuration < 1000) {
    println("[Finished in " + executionDuration + "ms]");
  } else {
    println("[Finished in " + (executionDuration / 1000).toPrecision(3) + "s]");
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
      stopScript.open("w", undef, undef);
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
  app.doScript(function() {
    if (typeof glob.setup === "function") {
      glob.setup();
    }
  }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT, pub.SCRIPTNAME);
};

var runDrawOnce = function() {
  app.doScript(function() {
    if (typeof glob.draw === "function") {
      glob.draw();
    }
  }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT, pub.SCRIPTNAME);
};

var runDrawLoop = function() {
  app.doScript(function() {
    if (typeof glob.draw === "function") {
      glob.draw();
    }
  }, ScriptLanguage.javascript, undef, UndoModes.ENTIRE_SCRIPT, pub.SCRIPTNAME);
};

var welcome = function() {
  clearConsole();
  println("Running "
      + pub.SCRIPTNAME
      + " using basil.js "
      + pub.VERSION
      + " ...");
};

var currentDoc = function (mode) {
  if (currDoc === null || !currDoc) {
    var stack = $.stack;
    if (!(stack.match(/go\(.*\)/) || stack.match(/loop\(.*\)/))) {
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
    // in Case we break the Script during execution in MODEHIDDEN we might have documents open that are not on the display list. Close them.
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

  currFont = currDoc.textDefaults.appliedFont;
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
      widthOffset = -currentPage().marginPreferences.left - currentPage().marginPreferences.right;
      heightOffset = -currentPage().marginPreferences.top - currentPage().marginPreferences.bottom;
      b.resetMatrix();
      b.translate(currentPage().marginPreferences.left, currentPage().marginPreferences.top);
      singlePageMode = true;
      break;

    case pub.BLEED:
      widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset + b.doc().documentPreferences.documentBleedOutsideOrRightOffset;
      if(facingPages) {
        widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset;
      }
      heightOffset = b.doc().documentPreferences.documentBleedBottomOffset + b.doc().documentPreferences.documentBleedTopOffset;
      b.resetMatrix();
      b.translate(-b.doc().documentPreferences.documentBleedInsideOrLeftOffset, -b.doc().documentPreferences.documentBleedTopOffset);

      if(facingPages && currentPage().side === PageSideOptions.RIGHT_HAND) {
        b.resetMatrix();
        b.translate(0, -b.doc().documentPreferences.documentBleedTopOffset);
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

      if(currentPage().name === "1") {
        pub.width = w;
      } else if (currentPage().side === PageSideOptions.RIGHT_HAND) {
        pub.translate(-w, 0);
      }


      pub.height = h;
      break;

    case pub.FACING_BLEEDS:
      widthOffset = b.doc().documentPreferences.documentBleedInsideOrLeftOffset + b.doc().documentPreferences.documentBleedOutsideOrRightOffset;
      heightOffset = b.doc().documentPreferences.documentBleedBottomOffset + b.doc().documentPreferences.documentBleedTopOffset;
      b.resetMatrix();
      b.translate(-b.doc().documentPreferences.documentBleedInsideOrLeftOffset, -b.doc().documentPreferences.documentBleedTopOffset);

      var w = pageBounds[3] - pageBounds[1] + widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;

      pub.width = w * 2;
      pub.height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND) {
        pub.translate(-w + widthOffset / 2, 0);
      }

      break;

    case pub.FACING_MARGINS:
      widthOffset = currentPage().marginPreferences.left + currentPage().marginPreferences.right;
      heightOffset = currentPage().marginPreferences.top + currentPage().marginPreferences.bottom;
      b.resetMatrix();
      b.translate(currentPage().marginPreferences.left, currentPage().marginPreferences.top);

      var w = pageBounds[3] - pageBounds[1] - widthOffset / 2;
      var h = pageBounds[2] - pageBounds[0] - heightOffset;

      pub.width = w * 2;
      pub.height = h;

      if(currentPage().side === PageSideOptions.RIGHT_HAND) {
        pub.translate(-w - widthOffset / 2, 0);
      }

      return; // early exit

    default:
      b.error("b.canvasMode(), basil.js canvasMode seems to be messed up, please use one of the following modes: b.PAGE, b.MARGIN, b.BLEED, b.FACING_PAGES, b.FACING_MARGINS, b.FACING_BLEEDS");
      break;
  }

  if(singlePageMode) {
    var w = pageBounds[3] - pageBounds[1] + widthOffset;
    var h = pageBounds[2] - pageBounds[0] + heightOffset;

    pub.width = w;
    pub.height = h;
  }
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

var checkNull = pub.checkNull = function (obj) {

  if(obj === null || typeof obj === undefined) error("Received null object.");
};

var isNull = checkNull; // legacy

var error = pub.error = function(msg) {
  println(ERROR_PREFIX + msg);
  throw new Error(ERROR_PREFIX + msg);
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


// ----------------------------------------
// Structure

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


var textCollection = function(collection, legalContainers, container, cb) {

  checkNull(container);

  if(!(container.hasOwnProperty("contents") || container instanceof Document || container instanceof Page)) {
    error("b." + collection + "(), wrong object type. Use: " + legalContainers);
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
/**
 * @description Suspends the calling thread for a number of milliseconds.
 * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
 *
 * @cat Environment
 * @method delay
 * @param  {Number} milliseconds  The delay time in milliseconds.
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};

/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function with each story of the given document.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method stories
 * @param  {Document} doc The document instance to iterate the stories in
 * @param  {Function} [cb] The callback function to call with each story. When this function returns false the loop stops. Passed arguments: story, loopCount.
 * @example
 * b.stories(b.doc(), function(story, loopCount){
 *   b.println("Number of words in each Story:");
 *   b.println(story.words.length);
 * });
 * @return {Stories} A collection of Story objects.
 */
pub.stories = function(doc, cb) {

  checkNull(doc);

  if(arguments.length === 1 && doc instanceof Document) {
    return doc.stories;
  } else if (cb instanceof Function) {
    return forEach(doc.stories, cb);
  }
  error("b.stories(), incorrect call. Wrong parameters!");
  return null;
};

/**
 * @description If no callback function is given it returns a Collection of paragraphs in the container otherwise calls the given callback function with each paragraph of the given document, page, story or textFrame.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method paragraphs
 * @param  {Document|Page|Story|TextFrame} container The document, story, page or textFrame instance to iterate the paragraphs in.
 * @param  {Function} [cb]  Optional: The callback function to call with each paragraph. When this function returns false the loop stops. Passed arguments: para, loopCount.
 * @return {Paragraphs} A collection of Paragraph objects.
 */
pub.paragraphs = function(container, cb) {

  var legalContainers = "Document, Story, Page or TextFrame.";
  return textCollection("paragraphs", legalContainers, container, cb);

};

// /**
//  * @description If no callback function is given it returns a Collection of strings otherwise calls the given callback function with each sentences of the given document, story or text frame.
//  *
//  * cat Document
//  * subcat Multi-Getters
//  * method sentences
//  * param  {Document|Story|TextFrame} item The story or text frame instance to iterate the sentences in
//  * param  {Function} cb  Optional: The callback function to call with each sentence. When this function returns false the loop stops. Passed arguments: sentence, loopCount
//  * return {Array} An array of strings
//  *
//  */
//  // FIXME
// pub.sentences = function(item, cb) {

//   checkNull(item);
//   var err = false;
//   try{
//     item[0]; // check if list
//     err = true; // access ok -> error
//   } catch (expected) {};
//   if(err) error("b.sentences(), Array/Collection has been passed to b.sentences(). Single object expected.");

//   if(arguments.length >= 1 ) {
//     var arr;
//     try{
//       str = item.contents;
//       arr = str.match( /[^\.!\?]+[\.!\?]+/g );
//     } catch (e){
//       error("b.sentences(), Object passed to b.sentences() does not have text or is incompatible.");
//     }

//     if(arguments.length === 1) {
//       return arr;
//     } else if (cb instanceof Function) {
//       forEach(arr,cb);
//     } else {
//       error("b.sentences(), the callback parameter is not a Function.");
//     }

//   }

// };

/**
 * @description If no callback function is given it returns a Collection of lines in the container otherwise calls the given callback function with each line of the given document, page, story, textFrame or paragraph.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method lines
 * @param  {Document|Page|Story|TextFrame|Paragraph} container The document, page, story, textFrame or paragraph instance to iterate the lines in.
 * @param  {Function} [cb] Optional: The callback function to call with each line. When this function returns false the loop stops. Passed arguments: line, loopCount.
 * @return {Lines} A collection of Line objects.
 */
pub.lines = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame or Paragraph.";
  return textCollection("lines", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of words in the container otherwise calls the given callback function with each word of the given document, page, story, textFrame, paragraph or line.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method words
 * @param  {Document|Page|Story|TextFrame|Paragraph|Line} container The document, page, story, textFrame, paragraph or line instance to iterate the words in.
 * @param  {Function} [cb] The callback function to call with each word. When this function returns false the loop stops. Passed arguments: word, loopCount.
 * @return {Words} A collection of Word objects.
 */
pub.words = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph or Line.";
  return textCollection("words", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of characters in the container otherwise calls the given callback function with each character of the given document, page, story, textFrame, paragraph, line or word.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method characters
 * @param  {Document|Page|Story|TextFrame|Paragraph|Line|Word} container The document, page, story, textFrame, paragraph, line or word instance to  iterate the characters in.
 * @param  {Function} [cb] Optional: The callback function to call with each character. When this function returns false the loop stops. Passed arguments: character, loopCount
 * @return {Characters} A collection of Character objects.
 */
pub.characters = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph, Line or Word.";
  return textCollection("characters", legalContainers, container, cb);

};


/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function for each of the PageItems in the given Document, Page, Layer or Group.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method items
 * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in
 * @param  {Function|Boolean} [cb] Optional: The callback function to call for each PageItem. When this function returns false the loop stops. Passed arguments: item, loopCount.
 * @return {PageItems} A collection of PageItem objects.
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
  error("b.items(), Not a valid PageItem container, should be Document, Page, Layer or Group");
  return null;
};


/**
 * @description Removes all PageItems (including locked ones) in the given Document, Page, Layer or Group. If the selected container is a Group, the Group itself will be removed as well.
 *
 * @cat Document
 * @method clear
 * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in.
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
    error("b.clear(), not a valid container! Use: Document, Page, Layer or Group.");
  }
};

/**
 * @description Removes the provided Page, Layer, PageItem, Swatch, etc.
 *
 * @cat Document
 * @method remove
 * @param  {PageItem} obj The object to be removed.
 */
pub.remove = function(obj) {

  if(obj.hasOwnProperty("remove")) {
    obj.remove();
  } else {
    throw new Error("Provided object cannot be removed in b.remove().");
  }
};

// ----------------------------------------
// Environment

/**
 * Sets or possibly creates the current document and returns it.
 * If the param doc is not given the current document gets set to the active document
 * in the application. If no document at all is open, a new document gets created.
 *
 * @cat Document
 * @method doc
 * @param  {Document} [doc] The document to set the current document to.
 * @return {Document} The current document instance.
 */
pub.doc = function(doc) {
  if (doc instanceof Document) {
    setCurrDoc(doc);
  }
  return currentDoc();
};

/**
 * Sets the size of the current document, if arguments are given.
 * If only one argument is given, both the width and the height are set to this value.
 * Alternatively, a string can be given as the first argument to apply an existing page size preset ("A4", "Letter" etc.).
 * In this case, either b.PORTRAIT or b.LANDSCAPE can be used as a second argument to determine the orientation of the page.
 * If no argument is given, an object containing the current document's width and height is returned.
 *
 * @cat Document
 * @method size
 * @param  {Number|String} [widthOrPageSize] The desired width of the current document or the name of a page size preset.
 * @param  {Number|String} [heightOrOrientation] The desired height of the current document. If not provided the width will be used as the height. If the first argument is a page size preset, the second argument can be used to set the orientation.
 * @return {Object} Object containing the current <code>width</code> and <code>height</code> of the document.
 *
 * @example <caption>Sets the document size to 70 x 100 units</caption>
 * b.size(70, 100);
 *
 * @example <caption>Sets the document size to 70 x 70</caption>
 * b.size(70);
 *
 * @example <caption>Sets the document size to A4, keeps the current orientation in place</caption>
 * b.size("A4");
 *
 * @example <caption>Sets the document size to A4, set the orientation to landscape</caption>
 * b.size("A4", b.LANDSCAPE);
 */
pub.size = function(widthOrPageSize, heightOrOrientation) {
  if(app.documents.length === 0) {
    // there are no documents
    warning("b.size()", "You have no open document.");
    return;
  }
  if (arguments.length === 0) {
    // no arguments given
    // return the current values
    return {width: pub.width, height: pub.height};
  }

  var doc = currentDoc();

  if(typeof widthOrPageSize === "string") {

    try {
      doc.documentPreferences.pageSize = widthOrPageSize;
    } catch (e) {
      b.error("b.size(), could not find a page size preset named \"" + widthOrPageSize + "\".");
    }
    if(heightOrOrientation === b.PORTRAIT || heightOrOrientation === b.LANDSCAPE) {
      doc.documentPreferences.pageOrientation = heightOrOrientation;
    }
    pub.height = doc.documentPreferences.pageHeight;
    pub.width = doc.documentPreferences.pageWidth;
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
  pub.height = heightOrOrientation;
  pub.width = widthOrPageSize;

  return {width: pub.width, height: pub.height};

};

/**
 * Closes the current document.
 *
 * @cat Document
 * @method close
 * @param  {Object|Boolean} [saveOptions] The Indesign SaveOptions constant or either true for triggering saving before closing or false for closing without saving.
 * @param  {File} [file] The indesign file instance to save the document to.
 */
pub.close = function(saveOptions, file) {
  var doc = currentDoc();
  if (doc) {
    if(typeof saveOptions === "boolean" && saveOptions === false) {
      saveOptions = SaveOptions.no;
    }
    if(typeof saveOptions === "boolean" && saveOptions === true) {
      saveOptions = SaveOptions.yes;
    }
    doc.close(saveOptions, file);
    resetCurrDoc();
  }
};

/**
 * @description Reverts the document to its last saved state. If the current document is not saved yet, this function will close the document without saving it and reopen a fresh document so as to "revert" the unsaved document. This function is helpful during development stage to start from a new or default document each time the script is run.
 *
 * @cat Document
 * @method revert
 * @return {Document} The reverted document.
 */
pub.revert = function() {

  if(currDoc.saved && currDoc.modified) {
    var currFile = currDoc.fullName;
    currDoc.close(SaveOptions.NO);
    app.open(File(currFile));
    resetCurrDoc();
  } else if(!currDoc.saved) {
    currDoc.close(SaveOptions.NO);
    resetCurrDoc();
    app.documents.add();
    currentDoc();
  }

  return currDoc;
};

/**
 * Use this to set the dimensions of the canvas. Choose between b.PAGE (default), b.MARGIN, b.BLEED resp. b.FACING_PAGES, b.FACING_MARGINS and b.FACING_BLEEDS for book setups with facing page. Please note: Setups with more than two facing pages are not yet supported.
 * Please note that you will loose your current MatrixTransformation. You should set the canvasMode before you attempt to use b.translate(), b.rotate() and b.scale();
 * @cat Document
 * @subcat Page
 * @method canvasMode
 * @param  {String} mode The canvas mode to set.
 * @return {String} The current canvas mode.
 */
pub.canvasMode = function (m) {
  if(arguments.length === 0) {
    return currCanvasMode;
  } else if (typeof m === "string") {
    if ((m === b.FACING_PAGES || m === b.FACING_MARGINS || m === b.FACING_BLEEDS) && !b.doc().documentPreferences.facingPages) {
      b.error("b.canvasMode(), cannot set a facing pages mode to a single page document");
    }
    currCanvasMode = m;
    updatePublicPageSizeVars();
    return currCanvasMode;
  } else {
    error("b.canvasMode(), there is a problem setting the canvasMode. Please check the reference for details.");
  }
};


/**
 * Returns the current horizontal and vertical pasteboard margins and sets them if both arguements are given.
 *
 * @cat Document
 * @subcat Page
 * @method pasteboard
 * @param  {Number} h The desired horizontal pasteboard margin.
 * @param  {Number} v The desired vertical pasteboard margin.
 * @return {Array} The current horizontal, vertical pasteboard margins.
 */
pub.pasteboard = function (h, v) {
  if(arguments.length == 0) {
    return currDoc.pasteboardPreferences.pasteboardMargins;
  } else if(arguments.length == 1) {
    error("b.pasteboard() requires both a horizontal and vertical value. Please check the reference for details.");
  }else if (typeof h === "number" && typeof v === "number") {
    currDoc.pasteboardPreferences.pasteboardMargins = [h, v];
    return currDoc.pasteboardPreferences.pasteboardMargins;
  }else {
    error("b.pasteboard(), there is a problem setting the pasteboard. Please check the reference for details.");
  }
};

/**
 * Returns the current page and sets it if argument page is given. Numbering starts with 1.
 *
 * @cat Document
 * @subcat Page
 * @method page
 * @param  {Page|Number|PageItem} [page] The page object or page number to set the current page to. If you pass a PageItem the current page will be set to it's containing page.
 * @return {Page} The current page instance.
 */
pub.page = function(page) {
  if (page instanceof Page) {
    currPage = page;
  } else if (typeof page !== "undefined" && page.hasOwnProperty("parentPage")) {
    currPage = page.parentPage; // page is actually a PageItem
  } else if (typeof page === "number") {
    if(page < 1) {
      p = 0;
    } else {
      p = page - 1;
    }
    var tempPage = currentDoc().pages[p];
    try {
      tempPage.id;
    } catch (e) {
      error("b.page(), " + page + " does not exist.");
    }
    currPage = tempPage;
  } else if (typeof page !== "undefined") {
    error("b.page(), bad type for b.page().");
  }
  updatePublicPageSizeVars();
  if (currDoc.windows.length) {
    app.activeWindow.activePage = currPage;
  } // focus in GUI if not in MODEHIDDEN
  return currentPage();
};

/**
 * Adds a new page to the document. Set the optional location parameter to either b.AT_END (default), b.AT_BEGINNING, b.AFTER or b.BEFORE. b.AFTER and b.BEFORE will use the current page as insertion point.
 *
 * @cat Document
 * @subcat Page
 * @method addPage
 * @param  {String} [location] The location placement mode.
 * @return {Page} The new page.
 */
pub.addPage = function(location) {

  checkNull(location);

  if(arguments.length === 0) {
    location = b.AT_END;
  } // default

  var nP;
  try {

    switch (location) {

      case b.AT_END:
        nP = currentDoc().pages.add(location);
        break;

      case b.AT_BEGINNING:
        nP = currentDoc().pages.add(location);
        break;

      case b.AFTER:
        nP = currentDoc().pages.add(location, pub.page());
        break;

      case b.BEFORE:
        nP = currentDoc().pages.add(location, pub.page());
        break;

      default:
        throw new Error();
        break;
    }

    pub.page(nP);
    return nP;

  } catch (e) {
    error("b.addPage(), invalid location argument passed to addPage()");
  }
};


/**
 * Removes a page from the current document. This will either be the current Page if the parameter page is left empty, or the given Page object or page number.
 *
 * @cat Document
 * @subcat Page
 * @method removePage
 * @param  {Page|Number} [page] The page to be removed as Page object or page number.
 */
pub.removePage = function (page) {
  checkNull(page);
  if(typeof page === "number" || arguments.length === 0 || page instanceof Page) {
    var p = pub.page(page);
    p.remove();
    currPage = null; // reset!
    currentPage();
  } else {
    error("b.removePage(), invalid call. Wrong parameter!");
  }
};

/**
 * Returns the current page number of either the current page or the given Page object.
 *
 * @cat Document
 * @subcat Page
 * @method pageNumber
 * @param  {Page} [pageObj] The page you want to know the number of.
 * @return {Number} The page number within the document.
 */
pub.pageNumber = function (pageObj) {
  checkNull(pageObj);
  if (typeof pageObj === "number") {
    error("b.pageNumber(), cannot be called with a Number argument.");
  }
  if (pageObj instanceof Page) {
    return parseInt(pageObj.name); // current number of given page
  }
  return parseInt(pub.page().name); // number of current page
};

/**
 * Set the next page of the document to be the active one. Returns new active page.
 *
 * @cat Document
 * @subcat Page
 * @method nextPage
 * @return {Page} The active page.
 */
pub.nextPage = function () {
  var p = pub.doc().pages.nextItem(currentPage());
  return pub.page(p);
};


/**
 * Set the previous page of the document to be the active one. Returns new active page.
 *
 * @cat Document
 * @subcat Page
 * @method previousPage
 * @return {Page} The active page.
 */
pub.previousPage = function () {
  var p = pub.doc().pages.previousItem(currentPage());
  return pub.page(p);
};


/**
 * Returns the number of all pages in the current document. If a number is given as an argument,
 * it will set the document's page count to the given number by either adding pages or removing
 * pages until the number is reached. If pages are added, the master page of document's last
 * page will be applied to the new pages.
 *
 * @cat Document
 * @subcat Page
 * @method pageCount
 * @param  {Number} [pageCount] New page count of the document (integer between 1 and 9999).
 * @return {Number} The amount of pages.
 */
pub.pageCount = function(pageCount) {
  if(arguments.length) {
    if(pageCount.constructor.name === "Number" && pageCount % 1 === 0 && pageCount > 0 && pageCount < 10000) {
      currentDoc().documentPreferences.pagesPerDocument = pageCount;
    } else {
      error("b.pageCount(), wrong arguments! Use an integer between 1 and 9999 to set page count.");
    }
  }
  return currentDoc().pages.count();
};


/**
 * The number of all stories in the current document.
 *
 * @cat Document
 * @subcat Story
 * @method storyCount
 * @return {Number} count The amount of stories.
 */
pub.storyCount = function() {
  return currentDoc().stories.count();
};

/**
 * Adds a page item or a string to an existing story. You can control the position of the insert via the last parameter. It accepts either an InsertionPoint or one the following constants: b.AT_BEGINNING and b.AT_END.
 *
 * @cat Document
 * @subcat Story
 * @method addToStory
 * @param {Story} story The story.
 * @param {PageItem|String} itemOrString The itemOrString either a PageItem, a String or one the following constants: b.AT_BEGINNING and b.AT_END.
 * @param {InsertionPoint|String} insertionPointOrMode InsertionPoint or one the following constants: b.AT_BEGINNING and b.AT_END.
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
  // create an indesign library for caching the page items
  addToStoryCache = app.libraries.add(libFile);

  // self-overwrite, see self-defining-functions pattern
  pub.addToStory = function(story, itemOrString, insertionPointorMode) {
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
      }
      // add other stuff
      else {
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
      error("b.addToStory(), wrong arguments! Please use: b.addToStory(story, itemOrString, insertionPointorMode). Parameter insertionPointorMode is optional.");
    }
  };
};


/**
 * Returns the current layer if no argument is given. Sets active layer if layer object or name of existing layer is given. Newly creates layer and sets it to active if new name is given.
 *
 * @cat Document
 * @subcat Page
 * @method layer
 * @param  {Layer|String} [layer] The layer or layer name to set the current layer to.
 * @return {Layer} The current layer instance.
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
    error("b.layer(), wrong arguments. Use layer object or string instead.");
  }
  return currentLayer();
};


/**
 *  Returns the Group instance and sets it if argument Group is given.
 *
 *  @cat Document
 *  @subCat Page
 *  @method Group
 *  @param {Array} [pItem] The PageItems array (must be at least 2) or name of Group name instance.
 *  @param {String} name The name of the Group, only when creating a Group from Page Item(s).
 *  @return {Group} The current Group instance.
 */
pub.group = function (pItem, name) {
  checkNull(pItem);
  var group = null;
  if(pItem instanceof Array) {
    if(pItem.length < 2) {
      error("There must be at least two PageItems passed to b.group().");
    }
    // creates a group from Page Items
    group = currentDoc().groups.add(pItem);
    if(typeof name !== "undefined") {
      group.name = name;
    }
  } else if(typeof pItem === "string") {
    // get the Group of the given name
    group = currentDoc().groups.item(pItem);
  } else {
    error("b.group(), not a valid argument.");
  }

  return group;
};


/**
 *  Returns an array of the items that were within the Group before b.ungroup() was called
 *
 *  @cat Document
 *  @subCat Page
 *  @method Group
 *  @param {Object|String} [pItem] The Group or name of Group name instance.
 *  @param {String} name The name of the Group, only when creating a Group from Page Item(s).
 *  @return {Group} The Page Item(s) that were grouped.
 */
pub.ungroup = function(pItem) {
  checkNull(pItem);
  var ungroupedItems = null;
  if(pItem instanceof Group) {
    ungroupedItems = b.items(pItem);
    pItem.ungroup();
  } else if(typeof pItem === "string") {
    // get the Group of the given name
    var group = currentDoc().groups.item(pItem);
    ungroupedItems = b.items(group);
    group.ungroup();
  } else {
    error("b.ungroup(), not a valid Group. Please select a valid Group.");
  }
  return ungroupedItems;
};


/**
 * Returns items tagged with the given label in the InDesign Script Label pane (Window -> Utilities -> Script Label).
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method labels
 * @param  {String} label The label identifier.
 * @param  {Function} [cb] The callback function to call with each item in the search result. When this function returns false the loop stops. Passed arguments: item, loopCount.
 * @return {Array} Array of concrete PageItem instances, e.g. TextFrame or SplineItem.
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
    b.error("b.labels(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
  }
  return result;
};


/**
 * Returns the first item that is tagged with the given label in the InDesign Script Label pane (Window -> Utilities -> Script Label). Use this instead of b.labels, when you know you just have one thing with that label and don't want to deal with a single-element array.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method label
 * @param  {String} label The label identifier.
 * @return {PageItem} The first PageItem with the given label.
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
  b.error("b.label(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
};


/**
 * Returns the first currently selected object. Use this if you know you only have one selected item and don't want to deal with an array.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method selection
 * @return {Object} The first selected object.
 */
pub.selection = function() {
  if(app.selection.length === 0) {
    error("b.selection(), selection is empty. Please select something.");
  }
  return app.selection[0];
};

/**
 * Returns the currently selected object(s)
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method selections
 * @param  {Function} [cb] The callback function to call with each item in the selection. When this function returns false the loop stops. Passed arguments: item, loopCount.
 * @return {Array} Array of selected object(s).
 */
pub.selections = function(cb) {
  if(app.selection.length === 0) {
    error("b.selections(), selection is empty. Please select something.");
  }
  if (arguments.length === 1 && cb instanceof Function) {
    return forEach(app.selection, cb);
  }
  return app.selection;
};

/**
 * Returns the first item on the active page that is named by the given name in the Layers pane (Window -> Layer).
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method nameOnPage
 * @return {Object} The first object on the active page with the given name.
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
    b.error("b.nameOnPage(), no item found with the name '" + name + "' on page " + pub.pageNumber());
  }
  return result;
};


/**
 * Sets the units of the document (like right clicking the rulers). The default units of basil.js are PT.
 *
 * @cat Document
 * @method units
 * @param  {String} [units] Supported units: PT, PX, CM, MM or IN.
 * @return {String} Current unit setting.
 */
var unitsCalledCounter = 0;
pub.units = function (units) {
  checkNull(units);
  if (arguments.length === 0) {
    return currUnits;
  }

  if (units === pub.CM ||
      units === pub.MM ||
      units === pub.PT ||
      units === pub.PX ||
      units === pub.IN) {
    var unitType = null;
    if (units === pub.CM) {
      unitType = MeasurementUnits.centimeters;
    } else if (units === pub.MM) {
      unitType = MeasurementUnits.millimeters;
    } else if (units === pub.PT) {
      unitType = MeasurementUnits.points;
    } else if (units === pub.PX) {
      unitType = MeasurementUnits.pixels;
    } else if (units === pub.IN) {
      unitType = MeasurementUnits.inches;
    }
    var doc = currentDoc();

      //* MeasurementUnits.agates
      //* MeasurementUnits.picas
      //* MeasurementUnits.points
      //* MeasurementUnits.inches
      //* MeasurementUnits.inchesDecimal
      //* MeasurementUnits.millimeters
      //* MeasurementUnits.centimeters
      //* MeasurementUnits.ciceros
    doc.viewPreferences.horizontalMeasurementUnits = unitType;
    doc.viewPreferences.verticalMeasurementUnits = unitType;

    currUnits = units;
    updatePublicPageSizeVars();
  } else {
    error("b.unit(), not supported unit");
  }
  if (unitsCalledCounter === 1) {
    warning("Please note that b.units() will reset the current transformation matrix.");
  }
  unitsCalledCounter++;
  return currUnits;
};


/**
 * Creates a vertical guide line at the current spread and current layer.
 *
 * @cat Document
 * @method guideX
 * @param  {Number} x Position of the new guide line.
 * @return {Guide} New guide line.
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
 * Creates a horizontal guide line at the current spread and current layer.
 *
 * @cat Document
 * @method guideY
 * @param  {Number} y Position of the new guide line.
 * @return {Guide} New guide line.
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
 * Sets the margins of a given page. If 1 value is given, all 4 sides are set equally. If 4 values are given, the current page will be adjusted. Adding a 5th value will set the margin of a given page. Calling the function without any values, will return the margins for the current page.
 *
 * @cat Document
 * @subcat Page
 * @method margins
 * @param {Number} [top] Top margin or all if only one.
 * @param {Number} [right] Right margin.
 * @param {Number} [bottom] Bottom margin.
 * @param {Number} [left] Left margin.
 * @param {Number} [pageNumber] Sets margins to selected page, currentPage() if left blank.
 * @return {Object} Current page margins with the properties: top, right, bottom, left.
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
 * Sets the document bleeds. If one value is given, all 4 are set equally. If 4 values are given, the top/right/bottom/left document bleeds will be adjusted. Calling the function without any values, will return the document bleed settings.
 *
 * @cat Document
 * @subcat Page
 * @method bleeds
 * @param {Number} [top] Top bleed or all if only one.
 * @param {Number} [right] Right bleed.
 * @param {Number} [bottom] Bottom bleed.
 * @param {Number} [left] Left bleed.
 * @return {Object} Current document bleeds settings.
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
 * @description Inspects a given object or any other data item and prints the result to the console. This is useful for inspecting or debugging any kind of variable or data item. The optional settings object allows to control the function's output. The following parameters can be set in the settings object:
 * <code>showProps</code>: Show or hide properties. Default: <code>true</code>
 * <code>showValues</code>: Show or hide values. Default: <code>true</code>
 * <code>showMethods</code>: Show or hide methods. Default: <code>false</code>
 * <code>maxLevel</code>: Chooses how many levels of properties should be inspected recursively. Default: <code>1</code>
 * <code>propList</code>: Allows to pass an array of property names to show. If propList is not set all properties will be shown. Default: <code>[]</code> (no propList)
 * If no settings object is set, the default values will be used.
 *
 * @cat Output
 * @method inspect
 * @param  {Object} obj An object or any other data item to be inspected.
 * @param  {Object} [settings] A settings object to control the function's behavior.
 * @param  {Boolean} [settings.showProps] Show or hide properties. Default: <code>true</code>
 * @param  {Boolean} [settings.showValues] Show or hide values. Default: <code>true</code>
 * @param  {Boolean} [settings.showMethods] Show or hide methods. Default: <code>false</code>
 * @param  {Number} [settings.maxLevel] How many levels of properties should be inspected recursively. Default: <code>1</code>
 * @param  {Array} [settings.propList] Array of properties to show. Default: <code>[]</code> (no propList)
 *
 * @example <caption>Inspecting a string</caption>
 * b.inspect("foo");
 *
 * @example <caption>Inspecting the current page, its methods and an additional level of properties</caption>
 * b.inspect(b.page(), {showMethods: true, maxLevel: 2})
 *
 * @example <caption>Inspecting an ellipse, listing only the properties "geometricBounds" and "strokeWeight"</caption>
 * var myEllipse = b.ellipse(0, 0, 10, 10);
 * b.inspect(myEllipse, {maxLevel: 2, propList: ["geometricBounds, strokeWeight"]});
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
// Date

/**
 * The year() function returns the current year as an integer (2012, 2013 etc).
 *
 * @cat Environment
 * @subcat Date
 * @method year
 * @return {Number} The current year.
 */
pub.year = function() {
  return (new Date()).getFullYear();
};


/**
 * The month() function returns the current month as a value from 1 - 12.
 *
 * @cat Environment
 * @subcat Date
 * @method month
 * @return {Number} The current month number.
 */
pub.month = function() {
  return (new Date()).getMonth() + 1;
};


/**
 * The day() function returns the current day as a value from 1 - 31.
 *
 * @cat Environment
 * @subcat Date
 * @method day
 * @return {Number} The current day number.
 */
pub.day = function() {
  return (new Date()).getDate();
};


/**
 * The weekday() function returns the current weekday as a string from Sunday, Monday, Tuesday...
 *
 * @cat Environment
 * @subcat Date
 * @method weekday
 * @return {String} The current weekday name.
 */
pub.weekday = function() {
  var weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  return weekdays[(new Date()).getDay()];
};


/**
 * The hour() function returns the current hour as a value from 0 - 23.
 *
 * @cat Environment
 * @subcat Date
 * @method hour
 * @return {Number} The current hour.
 */
pub.hour = function() {
  return (new Date()).getHours();
};


/**
 * The minute() function returns the current minute as a value from 0 - 59.
 *
 * @cat Environment
 * @subcat Date
 * @method minute
 * @return {Number} The current minute.
 */
pub.minute = function() {
  return (new Date()).getMinutes();
};


/**
 * The second() function returns the current second as a value from 0 - 59.
 *
 * @cat Environment
 * @subcat Date
 * @method second
 * @return {Number} The current second.
 */
pub.second = function() {
  return (new Date()).getSeconds();
};


/**
 * Returns the number of milliseconds (thousandths of a second) since starting an applet.
 *
 * @cat Environment
 * @subcat Date
 * @method millis
 * @return {Number} The current milli.
 */
pub.millis = function() {
  return Date.now() - startTime;
};


/**
 * The millisecond() function differs from millis(), in that it returns the exact millisecond (thousandths of a second) of the current time.
 *
 * @cat Environment
 * @subcat Date
 * @method millisecond
 * @return {Number} The current millisecond.
 */
pub.millisecond = function() {
  return (new Date()).getMilliseconds();
};


/**
 * The timestamp() function returns the current date formatted as YYYYMMDD_HHMMSS for useful unique filenaming.
 *
 * @cat Environment
 * @subcat Date
 * @method timestamp
 * @return {String} The current time in YYYYMMDD_HHMMSS.
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

// ----------------------------------------
// Data

pub.JSON = {
  /**
   * Function parses and validates a string as JSON-object. Usage:
   * var obj = b.JSON.decode(str);
   * var str = b.JSON.encode(obj);
   *
   * @cat Data
   * @subcat JSON
   * @method JSON.decode
   * @param  {String} String to be parsed as JSON-object.
   * @return {Object} Returns JSON-object or throws an error if invalid JSON has been provided.
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
    error("b.JSON.decode(), invalid JSON: " + data);
  },
  /**
   * Function convert an javascript object to a JSON-string. Usage:
   * var str = b.JSON.encode(obj);
   * var obj = b.JSON.decode(str);
   *
   * @cat Data
   * @subcat JSON
   * @method JSON.encode
   * @param  {Object} Object to be converted to a JSON-string
   * @return {String} Returns JSON-string
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
   * Sets the delimiter of the CSV decode and encode function.
   *
   * @cat Data
   * @subcat CSV
   * @method CSV.delimiter
   * @param  {String} [delimiter] Optional Sets the delimiter for CSV parsing
   * @return {String} Returns the current delimiter if called without argument
  */
  this.delimiter = function(delimiter) {
    if (arguments.length === 0) return delimiterStr;
    if (typeof delimiter === "string") {
      initDelimiter(delimiter);
    } else {
      error("b.CSV.delimiter, separator has to be a character or string");
    }
  };

  /**
   * Function parses a string as CSV-object Array. Usage:
   * var arr = b.CSV.decode(str);
   * var str = b.CSV.encode(arr);
   *
   * @cat Data
   * @subcat CSV
   * @method CSV.decode
   * @param  {String} String to be parsed as CSV-object.
   * @return {Array} Returns CSV-object Array
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
   * Function convert an javascript array of objects to a CSV-string. Usage:
   * var str = b.CSV.encode(arr);
   * var arr = b.CSV.decode(str);
   *
   * @cat Data
   * @subcat CSV
   * @method CSV.encode
   * @param  {Array} Array to be converted to a CSV-string
   * @return {String} Returns CSV-string
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
    return row.map(formatValue).join(delimiterStr);
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

// -- Conversion --


/**
 * Converts a byte, char, int, or color to a String containing the
 * equivalent binary notation. For example color(0, 102, 153, 255)
 * will convert to the String "11111111000000000110011010011001". This
 * function can help make your geeky debugging sessions much happier.
 *

 * @cat Data
 * @subcat Conversion
 * @method binary
 * @param {Number} num value to convert
 * @param {Number} [numBits] number of digits to return
 * @return {String} A formatted string
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
 * Converts a String representation of a binary number to its
 * equivalent integer value. For example, unbinary("00001000") will
 * return 8.
 *
 * @cat Data
 * @subcat Conversion
 * @method unbinary
 * @param {String} binaryString value to convert
 * @return {Number} The integer representation
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


var decimalToHex = function(d, padding) {
  padding = padding === undef || padding === null ? padding = 8 : padding;
  if (d < 0) d = 4294967295 + d + 1;
  var hex = Number(d).toString(16).toUpperCase();
  while (hex.length < padding) hex = "0" + hex;
  if (hex.length >= padding) hex = hex.substring(hex.length - padding, hex.length);
  return hex;
};

/**
 * Convert a number to a hex representation.
 *
 * @cat Data
 * @subcat Conversion
 * @method hex
 * @param {Number} value The number to convert
 * @param {Number} [len] The length of the hex number to be created, default: 8
 * @return {String} The hex representation as a string
 */
pub.hex = function(value, len) {
  if (arguments.length === 1) len = 8;
  return decimalToHex(value, len);
};

var unhexScalar = function(hex) {
  var value = parseInt("0x" + hex, 16);
  if (value > 2147483647) value -= 4294967296;
  return value;
};

/**
 * Convert a hex representation to a number.
 *
 * @cat Data
 * @subcat Conversion
 * @method unhex
 * @param {String} hex The hex representation
 * @return {Number} The number
 */
pub.unhex = function(hex) {
  if (hex instanceof Array) {
    var arr = [];
    for (var i = 0; i < hex.length; i++) arr.push(unhexScalar(hex[i]));
    return arr;
  }
  return unhexScalar(hex);
};


// -- String Functions --



/**
 * Removes multiple, leading or trailing spaces and punctuation from "words". E.g. converts "word!" to "word". Especially useful together with b.words();
 *
 * @method trimWord
 * @cat Data
 * @subcat String Functions
 * @param {String} s The String to trim
 * @return {String} The trimmed string
 */
 // from: http://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces/
pub.trimWord = function(s) {
  s = s.replace(/(^[,.!?-]*)|([-,.!?]*$)/gi, "");
  s = s.replace(/\s*/gi, "");
//    s = s.replace(/[ ]{2,}/gi," ");
  s = s.replace(/\n*/, "");
  return s;
};

/**
 * Combines an array of Strings into one String, each separated by
 * the character(s) used for the separator parameter. To join arrays
 * of ints or floats, it's necessary to first convert them to strings
 * using nf() or nfs().
 *
 * @method join
 * @cat Data
 * @subcat String Functions
 * @param {Array} array A string array
 * @param {String} separator The separator to be inserted
 * @return {String} The joined string
 */
 // http://processingjs.org/reference/join_/
pub.join = function(array, separator) {
  return array.join(separator);
};

/**
 * The split() function breaks a string into pieces using a
 * character or string as the divider. The delim parameter specifies the
 * character or characters that mark the boundaries between each piece. A
 * String[] array is returned that contains each of the pieces.
 *
 * If the result is a set of numbers, you can convert the String[] array
 * to to a float[] or int[] array using the datatype conversion functions
 * int() and float() (see example above).
 *
 * The splitTokens() function works in a similar fashion, except that it
 * splits using a range of characters instead of a specific character or
 * sequence.
 *
 * @cat Data
 * @subcat String Functions
 * @method split
 * @param {String} str the String to be split
 * @param {String} [delim] The string used to separate the data
 * @return {Array} Array of strings
 */
 // http://processingjs.org/reference/split_/
pub.split = function(str, delim) {
  return str.split(delim);
};

/**
 * The splitTokens() function splits a String at one or many character
 * "tokens." The tokens parameter specifies the character or characters
 * to be used as a boundary.
 *
 * If no tokens character is specified, any whitespace character is used
 * to split. Whitespace characters include tab (\t), line feed (\n),
 * carriage return (\r), form feed (\f), and space. To convert a String
 * to an array of integers or floats, use the datatype conversion functions
 * int() and float() to convert the array of Strings.
 *
 * @cat Data
 * @subcat String Functions
 * @method splitTokens
 * @param {String} str the String to be split
 * @param {String} [tokens] list of individual characters that will be used as separators
 * @return {Array} Array of strings
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
  if (ary.length === 0) ary = undef;
  return ary;
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

function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
  var sign = value < 0 ? minus : plus;
  var autoDetectDecimals = rightDigits === 0;
  var rightDigitsOfDefault = rightDigits === undef || rightDigits < 0 ? 0 : rightDigits;
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
  if (group !== undef) {
    var i = buffer.length - 3 - rightDigitsOfDefault;
    while (i > 0) {
      buffer = buffer.substring(0, i) + group + buffer.substring(i);
      i -= 3;
    }
  }
  if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
  return sign + buffer;
}
function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
  if (value instanceof Array) {
    var arr = [];
    for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
    return arr;
  }
  return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group);
}

/**
 * Utility function for formatting numbers into strings. There
 * are two versions, one for formatting floats and one for formatting
 * ints. The values for the digits, left, and right parameters should
 * always be positive integers.

 * As shown in the above example, nf() is used to add zeros to the
 * left and/or right of a number. This is typically for aligning a list
 * of numbers. To remove digits from a floating-point number, use the
 * int(), ceil(), floor(), or round() functions.
 *
 * @cat Data
 * @subcat String Functions
 * @method nf
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nf_/
pub.nf = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits);
};

/**
 * Utility function for formatting numbers into strings. Similar to nf()
 * but leaves a blank space in front of positive numbers so they align
 * with negative numbers in spite of the minus symbol. There are two
 * versions, one for formatting floats and one for formatting ints. The
 * values for the digits, left, and right parameters should always be
 * positive integers.
 *
 * @cat Data
 * @subcat String Functions
 * @method nfs
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfs_/
pub.nfs = function(value, leftDigits, rightDigits) {
  return nfCore(value, " ", "-", leftDigits, rightDigits);
};

/**
 * Utility function for formatting numbers into strings. Similar to nf()
 * but puts a "+" in front of positive numbers and a "-" in front of
 * negative numbers. There are two versions, one for formatting floats
 * and one for formatting ints. The values for the digits, left, and right
 * parameters should always be positive integers.
 *
 * @cat Data
 * @subcat String Functions
 * @method nfp
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfp_/
pub.nfp = function(value, leftDigits, rightDigits) {
  return nfCore(value, "+", "-", leftDigits, rightDigits);
};

/**
 * Utility function for formatting numbers into strings and placing
 * appropriate commas to mark units of 1000. There are two versions, one
 * for formatting ints and one for formatting an array of ints. The value
 * for the digits parameter should always be a positive integer.
 *
 * @cat Data
 * @subcat String Functions
 * @method nfc
 * @param {Number} value The Number to convert
 * @param {Number} leftDigits
 * @param {Number} rightDigits
 * @return {String} The formatted string
 */
 // From: http://processingjs.org/reference/nfc_/
pub.nfc = function(value, leftDigits, rightDigits) {
  return nfCore(value, "", "-", leftDigits, rightDigits, ",");
};


/**
 * Removes whitespace characters from the beginning and end of a String.
 * In addition to standard whitespace characters such as space, carriage
 * return, and tab, this function also removes the Unicode "nbsp" character.
 *
 * @cat Data
 * @subcat String Functions
 * @method trim
 * @param {String|Array} str A string or an array of strings to be trimmed
 * @return {String|Array} Returns the input in a trimmed way
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
 * Checks whether an URL string is valid.
 *
 * @cat Data
 * @subcat String Functions
 * @method isURL
 * @param {String} url An url string to be checked
 * @return {Boolean} Returns either true or false
 */
var isURL = pub.isURL = function(url) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
};

/**
 * Checks whether a string ends with a specific character or string.
 *
 * @cat Data
 * @subcat String Functions
 * @method endsWith
 * @param {String} str A string to be checked
 * @param {String} suffix The string to look for
 * @return {Boolean} Returns either true or false
 */
var endsWith = pub.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * Checks whether a string starts with a specific character or string.
 *
 * @cat Data
 * @subcat String Functions
 * @method startsWith
 * @param {String} str A string to be checked
 * @param {String} prefix The string to look for
 * @return {Boolean} Returns either true or false
 */
var startsWith = pub.startsWith = function(str, prefix) {
  return str.indexOf(prefix) === 0;
};


/**
 * Checks whether a var is an Array, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isArray
 * @param  {Object|String|Number|Boolean} obj The object to check
 * @return {Boolean} returns true if this is the case
 */
var isArray = pub.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

/**
 * Checks whether a var is a number, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isNumber
 * @param  {Object|String|Number|Boolean}  num The number to check
 * @return {Boolean} returns true if this is the case
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
 * Checks whether a var is a string, returns true if this is the case
 *
 * @cat Data
 * @subcat Type-Check
 * @method isString
 * @param  {Object|String|Number|Boolean} str The string to check
 * @return {Boolean} returns true if this is the case
 */
var isString = pub.isString = function(str) {
  return Object.prototype.toString.call(str) === "[object String]";
};

/**
 * Checks whether a var is an indesign text object, returns true if this is the case
 * NB: a indesign TextFrame will return false as it is just a container holding text.
 * So you could say that isText() refers to all the things inside a TextFrame.
 *
 * @cat Document
 * @subcat Type-Check
 * @method isText
 * @param  {Character|InsertionPoint|Line|Paragraph|TextColumn|TextStyleRange|Word}  obj The object to check
 * @return {Boolean} returns true if this is the case
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


var initDataFile = function(file, mustExist) {
  var result = null;
  if (file instanceof File) {
    result = file;
  } else {
    var folder = new Folder(projectFolder().absoluteURI + "/data");
    folder.create(); // creates data folder if not existing, otherwise it just skips
    result = new File(folder.absoluteURI + "/" + file);
  }
  if (mustExist && !result.exists) {
    error("The file \"" + result + "\" does not exist.");
  }
  return result;
};

var initExportFile = function(file, mustExist) {
  var result = null;
  if (file instanceof File) {
    result = file;
  } else {

    // get rid of some special cases the user might specify
    var pathNormalized = file.split("/");
    for (var i = 0; i < pathNormalized.length; i++) {
      if (pathNormalized[i] === "" || pathNormalized[i] === ".") {
        pathNormalized.splice(i, 1);
      }
    }

    var tmpPath = projectFolder().absoluteURI;
    var fileName = pathNormalized[pathNormalized.length - 1];

    // contains the path folders? if so create them ...
    if (pathNormalized.length > 1) {
      var folders = pathNormalized.slice(0, -1);
      for (var i = 0; i < folders.length; i++) {
        tmpPath += "/" + folders[i];
        var f = new Folder(tmpPath);
        if (!f.exists) f.create();
      }
    }

    // result = new File(projectFolder().absoluteURI + '/' + file);
    result = new File(tmpPath + "/" + fileName);
  }
  if (mustExist && !result.exists) {
    error("The file \"" + result + "\" does not exist.");
  }
  return result;
};

/**
 * Get the folder of the active document as a Folder object. Use .absoluteURI to access a string representation of the folder path.
 *
 * @cat Document
 * @subcat Misc
 * @method projectFolder
 * @return {Folder} The folder of the the active document
 */
var projectFolder = pub.projectFolder = function() {
  var docPath = null;
  try {
    docPath = currentDoc().filePath;
  } catch (e) {
    error("The current document must be saved before its project directory can be accessed.");
  }
  return docPath;
};


/**
 * Executes a shell command and returns the result, currently Mac only.
 *
 * BE CAREFUL!
 *
 * @cat Data
 * @subcat Input
 * @method shellExecute
 * @param  {String} cmd The shell command to execute
 * @return {String}
 */
pub.shellExecute = function(cmd) {
  if (Folder.fs === "Macintosh") {
    try {
      return app.doScript("return do shell script item 1 of arguments", ScriptLanguage.applescriptLanguage, [cmd]);
    } catch (e) {
      error("b.shellExecute(): " + e);
    }
  } else {
    error("b.shellExecute() is a Mac only feature at the moment. Sorry!");
  }
};

/**
 * Reads the contents of a file or loads an URL into a String.
 * If the file is specified by name as String, it must be located in the document's data directory.
 *
 * @cat Data
 * @subcat Input
 * @method loadString
 * @param  {String|File} fileOrString The text file name in the document's data directory or a File instance or an URL
 * @return {String}  String file or URL content.
 */
pub.loadString = function(fileOrString) {
  if (isURL(fileOrString)) {
    return getURL(fileOrString);
  } else {
    var inputFile = initDataFile(fileOrString, true),
      data = null;
    inputFile.open("r");
    data = inputFile.read();
    inputFile.close();
    return data;
  }
};

var getURL = function(url) {
  if (isURL(url)) {
    if (Folder.fs === "Macintosh") {
      return pub.shellExecute("curl -m 15 -L '" + url + "'");
    } else {
      error("Loading of strings via an URL is a Mac only feature at the moment. Sorry!");
    }
  } else {
    error("The url " + url + " is not a valid one. Please double check!");
  }
};

/**
 * Reads the contents of a file or loads an URL and creates a String array of its individual lines.
 * If the file is specified by name as String, it must be located in the document's data directory.
 *
 * @cat Data
 * @subcat Input
 * @method loadStrings
 * @param  {String|File} file The text file name in the document's data directory or a File instance or an URL
 * @return {String[]}  Array of the individual lines in the given File or URL
 */
pub.loadStrings = function(file) {
  if (isURL(file)) {
    var result = getURL(file);
    return result.match(/[^\r\n]+/g);
  } else {
    var inputFile = initDataFile(file, true),
      result = [];
    inputFile.open("r");
    while (!inputFile.eof) {
      result.push(inputFile.readln());
    }
    inputFile.close();
    return result;
  }
};


// ----------------------------------------
// Output

/**
 * Prints a message line to the console output in the ExtendScript editor.
 *
 * @cat Output
 * @method println
 * @param {String} msg The message to print
 */
var println = pub.println = function(msg) {
  $.writeln(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg + "\n");
};

/**
 * Prints a message to the console output in the ExtendScript editor, but unlike b.println() it doesn't return the carriage to a new line at the end.
 *
 * @cat Output
 * @method print
 * @param {String} msg The message to print
 */
pub.print = function(msg) {
  $.write(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg);
};

/**
 * Print numerous information about the current environment to the console
 *
 * @cat Output
 * @method printInfo
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
 * Writes an array of strings to a file, one line per string.
 * If the given file exists it gets overridden.
 *
 * @cat Output
 * @method saveStrings
 * @param  {String|File} file The file name or a File instance
 * @param  {String[]} strings The string array to be written
 */
pub.saveStrings = function(file, strings) {
  var outputFile = initDataFile(file);
  outputFile.open("w");
  forEach(strings, function(s) {
    outputFile.writeln(s);
  });
  outputFile.close();
};

/**
 * Writes a string to a file.
 * If the given file exists it gets overridden.
 *
 * @cat Output
 * @method saveString
 * @param  {String|File} file The file name or a File instance
 * @param  {String} string The string to be written
 */
pub.saveString = function(file, string) {
  var outputFile = initDataFile(file);
  outputFile.open("w");
  outputFile.write(string);
  outputFile.close();
};

/**
 * Exports the current document as PDF to the documents folder. Please note, that export options default to the last used export settings.
 *
 * @cat Output
 * @method savePDF
 * @param {String|File} file The file name or a File instance
 * @param {Boolean} [showOptions] Whether to show the export dialog
 */
pub.savePDF = function(file, showOptions) {
  var outputFile = initExportFile(file);
  if (typeof showOptions !== "boolean") showOptions = false;
  currentDoc().exportFile(ExportFormat.PDF_TYPE, outputFile, showOptions);
};

/**
 * Exports the current document as PNG (or sequence of PNG files) to the documents folder. Please note, that export options default to the last used export settings.
 *
 * @cat Output
 * @method savePNG
 * @param {String|File} file The file name or a File instance
 * @param {Boolean} [showOptions] Whether to show the export dialog
 */
pub.savePNG = function(file, showOptions) {
  var outputFile = initExportFile(file);
  if (typeof showOptions !== "boolean") showOptions = false;
  currentDoc().exportFile(ExportFormat.PNG_FORMAT, outputFile, showOptions);
};

/**
 * Downloads an URL to a file, currently Mac only.
 *
 * @cat Output
 * @method download
 * @param {String} url The download url
 * @param {String|File} [file] A relative file path in the project folder or a File instance
 */
pub.download = function(url, file) {
  var projPath = projectFolder().fsName.replace(" ", "\\ ");
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
    downloadScript.open("w", undef, undef);
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



// ----------------------------------------
// Shape

/**
 * Draws an ellipse (oval) in the display window. An ellipse with an equal width and height is a circle.
 * The first two parameters set the location, the third sets the width, and the fourth sets the height.
 *
 * @cat Document
 * @subcat Primitives
 * @method ellipse
 * @param {Number} x X-coordinate of the ellipse.
 * @param {Number} y Y-coordinate of the ellipse.
 * @param {Number} w Width of the ellipse.
 * @param {Number} h Height of the ellipse.
 * @return {Oval} New Oval (in InDesign Scripting terms the corresponding type is Oval, not Ellipse).
 */
pub.ellipse = function(x, y, w, h) {
  if (arguments.length !== 4) error("b.ellipse(), not enough parameters to draw an ellipse! Use: x, y, w, h");
  var ellipseBounds = [];
  if (currEllipseMode === pub.CORNER) {
    ellipseBounds[0] = y;
    ellipseBounds[1] = x;
    ellipseBounds[2] = (y + h);
    ellipseBounds[3] = (x + w);
  } else if (currEllipseMode === pub.CORNERS) {
    ellipseBounds[0] = y;
    ellipseBounds[1] = x;
    ellipseBounds[2] = h;
    ellipseBounds[3] = w;
  } else if (currEllipseMode === pub.CENTER) {
    ellipseBounds[0] = y - (h / 2);
    ellipseBounds[1] = x - (w / 2);
    ellipseBounds[2] = (y + h) - (h / 2);
    ellipseBounds[3] = (x + w) - (w / 2);
  } else if (currEllipseMode === pub.RADIUS) {
    ellipseBounds[0] = y - (h);
    ellipseBounds[1] = x - (w);
    ellipseBounds[2] = y + (h);
    ellipseBounds[3] = x + (w);
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
                       currMatrix.adobeMatrix());
  } else {
    newOval.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix());
  }
  return newOval;
};

/**
 * Draws a line (a direct path between two points) to the page.
 *
 * @cat Document
 * @subcat Primitives
 * @method line
 * @param {Number} x1 X-coordinate of Point 1.
 * @param {Number} y1 Y-coordinate of Point 1.
 * @param {Number} x2 X-coordinate of Point 2.
 * @param {Number} y2 Y-coordinate of Point 2.
 * @return {GraphicLine} New GraphicLine.
 *
 *  @example
 *  var vec1 = new b.Vector( x1, y1 );
 *  var vec2 = new b.Vector( x2, y2 );
 *  b.line( vec1, vec2 );
 */
pub.line = function(x1, y1, x2, y2) {
  if (arguments.length !== 4) {
    error("b.line(), not enough parameters to draw a line! Use: x1, y1, x2, y2");
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
                   currMatrix.adobeMatrix());
  return newLine;
};

/**
 * Using the beginShape() and endShape() functions allows to create more complex forms.
 * beginShape() begins recording vertices for a shape and endShape() stops recording.
 * After calling the beginShape() function, a series of vertex() commands must follow.
 * To stop drawing the shape, call endShape(). The shapeMode parameter allows to close the shape
 * (to connect the beginning and the end).
 *
 * @cat Document
 * @subcat Primitives
 * @method beginShape
 * @param {String} shapeMode Set to b.CLOSE if the new Path should be auto-closed.
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
 * Shapes are constructed by connecting a series of vertices. vertex() is used to
 * specify the vertex coordinates of lines and polygons. It is used exclusively between
 * the beginShape() and endShape() functions.
 *
 * Use either vertex(x, y) for drawing straight corners or
 * vertex(x, y, xLeftHandle, yLeftHandle, xRightHandle, yRightHandle) for drawing bezier shapes.
 * You can also mix the two approaches.
 *
 * @cat Document
 * @subcat Primitives
 * @method vertex
 * @param  {Number} x X-coordinate of the vertex.
 * @param  {Number} y Y-coordinate of the vertex.
 * @param  {Number} [xLeftHandle] X-coordinate of the left-direction point.
 * @param  {Number} [yLeftHandle] Y-coordinate of the left-direction point.
 * @param  {Number} [xRightHandle] X-coordinate of the right-direction point.
 * @param  {Number} [yRightHandle] Y-coordinate of the right-direction point.
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
      error("b.vertex(), wrong argument count: Please use either vertex(x, y) or vertex(x, y, xLeftHandle, yLeftHandle, xRightHandle, yRightHandle)!");
    }
  } else {
    notCalledBeginShapeError();
  }
};

/**
 * The arc() function draws an arc. Arcs are drawn along the outer edge of an ellipse
 * defined by the x, y, width and height parameters.
 * The origin or the arc's ellipse may be changed with the ellipseMode() function.
 * The start and stop parameters specify the angles at which to draw the arc.
 *
 * @cat Document
 * @subcat Primitives
 * @method arc
 * @param {Number} cx X-coordinate of the arc's center.
 * @param {Number} cy Y-coordinate of the arc's center.
 * @param {Number} w Width of the arc's ellipse.
 * @param {Number} h Height of the arc's ellipse.
 * @param {Number} startAngle Starting angle of the arc in radians.
 * @param {Number} endAngle Ending angle of the arc in radians.
 * @param {String} [mode] Mode to define the rendering technique of the arc: b.OPEN (default), b.CHORD, or b.PIE.
 *
 * @return {GraphicLine|Polygon} The resulting GraphicLine or Polygon object (in InDesign Scripting terms the corresponding type is GraphicLine or Polygon, not Arc).
 *
 */
pub.arc = function(cx, cy, w, h, startAngle, endAngle, mode) {
  if (w <= 0 || endAngle < startAngle) {
    return false;
  }
  if (arguments.length < 6) error("b.arc(), not enough parameters to draw an arc! Use: x, y, w, h, startAngle, endAngle");

  var o = b.radians(1); // add 1 degree to ensure angles of 360 degrees are drawn
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

/*
 * Cubic bezier approximation of a eliptical arc
 *
 * intial source code:
 * Golan Levin
 * golan@flong.com
 * http://www.flong.com/blog/2009/bezier-approximation-of-a-circular-arc-in-processing/
 *
 * The solution is taken from this PDF by Richard DeVeneza:
 * http://www.tinaja.com/glib/bezcirc2.pdf
 * linked from this excellent site by Don Lancaster:
 * http://www.tinaja.com/cubic01.asp
 *
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

/**
 * addPath() is used to create multi component paths. Call addPath() to add
 * the vertices drawn so far to a single path. New vertices will then end up in a new path and
 * endShape() will return a multi path object. All component paths will account for
 * the setting (see b.CLOSE) given in beginShape(shapeMode).
 *
 * @cat Document
 * @subcat Primitives
 * @method addPath
 */
pub.addPath = function() {
  doAddPath();
  currPathPointer++;
};

/**
 * The endShape() function is the companion to beginShape() and may only be called
 * after beginShape().
 *
 * @cat Document
 * @subcat Primitives
 * @method endShape
 * @return {GraphicLine|Polygon} The GraphicLine or Polygon object that was created.
 */
pub.endShape = function() {
  doAddPath();
  currPolygon.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix());
  return currPolygon;
};

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


function notCalledBeginShapeError () {
  error("b.endShape(), you have to call first beginShape(), before calling vertex() and endShape()");
}

/**
 * Draws a rectangle on the page.
 *
 * @cat Document
 * @subcat Primitives
 * @method rect
 * @param  {Number} x X-coordinate of the rectangle.
 * @param  {Number} y Y-coordinate of the rectangle.
 * @param  {Number} w Width of the rectangle.
 * @param  {Number} h Height of the rectangle.
 * @return {Rectangle} The rectangle that was created.
 */
pub.rect = function(x, y, w, h) {
  if (w === 0 || h === 0) {
    // indesign doesn't draw a rectangle if width or height are set to 0
    return false;
  }
  if (arguments.length !== 4) error("b.rect(), not enough parameters to draw a rect! Use: x, y, w, h");

  var rectBounds = [];
  if (currRectMode === pub.CORNER) {
    rectBounds[0] = y;
    rectBounds[1] = x;
    rectBounds[2] = (y + h);
    rectBounds[3] = (x + w);
  } else if (currRectMode === pub.CORNERS) {
    rectBounds[0] = y;
    rectBounds[1] = x;
    rectBounds[2] = h;
    rectBounds[3] = w;
  } else if (currRectMode === pub.CENTER) {
    rectBounds[0] = y - (h / 2);
    rectBounds[1] = x - (w / 2);
    rectBounds[2] = (y + h) - (h / 2);
    rectBounds[3] = (x + w) - (w / 2);
  }

  var newRect = currentPage().rectangles.add(currentLayer());
  newRect.geometricBounds = rectBounds;
  newRect.strokeWeight = currStrokeWeight;
  newRect.strokeTint = currStrokeTint;
  newRect.fillColor = currFillColor;
  newRect.fillTint = currFillTint;
  newRect.strokeColor = currStrokeColor;

  if (currRectMode === pub.CENTER) {
    newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix());
  } else {
    newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix());
  }
  return newRect;
};


// -- Attributes --

/**
 * Modifies the location from which rectangles draw. The default mode is
 * rectMode(CORNER), which specifies the location to be the upper left
 * corner of the shape and uses the third and fourth parameters of rect()
 * to specify the width and height. The syntax rectMode(CORNERS) uses the
 * first and second parameters of rect() to set the location of one corner
 * and uses the third and fourth parameters to set the opposite corner.
 * The syntax rectMode(CENTER) draws the image from its center point and
 * uses the third and forth parameters of rect() to specify the image's
 * width and height. The syntax rectMode(RADIUS) draws the image from its
 * center point and uses the third and forth parameters of rect() to specify
 * half of the image's width and height. The parameter must be written in
 * "ALL CAPS".
 *
 * @cat Document
 * @subcat Attributes
 * @method rectMode
 * @param {String} mode The rectMode to switch to: either b.CORNER, b.CORNERS, b.CENTER, or b.RADIUS.
 *
 */
pub.rectMode = function (mode) {
  if (arguments.length === 0) return currRectMode;
  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER) {
    currRectMode = mode;
    return currRectMode;
  } else {
    error("b.rectMode(), unsupported rectMode. Use: CORNER, CORNERS, CENTER.");
  }
};

/**
 * The origin of new ellipses is modified by the ellipseMode() function.
 * The default configuration is ellipseMode(CENTER), which specifies the
 * location of the ellipse as the center of the shape. The RADIUS mode is
 * the same, but the width and height parameters to ellipse() specify the
 * radius of the ellipse, rather than the diameter. The CORNER mode draws
 * the shape from the upper-left corner of its bounding box. The CORNERS
 * mode uses the four parameters to ellipse() to set two opposing corners
 * of the ellipse's bounding box. The parameter must be written in "ALL CAPS".
 *
 * @cat Document
 * @subcat Attributes
 * @method ellipseMode
 * @param {String} mode The ellipse mode to switch to: either b.CENTER, b.RADIUS, b.CORNER, or b.CORNERS.
 */
pub.ellipseMode = function (mode) {
  if (arguments.length === 0) return currEllipseMode;
  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER || mode === pub.RADIUS) {
    currEllipseMode = mode;
    return currEllipseMode;
  } else {
    error("b.ellipseMode(), Unsupported ellipseMode. Use: CENTER, RADIUS, CORNER, CORNERS.");
  }
};

/**
 * Sets the width of the stroke used for lines and the border around shapes.
 *
 * @cat Document
 * @subcat Attributes
 * @method strokeWeight
 * @param {Number} weight The width of the stroke in points.
 */
pub.strokeWeight = function (weight) {
  if (typeof weight === "string" || typeof weight === "number") {
    currStrokeWeight = weight;
  } else {
    error("b.strokeWeight, not supported type. Please make sure the strokeweight is a number or string");
  }
};

/**
 * Returns the object style of a given page item or the object style with the given name. If an
 * object style of the given name does not exist, it gets created. Optionally a props object of
 * property name/value pairs can be used to set the object style's properties.
 *
 * @cat Typography
 * @method objectStyle
 * @param  {PageItem|String} itemOrName A page item whose style to return or the name of the object style to return.
 * @param {Object} [props] An object of property name/value pairs to set the style's properties.
 * @return {ObjectStyle} The object style instance.
 */
pub.objectStyle = function(itemOrName, props) {
  var styleErrorMsg = "b.objectStyle(), wrong parameters. Use: pageItem|name and props. Props is optional.";

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
      error("b.objectStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * Applies an object style to the given page item. The object style can be given as
 * name or as an object style instance.
 *
 * @cat Typography
 * @method applyObjectStyle
 * @param  {PageItem} item The page item to apply the style to.
 * @param {ObjectStyle|String} style An object style instance or the name of the object style to apply.
 * @return {PageItem} The page item that the style was applied to.
 */

pub.applyObjectStyle = function(item, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allObjectStyles, name);
    if(!style) {
      error("b.applyObjectStyle(), an object style named \"" + name + "\" does not exist.");
    }
  }

  if(!(item.hasOwnProperty("appliedObjectStyle")) || !(style instanceof ObjectStyle)) {
    error("b.applyObjectStyle(), wrong parameters. Use: pageItem, objectStyle|name");
  }

  item.appliedObjectStyle = style;

  return item;
};

/**
 * Duplicates the given page after the current page or the given page item to the current page and layer. Use b.rectMode() to set center point.
 *
 * @cat Document
 * @subcat Transformation
 * @method duplicate
 * @param {PageItem|Page} item The page item or page to duplicate.
 * @returns {Object} The new page item or page.
 */
pub.duplicate = function(item) {

  if(!(item instanceof Page) && typeof (item) !== "undefined" && item.hasOwnProperty("duplicate")) {

    var newItem = item.duplicate(currentPage());
    newItem.move(currentLayer());

    if (currRectMode === pub.CENTER) {
      newItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix());
    } else {
      newItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix());
    }

    return newItem;

  } else if(item instanceof Page) {

    var newPage = item.duplicate(LocationOptions.AFTER, pub.page());
    return newPage;

  } else {
    error("Please provide a valid Page or PageItem as parameter for duplicate().");
  }

};

// ----------------------------------------
// Color

/**
 * Sets the color or gradient used to fill shapes.
 * @cat Color
 * @method fill
 * @param  {Color|Gradient|Swatch|Numbers|String} fillColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 * @param  {String} [name] If created with numbers, a custom swatch name can be given.
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
      error("b.fill(), wrong parameters. Use:\n"
        + "Swatch name or\n"
        + "GRAY, [name] or\n"
        + "R, G, B, [name] or\n"
        + "C, M, Y, K, [name].\n"
        + "Name is optional.");
    }
  }
};

/**
 * Disables filling geometry. If both noStroke() and noFill() are called,
 * newly drawn shapes will be invisible.
 *
 * @cat Color
 * @method noFill
 */
pub.noFill = function () {
  currFillColor = noneSwatchColor;
};

/**
 * Sets the color or gradient used to draw lines and borders around shapes.
 * @cat Color
 * @method stroke
 * @param  {Color|Gradient|Swatch|Numbers|String} strokeColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
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
      error("b.stroke(), wrong parameters. Use:\n"
        + "Swatch name or\n"
        + "GRAY, [name] or\n"
        + "R, G, B, [name] or\n"
        + "C, M, Y, K, [name].\n"
        + "Name is optional.");
    }
  }
};

/**
 * Disables drawing the stroke. If both noStroke() and noFill() are called,
 * newly drawn shapes will be invisible.
 *
 * @cat Color
 * @method noStroke
 */
pub.noStroke = function () {
  currStrokeColor = noneSwatchColor;
};

/**
 * Sets the tint of the color used to fill shapes.
 *
 * @cat Color
 * @method fillTint
 * @param  {Number} tint Number from 0 to 100
 */
pub.fillTint = function (tint) {
  checkNull(tint);
  if (typeof tint === "string" || typeof tint === "number") {
    currFillTint = tint;
  } else {
    error("b.fillTint(), unsupported type. Please make sure the fillTint is a number or string");
  }
};

/**
 * Sets the tint of the color used to draw lines and borders around shapes.
 *
 * @cat Color
 * @method strokeTint
 * @param  {Number} tint Number from 0 to 100.
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
 * Sets the colormode for creating new colors with b.color() to RGB or CMYK. The default color mode is RGB.
 *
 * @cat Color
 * @method colorMode
 * @param  {Number} colorMode b.RGB or b.CMYK.
 */
pub.colorMode = function(colorMode) {
  checkNull(colorMode);
  if (arguments.length === 0) {
    return currColorMode;
  }
  if (colorMode === pub.RGB || colorMode === pub.CMYK) {
    currColorMode = colorMode;
  } else {
    error("b.colorMode(), unsupported colormode, use: b.RGB or b.CMYK");
  }
};

/**
 * Sets the gradient mode for b.gradient() to LINEAR or RADIAL. The default gradient mode is LINEAR.
 *
 * @cat Color
 * @method gradientMode
 * @param  {String} gradientMode b.LINEAR or b.RADIAL.
 */
pub.gradientMode = function(gradientMode) {
  checkNull(gradientMode);
  if (arguments.length === 0) {
    return currGradientMode;
  }
  if (gradientMode === pub.LINEAR || gradientMode === pub.RADIAL) {
    currGradientMode = gradientMode;
  } else {
    error("b.gradientMode(), unsupported gradient mode, use: b.LINEAR or b.RADIAL");
  }
};

/**
 * Gets a swatch by name.
 *
 * @cat Color
 * @method swatch
 * @param {String} swatchName Returns the swatch color/gradient for a given name by string.
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
      error("b.swatch() requires a string, the name of an existing swatch.");
    }
  }
}

/**
 * Creates a new RGB / CMYK color and adds it to the document, or gets a color by name from the document. The default color mode is RGB.
 *
 * @cat Color
 * @method color
 * @param  {String|Numbers} Get color: the color name. Create new color: GRAY,[name] / R,G,B,[name] / C,M,Y,K,[name]. Name is always optional.
 * @return {Color} Found or new color
 */
pub.color = function() {
  var newCol;
  var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2],
    d = arguments[3],
    e = arguments[4];
  var colorErrorMsg = "b.color(), wrong parameters. Use:\n"
      + "GRAY,[name] or \n"
      + "R,G,B,[name] in b.colorMode(b.RGB) or\n"
      + "C,M,Y,K,[name] in b.colorMode(b.CMYK).\n"
      + "Name is optional.\n"
      + "NB: In InDesign colors don't have an alpha value, use b.opacity() to set alpha.";

  if (arguments.length === 1) {
    // get color by name
    if (typeof a === "string") {
      newCol = currentDoc().colors.itemByName(a); // check color
      if (newCol.isValid) {
        return newCol;
      } else {
        error("b.color(), a color with the provided name doesn't exist.");
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
      error("b.color(), wrong type of first parameter.");
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
 * Creates a new gradient and adds it to the document, or gets a gradient by name from the document.
 * If two colors are given as the first two parameters, a gradient is created that blends between these two colors. If an array of colors is used
 * as the first parameter, a gradient with the contained colors will be created. The colors will be distributed evenly. If additionally to this array
 * a second array of gradient stop positions is given, the colors will be positioned at the given gradient stops. Possible gradient stop positions
 * range from 0 to 100. All parameter options allow for an additional name parameter at the end to name the new gradient.
 * If a string is used as the only parameter, the gradient with that name will be returned, if it exists in the document.
 *
 * @cat Color
 * @method gradient
 * @param {Color|Array|String} c1 First color of the gradient. Alternatively: Array of colors/gradients or name of gradient to get.
 * @param {Color|Array|String} c2 Second color of the gradient. Alternatively: Array of gradient stop positions (if first parameter is an array of colors).
 * @param {String} [name] Optional name of the gradient.
 * @return {Gradient} Found or new gradient
 */
pub.gradient = function() {
  var newGrad;
  // var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2];
  var gradientErrorMsg = "b.gradient(), wrong parameters. Use:\n"
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
      error("b.gradient(), a gradient with the provided name doesn't exist.");
    }
  } else if (a instanceof Color && b instanceof Color && (typeof c === "string" || arguments.length === 2)) {
    // c1 and c2
    if (typeof c === "string") {
      if(currentDoc().colors.itemByName(c).isValid) {
        error("b.gradient(), \"" + c + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(c).isValid) {
        currentDoc().gradients.itemByName(c).remove();
        warning("b.gradient(), a gradient named \"" + c + "\" already existed. The old gradient is replaced by a new one.");
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
      error("b.gradient(), arrayOfColors and arrayOfGradientStops need to have the same length.");
    }
    var z = arguments[arguments.length - 1];
    if (typeof z === "string") {
      if(currentDoc().colors.itemByName(z).isValid) {
        error("b.gradient(), \"" + z + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(z).isValid) {
        currentDoc().gradients.itemByName(z).remove();
        warning("b.gradient(), a gradient named \"" + z + "\" already existed. The old gradient is replaced by a new one.");
      }
      newGrad = currentDoc().gradients.add({name: z});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    for (var i = 0; i < a.length; i++) {
      if(!(a[i] instanceof Color || a[i] instanceof Swatch)) {
        error("b.gradient(), element #" + (i + 1) + " of the given arrayOfColors is not a color or swatch.");
      }
      if(i > newGrad.gradientStops.length - 1) {
        newGrad.gradientStops.add();
      }
      newGrad.gradientStops[i].stopColor = a[i];
      if(customStopLocations) {
        if(!(typeof b[i] === "number")) {
          error("b.gradient(), element #" + (i + 1) + " of the given arrayOfGradientStops is not a number.");
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
 * Sets the opacity property of an object.
 *
 * @cat Color
 * @method opacity
 * @param  {Object} obj The object to set opacity of.
 * @param  {Number} opacity The opacity value from 0 to 100.
 */
pub.opacity = function(obj, opacity) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.opacity = opacity;
  } else {
    warning("b.opacity(), the object " + obj.toString() + " doesn't have an opacity property");
  }
};

/**
 * Sets the Effects blendMode property of an object.
 *
 * @cat Color
 * @method blendMode
 * @param  {Object} obj The object to set blendMode of.
 * @param  {Number} blendMode The blendMode must be one of the InDesign BlendMode enum values:
 *                           BlendMode.NORMAL <br />
 *                           BlendMode.MULTIPLY <br />
 *                           BlendMode.SCREEN <br />
 *                           BlendMode.OVERLAY <br />
 *                           BlendMode.SOFT_LIGHT <br />
 *                           BlendMode.HARD_LIGHT <br />
 *                           BlendMode.COLOR_DODGE <br />
 *                           BlendMode.COLOR_BURN <br />
 *                           BlendMode.DARKEN <br />
 *                           BlendMode.LIGHTEN <br />
 *                           BlendMode.DIFFERENCE <br />
 *                           BlendMode.EXCLUSION <br />
 *                           BlendMode.HUE <br />
 *                           BlendMode.SATURATION <br />
 *                           BlendMode.COLOR <br />
 *                           BlendMode.LUMINOSITY <br />
 */
pub.blendMode = function(obj, blendMode) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.blendMode = blendMode;
  } else {
    warning("b.blendMode(), the object " + obj.toString() + " doesn't have a blendMode property");
  }
};

/**
 * Calculates a color or colors between two colors at a specific increment.
 * The amt parameter is the amount to interpolate between the two values where 0.0 equals the first color, 0.5 is half-way in between and 1.0 equals the second color.
 * N.B.: Both colors must be either CMYK or RGB.
 *
 * @cat Color
 * @method lerpColor
 * @param  {Color} c1   Input color 1.
 * @param  {Color} c2   Input color 2.
 * @param  {Number} amt The amount to interpolate between the two colors.
 * @return {Color} Interpolated color
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
      error("b.lerpColor(), both colors must be either CMYK or RGB.");
    }
  } else {
    error("b.lerpColor(), wrong parameters. Use: two colors (of the same type) and a number.");
  }
};

// ----------------------------------------
// Typography

/**
 * Creates a text frame on the current layer on the current page in the current document.
 * The text frame gets created in the position specified by the x and y parameters.
 * The default document font will be used unless a font is set with the textFont() function.
 * The default document font size will be used unless a font size is set with the textSize() function.
 * Change the color of the text with the fill() function.
 * The text displays in relation to the textAlign() and textYAlign() functions.
 * The width and height parameters define a rectangular area.
 *
 * @cat Typography
 * @method text
 * @param  {String} txt The text content to set in the text frame.
 * @param  {Number} x   x-coordinate of text frame
 * @param  {Number} y   y-coordinate of text frame
 * @param  {Number} w   width of text frame
 * @param  {Number} h   height of text frame
 * @return {TextFrame}  The created text frame instance
 */
pub.text = function(txt, x, y, w, h) {
  if (arguments.length !== 5) {
    error("b.text(), not enough parameters to draw a text! Use: b.text(txt, x, y, w, h)");
  }
  if (!(isString(txt) || isNumber(txt))) {
    warning("b.text(), the first parameter has to be a string! But is something else: " + typeof txt + ". Use: b.text(txt, x, y, w, h)");
  }
  var textFrame = currentPage().textFrames.add(currentLayer());
  textFrame.contents = txt.toString();
  textFrame.geometricBounds = [y, x, (y + h), (x + w)];
  textFrame.textFramePreferences.verticalJustification = currYAlign;

  pub.typo(textFrame, {
    appliedFont: currFont,
    pointSize: currFontSize,
    fillColor: currFillColor,
    justification: currAlign,
    leading: currLeading,
    kerningValue: currKerning,
    tracking: currTracking
  });


  if (currAlign === Justification.CENTER_ALIGN || currAlign === Justification.CENTER_JUSTIFIED) {
    textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix());
  } else {
    textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix());
  }

  return textFrame;
};

/**
 * Sets text properties to the given item. If the item is not an instance the text property can be set to,
 * the property gets set to the direct descendants of the given item, e.g. all stories of a given document.
 *
 * If no value is given and the given property is a string, the function acts as a getter and returns the
 * corresponding value(s) in an array. This can either be an array containing the value of the concrete item
 * (e.g. character) the values of the item's descendants (e.g. paragraphs of given text frame).
 *
 * @cat Typography
 * @method typo
 * @param  {Document|Spread|Page|Layer|Story|TextFrame|Text} item  The object to apply the property to.
 * @param  {String|Object} property  The text property name or an object of key/value property/value pairs.
 *                                   If property is a string and no value is given, the function acts as getter.
 * @param  {String|Number|Object} [value]  The value to apply to the property.
 * @return {String[]|Number[]|Object[]}  The property value(s) if the function acts as getter or the items the property
 *                                       was assigned to.
 */
pub.typo = function(item, property, value) {
  var result = [],
    actsAsGetter = typeof property === "string" && (value === undef || value === null),
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

  if(typeof item === "string") error("b.typo() cannot work on strings. Please pass a Text object to modify.");

  if(!isValid(item)) {
    warning("b.typo(), invalid object passed");
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

/**
 * Returns the current font and sets it if argument fontName is given.
 *
 * @cat Typography
 * @method textFont
 * @param  {String} [fontName] The name of the font to set e.g. Helvetica
 * @param  {String} [fontStyle] The font style e.g. Bold
 * @return {Font} The current font object
 */
pub.textFont = function(fontName, fontStyle) {

  if (arguments.length === 2) {
    fontName = fontName + "\t" + fontStyle;
  } else if (arguments.length === 1) {
    fontName = fontName + "\tRegular";
  } else if (arguments.length === 0) {
    return currFont;
  } else {
    error("b.textFont(), wrong parameters. To set font use: fontName, fontStyle. fontStyle is optional.");
  }

  if(app.fonts.itemByName(fontName).status !== FontStatus.INSTALLED) {
    warning("b.textFont(), font \"" + fontName.replace("\t", " ") + "\" not installed. "
      + "Using current font \"" + currFont.fontFamily + " " + currFont.fontStyleName + "\" instead.");
  } else {
    currFont = app.fonts.itemByName(fontName);
  }

  return currFont;
};

/**
 * Returns the current font size in points and sets it if argument pointSize is given.
 *
 * @cat Typography
 * @method textSize
 * @param  {Number} [pointSize] The size in points to set.
 * @return {Number}             The current point size.
 */
pub.textSize = function(pointSize) {
  if (arguments.length === 1) {
    currFontSize = pointSize;
  }
  return currFontSize;
};

/**
 * Sets the current horizontal and vertical text alignment.
 *
 * @cat Typography
 * @method textAlign
 * @param  {String} align    The horizontal text alignment to set. Must be one of the InDesign Justification enum values:
 *                           Justification.AWAY_FROM_BINDING_SIDE <br />
 *                           Justification.CENTER_ALIGN <br />
 *                           Justification.CENTER_JUSTIFIED <br />
 *                           Justification.FULLY_JUSTIFIED <br />
 *                           Justification.LEFT_ALIGN <br />
 *                           Justification.RIGHT_ALIGN <br />
 *                           Justification.RIGHT_JUSTIFIED <br />
 *                           Justification.TO_BINDING_SIDE <br />
 * @param  {String} [yAlign] The vertical text alignment to set. Must be one of the InDesign VerticalJustification enum values:
 *                           VerticalJustification.BOTTOM_ALIGN <br />
 *                           VerticalJustification.CENTER_ALIGN <br />
 *                           VerticalJustification.JUSTIFY_ALIGN <br />
 *                           VerticalJustification.TOP_ALIGN <br />
 */
pub.textAlign = function(align, yAlign) {
  currAlign = align;
  if (arguments.length === 2) currYAlign = yAlign;
};

/**
 * Returns the spacing between lines of text in units of points and sets it if argument leading is given.
 *
 * @cat Typography
 * @method textLeading
 * @param  {Number|String} [leading] The spacing between lines of text in units of points or the default Indesign enum
 *                                   value Leading.AUTO.
 * @return {Number|String}           The current leading.
 */
pub.textLeading = function(leading) {
  if (arguments.length === 1) {
    currLeading = leading;
  }
  return currLeading;
};

/**
 * Returns the current kerning and sets it if argument kerning is given.
 *
 * @cat Typography
 * @method textKerning
 * @param  {Number} [kerning] The value to set.
 * @return {Number}           The current kerning.
 */
pub.textKerning = function(kerning) {
  if (arguments.length === 1) {
    currKerning = kerning;
  }
  return currKerning;
};

/**
 * Returns the current tracking and sets it if argument tracking is given.
 *
 * @cat Typography
 * @method textTracking
 * @param  {Number} [tracking] The value to set.
 * @return {Number}            The current tracking.
 */
pub.textTracking = function(tracking) {
  if (arguments.length === 1) {
    currTracking = tracking;
  }
  return currTracking;
};

/**
 * Returns the character style of a given text object or the character style with the given name. If a
 * character style of the given name does not exist, it gets created. Optionally a props object of
 * property name/value pairs can be used to set the character style's properties.
 *
 * @cat Typography
 * @method characterStyle
 * @param  {Text|String} textOrName  A text object whose style to return or the name of the character style to return.
 * @param {Object} [props]  Optional: An object of property name/value pairs to set the style's properties.
 * @return {CharacterStyle}  The character style instance.
 */
pub.characterStyle = function(textOrName, props) {
  var styleErrorMsg = "b.characterStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

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
      error("b.characterStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * Applies a character style to the given text object, text frame or story. The character style
 * can be given as name or as character style instance.
 *
 * @cat Typography
 * @method applyCharacterStyle
 * @param  {TextFrame|TextObject|Story} text  The text frame, text object or story to apply the style to.
 * @param {CharacterStyle|String} style  A character style instance or the name of the character style to apply.
 * @return {Text}  The text that the style was applied to.
 */

pub.applyCharacterStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allCharacterStyles, name);
    if(!style) {
      error("b.applyCharacterStyle(), a character style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof CharacterStyle)) {
    error("b.applyCharacterStyle(), wrong parameters. Use: textObject|textFrame|story, characterStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.characters.everyItem();
  }

  text.appliedCharacterStyle = style;

  return text;
};

/**
 * Returns the paragraph style of a given text object or the paragraph style with the given name. If a
 * paragraph style of the given name does not exist, it gets created. Optionally a props object of
 * property name/value pairs can be used to set the paragraph style's properties.
 *
 * @cat Typography
 * @method paragraphStyle
 * @param  {Text|String} textOrName  A text object whose style to return or the name of the paragraph style to return.
 * @param {Object} [props]  Optional: An object of property name/value pairs to set the style's properties.
 * @return {ParagraphStyle}  The paragraph style instance.
 */
pub.paragraphStyle = function(textOrName, props) {
  var styleErrorMsg = "b.paragraphStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

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
      error("b.paragraphStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * Applies a paragraph style to the given text object, text frame or story. The paragraph style
 * can be given as name or as paragraph style instance.
 *
 * @cat Typography
 * @method applyParagraphStyle
 * @param  {TextFrame|TextObject|Story} text  The text frame, text object or story to apply the style to.
 * @param {ParagraphStyle|String} style  A paragraph style instance or the name of the paragraph style to apply.
 * @return {Text}  The text that the style was applied to.
 */

pub.applyParagraphStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allParagraphStyles, name);
    if(!style) {
      error("b.applyParagraphStyle(), a paragraph style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof ParagraphStyle)) {
    error("b.applyParagraphStyle(), wrong parameters. Use: textObject|textFrame|story, paragraphStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.paragraphs.everyItem();
  }

  text.appliedParagraphStyle = style;

  return text;
};

/**
 * Links the stories of two textframes to one story. Text of first textframe overflows to second one.
 *
 * @cat Story
 * @method linkTextFrames
 * @param  {TextFrame} textFrameA
 * @param  {TextFrame} textFrameB
 */
pub.linkTextFrames = function (textFrameA, textFrameB) {
  if (textFrameA instanceof TextFrame && textFrameB instanceof TextFrame) {
    textFrameA.nextTextFrame = textFrameB;
  } else {
    error("linkTextFrames(), wrong type of parameter! linkTextFrames() needs two textFrame objects to link the stories. Use: textFrameA, textFrameB");
  }
};

/**
 * Fills the given textFrame and all linked textFrame with random placeholder text. The placeholder text will be added at the end of any already existing text in the text frame.
 *
 * @cat Story
 * @method placeholder
 * @param  {TextFrame} textFrame
 * @return {Text} The inserted placeholder text.
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
// ----------------------------------------
// Image

/**
 * Adds an image to the document. If the image argument is given as a string the image file must be in the document's
 * data directory which is in the same directory where the document is saved in. The image argument can also be a File
 * instance which can be placed even before the document was saved.
 * The second argument can either be the x position of the frame to create or an instance of a rectangle,
 * oval or polygon to place the image in. If an x position is given, a y position must be given, too.
 * If x and y positions are given and width and height are not given, the frame's size gets set to the original image size.
 *
 * @cat Document
 * @subcat Image
 * @method image
 * @param  {String|File} img The image file name in the document's data directory or a File instance.
 * @param  {Number|Rectangle|Oval|Polygon} x The x position on the current page or the item instance to place the image in.
 * @param  {Number} [y] The y position on the current page. Ignored if x is not a number.
 * @param  {Number} [w] The width of the rectangle to add the image to. Ignored if x is not a number.
 * @param  {Number} [h] The height of the rectangle to add the image to. Ignored if x is not a number.
 * @return {Rectangle|Oval|Polygon} The item instance the image was placed in.
 */
pub.image = function(img, x, y, w, h) {
  var file = initDataFile(img, true),
    frame = null,
    fitOptions = null,
    width = null,
    height = null,
    imgErrorMsg = "b.image(), wrong parameters. Use:\n"
      + "b.image( {String|File}, {Rectangle|Oval|Polygon} ) or\n"
      + "b.image( {String|File}, x, y ) or\n"
      + "b.image( {String|File}, x, y, w, h )";

  if(arguments.length < 2 || arguments.length === 4 || arguments.length > 5) error(imgErrorMsg);

  if (x instanceof Rectangle ||
      x instanceof Oval ||
      x instanceof Polygon) {
    frame = x;
    fitOptions = FitOptions.FILL_PROPORTIONALLY;
  } else if (typeof x === "number" && typeof y === "number") {
    width = 1;
    height = 1;
    if (currImageMode === pub.CORNERS) {
      if (typeof w === "number" && typeof h === "number") {
        width = w - x;
        height = h - y;
        fitOptions = FitOptions.FILL_PROPORTIONALLY;
      } else if (arguments.length === 3) {
        fitOptions = FitOptions.frameToContent;
      } else {
        error(imgErrorMsg);
      }
    } else {
      if (typeof w === "number" && typeof h === "number") {
        if (w <= 0 || h <= 0) error("b.image, invalid parameters. When using b.image(img, x, y, w, h) with the default imageMode b.CORNER, parameters w and h need to be greater than 0.");
        width = w;
        height = h;
        fitOptions = FitOptions.FILL_PROPORTIONALLY;
      } else if (arguments.length === 3) {
        fitOptions = FitOptions.frameToContent;
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

  if (fitOptions) {
    frame.fit(fitOptions);
  }

  if (currImageMode === pub.CENTER) {
    var bounds = frame.geometricBounds;
    width = bounds[3] - bounds[1];
    height = bounds[2] - bounds[0];
    frame.move(null, [-(width / 2), -(height / 2)]);
    frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix());
  } else {
    frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix());
  }


  frame.strokeWeight = currStrokeWeight;
  frame.strokeTint = currStrokeTint;
  frame.strokeColor = currStrokeColor;

  return frame;
};

/**
 * Transforms position and size of an image.
 * The image fit options are always "contentToFrame".
 *
 * @cat Document
 * @subcat Image
 * @method transformImage
 * @param  {Graphic} img The image to transform.
 * @param  {Number} x The new x.
 * @param  {Number} y The new y.
 * @param  {Number} width The new width.
 * @param  {Number} height The new height.
 */
pub.transformImage = function(img, x, y, width, height) {
  if (img.hasOwnProperty("geometricBounds") && img.hasOwnProperty("fit")) {
    // [y1, x1, y2, x2]
    img.geometricBounds = [y, x, y + height, x + width];
    if (currImageMode === pub.CENTER) {
      img.move(null, [-(width / 2), -(height / 2)]);
    }
    img.fit(FitOptions.CENTER_CONTENT);
    img.fit(FitOptions.contentToFrame);
  } else {
    error("b.transformImage(), wrong type! Use: img, x, y, width, height");
  }
};

/**
 * Modifies the location from which images draw. The default mode is imageMode(CORNER), which specifies the location to be the upper left corner and uses the fourth and fifth parameters of image() to set the image's width and height. The syntax imageMode(CORNERS) uses the second and third parameters of image() to set the location of one corner of the image and uses the fourth and fifth parameters to set the opposite corner. Use imageMode(CENTER) to draw images centered at the given x and y position.
 * If no parameter is passed the currently set mode is returned as String.
 *
 * @cat Document
 * @subcat Image
 * @method imageMode
 * @param {String} [mode] Either b.CORNER, b.CORNERS, or b.CENTER.
 * @return {String} The current mode.
 */
pub.imageMode = function(mode) {
  if (arguments.length === 0) return currImageMode;

  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER) {
    currImageMode = mode;
  } else {
    error("b.imageMode(), unsupported imageMode. Use: CORNER, CORNERS, CENTER.");
  }
  return currImageMode;
};


// ----------------------------------------
// Math

var Vector = pub.Vector = function() {

  /**
   * A class to describe a two or three dimensional vector. This datatype stores two or three variables that are commonly used as a position, velocity, and/or acceleration. Technically, position is a point and velocity and acceleration are vectors, but this is often simplified to consider all three as vectors. For example, if you consider a rectangle moving across the screen, at any given instant it has a position (the object's location, expressed as a point.), a velocity (the rate at which the object's position changes per time unit, expressed as a vector), and acceleration (the rate at which the object's velocity changes per time unit, expressed as a vector). Since vectors represent groupings of values, we cannot simply use traditional addition/multiplication/etc. Instead, we'll need to do some "vector" math, which is made easy by the methods inside the Vector class.
   *
   * Constructor of Vector, can be two- or three-dimensional.
   *
   * @constructor
   * @cat Math
   * @subcat Vector
   * @method Vector
   * @param {Number} x The first vector.
   * @param {Number} y The second vector.
   * @param {Number} [z] The third vector.
   */
  function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  /**
   * Static function. Calculates the Euclidean distance between two points (considering a point as a vector object).
   * Is meant to be called "static" i.e. Vector.dist(v1, v2);
   * @cat Math
   * @subcat Vector
   * @method Vector.dist
   * @static
   * @param {Vector} v1 The first vector.
   * @param {Vector} v2 The second vector.
   * @return {Number} The distance.
   */
  Vector.dist = function(v1, v2) {
    return v1.dist(v2);
  };

  /**
   * Static function. Calculates the dot product of two vectors.
   * Is meant to be called "static" i.e. Vector.dot(v1, v2);
   * @method Vector.dot
   * @cat Math
   * @subcat Vector
   * @static
   * @param {Vector} v1 The first vector.
   * @param {Vector} v2 The second vector.
   * @return {Number} The dot product.
   */
  Vector.dot = function(v1, v2) {
    return v1.dot(v2);
  };

  /**
   * Static function. Calculates the cross product of two vectors.
   * Is meant to be called "static" i.e. Vector.cross(v1, v2);
   * @method Vector.cross
   * @cat Math
   * @subcat Vector
   * @static
   * @param {Vector} v1 The first vector.
   * @param {Vector} v2 The second vector.
   * @return {Number} The cross product.
   */
  Vector.cross = function(v1, v2) {
    return v1.cross(v2);
  };

  /**
   * Static function. Calculates the angle between two vectors.
   * Is meant to be called "static" i.e. Vector.angleBetween(v1, v2);
   * @method Vector.angleBetween
   * @cat Math
   * @subcat Vector
   * @static
   * @param {Vector} v1 The first vector.
   * @param {Vector} v2 The second vector.
   * @return {Number} The angle.
   */
  Vector.angleBetween = function(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };

  Vector.prototype = {

    /**
     * Sets the x, y, and z component of the vector using three separate variables, the data from a Vector, or the values from a float array.
     * @method Vector.set
     * @cat Math
     * @subcat Vector
     * @param {Number|Array|Vector} v Either a vector, array or x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
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
     * Gets a copy of the vector, returns a Vector object.
     * @method Vector.get
     * @cat Math
     * @subcat Vector
     * @return {Vector} A copy of the vector.
     */
    get: function() {
      return new Vector(this.x, this.y, this.z);
    },
    /**
     * Calculates the magnitude (length) of the vector and returns the result as a float
     * @method Vector.mag
     * @cat Math
     * @subcat Vector
     * @return {Number} The length.
     */
    mag: function() {
      var x = this.x,
        y = this.y,
        z = this.z;
      return Math.sqrt(x * x + y * y + z * z);
    },
    /**
     * Adds x, y, and z components to a vector, adds one vector to another.
     * @method Vector.add
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
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
     * Substract x, y, and z components or a full vector from this vector
     * @method Vector.sub
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
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
     * Multiplies this vector with x, y, and z components or another vector.
     * @method Vector.mult
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
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
     * Divides this vector through x, y, and z components or another vector.
     * @method Vector.div
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
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
     * Calculates the distance from this vector to another as x, y, and z components or full vector.
     * @method Vector.dist
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
     * @return {Number} The distance.
     */
    dist: function(v) {
      var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    /**
     * Calculates the dot product from this vector to another as x, y, and z components or full vector.
     * @method Vector.dot
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
     * @return {Number} The dot product.
     */
    dot: function(v, y, z) {
      if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
      return this.x * v + this.y * y + this.z * z;
    },
    /**
     * Calculates the cross product from this vector to another as x, y, and z components or full vector.
     * @method Vector.cross
     * @cat Math
     * @subcat Vector
     * @param {Vector|Number} v Either a full vector or an x component.
     * @param {Number} [y] The y component.
     * @param {Number} [z] The z component.
     * @return {Number} The cross product.
     */
    cross: function(v) {
      var x = this.x,
        y = this.y,
        z = this.z;
      return new Vector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y);
    },
    /**
     * Normalizes the length of this vector to 1.
     * @cat Math
     * @subcat Vector
     * @method Vector.normalize
     */
    normalize: function() {
      var m = this.mag();
      if (m > 0) this.div(m);
    },
    /**
     * Normalizes the length of this vector to the given parameter.
     * @method Vector.limit
     * @cat Math
     * @subcat Vector
     * @param {Number} high The value to scale to.
     */
    limit: function(high) {
      if (this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
    },
    /**
     * The 2D orientation (heading) of this vector in radian.
     * @method Vector.heading
     * @cat Math
     * @subcat Vector
     * @return {Number} A radian angle value.
     */
    heading: function() {
      return -Math.atan2(-this.y, this.x);
    },
    /**
     * Returns data about this vector as a string.
     * @method Vector.toString
     * @cat Math
     * @subcat Vector
     * @return {String} The x, y and z components as a string.
     */
    toString: function() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    },
    /**
     * Returns this vector as an array [x,y,z].
     * @method Vector.array
     * @cat Math
     * @subcat Vector
     * @return {Array} The x, y and z components as  an Array of [x,y,z].
     */
    array: function() {
      return [this.x, this.y, this.z];
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


// -- Calculation --

/**
 * Calculates the absolute value (magnitude) of a number. The absolute value of a number is always positive.
 *
 * @cat Math
 * @subcat Calculation
 * @method abs
 * @param {Number} val A number.
 * @return {Number} The absolute value of that number.
 */
pub.abs = Math.abs;

/**
 * Calculates the closest int value that is greater than or equal to the value of the parameter. For example, ceil(9.03) returns the value 10.
 *
 * @cat Math
 * @subcat Calculation
 * @method ceil
 * @param {Number} val An arbitrary number.
 * @return {Number} The next highest integer value.
 */
pub.ceil = Math.ceil;

/**
 * Constrains a value to not exceed a maximum and minimum value.
 *
 * @cat Math
 * @subcat Calculation
 * @method constrain
 * @param {Number} aNumber The value to constrain.
 * @param {Number} aMin Minimum limit.
 * @param {Number} aMax Maximum limit.
 * @return {Number} The constrained value.
 */
pub.constrain = function(aNumber, aMin, aMax) {
  if(arguments.length !== 3) error("b.constrain(), wrong argument count.");
  if(aNumber <= aMin) return aMin;
  if(aNumber >= aMax) return aMax;
  return aNumber;
};

/**
 * Calculates the distance between two points.
 *
 * @cat Math
 * @subcat Calculation
 * @method dist
 * @param {Number} x1 The x-coordinate of the first point.
 * @param {Number} y1 The y-coordinate of the first point.
 * @param {Number} x2 The x-coordinate of the second point.
 * @param {Number} y2 The y-coordinate of the second point.
 * @return {Number} The distance.
 */
pub.dist = function() {
  var dx, dy, dz;
  if (arguments.length === 4) {
    dx = arguments[0] - arguments[2];
    dy = arguments[1] - arguments[3];
    return Math.sqrt(dx * dx + dy * dy);
  } else {
    error("b.dist(), wrong argument count.");
  }
};

/**
 * The Math.exp() function returns ex, where x is the argument, and e is Euler's number (also known as Napier's constant), the base of the natural logarithms.
 *
 * @cat Math
 * @subcat Calculation
 * @method exp
 * @param {Number} x A number.
 * @return {Number} A number representing ex.
 */
pub.exp = Math.exp;

/**
 * Calculates the closest int value that is less than or equal to the value of the parameter.
 *
 * @cat Math
 * @subcat Calculation
 * @method floor
 * @param {Number} a A number.
 * @return {Number} Integer number.
 */
pub.floor = Math.floor;

/**
 * Calculates a number between two numbers at a specific increment. The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 *
 * @cat Math
 * @subcat Calculation
 * @method lerp
 * @param {Number} value1 First value.
 * @param {Number} value2 Second value.
 * @param {Number} amt Amount between 0.0 and 1.0.
 * @return {Number} The mapped value.
 */
pub.lerp = function(value1, value2, amt) {
  if(arguments.length !== 3) error("b.lerp(), wrong argument count.");
  return (value2 - value1) * amt + value1;
};

/**
 * Calculates the natural logarithm (the base-e logarithm) of a number. This function expects the values greater than 0.0.
 *
 * @cat Math
 * @subcat Calculation
 * @method log
 * @param {Number} x A number, must be greater then 0.0.
 * @return {Number} The natural logarithm.
 */
pub.log = Math.log;

/**
 * Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly used in computer graphics and linear algebra. Because it has no "start" position, the magnitude of a vector can be thought of as the distance from coordinate (0,0) to its (x,y) value. Therefore, mag() is a shortcut for writing "dist(0, 0, x, y)".
 *
 * @cat Math
 * @subcat Calculation
 * @method mag
 * @param {Number} x Coordinate.
 * @param {Number} y Coordinate.
 * @param {Number} [z] Coordinate, optional.
 * @return {Number} The magnitude.
 */
pub.mag = function(a, b, c) {
  if(!(arguments.length === 2 || arguments.length === 3)) error("b.mag(), wrong argument count.");
  if (c) return Math.sqrt(a * a + b * b + c * c);
  return Math.sqrt(a * a + b * b);
};

/**
 * Re-maps a number from one range to another.
 *
 * Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.
 *
 * @cat Math
 * @subcat Calculation
 * @method map
 * @param {Number} value The value to be mapped.
 * @param {Number} istart The start of the input range.
 * @param {Number} istop The end of the input range.
 * @param {Number} ostart The start of the output range.
 * @param {Number} ostop The end of the output range.
 * @return {Number} The mapped value.
 */
pub.map = function(value, istart, istop, ostart, ostop) {
  if(arguments.length !== 5) error("b.map(), wrong argument count. Use: map(value, istart, istop, ostart, ostop)");
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

/**
 * Determines the largest value in a sequence of numbers.
 *
 * @cat Math
 * @subcat Calculation
 * @method max
 * @param {Number|Array} a A value or an array of Numbers.
 * @param {Number} [b] Another value to be compared.
 * @param {Number} [c] Another value to be compared.
 * @return {Number} The highest value.
 */
pub.max = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("b.max(), non-empty array is expected");
  var max = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (max < numbers[i]) max = numbers[i];
  return max;
};

/**
 * Determines the smallest value in a sequence of numbers.
 *
 * @cat Math
 * @subcat Calculation
 * @method min
 * @param {Number|Array} a A value or an array of Numbers.
 * @param {Number} [b] Another value to be compared.
 * @param {Number} [c] Another value to be compared.
 * @return {Number} The lowest value.
 */
pub.min = function() {
  if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
  var numbers = arguments.length === 1 ? arguments[0] : arguments;
  if (!("length" in numbers && numbers.length > 0)) error("b.min(), non-empty array is expected");
  var min = numbers[0],
    count = numbers.length;
  for (var i = 1; i < count; ++i) if (min > numbers[i]) min = numbers[i];
  return min;
};

/**
 * Normalizes a number from another range into a value between 0 and 1.
 *
 * Identical to map(value, low, high, 0, 1);
 *
 * Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.
 *
 * @cat Math
 * @subcat Calculation
 * @method norm
 * @param {Number} aNumber The value to be normed.
 * @param {Number} low The lowest value to be expected.
 * @param {Number} high The highest value to be expected.
 * @return {Number} The normalized value.
 */
pub.norm = function(aNumber, low, high) {
  if(arguments.length !== 3) error("b.norm, wrong argument count.");
  return (aNumber - low) / (high - low);
};

/**
 * Facilitates exponential expressions. The pow() function is an efficient way of multiplying numbers by themselves (or their reciprocal) in large quantities. For example, pow(3, 5) is equivalent to the expression 3*3*3*3*3 and pow(3, -5) is equivalent to 1 / 3*3*3*3*3
 *
 * @cat Math
 * @subcat Calculation
 * @method pow
 * @param {Number} num Base of the exponential expression.
 * @param {Number} exponent Power of which to raise the base.
 * @return {Number} the result
 */
pub.pow = Math.pow;

/**
 * Calculates the integer closest to the value parameter. For example, round(9.2) returns the value 9.
 *
 * @cat Math
 * @subcat Calculation
 * @method round
 * @param {Number} value The value to be rounded.
 * @return {Number} The rounded value.
 */
pub.round = Math.round;

/**
 * Squares a number (multiplies a number by itself). The result is always a positive number, as multiplying two negative numbers always yields a positive result. For example, -1 * -1 = 1.
 *
 * @cat Math
 * @subcat Calculation
 * @method sq
 * @param {Number} aNumber The value to be squared.
 * @return {Number} Squared number.
 */
pub.sq = function(aNumber) {
  if(arguments.length !== 1) error("b.sq(), wrong argument count.");
  return aNumber * aNumber;
};

// -- Trigonometry --

/**
 * Calculates the square root of a number. The square root of a number is always positive, even though there may be a valid negative root. The square root s of number a is such that s*s = a. It is the opposite of squaring.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method sqrt
 * @param {Number} val A value.
 * @return {Number} Square root.
 */
pub.sqrt = Math.sqrt;

/**
 * The inverse of cos(), returns the arc cosine of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
 *
 * @cat Math
 * @subcat Trigonometry
 * @method acos
 * @param {Number} value The value whose arc cosine is to be returned.
 * @return {Number} The arc cosine.
 */
pub.acos = Math.acos;

/**
 * The inverse of sin(), returns the arc sine of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
 *
 * @cat Math
 * @subcat Trigonometry
 * @method asin
 * @param {Number} value The value whose arc sine is to be returned.
 * @return {Number} The arc sine.
 */
pub.asin = Math.asin;

/**
 * The inverse of tan(), returns the arc tangent of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
 *
 * @cat Math
 * @subcat Trigonometry
 * @method atan
 * @param {Number} value The value whose arc tangent is to be returned.
 * @return {Number} The arc tangent.
 */
pub.atan = Math.atan;

/**
 * Calculates the angle (in radians) from a specified point to the coordinate origin as measured from the positive x-axis. Values are returned as a float in the range from PI to -PI. The atan2() function is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method atan2
 * @param {Number} y The y coordinate.
 * @param {Number} x The x coordinate.
 * @return {Number} The atan2 value.
 */
pub.atan2 = Math.atan2;

/**
 * Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range -1 to 1.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method cos
 * @param {Number} rad A value in radians.
 * @return {Number} The cosine.
 */
pub.cos = Math.cos;

/**
 * Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example, 90° = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method degrees
 * @param {Number} aAngle An angle in radians.
 * @return {Number} The given angle in degree.
 */
pub.degrees = function(aAngle) {
  return aAngle * 180 / Math.PI;
};

/**
 * Converts a degree measurement to its corresponding value in radians. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example, 90° = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method radians
 * @param {Number} aAngle An angle in degree.
 * @return {Number} The given angle in radians.
 */
pub.radians = function(aAngle) {
  return aAngle / 180 * Math.PI;
};

/**
 * Calculates the sine of an angle. This function expects the values of the angle parameter to be provided in radians (values from 0 to 6.28). Values are returned in the range -1 to 1.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method sin
 * @param {Number} rad A value in radians.
 * @return {Number} The sine value.
 */
pub.sin = Math.sin;

/**
 * Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range infinity to -infinity.
 *
 * @cat Math
 * @subcat Trigonometry
 * @method tan
 * @param {Number} rad A value in radians.
 * @return {Number} The tangent value.
 */
pub.tan = Math.tan;

// -- Random --

var currentRandom = Math.random;

/**
 * Generates random numbers. Each time the random() function is called, it returns an unexpected value within the specified range. If one parameter is passed to the function it will return a float between zero and the value of the high parameter. The function call random(5) returns values between 0 and 5. If two parameters are passed, it will return a float with a value between the the parameters. The function call random(-5, 10.2) returns values between -5 and 10.2.
 *
 * One parameter sets the range from 0 to the given parameter, while with two parameters present you set the range from val1 - val2.
 *
 * @cat Math
 * @subcat Random
 * @method random
 * @param {Number} [low] The low border of the range.
 * @param {Number} [high] The high border of the range.
 * @return {Number} A random number.
 */
pub.random = function() {
  if (arguments.length === 0) return currentRandom();
  if (arguments.length === 1) return currentRandom() * arguments[0];
  var aMin = arguments[0],
    aMax = arguments[1];
  return currentRandom() * (aMax - aMin) + aMin;
};

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
/**
 * Sets the seed value for random().
 *
 * By default, random() produces different results each time the program is run. Set the seed parameter to a constant to return the same pseudo-random numbers each time the software is run.
 * @cat Math
 * @subcat Random
 * @method randomSeed
 * @param  {Number} seed The seed value.
 */
pub.randomSeed = function(seed) {
  currentRandom = (new Marsaglia(seed)).nextDouble;
};
/**
 * Random Generator with Gaussian distribution.
 * @constructor
 * @cat Math
 * @subcat Random
 * @method Random
 * @param {Number} seed The seed value.
 */
pub.Random = function(seed) {
  var haveNextNextGaussian = false,
    nextNextGaussian, random;
  /**
   * @method Random.nextGaussian
   * @return {Number} The next Gaussian random value.
   */
  this.nextGaussian = function() {
    if (haveNextNextGaussian) {
      haveNextNextGaussian = false;
      return nextNextGaussian;
    }
    var v1, v2, s;
    do {
      v1 = 2 * random() - 1;
      v2 = 2 * random() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s >= 1 || s === 0);
    var multiplier = Math.sqrt(-2 * Math.log(s) / s);
    nextNextGaussian = v2 * multiplier;
    haveNextNextGaussian = true;
    return v1 * multiplier;
  };
  random = seed === undef ? Math.random : (new Marsaglia(seed)).nextDouble;
};

function PerlinNoise(seed) {
  var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
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
var noiseProfile = {
  generator: undef,
  octaves: 4,
  fallout: 0.5,
  seed: undef
};

/**
 * Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more natural ordered, harmonic succession of numbers compared to the standard random() function. It was invented by Ken Perlin in the 1980s and been used since in graphical applications to produce procedural textures, natural motion, shapes, terrains etc.
 *
 * The main difference to the random() function is that Perlin noise is defined in an infinite n-dimensional space where each pair of coordinates corresponds to a fixed semi-random value (fixed only for the lifespan of the program). The resulting value will always be between 0.0 and 1.0. basil.js can compute 1D, 2D and 3D noise, depending on the number of coordinates given. The noise value can be animated by moving through the noise space. The 2nd and 3rd dimension can also be interpreted as time.
 *
 * The actual noise is structured similar to an audio signal, in respect to the function's use of frequencies. Similar to the concept of harmonics in physics, perlin noise is computed over several octaves which are added together for the final result.
 *
 * Another way to adjust the character of the resulting sequence is the scale of the input coordinates. As the function works within an infinite space the value of the coordinates doesn't matter as such, only the distance between successive coordinates does (eg. when using noise() within a loop). As a general rule the smaller the difference between coordinates, the smoother the resulting noise sequence will be. Steps of 0.005-0.03 work best for most applications, but this will differ depending on use.
 *
 * @cat Math
 * @subcat Random
 * @method noise
 * @param {Number} x Coordinate in x space.
 * @param {Number} [y] Coordinate in y space.
 * @param {Number} [z] Coordinate in z space.
 * @return {Number} The noise value.
 */
pub.noise = function(x, y, z) {
  if (noiseProfile.generator === undef) noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
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
 * Adjusts the character and level of detail produced by the Perlin noise function. Similar to harmonics in physics, noise is computed over several octaves. Lower octaves contribute more to the output signal and as such define the overal intensity of the noise, whereas higher octaves create finer grained details in the noise sequence. By default, noise is computed over 4 octaves with each octave contributing exactly half than its predecessor, starting at 50% strength for the 1st octave. This falloff amount can be changed by adding an additional function parameter. Eg. a falloff factor of 0.75 means each octave will now have 75% impact (25% less) of the previous lower octave. Any value between 0.0 and 1.0 is valid, however note that values greater than 0.5 might result in greater than 1.0 values returned by noise().
 *
 * By changing these parameters, the signal created by the noise() function can be adapted to fit very specific needs and characteristics.
 *
 * @cat Math
 * @subcat Random
 * @method noiseDetail
 * @param {Number} octaves Number of octaves to be used by the noise() function.
 * @param {Number} fallout Falloff factor for each octave.
 */
pub.noiseDetail = function(octaves, fallout) {
  noiseProfile.octaves = octaves;
  if (fallout !== undef) noiseProfile.fallout = fallout;
};

/**
 * Sets the seed value for noise(). By default, noise() produces different results each time the program is run. Set the value parameter to a constant to return the same pseudo-random numbers each time the software is run.
 *
 * @cat Math
 * @subcat Random
 * @method noiseSeed
 * @param {Number} seed Noise seed value.
 */
pub.noiseSeed = function(seed) {
  noiseProfile.seed = seed;
  noiseProfile.generator = undef;
};


// ----------------------------------------
// Transform
// geometricBounds hint: [y1, x1, y2, x2]

var precision = function(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

/**
 * The function calculates the geometric bounds of any given object. Use b.itemX(), b.itemY(), b.itemPosition(), b.itemWidth(), b.itemHeight() and b.itemSize() to modify PageItems.
 * In case the object is any kind of text, then additional typographic information baseline and xHeight are calculated
 *
 * @cat Document
 * @subcat Transformation
 * @method bounds
 * @param  {Text|Object} obj The object to calculate the geometric bounds.
 * @return {Object} Geometric bounds object with these properties: width, height, left, right, top, bottom and for text: baseline, xHeight.
 */
pub.bounds = function (obj) {
  var x1, y1, x2, y2, w, h;

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
      warning("b.bounds(), not possible to get correct bounds, possible line break within textObj");
    }

    // We not sure if this 100% correct, check
    // http://en.wikipedia.org/wiki/File:Typography_Line_Terms.svg
    var xHeight = y1 + descent;

    return {"width":w,
            "height":h,
            "left":x1,
            "right":x2,
            "top":y1,
            "bottom":y2,
            "baseline":baseline,
            "xHeight":xHeight};
  } else {
    // is it a pageItem?
    if (obj.hasOwnProperty("geometricBounds")) {
      var geometricBounds = obj.geometricBounds; // [y1, x1, y2, x2]
      x1 = geometricBounds[1];
      y1 = geometricBounds[0];
      x2 = geometricBounds[3];
      y2 = geometricBounds[2];
      w = x2 - x1;
      h = y2 - y1;
      return {"width":w, "height":h, "left":x1, "right":x2, "top":y1, "bottom":y2};
    }
    // everything else e.g. page, spread
    else if (obj.hasOwnProperty("bounds")) {
      var bounds = obj.bounds; // [y1, x1, y2, x2]
      x1 = bounds[1];
      y1 = bounds[0];
      x2 = bounds[3];
      y2 = bounds[2];
      w = x2 - x1;
      h = y2 - y1;
      return {"width":w, "height":h, "left":x1, "right":x2, "top":y1, "bottom":y2};
    }
    // no idea what that might be, give up
    else {
      error("b.bounds(), invalide type of parameter! Can't get bounds for this object.");
    }
  }
};

/**
 * Positions a PageItem at the designated spot on the x axis. If no x argument is given the current x position is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemX
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [x] The new x position, optional.
 * @returns {Number} The current x position.
 */
pub.itemX = function(pItem, x) {
  var off = 0;
  if(currRectMode !== b.CORNER) pub.warning("b.itemX(), please note that only b.CORNER positioning is fully supported. Use with care.");
  if(typeof pItem !== "undef" && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof x === "number") {
      var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
      var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
      pItem.geometricBounds = [pItem.geometricBounds[0] - off, x - off, pItem.geometricBounds[0] + height - off, x - off + width];
    } else {
      return precision(pItem.geometricBounds[1], 5) + off; // CS6 sets geometricBounds to initially slightly off values... terrible workaround
    }
  } else {
    error("b.itemX(), pItem has to be a valid PageItem");
  }
};

/**
 * Positions a PageItem at the designated spot on the y axis. If no y argument is given the current y position is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemY
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [y] The new y position, optional.
 * @returns {Number} The current y position.
 */
pub.itemY = function(pItem, y) {
  var off = 0;
  if(currRectMode !== b.CORNER) pub.warning("b.itemY(), please note that only b.CORNER positioning is fully supported. Use with care.");
  if(typeof pItem !== "undef" && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof y === "number") {
      var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
      var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
      b.itemPosition(pItem, pItem.geometricBounds[1] - off, y);
      pItem.geometricBounds = [y, pItem.geometricBounds[1] - off, y + height, pItem.geometricBounds[1] + width - off];
    } else {
      return precision(pItem.geometricBounds[0], 5) + off;
    }
  } else {
    error("b.itemY(), pItem has to be a valid PageItem");
  }
};

/* global precision */
/**
 * @description Scales the given PageItem to the given width. If width is not given as argument the current width is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemWidth
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [width] The new width.
 * @returns {Number} The current width.
 */
pub.itemWidth = function(pItem, width) {
  if(currRectMode !== b.CORNER) {
    pub.warning("b.itemWidth(), please note that only b.CORNER positioning is fully supported. Use with care.");
  }
  if(typeof pItem !== "undef" && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof width === "number") {
      b.itemSize(pItem, width, Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]));
    } else {
      return Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]);
    }
  } else {
    error("b.itemWidth(), pItem has to be a valid PageItem");
  }
};

/**
 * @description Scales the given PageItem to the given height. If height is not given as argument the current height is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemHeight
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [height] The new height.
 * @returns {Number} The current height.
 */
pub.itemHeight = function(pItem, height) {
  if(currRectMode !== b.CORNER) {
    pub.warning("b.itemHeight(), please note that only b.CORNER positioning is fully supported. Use with care.");
  }
  if(typeof pItem !== "undef" && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof height === "number") {
      b.itemSize(pItem, Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]), height);
    } else {
      return Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]);
    }
  } else {
    error("b.itemHeight(), pItem has to be a valid PageItem");
  }
};

/**
 * @description Moves the given PageItem to the given position. If x or y is not given as argument the current position is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemPosition
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [x] The new x coordinate.
 * @param {Number} [y] The new y coordinate.
 * @returns {Object} Returns an object with the fields x and y.
 */
pub.itemPosition = function(pItem, x, y) {

  if(currRectMode !== b.CORNER) {
    pub.warning("b.itemPosition(), please note that only b.CORNER positioning is fully supported. Use with care.");
  }
  if (typeof pItem !== "undef" && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof x === "number" && typeof y === "number") {
      var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
      var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
      var offX = 0;
      var offY = 0;
      // if(currRectMode === b.CENTER) {
      //   offX = width / 2;
      //   offY = height / 2;
      // }
      pItem.geometricBounds = [y + offY, x + offX, y + height + offY, x + width + offX];
    } else {
      return {x: precision(pItem.geometricBounds[1], 5), y: precision(pItem.geometricBounds[0], 5)};
    }
  } else {
    error("b.itemPosition(), works only with child classes of PageItem.");
  }
};

/**
 * @description Scales the given PageItem to the given size. If width or height is not given as argument the current size is returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method itemSize
 * @param {PageItem} pItem The PageItem to alter.
 * @param {Number} [width] The new width.
 * @param {Number} [height] The new height.
 * @returns {Object} Returns an object with the fields width and height.
 */
pub.itemSize = function(pItem, width, height) {
  if(currRectMode !== b.CORNER) {
    pub.warning("b.itemSize(), please note that only b.CORNER positioning is fully supported. Use with care.");
  }
  if (pItem !== null && pItem.hasOwnProperty("geometricBounds")) {

    var x = pItem.geometricBounds[1];
    var y = pItem.geometricBounds[0];

    if(typeof width === "number" && typeof height === "number") {
      // if(currRectMode === b.CENTER) {
      //   // current center, calc old width and height
      //   x = x + (pItem.geometricBounds[3] - pItem.geometricBounds[1]) / 2;
      //   y = y + (pItem.geometricBounds[2] - pItem.geometricBounds[0]) / 2;
      //   pItem.geometricBounds = [ y - height / 2, x - width / 2, y + height / 2, x + width / 2];
      // } else {
      pItem.geometricBounds = [y, x, y + height, x + width];
      // }

    } else {
      return {width: pItem.geometricBounds[3] - pItem.geometricBounds[1], height: pItem.geometricBounds[2] - pItem.geometricBounds[0]};
    }

  } else {
    error("b.itemSize(), works only with child classes of PageItem.");
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

/**
 * @description A matrix.
 * @cat Document
 * @subcat Transformation
 */
var Matrix2D = pub.Matrix2D = function() {
  if (arguments.length === 0) {
    this.reset();
  } else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) {
    this.set(arguments[0].array());
  } else if (arguments.length === 6) {
    this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
  }
};
/**
 * @cat Document
 * @subcat Transformation
 * @description A Matrix object.
 * @type {Object}
 */
Matrix2D.prototype = {
  /**
   * @method Matrix2D.set
   * @cat Document
   * @subcat Transformation
   * @description Set a Matrix.
   */
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

/**
 * @description Get a Matrix.
 * @method Matrix2D.get
 * @cat Document
 * @subcat Transformation
 * @return {Matrix2D} The current Matrix.
 */
  get: function() {
    var outgoing = new Matrix2D();
    outgoing.set(this.elements);
    return outgoing;
  },
/**
 * @description Reset the Matrix.
 * @method Matrix2D.reset
 * @cat Document
 * @subcat Transformation
 */
  reset: function() {
    this.set([1, 0, 0, 0, 1, 0]);
  },
  /**
   * @description Slice the Matrix into an array.
   * @method Matrix2D.array
   * @cat Document
   * @subcat Transformation
   * @return {Array} Returns an sliced array.
   */
  array: function array() {
    return this.elements.slice();
  },
  /**

   * @description Slice the Matrix into an array.
   * @cat Document
   * @method Matrix2D.adobeMatrix
   * @subcat Transformation
   * @return {Array} Returns an Adobe Matrix.
   */
  adobeMatrix: function array() {

    var uVX = new UnitValue(this.elements[2], currUnits);
    var uVY = new UnitValue(this.elements[5], currUnits);

    return [
      this.elements[0],
      this.elements[3],
      this.elements[1],
      this.elements[4],
      uVX.as("pt"),
      uVY.as("pt")
    ];
  },
  /**
   * @description translate Needs more description.
   * @cat Document
   * @method Matrix2D.translate
   * @subcat Transformation
   * @param  {Number} tx …
   * @param  {Number} ty …
   */
  translate: function(tx, ty) {
    this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
    this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
  },
  /**
   * @description invTranslate Needs more description.
   * @method Matrix2D.invTranslate
   * @cat Document
   * @subcat Transformation
   * @param  {Number} tx …
   * @param  {Number} ty …
   */
  invTranslate: function(tx, ty) {
    this.translate(-tx, -ty);
  },
  /**
   * @description transpose Needs more description.
   * @method Matrix2D.transpose
   * @cat Document
   * @subcat Transformation
   */
  transpose: function() {},
  /**
   * @description mult Needs more description.
   * @method Matrix2D.mult
   * @cat Document
   * @subcat Transformation
   * @param  {Vector|Array} source …
   * @param  {Vector|Array} [target] …
   * @return {Vector} A multiplied Vector.
   */
  mult: function(source, target) {
    var x, y;
    if (source instanceof Vector) {
      x = source.x;
      y = source.y;
      if (!target) {
        target = new Vector();
      }
    } else if (source instanceof Array) {
      x = source[0];
      y = source[1];
      if (!target) {
        target = [];
      }
    }
    if (target instanceof Array) {
      target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2];
      target[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5];
    } else if (target instanceof Vector) {
      target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2];
      target.y = this.elements[3] * x + this.elements[4] * y + this.elements[5];
      target.z = 0;
    }
    return target;
  },
  /**
   * @description multX Needs more description.
   * @method Matrix2D.multX
   * @cat Document
   * @subcat Transformation
   * @param  {Number} x …
   * @param  {Number} y …
   * @return {Number} A mulitplied X value.
   */
  multX: function(x, y) {
    return x * this.elements[0] + y * this.elements[1] + this.elements[2];
  },
  /**
   * @description multY Needs more description.
   * @method Matrix2D.multY
   * @cat Document
   * @subcat Transformation
   * @param  {Number} x …
   * @param  {Number} y …
   * @return {Number}   A multiplied Y value.
   */
  multY: function(x, y) {
    return x * this.elements[3] + y * this.elements[4] + this.elements[5];
  },
  /*
  // BUG, seems to be buggy in processing.js, and i am not clever enough to figure it out
  shearX: function(angle) {
    this.apply(1, 0, 1, Math.tan(angle), 0, 0)
  },
  shearY: function(angle) {
    this.apply(1, 0, 1, 0, Math.tan(angle), 0)
  },*/
  /**
   * @description determinant Needs more description.
   * @method Matrix2D.determinant
   * @cat Document
   * @subcat Transformation
   * @return {Number} A determinant …
   */
  determinant: function() {
    return this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3];
  },
  /**
   * @description invert Needs more description.
   * @method Matrix2D.invert
   * @cat Document
   * @subcat Transformation
   * @return {Boolean} …
   */
  invert: function() {
    var d = this.determinant();
    if (Math.abs(d) > -2147483648) {
      var old00 = this.elements[0];
      var old01 = this.elements[1];
      var old02 = this.elements[2];
      var old10 = this.elements[3];
      var old11 = this.elements[4];
      var old12 = this.elements[5];
      this.elements[0] = old11 / d;
      this.elements[3] = -old10 / d;
      this.elements[1] = -old01 / d;
      this.elements[4] = old00 / d;
      this.elements[2] = (old01 * old12 - old11 * old02) / d;
      this.elements[5] = (old10 * old02 - old00 * old12) / d;
      return true;
    }
    return false;
  },
  /**
   * @description scale Needs more description.
   * @method Matrix2D.scale
   * @cat Document
   * @subcat Transformation
   * @param  {Number} sx …
   * @param  {Number} sy …
   */
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
  /**
   * @description invScale Needs more description.
   * @method Matrix2D.invScale
   * @cat Document
   * @subcat Transformation
   * @param  {Number} sx …
   * @param  {Number} sy …
   */
  invScale: function(sx, sy) {
    if (sx && !sy) {
      sy = sx;
    }
    this.scale(1 / sx, 1 / sy);
  },
  /**
   * @description apply Needs more description.
   * @method Matrix2D.apply
   * @cat Document
   * @subcat Transformation
   */
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
  /**
   * @description preApply Needs more description.
   * @method Matrix2D.preApply
   * @cat Document
   * @subcat Transformation
   */
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
  /**
   * @description rotate Needs more description.
   * @method Matrix2D.rotate
   * @cat Document
   * @subcat Transformation
   * @param  {Number} angle
   */
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
  /**
   * @description rotateZ Needs more description.
   * @method Matrix2D.rotateZ
   * @cat Document
   * @subcat Transformation
   * @param  {Number} angle
   */
  rotateZ: function(angle) {
    this.rotate(angle);
  },
  /**
   * @description invRotateZ Needs more description.
   * @method Matrix2D.invRotateZ
   * @cat Document
   * @subcat Transformation
   * @param  {Number} angle
   */
  invRotateZ: function(angle) {
    this.rotateZ(angle - Math.PI);
  },
  /**
   * @description print Needs more description.
   * @method Matrix2D.print
   * @cat Document
   * @subcat Transformation
   */
  print: function() {
    var digits = printMatrixHelper(this.elements);
    var output = "" + pub.nfs(this.elements[0], digits, 4) + " " + pub.nfs(this.elements[1], digits, 4) + " " + pub.nfs(this.elements[2], digits, 4) + "\n" + pub.nfs(this.elements[3], digits, 4) + " " + pub.nfs(this.elements[4], digits, 4) + " " + pub.nfs(this.elements[5], digits, 4) + "\n\n";
    pub.println(output);
  }
};

/**
 * @description Returns the current matrix as a Matrix2D object for altering existing PageItems with b.transform(). If a Matrix2D object is provided to the function it will overwrite the current matrix.
 *
 * @cat Document
 * @subcat Transformation
 * @method matrix
 * @param {Matrix2D} [matrix] The matrix to be set as new current matrix.
 * @returns {Matrix2D} Returns the current matrix.
 */
pub.matrix = function(matrix) {

  if(matrix instanceof Matrix2D) {
    currMatrix = matrix;
  }
  return currMatrix;
};

/**
 * @description Transforms the given PageItem with the given Matrix2D object.
 *
 * @cat Document
 * @subcat Transformation
 * @method transform
 * @param {PageItem} obj The item to be transformed.
 * @param {Matrix2D} matrix The matrix to be applied.
 */
pub.transform = function(obj, matrix) {

  obj.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   matrix.adobeMatrix()
  );

};

/**
 *@description Multiplies the current matrix by the one specified through the parameters.
 *
 * @cat Document
 * @subcat Transformation
 * @method applyMatrix
 * @param {Matrix2D} matrix The matrix to be applied.
 */
pub.applyMatrix = function (matrix) {
  currMatrix.apply(matrix);
};

/**
 * @description Pops the current transformation matrix off the matrix stack. Understanding pushing and popping requires understanding the concept of a matrix stack. The <code>pushMatrix()</code> function saves the current coordinate system to the stack and <code>popMatrix()</code> restores the prior coordinate system. <code>pushMatrix()</code> and <code>popMatrix()</code> are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat Document
 * @subcat Transformation
 * @method popMatrix
 */
pub.popMatrix = function () {
  if (matrixStack.length > 0) {
    currMatrix.set(matrixStack.pop());
  } else {
    error("b.popMatrix(), missing a pushMatrix() to go with that popMatrix()");
  }
};

/**
 * Prints the current matrix to the console window.
 *
 * @cat Document
 * @subcat Transformation
 * @method printMatrix
 */
pub.printMatrix = function () {
  currMatrix.print();
};

/**
 * @description Pushes the current transformation matrix onto the matrix stack. Understanding <code>pushMatrix()</code> and <code>popMatrix()</code> requires understanding the concept of a matrix stack. The <code>pushMatrix()</code> function saves the current coordinate system to the stack and <code>popMatrix()</code> restores the prior coordinate system. <code>pushMatrix()</code> and <code>popMatrix()</code> are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat Document
 * @subcat Transformation
 * @method pushMatrix
 */
pub.pushMatrix = function () {
  matrixStack.push(currMatrix.array());
};

/**
 * Replaces the current matrix with the identity matrix.
 *
 * @cat Document
 * @subcat Transformation
 * @method resetMatrix
 */
pub.resetMatrix = function () {
  matrixStack = [];
  currMatrix = new Matrix2D();
};

/**
 * @description Rotates an object the amount specified by the angle parameter. Angles should be specified in radians (values from 0 to <code>PI</code>*2) or converted to radians with the <code>radians()</code> function. Objects are always rotated around their relative position to the origin and positive numbers rotate objects in a clockwise direction with 0 radians or degrees being up and <code>HALF_PI</code> being to the right etc. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling <code>rotate(PI/2)</code> and then <code>rotate(PI/2)</code> is the same as <code>rotate(PI)</code>. If <code>rotate()</code> is called within the <code>draw()</code>, the transformation is reset when the loop begins again. Technically, <code>rotate()</code> multiplies the current transformation matrix by a rotation matrix. This function can be further controlled by the <code>pushMatrix()</code> and <code>popMatrix()</code>.
 *
 * @cat Document
 * @subcat Transformation
 * @method rotate
 * @param {Number} angle The angle specified in radians
 */
pub.rotate = function (angle) {
  if(typeof arguments[0] === "undefined") {
    error("Please provide an angle for rotation.");
  }
  currMatrix.rotate(angle);
};

/**
 * @description Increasing and decreasing the size of an object by expanding and contracting vertices. Scale values are specified as decimal percentages. The function call <code>scale(2.0)</code> increases the dimension of a shape by 200%. Objects always scale from their relative origin to the coordinate system. Transformations apply to everything that happens after and subsequent calls to the function multiply the effect. For example, calling <code>scale(2.0)</code> and then <code>scale(1.5)</code> is the same as <code>scale(3.0)</code>. If <code>scale()</code> is called within <code>draw()</code>, the transformation is reset when the loop begins again. This function can be further controlled by <code>pushMatrix()</code> and <code>popMatrix()</code>.
 * If only one parameter is given, it is applied on X and Y axis.
 *
 * @cat Document
 * @subcat Transformation
 * @method scale
 * @param {Number} scaleX The amount to scale the X axis.
 * @param {Number} scaleY The amount to scale the Y axis.
 */
pub.scale = function (scaleX, scaleY) {
  if(typeof arguments[0] != "number" || (arguments.length === 2 && typeof arguments[1] != "number")) {
    error("Please provide valid x and/or y factors for scaling.");
  }
  currMatrix.scale(scaleX, scaleY);
};

/**
 * @description Specifies an amount to displace objects within the page. The x parameter specifies left/right translation, the y parameter specifies up/down translation. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling <code>translate(50, 0)</code> and then <code>translate(20, 0)</code> is the same as <code>translate(70, 0)</code>. This function can be further controlled by the <code>pushMatrix()</code> and <code>popMatrix()</code>.
 *
 * @cat Document
 * @subcat Transformation
 * @method translate
 * @param {Number} tx The amount of offset on the X axis.
 * @param {Number} ty The amount of offset on the Y axis.
 */
pub.translate = function (tx, ty) {
  if(typeof arguments[0] === "undefined" || typeof arguments[1] === "undefined") {
    error("Please provide x and y coordinates for translation.");
  }
  currMatrix.translate(tx, ty);
};

// Hey Ken, this is your new home...

  init();

})(this, app);

