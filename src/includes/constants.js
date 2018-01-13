// ----------------------------------------
// src/includes/constants.js
// ----------------------------------------

/**
 * Used with units() to set the coordinate system to points.
 * @property PT {String}
 * @cat Document
 * @subcat Units
 */
pub.PT = "pt";

/**
 * Used with units() to set the coordinate system to pixels.
 * @property PX {String}
 * @cat Document
 * @subcat Units
 */
pub.PX = "px";

/**
 * Used with units() to set the coordinate system to centimeters.
 * @property CM {String}
 * @cat Document
 * @subcat Units
 */

pub.CM = "cm";

/**
 * Used with units() to set the coordinate system to millimeters.
 * @property MM {String}
 * @cat Document
 * @subcat Units
 */
pub.MM = "mm";

/**
 * Used with units() to set the coordinate system to inches.
 * @property IN {String}
 * @cat Document
 * @subcat Units
 */
pub.IN = "inch";

/**
 * Used with colorMode() to set the color space.
 * @property RGB {String}
 * @cat Color
 */
pub.RGB = "rgb";

/**
 * Used with colorMode() to set the color space.
 * @property CMYK {String}
 * @cat Color
 */
pub.CMYK = "cmyk";

/**
 * Used with gradientMode() to set the gradient mode.
 * @property LINEAR {String}
 * @cat Color
 */
pub.LINEAR = "linear";

/**
 * Used with gradientMode() to set the gradient mode.
 * @property RADIAL {String}
 * @cat Color
 */
pub.RADIAL = "radial";

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
 * Open, used for arc() modes.
 * @property OPEN {String}
 * @cat Document
 * @subcat Primitives
 */
pub.OPEN = "open";

/**
 * Chord, used for arc() modes.
 * @property CHORD {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CHORD = "chord";

/**
 * Pie, used for arc() modes.
 * @property PIE {String}
 * @cat Document
 * @subcat Primitives
 */
pub.PIE = "pie";

/**
 * Two Pi
 * @property TWO_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.TWO_PI = Math.PI * 2;

/**
 * Pi
 * @property PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.PI = Math.PI;

/**
 * Half Pi
 * @property HALF_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.HALF_PI = Math.PI / 2;

/**
 * Quarter Pi
 * @property QUARTER_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.QUARTER_PI = Math.PI / 4;

/**
 * Sin Cos Length
 * @property SINCOS_LENGTH {Number}
 * @cat Math
 * @subcat Constants
 */
pub.SINCOS_LENGTH = 720;

/**
 * Epsilon
 * @property EPSILON {Number}
 * @cat Math
 * @subcat Constants
 */
pub.EPSILON = 10e-12;

/**
 * Kappa
 * @property KAPPA {Number}
 * @cat Math
 * @subcat Constants
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
pub.KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);

/**
 * Used with canvasMode() to set the canvas to the full current page.
 * @property PAGE {String}
 * @cat Document
 * @subcat Page
 */
pub.PAGE = "page";

/**
 * Used with canvasMode() to set the canvas to the full current page minus the margins.
 * @property MARGIN {String}
 * @cat Document
 * @subcat Page
 */
pub.MARGIN = "margin";

/**
 * Used with canvasMode() to set the canvas to the full current page plus the bleed.
 * @property BLEED {String}
 * @cat Document
 * @subcat Page
 */
pub.BLEED = "bleed";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages.
 * @property FACING_PAGES {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_PAGES = "facing_pages";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages plus bleeds.
 * @property FACING_BLEEDS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_BLEEDS = "facing_bleeds";

/**
 * Used with canvasMode() to set the canvas to use the current facing pages minus margins.
 * @property FACING_MARGINS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_MARGINS = "facing_margins";

/**
 * Used with addPage() to set the position of the new page in the book.
 * @property AT_BEGINNING {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with addPage() to set the position of the new page in the book.
 * @property AT_END {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_END = LocationOptions.AT_END;

/**
 * Used with addPage() to set the position of the new page in the book.
 * @property BEFORE {String}
 * @cat Document
 * @subcat Page
 */
pub.BEFORE = LocationOptions.BEFORE;

/**
 * Used with addPage() to set the position of the new page in the book.
 * @property AFTER {String}
 * @cat Document
 * @subcat Page
 */
pub.AFTER = LocationOptions.AFTER;

/**
 * Used with arrange() to bring a page item to the front or to bring it in front of a given reference object.
 * @property FRONT {String}
 * @cat Document
 * @subcat Page
 */
pub.FRONT = "front";

/**
 * Used with arrange() to send a page item to the back or to send it behind a given reference object.
 * @property BACK {String}
 * @cat Document
 * @subcat Page
 */
pub.BACK = "back";

/**
 * Used with arrange() to bring a page item one level forward in its layer.
 * @property FORWARD {String}
 * @cat Document
 * @subcat Page
 */
pub.FORWARD = "forward";

/**
 * Used with arrange() to send a page item one level backward in its layer.
 * @property BACKWARD {String}
 * @cat Document
 * @subcat Page
 */
pub.BACKWARD = "backward";

/**
 * Used with size() to set the orientation of a given page size to portrait.
 * @property PORTRAIT {String}
 * @cat Document
 * @subcat Page
 */
pub.PORTRAIT = PageOrientation.PORTRAIT;

/**
 * Used with size() to set the orientation of a given page size to landscape.
 * @property LANDSCAPE {String}
 * @cat Document
 * @subcat Page
 */
pub.LANDSCAPE = PageOrientation.LANDSCAPE;

/**
 * Returns a Lorem ipsum string that can be used for testing.
 * @property LOREM {String}
 * @cat Typography
 */
pub.LOREM = "Lorem ipsum is dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/**
* The name of the current script.
* @property SCRIPTNAME {String}
* @cat Environment
*/
var stackArray = $.stack.
            replace(/[\n]toString\(\)[\n]$/,'').
            replace(/[\[\]']+/g,'').
            split(/[\n]/);
pub.SCRIPTNAME = stackArray[0] === "jsRunner.jsx" ? stackArray[1] : stackArray[0];

/**
* Used with <code>mode()</code> to set performance mode. Disables screen redraw during processing.
* @property SILENT {String}
* @cat Environment
* @subcat modes
*/
pub.SILENT = "silent";

/**
 * Used with <code>mode()</code> to set performance mode. Processes the document in background mode. The document will not be visible until the script is done or until the mode is changed back to <code>VISIBLE</code>. The document will be removed from the display list and added again after the script is done. In this mode you will likely look at InDesign with no open document for quite some time – do not work in InDesign during this time. You may want to use <code>println("yourMessage")</code> in your script and look at the console to get information about the process. Note: In order to enter this mode either a saved document needs to be open or no document at all. If you have an unsaved document open, basil will automatically save it for you. If it has not been saved before, you will be prompted to save it to your hard drive.
 * @property HIDDEN {String}
 * @cat Environment
 * @subcat modes
 */
pub.HIDDEN = "hidden";

/**
 * Default mode. Used with <code>mode()</code> to set performance mode. Processes the document with screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time.
 * @property VISIBLE {String}
 * @cat Environment
 * @subcat modes
 */
pub.VISIBLE = "visible";


var ERROR_PREFIX = "\nBasil.js Error -> ",
  WARNING_PREFIX = "### Basil Warning -> ";
