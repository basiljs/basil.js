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
      fitOptions = FitOptions.FILL_PROPORTIONALLY;
    } else {
      if (w && h) {
        width = w;
        height = h;
        fitOptions = FitOptions.FILL_PROPORTIONALLY;
      } else {
        fitOptions = FitOptions.frameToContent;
      }
    }
    
    frame = currentPage().rectangles.add(currentLayer(), 
      { geometricBounds:[y, x, y + height, x + width] }
    );
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

  with (frame) {
    strokeWeight = currStrokeWeight;
    strokeTint = currStrokeTint;
    strokeColor = currStrokeColor;
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
 * @param {String} [mode] Either b.CORNER, b.CORNERS, or b.CENTER
 * @return {String} The current mode
 */
pub.imageMode = function(mode) {
  if (arguments.length === 0) return currImageMode;

  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER ) {
    currImageMode = mode;
  } else {
    error("b.imageMode(), unsupported imageMode. Use: CORNER, CORNERS, CENTER.");
  }
  return currImageMode;
};