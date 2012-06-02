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
  var ERROR_PREFIX = "### Basil Error -> ",
    WARNING_PREFIX = "### Basil Warning -> ";

  // ----------------------------------------
  // public vars
  
  /**
   * @property width {Number}
   */
  pub.width = null;

  /**
   * @property height {Number}
   */
  pub.height = null;

  // ----------------------------------------
  // private vars
  var currDoc = null,
    currPage = null,
    currLayer = null,
    currUnits = null,
    currColorMode = null,
    currFillColor = null,
    currNoFillColor = null,
    currStrokeColor = null,
    currStrokeTint = null,
    currFillTint = null,
    currStrokeWeight = null;

  // ----------------------------------------
  // global functions

  if (!glob.forEach) {
    glob.forEach = function(collection, cb) {
      for (var i = 0, len = collection.length; i < len; i++) {
        cb(collection[i],i);
      }
    };
  }
  

  // ----------------------------------------
  // Environment
  
  /**
   * Sets or possibly creates the current document and returns it. 
   * If the param doc is not given the current document gets set to the active document 
   * in the application. If no document at all is open, a new document gets created.
   * 
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
   * Returns the current page and possibly sets it.
   * 
   * @method page
   * @param  {Page|Number} [page] The page or page index to set the current page to.
   * @return {Page} The current page instance.
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
   * Returns the current layer and possibly sets it.
   * 
   * @method layer
   * @param  {Layer|String} [layer] The layer or layer name to set the current layer to.
   * @return {Layer} The current page instance.
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
   * @param  {Constant} [units] supported: PT, PX, CM or MM
   * @return {Constant} current unit setting
   */
  pub.units = function (units) {
    if (!units) return currUnits;

    if (units === pub.CM || 
        units === pub.MM ||
        units === pub.PT || 
        units === pub.PX ) {
      var unitType = null;
      if      (units === pub.CM) unitType = MeasurementUnits.centimeters;
      else if (units === pub.MM) unitType = MeasurementUnits.millimeters;
      else if (units === pub.PT) unitType = MeasurementUnits.points;
      else if (units === pub.PX) unitType = MeasurementUnits.pixels;
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
    } else {
      error("Not supported unit");
    }
    return currUnits;
  }

  // ----------------------------------------
  // Shape
  
  /**
   * Draws an ellipse (oval) in the display window. An ellipse with an equal <b>width</b> and <b>height</b> is a circle.
   * The first two parameters set the location, the third sets the width, and the fourth sets the height.
   * @param  {Number} x Location x-value
   * @param  {Number} y Location y-value
   * @param  {Number} w Width
   * @param  {Number} h Height
   * @return {Oval} new oval (in Adobe Scripting the type is Oval, not ellipse)
   */
  pub.ellipse = function(x, y, w, h){
    var ellipseBounds = [0,0,0,0];
    ellipseBounds[0] = y;
    ellipseBounds[1] = x;
    ellipseBounds[2] = y+h;
    ellipseBounds[3] = x+w;
    var ovals = app.activeWindow.activeSpread.ovals;
    var newOval = ovals.add( currentLayer() );
    with(newOval) {
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint; 
      fillColor = currFillColor;
      fillTint = currFillTint; 
      strokeColor = currStrokeColor;  
      geometricBounds = ellipseBounds;
    } 
    return newOval;
  };

  /**
   * Draws a line (a direct path between two points) to the screen.
   * @param  {Number} [x1] Point A x-value
   * @param  {Number} [y1] Point A y-value
   * @param  {Number} [x2] Point B x-value
   * @param  {Number} [y2] Point B y-value
   * @return {Rectangle} new rectangle
   */
  pub.line = function(x1, y1, x2, y2) {
    var lines = currentPage().graphicLines;
    var lineBounds = [];
    lineBounds[0] = y1;
    lineBounds[1] = x1;
    lineBounds[2] = y2;
    lineBounds[3] = x2;
    
    var newLine = lines.add( currentLayer() );
    with(newLine) {
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint; 
      fillColor = currFillColor;
      fillTint = currFillTint; 
      strokeColor = currStrokeColor; 
      geometricBounds = lineBounds;
    }

    var scaleX = 1.0, scaleY = 1.0;
    if (x2 < x1) scaleX = -1.0;
    if (y2 < y1) scaleY = -1.0;
    var scaleMatrix = app.transformationMatrices.add({'horizontalScaleFactor': scaleX, 'verticalScaleFactor': scaleY});
    newLine.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.CENTER_ANCHOR,
                   scaleMatrix);
    return newLine;
  };

  /**
   * Draws a rectangle to the page.
   * @param  {Number} [x] Position X
   * @param  {Number} [y] Position Y
   * @param  {Number} [w] Width
   * @param  {Number} [h] Height
   * @return {Rectangle}   new Rectangle
   */
  pub.rect = function(x, y, w, h){
    var rectBounds = [];
    rectBounds[0] = y;
    rectBounds[1] = x;
    rectBounds[2] = (y+h);
    rectBounds[3] = (x+w);
    var newRect = currentPage().rectangles.add( currentLayer() );
    with(newRect) {
      geometricBounds = rectBounds;
      strokeWeight = currStrokeWeight;
      strokeTint = currStrokeTint;
      fillColor = currFillColor;
      fillTint = currFillTint;
      strokeColor = currStrokeColor;
    }
    return newRect;
  };


  pub.strokeWeight = function (weight) {
    if (typeof weight === 'string' || typeof weight === 'number') {
      currStrokeWeight = weight;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };
  


  // ----------------------------------------
  // Color
  
  pub.fill = function (fillColor) {
    if (fillColor instanceof Color || fillColor instanceof Swatch) {
      currFillColor = fillColor;
    } else {
      currFillColor = pub.color(arguments);
    }
  };

  pub.noFill = function () {
    currFillColor = currNoFillColor;
  };

  pub.stroke = function (strokeColor) {
    if (strokeColor instanceof Color || strokeColor instanceof Swatch) {
      currStrokeColor = strokeColor;
    } else {
      currStrokeColor = pub.color(arguments);
    }
  };

  pub.fillTint = function (tint) {
    if (typeof tint === 'string' || typeof tint === 'number') {
      currFillTint = tint;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };

  pub.strokeTint = function (tint) {
    if (typeof tint === 'string' || typeof tint === 'number') {
      currStrokeTint = tint;
    } else {
      error("Not supported type. Please make sure the strokeweight is a number or string");
    }
  };

  /**
   * Creates a new RGB or CMYK color and adds the new color to the document,
   * or gets a color by name from the document
   * @param  {Numbers|String} Get color: name. Create new color: R,G,B,name or C,M,Y,K,name or Grey,name. Name is always optional
   * @return {Color} new color
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
    newCol = currentDoc().colors.add();
    newCol.properties = props;
    return newCol;
  };

  // ----------------------------------------
  // Typography
  
  /**
   * Creates a text frame on the current layer on the current page in the current document. 
   * The text frame gets created in the position specified by the x and y parameters.
   * The default document font will be used unless a font is set with the textFont() function. 
   * Change the color of the text with the fill() function.
   * The text displays in relation to the textAlign() function, which gives the option to draw to the left, 
   * right, and center of the coordinates. 
   * The width and height parameters define a rectangular area.
   * 
   * @method text
   * @param  {String} txt The text content to set in the text frame.
   * @param  {Number} x   x-coordinate of text frame
   * @param  {Number} y   y-coordinate of text frame
   * @param  {Number} w   width of text frame
   * @param  {Number} h   height of text frame
   * @return {TextFrame}  The created text frame instance.
   */
  pub.text = function(txt, x, y, w, h) {
    var textFrame = currentPage().textFrames.add( currentLayer() );
    with (textFrame) {
      contents = txt;
      geometricBounds = [y, x, (y+h), (x+w)];
      /* TODO tbd, what has to be set, e.g. fillColor is balck by default
      strokeWeight = currStrokeWeight;
      strokeColor = currStrokeColor;
      strokeTint = currStrokeTint;
      fillColor = currFillColor;
      fillTint = currFillTint;
      //align
      */
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
      actsAsGetter = typeof property === 'string' && (typeof value === 'undefined' || value === null),
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
    } else if (item instanceof TextFrame) {
      forEach(item.paragraphs, function(para) {
        getOrSetProperties(para);
      });
    } else if (item instanceof Character ||
               item instanceof InsertionPoint ||
               item instanceof Line ||
               item instanceof Paragraph ||
               item instanceof TextColumn ||
               item instanceof TextStyleRange ||
               item instanceof Word) 
    {
      getOrSetProperties(item);
    }
    return result;
  };
  

  // ----------------------------------------
  // Math
  
  pub.PVector = function() {
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


  // ----------------------------------------
  // Output
  
  pub.println = function(msg) {
    $.writeln(msg);
  };

  pub.print = function(msg) {
    $.write(msg);
  };
  

  // ----------------------------------------
  // all private from here

  var init = function() {
    glob.b = pub;

    // -- init internal state vars --
    currStrokeWeight = 1;
    currStrokeTint = 100;
    currFillTint = 100;

    welcome();
    runUserScript();
  };

  var runUserScript = function() {
    app.doScript(function() {
      if (typeof glob.setup === 'function') {
        glob.setup();
      }
      if (typeof glob.draw === 'function') {
        glob.draw();
      }      
    }, ScriptLanguage.javascript, undefined, UndoModes.entireScript);
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
    pub.units(pub.PT);
    updatePublicPageSizeVars();
  };

  var resetCurrDoc = function() {
    // resets doc and doc specific vars
    currDoc = null;
    currPage = null;
    currLayer = null;
    currFillColor = "Black";
    currNoFillColor = "None";
    currStrokeColor = "Black";
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
    throw msg;
  };

  var warning = function(msg) {
    $.writeln(WARNING_PREFIX + msg);
  };
  
  init();
  
})(this, app);