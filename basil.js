
/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  Bringing the spirit of the Processing visualization language to Adobe Indesign.

  License        - MIT

  Core
                 - Ted Davis http://teddavis.org
                 - Benedikt Groß http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
  Members
                 - Philipp Adrian http://www.philippadrian.com/
                 - be:screen GmbH http://bescreen.de
                 - Stefan Landsbek http://47nord.de
                 - Ken Frederick http://kennethfrederick.de/

  Web Site       - http://basiljs.ch
  Github Repo.   - https://github.com/basiljs/basil.js
  Processing     - http://processing.org
  Processing.js  - http://processingjs.org

  basil.js was conceived and is generously supported by
  The Visual Communication Institute / The Basel School of Design
  Department of the Academy of Art and Design Basel (HGK FHNW)

  http://thebaselschoolofdesign.ch

  Please note: Big general parts e.g. random() of the basil.js source code are copied
  from processing.js by the Processing.js team. We would have had a hard time
  to figure all of that out on our own!

  Supported Adobe Indesign versions: CS 5, CS 5.5 and CS 6

  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/

#target "InDesign";

(function(glob, app, undef) {

  /**
   * @class b
   * @static
   */
  var pub = {};

  /**
   * The basil version
   * @property VERSION {String}
   * @cat Environment
   */
  pub.VERSION = "1.0.10";

/**
 * A more verbose error reporting
 * @property VERBOSE_ERRORS {Boolean}
 * @cat Environment
 */
  pub.VERBOSE_ERRORS = true; // gives the user more verbose errors

  // both are helpfull for developers/advanced users
  // for the beginner this can be a bit to much
  // so they should be disabled in a distribution version
  pub.DEBUG = true; // this is a debug flag for basil

  #include "includes/constants.js";
  #include "includes/public-vars.js";
  #include "includes/private-vars.js";
  #include "includes/global-functions.js";

  #include "includes/core.js";

  #include "includes/structure.js";
  #include "includes/environment.js";
  #include "includes/data.js";
  #include "includes/shape.js";
  #include "includes/color.js";
  #include "includes/typography.js";
  #include "includes/image.js";
  #include "includes/math.js";
  #include "includes/transformation.js";
  #include "includes/ui.js";

  init();

})(this, app);

