/**
 * Used with b.units() to set the coordinate system to points.
 * @property PT {String}
 * @cat Document
 * @subcat Units
 */
pub.PT = "pt";

/**
 * Used with b.units() to set the coordinate system to pixels.
 * @property PX {String}
 * @cat Document
 * @subcat Units
 */
pub.PX = "px";

/**
 * Used with b.units() to set the coordinate system to centimeters.
 * @property CM {String}
 * @cat Document
 * @subcat Units
 */

pub.CM = "cm";

/**
 * Used with b.units() to set the coordinate system to millimeters.
 * @property MM {String}
 * @cat Document
 * @subcat Units
 */
pub.MM = "mm";

/**
 * Used with b.units() to set the coordinate system to inches.
 * @property IN {String}
 * @cat Document
 * @subcat Units
 */
pub.IN = "inch";

/**
 * Used with b.colorMode() to set the color space.
 * @property RGB {String}
 * @cat Color
 */
pub.RGB = "rgb";

/**
 * Used with b.colorMode() to set the color space.
 * @property CMYK {String}
 * @cat Color
 */
pub.CMYK = "cmyk";

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
pub.TWO_PI = Math.PI*2;

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
pub.HALF_PI = Math.PI/2;

/**
 * Quarter Pi
 * @property QUARTER_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.QUARTER_PI = Math.PI/4;

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
 * Used with b.canvasMode() to set the canvas to the full current page.
 * @property PAGE {String}
 * @cat Document
 * @subcat Page
 */
pub.PAGE = "page";

/**
 * Used with b.canvasMode() to set the canvas to the full current page minus the margins.
 * @property MARGIN {String}
 * @cat Document
 * @subcat Page
 */
pub.MARGIN = "margin";

/**
 * Used with b.canvasMode() to set the canvas to the full current page plus the bleed.
 * @property BLEED {String}
 * @cat Document
 * @subcat Page
 */
pub.BLEED = "bleed";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages.
 * @property FACING_PAGES {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_PAGES = "facing_pages";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages plus bleeds.
 * @property FACING_BLEEDS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_BLEEDS = "facing_bleeds";

/**
 * Used with b.canvasMode() to set the canvas to use the current facing pages minus margins.
 * @property FACING_MARGINS {String}
 * @cat Document
 * @subcat Page
 */
pub.FACING_MARGINS = "facing_margins";

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_BEGINNING {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_BEGINNING = LocationOptions.AT_BEGINNING;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AT_END {String}
 * @cat Document
 * @subcat Page
 */
pub.AT_END = LocationOptions.AT_END;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property BEFORE {String}
 * @cat Document
 * @subcat Page
 */
pub.BEFORE = LocationOptions.BEFORE;

/**
 * Used with b.addPage() to set the position of the new page in the book.
 * @property AFTER {String}
 * @cat Document
 * @subcat Page
 */
pub.AFTER = LocationOptions.AFTER;

/**
* Used with b.go() to set Performance Mode. Disables ScreenRedraw during processing.
* @property MODESILENT {String}
* @cat Environment
* @subcat modes
*/
pub.MODESILENT = "ModeSilent";

/**
 * Used with b.go() to set Performance Mode. Processes Document in background mode. Document will not be visible until the script is done. If you are firing on a open document you'll need to save it before calling b.go(). The document will be removed from the display list and added again after the script is done. In this mode you will likely look at indesign with no open document for quite some time - do not work in indesign during this time. You may want to use b.println("yourMessage") in your script and look at the Console in estk to get information about the process.
 * @property MODEHIDDEN {String}
 * @cat Environment
 * @subcat modes
 */
pub.MODEHIDDEN = "ModeHidden";

/**
 * Default mode. Used with b.go() to set Performance Mode. Processes Document with Screen redraw, use this option to see direct results during the process. This will slow down the process in terms of processing time. This mode was also the default in Versions prior to 0.22
 * @property MODEVISIBLE {String}
 * @cat Environment
 * @subcat modes
 */
pub.MODEVISIBLE = "ModeVisible";
pub.DEFAULTMODE = pub.MODEVISIBLE; // FIXME, DEFAULTMODE shouldn't be public, move init to init()


var ERROR_PREFIX = "\nBasil.js Error -> ",
    WARNING_PREFIX = "### Basil Warning -> ";