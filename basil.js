/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S 
  An attempt to port the spirit of the Processing visualization language to Adobe Indesign.
  
  License        - MIT 
  Developers     - Benedikt Groß, http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
                 - Ted Davis http://teddavis.org
  Contributers   - Stefan Lansbek, inital code architecture, http://47nord.de
  Web Site       - http://basiljs.ch
  Github Repo.   - https://github.com/basiljs/basil.js
  Processing     - http://processing.org
  Processing.js  - http://processingjs.org

  basil.js  was conceived and is generously supported by
  The Visual Communication Institute / The Basel School of Design
  Department of the University of Applied Sciences Northwestern Switzerland (FHNW)
  
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
  
  pub.VERSION = "0.1";
  pub.PT = "pt";
  pub.PX = "px";
  pub.CM = "cm";
  pub.MM = "mm";
  pub.IN = "inch";
  pub.CORNER = "corner";
  pub.CORNERS = "corners";
  pub.CENTER = "center";
  pub.RADIUS = "radius";
  pub.TWO_PI = Math.PI*2;
  pub.PI = Math.PI;
  pub.HALF_PI = Math.PI/2;
  pub.QUARTER_PI = Math.PI/4;
  
  var ERROR_PREFIX = "\n\n### Basil Error -> ",
    WARNING_PREFIX = "### Basil Warning -> ";


  // ----------------------------------------
  // public vars
  
  /**
   * System variable which stores the width of the current page.
   * @property width {Number}
   */
  pub.width = null;

  /**
   * System variable which stores the height of the current page.
   * @property height {Number}
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
    start = null,
    currFont = null,
    currFontSize = null,
    currAlign = null,
    currYAlign = null,
    currLeading = null,
    currKerning = null,
    currTracking = null,
    currImageMode = null;

  
  // ----------------------------------------
  // global functions

  //https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun) {
      if (this == null) throw new TypeError();
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

  if (!glob.forEach) {
    glob.forEach = function(collection, cb) {
      for (var i = 0, len = collection.length; i < len; i++) {
        cb(collection[i],i);
      }
    };
  }
  
  
  // ----------------------------------------
  // Structure
  
  /**
   * Suspends the calling thread for a number of milliseconds.
   * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated. 
   *
   * @method delay
   * @param  {Number} milliseconds  The delay time in milliseconds
   */
  pub.delay = function (milliseconds) {
    $.sleep(milliseconds);
  };

  /**
   * Calls the given callback function with each story of the given document.
   * 
   * @method stories
   * @param  {Document} doc The document instance to iterate the stories in
   * @param  {Function} cb  The callback function to call with each story, passed arguments: story, loopCount
   */
  pub.stories = function(doc, cb) {
    forEach(doc.stories, cb);
  };

  /**
   * Calls the given callback function with each paragraph of the given document, story or text frame.
   * 
   * @method paragraphs
   * @param  {Document|Story|TextFrame} item The story or text frame instance to iterate the paragraphs in
   * @param  {Function} cb  The callback function to call with each paragraph, passed arguments: para, loopCount
   */
  pub.paragraphs = function(item, cb) {
    if (item instanceof Document) {
      forEachStoryProperty(item, 'paragraphs', cb);
    } else {
      forEach(item.paragraphs, cb);
    }
  };

  /**
   * Calls the given callback function with each line of the given document, story, text frame or paragraph.
   * 
   * @method lines
   * @param  {Document|Story|TextFrame|Paragraph} item The document, story, text frame or paragraph instance to 
   *                                                   iterate the lines in
   * @param  {Function} cb The callback function to call with each line, passed arguments: line, loopCount
   */
  pub.lines = function(item, cb) {
    if (item instanceof Document) {
      forEachStoryProperty(item, 'lines', cb);
    } else {
      forEach(item.lines, cb);
    }
  };

  /**
   * Calls the given callback function with each word of the given document, story, text frame, paragraph or line.
   * 
   * @method words
   * @param  {Document|Story|TextFrame|Paragraph|Line} item The document, story, text frame, paragraph or line instance 
   *                                                        to iterate the words in
   * @param  {Function} cb The callback function to call with each word, passed arguments: word, loopCount
   */
  pub.words = function(item, cb) {
    if (item instanceof Document) {
      forEachStoryProperty(item, 'words', cb);
    } else {
      forEach(item.words, cb);
    }
  };

  /**
   * Calls the given callback function with each character of the given document, story, text frame, paragraph, line or word.
   * 
   * @method characters
   * @param  {Document|Story|TextFrame|Paragraph|Line|Word} item The document, story, text frame, paragraph, line or word instance to 
   *                                                    iterate the characters in
   * @param  {Function} cb The callback function to call with each character, passed arguments: character, loopCount
   */
  pub.characters = function(item, cb) {
    if (item instanceof Document) {
      forEachStoryProperty(item, 'characters', cb);
    } else {
      forEach(item.characters, cb);
    }
  };

  var forEachStoryProperty = function(doc, property, cb) {
    var loopCount = 0;
    pub.stories(doc, function(story) {
      var properties = story[property];
      for (var i = 0, len = properties.length; i < len; i++) {
        cb(properties[i], loopCount++);
      };
    });
  };

  /**
   * Checks whether a var is a Array, returns true if this is the case
   *
   * @method isArray
   * @param  {Object|String|Number}  obj The object to check
   * @return {Boolean}     [description]
   */
  var isArray = pub.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Checks whether a var is a number, returns true if this is the case
   * 
   * @method isNumber
   * @param  {Object|String|Number}  num The number to ckeck
   * @return {Boolean}
   */
  var isNumber = pub.isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  /**
   * Checks whether a var is a indesign text object, returns true if this is the case
   *
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
   * @method close
   * @param  {SaveOptions} [saveOptions] The indesign SaveOptions constant
   * @param  {File} [file] The indesign file instance to save the document to
   */
  pub.close = function(saveOptions, file) {
    var doc = currentDoc();
    if (doc) {
      doc.close(saveOptions, file);
      resetCurrDoc();
    }
  }

  /**
   * Returns the current page and sets it if argument page is given.
   * 
   * @method page
   * @param  {Page|Number} [page] The page or page index to set the current page to
   * @return {Page} The current page instance
   */
  pub.page = function(page) {
    if (page instanceof Page) {
      currPage = page;
    } else if (typeof page === 'number') {
      var tempPage = currentDoc().pages[page];
      try {
        tempPage.id;
      } catch (e) {
        error('Page ' + page + ' does not exist.');
      }
      currPage = tempPage;
    }
    updatePublicPageSizeVars();
    return currentPage();
  };

  /**
   * Returns the current layer and sets it if argument layer is given.
   * 
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
  }

  /**
   * Creates a vertical guide line at the current spread and current layer.
   *
   * @method guideX
   * @param  {Number} x Position of the new guide
   * @return {Guide} New guide
   */
  pub.guideX = function (x) {
    var guides = currentPage().guides;
    var guide = guides.add( currentLayer() );
    with(guide) {
      fitToPage = true;
      orientation = HorizontalOrVertical.VERTICAL;
      location = x;
    }
    return guide;
  };

  /**
   * Creates a horizontal guide line at the current spread and current layer.
   *
   * @method guideY
   * @param  {Number} y Position of the new guide
   * @return {Guide} New guide
   */
  pub.guideY = function (y) {
    var guides = currentPage().guides;
    var guide = guides.add( currentLayer() );
    with(guide) {
      fitToPage = true;
      orientation = HorizontalOrVertical.HORIZONTAL;
      location = y;
    }
    return guide;
  };


  // ----------------------------------------
  // Data

  // -- Conversion --
  pub.binary = function(num, numBits) {
    var bit;
    if (numBits > 0) bit = numBits;
    else if (num instanceof Char) {
      bit = 16;
      num |= 0
    } else {
      bit = 32;
      while (bit > 1 && !(num >>> bit - 1 & 1)) bit--
    }
    var result = "";
    while (bit > 0) result += num >>> --bit & 1 ? "1" : "0";
    return result
  };
  pub.unbinary = function(binaryString) {
    var i = binaryString.length - 1,
      mask = 1,
      result = 0;
    while (i >= 0) {
      var ch = binaryString[i--];
      if (ch !== "0" && ch !== "1") throw "the value passed into unbinary was not an 8 bit binary number";
      if (ch === "1") result += mask;
      mask <<= 1
    }
    return result
  };

  var decimalToHex = function(d, padding) {
    padding = padding === undef || padding === null ? padding = 8 : padding;
    if (d < 0) d = 4294967295 + d + 1;
    var hex = Number(d).toString(16).toUpperCase();
    while (hex.length < padding) hex = "0" + hex;
    if (hex.length >= padding) hex = hex.substring(hex.length - padding, hex.length);
    return hex
  };
  pub.hex = function(value, len) {
    if (arguments.length === 1) if (value instanceof Char) len = 4;
    else len = 8;
    return decimalToHex(value, len)
  };

  function unhexScalar(hex) {
    var value = parseInt("0x" + hex, 16);
    if (value > 2147483647) value -= 4294967296;
    return value
  }
  pub.unhex = function(hex) {
    if (hex instanceof Array) {
      var arr = [];
      for (var i = 0; i < hex.length; i++) arr.push(unhexScalar(hex[i]));
      return arr
    }
    return unhexScalar(hex)
  };


  // -- String Functions --
  pub.join = function(array, seperator) {
    return array.join(seperator)
  };

  pub.split = function(str, delim) {
    return str.split(delim)
  };

  pub.match = function(str, regexp) {
    return str.match(regexp)
  };

  pub.matchAll = function(aString, aRegExp) {
    var results = [],
      latest;
    var regexp = new RegExp(aRegExp, "g");
    while ((latest = regexp.exec(aString)) !== null) {
      results.push(latest);
      if (latest[0].length === 0)++regexp.lastIndex
    }
    return results.length > 0 ? results : null
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
        absValue *= 10
      }
    } else if (rightDigitsOfDefault !== 0) absValue *= Math.pow(10, rightDigitsOfDefault);
    var number, doubled = absValue * 2;
    if (Math.floor(absValue) === absValue) number = absValue;
    else if (Math.floor(doubled) === doubled) {
      var floored = Math.floor(absValue);
      number = floored + floored % 2
    } else number = Math.round(absValue);
    var buffer = "";
    var totalDigits = leftDigits + rightDigitsOfDefault;
    while (totalDigits > 0 || number > 0) {
      totalDigits--;
      buffer = "" + number % 10 + buffer;
      number = Math.floor(number / 10)
    }
    if (group !== undef) {
      var i = buffer.length - 3 - rightDigitsOfDefault;
      while (i > 0) {
        buffer = buffer.substring(0, i) + group + buffer.substring(i);
        i -= 3
      }
    }
    if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
    return sign + buffer
  }
  function nfCore(value, plus, minus, leftDigits, rightDigits, group) {
    if (value instanceof Array) {
      var arr = [];
      for (var i = 0, len = value.length; i < len; i++) arr.push(nfCoreScalar(value[i], plus, minus, leftDigits, rightDigits, group));
      return arr
    }
    return nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group)
  }
  pub.nf = function(value, leftDigits, rightDigits) {
    return nfCore(value, "", "-", leftDigits, rightDigits)
  };
  pub.nfs = function(value, leftDigits, rightDigits) {
    return nfCore(value, " ", "-", leftDigits, rightDigits)
  };
  pub.nfp = function(value, leftDigits, rightDigits) {
    return nfCore(value, "+", "-", leftDigits, rightDigits)
  };
  pub.nfc = function(value, leftDigits, rightDigits) {
    return nfCore(value, "", "-", leftDigits, rightDigits, ",")
  };

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
        str = str.substring(pos)
      }
      pos = str.search(tokens)
    }
    if (str.length > 0) ary[index] = str;
    if (ary.length === 0) ary = undef;
    return ary
  };

  pub.trim = function(str) {
    if (str instanceof Array) {
      var arr = [];
      for (var i = 0; i < str.length; i++) arr.push(str[i].replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, ""));
      return arr
    }
    return str.replace(/^\s*/, "").replace(/\s*$/, "").replace(/\r*$/, "")
  };

  // ----------------------------------------
  // Shape
  
  /**
   * Draws an ellipse (oval) in the display window. An ellipse with an equal <b>width</b> and <b>height</b> is a circle.
   * The first two parameters set the location, the third sets the width, and the fourth sets the height.
   *
   * @method ellipse
   * @param  {Number} x Location X
   * @param  {Number} y Location Y
   * @param  {Number} w Width
   * @param  {Number} h Height
   * @return {Oval} New oval (n.b. in Adobe Scripting the corresponding type is Oval, not Ellipse)
   */
  pub.ellipse = function(x, y, w, h){
    if (arguments.length !== 4) error("Not enough parameters to draw a ellipse! Use: x, y, w, h");
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

    var ovals = currentPage().ovals;
    var newOval = ovals.add( currentLayer() );
    with(newOval) {
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
    with(newLine) {
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
   * Draws a rectangle to the page.
   *
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
    
    var newRect = currentPage().rectangles.add( currentLayer() );
    with(newRect) {
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

  /**
   * The function calculates the geometric bounds of any given object. 
   * In case the object is any kind of text, then additional typographic information baseline and xHeight are calculated
   *
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
        warning("bounds(textObj), not possible to get correct bounds, possible linebreak within textObj");
      };

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

  // -- Attributes --

  pub.rectMode = function (mode) {
    if (arguments.length === 0) return currRectMode;
    if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER ) {
      currRectMode = mode;
      return currRectMode;
    } else {
      error("Unsupported rectMode. Use: CORNER, CORNERS, CENTER.");
    }
  };

  pub.ellipseMode = function (mode) {
    if (arguments.length === 0) return currEllipseMode;
    if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER || mode === pub.RADIUS ) {
      currEllipseMode = mode;
      return currEllipseMode;
    } else {
      error("Unsupported ellipseMode. Use: CENTER, RADIUS, CORNER, CORNERS.");
    }
  };

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

  pub.noFill = function () {
    currFillColor = noneSwatchColor;
  };

  /**
   * Sets the color used to draw lines and borders around shapes.  
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
        error("Wrong parameters. Use: "
          + "R,G,B,name or "
          + "C,M,Y,K,name. "
          + "Grey,name "
          + "Name is optional");
      }
    }
  };

  pub.noStroke = function () {
    currStrokeColor = noneSwatchColor;
  };

  /**
   * Sets the tint of the color used to fill shapes.
   * 
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
   * Creates a new RGB or CMYK color and adds the new color to the document, or gets a color by name from the document
   *
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
    if (arguments.length === 1) {
      if (typeof a === 'string') {
        try {
          newCol = currentDoc().swatches.item(a);
          newCol.name;
        } catch (e) {
          error("Color doesn't exist. "+e);
        }
        return newCol;
      } else if (typeof a === 'number') {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0,0,0,a];
        props.name = "C="+0+" M="+0+" Y="+0+" K="+a;
      } else {
        error("Color doesn't exist.");
      }

    } else if (arguments.length === 2) {
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [0,0,0,a];
      props.name = b;

    } else if (arguments.length === 3) {
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a,b,c];
      props.name = "R="+a+" G="+b+" B="+c;

    } else if (arguments.length === 4) {
      if (typeof d === 'string') {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a,b,c];
        props.name = d;
      } else {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [a,b,c,d];
        props.name = "C="+a+" M="+b+" Y="+c+" K="+d;
      }

    } else if (arguments.length === 5) {
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [a,b,c,d];
      props.name = e;

    } else {
      error("Wrong parameters. Use: "
        + "R,G,B,name or "
        + "C,M,Y,K,name. "
        + "Grey,name "
        + "Name is optional");
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
   * Calculates a color or colors between two color at a specific increment. 
   * The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
   * N.B.: Both color must be either CMYK or RGB.
   * 
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
   * @method text
   * @param  {String} txt The text content to set in the text frame.
   * @param  {Number} x   x-coordinate of text frame
   * @param  {Number} y   y-coordinate of text frame
   * @param  {Number} w   width of text frame
   * @param  {Number} h   height of text frame
   * @return {TextFrame}  The created text frame instance
   */
  pub.text = function(txt, x, y, w, h) {
    if (arguments.length !== 5) error("Not enough parameters to draw a text! Use: txt, x, y, w, h");
    var textFrame = currentPage().textFrames.add( currentLayer() );
    with (textFrame) {
      contents = txt;
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
   * @method typo
   * @param  {Document|Spread|Page|Layer|Story|TextFrame|Text} item  The object to apply the property to.
   * @param  {String|Object} property  The text property name of an object of key/value property/value pairs.
   *                                   If property is a string and no value is given, the function acts as getter.
   * @param  {String|Number} [value]   The value to apply to the property.
   * @return {String[]|Number[]}  The property value(s) if the function acts as getter or the items the property 
   *                              was assigned to.
   */
  pub.typo = function(item, property, value) {
    var result = [],
      actsAsGetter = typeof property === 'string' && (typeof value === undef || value === null),
      getOrSetProperties = function(textItem) {
        if (actsAsGetter) {
          result.push(textItem[prop]);
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

    if (item instanceof Document ||
        item instanceof Spread ||
        item instanceof Page ||
        item instanceof Layer) {
      forEach(item.textFrames, function(textFrame) {
        pub.typo(textFrame, property, value);
      });
    } else if (item instanceof Story || 
               item instanceof TextFrame) {
      forEach(item.paragraphs, function(para) {
        getOrSetProperties(para);
      });
    } else if (isText(item)) {
      getOrSetProperties(item);
    }
    return result;
  };

  /**
   * Returns the current font and sets it if argument fontName is given.
   * 
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
   * @method textAlign
   * @param  {String} align    The horizontal text alignment to set. Must be one of the InDesign Justification enum values:
   *                           Justification.AWAY_FROM_BINDING_SIDE
   *                           Justification.CENTER_ALIGN
   *                           Justification.CENTER_JUSTIFIED
   *                           Justification.FULLY_JUSTIFIED
   *                           Justification.LEFT_ALIGN
   *                           Justification.RIGHT_ALIGN
   *                           Justification.RIGHT_JUSTIFIED
   *                           Justification.TO_BINDING_SIDE
   * @param  {String} [yAlign] The vertical text alignment to set. Must be one of the InDesign VerticalJustification enum values:
   *                           VerticalJustification.BOTTOM_ALIGN
   *                           VerticalJustification.CENTER_ALIGN
   *                           VerticalJustification.JUSTIFY_ALIGN
   *                           VerticalJustification.TOP_ALIGN
   */
  pub.textAlign = function(align, yAlign) {
    currAlign = align;
    if (arguments.length === 2) currYAlign = yAlign;
  };

  /**
   * Returns the spacing between lines of text in units of points and sets it if argument leading is given.
   * 
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
      fitOptions = null;
    if (x instanceof Rectangle ||
        x instanceof Oval ||
        x instanceof Polygon) {
      frame = x;
    } else {
      var width = 1,
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
      var width = bounds[3] - bounds[1];
      var height = bounds[2] - bounds[0];
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
        error("The current document must be saved before its data directory can be accessed.");
      }
      return docPath;
  }
  

  // ----------------------------------------
  // Math
  
  var PVector = pub.PVector = function() {
    function PVector(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0
    }
    PVector.dist = function(v1, v2) {
      return v1.dist(v2)
    };
    PVector.dot = function(v1, v2) {
      return v1.dot(v2)
    };
    PVector.cross = function(v1, v2) {
      return v1.cross(v2)
    };
    PVector.angleBetween = function(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()))
    };
    PVector.prototype = {
      set: function(v, y, z) {
        if (arguments.length === 1) this.set(v.x || v[0] || 0, v.y || v[1] || 0, v.z || v[2] || 0);
        else {
          this.x = v;
          this.y = y;
          this.z = z
        }
      },
      get: function() {
        return new PVector(this.x, this.y, this.z)
      },
      mag: function() {
        var x = this.x,
          y = this.y,
          z = this.z;
        return Math.sqrt(x * x + y * y + z * z)
      },
      add: function(v, y, z) {
        if (arguments.length === 1) {
          this.x += v.x;
          this.y += v.y;
          this.z += v.z
        } else {
          this.x += v;
          this.y += y;
          this.z += z
        }
      },
      sub: function(v, y, z) {
        if (arguments.length === 1) {
          this.x -= v.x;
          this.y -= v.y;
          this.z -= v.z
        } else {
          this.x -= v;
          this.y -= y;
          this.z -= z
        }
      },
      mult: function(v) {
        if (typeof v === "number") {
          this.x *= v;
          this.y *= v;
          this.z *= v
        } else {
          this.x *= v.x;
          this.y *= v.y;
          this.z *= v.z
        }
      },
      div: function(v) {
        if (typeof v === "number") {
          this.x /= v;
          this.y /= v;
          this.z /= v
        } else {
          this.x /= v.x;
          this.y /= v.y;
          this.z /= v.z
        }
      },
      dist: function(v) {
        var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
      },
      dot: function(v, y, z) {
        if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
        return this.x * v + this.y * y + this.z * z
      },
      cross: function(v) {
        var x = this.x,
          y = this.y,
          z = this.z;
        return new PVector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y)
      },
      normalize: function() {
        var m = this.mag();
        if (m > 0) this.div(m)
      },
      limit: function(high) {
        if (this.mag() > high) {
          this.normalize();
          this.mult(high)
        }
      },
      heading2D: function() {
        return -Math.atan2(-this.y, this.x)
      },
      toString: function() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]"
      },
      array: function() {
        return [this.x, this.y, this.z]
      }
    };

    function createPVectorMethod(method) {
      return function(v1, v2) {
        var v = v1.get();
        v[method](v2);
        return v
      }
    }
    for (var method in PVector.prototype) if (PVector.prototype.hasOwnProperty(method) && !PVector.hasOwnProperty(method)) PVector[method] = createPVectorMethod(method);
    return PVector
  }();
  

  // -- Calculation --
  pub.abs = Math.abs;

  pub.ceil = Math.ceil;

  pub.constrain = function(aNumber, aMin, aMax) {
    return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber
  };

  pub.dist = function() {
    var dx, dy, dz;
    if (arguments.length === 4) {
      dx = arguments[0] - arguments[2];
      dy = arguments[1] - arguments[3];
      return Math.sqrt(dx * dx + dy * dy)
    }
  };

  pub.exp = Math.exp;

  pub.floor = Math.floor;

  pub.lerp = function(value1, value2, amt) {
    return (value2 - value1) * amt + value1
  };

  pub.log = Math.log;

  pub.mag = function(a, b, c) {
    if (c) return Math.sqrt(a * a + b * b + c * c);
    return Math.sqrt(a * a + b * b)
  };

  pub.map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
  };

  pub.max = function() {
    if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[1] : arguments[0];
    var numbers = arguments.length === 1 ? arguments[0] : arguments;
    if (! ("length" in numbers && numbers.length > 0)) error("Non-empty array is expected");
    var max = numbers[0],
      count = numbers.length;
    for (var i = 1; i < count; ++i) if (max < numbers[i]) max = numbers[i];
    return max
  };

  pub.min = function() {
    if (arguments.length === 2) return arguments[0] < arguments[1] ? arguments[0] : arguments[1];
    var numbers = arguments.length === 1 ? arguments[0] : arguments;
    if (! ("length" in numbers && numbers.length > 0)) error("Non-empty array is expected");
    var min = numbers[0],
      count = numbers.length;
    for (var i = 1; i < count; ++i) if (min > numbers[i]) min = numbers[i];
    return min
  };

  pub.norm = function(aNumber, low, high) {
    return (aNumber - low) / (high - low)
  };

  pub.pow = Math.pow;

  pub.round = Math.round;

  pub.sq = function(aNumber) {
    return aNumber * aNumber
  };

  // -- Trigonometry -- 
  pub.sqrt = Math.sqrt;
  pub.acos = Math.acos;
  pub.asin = Math.asin;
  pub.atan = Math.atan;
  pub.atan2 = Math.atan2;
  pub.cos = Math.cos;

  pub.degrees = function(aAngle) {
    return aAngle * 180 / Math.PI
  };

  pub.radians = function(aAngle) {
    return aAngle / 180 * Math.PI
  };

  pub.sin = Math.sin;
  pub.tan = Math.tan;

  // -- Random --
  var currentRandom = Math.random;
  pub.random = function() {
    if (arguments.length === 0) return currentRandom();
    if (arguments.length === 1) return currentRandom() * arguments[0];
    var aMin = arguments[0],
      aMax = arguments[1];
    return currentRandom() * (aMax - aMin) + aMin
  };

  function Marsaglia(i1, i2) {
    var z = i1 || 362436069,
      w = i2 || 521288629;
    var nextInt = function() {
      z = 36969 * (z & 65535) + (z >>> 16) & 4294967295;
      w = 18E3 * (w & 65535) + (w >>> 16) & 4294967295;
      return ((z & 65535) << 16 | w & 65535) & 4294967295
    };
    this.nextDouble = function() {
      var i = nextInt() / 4294967296;
      return i < 0 ? 1 + i : i
    };
    this.nextInt = nextInt
  }
  Marsaglia.createRandomized = function() {
    var now = new Date;
    return new Marsaglia(now / 6E4 & 4294967295, now & 4294967295)
  };

  pub.randomSeed = function(seed) {
    currentRandom = (new Marsaglia(seed)).nextDouble
  };

  pub.Random = function(seed) {
    var haveNextNextGaussian = false,
      nextNextGaussian, random;
    this.nextGaussian = function() {
      if (haveNextNextGaussian) {
        haveNextNextGaussian = false;
        return nextNextGaussian
      }
      var v1, v2, s;
      do {
        v1 = 2 * random() - 1;
        v2 = 2 * random() - 1;
        s = v1 * v1 + v2 * v2
      } while (s >= 1 || s === 0);
      var multiplier = Math.sqrt(-2 * Math.log(s) / s);
      nextNextGaussian = v2 * multiplier;
      haveNextNextGaussian = true;
      return v1 * multiplier
    };
    random = seed === undef ? Math.random : (new Marsaglia(seed)).nextDouble
  };

  function PerlinNoise(seed) {
    var rnd = seed !== undef ? new Marsaglia(seed) : Marsaglia.createRandomized();
    var i, j;
    var perm = new Uint8Array(512);
    for (i = 0; i < 256; ++i) perm[i] = i;
    for (i = 0; i < 256; ++i) {
      var t = perm[j = rnd.nextInt() & 255];
      perm[j] = perm[i];
      perm[i] = t
    }
    for (i = 0; i < 256; ++i) perm[i + 256] = perm[i];

    function grad3d(i, x, y, z) {
      var h = i & 15;
      var u = h < 8 ? x : y,
      v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
    }
    function grad2d(i, x, y) {
      var v = (i & 1) === 0 ? x : y;
      return (i & 2) === 0 ? -v : v
    }
    function grad1d(i, x) {
      return (i & 1) === 0 ? -x : x
    }
    function lerp(t, a, b) {
      return a + t * (b - a)
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
      return lerp(fz, lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x - 1, y, z)), lerp(fx, grad3d(perm[p01], x, y - 1, z), grad3d(perm[p11], x - 1, y - 1, z))), lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z - 1), grad3d(perm[p10 + 1], x - 1, y, z - 1)), lerp(fx, grad3d(perm[p01 + 1], x, y - 1, z - 1), grad3d(perm[p11 + 1], x - 1, y - 1, z - 1))))
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
      return lerp(fy, lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x - 1, y)), lerp(fx, grad2d(perm[p0 + 1], x, y - 1), grad2d(perm[p1 + 1], x - 1, y - 1)))
    };
    this.noise1d = function(x) {
      var X = Math.floor(x) & 255;
      x -= Math.floor(x);
      var fx = (3 - 2 * x) * x * x;
      return lerp(fx, grad1d(perm[X], x), grad1d(perm[X + 1], x - 1))
    }
  }
  var noiseProfile = {
    generator: undef,
    octaves: 4,
    fallout: 0.5,
    seed: undef
  };
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
        break
      }
      k *= 2
    }
    return sum
  };
  pub.noiseDetail = function(octaves, fallout) {
    noiseProfile.octaves = octaves;
    if (fallout !== undef) noiseProfile.fallout = fallout
  };
  pub.noiseSeed = function(seed) {
    noiseProfile.seed = seed;
    noiseProfile.generator = undef
  };


  // ----------------------------------------
  // Input
  
  pub.year = function() {
    return (new Date).getFullYear()
  };
  pub.month = function() {
    return (new Date).getMonth() + 1
  };
  pub.day = function() {
    return (new Date).getDate()
  };
  pub.hour = function() {
    return (new Date).getHours()
  };
  pub.minute = function() {
    return (new Date).getMinutes()
  };
  pub.second = function() {
    return (new Date).getSeconds()
  };
  pub.millis = function() {
    return Date.now() - start
  };

  /**
   * Returns items tagged with the given label in the InDesign Script Label pane (Window -> Utilities -> Script Label).
   * 
   * @method findByLabel
   * @param  {String} label The label identifier
   * @return {PageItem[]} Array of concrete PageItem instances, e.g. TextFrame or SplineItem. 
   */
  pub.findByLabel = function(label) {
    var result = [];
    var doc = currentDoc();
    for (var i = 0, len = doc.pageItems.length; i < len; i++) {
      var pageItem = doc.pageItems[i];
      if (pageItem.label === label) {
        // push pageItem's 1st element to get the concrete PageItem instance, e.g. a TextFrame 
        result.push(pageItem.getElements()[0]);
      }
    }
    return result;
  };

  /**
   * Returns the currently selected object(s). 
   * 
   * @method selection
   * @return {Object[]} Array of selected object(s).
   */
  pub.selection = function() {
    return app.selection;
  };

  /**
   * Reads the contents of a file and creates a String array of its individual lines. 
   * If the file is specified by name as String, it must be located in the document's data directory.
   * 
   * @method loadStrings
   * @param  {String|File} file The text file name in the document's data directory or a File instance
   * @return {String[]}  Array of the individual lines in the given file.
   */
  pub.loadStrings = function(file) {
    var inputFile = initDataFile(file, true),
      result = [];

    inputFile.open('r');
    while (!inputFile.eof) { 
      result.push(inputFile.readln());
    }
    inputFile.close();

    return result;
  };


  // ----------------------------------------
  // Output
  
  var println = pub.println = function(msg) {
    $.writeln(msg);
  };

  pub.print = function(msg) {
    $.write(msg);
  };

  /**
   * Writes an array of strings to a file, one line per string. This file is saved to the document's data directory.
   * If the given file exists it gets overridden.
   * 
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
   * @method savePDF 
   * @param {String|File } file The file name or a File instance
   * @param {Boolean} showOptions Whether to show the export dialog
   */
  pub.savePDF = function(myFile, showOptions){
    var outputFile = initExportFile(myFile); 
    
    if(showOptions == null){
      showOptions = false;
    }
    
    b.doc().exportFile(ExportFormat.PDF_TYPE, outputFile, showOptions); 
  }  
  

  // ----------------------------------------
  // Transform
  
  var printMatrixHelper = function(elements) {
    var big = 0;
    for (var i = 0; i < elements.length; i++) if (i !== 0) big = Math.max(big, Math.abs(elements[i]));
    else big = Math.abs(elements[i]);
    var digits = (big + "").indexOf(".");
    if (digits === 0) digits = 1;
    else if (digits === -1) digits = (big + "").length;
    return digits
  };

  var PMatrix2D = pub.PMatrix2D = function() {
    if (arguments.length === 0) this.reset();
    else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) this.set(arguments[0].array());
    else if (arguments.length === 6) this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
  };
  PMatrix2D.prototype = {
    set: function() {
      if (arguments.length === 6) {
        var a = arguments;
        this.set([a[0], a[1], a[2], a[3], a[4], a[5]])
      } else if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) this.elements = arguments[0].array();
      else if (arguments.length === 1 && arguments[0] instanceof Array) this.elements = arguments[0].slice()
    },
    get: function() {
      var outgoing = new PMatrix2D;
      outgoing.set(this.elements);
      return outgoing
    },
    reset: function() {
      this.set([1, 0, 0, 0, 1, 0])
    },
    array: function array() {
      return this.elements.slice()
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
      this.elements[5] = tx * this.elements[3] + ty * this.elements[4] + this.elements[5]
    },
    invTranslate: function(tx, ty) {
      this.translate(-tx, -ty)
    },
    transpose: function() {},
    mult: function(source, target) {
      var x, y;
      if (source instanceof PVector) {
        x = source.x;
        y = source.y;
        if (!target) target = new PVector
      } else if (source instanceof Array) {
        x = source[0];
        y = source[1];
        if (!target) target = []
      }
      if (target instanceof Array) {
        target[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2];
        target[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5]
      } else if (target instanceof PVector) {
        target.x = this.elements[0] * x + this.elements[1] * y + this.elements[2];
        target.y = this.elements[3] * x + this.elements[4] * y + this.elements[5];
        target.z = 0
      }
      return target
    },
    multX: function(x, y) {
      return x * this.elements[0] + y * this.elements[1] + this.elements[2]
    },
    multY: function(x, y) {
      return x * this.elements[3] + y * this.elements[4] + this.elements[5]
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
      return this.elements[0] * this.elements[4] - this.elements[1] * this.elements[3]
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
        return true
      }
      return false
    },
    scale: function(sx, sy) {
      if (sx && !sy) sy = sx;
      if (sx && sy) {
        this.elements[0] *= sx;
        this.elements[1] *= sy;
        this.elements[3] *= sx;
        this.elements[4] *= sy
      }
    },
    invScale: function(sx, sy) {
      if (sx && !sy) sy = sx;
      this.scale(1 / sx, 1 / sy)
    },
    apply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) source = arguments[0].array();
      else if (arguments.length === 6) source = Array.prototype.slice.call(arguments);
      else if (arguments.length === 1 && arguments[0] instanceof Array) source = arguments[0];
      var result = [0, 0, this.elements[2], 0, 0, this.elements[5]];
      var e = 0;
      for (var row = 0; row < 2; row++) for (var col = 0; col < 3; col++, e++) result[e] += this.elements[row * 3 + 0] * source[col + 0] + this.elements[row * 3 + 1] * source[col + 3];
      this.elements = result.slice()
    },
    preApply: function() {
      var source;
      if (arguments.length === 1 && arguments[0] instanceof PMatrix2D) source = arguments[0].array();
      else if (arguments.length === 6) source = Array.prototype.slice.call(arguments);
      else if (arguments.length === 1 && arguments[0] instanceof Array) source = arguments[0];
      var result = [0, 0, source[2], 0, 0, source[5]];
      result[2] = source[2] + this.elements[2] * source[0] + this.elements[5] * source[1];
      result[5] = source[5] + this.elements[2] * source[3] + this.elements[5] * source[4];
      result[0] = this.elements[0] * source[0] + this.elements[3] * source[1];
      result[3] = this.elements[0] * source[3] + this.elements[3] * source[4];
      result[1] = this.elements[1] * source[0] + this.elements[4] * source[1];
      result[4] = this.elements[1] * source[3] + this.elements[4] * source[4];
      this.elements = result.slice()
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
      this.elements[4] = -s * temp1 + c * temp2
    },
    rotateZ: function(angle) {
      this.rotate(angle)
    },
    invRotateZ: function(angle) {
      this.rotateZ(angle - Math.PI)
    },
    print: function() {
      var digits = printMatrixHelper(this.elements);
      var output = "" + pub.nfs(this.elements[0], digits, 4) + " " + pub.nfs(this.elements[1], digits, 4) + " " + pub.nfs(this.elements[2], digits, 4) + "\n" + pub.nfs(this.elements[3], digits, 4) + " " + pub.nfs(this.elements[4], digits, 4) + " " + pub.nfs(this.elements[5], digits, 4) + "\n\n";
      pub.println(output)
    }
  };

  pub.applyMatrix = function (matrix) {
    currMatrix.apply(matrix);
  };

  pub.popMatrix = function (argument) {
    if (matrixStack.length > 0) {
      currMatrix.set( matrixStack.pop() );
    } else {
      error("Missing a pushMatrix() to go with that popMatrix()");
    }
  };

  pub.printMatrix = function (argument) {
    currMatrix.print();
  };

  pub.pushMatrix = function (argument) {
    matrixStack.push( currMatrix.array() );
  };

  pub.resetMatrix = function (argument) {
    matrixStack = [];
    currMatrix = new PMatrix2D();
  };

  pub.rotate = function (angle) {
    currMatrix.rotate(angle);
  };

  pub.scale = function (scaleX,scaleY) {
    currMatrix.scale(scaleX,scaleY);
  };

  pub.translate = function (tx,ty) {
    currMatrix.translate(tx,ty);
  };


  // ----------------------------------------
  // execution
  
  /**
   * Run the sketch! Has to be called in every sketch a the very end of the code.
   *
   * @method go
   */ 
  pub.go = function() {
    currentDoc();
    runSetup();
    runDrawOnce();
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
    alert("Run the script lib/stop.jsx to end the draw loop and clean up!");
    println("loop()");
  };

  /**
   * EXPERIMENTAL!
   * 
   * Stops basil from continuously executing the code within draw().
   * 
   * @method noLoop
   */
  pub.noLoop = function() {
    var allIdleTasks = app.idleTasks;
    for (var i = app.idleTasks.length - 1; i >= 0; i--) {
      allIdleTasks[i].remove();
    };
    println("noLoop()");
  };


  // ----------------------------------------
  // all private from here

  var init = function() {
    glob.b = pub;

    welcome();

    // -- init internal state vars --
    currStrokeWeight = 1;
    currStrokeTint = 100;
    currFillTint = 100;
  };

  var runSetup = function() {
    app.doScript(function() {
      if (typeof glob.setup === 'function') {
        glob.setup();
      }    
    }, ScriptLanguage.javascript, undef, UndoModes.entireScript);
  };

  var runDrawOnce = function() {
    app.doScript(function() {
      if (typeof glob.draw === 'function') {
        glob.draw();
      }      
    }, ScriptLanguage.javascript, undef, UndoModes.entireScript);
  };

  var runDrawLoop = function() {
    app.doScript(function() {
      if (typeof glob.draw === 'function') {
        glob.draw();
      }      
    }, ScriptLanguage.javascript, undef, UndoModes.fastEntireScript);
  };

  var welcome = function() {
    $.writeln("basil.js "
        + pub.VERSION
        + " "
        + "infos, feedback @ http://basiljs.ch");
  };
  
  var currentDoc = function() {
    if (!currDoc) {
      var doc = null;
      try {
        doc = app.activeDocument;  
      } catch(e) {
        doc = app.documents.add();
      }
      setCurrDoc(doc);
    }
    return currDoc;
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
    start = Date.now();
    currFont = null;
    currImageMode = pub.CORNER;
    pub.resetMatrix();
  };

  var currentLayer = function() {
    if (!currLayer) {
      currentDoc();
      currLayer = app.activeDocument.activeLayer;
    }
    return currLayer;
  };
  
  var currentPage = function() {
    if (!currPage) {
      currentDoc();
      currPage = app.activeWindow.activePage;
    }
    return currPage;
  };

  var updatePublicPageSizeVars = function () {
    var pageBounds = currentPage().bounds; // [y1, x1, y2, x2]
    var w = pageBounds[3] - pageBounds[1];
    var h = pageBounds[2] - pageBounds[0];
    pub.width = w;
    pub.height = h;
  };

  var error = function(msg) {
    $.writeln(ERROR_PREFIX + msg);
    throw ERROR_PREFIX + msg;
  };

  var warning = function(msg) {
    $.writeln(WARNING_PREFIX + msg);
  };
  
  init();
  
})(this, app);