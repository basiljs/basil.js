/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  Bringing the spirit of the Processing visualization language to Adobe InDesign.

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
                 - Timo Rychert http://timorychert.de/
                 - Fabian Morón Zirfas http://fabianmoronzirfas.me/

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

  The Lorem ipsum string of LOREM is taken from https://indieweb.org/Lorem_ipsum and
  is available under a CC0 public domain dedication.

  Supported Adobe InDesign versions: CS 5+

  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/
/* globals init */
// @target "InDesign";


// clearing global space if it is still populated from previous run of a loop script
// to ensure basil methods work properly
if($.engineName === "loop" && $.global.basilGlobal) {
  for (var i = basilGlobal.length - 1; i >= 0; i--) {
    if($.global.hasOwnProperty(basilGlobal[i])) {
      try{
        delete $.global[basilGlobal[i]];
      } catch(e) {
        // could not delete
      }
    }
  }
  delete $.global.basilGlobal;
}

// load global vars of the user script
if(($.global.setup instanceof Function || $.global.loop instanceof Function) && app.activeScript.name !== "jsRunner.jsx") {
  var f = app.activeScript;
  f.open("r");
  var data = f.read();
  f.close();

  var userScript = data.
    replace(/[\s\S]*[#@]\s*include\s+.+basil\.js";*/, "").
    replace(/function\s+setup[\s\S]*/g, "");
  app.doScript(userScript);
} else if ($.global.setup instanceof Function) {
  $.writeln("### Basil Warning -> basil could not load global variables. If you need to use global variables outside of setup() and loop(), execute your script from the Extend Script Toolkit. If you are using draw(), there is no need to use setup(). Move all your global variables into draw() instead.");
}


(function() {

var pub = {};

/**
 * The basil version
 * @property VERSION {String}
 * @cat Environment
 */
pub.VERSION = "1.1.0";

// @include "includes/constants.js";
// @include "includes/public-vars.js";
// @include "includes/private-vars.js";
// @include "includes/global-functions.js";

// @include "includes/core.js";

// @include "includes/structure.js";
// @include "includes/environment.js";
// @include "includes/data.js";
// @include "includes/shape.js";
// @include "includes/color.js";
// @include "includes/typography.js";
// @include "includes/image.js";
// @include "includes/math.js";
// @include "includes/transformation.js";
// @include "includes/ui.js";

init();

})();
