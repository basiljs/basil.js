// ----------------------------------------
// src/includes/transformation.js
// ----------------------------------------
/* global precision */

/**
 * @description Sets the reference point for transformations using the
 *          `transform()` function. The reference point will be used for all
 *          following transformations, until it is changed again. By default,
 *          the reference point is set to the top left.<br>
 *          Arguments can be the
 *          basil constants `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`,
 *          `CENTER_LEFT`, `CENTER`, `CENTER_RIGHT`, `BOTTOM_LEFT`,
 *          `BOTTOM_CENTER` or `BOTTOM_RIGHT`. Alternatively the digits `1`
 *          through `9` (as they are arranged on a num pad) can be used to set
 *          the anchor point. Lastly the function can also use an InDesign
 *          anchor point enumerator to set the reference point.<br>
 *          If the
 *          function is used without any arguments the currently set reference
 *          point will be returned.
 *
 * @cat     Document
 * @subcat  Transformation
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
 * @description Transforms a given page item. The type of transformation is
 *          determinded with the second parameter. The third parameter is the
 *          transformation value, either a number or an array of x and y values.
 *          The transformation's reference point (top left, bottom center etc.)
 *          can be set beforehand by using the `referencePoint()` function. If
 *          the third parameter is ommited, the function can be used to measure
 *          the value of the page item. There are 10 different transformation
 *          types:
 *    - `"translate"`: Translates the page item by the given `[x, y]` values.
 *      Returns the coordinates of the page item's anchor point as an array.
 *    - `"rotate"`: Rotates the page item to the given degree value. Returns the
 *      page item's rotation value in degrees.
 *    - `"scale"`: Scales the page item to the given `[x, y]` scale factor
 *      values. Alternatively, a single scale factor value can be used to scale
 *      the page item uniformely. Returns the scale factor values of the page
 *      item's current scale as an array.
 *    - `"shear"`: Shears the page item to the given degree value. Returns the
 *      page item's shear value in degrees.
 *    - `"size"`: Sets the page item's size to the given `[x, y]` dimensions.
 *      Returns the size of the page item as an array.
 *    - `"width"`: Sets the page item's width to the given value. Returns the
 *      width of the page item.
 *    - `"height"`: Sets the page item's height to the given value. Returns the
 *      height of the page item.
 *    - `"position"`: Sets the position of the page item's anchor point to the
 *      given `[x, y]` coordinates. Returns the coordinates of the page item's
 *      anchor point as an array.
 *    - `"x"`: Sets the x-position of the page item's anchor point to the given
 *      value. Returns the x-coordinate of the page item's anchor point.
 *    - `"y"`: Sets the y-position of the page item's anchor point to the given
 *      value. Returns the y-coordinate of the page item's anchor point.
 *
 * @cat     Document
 * @subcat  Transformation
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
 * @example <caption>Position a rectangle's lower right corner at a certain
 *          position</caption>
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
// private matrix functions

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

/**
 * @description Multiplies the current matrix by the one specified through the
 *          parameters.
 *
 * @cat     Document
 * @subcat  Transformation
 * @method  applyMatrix
 *
 * @param   {Matrix2D} matrix The matrix to be applied.
 */
pub.applyMatrix = function (matrix) {
  currMatrix.apply(matrix);
};

/**
 * @description Pops the current transformation matrix off the matrix stack.
 *          Understanding pushing and popping requires understanding the concept
 *          of a matrix stack. The `pushMatrix()` function saves the current
 *          coordinate system to the stack and `popMatrix()` restores the prior
 *          coordinate system. `pushMatrix()` and `popMatrix()` are used in
 *          conjuction with the other transformation methods and may be embedded
 *          to control the scope of the transformations.
 *
 * @cat     Document
 * @subcat  Transformation
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
 * @cat     Document
 * @subcat  Transformation
 * @method  printMatrix
 */
pub.printMatrix = function () {
  currMatrix.print();
};

/**
 * @description Pushes the current transformation matrix onto the matrix stack.
 *          Understanding `pushMatrix()` and `popMatrix()` requires
 *          understanding the concept of a matrix stack. The `pushMatrix()`
 *          function saves the current coordinate system to the stack and
 *          `popMatrix()` restores the prior coordinate system. `pushMatrix()`
 *          and `popMatrix()` are used in conjuction with the other
 *          transformation methods and may be embedded to control the scope of
 *          the transformations.
 *
 * @cat     Document
 * @subcat  Transformation
 * @method  pushMatrix
 */
pub.pushMatrix = function () {
  matrixStack.push(currMatrix.array());
};

/**
 * @description Replaces the current matrix with the identity matrix.
 *
 * @cat     Document
 * @subcat  Transformation
 * @method  resetMatrix
 */
pub.resetMatrix = function () {
  matrixStack = [];
  currMatrix = new Matrix2D();

  pub.translate(currOriginX, currOriginY);
};

/**
 * @description Rotates an object the amount specified by the angle parameter.
 *          Angles should be specified in radians (values from 0 to `PI`*2) or
 *          converted to radians with the `radians()` function. Objects are
 *          always rotated around their relative position to the origin and
 *          positive numbers rotate objects in a clockwise direction with 0
 *          radians or degrees being up and `HALF_PI` being to the right etc.
 *          Transformations apply to everything that happens after and
 *          subsequent calls to the function accumulates the effect. For
 *          example, calling `rotate(PI/2)` and then `rotate(PI/2)` is the same
 *          as `rotate(PI)`. If `rotate()` is called within the `draw()`, the
 *          transformation is reset when the loop begins again. Technically,
 *          `rotate()` multiplies the current transformation matrix by a
 *          rotation matrix. This function can be further controlled by the
 *          `pushMatrix()` and `popMatrix()`.
 *
 * @cat     Document
 * @subcat  Transformation
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
 * @description Increasing and decreasing the size of an object by expanding and
 *          contracting vertices. Scale values are specified as decimal
 *          percentages. The function call `scale(2.0)` increases the dimension
 *          of a shape by 200%. Objects always scale from their relative origin
 *          to the coordinate system. Transformations apply to everything that
 *          happens after and subsequent calls to the function multiply the
 *          effect. For example, calling `scale(2.0)` and then `scale(1.5)` is
 *          the same as `scale(3.0)`. If `scale()` is called within `draw()`,
 *          the transformation is reset when the loop begins again. This
 *          function can be further controlled by `pushMatrix()` and
 *          `popMatrix()`. If only one parameter is given, it is applied on X
 *          and Y axis.
 *
 * @cat     Document
 * @subcat  Transformation
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
 * @description Specifies an amount to displace objects within the page. The `x`
 *          parameter specifies left/right translation, the `y` parameter
 *          specifies up/down translation. Transformations apply to everything
 *          that happens after and subsequent calls to the function accumulates
 *          the effect. For example, calling `translate(50, 0)` and then
 *          `translate(20, 0)` is the same as `translate(70, 0)`. This function
 *          can be further controlled by the `pushMatrix()` and `popMatrix()`.
 *
 * @cat     Document
 * @subcat  Transformation
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
