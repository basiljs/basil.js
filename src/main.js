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

// at run time, the basil.js script can be only entered the first time it is run
// consecutive, recursive calls (necessary to load global variables) will not enter the script
if(!$.global.hasOwnProperty("basilTopLevelExecution")) {

  // set global property to make sure recursive calls don't enter the script
  $.global.basilTopLevelExecution = true;

  // clearing global space if it is still populated from previous run of a loop script
  // to ensure basil methods work properly
  if($.global.basilGlobal) {
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

  if(!$.global.hasOwnProperty("basilTest")) {
    // load global vars of the user script
    var sourceScript;
    try {
      app.nonExistingProperty;
    } catch(e) {
      sourceScript = e.source;
    }

    app.doScript(sourceScript);
  }

  // all potential recursive calls happen before this point, global property can be safely deleted now
  delete $.global.basilTopLevelExecution;

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

}
