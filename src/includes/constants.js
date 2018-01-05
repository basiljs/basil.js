// ----------------------------------------
// src/includes/constants.js
// ----------------------------------------

/**
 * Used with b.units() to set the coordinate system to points.
 * @property PT {String}
 * @cat Document
 * @subcat Units
 */
const PT = "pt";

/**
 * Used with b.units() to set the coordinate system to pixels.
 * @property PX {String}
 * @cat Document
 * @subcat Units
 */
const PX = "px";

/**
 * Used with b.units() to set the coordinate system to centimeters.
 * @property CM {String}
 * @cat Document
 * @subcat Units
 */
const CM = "cm";

/**
 * Used with b.units() to set the coordinate system to millimeters.
 * @property MM {String}
 * @cat Document
 * @subcat Units
 */
const MM = "mm";

/**
 * Used with b.units() to set the coordinate system to inches.
 * @property IN {String}
 * @cat Document
 * @subcat Units
 */
const IN = "inch";

/**
 * Used with b.colorMode() to set the color space.
 * @property RGB {String}
 * @cat Color
 */
const RGB = "rgb";

/**
 * Used with b.colorMode() to set the color space.
 * @property CMYK {String}
 * @cat Color
 */
const CMYK = "cmyk";

/**
 * Used with b.gradientMode() to set the gradient mode.
 * @property LINEAR {String}
 * @cat Color
 */
const LINEAR = "linear";

/**
 * Used with b.gradientMode() to set the gradient mode.
 * @property RADIAL {String}
 * @cat Color
 */
const RADIAL = "radial";

/**
 * Corner, used for drawing modes.
 * @property CORNER {String}
 * @cat Document
 * @subcat Primitives
 */
const CORNER = "corner";

/**
 * Corners, used for drawing modes.
 * @property CORNERS {String}
 * @cat Document
 * @subcat Primitives
 */
const CORNERS = "corners";

/**
 * Center, used for drawing modes.
 * @property CENTER {String}
 * @cat Document
 * @subcat Primitives
 */
const CENTER = "center";

/**
 * Radius, used for drawing modes.
 * @property RADIUS {String}
 * @cat Document
 * @subcat Primitives
 */
const RADIUS = "radius";

/**
 * Close, used for endShape() modes.
 * @property CLOSE {String}
 * @cat Document
 * @subcat Primitives
 */
const CLOSE = "close";

/**
 * Open, used for arc() modes.
 * @property OPEN {String}
 * @cat Document
 * @subcat Primitives
 */
const OPEN = "open";

/**
 * Chord, used for arc() modes.
 * @property CHORD {String}
 * @cat Document
 * @subcat Primitives
 */
const CHORD = "chord";

/**
 * Pie, used for arc() modes.
 * @property PIE {String}
 * @cat Document
 * @subcat Primitives
 */
const PIE = "pie";

/**
 * Two Pi
 * @property TWO_PI {Number}
 * @cat Math
 * @subcat Constants
 */
const TWO_PI = Math.PI * 2;

/**
 * Pi
 * @property PI {Number}
 * @cat Math
 * @subcat Constants
 */
const PI = Math.PI;

/**
 * Half Pi
 * @property HALF_PI {Number}
 * @cat Math
 * @subcat Constants
 */
const HALF_PI = Math.PI / 2;

/**
 * Quarter Pi
 * @property QUARTER_PI {Number}
 * @cat Math
 * @subcat Constants
 */
const QUARTER_PI = Math.PI / 4;

/**
 * Sin Cos Length
 * @property SINCOS_LENGTH {Number}
 * @cat Math
 * @subcat Constants
 */
const SINCOS_LENGTH = 720;

/**
 * Epsilon
 * @property EPSILON {Number}
 * @cat Math
 * @subcat Constants
 */
const EPSILON = 10e-12;

/**
 * Kappa
 * @property KAPPA {Number}
 * @cat Math
 * @subcat Constants
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
const KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);

/**
 * Used with b.canvasMode() to set the canvas to the full current page.
 * @property PAGE {String}
 * @cat Document
 * @subcat Page
 */
const PAGE = "page";

/**
 * Used with b.canvasMode() to set the canvas to the full current page minus the margins.
 * @property MARGIN {String}
 * @cat Document
 * @subcat Page
 */
