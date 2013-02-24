/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  An attempt to port the spirit of the Processing visualization language to Adobe Indesign.
  
  License        - MIT

  Developers     
                 - Ted Davis http://teddavis.org
                 - Benedikt Groß http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
  Contributers   
                 - Philipp Adrian http://www.philippadrian.com/
                 - be:screen GmbH http://bescreen.de
                 - Stefan Landsbek http://47nord.de

  Web Site       - http://basiljs.ch
  Github Repo.   - https://github.com/basiljs/basil.js
  Processing     - http://processing.org
  Processing.js  - http://processingjs.org

  basil.js was conceived and is generously supported by
  The Visual Communication Institute / The Basel School of Design
  Department of the Academy of Art and Design Basel (HGK FHNW)
  
  http://thebaselschoolofdesign.ch

  Please note: Big general parts e.g. random() of the basil.js source code are copy & paste
  of the fantasic processing.js project created by John Resig. We would have had a hard time
  to figure all of that out on our own!

  Supported Adobe Indesign versions: CS 5, CS 5.5 and CS 6
  
  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/

#target "InDesign";

(function(glob, app, undef) {
  /**
   * @class b
   * @static
   */
  var pub = {};



  // ----------------------------------------
  // constants
  
  /**
   * The basil version
   * @property VERSION {String}
   * @cat Environment
   */
  pub.VERSION = "0.22";

  /**
   * Used with b.units() to set the coordinate system to points.
   * @property PT {String}
   * @cat Data
   * @subcat Units
   */
  pub.PT = "pt";

  /**
   * Used with b.units() to set the coordinate system to pixels.
   * @property PX {String}
   * @cat Data
   * @subcat Units
   */
  pub.PX = "px";

  /**
   * Used with b.units() to set the coordinate system to centimeters.
   * @property CM {String}
   * @cat Data
   * @subcat Units
   */

  pub.CM = "cm";

  /**
   * Used with b.units() to set the coordinate system to millimeters.
   * @property MM {String}
   * @cat Data
   * @subcat Units
   */
  pub.MM = "mm";

  /**
   * Used with b.units() to set the coordinate system to inches.
   * @property IN {String}
   * @cat Data
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
   * Two Pi
   * @property TWO_PI {Number}
   * @cat Data
   * @subcat Math Constants
   */
  pub.TWO_PI = Math.PI*2;

  /**
   * Pi
   * @property PI {Number}
   * @cat Data
   * @subcat Math Constants
   */
  pub.PI = Math.PI;

  /**
   * Half Pi
   * @property HALF_PI {Number}
   * @cat Data
   * @subcat Math Constants
   */
  pub.HALF_PI = Math.PI/2;

  /**
   * Quarter Pi
   * @property QUARTER_PI {Number}
   * @cat Data
   * @subcat Math Constants
   */
  pub.QUARTER_PI = Math.PI/4;

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
    * Used with b.go() to set Performance Mode. Disables ScreenRedraw during processing, this is the default mode
    * @property MODESILENT {String}
    * @cat Environment
    * @subcat modes
    */
  pub.MODESILENT = "ModeSilent";
    /**
     * Used with b.go() to set Performance Mode. Processes Document in background mode. Document will not be visible until the script is done. If you are firing on a open document you'll need to save it before calling bgo(). The document will be removed from the display list and added again aftrer the script is done. In this mode you will likely look at indesign with no open document for quite some time - do not work in indesign during this time. You may want to use b.println("yourMessage") in your script and look at the Console in estk to get information about the process.
     * @property MODEHIDDEN {String}
     * @cat Environment
     * @subcat modes
     */
  pub.MODEHIDDEN = "ModeHidden";
    /**
     * Used with b.go() to set Performance Mode. Processes Document with Screen redraw, use this option to see direct results during the process. This will slow down the process. This mode was the default in Versions prior to 0.22
     * @property MODEVISIBLE {String}
     * @cat Environment
     * @subcat modes
     */
  pub.MODEVISIBLE = "ModeVisible";
  /**
   * Used in b.go(Optional: mode). Disables ScreenRedraw, this is the default mode
   * @property DEFAULTMODE {MODESILENT|MODEHIDDEN|MODEVISIBLE} : Sets the default Mode when calling go() without option
   * @cat Environment
   * @subcat modes
   * */
  pub.DEFAULTMODE = pub.MODEVISIBLE;


  var ERROR_PREFIX = "\n\n### Basil Error -> ",
      WARNING_PREFIX = "### Basil Warning -> ";


  // ----------------------------------------
  // public vars
  
  /**
   * System variable which stores the width of the current page.
   * @property width {Number}
   * @cat Environment
   */
  pub.width = null;

  /**
   * System variable which stores the height of the current page.
   * @property height {Number}
   * @cat Environment
   */
  pub.height = null;

  
  // ----------------------------------------
  // private vars
  var currDoc = null,
    currPage = null,
    currLayer = null,
    currUnits = null,
    currMatrix = null,
    matrixStack = null,
    currColorMode = null,
    currFillColor = null,
    currStrokeColor = null,
    currStrokeTint = null,
    currFillTint = null,
    currStrokeWeight = null,
    currRectMode = null,
    currEllipseMode = null,
    noneSwatchColor = null,
    startTime = null,
    currFont = null,
    currFontSize = null,
    currAlign = null,
    currYAlign = null,
    currLeading = null,
    currKerning = null,
    currTracking = null,
    currImageMode = null,
    currCanvasMode = null,
    currVertexPoints = null;

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
  // global functions


  /* todo */
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
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

  /* todo */
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
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
  * @subcat Array Functions
  * @method forEach
  * @param {Array} collection The array to be processed.
  * @param {Function} cb The function that will be called on each element. The call will be like function(item,i) where i is the current index of the item within the array.
  */
  if (!glob.forEach) {
    glob.forEach = function(collection, cb) {
      for (var i = 0, len = collection.length; i < len; i++) {
        
        if(!isValid(collection[i])) {
            warning("Invalid object processed in forEach.");
            continue;          
        }

        if(cb(collection[i],i) === false) {
          return false;
        }
      }
      return true;
    };
  }

  /**
   * HashList is a data container that allows you to store information as key -> value pairs. As usual in JavaScript mixed types of keys and values are accepted in one HashList instance.
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
    
    // TODO: initial function removal in items?      
    for ( var key in that.items ) {
      b.println(key);
    }
    
    // Please note: this is removing Object fields, but has to be done to have an empty "bucket"
    function checkKey(key) {
      if(that.items[key] instanceof Function) {
          that.items[key] = undefined; 
      };
    }

    /**
     * 
     * This removes a key -> value pair by its key.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.remove
     * @param {any} key The key to delete
     * @return {any} The value before deletion
     */
    that.remove = function(key) {
      var tmp_previous;
      if (typeof that.items[key] != 'undefined') {
        var tmp_previous = that.items[key];
        delete that.items[key];
        that.length--;
      }
      return tmp_previous;
    }

    /**
     * This gets a value by its key.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.get
     * @param {any} key The key to look for
     * @return {any} The value
     */
    that.get = function(key) {    
      return that.items[key];
    }

    /**
     * This sets a key -> value pair. If a key is already existing, the value will be updated. Please note that Functions are currently not supported as values.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.set
     * @param {any} key The key to use
     * @return {any} The value after setting
     */
    that.set = function(key, value) {

      if( value instanceof Function ) error("HashList does not support storing Functions as values.");
      checkKey(key);
      if (typeof value != 'undefined') {
        if (typeof that.items[key] === 'undefined') {
          that.length++;
        }
        that.items[key] = value;
      }
      return that.items[key];
    }

    /**
     * Checks for the existence of a given key.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.hasKey
     * @param {any} key The key to check
     * @return {boolean} 
     */
    that.hasKey = function(key) {
      checkKey(key);
      return typeof that.items[key] != 'undefined';
    }

    /**
     * Checks if a certain value exists at least once in all of the key -> value pairs.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.hasValue
     * @param {any} value 
     * @return {boolean} 
     */
    that.hasValue = function(value) {
      var obj = that.items;
      var found = false;
      for(var key in obj) {
        if (obj[key] === value) {
          found = true;
          break;
        };
      }
      return found;
    }
    
    /**
     * Returns an array of all keys that are sorted by their values from highest to lowest. Please note that this only works if you have conistently used Numbers for values. 
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.getKeysByValues
     * @return {Array} An array with all the keys 
     */
    that.getKeysByValues = function() {
        var obj = that.items;
        var keys = [];
        for(var key in obj) 
          {
            if( typeof obj[key] != 'number' ) error("getKeysByValues() only works with Numbers as values. ");
            keys.push(key);
          }
        return keys.sort(function(a,b){return obj[b]-obj[a]});
    }

    /**
     * Returns an array with all keys in a sorted order from higher to lower magnitude. 
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.getSortedKeys
     * @return {Array} An array with all the keys 
     */
    that.getSortedKeys = function () {
        return that.getKeys().sort(); // ["a", "b", "z"]
    }    

    /**
     * Returns an array with all keys.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.getKeys
     * @return {Array} An array with all the keys 
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
    }

    /**
     * Returns an array with all keys.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.getKeys
     * @return {Array} An array with all the keys 
     */
    that.getValues = function () {

      var obj = that.items;
      var values = [];

      for(var key in obj) {
          values.push(obj[key]);
      }
      return values;
      
    }

    /**
     * Deletes all the key -> value pairs in this HashList.
     * 
     * @cat Data
     * @subcat HashList
     * @method HashList.clear
     * @return {Array} An array with all the keys 
     */
    that.clear = function() {
      for (var i in that.items) {
        delete that.items[i];
      }
      that.length = 0;
    }

    return that;
  }  
  
  
  // ----------------------------------------
  // Structure
  
  /**
   * Suspends the calling thread for a number of milliseconds.
   * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
   *
   * @cat Environment
   * @method delay
   * @param  {Number} milliseconds  The delay time in milliseconds
   */
  pub.delay = function (milliseconds) {
    $.sleep(milliseconds);
  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each story of the given document.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method stories
   * @param  {Document} doc The document instance to iterate the stories in
   * @param  {Function} cb  Optional: The callback function to call with each story. When this function returns false the loop stops. Passed arguments: story, loopCount;
   * @return {Stories} You can use it like an array.
   */
  pub.stories = function(doc, cb) {
    if(arguments.length === 1 && doc instanceof Document) {
      return doc.stories;
    } else if (cb instanceof Function) {
      return forEach(doc.stories, cb);
    } else {
      error("Incorrect call of b.stories().");
    }
  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each paragraph of the given document, story or text frame.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method paragraphs
   * @param  {Document|Story|TextFrame} item The story or text frame instance to iterate the paragraphs in
   * @param  {Function} cb  Optional: The callback function to call with each paragraph. When this function returns false the loop stops. Passed arguments: para, loopCount
   * @return {Paragraphs} You can use it like an array.   
   */
  pub.paragraphs = function(item, cb) {

    var err = false;
    try{
      item[0]; // check if list
      err = true; // access ok -> error
    } catch (expected) {};
    if(err) error("Array/Collection has been passed to b.paragraphs(). Single object expected.");

    if(arguments.length === 1) {
      return item.paragraphs;
    } else if (cb instanceof Function) {
      if (item instanceof Document) {
        return forEachStoryProperty(item, 'paragraphs', cb);
      } else {
        return forEach(item.paragraphs, cb);
      }
    }
  };

  /**
   * If no callback function is given it returns a Collection of strings otherwise calls the given callback function with each sentences of the given document, story or text frame.
   *
   * cat Document
   * subcat Multi-Getters
   * method sentences
   * param  {Document|Story|TextFrame} item The story or text frame instance to iterate the sentences in
   * param  {Function} cb  Optional: The callback function to call with each sentence. When this function returns false the loop stops. Passed arguments: sentence, loopCount
   * return {Array} An array of strings
   * 
   */
   // FIXME
  pub.sentences = function(item, cb) {

    var err = false;
    try{
      item[0]; // check if list
      err = true; // access ok -> error
    } catch (expected) {};
    if(err) error("Array/Collection has been passed to b.sentences(). Single object expected.");

    if(arguments.length >= 1 ) {
      var arr;
      try{
        str = item.contents;  
        arr = str.match( /[^\.!\?]+[\.!\?]+/g );
      } catch (e){
        error("Object passed to b.sentences() does not have text or is incompatible.");
      }

      if(arguments.length === 1) {
        return arr;
      } else if (cb instanceof Function) {
        forEach(arr,cb);
      } else {
        error("callback is not a Function.");
      }

    }

  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each line of the given document, story, text frame or paragraph.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method lines
   * @param  {Document|Story|TextFrame|Paragraph} item The document, story, text frame or paragraph instance to
   *                                                   iterate the lines in
   * @param  {Function} cb Optional: The callback function to call with each line. When this function returns false the loop stops. Passed arguments: line, loopCount
   * @return {Lines} You can use it like an array.
   */
  pub.lines = function(item, cb) {

    var err = false;
    try{
      item[0]; // check if list
      err = true; // access ok -> error
    } catch (expected) {};
    if(err) error("Array/Collection has been passed to b.lines(). Single object expected.");

    if(arguments.length === 1) {
      return item.lines;
    } else if (cb instanceof Function) {
      if (item instanceof Document) {
        return forEachStoryProperty(item, 'lines', cb);
      } else {
        return forEach(item.lines, cb);
      }
    }
  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each word of the given document, story, text frame, paragraph or line.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method words
   * @param  {Document|Story|TextFrame|Paragraph|Line} item The document, story, text frame, paragraph or line instance
   *                                                        to iterate the words in
   * @param  {Function} cb Optional: The callback function to call with each word. When this function returns false the loop stops. Passed arguments: word, loopCount
   * @return {Words} You can use it like an array.
   */
  pub.words = function(item, cb) {

    var err = false;
    try{
      item[0]; // check if list
      err = true; // access ok -> error
    } catch (expected) {};
    if(err) error("Array/Collection has been passed to b.words(). Single object expected.");
    
    if(arguments.length === 1){
      return item.words;
    } else if (cb instanceof Function) {
      if (item instanceof Document) {
        return forEachStoryProperty(item, 'words', cb);
      } else {
        return forEach(item.words, cb);
      }
    }
  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each character of the given document, story, text frame, paragraph, line or word.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method characters
   * @param  {Document|Story|TextFrame|Paragraph|Line|Word} item The document, story, text frame, paragraph, line or word instance to
   *                                                    iterate the characters in
   * @param  {Function} cb Optional: The callback function to call with each character. When this function returns false the loop stops. Passed arguments: character, loopCount
   * @return {Characters} You can use it like an array.
   */
  pub.characters = function(item, cb) {

    var err = false;
    try{
      item[0]; // check if list
      err = true; // access ok -> error
    } catch (expected) {};
    if(err) error("Array/Collection has been passed to b.characters(). Single object expected.");

    if(arguments.length === 1) {
      return item.characters;
    } else if ( cb instanceof Function) {
      if (item instanceof Document) {
        return forEachStoryProperty(item, 'characters', cb);
      } else {
        return forEach(item.characters, cb);
      }
    }
  };

  var forEachStoryProperty = function(doc, property, cb) {
    var loopCount = 0;
    pub.stories(doc, function(story) {
      var properties = story[property];
      for (var i = 0, len = properties.length; i < len; i++) {
        if(cb(properties[i], loopCount++) === false) {
          return false;
        }
      }
      return true;
    });
  };

  /**
   * If no callback function is given it returns a Collection of items otherwise calls the given callback function for each of the PageItems in the given Document, Page, Layer or Group.
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method items
   * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in
   * @param  {Function|Boolean} cb Optional: The callback function to call for each PageItem. When this function returns false the loop stops. Passed arguments: item, loopCount. 
   * @return {PageItems} You can use it like an array.
   */
  pub.items = function(container, cb) {

    if (container instanceof Document 
      || container instanceof Page 
      || container instanceof Layer 
      || container instanceof Group) {

      if(arguments.length === 1){
        return container.allPageItems;
      } else if(cb instanceof Function ) {
        return forEach(container.allPageItems, cb);
      }
    } else {
      error("Not a valid PageItem container, should be Document, Page, Layer or Group");
    }
  };
  

  /**
   * Removes all PageItems in the given Document, Page, Layer or Group.
   *
   * @cat Document
   * @method clear
   * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in
   */
  pub.clear = function(container) {

    if (container instanceof Document 
      || container instanceof Page 
      || container instanceof Layer 
      || container instanceof Group) {

        return forEach(container.allPageItems, function(item,n){
          // Groups have to be avoided for deletion
          // otherwise deletion process is confused
          if(item !== null && ! (item instanceof Group) ) {
            if(item.locked) error("Some items are locked. Please unlock them first.");
            item.remove();
          }
        });

      } else {
        return false;
      }
  };  

  /**
   * Checks whether a var is an Array, returns true if this is the case
   *
   * @cat Data
   * @subcat Type-Check
   * @method isArray
   * @param  {Object|String|Number|Boolean}  obj The object to check
   * @return {Boolean}     [description]
   */
  var isArray = pub.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Checks whether a var is a number, returns true if this is the case
   *
   * @cat Data
   * @subcat Type-Check
   * @method isNumber
   * @param  {Object|String|Number|Boolean}  num The number to check
   * @return {Boolean}
   */
  var isNumber = pub.isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  /**
   * Checks whether a var is a string, returns true if this is the case
   *
   * @cat Data
   * @subcat Type-Check
   * @method isString
   * @param  {Object|String|Number|Boolean} str The string to check
   * @return {Boolean}
   */
  var isString = pub.isString = function(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  };

  /**
   * Checks whether a var is an indesign text object, returns true if this is the case
   *
   * @cat Document
   * @subcat Type-Check
   * @method isText
   * @param  {Character|InsertionPoint|Line|Paragraph|TextColumn|TextStyleRange|Word}  obj The object to check
   * @return {Boolean}     [description]
   */
  var isText = pub.isText = function(obj) {
    return obj instanceof Character ||
           obj instanceof InsertionPoint ||
           obj instanceof Line ||
           obj instanceof Paragraph ||
           obj instanceof TextColumn ||
           obj instanceof TextStyleRange ||
           obj instanceof Word;
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
   * @param  {Document} [doc] The document to set the current document to
   * @return {Document} The current document instance
   */
  pub.doc = function(doc) {
    if (doc instanceof Document) {
      setCurrDoc(doc);
    }
    return currentDoc();
  };

  /**
   * Closes the current document.
   *
   * @cat Document
   * @method close
   * @param  {SaveOptions|Booleand} [saveOptions] The indesign SaveOptions constant or either true for triggering saving before closing or false for closing without saving.
   * @param  {File} [file] Optional: The indesign file instance to save the document to
   */
  pub.close = function(saveOptions, file) {
    var doc = currentDoc();
    if (doc) {
      if( typeof saveOptions === 'boolean' && saveOptions === false ) saveOptions = SaveOptions.no;
      if( typeof saveOptions === 'boolean' && saveOptions === true ) saveOptions = SaveOptions.yes;
      doc.close(saveOptions, file);
      resetCurrDoc();
    }
  };

  /**
   * Use this to set the dimensions of the canvas. Choose between b.PAGE (default), b.MARGIN, b.BLEED resp. b.FACING_PAGES, b.FACING_MARGINS and b.FACING_BLEEDS for book setups with facing page. Please note: Setups with more than two facing pages are not yet supported.
   * Please note that you will loose your current MatrixTransformation. You should set the canvasMode before you attempt to use b.translate(), b.rotate() and b.scale();
   * @method canvasMode
   * @cat Document
   * @subcat Page
   */
  pub.canvasMode = function ( m ) {
    if(arguments.length == 0) {
      return currCanvasMode;
    } else if ( typeof m === "string" ) {

      if ( (m === b.FACING_PAGES || m === b.FACING_MARGINS || m === b.FACING_BLEEDS) && !b.doc().documentPreferences.facingPages ) b.error("Cannot set a facing pages mode to a single page document");

      currCanvasMode = m;
      updatePublicPageSizeVars();
    } else {
      error("Problem setting canvasMode. Please consult the reference.");
    }

  };  

  /**
   * Returns the current page and sets it if argument page is given. Numbering starts with 1. 
   *
   * @cat Document
   * @subcat Page
   * @method page
   * @param  {Page|Number|PageItem} [page] The page object or page number to set the current page to. If you pass a PageItem the current page will be set to it's containing page.
   * @return {Page} The current page instance
   */
  pub.page = function(page) {
    if (page instanceof Page) {
      currPage = page;
    } else if ( typeof page !== 'undefined' && page.hasOwnProperty("parentPage") ) {
      currPage = page.parentPage; // page is actually a PageItem
    } else if (typeof page === 'number') {
      if( page < 1 ) {
        p = 0;
      } else {
        p = page - 1;
      }
      var tempPage = currentDoc().pages[p];
      try {
        tempPage.id;
      } catch (e) {
        error('Page ' + page + ' does not exist.');
      }
      currPage = tempPage;
    } else if (typeof page !== 'undefined') {
      error("Bad type for b.page().");
    }
    updatePublicPageSizeVars();
      if (currDoc.windows.length)
        app.activeWindow.activePage = currPage; // focus in GUI  if not in MODEHIDDEN
    return currentPage();
  };

  /**
   * Adds a new page to the document. Set the optional location parameter to either b.AT_END (default), b.AT_BEGINNING, b.AFTER or b.BEFORE. b.AFTER and b.BEFORE will use the current page as insertion point.
   *
   * @cat Document
   * @subcat Page
   * @method addPage
   * @param  {String} [location] The location placement mode
   * @return {Page} The new page
   */
  pub.addPage = function(location) {

    if(arguments.length === 0) location = b.AT_END; // default
    
    var nP;
    try {
      
      switch ( location ) {
        
        case b.AT_END:
          nP = currentDoc().pages.add(location);
          break;

        case b.AT_BEGINNING:
          nP = currentDoc().pages.add(location);     
          break;

        case b.AFTER:
          nP = currentDoc().pages.add(location, pub.page() ); 
          break;

        case b.BEFORE:
          nP = currentDoc().pages.add(location, pub.page() );
          break;

        default:
          throw new Error(); 
          break;

      };

      pub.page( nP ); 
      return nP;

    } catch (e) {
      error("Invalid location argument passed to addPage()");
    }

  };

  /**
   * Removes a page from the current document. This will either be the current Page if the parameter page is left empty, or the given Page object or page number.
   *
   * @cat Document
   * @subcat Page
   * @method removePage
   * @param  {Page|Number} [page] Optional: The page to be removed as Page object or page number.
   * @throws {Error} e If Page not found or invalid call.
   */
  pub.removePage = function (page) {

    if( typeof page === 'number' || arguments.length === 0 || page instanceof Page ){
      var p = pub.page(page); // get the page object, todo: add an internal method of page retrieval without setting it to current
      p.remove();
      currPage = null; // reset!
      currentPage();
    } else {
      error("Invalid call of b.removePage().");
    }

  };

  /**
   * Returns the current page number of either the current page or the given Page object.
   *
   * @cat Document
   * @subcat Page
   * @method pageNumber
   * @param  {Page} [pageObj] Optional: The page you want to know the number of.
   * @return {Number} The page number within the document.
   * @throws {Error} e If Page not found or invalid call.
   */
  pub.pageNumber = function (pageObj) {

      if (typeof pageObj === 'number') error("b.pageNumber cannot be called with a Number argument.");

      if (pageObj instanceof Page) {
          return parseInt(pageObj.name); // current number of given page
      } else {
          return parseInt(pub.page().name); // number of current page
      }

  };

  // TODO: does not work?
  pub.nextPage = function () {
      var p = pub.doc().pages.nextItem(currentPage());
      return pub.page(p);
  };

  // TODO: does not work?
  pub.previousPage = function () {
      var p = pub.doc().pages.previousItem(currentPage());
      return pub.page(p);
  };

  /**
   * The number of all pages in the current document.
   *
   * @cat Document
   * @subcat Page
   * @method pageCount
   * @return The amount of pages.
   * @throws {Error} e If Page not found or invalid call.
   */
  pub.pageCount = function() {
    return currentDoc().pages.count();
  };


  /**
   * Returns the current layer and sets it if argument layer is given.
   *
   * @cat Document
   * @subcat Page
   * @method layer
   * @param  {Layer|String} [layer] The layer or layer name to set the current layer to
   * @return {Layer} The current layer instance
   */
  pub.layer = function(layer) {
    if (layer instanceof Layer) {
      currLayer = layer;
    } else if (typeof layer === 'string') {
      var layers = currentDoc().layers;
      currLayer = layers.item(layer);
      if (!currLayer.isValid) {
        currLayer = layers.add({name: layer});
      }
    }
    return currentLayer();
  };

  /**
   * Sets the units of the document (like right clicking the rulers).
   *
   * @cat Document
   * @method units
   * @param  {Constant} [units] Supported units: PT, PX, CM, MM or IN
   * @return {Constant} Current unit setting
   */
  pub.units = function (units) {
    if (arguments.length === 0) return currUnits;

    if (units === pub.CM ||
        units === pub.MM ||
        units === pub.PT ||
        units === pub.PX ||
        units === pub.IN) {
      var unitType = null;
      if      (units === pub.CM) unitType = MeasurementUnits.centimeters;
      else if (units === pub.MM) unitType = MeasurementUnits.millimeters;
      else if (units === pub.PT) unitType = MeasurementUnits.points;
      else if (units === pub.PX) unitType = MeasurementUnits.pixels;
      else if (units === pub.IN) unitType = MeasurementUnits.inches;
      var doc = currentDoc();
      with (doc.viewPreferences){
        //* MeasurementUnits.agates
        //* MeasurementUnits.picas
        //* MeasurementUnits.points
        //* MeasurementUnits.inches
        //* MeasurementUnits.inchesDecimal
        //* MeasurementUnits.millimeters
        //* MeasurementUnits.centimeters
        //* MeasurementUnits.ciceros
        horizontalMeasurementUnits = unitType;
        verticalMeasurementUnits = unitType;
      }
      currUnits = units;
      updatePublicPageSizeVars();
    } else {
      error("Not supported unit");
    }
    return currUnits;
  };

  /**
   * Creates a vertical guide line at the current spread and current layer.
   *
   * @cat Document
   * @method guideX
   * @param  {Number} x Position of the new guide
   * @return {Guide} New guide
   */
  pub.guideX = function (x) {
    var guides = currentPage().guides;
    var guide = guides.add( currentLayer() );
    with (guide) {
      fitToPage = true;
      orientation = HorizontalOrVertical.VERTICAL;
      location = x;
    }
    return guide;
  };

  /**
   * Creates a horizontal guide line at the current spread and current layer.
   *
   * @cat Document
   * @method guideY
   * @param  {Number} y Position of the new guide
   * @return {Guide} New guide
   */
  pub.guideY = function (y) {
    var guides = currentPage().guides;
    var guide = guides.add( currentLayer() );
    with (guide) {
      fitToPage = true;
      orientation = HorizontalOrVertical.HORIZONTAL;
      location = y;
    }
    return guide;
  };

  /**
   * Sets the margins of a given page. If 1 value is given, all 4 sides are set equally. If 4 values are given, the current page will be adjusted. Adding a 5th value will set the margin of a given page. Calling the function without any values, will return the margins for the current page. 
   *
   * @cat Document
   * @subcat Page
   * @method margins
   * @param {Number} [top] Top margin or all if only one
   * @param {Number} [right] Right margin
   * @param {Number} [bottom] Bottom margin
   * @param {Number} [left] Left margin
   * @param {Number} [pageNumber] Sets margins to selected page, currentPage() if left blank
   * @return {Object} Current page margins with these properties: top, right, bottom, left
   */
  pub.margins = function(top, right, bottom, left, pageNumber) {

    if (arguments.length === 0){
      
      return {'top':pub.page(pageNumber).marginPreferences.top,
              'right':pub.page(pageNumber).marginPreferences.right,
              'bottom':pub.page(pageNumber).marginPreferences.bottom,
              'left':pub.page(pageNumber).marginPreferences.left
              };
      
    } else if (arguments.length === 1) {
      right = bottom = left = top;
      }

    if(pageNumber != undefined){
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
   * @param {Number} [top] Top bleed or all if only one
   * @param {Number} [right] Right bleed
   * @param {Number} [bottom] Bottom bleed
   * @param {Number} [left] Left bleed
   */
  pub.bleeds = function(top, right, bottom, left) {

    if (arguments.length === 0){
      return {'top':currentDoc().documentPreferences.documentBleedTopOffset,
              'right':currentDoc().documentPreferences.documentBleedOutsideOrRightOffset,
              'bottom':currentDoc().documentPreferences.documentBleedBottomOffset,
              'left':currentDoc().documentPreferences.documentBleedInsideOrLeftOffset
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
      if ( typeof data !== "string" || !data ) {
        return null;
      }
      var rvalidchars = /^[\],:{}\s]*$/,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

      // Make sure the incoming data is actual JSON
      // Logic borrowed from http://json.org/json2.js
      if ( rvalidchars.test( data.replace( rvalidescape, "@" )
        .replace( rvalidtokens, "]" )
        .replace( rvalidbraces, "")) ) {
        return ( new Function( "return " + data ) )();
      }
      error( "Invalid JSON: " + data );
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
        if (t === "string") obj = '"' + obj + '"';
        return String(obj);
      } else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor === Array);

        for (n in obj) {
          v = obj[n];
          t = typeof(v);
          if (obj.hasOwnProperty(n)) {
            if (t === "string") v = '"' + v + '"'; else if (t === "object" && v !== null) v = pub.JSON.encode(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
          }
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
      }
    }
  };

  // Taken and hijacked from d3.js robust csv parser. Hopefully Michael Bostock don't mind.
  // https://github.com/mbostock/d3/tree/master/src/dsv
  pub.CSV = new CSV();
  function CSV() {
    var reParse = null, 
        reFormat = null,
        delimiterStr = null,
        delimiterCode = null;

    initDelimiter(',');
    function initDelimiter(delimiter) {
      reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), // field separator regex
      reFormat = new RegExp("[\"" + delimiter + "\n]"),
      delimiterCode = delimiter.charCodeAt(0);
      delimiterStr = delimiter;
    };

    /**
     * Sets the delimiter of the CSV decode and encode function.
     * 
     * @cat Data
     * @subcat CSV
     * @method CSV.delimiter
     * @param  {String} Optional Sets the delimiter for CSV parsing
     * @return {String} Returns the current delimiter if called without argument
    */
    this.delimiter = function(delimiter) {
      if (arguments.length === 0) return delimiterStr;
      if (typeof separator === 'string') {
        initDelimiter(delimiter);
      } else {
        error("Separator has to be a character or string");
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
        };
      };
      csvStrings.push( formatRow(header) );
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var tokens = [];
        for (var ii = 0; ii < header.length; ii++) {
          tokens.push(row[header[ii]]);
        };
        csvStrings.push( formatRow(tokens) );
      };
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
    };
  };

  // -- Conversion --
  
  /**  @class b */

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
  }

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
   * @param
   */
   // from: http://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces/
  pub.trimWord = function(s) { 
      s = s.replace(/(^[,.!?-]*)|([-,.!?]*$)/gi,"");
      s = s.replace(/\s*/gi,"");
  //    s = s.replace(/[ ]{2,}/gi," "); 
      s = s.replace(/\n*/,"");     
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

  /* todo */
  pub.match = function(str, regexp) {
    return str.match(regexp);
  };

  /* todo */
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

  // ----------------------------------------
  // Shape
  
  /**
   * Draws an ellipse (oval) in the display window. An ellipse with an equal <b>width</b> and <b>height</b> is a circle.
   * The first two parameters set the location, the third sets the width, and the fourth sets the height.
   *
   * @cat Document
   * @subcat Primitives
   * @method ellipse
   * @param  {Number} x Location X
   * @param  {Number} y Location Y
   * @param  {Number} w Width
   * @param  {Number} h Height
   * @return {Oval} New oval (n.b. in Adobe Scripting the corresponding type is Oval, not Ellipse)
   */
  pub.ellipse = function(x, y, w, h){
    if (arguments.length !== 4) error("Not enough parameters to draw an ellipse! Use: x, y, w, h");
    var ellipseBounds = [];
    if (currEllipseMode === pub.CORNER) {
      ellipseBounds[0] = y;
      ellipseBounds[1] = x;
      ellipseBounds[2] = (y+h);
      ellipseBounds[3] = (x+w);
    } else if (currEllipseMode === pub.CORNERS) {
      ellipseBounds[0] = y;
      ellipseBounds[1] = x;
      ellipseBounds[2] = h;
      ellipseBounds[3] = w;
    } else if (currEllipseMode === pub.CENTER) {
      ellipseBounds[0] = y-(h/2);
      ellipseBounds[1] = x-(w/2);
      ellipseBounds[2] = (y+h)-(h/2);
      ellipseBounds[3] = (x+w)-(w/2);
    } else if (currEllipseMode === pub.RADIUS) {
      ellipseBounds[0] = y-(h);
      ellipseBounds[1] = x-(w);
      ellipseBounds[2] = y+(h);
      ellipseBounds[3] = x+(w);
    }

  if(w === 0 || h === 0)
    return false;

    var ovals = currentPage().ovals;
    var newOval = ovals.add( currentLayer() );
    with (newOval) {
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint;
      fillColor = currFillColor;
      fillTint = currFillTint;
      strokeColor = currStrokeColor;
      geometricBounds = ellipseBounds;
    }

    if (currEllipseMode === pub.CENTER || currEllipseMode === pub.RADIUS) {
      newOval.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix() );
    } else {
      newOval.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix() );
    }
    return newOval;
  };

  /**
   * Draws a line (a direct path between two points) to the page.
   *
   * @cat Document
   * @subcat Primitives
   * @method line
   * @param  {Number} x1 Point A x-value
   * @param  {Number} y1 Point A y-value
   * @param  {Number} x2 Point B x-value
   * @param  {Number} y2 Point B y-value
   * @return {GraphicLine} New GraphicLine
   */
  pub.line = function(x1, y1, x2, y2) {
    if (arguments.length !== 4) error("Not enough parameters to draw a line! Use: x1, y1, x2, y2");
    var lines = currentPage().graphicLines;
    var newLine = lines.add( currentLayer() );
    with (newLine) {
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint;
      fillColor = currFillColor;
      fillTint = currFillTint;
      strokeColor = currStrokeColor;
    }
    newLine.paths.item(0).entirePath = [[x1, y1], [x2, y2]];
    newLine.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix() );
    return newLine;
  };

  /**
   * Using the beginShape() and endShape() functions allow creating more complex forms. 
   * beginShape() begins recording vertices for a shape and endShape() stops recording. 
   * After calling the beginShape() function, a series of vertex() commands must follow. 
   * To stop drawing the shape, call endShape().
   *
   * @cat Document
   * @subcat Primitives
   * @method beginShape
   */
  pub.beginShape = function() {
    currVertexPoints = [];
  };

  /**
   * Shapes are constructed by connecting a series of vertices. vertex() is used to 
   * specify the vertex coordinates lines and polygons. It is used exclusively within
   * the beginShape() and endShape() functions.
   *
   * Please use either vertex(x, y) or 
   * for drawing bezier shapes vertex(x, y, xAnchorLeft, yAnchorLeft, xAnchorRight, yAnchorRight).
   * You can also mix the two approaches.
   * 
   * @cat Document
   * @subcat Primitives
   * @method vertex
   */
  pub.vertex = function() {
    if (isArray(currVertexPoints)) {
      if (arguments.length === 2) {
        currVertexPoints.push([arguments[0], arguments[1]]);
      } else if (arguments.length === 6) {
        // [[xL1, YL1], [x1, y1], [xR1, yR1]]
        currVertexPoints.push([ [arguments[2], arguments[3]],
                                [arguments[0], arguments[1]],
                                [arguments[4], arguments[5]] ]);
      } else {
        error("Wrong argument count: Please use either vertex(x, y) or vertex(x, y, xAnchorLeft, yAnchorLeft, xAnchorRight, yAnchorRight)!" );
      }
    } else {
      notCalledBeginShapeError();
    }
  };

  /**
   * The endShape() function is the companion to beginShape() and may only be called 
   * after beginShape(). The value of the kind parameter tells whether the shape to 
   * create from the provided vertices has to be closed or not (to connect the beginning and the end).
   *
   * @cat Document
   * @subcat Primitives
   * @method endShape
   * @return {GraphicLine|Polygon} newShape
   */
  pub.endShape = function(shapeMode) {
    if (isArray(currVertexPoints)) {
      if (currVertexPoints.length > 0) {
        var newShape = null;
        if (shapeMode === pub.CLOSE) {
          newShape = currentPage().polygons.add( currentLayer() );
        } else {
          newShape = currentPage().graphicLines.add( currentLayer() );
        }
        with (newShape) {
          strokeWeight = currStrokeWeight;
          strokeTint = currStrokeTint;
          fillColor = currFillColor;
          fillTint = currFillTint;
          strokeColor = currStrokeColor;
        }
        newShape.paths.item(0).entirePath = currVertexPoints;
        newShape.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.TOP_LEFT_ANCHOR,
                         currMatrix.adobeMatrix() );

        currVertexPoints = [];
        return newShape;
      }
    } else {
      notCalledBeginShapeError();
    }
  };
  
  function notCalledBeginShapeError () {
    error("You have to call first beginShape(), before calling vertex() and endShape()");
  }

  /**
   * Draws a rectangle to the page.
   *
   * @cat Document
   * @subcat Primitives
   * @method rect
   * @param  {Number} x Position X
   * @param  {Number} y Position Y
   * @param  {Number} w Width
   * @param  {Number} h Height
   * @return {Rectangle} New rectangle
   */
  pub.rect = function(x, y, w, h){
    if (arguments.length !== 4) error("Not enough parameters to draw a rect! Use: x, y, w, h");
    var rectBounds = [];
    if (currRectMode === pub.CORNER) {
      rectBounds[0] = y;
      rectBounds[1] = x;
      rectBounds[2] = (y+h);
      rectBounds[3] = (x+w);
    } else if (currRectMode === pub.CORNERS) {
      rectBounds[0] = y;
      rectBounds[1] = x;
      rectBounds[2] = h;
      rectBounds[3] = w;
    } else if (currRectMode === pub.CENTER) {
      rectBounds[0] = y-(h/2);
      rectBounds[1] = x-(w/2);
      rectBounds[2] = (y+h)-(h/2);
      rectBounds[3] = (x+w)-(w/2);
    }

  if(w === 0 || h === 0)
    return false;
    
    var newRect = currentPage().rectangles.add( currentLayer() );
    with (newRect) {
      geometricBounds = rectBounds;
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint;
      fillColor = currFillColor;
      fillTint = currFillTint;
      strokeColor = currStrokeColor;
    }

    if (currRectMode === pub.CENTER) {
      newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix() );
    } else {
      newRect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix() );
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
   * @param {String} mode Either b.CORNER, b.CORNERS, b.CENTER, or b.RADIUS
   * 
   */
  pub.rectMode = function (mode) {
    if (arguments.length === 0) return currRectMode;
    if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER ) {
      currRectMode = mode;
      return currRectMode;
    } else {
      error("Unsupported rectMode. Use: CORNER, CORNERS, CENTER.");
    }
  };

  /**
   * The origin of the ellipse is modified by the ellipseMode() function. 
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
   * @param {String} mode Either b.CENTER, b.RADIUS, b.CORNER, or b.CORNERS
   */ 
  pub.ellipseMode = function (mode) {
    if (arguments.length === 0) return currEllipseMode;
    if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER || mode === pub.RADIUS ) {
      currEllipseMode = mode;
      return currEllipseMode;
    } else {
      error("Unsupported ellipseMode. Use: CENTER, RADIUS, CORNER, CORNERS.");
    }
  };

  
  /**
   * Sets the width of the stroke used for lines and the border 
   * around shapes. 
   * 
   * @cat Document
   * @subcat Attributes
   * @method strokeWeight
   * @param {Number} weight The width of the stroke
   */
  pub.strokeWeight = function (weight) {
    if (typeof weight === 'string' || typeof weight === 'number') {
      currStrokeWeight = weight;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };

  /**
   * Returns the object style with the given name. If the style does not exist it gets created.
   *
   * @cat Typography
   * @method objectStyle
   * @param  {String} name  The name of the object style to return.
   * @return {ObjectStyle}  The object style instance.
   */
  pub.objectStyle = function(name) {
    var style = null;
    try {
      style = currentDoc().objectStyles.item(name);
      style.name;
    } catch (e) {
      style = currentDoc().objectStyles.add({name: name});
    }
    return style;
  };
  


  // ----------------------------------------
  // Color
  
  /**
   * Sets the color used to fill shapes.
   * @cat Color
   * @method fill
   * @param  {Color|Swatch|Numbers} fillColor  Accepts a Color/swatch or a string with the name of a color. Or values: C,M,Y,K / R,G,B / Grey
   */
  pub.fill = function (fillColor) {
    if (fillColor instanceof Color || fillColor instanceof Swatch) {
      currFillColor = fillColor;
    } else {
      if (arguments.length === 1) {
        currFillColor = pub.color(arguments[0]);
      } else if (arguments.length === 2) {
        currFillColor = pub.color(arguments[0],arguments[1]);
      } else if (arguments.length === 3) {
        currFillColor = pub.color(arguments[0],arguments[1],arguments[2]);
      } else if (arguments.length === 4) {
        currFillColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3]);
      } else if (arguments.length === 5) {
        currFillColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
      } else {
        error("Wrong parameters. Use: "
          + "R,G,B,name or "
          + "C,M,Y,K,name. "
          + "Grey,name "
          + "Name is optional");
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
   * Sets the color used to draw lines and borders around shapes.
   * @cat Color
   * @method stroke
   * @param  {Color|Swatch|Numbers} strokeColor  Accepts a Color/swatch or a string with the name of a color. Or values: C,M,Y,K / R,G,B / Grey
   */
  pub.stroke = function (strokeColor) {
    if (strokeColor instanceof Color || strokeColor instanceof Swatch) {
      currStrokeColor = strokeColor;
    } else {
      if (arguments.length === 1) {
        currStrokeColor = pub.color(arguments[0]);
      } else if (arguments.length === 2) {
        currStrokeColor = pub.color(arguments[0],arguments[1]);
      } else if (arguments.length === 3) {
        currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2]);
      } else if (arguments.length === 4) {
        currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3]);
      } else if (arguments.length === 5) {
        currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
      } else {
        error("Too many parameters. Use: "
          + "R,G,B,name or "
          + "C,M,Y,K,name. "
          + "Grey,name ");
      }
    }
  };

  /**
   * Disables drawing the stroke (outline). If both noStroke() and noFill() 
   * are called, nothing will be drawn to the screen.
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
    if (typeof tint === 'string' || typeof tint === 'number') {
      currFillTint = tint;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };

  /**
   * Sets the tint of the color used to draw lines and borders around shapes.
   * 
   * @cat Color
   * @method strokeTint
   * @param  {Number} tint Number from 0 to 100
   */
  pub.strokeTint = function (tint) {
    if (typeof tint === 'string' || typeof tint === 'number') {
      currStrokeTint = tint;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };

  /**
   * Sets the colormode for creating new colors with b.color() to RGB or CMYK.
   * 
   * @cat Color
   * @method colorMode
   * @param  {Number} colorMode Either b.RGB or b.CMYK
   */
  pub.colorMode = function(colorMode) {
    if (arguments.length === 0) return currColorMode;
    if (colorMode === pub.RGB || colorMode === pub.CMYK) {
      currColorMode = colorMode;
    } else {
      error("Not supported colormode, use: b.RGB or b.CMYK");
    }
  };

  /**
   * Creates a new RGB or CMYK color and adds the new color to the document, or gets a color by name from the document
   *
   * @cat Color
   * @method color
   * @param  {String|Numbers} Get color: the color name. Create new color: R,G,B,name or C,M,Y,K,name or Grey,name. Name is always optional
   * @return {Color} found or new color
   */
  pub.color = function() {
    var newCol = null;
    var props = {};
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3],
        e = arguments[4];
    var colorErrorMsg = "Wrong parameters. Use: "
        + "R,G,B,name in b.colorMode(b.RGB) or "
        + "C,M,Y,K,name in b.colorMode(b.CMYK) or "
        + "GREY,name. "
        + "Name is optional. "
        + "NB: In indesign colors don't have an alpha value, use b.opacity() to set alpha.";

    if (arguments.length === 1) {
      // get color by name
      if (typeof a === 'string') {
        try {
          newCol = currentDoc().swatches.item(a);
          newCol.name;
        } catch (e) {
          error("Color doesn't exist.");
        }
        return newCol;
      } else if (typeof a === 'number') {
        // GREY
        if (currColorMode === pub.RGB) {
          props.model = ColorModel.PROCESS;
          props.space = ColorSpace.RGB;
          props.colorValue = [a,a,a];
          props.name = "R="+a+" G="+a+" B="+a;
        } else {
          props.model = ColorModel.PROCESS;
          props.space = ColorSpace.CMYK;
          props.colorValue = [0,0,0,a];
          props.name = "C="+0+" M="+0+" Y="+0+" K="+a;
        }
      } else {
        error("Color doesn't exist.");
      }

    } else if (arguments.length === 2) {
      // GREY + with custom name
      if (currColorMode === pub.RGB) {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a,a,a];
        props.name = b;
      } else {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0,0,0,a];
        props.name = b;
      }

    } else if (arguments.length === 3) {
      // R G B
      if (currColorMode === pub.RGB) {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a,b,c];
        props.name = "R="+a+" G="+b+" B="+c;
      } else {
        error(colorErrorMsg);
      }
      

    } else if (arguments.length === 4 && typeof d === 'string') {
    // R G B + name
          props.model = ColorModel.PROCESS;
          props.space = ColorSpace.RGB;
          props.colorValue = [a,b,c];
          props.name = d; 

    // C M Y K
    } else if (arguments.length === 4 && typeof d === 'number'){
          props.model = ColorModel.PROCESS;
          props.space = ColorSpace.CMYK;
          props.colorValue = [a,b,c,d];
          props.name = "C="+a+" M="+b+" Y="+c+" K="+d;
     
    // C M Y K + name
    } else if (arguments.length === 5) {
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [a,b,c,d];
      props.name = e;

    } else {
      error(colorErrorMsg);
    }

    // check whether color was already created and added to swatches,
    // keeps the document clean ...
    try {
      var col = currentDoc().swatches.item(props.name);
      col.name;
      col.properties = props;
      return col;
    } catch (e) {
      newCol = currentDoc().colors.add();
      newCol.properties = props;
      return newCol;
    }
  };

  /**
   * Sets the opacity property of an object.
   * 
   * @cat Color
   * @method opacity
   * @param  {Object} obj The object to set opacity property
   * @param  {Number} opacity The opacity value form 0 to 100
   */
  pub.opacity = function(obj, opacity){
    if (obj.hasOwnProperty("transparencySettings")) {
      obj.transparencySettings.blendingSettings.opacity = opacity;
    } else {
      warning("The object "+ obj.toString() +" doesn't have an opacity property");
    }
  };

  /**
   * Sets the Effects blendMode property of an object.
   * 
   * @cat Color
   * @method blendMode
   * @param  {Object} obj The object to set blendMode property
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
  pub.blendMode = function(obj, blendMode){
    if (obj.hasOwnProperty("transparencySettings")) {
      obj.transparencySettings.blendingSettings.blendMode = blendMode;
    } else {
      warning("The object "+ obj.toString() +" doesn't have a blendMode property");
    }
  };

  /**
   * Calculates a color or colors between two color at a specific increment. 
   * The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
   * N.B.: Both color must be either CMYK or RGB.
   * 
   * @cat Color
   * @method lerpColor
   * @param  {Color} c1   Input color 1
   * @param  {Color} c2   Input color 2
   * @param  {Number} amt The Amount to interpolate between the two colors
   * @return {Color} Interpolated color
   */
  pub.lerpColor = function (c1, c2, amt) {
    if (c1 instanceof Color && c2 instanceof Color && typeof amt === 'number') {
      if (c1.space === ColorSpace.CMYK && c2.space === ColorSpace.CMYK) {
        var C1 = c1.colorValue[0];
        var M1 = c1.colorValue[1];
        var Y1 = c1.colorValue[2];
        var K1 = c1.colorValue[3];

        var C2 = c2.colorValue[0];
        var M2 = c2.colorValue[1];
        var Y2 = c2.colorValue[2];
        var K2 = c2.colorValue[3];

        var COut = Math.round( pub.lerp(C1,C2,amt) );
        var MOut = Math.round( pub.lerp(M1,M2,amt) );
        var YOut = Math.round( pub.lerp(Y1,Y2,amt) );
        var KOut = Math.round( pub.lerp(K1,K2,amt) );
        return pub.color(COut,MOut,YOut,KOut);

      } else if (c1.space === ColorSpace.RGB && c2.space === ColorSpace.RGB) {
        var R1 = c1.colorValue[0];
        var G1 = c1.colorValue[1];
        var B1 = c1.colorValue[2];

        var R2 = c2.colorValue[0];
        var G2 = c2.colorValue[1];
        var B2 = c2.colorValue[2];

        var ROut = Math.round( pub.lerp(R1,R2,amt) );
        var GOut = Math.round( pub.lerp(G1,G2,amt) );
        var BOut = Math.round( pub.lerp(B1,B2,amt) );
        warning([ROut,GOut,BOut]);
        return pub.color(ROut,GOut,BOut);

      } else {
        error("Both color must be either CMYK or RGB.");
      }
    } else {
      error("Wrong parameters. Use: two colors (of the same type) and a number.");
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
    if (arguments.length !== 5) error("Not enough parameters to draw a text! Use: b.text(txt, x, y, w, h)");
    if (!(isString(txt) || isNumber(txt))) warning("The first parameter has to be a string! But is something else: "+ typeof txt +". Use: b.text(txt, x, y, w, h)");
    var textFrame = currentPage().textFrames.add( currentLayer() );
    with (textFrame) {
      contents = txt.toString();
      geometricBounds = [y, x, (y+h), (x+w)];
      textFramePreferences.verticalJustification = currYAlign;
    }
    pub.typo(textFrame, {
      'appliedFont': currFont,
      'pointSize': currFontSize,
      'fillColor': currFillColor,
      'justification': currAlign,
      'leading': currLeading,
      'kerningValue': currKerning,
      'tracking': currTracking
    });

    
    if (currAlign === Justification.CENTER_ALIGN || currAlign === Justification.CENTER_JUSTIFIED) {
      textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix() );
    } else {
      textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix() );
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
      actsAsGetter = typeof property === 'string' && (value === undef || value === null),
      getOrSetProperties = function(textItem) {
        if (actsAsGetter) {
          result.push(textItem[property]);
        } else {
          setProperties(textItem);
        }
      },
      setProperties = function(textItem) {
        if (typeof property === 'string') {
          result.push(textItem);
          setProperty(textItem, property, value);
        } else if (typeof property === 'object') {
          result.push(textItem);
          for (var prop in property) {
            setProperty(textItem, prop, property[prop]);
          }
        }
      },
      setProperty = function(textItem, prop, val) {
        textItem[prop] = val;
      };

    if(!isValid(item)){
      warning("Invalid object passed to typo()");
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
      if (typeof item != 'undefined') {
          if (item.hasOwnProperty("isValid")) {
              if (!item.isValid) {
                  return false;
              } else {
                  return true;
              }
          }
      }
      return false;
  };

  /**
   * Returns the current font and sets it if argument fontName is given.
   *
   * @cat Typography
   * @method textFont
   * @param  {String} [fontName] The name of the font to set e.g. Helvetica
   * @param  {String} [fontStyle] The Font style e.g. Bold
   * @return {String}            The name of the current font
   */
  pub.textFont = function(fontName, fontStyle) {
    if (arguments.length === 1) {
      currFont = fontName;
    }
    if (arguments.length === 2) {
      currFont = fontName+"\t"+fontStyle;
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
   * Returns the character style with the given name. If the style does not exist it gets created.
   *
   * @cat Typography
   * @method characterStyle
   * @param  {String} name      The name of the character style to return.
   * @return {CharachterStyle}  The character style instance.
   */
  pub.characterStyle = function(name) {
    var style = null;
    try {
      style = currentDoc().characterStyles.item(name);
      style.name;
    } catch (e) {
      style = currentDoc().characterStyles.add({name: name});
    }
    return style;
  };

  /**
   * Returns the paragraph style with the given name. If the style does not exist it gets created.
   *
   * @cat Typography
   * @method paragraphStyle
   * @param  {String} name     The name of the paragraph style to return.
   * @return {ParagraphStyle}  The paragraph style instance.
   */
  pub.paragraphStyle = function(name) {
    var style = null;
    try {
      style = currentDoc().paragraphStyles.item(name);
      style.name;
    } catch (e) {
      style = currentDoc().paragraphStyles.add({name: name});
    }
    return style;
  };

  /**
   * Links the stories of two textframes to one story. Text of first textframe overflows to second one.
   *
   * @cat Typography
   * @method linkTextFrames
   * @param  {TextFrame} textFrameA
   * @param  {TextFrame} textFrameB
   */
  pub.linkTextFrames = function (textFrameA, textFrameB) {
    if (textFrameA instanceof TextFrame && textFrameB instanceof TextFrame) {
      textFrameA.nextTextFrame = textFrameB;
    } else {
      error("Wrong type! linkTextFrames() needs two textFrame objects to link the stories. Use: textFrameA, textFrameB");
    }
  };


  // ----------------------------------------
  // Image
  
  /**
   * Adds an image to the document. If the image argument is given as a string the image file  must be in the document's
   * data directory which is in the same directory where the document is saved in. The image argument can also be a File
   * instance which can be placed even before the document was saved.
   * The second argument can either be the x position of the frame to create or an instance of a rectangle,
   * oval or polygon to place the image in.
   * If x and y positions are given and width and height are not given, the frame's size gets set to the original image size.
   *
   * @cat Document
   * @subcat Image
   * @method image
   * @param  {String|File} img The image file name in the document's data directory or a File instance
   * @param  {Number|Rectangle|Oval|Polygon} x The x position on the current page or the item instance to place the image in
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
      height = null;
    if (x instanceof Rectangle ||
        x instanceof Oval ||
        x instanceof Polygon) {
      frame = x;
    } else {
      width = 1;
      height = 1;
      if (currImageMode === pub.CORNERS) {
        width = w - x;
        height = h - y;
        fitOptions = FitOptions.contentToFrame;
      } else {
        if (w && h) {
          width = w;
          height = h;
          fitOptions = FitOptions.contentToFrame;
        } else {
          fitOptions = FitOptions.frameToContent;
        }
      }
      
      frame = currentPage().rectangles.add({
        geometricBounds:[y, x, y + height, x + width]
      });
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
                         currMatrix.adobeMatrix() );
    } else {
      frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix() );
    }
    return frame;
  };

  /**
   * Transforms position and size of an image.
   * The image fit options are always "contentToFrame".
   *
   * @cat Document
   * @subcat Image
   * @method transformImage
   * @param  {Graphic} img The image to transform
   * @param  {Number} x       New x
   * @param  {Number} y       New y
   * @param  {Number} width   New width
   * @param  {Number} height  New height
   */
  pub.transformImage = function(img, x, y, width, height) {
    if (img.hasOwnProperty("geometricBounds") && img.hasOwnProperty("fit")) {
      //[y1, x1, y2, x2]
      img.geometricBounds = [y,x,y+height,x+width];
      if (currImageMode === pub.CENTER) {
        img.move(null, [-(width / 2), -(height / 2)]);
      }
      img.fit( FitOptions.CENTER_CONTENT );
      img.fit( FitOptions.contentToFrame );
    } else {
      error("transformImage(). Wrong type! Use: img, x, y, width, height");
    }
  };

  /**
   * Modifies the location from which images draw. The default mode is imageMode(CORNER), which specifies the location to be the upper left corner and uses the fourth and fifth parameters of image() to set the image's width and height. The syntax imageMode(CORNERS) uses the second and third parameters of image() to set the location of one corner of the image and uses the fourth and fifth parameters to set the opposite corner. Use imageMode(CENTER) to draw images centered at the given x and y position.
   * If no parameter is passed the currently set mode is returned as String.
   *
   * @cat Document
   * @subcat Image
   * @method imageMode
   * @param {String} [mode] Either b.CORNER, b.CORNERS, or b.CENTER
   * @return {String} The current mode
   */
  pub.imageMode = function(mode) {
    if (arguments.length === 0) return currImageMode;

    if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER ) {
      currImageMode = mode;
    } else {
      error("Unsupported imageMode. Use: CORNER, CORNERS, CENTER.");
    }
    return currImageMode;
  };

  var initDataFile = function(file, mustExist) {
    var result = null;
    if (file instanceof File) {
      result = file;
    } else {
      var folder = new Folder(projectPath().absoluteURI + '/data');
      folder.create(); // creates data folder if not existing, otherwise it just skips
      result = new File(folder.absoluteURI + '/' + file);
    }
    if (mustExist && !result.exists) {
      error('The file "' + result + '" does not exist.');
    }
    return result;
  };
  
  var initExportFile = function(file, mustExist) {
    var result = null;
    if (file instanceof File) {
      result = file;
    } else {
      result = new File(projectPath().absoluteURI + '/' + file);
    }
    if (mustExist && !result.exists) {
      error('The file "' + result + '" does not exist.');
    }
    return result;
  };
  
  var projectPath = function() {
      var docPath = null;
      try {
        docPath = currentDoc().filePath;
      } catch (e) {
        error("The current document must be saved before its project directory can be accessed.");
      }
      return docPath;
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
     * @cat Data
     * @subcat Vector
     * @method Vector
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [z]
     */
    function Vector(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
    /**
     * Static function. Calculates the Euclidean distance between two points (considering a point as a vector object).
     * Is meant to be called "static" i.e. Vector.dist(v1, v2);
     * @cat Data
     * @subcat Vector
     * @method Vector.dist
     * @static
     * @param {Vector} v1 The first vector
     * @param {Vector} v2 The second vector
     * @return {Number} The distance
     */
    Vector.dist = function(v1, v2) {
      return v1.dist(v2);
    };

    /**
     * Static function. Calculates the dot product of two vectors.
     * Is meant to be called "static" i.e. Vector.dot(v1, v2);
     * @method Vector.dot
     * @cat Data
     * @subcat Vector
     * @static
     * @param {Vector} v1 The first vector
     * @param {Vector} v2 The second vector
     * @return {Number} The dot product
     */
    Vector.dot = function(v1, v2) {
      return v1.dot(v2);
    };

    /**
     * Static function. Calculates the cross product of two vectors.
     * Is meant to be called "static" i.e. Vector.cross(v1, v2);
     * @method Vector.cross
     * @cat Data
     * @subcat Vector
     * @static
     * @param {Vector} v1 The first vector
     * @param {Vector} v2 The second vector
     * @return {Number} The cross product
     */
    Vector.cross = function(v1, v2) {
      return v1.cross(v2);
    };

    /**
     * Static function. Calculates the angle between two vectors.
     * Is meant to be called "static" i.e. Vector.angleBetween(v1, v2);
     * @method Vector.angleBetween
     * @cat Data
     * @subcat Vector
     * @static
     * @param {Vector} v1 The first vector
     * @param {Vector} v2 The second vector
     * @return {Number} The angle
     */
    Vector.angleBetween = function(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    };

    Vector.prototype = {

      /**
       * Sets the x, y, and z component of the vector using three separate variables, the data from a Vector, or the values from a float array.
       * @method Vector.set
       * @cat Data
       * @subcat Vector
       * @param {Number|Array|Vector} v Either a vector, array or x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
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
       * @cat Data
       * @subcat Vector
       * @return {Vector} A copy of the vector
       */
      get: function() {
        return new Vector(this.x, this.y, this.z);
      },
      /**
       * Calculates the magnitude (length) of the vector and returns the result as a float
       * @method Vector.mag
       * @cat Data
       * @subcat Vector
       * @return {Number} The length
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
       * @return {Number} The distance
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
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
       * @return {Number} The dot product
       */
      dot: function(v, y, z) {
        if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
        return this.x * v + this.y * y + this.z * z;
      },
      /**
       * Calculates the cross product from this vector to another as x, y, and z components or full vector.
       * @method Vector.cross
       * @cat Data
       * @subcat Vector
       * @param {Vector|Number} v Either a full vector or an x component
       * @param {Number} [y] The y component
       * @param {Number} [z] The z component
       * @return {Number} The cross product
       */
      cross: function(v) {
        var x = this.x,
          y = this.y,
          z = this.z;
        return new Vector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y);
      },
      /**
       * Normalizes the length of this vector to 1.
       * @cat Data
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
       * @cat Data
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
       * @method Vector.heading2D
       * @cat Data
       * @subcat Vector
       * @return {Number} A radian angle value
       */
      heading2D: function() {
        return -Math.atan2(-this.y, this.x);
      },
      /**
       * Returns data about this vector as a string.
       * @method Vector.toString
       * @cat Data
       * @subcat Vector
       * @return {String} The x, y and z components as a string.
       */
      toString: function() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
      },
      /** 
       * Returns this vector as an array [x,y,z].
       * @method Vector.array
       * @cat Data
       * @subcat Vector
       * @return {Array} [x,y,z]
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
   * @param {Number} val An arbitrary number
   * @return The absolute value of that number
   */
  pub.abs = Math.abs;

  /**
   * Calculates the closest int value that is greater than or equal to the value of the parameter. For example, ceil(9.03) returns the value 10.
   *
   * @cat Math
   * @subcat Calculation
   * @method ceil
   * @param {Number} val An arbitrary number
   * @return The next highest integer value
   */
  pub.ceil = Math.ceil;

  /**
   * Constrains a value to not exceed a maximum and minimum value.
   *
   * @cat Math
   * @subcat Calculation
   * @method constrain
   * @param {Number} aNumber the value to constrain
   * @param {Number} aMin minimum limit
   * @param {Number} aMax maximum limit
   * @return The constrained value
   */
  pub.constrain = function(aNumber, aMin, aMax) {
    if(arguments.length !== 3 ) error("Wrong argument count for b.constrain().");
    return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
  };

  /**
   * Calculates the distance between two points.
   *
   * @cat Math
   * @subcat Calculation
   * @method dist
   * @param {Number} x1 the x-coordinate of the first point
   * @param {Number} y1 the y-coordinate of the first point
   * @param {Number} x2 the x-coordinate of the second point
   * @param {Number} y2 the y-coordinate of the second point
   * @return {Number} The distance
   */
  pub.dist = function() {
    var dx, dy, dz;
    if (arguments.length === 4) {
      dx = arguments[0] - arguments[2];
      dy = arguments[1] - arguments[3];
      return Math.sqrt(dx * dx + dy * dy);
    } else {
      error("Wrong argument count for b.dist().");
    }
  };

  /**
   * Returns Euler's number e (2.71828...) raised to the power of the value parameter.
   * 
   * @cat Math
   * @subcat Calculation
   * @method exp
   * @param {Number} a value
   * @return {Number}
   */
  pub.exp = Math.exp;

  /**
   * Calculates the closest int value that is less than or equal to the value of the parameter.
   * 
   * @cat Math
   * @subcat Calculation
   * @method floor
   * @param {Number} a value
   * @return {Number}
   */
  pub.floor = Math.floor;

  /**
   * Calculates a number between two numbers at a specific increment. The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
   *
   * @cat Math
   * @subcat Calculation
   * @method lerp
   * @param {Number} value1 first value
   * @param {Number} value2 second value
   * @param {Number} amt between 0.0 and 1.0
   * @return {Number} The mapped value
   */
  pub.lerp = function(value1, value2, amt) {
    if(arguments.length !== 3 ) error("Wrong argument count for b.lerp().");
    return (value2 - value1) * amt + value1;
  };

  /**
   * Calculates the natural logarithm (the base-e logarithm) of a number. This function expects the values greater than 0.0.
   * 
   * @cat Math
   * @subcat Calculation
   * @method log
   * @param {Number} number must be greater then 0.0
   * @return {Number}
   */
  pub.log = Math.log;

  /**
   * Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly used in computer graphics and linear algebra. Because it has no "start" position, the magnitude of a vector can be thought of as the distance from coordinate (0,0) to its (x,y) value. Therefore, mag() is a shortcut for writing "dist(0, 0, x, y)".
   * 
   * @cat Math
   * @subcat Calculation
   * @method mag
   * @param {Number} a x-coordinate
   * @param {Number} b y-coordinate
   * @param {Number} [c] z-coordinate
   * @return {Number} the magnitude
   */
  pub.mag = function(a, b, c) {
    if( ! (arguments.length === 2 || arguments.length === 3 ) )  error("Wrong argument count for b.mag().");
    if (c) return Math.sqrt(a * a + b * b + c * c);
    return Math.sqrt(a * a + b * b);
  };

  /**
   * Re-maps a number from one range to another. In the example above, the number '25' is converted from a value in the range 0..100 into a value that ranges from the left edge (0) to the right edge (width) of the screen.
   * 
   * Numbers outside the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.
   * 
   * @cat Math
   * @subcat Calculation
   * @method map
   * @param {Number} value the value to be mapped
   * @param {Number} istart start of the input range
   * @param {Number} istop end of the input range
   * @param {Number} ostart start of the output range
   * @param {Number} ostop end of the output range
   * @return {Number} the mapped value
   */
  pub.map = function(value, istart, istop, ostart, ostop) {
    if(arguments.length !== 5 ) error("Wrong argument count for b.map().");
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };

  /**
   * Determines the largest value in a sequence of numbers.
   * 
   * @cat Math
   * @subcat Calculation
   * @method max
   * @param {Number|Array} param1 Either the first value or an array of Numbers 
   * @param {Number} param2 Another value to be compared
   * @param {Number} param3 Another value to be compared
   * @return {Number} The highest value
   */ 
  pub.max = function() {
    if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
    var numbers = arguments.length === 1 ? arguments[0] : arguments;
    if (! ("length" in numbers && numbers.length > 0)) error("Non-empty array is expected");
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
   * @param {Number|Array} param1 Either the first value or an array of Numbers 
   * @param {Number} param2 Another value to be compared
   * @param {Number} param3 Another value to be compared
   * @return {Number} The lowest value
   */ 
  pub.min = function() {
    if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
    var numbers = arguments.length === 1 ? arguments[0] : arguments;
    if (! ("length" in numbers && numbers.length > 0)) error("Non-empty array is expected");
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
   * @param {Number} aNumber The value to be normed
   * @param {Number} low The lowest value to be expected
   * @param {Number} low The highest value to be expected
   * @return {Number} The normalized value
   */
  pub.norm = function(aNumber, low, high) {
    if(arguments.length !== 3 ) error("Wrong argument count for b.norm().");
    return (aNumber - low) / (high - low);
  };

  /**
   * Facilitates exponential expressions. The pow() function is an efficient way of multiplying numbers by themselves (or their reciprocal) in large quantities. For example, pow(3, 5) is equivalent to the expression 3*3*3*3*3 and pow(3, -5) is equivalent to 1 / 3*3*3*3*3
   *
   * @cat Math
   * @subcat Calculation
   * @method pow
   * @param {Number} num base of the exponential expression
   * @param {Number} exponent power of which to raise the base
   * @return {Number} the result
   */
  pub.pow = Math.pow;

  /**
   * Calculates the integer closest to the value parameter. For example, round(9.2) returns the value 9.
   *
   * @cat Math
   * @subcat Calculation
   * @method round
   * @param {Number} value The value to be rounded
   * @return {Number} The rounded value
   */
  pub.round = Math.round;

  /**
   * Squares a number (multiplies a number by itself). The result is always a positive number, as multiplying two negative numbers always yields a positive result. For example, -1 * -1 = 1.
   *
   * @cat Math
   * @subcat Calculation
   * @method sq
   * @param {Number} aNumber The value to be squared
   * @return {Number} 
   */
  pub.sq = function(aNumber) {
    if(arguments.length !== 1 ) error("Wrong argument count for b.sq().");
    return aNumber * aNumber;
  };

  // -- Trigonometry --
  
  /**
   * Calculates the square root of a number. The square root of a number is always positive, even though there may be a valid negative root. The square root s of number a is such that s*s = a. It is the opposite of squaring.
   *
   * @cat Math
   * @subcat Trigonometry
   * @method sqrt
   * @param {Number} val The value to be calculated
   * @return {Number} 
   */
  pub.sqrt = Math.sqrt;

  /**
   * The inverse of cos(), returns the arc cosine of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method acos
   * @param {Number} value the value whose arc cosine is to be returned
   * @return {Number} 
   */
  pub.acos = Math.acos;
  
  /**
   * The inverse of sin(), returns the arc sine of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method asin
   * @param {Number} value the value whose arc sine is to be returned
   * @return {Number} 
   */  
  pub.asin = Math.asin;

  /**
   * The inverse of tan(), returns the arc tangent of a value. This function expects the values in the range of -1 to 1 and values are returned in the range 0 to PI (3.1415927).
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method atan
   * @param {Number} value the value whose arc tangent is to be returned
   * @return {Number} 
   */
  pub.atan = Math.atan;

  /**
   * Calculates the angle (in radians) from a specified point to the coordinate origin as measured from the positive x-axis. Values are returned as a float in the range from PI to -PI. The atan2() function is most often used for orienting geometry to the position of the cursor. Note: The y-coordinate of the point is the first parameter and the x-coordinate is the second due the the structure of calculating the tangent.
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method atan2
   * @param {Number} y the y coordinate
   * @param {Number} x the x coordinate
   * @return {Number} 
   */
  pub.atan2 = Math.atan2;

  /**
   * Calculates the cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range -1 to 1.
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method cos
   * @param {Number} rad a value in radians
   * @return {Number} 
   */
  pub.cos = Math.cos;
  
  /**
   * Converts a radian measurement to its corresponding value in degrees. Radians and degrees are two ways of measuring the same thing. There are 360 degrees in a circle and 2*PI radians in a circle. For example, 90° = PI/2 = 1.5707964. All trigonometric methods in Processing require their parameters to be specified in radians.
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method degrees
   * @param {Number} aAngle an angle in radians
   * @return {Number} The given angle in degree
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
   * @param {Number} aAngle an angle in degree
   * @return {Number} The given angle in radians
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
   * @param {Number} rad a value in radians
   * @return {Number} 
   */
  pub.sin = Math.sin;

  /**
   * Calculates the ratio of the sine and cosine of an angle. This function expects the values of the angle parameter to be provided in radians (values from 0 to PI*2). Values are returned in the range infinity to -infinity.
   * 
   * @cat Math
   * @subcat Trigonometry
   * @method tan
   * @param {Number} rad a value in radians
   * @return {Number} 
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
   * @param {Number} [low] The low border of the range
   * @param {Number} [high] The high border of the range
   * @return {Number} A random number
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
  /* todo */
  pub.randomSeed = function(seed) {
    currentRandom = (new Marsaglia(seed)).nextDouble;
  };
  /* todo */
  pub.Random = function(seed) {
    var haveNextNextGaussian = false,
      nextNextGaussian, random;
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

  /* todo */
  function PerlinNoise(seed) {
    var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
    var i, j;
    var perm = new Uint8Array(512);
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
   * @param {Number} x Coordinate in x space
   * @param {Number} [y] Coordinate in y space
   * @param {Number} [z] Coordinate in z space
   * @return {Number} the noise value
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
   * @param {Number} octaves number of octaves to be used by the noise() function
   * @param {Number} fallout falloff factor for each octave
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
   * @param {Number} seed 
   */
  pub.noiseSeed = function(seed) {
    noiseProfile.seed = seed;
    noiseProfile.generator = undef;
  };


  // ----------------------------------------
  // Date
  
  /**
   * The year() function returns the current year as an integer (2012, 2013 etc).
   * 
   * @cat Environment
   * @subcat Date
   * @method year
   * @return {Number}
   */
  pub.year = function() {
    return (new Date()).getFullYear()();
  };

  /**
   * The month() function returns the current month as a value from 1 - 12.
   * 
   * @cat Environment
   * @subcat Date
   * @method month
   * @return {Number}
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
   * @return {Number}
   */
  pub.day = function() {
    return (new Date()).getDate();
  };
  
  /**
   * The hour() function returns the current hour as a value from 0 - 23.
   * 
   * @cat Environment
   * @subcat Date
   * @method hour
   * @return {Number}
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
   * @return {Number}
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
   * @return {Number}
   */
  pub.second = function() {
    return (new Date()).getSeconds();
  };
  
  /**
   * Returns the number of milliseconds (thousandths of a second) since starting an applet. This information is often used for timing animation sequences.
   * 
   * @cat Environment
   * @subcat Date
   * @method millis
   * @return {Number}
   */
  pub.millis = function() {
    return Date.now() - startTime;
  };

  /**
   * Returns items tagged with the given label in the InDesign Script Label pane (Window -> Utilities -> Script Label).
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method labels
   * @param  {String} label The label identifier
   * @param  {Function} cb Optional: The callback function to call with each item in the search result. When this function returns false the loop stops. Passed arguments: item, loopCount
   * @return {PageItem[]} Array of concrete PageItem instances, e.g. TextFrame or SplineItem.
   */
  pub.labels = function(label, cb) {
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
    return result;
  };

  /**
   * Returns the currently selected object(s)
   *
   * @cat Document
   * @subcat Multi-Getters
   * @method selections
   * @param  {Function} cb Optional: The callback function to call with each item in the selection. When this function returns false the loop stops. Passed arguments: item, loopCount
   * @return {Object[]} Array of selected object(s).
   */
  pub.selections = function(cb) {
    if(app.selection.length === 0) error("Selection is empty. Please select something :)");
    if (arguments.length === 1 && cb instanceof Function) {
      return forEach(app.selection, cb);
    } 
    return app.selection;
  };

  /**
   * Reads the contents of a file into a String.
   * If the file is specified by name as String, it must be located in the document's data directory.
   *
   * @cat Data
   * @subcat Input
   * @method loadString
   * @param  {String|File} file The text file name in the document's data directory or a File instance
   * @return {String}  String file content.
   */
  pub.loadString = function(file) {

    //http://codegolf.stackexchange.com/questions/464/shortest-url-regex-match-in-javascript
    // var re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;  
    // if( typeof(file) === "string" && file.match(re)) { // load URL
    
    //   return getURLImpl(file);

    // } else {
      var inputFile = initDataFile(file, true),
      data = null;

      inputFile.open('r');
      data = inputFile.read();
      inputFile.close();
      return data;
    // }

  };

  // var getURLImpl = function(url) {
  //     #include "basiljs/bundle/lib/extendables/extendables.jsx";
  //     var http = require("http");
  //     if (!http.has_internet_access()) throw new Error("No internet connection");
  //     var req = new http.HTTPRequest("GET", url);
  //     req.follow_redirects(true);
  //     req.header("User-Agent", "basiljs-" + b.VERSION);
  //     var res = req.do();
  //     return res.body;
  // }

  /**
   * Reads the contents of a file and creates a String array of its individual lines.
   * If the file is specified by name as String, it must be located in the document's data directory.
   *
   * @cat Data
   * @subcat Input
   * @method loadStrings
   * @param  {String|File} file The text file name in the document's data directory or a File instance
   * @return {String[]}  Array of the individual lines in the given file.
   */
  pub.loadStrings = function(file) {

    //http://codegolf.stackexchange.com/questions/464/shortest-url-regex-match-in-javascript
    // var re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;  
    // if( typeof(file) === "string" && file.match(re)) { // load URL
    
    //   var result = getURLImpl(file);
    //   return b.split(result, "\n");

    // } else {

      var inputFile = initDataFile(file, true),
      result = [];

      inputFile.open('r');
      while (!inputFile.eof) {
        result.push(inputFile.readln());
      }
      inputFile.close();

      return result;
    // }

  };


  // ----------------------------------------
  // Output
  
  /**
   * Prints a message line to the console output in the ExtendScript editor. 
   * 
   * @cat Output
   * @method println
   * @param {String} The message to print
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
   * @param {String} The message to print
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
   * Writes an array of strings to a file, one line per string. This file is saved to the document's data directory.
   * If the given file exists it gets overridden.
   *
   * @cat Output
   * @method saveStrings
   * @param  {String|File} file The file name or a File instance
   * @param  {String[]} strings The string array to be written
   */
  pub.saveStrings = function(file, strings) {
    var outputFile = initExportFile(file);
    outputFile.open('w');
    forEach(strings, function(s) {
      outputFile.writeln(s);
    });
    outputFile.close();
  };

  /**
   * Exports the current document as PDF to the documents data folder. Please note, that export options default to the last used export settings.
   *
   * @todo data folder is not created automatically,
   * @cat Output
   * @method savePDF
   * @param {String|File} file The file name or a File instance
   * @param {Boolean} showOptions Whether to show the export dialog
   */
  pub.savePDF = function(file, showOptions){
    var outputFile = initExportFile(file);
    if (typeof showOptions !== "boolean") showOptions = false;
    b.doc().exportFile(ExportFormat.PDF_TYPE, outputFile, showOptions);
  };
  
  /**
   * Prints out all properties and values off an object in a recursive manner to the console. Useful for inspecting (or debugging) nested variable. the default value for the recursion is maxlevel = 2.
   *
   * @cat Output
   * @method inspect
   * @param  {Object} obj : the Object to inspect
   * @param  {Number} maxlevel Optional: recursion limit, default maxlevel = 2
   */
  pub.inspect = function(obj, maxlevel, level, propname) {
    if (!level) level = 0;
    if (!maxlevel) maxlevel = 2;
    if (level > maxlevel) return;

    var constructorName = obj.constructor.name;

    var indent = "";
    for (var i = 0; i < level; i++) indent = indent + "\t";

    if (level === 0) {
      println(obj);
    } else {
      if (constructorName === "Boolean" ||
          constructorName === "Number" ||
          constructorName === "String") {
        println(indent+propname+": "+obj);
      }
      else if (constructorName === "Array") {
        println(indent+propname+": "+constructorName+"("+obj.length+")");
      }
      else if (constructorName === "Color") {
        println(indent+propname+": ["+obj.colorValue+"] "+constructorName);
      } 
      else {
        println(indent+propname+": "+constructorName);
      }
    }

    if ( constructorName === 'Array' ) {
      for (var i = 0, len = obj.length; i < len; i++) {
        pub.inspect(obj[i], maxlevel, level+1, i);
      };
    } else if (typeof obj === 'object') {
      try {
        for (var i in obj){
          if (obj.hasOwnProperty(i)) {
            pub.inspect(obj[i], maxlevel, level+1, i);
          }
        }
      }
      catch(e) {
        println(indent+"--> "+propname+" "+e);
      }
    }
  }  

  // ----------------------------------------
  // Transform
  // geometricBounds hint: [y1, x1, y2, x2]

  var precision = function(num, dec) {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }  

/**
   * The function calculates the geometric bounds of any given object. Use b.itemX(), b.itemY(), b.itemPosition(), b.itemWidth(), b.itemHeight() and b.itemSize() to modify PageItems.
   * In case the object is any kind of text, then additional typographic information baseline and xHeight are calculated
   *
   * @cat Document
   * @subcat Transformation
   * @method bounds
   * @param  {Text|Object} obj The object to calculate the geometric bounds
   * @return {Object} Geometric bounds object with these properties: width, height, left, right, top, bottom and for text: baseline, xHeight
   */
  pub.bounds = function (obj) {
    var x1,y1,x2,y2,w,h;

    if (isText(obj)) {
      var baseline = obj.baseline;
      var ascent = obj.ascent;
      var descent = obj.descent;

      x1 = obj.horizontalOffset;
      y1 = baseline - ascent;
      x2 = obj.endHorizontalOffset;
      y2 = baseline + descent;
      w = x2-x1;
      h = y2-y1;

      if (w < 0 || h <0) {
        warning("bounds(textObj), not possible to get correct bounds, possible line break within textObj");
      }

      // TODO: not sure if this 100% correct, check
      // http://en.wikipedia.org/wiki/File:Typography_Line_Terms.svg
      var xHeight = y1+descent;

      return {'width':w,
              'height':h,
              'left':x1,
              'right':x2,
              'top':y1,
              'bottom':y2,
              'baseline':baseline,
              'xHeight':xHeight };
    } else {
      // is it a pageItem?
      if (obj.hasOwnProperty("geometricBounds")) {
        var geometricBounds = obj.geometricBounds; //[y1, x1, y2, x2]
        x1 = geometricBounds[1];
        y1 = geometricBounds[0];
        x2 = geometricBounds[3];
        y2 = geometricBounds[2];
        w = x2-x1;
        h = y2-y1;
        return {'width':w, 'height':h, 'left':x1, 'right':x2, 'top':y1, 'bottom':y2};
      }
      // everything else e.g. page, spread
      else if (obj.hasOwnProperty("bounds")) {
        var bounds = obj.bounds; //[y1, x1, y2, x2]
        x1 = bounds[1];
        y1 = bounds[0];
        x2 = bounds[3];
        y2 = bounds[2];
        w = x2-x1;
        h = y2-y1;
        return {'width':w, 'height':h, 'left':x1, 'right':x2, 'top':y1, 'bottom':y2};
      }
      // no idea what that might be, give up
      else {
        error("bounds(obj), invalide type! Can't get bounds for this object.");
      }
    }
  };  

  /**
   * Positions a PageItem at the designated spot on the x axis. If no x argument is given the current x position is returned.
   * 
   * @cat Document
   * @subcat Transformation
   * @method itemX
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [x] The new x position
   * @returns {Number} The current x position
   */
  pub.itemX = function(pItem, x) {
    var off = 0;
    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");
    if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
      if( typeof x === 'number' ){
        var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
        var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
//        if(currRectMode === b.CENTER) off = ( pItem.geometricBounds[2] - pItem.geometricBounds[0] ) / 2;
        pItem.geometricBounds = [ pItem.geometricBounds[0] - off, x - off, pItem.geometricBounds[0] + height - off, x - off + width ];
      } else {
//        if(currRectMode === b.CENTER) off = ( pItem.geometricBounds[3] - pItem.geometricBounds[1] ) / 2;
        return precision(pItem.geometricBounds[1], 5) + off; // CS6 sets geometricBounds to initially slightly off values... terrible workaround
      }
    } else {
      error("pItem has to be a valid PageItem");
    }
  };

  /**
   * Positions a PageItem at the designated spot on the y axis. If no y argument is given the current y position is returned.
   *
   * @cat Document
   * @subcat Transformation
   * @method itemY
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [y] The new y position
   * @returns {Number} The current y position
   */
  pub.itemY = function(pItem, y) {
    var off = 0;
    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");
    if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
      if( typeof y === 'number' ) {
        var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
        var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
//        if(currRectMode === b.CENTER) off = ( pItem.geometricBounds[3] - pItem.geometricBounds[1] ) / 2;
        b.itemPosition(pItem, pItem.geometricBounds[1] - off, y);
        pItem.geometricBounds = [ y, pItem.geometricBounds[1] - off, y + height, pItem.geometricBounds[1] + width - off ];
      } else {
//        if(currRectMode === b.CENTER) off = ( pItem.geometricBounds[2] - pItem.geometricBounds[0] ) / 2;
        return precision(pItem.geometricBounds[0], 5) + off;
      }
    } else {
      error("pItem has to be a valid PageItem");
    }
  };
  
  /**
   * Scales the given PageItem to the given width. If width is not given as argument the current width is returned.
   *
   * @cat Document
   * @subcat Transformation
   * @method itemWidth
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [width] The new width
   * @returns {Number} The current width
   */
  pub.itemWidth = function(pItem, width) {
    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");
    if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
      if( typeof width === 'number' ){
        b.itemSize( pItem, width, Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]) );
      } else {
        return Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]);
      }
    } else {
      error("pItem has to be a valid PageItem");
    }
  };

  /**
   * Scales the given PageItem to the given height. If height is not given as argument the current height is returned.
   *
   * @cat Document
   * @subcat Transformation
   * @method itemHeight
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [height] The new height
   * @returns {Number} The current height
   */
  pub.itemHeight = function(pItem, height) {
    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");
    if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
      if( typeof height === 'number' ){
        b.itemSize( pItem, Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]), height );
      } else {
        return Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]);
      }
    } else {
      error("pItem has to be a valid PageItem");
    }
  };

  /**
   * Moves the given PageItem to the given position. If x or y is not given as argument the current position is returned.
   *
   * @cat Document
   * @subcat Transformation
   * @method itemPosition
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [x] The new x coordinate
   * @param {Number} [y] The new y coordinate
   * @returns {Object} Returns an object with the fields x and y
   */
  pub.itemPosition = function(pItem, x, y) {

    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");

    if ( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
    
      if( typeof x === 'number' && typeof y === 'number') {
        var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
        var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
        var offX = 0;
        var offY = 0;
        // if(currRectMode === b.CENTER) {
        //   offX = width / 2;
        //   offY = height / 2;
        // }
        pItem.geometricBounds = [ y + offY, x + offX, y + height + offY, x + width + offX];
        
      } else {
        return { x: precision(pItem.geometricBounds[1], 5), y: precision(pItem.geometricBounds[0], 5) };
      }
      
    } else {
      error("itemPosition() only works with child classes of PageItem.");
    }
  };

  /**
   * Scales the given PageItem to the given size. If width or height is not given as argument the current size is returned.
   *
   * @cat Document
   * @subcat Transformation
   * @method itemSize
   * @param {PageItem} pItem The PageItem to alter
   * @param {Number} [width] The new width
   * @param {Number} [height] The new height
   * @returns {Object} Returns an object with the fields width and height
   */
  pub.itemSize = function(pItem, width, height) {
    if(currRectMode !== b.CORNER) pub.warning("Please note that only b.CORNER positioning is fully supported. Use with care.");
    if (pItem !== null && pItem.hasOwnProperty("geometricBounds")) {
    
      var x = pItem.geometricBounds[1];
      var y = pItem.geometricBounds[0];

      if( typeof width === 'number'  && typeof height === 'number' ) {
        // if(currRectMode === b.CENTER) {
        //   // current center, calc old width and height
        //   x = x + (pItem.geometricBounds[3] - pItem.geometricBounds[1]) / 2;
        //   y = y + (pItem.geometricBounds[2] - pItem.geometricBounds[0]) / 2;
        //   pItem.geometricBounds = [ y - height / 2, x - width / 2, y + height / 2, x + width / 2];
        // } else {
          pItem.geometricBounds = [ y, x, y + height, x + width];
        // }
        
      } else {
        return { width: pItem.geometricBounds[3] - pItem.geometricBounds[1] , height: pItem.geometricBounds[2] - pItem.geometricBounds[0] };
      }
      
    } else {
      error("itemSize() only works with child classes of PageItem.");
    }
  };
  

  
  var printMatrixHelper = function(elements) {
    var big = 0;
    for (var i = 0; i < elements.length; i++) if (i !== 0) big = Math.max(big, Math.abs(elements[i]));
    else big = Math.abs(elements[i]);
    var digits = (big + "").indexOf(".");
    if (digits === 0) digits = 1;
    else if (digits === -1) digits = (big + "").length;
    return digits;
  };
  
  /* todo */
  var Matrix2D = pub.Matrix2D = function() {
    if (arguments.length === 0) this.reset();
    else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) this.set(arguments[0].array());
    else if (arguments.length === 6) this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
  };
  /* todo */
  Matrix2D.prototype = {
    set: function() {
      if (arguments.length === 6) {
        var a = arguments;
        this.set([a[0], a[1], a[2], a[3], a[4], a[5]]);
      } else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) this.elements = arguments[0].array();
      else if (arguments.length === 1 && arguments[0] instanceof Array) this.elements = arguments[0].slice();
    },
    get: function() {
      var outgoing = new Matrix2D();
      outgoing.set(this.elements);
      return outgoing;
    },
    reset: function() {
      this.set([1, 0, 0, 0, 1, 0]);
    },
    array: function array() {
      return this.elements.slice();
    },
    adobeMatrix: function array() {
      return [this.elements[0],
              this.elements[3],
              this.elements[1],
              this.elements[4],
              this.elements[2],
              this.elements[5]];
    },
    translate: function(tx, ty) {
      this.elements[2] = tx * this.elements[0] + ty * this.elements[1] + this.elements[2];
      this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5];
    },
    invTranslate: function(tx, ty) {
      this.translate(-tx, -ty);
    },
    transpose: function() {},
    mult: function(source, target) {
      var x, y;
      if (source instanceof Vector) {
        x = source.x;
        y = source.y;
        if (!target) target = new Vector();
      } else if (source instanceof Array) {
        x = source[0];
        y = source[1];
        if (!target) target = [];
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
    multX: function(x, y) {
      return x * this.elements[0] + y * this.elements[1] + this.elements[2];
    },
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
    determinant: function() {
      return this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3];
    },
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
    scale: function(sx, sy) {
      if (sx && !sy) sy = sx;
      if (sx && sy) {
        this.elements[0] *= sx;
        this.elements[1] *= sy;
        this.elements[3] *= sx;
        this.elements[4] *= sy;
      }
    },
    invScale: function(sx, sy) {
      if (sx && !sy) sy = sx;
      this.scale(1 / sx, 1 / sy);
    },
    apply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof Matrix2D) source = arguments[0].array();
      else if (arguments.length === 6) source = Array.prototype.slice.call(arguments);
      else if (arguments.length === 1 && arguments[0] instanceof Array) source = arguments[0];
      var result = [0, 0, this.elements[2], 0, 0, this.elements[5]];
      var e = 0;
      for (var row = 0; row < 2; row++) for (var col = 0; col < 3; col++, e++) result[e] += this.elements[row * 3 + 0] * source[col + 0] + this.elements[row * 3 + 1] * source[col + 3];
      this.elements = result.slice();
    },
    preApply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof Matrix2D) source = arguments[0].array();
      else if (arguments.length === 6) source = Array.prototype.slice.call(arguments);
      else if (arguments.length === 1 && arguments[0] instanceof Array) source = arguments[0];
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
    rotateZ: function(angle) {
      this.rotate(angle);
    },
    invRotateZ: function(angle) {
      this.rotateZ(angle - Math.PI);
    },
    print: function() {
      var digits = printMatrixHelper(this.elements);
      var output = "" + pub.nfs(this.elements[0], digits, 4) + " " + pub.nfs(this.elements[1], digits, 4) + " " + pub.nfs(this.elements[2], digits, 4) + "\n" + pub.nfs(this.elements[3], digits, 4) + " " + pub.nfs(this.elements[4], digits, 4) + " " + pub.nfs(this.elements[5], digits, 4) + "\n\n";
      pub.println(output);
    }
  };
  
  /* todo */
  pub.applyMatrix = function (matrix) {
    currMatrix.apply(matrix);
  };

  /* todo */
  pub.popMatrix = function (argument) {
    if (matrixStack.length > 0) {
      currMatrix.set( matrixStack.pop() );
    } else {
      error("Missing a pushMatrix() to go with that popMatrix()");
    }
  };

  /* todo */
  pub.printMatrix = function (argument) {
    currMatrix.print();
  };
  /* todo */
  pub.pushMatrix = function (argument) {
    matrixStack.push( currMatrix.array() );
  };
