
/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  An attempt to port the spirit of the Processing visualization language to Adobe Indesign.
  
  License        - MIT

  Developers     
                 - Ted Davis http://teddavis.org
                 - Benedikt Groß http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
  Contributers   
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

  #include "lib/core.jsx";

  #include "lib/constants.jsx";
  #include "lib/public-vars.jsx";
  #include "lib/private-vars.jsx";
  #include "lib/global-functions.jsx";
  
  #include "lib/structure.jsx";
  #include "lib/environment.jsx";
  #include "lib/data.jsx";
  #include "lib/shape.jsx";
  #include "lib/color.jsx";
  #include "lib/typography.jsx";
  #include "lib/image.jsx";
  #include "lib/math.jsx";
  #include "lib/transformation.jsx";
  #include "lib/ui.jsx";

  init();
  
})(this, app);

