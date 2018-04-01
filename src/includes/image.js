// ----------------------------------------
// src/includes/image.js
// ----------------------------------------

/**
 * @description Adds an image to the document. If the image argument is given as a string the image file must be in the document's
 * data directory which is in the same directory where the document is saved in. The image argument can also be a File
 * instance which can be placed even before the document was saved.
 * The second argument can either be the x position of the frame to create or an instance of a rectangle,
 * oval or polygon to place the image in. If an x position is given, a y position must be given, too.
 * If x and y positions are given and width and height are not given, the frame's size gets set to the original image size.
 *
 * @cat    Document
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
  var file = initDataFile(img),
    frame = null,
    fitOptions = null,
    width = null,
    height = null,
    imgErrorMsg = "image(), wrong parameters. Use:\n"
      + "image( {String|File}, {Rectangle|Oval|Polygon} ) or\n"
      + "image( {String|File}, x, y ) or\n"
      + "image( {String|File}, x, y, w, h )";

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
        if (w <= 0 || h <= 0) error("image(), invalid parameters. When using image(img, x, y, w, h) with the default imageMode CORNER, parameters w and h need to be greater than 0.");
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
                       currMatrix.adobeMatrix(x, y));
  } else {
    frame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix(x, y));
  }


  frame.strokeWeight = currStrokeWeight;
  frame.strokeTint = currStrokeTint;
  frame.strokeColor = currStrokeColor;

  return frame;
};

/**
 * @description Modifies the location from which images draw. The default mode is imageMode(CORNER), which specifies the location to be the upper left corner and uses the fourth and fifth parameters of image() to set the image's width and height. The syntax imageMode(CORNERS) uses the second and third parameters of image() to set the location of one corner of the image and uses the fourth and fifth parameters to set the opposite corner. Use imageMode(CENTER) to draw images centered at the given x and y position.
 * If no parameter is passed the currently set mode is returned as String.
 *
 * @cat    Document
 * @subcat Image
 * @method imageMode
 * @param  {String} [mode] Either CORNER, CORNERS, or CENTER.
 * @return {String} The current mode.
 */
pub.imageMode = function(mode) {
  if (arguments.length === 0) return currImageMode;

  if (mode === pub.CORNER || mode === pub.CORNERS || mode === pub.CENTER) {
    currImageMode = mode;
  } else {
    error("imageMode(), unsupported imageMode. Use: CORNER, CORNERS, CENTER.");
  }
  return currImageMode;
};