/* todo */
  pub.resetMatrix = function (argument) {
    matrixStack = [];
    currMatrix = new Matrix2D();
  };
/* todo */
  pub.rotate = function (angle) {
    currMatrix.rotate(angle);
  };
/* todo */
  pub.scale = function (scaleX,scaleY) {
    currMatrix.scale(scaleX,scaleY);
  };
/* todo */
  pub.translate = function (tx,ty) {
    currMatrix.translate(tx,ty);
  };


  // ----------------------------------------
  // execution

  /**
   * Run the sketch! Has to be called in every sketch a the very end of the code.
   * You may add performance setting options when calling b.go():
   * b.go(b.MODESILENT) alternatively: b.go()
   * b.go(b.MODEHIDDEN)
   * b.go(b.MODEVISIBLE)
   * Currently there is no performance optimization in b.loop()
   * @cat Environment
   * @method go
   * @param {MODESILENT|MODEHIDDEN|MODEVISIBLE} [modes] Optional: Switch performanceMode
   */
  pub.go = function (mode) {
    if (!mode) {
      mode = b.DEFAULTMODE;
    }
    app.scriptPreferences.enableRedraw = (mode == b.MODEVISIBLE);
    app.preflightOptions.preflightOff = true;

    try {
      currentDoc(mode);
        if (mode == b.MODEHIDDEN || mode == b.MODESILENT)
            progressPanel = new Progress();
      runSetup();
      runDrawOnce();
      var executionDuration = pub.millis();
      if (executionDuration < 1000) {
        println("[Finished in " + executionDuration + "ms]");
      } else {
        println("[Finished in " + (executionDuration/1000).toPrecision(3) + "s]");
      }

    } catch (e) { // exception not caught individually
        alert(e); // make verbose
    }

    if(currDoc && !currDoc.windows.length) {
      currDoc.windows.add(); //open the hidden doc
    }
    closeHiddenDocs();
    if (progressPanel)
        progressPanel.closePanel();
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

    if ($.engineName !== 'loop') {
      error('Add #targetengine "loop"; at the very top of your script.');
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
      if (typeof glob.setup === 'function') {
        glob.setup();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.FAST_ENTIRE_SCRIPT);
  };

  var runDrawOnce = function() {
    app.doScript(function() {
      if (typeof glob.draw === 'function') {
        glob.draw();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.FAST_ENTIRE_SCRIPT);
  };

  var runDrawLoop = function() {
    app.doScript(function() {
      if (typeof glob.draw === 'function') {
        glob.draw();
      }
    }, ScriptLanguage.javascript, undef, UndoModes.fastEntireScript);
  };

  var welcome = function() {
    clearConsole();
    println("Using basil.js "
        + pub.VERSION
        + " ...");
  };

    var currentDoc = function (mode) {
        if (!currDoc) {
            var doc = null;
            if (app.documents.length) {
                doc = app.activeDocument;
                if (mode == b.MODEHIDDEN) {
                    if (doc.modified)
                        throw ("To run in MODEHIDDEN save your active doc before processing.");
                    var docPath = doc.fullName;
                    doc.close(); //Close the dog and reopen it without adding to the display list
                    doc = app.open(File(docPath), false);
                }
            }
            else {
                doc = app.documents.add(mode != b.MODEHIDDEN);

            }


            /*
             try {
             doc = app.activeDocument;
             //if( doc.documentPreferences.facingPages ) warning("Your document is set up to use facing pages. You can still use basil.js, but please be aware that his mode causes some problems in the methods that deal with pages e.g. addPage() and removePage(). Turn it off for full compatibility.");
             } catch (e) {
             doc = app.documents.add();
             //doc.documentPreferences.facingPages = true; // turn facing pages off on new documents
             }
             */
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
    currFont = currDoc.textDefaults.appliedFont.name;
    currFontSize = currDoc.textDefaults.pointSize;
    currAlign = currDoc.textDefaults.justification;
    currLeading = currDoc.textDefaults.leading;
    currKerning = 0;
    currTracking = currDoc.textDefaults.tracking;
    pub.units(pub.PT);
    updatePublicPageSizeVars();
  };


  var progressPanel;

  var Progress = function () {
    this.init = function () {
      this.panel = new Window('palette', "processing...");
      //var logo = (Folder.fs == "Macintosh" ) ? File("~/Documents/basiljs/bundle/lib/basil.jpg") : File("?"); //todo Windows File Path for logo  , in the meantime embed as binary String
      //if (logo.exists)
      var logo = "\u00FF\u00D8\u00FF\u00E1\x00\x18Exif\x00\x00II*\x00\b\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00FF\u00EC\x00\x11Ducky\x00\x01\x00\x04\x00\x00\x00Z\x00\x00\u00FF\u00E1\x03-http://ns.adobe.com/xap/1.0/\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmp:CreatorTool=\"Adobe Photoshop CS6 (Macintosh)\" xmpMM:InstanceID=\"xmp.iid:E9CE76FD6EBE11E28C8AB0DFA0E665FA\" xmpMM:DocumentID=\"xmp.did:E9CE76FE6EBE11E28C8AB0DFA0E665FA\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:E9CE76FB6EBE11E28C8AB0DFA0E665FA\" stRef:documentID=\"xmp.did:E9CE76FC6EBE11E28C8AB0DFA0E665FA\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00FF\u00EE\x00\x0EAdobe\x00d\u00C0\x00\x00\x00\x01\u00FF\u00DB\x00\u0084\x00\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x02\x01\x01\x01\x02\x02\x02\x01\x01\x02\x02\x02\x02\x02\x02\x02\x02\x02\x03\x02\x03\x03\x03\x03\x02\x03\x03\x04\x04\x04\x04\x04\x03\x05\x05\x05\x05\x05\x05\x07\x07\x07\x07\x07\b\b\b\b\b\b\b\b\b\b\x01\x01\x01\x01\x02\x02\x02\x05\x03\x03\x05\x07\x05\x04\x05\x07\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\u00FF\u00C0\x00\x11\b\x00\u0085\x00\u00B0\x03\x01\x11\x00\x02\x11\x01\x03\x11\x01\u00FF\u00C4\x00\u00B0\x00\x01\x00\x02\x03\x00\x03\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x07\n\b\t\x0B\x03\x04\x06\x05\x02\x01\x01\x00\x03\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x05\x06\x03\x07\x02\x10\x00\x00\x05\x03\x03\x02\x03\x05\x06\x02\x07\t\x01\x00\x00\x00\x01\x02\x03\x04\x05\x00\x06\x07\x11\b\t\x12\n!\x13\x141A\u00B4v8Qa\"#\x15\x16q\u00812Bb3C\u00B7\x18\u0091RT\u00D6\x17w\u00A7X9\x1A\x11\x00\x02\x02\x01\x03\x02\x05\x02\x02\x05\t\t\x00\x00\x00\x00\x00\x01\x11\x02\x03!\x12\x041\x05AQ\"\x13\x06aq\u00812\u0091\u00B1B\u00B2\x14Rbr#3s\x156\x07\u00C1\u00D1\u00E1\u0082\u00B3\u00C3$4%\u00FF\u00DA\x00\f\x03\x01\x00\x02\x11\x03\x11\x00?\x00\u00BB\u00FE\u00D7>\u009Cp\x7F\u00CA\u00F0\u00DF\x04\u009D\x01<\u00D0\n\x01@(\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x01\x03ms\u00E9\u00C7\x07\u00FC\u00AF\r\u00F0I\u00D0\x13\u00CD\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x01\u0088\x1B\u00A5\u00DF\u00FE\u00CA\u00B6M\x0Ey\u008D\u00D5nn\u00CF\u00C2\x7F\u0094+\u00B4\u0080\u0097\u0097o\u00FA\u00EB\u00D4\u00805\u00EAg\x10\u00D4V\u0090u\u00FC\x10@\u00E3@k\x03\u00FF\x00\u00D4w\x05\x1F\u00FB\u00CD\u00FF\x00\u008C\u00B3\x17\u00FC\u00A9@N\x18\u00BF\u00B8+\u0086L\u00BCtS\u00B59\x04\u00B1\u00E2L\u00B8\u00E8A\u00BA\x06f\u00C7(\x0E\u00BA~!\u00BD\x18\u00C5\x01C\u00EF6\u0094\x06\u00D11\u008Eg\u00C3\u00D9\u00B6\b\u00B7F\x19\u00CA\u00F6\u00D6\\\u00B6N\x05\x12\\V\u00C4\u00EC\\\u00FB\x11\x03\u0086\u00A5\x10q\x14\u00BA\u00E9\u00F8\u00FB\u00BF\x15\x01%P\x11\u0096V\u00CDxk\x03\u00DB#zg\x1C\u00B7la\u009B8\u00AA\x15#]\u0097\\\u00F4U\u00BB\x18\n\u009B\u00C0\t\u00EA\u00A5\u00D7n\u0097P\u00EB\u00E0\x1DZ\u00D0\x1E\u00968\u00CF\u0098+1\"G\x18\u008B5ZYM\u00BA\u0085\u00EBM{r\u00E3\u0087\u009C!\u008B\u00A6\u00BA\u0081\u00A3\x1C.\x02\x1A{\u00E8\tj\u0080P\n\x01@(\b\x1Bk\u009FN8?\u00E5xo\u0082N\u0080\u009Eh\x05\x00\u00A0\x14\x02\u0080P\x1A9\u00E4\u0093\u00B8K\u008En3\u00E5\\X\x19\x1E\u00FEy\u009A3\u00A3U<\u00A9\x1C\x15\u008F\u00C8\u00C2jj(\u00DE\u00F1\u0097]\u00CB\u00B6\u00AC\u00A3\u00C4\u00BE\x1A\u00A2\u00B2\u00E0\u00B8\u0080\u0081\u008A\u0091\u008B\u00E3@V\u00CB4\u00F7\u00C1O-\u00EA\u00D8\u00ED\u00D7`\u008D#\u00FAz\u00BD\x05\u00CFz\u00DE\u00AB<\u00EA\u00FB<\u00C8\u00B8(\u00D6\u00DD:{\u00F4|:\u00FD\u00D4\x06\u0085\u00B7}\u00DC\u00D1\u00CB\u00B6\u00EE\u00C9#\x0E\u00A6\u00E1\x03n\x16,\u0088\x18\u00AAX\u00F8\u00AD\u00A2\u0096\u0099@\u00A6\x0E\u0091\x01\u0096\x15\u00DDL\u0088\t|\f_]\u00D0?\u00EE\u00D0\x1A\x18\u009C\u009D\u009C\u00B9\u00E6$n\x1B\u0096e\u00DD\u00C3?0\u00A9\u00D7\u0097\u009C|\u00E1go\x1D.\u00A0\u00EAe\x16Y\u00C1\u008Es\u009C\u00C3\u00ED1\u0084Dh\x0F\u00CA\u00A0\x14\x07\u00D3Z7\u00AD\u00E5\u008F\u00E7\x1A\\\u00F6\x1D\u00DB'd\u00DC\u00AC\x07V7\fC\u00F7Q\u00AF\u0090\x1D@uMvGMB\u00FB=\u00C6\u00A06\u0091\u008Cy\u00E3\u00E6\x17\x11[\x0F\u00ED\x0B;\u0090\\\u0084\u00EA\x12E\u00B1\u009A\x1F\u00F5\u00F9\x16\u00D7k\u00C4\x100t\u00E8\u00D9\u00E5\u00D6\u00DEI\u00CBc\x14<\ntT!\u008B\u00FDQ\n\x03\\\u00D9\u0087:\u00E6\u00BD\u00C2\u00DD\u00EE\u00B2\x06y\u00CB\u0097.g\u00BE^\u00EA\x0E.\u00EB\u00A6rJzDJcut\x02\u00F2k,p \x0F\u00B0\u00A0 \x01\u00EE\n\x02/Eu\u009B,\u0093\u0086\u00EB\x19\u00BB\u0084\f\x07Er\x18Hr\x18\u00A3\u00A8\tL]\x04\x04\x07\u00D8!@e\u00A64\u00E4\x03}\u00B8`\u00A8'\u00897\u00A1\u0095\u00B1\u00A3v\u00FA\x02L\u00A0\u00F2\r\u00D9\x18\u00DB\u00A4?\u00AAdY\u00BFM3\x17\u00FB\"Q\n\x03<q\u00F7qW4\u00F8\u00CCP\u00FD\u00BF\u00BF\u00AB\u00AAX\u008D\u00F4\u00D1;\u0086>\u00D8\u00BA\u00FA\u00C0=\u00C6\x1B\u009A-\u00F9\u0087_\u00B7]~\u00FA\x03c\x18\u009B\u00BC\u0083\u0096\x1B\x0F\u00D37\u00BF\u00ED\u00ECY\u009C\x1A\x17@x\u00E6f\u00D4\u0091\u008A~\u00A1C\u00DA$V\u00D7\u0095\u008D@\u0086\x1F\u00B4[\u0098>\u00EA\x02\u00EA\u00BC\x0B\u00F2M\u00949k\u00C2\x19\u00A3x\u00F9\n\u00D1\u008E\u00C4\u00EDa\u00AE&\x18\u00C2;\x10\u00C4\u00B8w\"\u00C5\x17\u00F6\u009C`]O'\b\u00F1\u00E0\u00A6p\x19\x12]\u00AD\u00DB\x0BaL|\u00A0d\x07\u00F3T\u00F3\u00BAR\x03|4\x04\r\u00B5\u00CF\u00A7\x1C\x1F\u00F2\u00BC7\u00C1'@O4\x02\u0080P\n\x02\u0097\u009C\u00DF\u00F7I\u00E4\u00AE>7c~\u00EC\u00CBj\x18B\u00D1\u00C8w\u008E2\u008E\u0088\x1B\u00FB+\u00DDoe_0g9.\u00C4\u00B2\u0086`\u0084\\2\u00B1\u00E2ql\u00D9\u00C2\x02u\f\u00F3\u00FB\u00C3\x18\u0082\u0098yc\u00D4\x05@\u00F71\u00DCY\u00CC&\u00E9\x10\u0095\u0089\u00BB7\u00895\u008D\u00AD\x19R\u00A8\u0092\u0096u\u0080\u00D9\u008D\u0090\u00D8\u0088,\x02S\u00A5\u00EA\u00E0RFAR\x18\x07A\x05\u009D\x1FP\u00F0\u00F6P\x1AK]u\u00DD.\u00B3\u0097+\x1D\u00C3\u0097\x072\u008E\x1C(a9\u00D49\u00C7\u00A8\u00C61\u008D\u00A8\u0088\u0088\u008E\u00A2#@x\u00A8\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x00\u00A0\x14\x07O\u00FE\u00CA\u00C4\u0095O\u008B\f\u00EEu\x122d_?]G@\u00C6(\u0080\x1C\u0081\u008Fl\u0084\u00FA\u008A#\u00ED\x0E\u00A2\u0088j\x1E\u00F0\x1A\x02\u00DF4\x04\r\u00B5\u00CF\u00A7\x1C\x1F\u00F2\u00BC7\u00C1'@O4\x02\u0080P\x10\u00DE\u00E2s\u0095\u0093\u00B6\\\x0B\u00997\x0F\u0091\u00DDzK\x13\t[3WE\u00D2p1J\u00A1\u00DAB\u00C7\u00AA\u00FC\u00E9%\u00D5\u00EDU_/\u00CBL\u00BE\u00D3\x1C\u00C0\x00\x02#\u00A5\x01\u00C3\x1F?f\u00AB\u00DBr\x19\u00C7/\u00EE\x03$=\u00F5\u00F7\u00EEi\u00B9f\u00AE\u008B\u00B5\u00C0\t\u0084\u009E\u00BEnAY\x05H\u0098\x1B\u00FA)\u0090\u00CA\u00F4&_aJ\x00\x01\u00E0\x14\x04G@(\x05\x00\u00A0\x14\x02\u0080P\n\x01@}M\u0093c^\u00D9.\u00EC\u0082\u00B0\u00B1\u00C5\u009F+\u0090/\u009B\u00A5\u00C1Z[\x16d${\u00B9Yi\x17G\x01\x12\u00A2\u00D5\u00A3\x04\u00D5Ye\x04\x00t)\n#\u00F7W\\8/\u0092\u00D1T\u00DB\u00D5\u00E9\u00AE\u0089K\x7F\u0082R\u00FC\u0091\u00CF.ZQM\u009AK\u00EB\u00F5\u00D1~\u0097\u00A1\u00E7\u00BF\u00F1\u00E5\u00FF\x00\u008A/\t\u00DCy\u0094\u00ACi\u008Ck\x7F\u00DA\u00EA\u0095\x0B\u009A\u00C6\u009F\u008C{\r1\x1C\u00B9\u0093*\u00C0\u009B\u00A6R)\u00A2\u00BA'\x12\x1C\u00A6\x02\u009C\u0080:\b\x0F\u00B0j.\x1C\u00F4\u00C9]\u00D4i\u00A9jS\u009DS\u0086\u00BF\x06\u009A~OC\u00BELv\u00A3\u008B(\x7F\u00EF\u00D5~\u0094y1\u00DE6\u00C8\u0099~\u00F4\u0080\u00C6\u00D8\u009A\u00C1\u009A\u00CA\x19\x16\u00ECT\u00CD\u00EDk\x06\u00DD\u008A}75$\u00B9\x12:\u00E6M\u00AB\x18\u00D4\u0096]c\u0081\x131\u0084\u00A4 \u008E\u0080#\u00EC\x01\u00A9\x18\u00F1Z\u00EE*\u00A5\u00EA\u00F4\u00F2J_\u00E8Z\u00BF\u00A1\u00C7&Z\u00D1M\u009C/\u00AF\u00D7E\u00FA^\u0084\u00A7\u009B\u00B6\u0089\u00BB\r\u00B33\u0083\u0090\u00DC\u0086\u00D8r\x1E\u00DFX\\\u00EB.\u00DA\u00DB}{\u00D9W%\u00A8\u008C\u0083\u0086\u00C9&\u00B2\u00C96<\u00F36\u00A5T\u00E9\u0091R\x18\u00E5 \u0088\u0080\x18\x04|\x04*+\u00E5bYV7e\u00BD\u00A6\u00D2\u009DZM&\u00E3\u00AC&\u00D2o\u00C1\u00B5\u00E6I\\|\u008F\x1B\u00BC=\u00A9\u00A4\u00DCh\u009B\u0098S\u00E6\u00E1\u00C7\u009C?&c\u00C5w8\u009D\u008E\u00BBr\u00F6\u00DB\u00FE\u00998t\u00D9\u00B5\u00B8\u00FA?\u00D0\u00DC\u00B9J\r|\u0087u(%\u00E8Quo\u0097\u00AA\u00CF\u00B22\u0085\u00F6\u0081\u0089\x1C\u00BBD\u00BC|\x7F\x07\u008D\x01\u00BB\u00EA\x02\x06\u00DA\u00E7\u00D3\u008E\x0F\u00F9^\x1B\u00E0\u0093\u00A0'\u009A\x01@(\ny\u00F7\u0091os\u00FE\u0089\u00ECO\x1C\u00EC\u00F2\u00D6\u0097\u00F4\u00D7\u00AE\u00F0'\u00CA\u00BD\u00DC\u00D9#\u00E8\u00A1,\u00AB1f\u00F2\u008E@\u00FD\x03\u00D4OS\"\u00A3\x12\x14G\u00C0\u00E4\"\u00C5\u00F1\rt\x03\u0098\u009D\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x00\u00A07\u009B\u00DB\u008D\x0517\u00CBn\u00DB\u008Ddf\u0098|)\u0097\"\u0089p/\u0087_\\6\\\u00AD\u00F1\x07=2\u00A4\x13\u00A6n\"^4\u0087\u0097\u0083Y\u00B9\x16\u008D]\u00E2\u00A4u\u00EAJ\x04:e\x01\x01\u00EA\n\u00D3|{-\u00A9L\u00BB-\u00EA\u00B5\x1Au\u008F\u00CDHv\u00BC[\u00F6]v\u00AB/>\u009A\u00A9\u00AD\u00A9{\u00ED\u0097\u00B4\u0093\u00D2m]z\u00C5\u00B7-\u00B2\u00BCS\u00BE\u00D4\u00D2i\u00C3nTI\u00EDw&\u00A7\u0097\u00DBs\x17\u00BAf\x19\u00CA\u00ED\u00B7\u00AFl\u0080\u00C1\x1B4\u008Egm{y\u00DD\u00B1\x10,T\u00B2\u00A2\u009C\u00B3D\u008C\u00A4$\u00A5\u00D7\u00F3\x11AR&\u00A2\u00AA:PT0\t\u0083\u00A0\u0082T\u00C9\u00E6_\x18\u00AD\x12\u00CC\u00D4\u00EEym\u00B9\u00BF\x1B(R\u0097\u00EC\u00A8J\x17\u00E2\u00DD\u009Bv~\u0081\u00F2\x1Fs\u00D9\u00E3ni\u00D7\u00DA\u00F4\u00AF%\u00EEd\u00D1\u00BF\x17\u00BA\\\u00E9\u00D6!A6v\u00B5e\x19\u00EC'\u00C95\u00E1\u0096\u00E2\u00F1C\u00CC\u00C1\x05\u008E\u00F1\r\u00F7-\u0090\u00AD\u00C8`3\u008B\u00A1\u00B5\u00BE\u00D1h\u00C5\x1D;\u0081\u008F**\x1AJ@\u0082\x04!Y\x10\u00E9\x1DT\u008E\u00A7\u0096c(\x05IM\u00C7\x1B\u0097L<L\u00FE\u00E4\u00FBv\u00A5kf\u00BFe[.5\u00B9\u00AF\x1A\u00D5\u00C3\u00BBZ\u00D6\u009B\u00AE\u0095\u009DU^\x07\u00B9aw\u00CF\u0081W[\u00EFn\u00AB\u00F9Mb\u00C8\u00F6\u00A7\u00E0\u00DA\u009D\u00BE\x0E\u00D1V\u00EA\u009B\u00B5v_\u00DC\u00DF\u008F\u00B0\u00EB\u00EE>\u00F8\u00FD\u00DC\x0E\u00D2\u00F7\x07=\x7Fm\x03(^\u00F7|\u009E-\u00C5\u00B7Z\u0093\u0092RQ\u00EE\u00AE8\u00C2;r\u00BCc\u00DB\u00BB\u00A6a\b\u00F4\x15\u008DT\u00A6b\u00EF\u00AF\u00CAU\x7F\u00CB1\x13\u00E9L\u00B8~g\x05\u00F1;\u00C7\x17\x05\u00E2\u00DB8\u00B7X\u00ED3e\u008Fv\x1B$\u00DF\\\u009B\u00AB|{mw\u00BE\u0095\u00A2\u00ABv\u009FN\u00DB\x07-\u00E5\u00ED\u00FC\u009B$\u00EBkr*\u00F2&\u009A\u00FE\u00B1,\u00B5zt\u00A3M_uj\u00B6\u00D9\u00EA\u0092i\u00BB\u00D4\x0Bk\u00F86ws{\u0092\u00C0{t\u00B6z\u00CB=\u009C\u00EF\x1Bn\u00D3\u008DpB\u00F5\n\x07\u009F\u0097B0W\x1Du\x00*@\u00B0\u00A8a\x1F\x00(\b\u008F\u0080V\u009C\u00A1;\u00B1\u00DAV\u00B4\x15\u008Dj\u00DB6U\u00AD\x1EH\u008Bf\u00CF\u008Fe\x17nE'\u00E0\u009BV\x11\u00ED\u0088\u00D1\u00BAE\u00FE\u00C9\x13L\u00A5\x0F\u00E1@}\x05\x01\x03ms\u00E9\u00C7\x07\u00FC\u00AF\r\u00F0I\u00D0\x13\u00CD\x00\u00A0\x14\x07\x1F\x0E\u00E4\u00CD\u00EE\x7F\u00AD\u00AEWs\u00DC\u0094\f\u00BF\u00EA\u0098\u00C3n\u00E7&0\u00C6\x02C\u00F5\u00A0f\u00F6\u00AB\u0085\u00D3\u0094p\u0098\u0094z\x0EW\x12\u00CB<P\u008A\x17\u00FAIy~\"\x00\x14\x06\u0085\u00A8\x05\x00\u00A0\x14\x02\u0080\u00DC\u00C7\x18<\x15\u00EF_\u0096k\x0F.\u00E4\u00BD\u00B5IY6\u00C5\u009D\u0087\u009F7\u008A\u0094\u0094\u00BC\u00A6\u00E4\u00A2\u00C6Vavb\u00FCX\u00C7\u0092&2P\u00C2\u00A2i\nf9\u0097\x04\u0093\u00FC\u00C2\u0080\x1CG\u00AB\u00A6_+\u0087|\\%\u00C9\u00D2\u00C9\u00DA\u00D5U_\u0099\u00BA\u00AA\u00B7\u00D6\x14z\u0092Se\u00AC\u00F9\x11\u00F1r\u00A9~G\u00B30\u00D2M\u00BF\x04\u009BiO\u008E\u00B0\u00FA'\u00D3^\u00AAuq\x12\u00F6\u00F6\u00DB\u00CEh\u008F~\u00FE\u00DFb\u00DB#a\x0B\u009D%\x1E\u00DA\u00D3q\u00F1\u00F3Q\u00C9\u00CD[r\u0080c\u00B5~\u00C9\u00E1\\5t\u0088.\u00DCH\u00AAJ\x01\u00D3P\u00BA\u0094u(\u00D4/\u008Fw\u00DCy)\u008F\u0097\u0086/K\u00D5Z\u00BB\u00AA\u00E1\u00D6\u00CAT\u00A7\rJ\x7FKU\u00EA\u00A2\u00C95/\u00BAv\u00EB\u00D2\u00D7\u00C1\u0093K)\u00AB\u0086\u00B4}\x1C5+\u00F1R\u008B\u00F8\u00F7r`\u00BC\x07bq\u009B\u00B3\u00CC\u008F\u008C\u00F0%\u0095\u008B.\u00FB\u00B3&@\u0096^v\u00DB\u00B5\u00E0\u00E1\x1E(\u00D9\u00FD\u0081:\u00FDV\u00C6^1\u00AA\x072&U2\x18H#\u00D2\"R\u008E\u009A\u0080i\x03\u00E4\u009Cj\u00F1\u00FEH\u00B1W\u00F2\u00D6\u00B9\u00D2\u00FC2aH\u00E5\u00F1\u00EEU\u00B9\x1D\u009A\u00B9o\u00F9\u00AD\u00ED7\u00F7t\u00B3g;\u00DA\u00B1>\u0085\x01\u00BF\u00FE\u00DB\u00ACI\u0095\u0095\u00E5\u00A7a\u00F9\u00A1<ep\u00A9\u0087Z\u00DEs\u00D0\u00CE\u00B2\u00C1ad\u0086\u00D9N`\u00F6$\u00CA\u00A5bi@G\u00D2\u0083\u0091)\u0080\u00C0\u0088\u00A9\u00D7\u00A0\u0080\u00E9W\u009D\u0099\u00FB<\u008A\u00FB\u009E\u009Fw\x1Em\u0093\u00A6\u00E8\u00C5\u0092v\u00CF\u00E6\u008D\u00B6\u0098\u0098\u0087\u00E4\u00CA.\u00FC\u009EN?\u00A7]\u00990\u00BBF\u00BBg.4\u00A7\u00CA[IO\u009A\u00F3?K\u00BAc\u00C7\u009C\x1D\u00E0i\u00FF\x00\r\u008F\u00BF\u00CB\u0088*\u00F3\u00BF\u008B~\\\u00DF\u00DFd\u00FDg\u00A3\u00FC\u0093\u00FF\x00_\u008B\u00FD\u00CF\u00FD\u00DC\u00A6\u0097\u00B0\x16\u00E5\u00F7\x03\u00B5k\u00C6O!\u00ED\u00BB1\\\x18>\u00FD\u0098\u008B^\x15\u00FD\u00E9lI8\u0088\u00954[\u00A7-\u00DD\u00AC\u00DC\u00AE\u0099\u0098\u008A\u0090\u0087Q\u00AAbn\u0083\x00\u008FN\u009A\u00E9\u00A8\x0E\u00B2\u0099\u00ADT\u00D2p\u009CO\u00D6,\u00AC\u0093\u00F3SU)\u00E8\u00D6\u008D4\u00DA2\x190R\u00ED;)jc\u00E95umy8\u00B3I\u00ADT\u00CAi\u00EA}v\u00E7\u00B7\u00A7\u00BB\x1D\u00E8\u00CF\u00DBW>\u00EB7\x05tg\u0099\u009B5\u00AA\u00AC\u00ED\x15\u00EE)E\u00DF%\x16\u00DD\u00C1\u00CA\u00A2\u00C5h\u0081\u0084\x12DV2d\x15LB\x01\u008F\u00D2^\u00A1\x1E\u0090\u00D2-8\u00F4\u00AEGt\u00BDV\u0089\x7Fn\u008B\u00EC\u00B5\u00D3\u00A4\u00B6\u00FA\u00B72=\u00CBlU\u009D\x17O\u00C7\u00AF\u00E3\u00F5\u00FA%\u00D1#x\u00DD\u00A5[{\u008C\u00CE|\u00C4\u00E3\u00FB\u00A6`\u00A9\u00B8c\u00B6{2\u00ED\u00C8@\u00C1]\x04\u00AB\u00B9H\u008D,\u00E6\u0082\x00>\u00D3\"\u00E6\u00E1Mr\u00FD\u0082\u0098\x0F\u00BA\u00BB\x1F\x07YJ\x01@@\u00DB\\\u00FAq\u00C1\u00FF\x00+\u00C3|\x12t\x04\u00F3@(\ror\u00E9\u00BD&\u00DC\x7Fq\u00D7\u00BA-\u00CE\u00A2\u00FC\u008C\u00AF+J\u00DD^;\x13\u0090\u00C2Q2\u00B7\u008D\u00C0r\u00C2Ct\u00A6>*\x15'n\u0088\u00BA\u00A5\x0F\u00F0\u00938\u00F8\x00\b\u0080\x1CK\u00DC\u00B9r\u00F5\u00CB\u0087\u008F\x1C\x1D\u00DB\u00C7g:\u00AE\u009D*s(\u00A2\u00AA(a9\u008Es\x1CDLc\b\u00EA\">\"4\x07\u0082\u0080P\n\x01@(\x0B\u00FE\u00F6\u00A9\u00EDv_3\u00EC\u00D36]\x1B`\u00E472mW ~\u00E3\u00FD'rx\u00F2.\u00DB\u00C62\u00F6\u00AB\u0087\u00FEB\u00CB\u00C5?\u0084\x1B\u00BE\x1EyT\u008Ex\u00F5H\u009A\u00EB\u0093\u00C8XU \u0094@S\"&\x1B\u00BE\u00F5\u008E\u00FF\x00\u00E14I\u00B7\u0081\u00BB\u00F5J\u00B6Y6c\u00DF\x0E\u00AFv\u00D8tK\u00D4\u00A6\x1B\u008A\u00B6U\u00F0\u00B94\u00FE>\u00F5\u0085\u00EEUQ\u00CCu\u00ABv\u00DA\u009C\u00E8\u00DA\u00B5o\u00A3M$\u00FF\x00\u009C\u00CA!\u00E5\u00A8\u0087v\u00FEU\u00C9\u00B02\x13nng\u00F0\u0097\f\u00D37\u00B7#\u00C3\u0099G\u0092\x0B6\u0092Y\x13\u00B9\\\u00C71\u00CC**b\u0089\u00CE\"a\x11\x11\x1F\x11\u00AF?\u00F8g6\u009C\u009E\u00CF\u00C6\u00CDJ,u\u00BE,vT\u00AF\u00E5\u00AAuMUt\u00D2\u00BD\x16\u008BDl\u00FEW\u00C5\u00F6;\u00A6|{\u00ADm\u00B9.\u00A6\u00CEl\u00E2\u00CDM\u009F\u008B}[\u00F1gE\x0E\u00F0\x7F\u00FEI\u00EC[\u00FE\u00E5Z\u009F\u00E5\u00A4\u00FD^|\u00C7\u00FC\u00D6\u00FE\u00DC\u008F\u00FA\u0098\u008C\u00AF\u00C4?\u00CB\u00F8\u00FF\x00\u00A3\u0087\u00F7,PWd\x19?\x04\u00E1]\u00DD\u00ED\u00D7-ns\x16\u009B5\u00E0\x1Cyu\u00C4\u00CA\u00E5lXV\u00ED\x1E\f\u00CCCG\x00\u00A2\u00A8\u00FAY\x05\x12n\u00E8\x00@\x0E-\u00979RX\x0B\u00E5\u00A8 C\x1A\u00B5\x7F\x14\u00E7\u00E1\u00E3s\u0096L\u008E\x16\u00DB\u00A4\u00E2v\u00DA\u00D4\u00B5ix\u00EB\u00E8\u00B3V\u0094\u009D\u0094MS\u00B2H\u00E7\u00DC\u00F0\u00E6\u00C9\u0087n'\u00B6\u00D3_\u00C5+'e:\u00C6\u00EA\u00CA\u0095\u00AA\u0099Z\u00A3h\u009D\u00C1\u009B\u00DF\u00E3\u00F7}\u009B\u00AF\u00C7\u00D9\x1F\u008F\u00EC8\x18\u00DE\u00D1\u00B6\u00AD4\"\u00F2M\u00E0[i\u008D\u00A2[\u00A6`\x1E(\u00BA*\u00FE\u009E\u00C4@M\u00E9\x1B\u0098\u0088z\u0085\u008AU\x0F\u00A7F\u0082\u009AI\u0098p<\x1E\x1F\"\u00BC\u00EC\u00D9l\u00FF\x00\u00AA\u00B2\u00AA\u00ADz\u00FA\u0096\u00ED\u00D7\u00FAn\u009A\u00A8\u00FEl\u00BD[5\\\u00BE^\x1Bv\u00FC8\u00D6\u00B9*\u00EE\u00DE\u009D*\u00F6\u00ED\u00AC\u00F5p\u00D5\u00AD\x1F\u0095n\u00D1\u00CB\u00B2R\u00BF\x17\u00DD\u00C89\u00BF\u008D\u00CD\u00AF\u00B3\u00DAz\u00DBm\u00B4\u00F3\u00F6;\u00B3n\x07\x17N&\u0092\x7F)1oI\u00C2\u00CC;rw\u00CA\u00FA\u00B5#|\u00D4\u00DF\u00B7+\u0083y\u00A9\u00A6b&b\u0088\u0098\x04\u00E6/@'\u00AD\u00E7s\u00FD\u00DC8v\u00D7n\\\n\u00EA\u00B6\u00EA\u00A2\u00EA\u00E9\u00CD|\u00E3%\u00EB2\u00945\tYny^?n\u00A5/\u0093V\u00EB\u0096\u00D5\u00B5\u0097\u00D6\u00BB\"\x1FU\u00AE:\u00BF\x1DW\u0093h\u00D2\u00E6\u00F37w\u00997\u00E1\u00B9\u008C\u00AD\u00BA\u00FC\u00FB \u00CD\u00F6Q\u00CB\u00AF\u0092w:\u008Ckc\u00B3\u008Bd\u0083Fh\u00C6\u00B3d\u00C9\x05\x14X\u00E9\u00B7j\u00D9\u00BAh\u00A6\x07P\u00E7\x10.\u00A79\u00CE&0\u00E7\u00FBwn\u00A7\x1B\x1B\u00AD[r\u00DD\u009B}[\u00B3m\u00B7\x11\u00E7\x0B\u00C9$\u0096\u0088\u00BE\u00EE=\u00C6\u00FC\u009BU\u00B4\u0092\u00ADURS\t%\u00E1-\u00C4\u00B9\u00B3\u00D67Y\u00B8Rc\x05O \n\x02\u00E3]\u00946\u00C5\u00C2\u00EF\u0092}\u00C9\u00DEm\u00A1\u00D7^\u00D4\u0080\u00C1\u00D3\x11sS\u00E5LE\u00ABi\t{\u00F6\u00D4v\u00C9\u00BA\u0087\u00F6\x02\u008B\u00A7\x1A\u00E4\u00E4\x0Fx$\x7F\u00B2\u0080\u00E9\u00BD@(\b\x1Bk\u009FN8?\u00E5xo\u0082N\u0080\u009Eh\x05\x01\u00AB\x0EXx\u00DF\u00C3\x1C\u00ADa\u009Cs\u00B4\u00BC\u00D7\u0094.\u00AC]\x04\u00CA\u00E7-\u00F3\x14\u00FE\u00D34i\x1D\u00BEsoE;\u0086\x16\u00EE\x06Q\u00AB\u00C4\u00C5\x10,\u00E0\u00A9\u00D3\u00D1\u00AFYJ=A\u00A6\u0083\u00DA\u0098-j\u00BB.\u0095\u00EB\u00FA\u008E93\u00D6\u0096\u00AD_[8_xo\u00F5&r\u00E7\u00E7G\u008D\u00FCY\u00C5\u008E\u00F9O\u00B5\u00CC=}\\\x19\x0E\u00CE\u00FD\u009Do\\e\u009F\u00B9F8\u00D2`\u00EA]W\u0089\u00AA\u0096\u00B1m\u009A\u00A4)\u0097\u00D3\x00\u0097\u00F2\u00C0|D\x04G\u00DBY\u00DE\u00D3\u00DC\u00B2g\u00CF\u00C8\u00A5\u0092\u008CY\x15Tx\u00A7\u008F\x1D\u00F5\u00FA\u00CD\u00DA\u00D3\u00C1\"\u00E7\u009F\u00C2\u00AE,X\u00AC\u00A6rQ\u00D9\u00FD\u00F7\u00DE\u00BA~\x15_\u0089\u00A6\u00EA\u00BC+\r\u00F7aN\u00DC\u008E@2\u00861\u00C5Y_(]8\u00A7f\u00909\u00ED\u00DB&x\x1A\x0F3_\u00EDl\u00E9\u00DB\u00C9\u00C4\u0093b;j\u0094dkv\u00D2\x0E\f\u00BA\u00C4>\u00A4l\u00A9\x13\\@5\x04\u00FAD\u00A26\x19\u00FBfL|\u0085\u00C7\u00EB\u009D\u00A6\u00FD\u00B5.\u00EBo\u00E6\u0095\x1F\u00B3+r\u00D5\u00D6b\u00D0\u00E5\x10\u00F1s\u00F1\u00DF\x0B\u00CC\u00BF\u00B1Q\u00EBzWY\u008D_\u009CJ},\u00B5\u00ABf%\u00F25\u00C4\x0E\u00FAx\u00B4\u009A\u00B6\u009B\u00EE\u00B3\x197\u008F\u00B2\u00EF\u0087\x0B\u00B4\u00B0\u00F2\u00EC\x04\u008A\x13v\u00BC\u00C3\u00A6\u00C8\x11\u00C2\u00A8&\u00E5 Mf\u00EB\u0081L\"T]\u00A2\u008A\u0087\x02\u009C\u00C4)\u0088Q0P\u00E2\u00E7\u00D2\u00D9}\u00A75\u00BCJO\u00C5-\x1BQ)\u00A4\u00DA\u0098\u00D5J\u0094\u00A5M\u00C6^\x1B\u00AE5t\u00D5\u00AB\u00D1\u00B5:=tr\u0096\u00AD)^\rL9M+\u009Ev\u00BEm\"\u00C8\u00BBx|\u00CF\u00D9{i\u00D3\u00B6\u0096?\u00E4G%K\u00DE6\u00D3]\u00C6\u00CD\u00C0F]O\u00AC\u0097\u008D\x10k\u00FAC36z\u009A\u00DESAH\u00C9\u00BA2BC\x14\u00E7P\x14Q5\u0080\u0085N\u00B5\x1F.\u00AF2\u009D\u009F\u008FN\x1B\u00AD\x1D\u00D6\u00FB7-]\u00D75\u0095\u0095\u009A\u0096\u009F\u00B4\u0095k\u00D7\u00DB\u00DD\u00EE*\u00B7g\u00BA\u0083\u00B0[\x05\u00BB\u0096[rSj\u008Fmc\u00AAO\x1Aj\u00C9=\x1F\u00AD\u00B9\u00E9\u00BBf\u00C9Q+U\x1D\u00C4\u00B7\u00DE\u00EE\u00ED\u00DD\u008B\u00EDgm\u00DC\u0083\u00ED\u00E1\u008D\u008D\u00BC\x0B[%\u00CDK\u00DC\u00DB\u0093\u00B2\u00E0b[\u00E3|\u00AB\f\u00DA\u00DA\u00FD-\u00BC\u00CA\x120\u00E5nBK\x1C\x14\"n\u0099*\u00D9\x05\n\t\x02\u00A0\u0092I\x1D2\x06\x0B\u00B8sx\u00BC\u009E\u00F5\u0081\u00E2\u00AF\u00B5j\u00E0\u00CD\u00BB\x1B\u00D2\x1D\u00B2\u00E3\u0087\u008F\u00D5}\u00D4u\u00AAv{\u009B\u00AD\u00AD\x16\u008D\u00D5\u009D_\x1F\x1El|\f\u00CB#W\u00AD\u00B2c\u00DBe\u00AF\u00A5S$\u00D6\u00DD\x1DZ\u00B5\u009E\u00D9IZ\u00AAj\u00EC\u00D5\u0099\u00B7\u00FE\u00C9\u00ABR\u00E8\u0088\u00D9\u00A6\u00EF.y[u\u00ECm\u00B9w\u00E4\x18\u00CF\u00DA\u0093\u00AB\u00B6Y&\u0092`\u00C2\x04\x1B9\x16\u00AA\u00A8P*\u00C0\u008A\u0083\u00D0q \u0088\x01\u00BF\b\u00F8\u0080\u0085z7v\x7F\u00FC\x1CU\u00FD\u00AFs3\u008F\x18t\u00C2\u0093\u00FB7[%\u00F5Mx\x18~$\u00FF\x00\u008Be~\x1E\u00DE%?]\u00D9[_t\u009A\x7Ff\u00BC\u00CA\x01\u00E5\u00F7\u0092\u00B8wy\u0099\x1Eb\u00F2\u00C6mf\u00E51\u00EEG\u0093\u0091\u009B\u00C4\u00D7\u008Ct\u00921\u00F2>\u0086\u00E2Q\u00E8\u00C7K\u00B2\"\u00AC\x1D\u00FAg\x05(&\u00BAeQ#\u0089\f \x06(\u0088\by\u008F\u00FAU\u00C9X;\x1F\r\u00BA\u00D6\u00EE\u0098q\u00D5\u00A7\u00AAV\u00AD\x15Zi>\u00B5\u00B2r\u009E\u0092\u00A2\u00C9\u00A9G\u00A2|\u00FF\x00\x17\u00B9\u00DD\u00B9JZV\u00C9\u0092\x1A~\x0E\u00CD\u00A6\u009F\u00D59Mh\u00F4h\u00DB\x0F!=\u00C6\x1B\u00B4\u00E4\u00BBl\u008BmWp\u009Bl\u00C1\u00F1V+G\u00D1rVm\u00CFm\u00DB7\u009B\x1B\u0082\u00D9\x7F\x12`\"K\u00C4\u00AF%u\u00C8 \u0081\u008E\u00DC\u00CA5P\f\u0081\u00C0QP\u00E5\u00D0\x04@CC\u00CF\u00E2\u00FF\x00\x13\u00C8\u00AE{\u00B7\u00EEU\u00B7>/w\u00E6NfU\u009C7\u00F5I\u00F5H\u00A0\u00ED\u00F9+\u00C6\u00C5\u00EDV\u00AB\u00DB\u0088\u008DaB\u008A\u00B5\rC\u00AF\u0087\u00E8r\u009BN\u00BF\u0095(\u00E4(\x05\x00\u00A0\x14\x02\u0080\u00EB\x7F\u00DA\u00FD\u00C7\u009F\u00FA\x19\u00E3F\u00C9\u00BD\u00EF\x18?\u00D2\u00F3\u008E\u00F0\u008C\u00D7 dQU>\u0087m!\u009D6\u00E9\u00B7#O\u00A8\x01\u0080\x10`\u00A7\u00A92f\x002k9X\u00A3\u00EC\u00A0,s@(\b\x1Bk\u009FN8?\u00E5xo\u0082N\u0080\u009Eh\x05\x01\u008D\u00D7\u00AC\u00CF\u0091\u00BA\u00AD\u00BF[\u00DDZ~\u00A9g\u00E4\u00A7\u00BD\x1Fo\u00A0\u0090\u00B4P\u00D7\u00F9z\u00CA\u00B7\u00E0\u00D3\u00FF\x00\x17+\u00FAW\u00F7\u0091S\u00DC\x7F\u00B6\u00C3\u00FD7\u00FB\u0097+A\u00C9\u00CE\x15\u00E0\u009F9s?\u008A0\x07 17\u00DEJ\u00DD\u009E\u00E7mkb\n\u00C2b\u00D2U\u00EC\x15\u0081j$\u0093\u0097\u00CD\u00E1[;u\x06\u00F65\u00E8\u00BF\u0099puSOQp\u0098\b$\x02Tz\u00BA\u008F\u009F\u00F8\u008Fl\u00C7\u00CC\u00E4\u00F2\u00F0\u00F1\u00D4\u00E5\u00AD\u009EK7:\u00BA\u00E0\u00C6\u00EDJ\u00C6\u009E\u008CTY[\u00B2S\u00B9\u00A5{8\u00A2\u00BF\u00EF\u00FC\u00CC\u0098\u00B8\u00FC{\u00E4Ob\u00AE\u00D4\u0092\u009FK\u00C9g\u00BE\u00DF\u00CD\u00DC\u00DDt\u00E8\u0093\u00B5\u0092Z\u0095}\u00EE)\u00E0n\u00DE\u00E2\u008A\u00EE\u00C6y\u00CBmSR\u00F7V\u00D5\u00B3d\u00AB\u0098\u009603*\x11\u00EC\u009D\u009Fs\u00A6\u0091\u00A4\x11\u008C;\u00B4\u0088\u0090\u00BAj\u00E9\x02*f\u00879|\u00D2\u0082'\"\u00A69\u00BAT<o\u008Cw.\u00E3\u0083\u00BD\u00D3\x06\u00D5\u0096\u00ED\u00D6\u00F8a=\u00D6u\u00B5S\u00A5\u00AA\u00BA\u00D9Y\u00D5\u00A7X\u00DE\u00AD\u00B5Q:;Z\u00CB?\x0B\x16n#\u00CF\u008Dmuj\u00B7\u00AE\u00AF\u00AC\u00C5\u0097\u00D1\u00C4Y>\u0096\u0088m[ml\u00B3\u00C8\u00C5\u00A1\u00969\x07\u00E2\u00FF\x00\x07_\u00DC\u00C3\u00DB\u00B6\u009F\x11\x18'\x0F\u00CF\u00DB\x17|\u00C4\u00BBi\u00A9\f\u009B\u0092\u00EE\t\"C=\u0084B-\u0094\x02Q1\u00A4\u0085Y\u00F8>\u00F3H\u0087\u00AC\u0091r@\x0E\u0085\u00D1LRP\u00D5\u00A7\u00EE\x19\u00F1v\u00FF\x00\u0094\u00F1\u00B9U\u00BC\u00E7Yv\u00E2\u00C7G\u00B9\u00DB%\u00AC\u00AC\u00AB\u00EE$\u0093Tt\u009B:\u00D5\u00D1\u00A5\u00BF}kY(>-nE\u00BBe\u00B0\u00E0\u00AAu\u00D9Y\u00BD\u00D4*\u00D6\u00AD=\u00CA\u008D\u00A6\u00ADo\u00C8\u009B\u00B2~\u00A7U[\u00EFH\u0096\u00BB\u00C0c\"\u009F\u00F0\u00EDo=P\u0083 x\\\u009Dc8\u0084|\u00A0\u0098\x14!\u00D4\u008B\u0096h*\u00E8\x02\x1F\u0088\u00C9,`\x1D~\u00DF\u00B6\u00BC\u00EF\u00E6yrc\u00EF<?\u00D9v\u00CD\u0092\u00AD//g-\u009A\u00FBn\u00AD_\u00E0h~\x15j\u00AE\u00D3\u00C8Us_\u00E1\u00E9\r\u00F5\u00FE\u00DB\f?\u00A3\u00FF\x00\u0089\u00A2~-0\u0084\u00FD\u008B\u00C5\u00D6\u00D3\u00F7\x1D\u00C6\u00C6\u00F6\u00B1\u00E6\u00CFy?\u00BF/\x1B\u00EC\u0099\x0F\x1D^\u0099\t\u0084c\x1C\u00CDj\u00C0M\u00AE\u00D8\u0091.\u00A0\u00AE\x17.\u00D9\u00AA\u00BCj\x00\u00DDF\u00C2\f\u00C9\u00D0E\u0095?\u0098\u0099\u0095\u00F3\x07{\u00DC\u00AD\u00CF\u00C7~=\u00B8\u00EB\u00DC\u00C1\u00EDY\u00E6\u00C7\u00F7\u00CBe\\\u00B1\x1A5\u00B7\u00DBmZ\u008D\u00D6\u00DF\u0099\u00BA\u00D6\u00AF)\u00DB\u00BD\u009C\u00EB\u0091\\\u00D3[\u00D7%V;\u00EB\u00A2\u00F6\u00EA\u00ED]:\u00AB;n\u0096\u00AD\u00EA\u00ADk\x10\u00DBYi\u00DD\x03\u00BF\u00DB\x0E\u00F0\u00E2\u00F3l{E\u00CE\x17\u00E6?\u00BEy\f\u00B9\u00E6\u00ED[\u00A75\u00D9\x18\u00E2M9\u00E8\x0BE\u00C4D3\u00D4\u00E4\x1C\u0082\u00E6;\u0083\u00B4+\u0085\x1E\u0091&\u00E8\u00A8\u00A7\u0098r\x18\u00E2Q:d\x13\x1B\x19\u00F2.>.Wy\u00C1\u00FC-\u009B\u00A7\x1D\u00BB]\u00F8K\u00C6\u00EA\u00F1\u00F5\u00977\u00B6\u00F4\u009C\u00B5ZU\u00DD+Z\u0093\u00A9\u00F8\u00F7#/\x1F\u00B6g\u00FE'K\u00E6\u00AE\u00DA%\u00E2\u0096Z\u00D9Y\u00F8%\u00B2\u0090\u00DA\u00EBv\u00D5e+m\u00A5F-\u00E4\x1F\x7F\x186\u00C7\u0086\u00C68O{\u00F9\x7F\x0Fc[t\\\r\u00BF\u008Fml\u0097y\u00DB\u00F0l\x05\u00DB\u0095\x1E\u00AE-\u00D8D\u00C8\u00B7n\u0097\u009A\u00B2\u00A7P\u00FD\x04\x0E\u00A3\u0098L:\u0088\u0088\u00D6\u00B3?'&V\u009D\u00EC\u00EC\u00D2IK\u0098IB_d\u00B4K\u00C1\x145\u00C7Z\u00B6\u00D2\u0089\u00EB\u00F5\u00F0\u00FDH\u00C7\\\u0089\u00922&^\u00BDn\f\u0093\u0096o\u00D9\u00AC\u00A1\u0091n\u00C5\u008A\u00E2\u00EA\u00BF\u00AE)G\u00D3sRn\n\u0091Q\x05]\u00BE\u0092Ue\u00D68\x10\u0085(\x18\u00E7\x11\u00D0\x00=\u0081P\u00B8\u00FClx\u00AB\u00B6\u0095UR\u00DC%\x1A\u00D9\u00B6\u00DE\u009E-\u00B6\u00DB\u00F1m\u00B7\u00A9\u00DF.k\u00DD\u00CD\u009Bn\x12\u00D7\u00C9(K\u00EC\u0092Iy-\x0F\u008B\u00AE\u00C71@(\x05\x00\u00A0\x14\x05\u0094;}\u00B8\"\u00C9\x1C\u009D\u00E5\u00F8\f\u00ED\u0097b\x17\u00B3\u00F63\u0089f[-z\u00DCnP1O}\u00BF\u008EpG\x07\u00B7\u00A2\u0081M:\u00D3?H\x11\u00F3\u0090\u00FC)\x10D\u0085\u00D5S\x00\x14\x0E\u00B4h \u0083T\x11l\u00D9\x127l\u00DC\u0085#v\u00E4(\x10\u0084!\x03\u00A4\u00A5)K\u00A0\x00\x00\x06\u0080\x01@yh\x05\x01\x03ms\u00E9\u00C7\x07\u00FC\u00AF\r\u00F0I\u00D0\x13\u00CD\x00\u00A00c&Ly\x1C\u008D\u00EC\u00EE\u00DF\u00EA\u00D0$\u00F1&}y\u00D1\u00F6\u00FA\x1B\u009F\x15!\u00AF\u00F2\u00F5u\u00A7\u00ED\u00BCy\u00ED|\u008B\u00F9[\x1A\u00FD.\u00CF\u00FD\u0085Oq_\u00D7a\u00FE\u009B\u00FD\u00CB\u0094o\u00E7\u0082\x0E\u00E4\u009D\u00EE\u0095\u00D8\\U\u00B2\u00CD\u00CA\u00F3\u00B2\x12\x1B\x7F4AQ\x03\u0091Cyw\u00E2\u00A72\u00840i\u00F8H\t\u0098L`\x1D\x03\u00A4u\x1F\x01\u00AC\u008F\u00FA[\u008F-\u00BB\u00F7!\u00D2}9\u00D5\u00AD\u00E1\u00E8\u00AF\x1F\r\u00B2}\u00D6\u00C5i^*V\u00BD\x0B\u009F\u009F\u00B9\u00EC\u00D4I\u00C3x.\u0097\u00DD\u00E4\u00CA\u00AA\u00BE\u00ED\u00B4\u0097\u00D5\u00A3s\u00FD\u00DF\u0099\u00CE\u00DA\u00C3[3\u00D9\u00AB\u00A7\x0E\u0090\u0090\u00BE#\u00B3\u00E5\u00ABwZ\u00D61\u009D\u00FAg\x12\u00AC\u00AC\u00D8YWoLQ \u008A\u0084I5\x1D\u00B7MEJQ\u00E82\u00A4\u00F7\u00985\u0087\u00C1\u00EE\u00AB\u0089\u00F2N\x1Ed\u00B7<.\u00D9\x1A\u0098\u00D2\u00AE\u009E0\u00E1\u00B6\u00E1i\u00E6\u00E1\u00C3-\u0097\x0B\u00DF\u00EC\\\u00ECvn\u00B5\u00CD\u008E\u00B8\u0093\u0089\u008B^\u00CA\u00CA\x7F\u00E5\u00A5\u009F]b\fQ\u00DF\x1Fq\u00C7\x02{\u00F2\u00DAe\u009D\t\u00B9\u009C'\u00923L\u00BD\u00AB5\x13xBm|#\u00DD\u00C2:F\u00EA\u008AE\u00C3TSy0\u00C2M\u00B3\x15\x19t\u00BAT\u008A\u0088,\u00A7RG\x13y\"\u00A0\x01\x02\u00C3\u009A\u009F\x17\u009B\u008F\u0093\u00C6\u008C\u0099p\u00B7lm\u00FARq\u00A6\u00F4\u00D5\u00BCbR\u00AD\u00D6\u00E5\u00FBU\u00EBW\u00DB\u00F97\u00C9\u00C5\u00C9\u0087+x\u00AB\u0096\u00BB/\x1A\u00DA7'\u00E8i\u00A6\u009C\u00A4\u00D3\u009AZ?\u0092\u00F4 \u00EE]\u00FB\u0088\u00F8\u0087\u00E4#\u008C\u00C9\u00AC\"\u00B6>\u00C8W\u0086f\u00BC\x197\u0090\u00B21\"-T\u00B7\u00DB\u00D9w\u00AA\x11.\u009B\u00B2{'/\u00E6\x15\u00BB\u00A6\u0091\u00CB8\x13\u0082m\u008A\u00B7\u00A8\x10!LB\x14\u00C61*\u00BEY\u00DA\u00DF#\u0091K\u00E0\u008B\u00DB\x1EEz\u00DE\u00D3XO\u00D3f\u00EA\u00A6l\u00F1\u00DA\u00EBn\u00B5\u0096\u00E2\u00EB\u00D3bO\u00C6y\u00CB\u008F\u0086\u00D4\u00CB]\u0094\u00BD6Z\u00B5\u0087)5d\u00ABg\u00D1n\u00A5b\u00D1)u\u00A3\u00D6\u00A7?\u00EA\u00B8 \u008A\x01@(\x05\x00\u00A0\x14\x02\u0080P\x16\t\u00ED\u00FE\u00E1Bo\u0096\u00DC\u00FF\x0075\u0091\u009E=\u00B3\u00F6\u0085\u0082\x16b\u00BEg\u00BA\x1A\x01\u0092y<\u00F5\u00C9\u0085V\u00D6\u00F4j\u00E2\x1D$]t\u00D31\u00DC,\x1A\u008A\b\u00E8:u\u00A8\u0096\u00A0u\u00AF\u00C5X\u00AB\x1C`\u00DCqe\u00E2\x1CCe\u00C7\u00E3\u00BCe\u008E\u00E3\u00DB\u00C5\u00D9VT[r6a\x1C\u00C1\u00B1:\x13I$\u00C9\u00FC\u00C4\u00C6\x11\x13\x18\u00C2&0\u0089\u0084D@\u0090(\x05\x00\u00A0 m\u00AE}8\u00E0\u00FF\x00\u0095\u00E1\u00BE\t:\x02y\u00A05\u00E1\u00C8\u00C7(\u009BC\u00E2\u00F7\x10\u00A9\u0094\u00F7=\u0090\x0B\x1F)*\u009A\u00E1\u008E1\x1Cg\u0092\u00F2\u00ED\u00BB\x1D\u00A2P\u00D5\x18\u00D6&P\u009F\u0080\u00A2 \n\u00B9T\u00C4A-C\u00AD@\x13\x14\f\x079\u00BB\u0083\u00BA_v\u00CF9\x0E\u00CA\u00BB\u00F8\u0087\u00C5\x10J-!\u008D&\u00B1\u0086\u00DDp\u00C4\u00A4\u008C\u0083\u00B8\x1B\x0E2Rf:l$U\x06\u00C0\u00DC\u00D2\x0FN\u00BCqN\u00E8\u00DF\u0092\x0BjR\u0080\u0090\u0089\u00A6P\u00B0\u00FF\x00\x13\u00CB^\u00DD\u0097\u008BOO\u00BBj=\u00DDZ\u00D9\u00BB\u00A2zKVp\u00DE\u0089\u00C3j\u00CAS\u00E3l\x14\u00B6Z^\u00DA\u00AA6\u00E3\u00CF\u00D2\u00D7\u00E8\u00D6_\u008BZ&\u00BA\u00AF\u00AA\u00C7}\u00D2\u00F7\u00FF\x00\u00EF<O\u00B8}\u00CCq\u00F5\u0089\u00F75\u00BE\x1C\x1D\x06\u00EE\u00DF\u00C6\u00BB\u00C4p\x0E\u00ED\u00A9\u00E4\u0098\u00BAH\u00E41\u00DD\u00B1\u008CAV\u00A7[U\u0096\x1E\u00A6\u00E0\u00DC\u00A4\x05U*$D\x14S\u00AA5\u00F2R\u0097\u00BEN=V+\u00E4Qh\u0096\u009F\u0086\u0093\u00AA\u0095\u00A3\u00F5KZN\u00DFJ\u00FA\u00AA\u00C9z,y\u00AD\u00BF\x1Dm\u00BA\u00AA!\u00AF\u00C7\u00A3\u0087\u00AA\u00D2\x14'\x0E\u00CBq\u00A4^C9(\u00DDw'\u00B9\u00B0\u00B9\u00C3u7\u00AA32\u0091-\u008C\u00C2\u00C4\u00B1\"[\u00A9\x1FlZ\u00F1\u00A7S\u00CE;X\u00B6'Us&\n\x1FC*\u00AA\u00AA(\u00B2\u0082\x05\u00F3\x140\x14\u00A0Z\u008E\x17m\u00A6\x1BZ\u00F2\u00ED{u\u00B3\u0089iN\u00DA\u00E8\u0092U\u00AC\u00B8I.\u00AD\u00B9\u00B5\u00AC\u00DC\u00FEO6\u00D9*\u00AB\u00A2\u00ADz%\u00D2\\K\u00D6uq\u00AB~Ih\u0092K\x02\u00AA\u00C0\u0088(\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\t\u0093o8\x0F(\u00EE\u00978b\u00ED\u00BB\u00E1[mK\u00B3)\u00E6\t\u0096pvd\x195)N\u00E9\u00E2\u009D\"\u00AA\u00C7\x00\x10I\x04H\x06UuM\u00F8SL\u00A69\u00B4)Dh\x0E\u00D4\u00BCkl'\x17q\u00AD\u00B3\u00BCM\u00B5\f\\D\u00DF'f\u00B5\u00F5y\x06\u00F4\x04A\x17\x175\u00D6\u00FC\u00A4VRUp\u00F16\u00AB*\x1D)\x10\u00C60\u00A6\u0089\x13H\x04@\u0081@g}\x00\u00A0\x14\x02\u0080\u0081\u00B6\u00B9\u00F4\u00E3\u0083\u00FEW\u0086\u00F8$\u00E8\n\u00E2sa\u00DC\u00EB\u0082\u00F8\u00FC=\u00DB\u00B7-\u00A6\u00963q\x1B\u00C6d\x0B2\u009Ey\u00E6\u008B\u009B2\u00C1v\x00$0J,\u00D4\u00E5\x17\u00AF\u00D27\u0087\u00A0@\u00E1\u00D0`\x1F=D\u00CC_(\u00E0QM\u00BE\u00C7y\u00AA\u00E6\x12R\u00FD\u00DE\u00D2\u0098+!\u00EE\u0091y\u00C3\x02\u00B2y~O\u00D1F\u00B4~\u0088\x1C\u00C0F\u00D0I\u00CC.\u00C1'\r\u009B\u0088\u0089H\u00DA13&\u0088~\x10!C\u00C2\u0080\u00C0\u00BC\u00CB\u00B1\u00ED\u00E6m\u00DD\u00F0Gg}\u00A8\u00E4\\B\u00E1E\u008A\u0083e.+2\u00E1\u008AA\u00C2\u00AA\x1C\x13  \u00B3\u00C6\u0084In\u00B3\b\x01E3\x18\f>\u00CDh\bw%\u00E2<\u00AF\u0085\u00EE/\u00D9\u00F9\u008B\x18\u00DC8\u009A\u00ED\x14\x12r\x16\u00BD\u00CD\x0B%\x03#\u00E9\u0097/ZJ\u00FAiDPW\u00A0\u00E0:\u0094\u00DD:\b{(\b\u00F6\u0080P\n\x01@(\x05\x00\u00A0\x14\x02\u0080P\x13\u008E\u00DB\u00F6\u00D9\u009B\u00F7s\u0099\u00AC\u008D\u00BFm\u00DB\x1E?\u00C9\u00F9g!:\x06\u00B6\u00DD\u00AB\x1E@\x13\x0E\u0081\u00D4\u00AB\u0087\n\u00A8%M\u00BBd\b\x02\u00A2\u00CB\u00AAb\u00A6\u0099\x00Ls\x00\x00\u008D\x01\u00D5\u00F7\u0083\u00CE\x04\u00F0\u0087\x13x\u00FD\u00BD\u00FDwz\f\u00BB\u00BD[\u00D5\u0080%\u0091s'\u0090'g\x04\u0082\u00E5\x03+\rn\u0095\u00C9JtZ\x14\x7F\n\u00CE\x04\u00A5U\u00C8\u0087Q\u00C0\u0084\u00E8D\u0080X*\u0080P\n\x01@(\nr\u00EE\u00EB6s\x19\u00BDe x\u00C0\u00E3\x0B\x10H`\x1C]b\u00DAvc-\u00CA\u00F2\x078\u00E9h8\u00B5\x02\u00E3\u00B3\u00E3.!\u008D\u0082\u0093M3\u00A8\u0099Qm$\u0099\x1D\x0B\x02,\u00F4T\u00D4\u00A5*)\x14N\u00A8\x193\u00C6\u00CFj\u00BE\u00C0\u00B6^\x109\x13p\u00CC\x03{{\u0082f)\u00B9^z\u00EBd\u0099l\u00C8\u00D7\u009A\u00F5\u0088\u00B0\u00B7Nu\u00D1[\u00A4\u00DF\u00E2\u00BF;\u0081\x11\x009\n\u0090\u00F8\x00\x16yh\u00D1\u00AB\x06\u00AD\u0098\u00B1l\u009B&,\u0093\",\u00D9\u00A2B\u00A6\u0092)&P!\bB\x10\x00\nR\u0080\x00\x00\x00h\x01@{\x14\x04\x1F\u009E\u00F6\u00CF\u00B7\u009D\u00D3Yk\u00E3\u00AD\u00C8a;_8YKu\u0089-\u00EB\u009E\x15\u0084\u00C2\b(r\u00F4\u008A\u00AD\u00C5\u00EAg2\x0B\x06\u0081\u00D2\u00AABS\u0094@\x04\x04\x04(\n\fsw\u00DA\u00817\u008B[\u00DC\u00FB\u00A1\u00E2\u00DA\u00DD\x7Fx\u00E3\u00B6\u0084Q\u00ED\u00FD\u00B4@Y\u00D4\u009C\u00F42i\u0094N\u00A3\u009BegGUy\x06\u00E0\x00\"f*\x1C\u00CEJ?\u00DD\x19`0&\u0098\x14dr\u00D9\u00C37\x0B\u00B4v\u0081\u00DA\u00BBjs&\u00E9\u00AA\u00851\x14MB\x18Jb\u0098\u00A6\x00\x100\bh >\u00CA\x03\u00C3@(\x05\x00\u00A0\x14\x02\u0080P\x1E\u00CB&O$\u009E4\u008E\u008Eh\u00AB\u00F9\x07\u00EA\u00A6\u0083\x06\b&uV]eN\t\u00914\u00C8\u0098\t\u008Cc\x18@\x00\x005\x11\u00F0\n\x03\u00AF\u00DFo\u00BF\x10\u00B6\x7F\x17\u00FB=\u00B4\u00E5/\u008B1\u0091w\u0095\u009B\u00A3\u00D0\u0096\u00DC\x1D\u00E8\u00A2)\u00AB#\x18W\u009D.\u00DB[(.=B\u009Bx\u00F2t\x15r\u00A6n\u0095\\\u0081\u00D4\x111|\u00B0(\x1B\u00F4\u00A0\x14\x02\u0080P\n\x01@@\u00DB\\\u00FAq\u00C1\u00FF\x00+\u00C3|\x12t\x04\u00F3@(\x05\x00\u00A0\x14\x05\x18{\u00A8x$k\u0092\u00ED\u009B\u00A3\u0093]\u00A0X\u00A9\u00B7\u00C9\x16{e\x1En\u00DB\x18\u00C4\u00B5)?p\u00C47(\u009DK\u00A1\u00B2\r\u00CA\x1A\u00BEh@\x11\u0090\x00\x0F\u00CED<\u00EF\x03\u00A4qT\x0Et\u00B4\x02\u0080P\n\x01@(\f\u00DA\u00DAG\x1B\u00FB\u00E9\u00DFd\u00AAQ\u00BBP\u00DB\x05\u00D9\u0098\x19\u009Do!\u00CD\u00E0\u00CE<Y\u00DB-\x16\u00EA\u00E9\x12:\u009C\u00943X\u00D6\u00E6\u00FE\u00CA\u00AE\n>\x03\u00A0xP\x17y\u00E1K\u00B5\x13'\u00EDorX\u00A3x[\u00F9\u00BE-9\u00F9,J\u00B7\u00EBx\u00FBn\u00D0\x02\u00EAi4nTJ\x03\x1E\u00F6ZI\u00C2m\u0090\u00EA\u008FW\u00F3\u00D3E\u00B1\x15)\u0096*f\u00F3zJb\x18\x0B\u00D2\u00D0\n\x01@(\x05\x00\u00A0\x14\x04\r\u00B5\u00CF\u00A7\x1C\x1F\u00F2\u00BC7\u00C1'@O4\x02\u0080P\n\x01@\x7F\n&\u009A\u00C9\u00A8\u008A\u00C9\u0095T\u0095(\u0095T\u008C\x00b\u0098\u00A6\r\x04\x04\x07\u00C0@B\u0080\u00AD=\u00C7\u00DAi\u00C3\u00E5\u00D9\u0098\u00EF\u00FC\u00BB7`^B\u00D2\u00FF\x00\u0096s.\u00A6$eu\u009A\"\u00D1\u0088Q\u00E2\u009Er\u00AD\u00A3\x1B\u00C34j\u00E9\x06\u00BDbc\x11!t` \x0FI:H\x05)@\u00F0d>\u00D2>\x17\u00AFTN\u009D\u00B7\u0089o,Ds\x14\n\x0E-\u00EB\u00FE\u00E0rr\u008E\u009Au\x00]\u008AM\x17_\x7F\u0088i\u00F7P\x18\t\u0092{$6c+\u00E7\u008E\"\u00DE>N\u00B1\f}}8\\Q\u00F6\u00B5\u00D4D\u00C4}\u009A\u0084sX\x010\x07\u00F1\x01\u00FB\u00E8\fb?c\x19D\u00C6\x12r\u0086% \u0088\u00F4\x14p\u00A0\x18@5\u00F0\u00D4B\u00FD\r\x7F\u00D9@y\x1B\u00F627+\u0084\f\u00EF\u0094\x03\u00AC\u00D4\u00A7(\u00B9E<,T\u0094:``\u00EA)Nk\u00ED@(\u0088{\x04J:}\u0083\u00EC\u00A07\u00B1\u00B2^\u00D8\x1E(vs\u00FAM\u00C17\u0087U\u00DDfM\u008E\u00E89\u00AF\u009C\u009C\u00A3y\u00E6d\\?\x11\u0085\b\x14\u0092B$\u00A4\x03\x06\u00A4\u00F3\u009B*\u00A1t\x0F\u00CC\x11\u00D4D\x0B\x06CCC\u00DB\u00B1Q\u00F0V\u00FCKh(8\u0084H\u00DE*\x19\u009A\t5h\u00D5\x04\u008B\u00D2D\u00D2E\x02\u0094\u0084!@4\x02\u0094\x00\x02\u0080\u00FD*\x01@(\x05\x00\u00A0\x14\x02\u0080P\x106\u00D7>\u009Cp\x7F\u00CA\u00F0\u00DF\x04\u009D\x01<\u00D0\n\x01@(\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x00\u00A0\x14\x02\u0080P\n\x01@(\x05\x01\u00FF\u00D9";
      this.panel.add("image", undefined, logo);
      this.panel.statusbar = this.panel.add("edittext", [0, 0, 300, 200], "", {multiline: true, scrolling: true});
      this.panel.show();
    };
    this.closePanel = function () {
      if (this.panel)
        this.panel.hide();
    };
    this.writeMessage = function (msg) {
      var rd = app.scriptPreferences.enableRedraw;
      app.scriptPreferences.enableRedraw = true;
      this.panel.statusbar.text += msg;
      this.panel.layout.layout();
      app.scriptPreferences.enableRedraw = rd;
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
    startTime = Date.now();
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
        b.error("basil.js canvasMode seems to be messed up, please use one of the following modes: b.PAGE, b.MARGIN, b.BLEED, b.FACING_PAGES, b.FACING_MARGINS, b.FACING_BLEEDS");
        break;
    }

    if(singlePageMode){
      var w = pageBounds[3] - pageBounds[1] + widthOffset;
      var h = pageBounds[2] - pageBounds[0] + heightOffset;    

      pub.width = w;
      pub.height = h;
    }
  };

  var error = pub.error = function(msg) {
    println(ERROR_PREFIX + msg);
    throw new Error( msg );
  };

  var warning = pub.warning = function(msg) {
    println(WARNING_PREFIX + msg);
  };

  var clearConsole = function() {
    var bt = new BridgeTalk();
    bt.target = "estoolkit";
    bt.body = "app.clc()"; // works just with cs6
    bt.onError = function(errObj) {}
    bt.onResult = function(resObj) {}
    bt.send();
  };

  
  init();
  
})(this, app);