const MARGIN = "margin";

/**
 * Used with b.canvasMode() to set the canvas to the full current page plus the bleed.
 * @property BLEED {String}
 * @cat Document
 * @subcat Page
 */
const BLEED = "bleed";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages.
 * @property FACING_PAGES {String}
 * @cat Document
 * @subcat Page
 */
const FACING_PAGES = "facing_pages";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages plus bleeds.
 * @property FACING_BLEEDS {String}
 * @cat Document
 * @subcat Page
 */
const FACING_BLEEDS = "facing_bleeds";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages minus margins.
 * @property FACING_MARGINS {String}
 * @cat Document
 * @subcat Page
 */
const FACING_MARGINS = "facing_margins";

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_BEGINNING {String}
 * @cat Document
 * @subcat Page
 */
const AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_END {String}
 * @cat Document
 * @subcat Page
 */
const AT_END = LocationOptions.AT_END;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property BEFORE {String}
 * @cat Document
 * @subcat Page
 */
const BEFORE = LocationOptions.BEFORE;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AFTER {String}
 * @cat Document
 * @subcat Page
 */
const AFTER = LocationOptions.AFTER;

/**
 * Used with b.arrange() to bring a page item to the front or to bring it in front of a given reference object.
 * @property FRONT {String}
 * @cat Document
 * @subcat Page
 */
const FRONT = "front";

/**
 * Used with b.arrange() to send a page item to the back or to send it behind a given reference object.
 * @property BACK {String}
 * @cat Document
 * @subcat Page
 */
const BACK = "back";

/**
 * Used with b.arrange() to bring a page item one level forward in its layer.
 * @property FORWARD {String}
 * @cat Document
 * @subcat Page
 */
const FORWARD = "forward";

/**
 * Used with b.arrange() to send a page item one level backward in its layer.
 * @property BACKWARD {String}
 * @cat Document
 * @subcat Page
 */
const BACKWARD = "backward";

/**
 * Used with b.size() to set the orientation of a given page size to portrait.
 * @property PORTRAIT {String}
 * @cat Document
 * @subcat Page
 */
const PORTRAIT = PageOrientation.PORTRAIT;

/**
 * Used with b.size() to set the orientation of a given page size to landscape.
 * @property LANDSCAPE {String}
 * @cat Document
 * @subcat Page
 */
const LANDSCAPE = PageOrientation.LANDSCAPE;

/**
 * Returns a Lorem ipsum string that can be used for testing.
 * @property LOREM {String}
 * @cat Typography
 */
const LOREM = "Lorem ipsum is dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/**
* The name of the current script.
* @property SCRIPTNAME {String}
* @cat Environment
*/
var stackArray = $.stack.
            replace(/[\n]toString\(\)[\n]$/,'').
            replace(/[\[\]']+/g,'').
            split(/[\n]/);
const SCRIPTNAME = stackArray[0] === "jsRunner.jsx" ? stackArray[1] : stackArray[0];

/**
* Used with b.go() to set Performance Mode. Disables ScreenRedraw during processing.
* @property MODESILENT {String}
* @cat Environment
* @subcat modes
*/
const MODESILENT = "ModeSilent";

/**
 * Used with b.go() to set Performance Mode. Processes Document in background mode. Document will not be visible until the script is done. If you are firing on a open document you'll need to save it before calling b.go(). The document will be removed from the display list and added again after the script is done. In this mode you will likely look at InDesign with no open document for quite some time - do not work in InDesign during this time. You may want to use b.println("yourMessage") in your script and look at the Console in estk to get information about the process.
 * @property MODEHIDDEN {String}
 * @cat Environment
 * @subcat modes
 */
const MODEHIDDEN = "ModeHidden";

/**
 * Default mode. Used with b.go() to set Performance Mode. Processes Document with Screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time. This mode was also the default in Versions prior to 0.22
 * @property MODEVISIBLE {String}
 * @cat Environment
 * @subcat modes
 */
const MODEVISIBLE = "ModeVisible";
const DEFAULTMODE = const MODEVISIBLE; // FIXME, DEFAULTMODE shouldn't be public, move init to init()


const ERROR_PREFIX = "\nBasil.js Error -> ",
  WARNING_PREFIX = "### Basil Warning -> ";
