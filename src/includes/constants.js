// ----------------------------------------
// src/includes/constants.js
// ----------------------------------------

/**
 * Used with units() to set the coordinate system to points.
 */
pub.PT = "pt";

/**
 * Used with units() to set the coordinate system to pixels.
 */
pub.PX = "px";

/**
 * Used with units() to set the coordinate system to centimeters.
 */

pub.CM = "cm";

/**
 * Used with units() to set the coordinate system to millimeters.
 */
pub.MM = "mm";

/**
 * Used with units() to set the coordinate system to inches.
 */
pub.IN = "inch";

/**
 * Used with colorMode() to set the color space.
 */
pub.RGB = "rgb";

/**
 * Used with colorMode() to set the color space.
 */
pub.CMYK = "cmyk";

/**
 * Used with gradientMode() to set the gradient mode.
 */
pub.LINEAR = "linear";

/**
 * Used with gradientMode() to set the gradient mode.
 */
pub.RADIAL = "radial";

/**
 * Corner, used for drawing modes.
 */
pub.CORNER = "corner";

/**
 * Corners, used for drawing modes.
 */
pub.CORNERS = "corners";

/**
 * Center, used for drawing modes or used with referencePoint() to set the reference point of transformations to the center of the page item.
 */
pub.CENTER = "center";
pub.CENTER_CENTER = "center";

/**
 * Radius, used for drawing modes.
 */
pub.RADIUS = "radius";

/**
 * Used with referencePoint() to set the reference point of transformations to the top left of the page item.
 */
pub.TOP_LEFT = "topLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the top center of the page item.
 */
pub.TOP_CENTER = "topCenter";

/**
 * Used with referencePoint() to set the reference point of transformations to the top right of the page item.
 */
pub.TOP_RIGHT = "topRight";

/**
 * Used with referencePoint() to set the reference point of transformations to the center left of the page item.
 */
pub.CENTER_LEFT = "centerLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the center right of the page item.
 */
pub.CENTER_RIGHT = "centerRight";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom left of the page item.
 */
pub.BOTTOM_LEFT = "bottomLeft";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom center of the page item.
 */
pub.BOTTOM_CENTER = "bottomCenter";

/**
 * Used with referencePoint() to set the reference point of transformations to the bottom right of the page item.
 */
pub.BOTTOM_RIGHT = "bottomRight";

/**
 * Close, used for endShape() modes.
 */
pub.CLOSE = "close";

/**
 * Open, used for arc() modes.
 */
pub.OPEN = "open";

/**
 * Chord, used for arc() modes.
 */
pub.CHORD = "chord";

/**
 * Pie, used for arc() modes.
 */
pub.PIE = "pie";

/**
 * @description Two Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property TWO_PI {Number}
 */
pub.TWO_PI = Math.PI * 2;

/**
 * @description Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property PI {Number}
 */
pub.PI = Math.PI;

/**
 * @description Half Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property HALF_PI {Number}
 */
pub.HALF_PI = Math.PI / 2;

/**
 * @description Quarter Pi
 *
 * @cat      Math
 * @subcat   Constants
 * @property QUARTER_PI {Number}
 */
pub.QUARTER_PI = Math.PI / 4;

/**
 * @description Sin Cos Length
 *
 * @cat      Math
 * @subcat   Constants
 * @property SINCOS_LENGTH {Number}
 */
pub.SINCOS_LENGTH = 720;

/**
 * @description Epsilon
 *
 * @cat      Math
 * @subcat   Constants
 * @property EPSILON {Number}
 */
pub.EPSILON = 10e-12;

/**
 * @description Kappa
 *
 * @cat      Math
 * @subcat   Constants
 * @property KAPPA {Number}
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
pub.KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);

/**
 * Used with canvasMode() to set the canvas to the full current page.
 */
pub.PAGE = "page";

/**
 * Used with canvasMode() to set the canvas to the full current page minus the margins.
 */
pub.MARGIN = "margin";

/**
 * Used with canvasMode() to set the canvas to the full current page plus the bleed.
 */
pub.BLEED = "bleed";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages.
 */
pub.FACING_PAGES = "facing_pages";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages plus bleeds.
 */
pub.FACING_BLEEDS = "facing_bleeds";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages minus margins.
 */
pub.FACING_MARGINS = "facing_margins";

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AT_END = LocationOptions.AT_END;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.BEFORE = LocationOptions.BEFORE;

/**
 * Used with addPage() to set the position of the new page in the book.
 */
pub.AFTER = LocationOptions.AFTER;

/**
 * Used with arrange() to bring a page item to the front or to bring it in front of a given reference object.
 */
pub.FRONT = "front";

/**
 * Used with arrange() to send a page item to the back or to send it behind a given reference object.
 */
pub.BACK = "back";

/**
 * Used with arrange() to bring a page item one level forward in its layer.
 */
pub.FORWARD = "forward";

/**
 * Used with arrange() to send a page item one level backward in its layer.
 */
pub.BACKWARD = "backward";

/**
 * Used with size() to set the orientation of a given page size to portrait.
 */
pub.PORTRAIT = PageOrientation.PORTRAIT;

/**
 * Used with size() to set the orientation of a given page size to landscape.
 */
pub.LANDSCAPE = PageOrientation.LANDSCAPE;

/**
* Used with `mode()` to set performance mode. Disables screen redraw during processing.
*/
pub.SILENT = "silent";

/**
 * Used with `mode()` to set performance mode. Processes the document in background mode. The document will not be visible until the script is done or until the mode is changed back to `VISIBLE`. The document will be removed from the display list and added again after the script is done. In this mode you will likely look at InDesign with no open document for quite some time – do not work in InDesign during this time. You may want to use `println("yourMessage")` in your script and look at the console to get information about the process. Note: In order to enter this mode either a saved document needs to be open or no document at all. If you have an unsaved document open, basil will automatically save it for you. If it has not been saved before, you will be prompted to save it to your hard drive.
 */
pub.HIDDEN = "hidden";

/**
 * Default mode. Used with `mode()` to set performance mode. Processes the document with screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time.
 */
pub.VISIBLE = "visible";


var ERROR_PREFIX = "\nBasil.js Error -> ",
  WARNING_PREFIX = "### Basil Warning -> ";
