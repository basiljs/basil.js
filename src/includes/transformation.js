// ----------------------------------------
// src/includes/transformation.js
// ----------------------------------------
/* global precision */

/**
 * @description Sets the reference point for transformations using the <code>transform()</code> function. The reference point will be used for all following transformations, until it is changed again. By default, the reference point is set to the top left.
 * Arguments can be the basil constants <code>TOP_LEFT</code>, <code>TOP_CENTER</code>, <code>TOP_RIGHT</code>, <code>CENTER_LEFT</code>, <code>CENTER</code>, <code>CENTER_RIGHT</code>, <code>BOTTOM_LEFT</code>, <code>BOTTOM_CENTER</code> or <code>BOTTOM_RIGHT</code>. Alternatively the digits 1 through 9 (as they are arranged on a num pad) can be used to set the anchor point. Lastly the function can also use an InDesign anchor point enumerator to set the reference point.
 * If the function is used without any arguments the currently set reference point will be returned.
 *
 * @cat Document
 * @subcat Transformation
 * @method referencePoint
 * @param {String} [referencePoint] The reference point to set.
 * @returns {String} Current reference point setting.
 */
pub.referencePoint = function(refPoint) {
  if(!arguments.length) {
    return currRefPoint;
  }

  if(refPoint === pub.TOP_LEFT ||
     refPoint === pub.TOP_CENTER ||
     refPoint === pub.TOP_RIGHT ||
     refPoint === pub.CENTER_LEFT ||
     refPoint === pub.CENTER ||
     refPoint === pub.CENTER_RIGHT ||
     refPoint === pub.BOTTOM_LEFT ||
     refPoint === pub.BOTTOM_CENTER ||
     refPoint === pub.BOTTOM_RIGHT) {
    currRefPoint = refPoint;
  } else if(refPoint === 7 || refPoint === AnchorPoint.TOP_LEFT_ANCHOR) {
    currRefPoint = pub.TOP_LEFT;
  } else if(refPoint === 8 || refPoint === AnchorPoint.TOP_CENTER_ANCHOR) {
    currRefPoint = pub.TOP_CENTER;
  } else if(refPoint === 9 || refPoint === AnchorPoint.TOP_RIGHT_ANCHOR) {
    currRefPoint = pub.TOP_RIGHT;
  } else if(refPoint === 4 || refPoint === AnchorPoint.LEFT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_LEFT;
  } else if(refPoint === 5 || refPoint === AnchorPoint.CENTER_ANCHOR) {
    currRefPoint = pub.CENTER;
  } else if(refPoint === 6 || refPoint === AnchorPoint.RIGHT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_RIGHT;
  } else if(refPoint === 1 || refPoint === AnchorPoint.BOTTOM_LEFT_ANCHOR) {
    currRefPoint = pub.BOTTOM_LEFT;
  } else if(refPoint === 2 || refPoint === AnchorPoint.BOTTOM_CENTER_ANCHOR) {
    currRefPoint = pub.BOTTOM_CENTER;
  } else if(refPoint === 3 || refPoint === AnchorPoint.BOTTOM_RIGHT_ANCHOR) {
    currRefPoint = pub.BOTTOM_RIGHT;
  } else {
    error("referencePoint(), wrong argument! Use reference point constant (TOP_LEFT, TOP_CENTER, ...), a digit between 1 and 9 or an InDesign anchor point enumerator.");
  }

  return currRefPoint;
};

/**
 * @description TODO
 *
 * @cat Document
 * @subcat Transformation
 * @method transform
 * @param {PageItem} pItem The PageItem to transform.
 * @param {String} type The type of transformation.
 * @param {Number|Array} value The value(s) of the transformation.
 * @returns {Number} The current width.
 */
