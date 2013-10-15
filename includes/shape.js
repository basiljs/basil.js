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
  if (arguments.length !== 4) error("b.ellipse(), not enough parameters to draw an ellipse! Use: x, y, w, h");
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
/* 
 *  TODO: Vectors as arguments
 *  @example 
 *    var vec1 = new b.Vector( x1, y1 );
 *    var vec2 = new b.Vector( x2, y2 );
 *    b.line( vec1, vec2 );
 */
pub.line = function(x1, y1, x2, y2) {
  if (arguments.length !== 4) error("b.line(), not enough parameters to draw a line! Use: x1, y1, x2, y2");
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
                   AnchorPoint.CENTER_ANCHOR,
                   currMatrix.adobeMatrix() );
  return newLine;
};

/**
 * Using the beginShape() and endShape() functions allow creating more complex forms. 
 * beginShape() begins recording vertices for a shape and endShape() stops recording. 
 * After calling the beginShape() function, a series of vertex() commands must follow. 
 * To stop drawing the shape, call endShape(). The value of the parameter tells whether the paths to 
 * create from the provided vertices have to be closed or not (to connect the beginning and the end).
 *
 * @cat Document
 * @subcat Primitives
 * @method beginShape
 * @param shapeMode Set b.CLOSE if the new Path should be auto-closed.
 */
pub.beginShape = function(shapeMode) {
  currVertexPoints = [];
  currPathPointer = 0;
  currPolygon = null;
  if( typeof shapeMode != null) {
    currShapeMode = shapeMode;
  } else {
    currShapeMode = null;
  }
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
 * @param  {Number} x position x-value
 * @param  {Number} y position y-value
 * @param  {Number} [xAnchorLeft] position xAnchorLeft-value
 * @param  {Number} [yAnchorLeft] position yAnchorLeft-value
 * @param  {Number} [xAnchorRight] position xAnchorRight-value
 * @param  {Number} [yAnchorRight] position yAnchorRight-value
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
      error("b.vertex(), wrong argument count: Please use either vertex(x, y) or vertex(x, y, xAnchorLeft, yAnchorLeft, xAnchorRight, yAnchorRight)!" );
    }
  } else {
    notCalledBeginShapeError();
  }
};


/**
 * addPath() is used to create multi component paths. Call addPath() to add the so far drawn vertices to a single path. 
 * New vertices will then end up in a new path. endShape() will then return a multi path object. All component paths will account for 
 * the setting (see b.CLOSE) given in beginShape(shapeMode).
 *
 * @cat Document
 * @subcat Primitives
 * @method addPath
 */
pub.addPath = function() {
  doAddPath();
  currPathPointer++;
}

/**
 * The endShape() function is the companion to beginShape() and may only be called 
 * after beginShape(). 
 *
 * @cat Document
 * @subcat Primitives
 * @method endShape
 * @return {GraphicLine|Polygon} newShape
 */
pub.endShape = function() {
  doAddPath();
  currPolygon.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix() );    
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
    currPolygon = currentPage().polygons.add( currentLayer() );
  } else {
    currPolygon = currentPage().graphicLines.add( currentLayer() );
  }
  with (currPolygon) {
    strokeWeight = currStrokeWeight;
    strokeTint = currStrokeTint;
    fillColor = currFillColor;
    fillTint = currFillTint;
    strokeColor = currStrokeColor;
  }       
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
 * @param  {Number} x Position X
 * @param  {Number} y Position Y
 * @param  {Number} w Width
 * @param  {Number} h Height
 * @return {Rectangle} New rectangle
 */
pub.rect = function(x, y, w, h){
  if (w === 0 || h === 0) {
    // indesign doesn't draw a rectangle if width or height are set to 0
    return false;
  }
  if (arguments.length !== 4) error("b.rect(), not enough parameters to draw a rect! Use: x, y, w, h");
  
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
    error("b.rectMode(), unsupported rectMode. Use: CORNER, CORNERS, CENTER.");
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
    error("b.ellipseMode(), Unsupported ellipseMode. Use: CENTER, RADIUS, CORNER, CORNERS.");
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
    error("b.strokeWeight, not supported type. Please make sure the strokeweight is a number or string");
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

