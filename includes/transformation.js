
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
  if(currRectMode !== b.CORNER) pub.warning("b.itemWidth(), please note that only b.CORNER positioning is fully supported. Use with care.");
  if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
    if( typeof width === 'number' ){
      b.itemSize( pItem, width, Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]) );
    } else {
      return Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]);
    }
  } else {
    error("b.itemWidth(), pItem has to be a valid PageItem");
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
  if(currRectMode !== b.CORNER) pub.warning("b.itemHeight(), please note that only b.CORNER positioning is fully supported. Use with care.");
  if( typeof pItem !== 'undef' && pItem.hasOwnProperty("geometricBounds")) {
    if( typeof height === 'number' ){
      b.itemSize( pItem, Math.abs(pItem.geometricBounds[3] - pItem.geometricBounds[1]), height );
    } else {
      return Math.abs(pItem.geometricBounds[2] - pItem.geometricBounds[0]);
    }
  } else {
    error("b.itemHeight(), pItem has to be a valid PageItem");
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

  if(currRectMode !== b.CORNER) pub.warning("b.itemPosition(), please note that only b.CORNER positioning is fully supported. Use with care.");

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
    error("b.itemPosition(), works only with child classes of PageItem.");
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
  if(currRectMode !== b.CORNER) pub.warning("b.itemSize(), please note that only b.CORNER positioning is fully supported. Use with care.");
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
    error("b.itemSize(), works only with child classes of PageItem.");
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

/* TODO jsdoc */
var Matrix2D = pub.Matrix2D = function() {
  if (arguments.length === 0) this.reset();
  else if (arguments.length === 1 && arguments[0] instanceof Matrix2D) this.set(arguments[0].array());
  else if (arguments.length === 6) this.set(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
};
/* TODO jsdoc */
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

/**
 * Returns the current matrix as a Matrix2D object for altering existing PageItems with b.transform(). If a Matrix2D object is provided to the function it will overwrite the current matrix.
 *
 * @cat Document
 * @subcat Transformation
 * @method matrix
 * @param {Matrix2D} [matrix] The matrix to be set as new current matrix
 * @returns {Matrix2D} Returns the current matrix
 */
pub.matrix = function(matrix) {

  if(matrix instanceof Matrix2D) {
    currMatrix = matrix;
  }
  return currMatrix;
}

/**
 * Transforms the given PageItem with the given Matrix2D object.
 *
 * @cat Document
 * @subcat Transformation
 * @method transform
 * @param {PageItem} obj The item to be transformed
 * @param {Matrix2D} matrix The matrix to be applied
 */
pub.transform = function(obj, matrix) {
  
  obj.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   matrix.adobeMatrix() 
  );  

}  

/**
 * Multiplies the current matrix by the one specified through the parameters. 
 *
 * @cat Document
 * @subcat Transformation
 * @method applyMatrix
 * @param {Matrix2D} matrix The matrix to be applied
 */
pub.applyMatrix = function (matrix) {
  currMatrix.apply(matrix);
};

/**
 * Pops the current transformation matrix off the matrix stack. Understanding pushing and popping requires understanding the concept of a matrix stack. The pushMatrix() function saves the current coordinate system to the stack and popMatrix() restores the prior coordinate system. pushMatrix() and popMatrix() are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat Document
 * @subcat Transformation
 * @method popMatrix
 */
pub.popMatrix = function () {
  if (matrixStack.length > 0) {
    currMatrix.set( matrixStack.pop() );
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
 * Pushes the current transformation matrix onto the matrix stack. Understanding pushMatrix() and popMatrix() requires understanding the concept of a matrix stack. The pushMatrix() function saves the current coordinate system to the stack and popMatrix() restores the prior coordinate system. pushMatrix() and popMatrix() are used in conjuction with the other transformation methods and may be embedded to control the scope of the transformations.
 *
 * @cat Document
 * @subcat Transformation
 * @method pushMatrix
 */
pub.pushMatrix = function () {
  matrixStack.push( currMatrix.array() );
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
 * Rotates an object the amount specified by the angle parameter. Angles should be specified in radians (values from 0 to PI*2) or converted to radians with the radians() function. Objects are always rotated around their relative position to the origin and positive numbers rotate objects in a clockwise direction with 0 radians or degrees being up and HALF_PI being to the right etc. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling rotate(PI/2) and then rotate(PI/2) is the same as rotate(PI). If rotate() is called within the draw(), the transformation is reset when the loop begins again. Technically, rotate() multiplies the current transformation matrix by a rotation matrix. This function can be further controlled by the pushMatrix() and popMatrix().
 *
 * @cat Document
 * @subcat Transformation
 * @method rotate
 * @param {Number} angle The angle specified in radians
 */
pub.rotate = function (angle) {
  if(typeof arguments[0] === 'undefined') error("Please provide an angle for rotation.");
  currMatrix.rotate(angle);
};

/**
 * Increasing and decreasing the size of an object by expanding and contracting vertices. Scale values are specified as decimal percentages. The function call scale(2.0) increases the dimension of a shape by 200%. Objects always scale from their relative origin to the coordinate system. Transformations apply to everything that happens after and subsequent calls to the function multiply the effect. For example, calling scale(2.0) and then scale(1.5) is the same as scale(3.0). If scale() is called within draw(), the transformation is reset when the loop begins again. This function can be further controlled by pushMatrix() and popMatrix().
 * If only one parameter is given, it is applied on X and Y axis. 
 *
 * @cat Document
 * @subcat Transformation
 * @method scale
 * @param {Number} scaleX The amount to scale the X axis.
 * @param {Number} scaleY The amount to scale the Y axis.
 */
pub.scale = function (scaleX,scaleY) {
  if(typeof arguments[0] != 'number' || (arguments.length === 2 && typeof arguments[1] != 'number') ) error("Please provide valid x and/or y factors for scaling.");
  currMatrix.scale(scaleX,scaleY);
};

/**
 * Specifies an amount to displace objects within the page. The x parameter specifies left/right translation, the y parameter specifies up/down translation. Transformations apply to everything that happens after and subsequent calls to the function accumulates the effect. For example, calling translate(50, 0) and then translate(20, 0) is the same as translate(70, 0). This function can be further controlled by the pushMatrix() and popMatrix().
 *
 * @cat Document
 * @subcat Transformation
 * @method translate
 * @param {Number} tx The amount of offset on the X axis. 
 * @param {Number} ty The amount of offset on the Y axis.
 */
pub.translate = function (tx,ty) {
  if(typeof arguments[0] === 'undefined' || typeof arguments[1] === 'undefined') error("Please provide x and y coordinates for translation.");
  currMatrix.translate(tx,ty);
};