pub.transform = function(pItem, type, value) {

  if(!pItem || !pItem.hasOwnProperty("geometricBounds")) {
    error("transform(), invalid first parameter. Use page item.");
  }

  app.transformPreferences.adjustStrokeWeightWhenScaling = false;
  app.transformPreferences.whenScaling = WhenScalingOptions.ADJUST_SCALING_PERCENTAGE;

  var result;
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
      result = w;
    }

  } else if (type === "height") {
    if(isNumber(value)) {
      tm = tm.scaleMatrix(1, value / h);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else {
      result = h;
    }

  } else if (type === "size") {
    if(isArray(value)) {
      tm = tm.scaleMatrix(value[0] / w, value[1] / h);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else {
      result = [w, h];
    }

  } else if(type === "translation" || type === "translate") {
    if(isArray(value)) {

      // for proper matrix translation, convert units to points
      value[0] = UnitValue(value[0], unitEnum).as(MeasurementUnits.POINTS);
      value[1] = UnitValue(value[1], unitEnum).as(MeasurementUnits.POINTS);

      tm = tm.translateMatrix(value[0], value[1]);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = transform(pItem, "position");

  } else if (type === "rotation" || type === "rotate") {
    if(isNumber(value)) {
      tm = tm.rotateMatrix(-pItem.rotationAngle - value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = -pItem.rotationAngle;

  } else if (type === "scaling" || type === "scale") {
    if(isNumber(value)) {
      tm = tm.scaleMatrix(value, value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    } else if(isArray(value)) {
      tm = tm.scaleMatrix(value[0], value[1]);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = [pItem.horizontalScale / 100, pItem.verticalScale / 100];

  } else if (type === "shearing"  || type === "shear") {
    if(isNumber(value)) {
      tm = tm.shearMatrix(-pItem.shearAngle - value);
      pItem.transform(CoordinateSpaces.PASTEBOARD_COORDINATES, aPoint, tm);
    }
    result = -pItem.shearAngle;

  } else if (type === "position" || type === "x" || type === "y") {

    // calculate position in points
    var topLeft;
    if(currCanvasMode === PAGE || currCanvasMode === MARGIN || currCanvasMode === BLEED) {
      // top left of current page
      topLeft = currPage.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES)[0];
    } else {
      // top left of current spread
      topLeft = currPage.parent.pages.firstItem().resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.SPREAD_COORDINATES)[0];
    }

    var anchorPosOnSpread = pItem.resolve(aPoint, CoordinateSpaces.SPREAD_COORDINATES)[0];
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
        result = anchorPosOnPage[0];
      }

    } else if (type === "y") {
      if(isNumber(value)) {
        transform(pItem, "position", [anchorPosOnPage[0], value]);
        return value;
      } else {
        result = anchorPosOnPage[1];
      }

    } else {
      if(isArray(value)) {
        var offset = [value[0] - anchorPosOnPage[0], value[1] - anchorPosOnPage[1]];
        transform(pItem, "translation", offset);
        return value;
      } else {
        result = [anchorPosOnPage[0], anchorPosOnPage[1]];
      }
    }

  } else {
    error("transform(), invalid transform type. Use \"translation\", \"rotation\", \"scaling\", \"shearing\", \"size\", \"width\", \"height\", \"position\", \"x\" or \"y\".");
  }

  app.transformPreferences.adjustStrokeWeightWhenScaling = true;
  app.transformPreferences.whenScaling = WhenScalingOptions.APPLY_TO_CONTENT;

  if(!result) {
    result = value;
  }
  return result;

}

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
  if(currRectMode !== pub.CORNER) {
    pub.warning("itemWidth(), please note that only CORNER positioning is fully supported. Use with care.");
  }
  if(pItem !== undefined && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof width === "number") {
      pub.itemSize(pItem, width, Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]));
    } else {
      return Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]);
    }
  } else {
    error("itemWidth(), pItem has to be a valid PageItem");
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
  if(currRectMode !== pub.CORNER) {
    pub.warning("itemHeight(), please note that only CORNER positioning is fully supported. Use with care.");
  }
  if(pItem !== undefined && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof height === "number") {
      pub.itemSize(pItem, Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]), height);
    } else {
      return Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]);
    }
  } else {
    error("itemHeight(), pItem has to be a valid PageItem");
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

  if(currRectMode !== pub.CORNER) {
    pub.warning("itemPosition(), please note that only CORNER positioning is fully supported. Use with care.");
  }
  if (pItem !== undefined && pItem.hasOwnProperty("geometricBounds")) {
    if(typeof x === "number" && typeof y === "number") {
      var width = pItem.geometricBounds[3] - pItem.geometricBounds[1];
      var height = pItem.geometricBounds[2] - pItem.geometricBounds[0];
      var offX = 0;
      var offY = 0;
      pItem.geometricBounds = [y + offY, x + offX, y + height + offY, x + width + offX];
    } else {
      return {x: precision(pItem.geometricBounds[1], 5), y: precision(pItem.geometricBounds[0], 5)};
    }
  } else {
    error("itemPosition(), works only with child classes of PageItem.");
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
  if(currRectMode !== pub.CORNER) {
    pub.warning("itemSize(), please note that only CORNER positioning is fully supported. Use with care.");
  }
  if (pItem !== null && pItem.hasOwnProperty("geometricBounds")) {

    var x = pItem.geometricBounds[1];
    var y = pItem.geometricBounds[0];

    if(typeof width === "number" && typeof height === "number") {
      pItem.geometricBounds = [y, x, y + height, x + width];
    } else {
      return {width: pItem.geometricBounds[3] - pItem.geometricBounds[1], height: pItem.geometricBounds[2] - pItem.geometricBounds[0]};
    }

  } else {
    error("itemSize(), works only with child classes of PageItem.");
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
  adobeMatrix: function array(x, y) {
    // this seems to work:
    // it's important to know the position of the object around which it will be rotated and scaled.

    // 1. making a copy of this matrix
    var tmpMatrix = this.get();
    // tmpMatrix.print();

    // 2. pre-applying a translation as if the object was starting from the origin
    tmpMatrix.preApply([1, 0, -x, 0, 1, -y]);
    // tmpMatrix.print();

    // 3. move to object to its given coordinates
    tmpMatrix.apply([1, 0, x, 0, 1, y]);
    // tmpMatrix.print();

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
 * @description Returns the current matrix as a Matrix2D object for altering existing PageItems with transform(). If a Matrix2D object is provided to the function it will overwrite the current matrix.
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
// pub.transform = function(obj, matrix) {

//   obj.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
//                    AnchorPoint.TOP_LEFT_ANCHOR,
//                    matrix.adobeMatrix()
//   );

// };

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
    error("popMatrix(), missing a pushMatrix() to go with that popMatrix()");
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
