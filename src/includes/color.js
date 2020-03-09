// ----------------------------------------
// src/includes/color.js
// ----------------------------------------

// ----------------------------------------
// Color
// ----------------------------------------

/**
 * @summary Sets a background on the current page.
 * @description Sets a background on the current page. The function takes the current canvas mode into account, so setting canvas mode to `FACING_PAGES` beforehand would result in the background to be drawn across the entire spread. The background will be placed on a background layer that basil creates automatically.
 *
 * @cat     Color
 * @method  background
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} bgColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 * @return  {Rectangle} The newly created background shape.
 */
pub.background = function (bgColor) {

  var pLayer = currentLayer();
  var bgLayerName = "basil.js Background";
  var bgLayer = pub.layer(bgLayerName);

  var lockedState = bgLayer.locked;
  bgLayer.locked = false;
  pub.arrange(bgLayer, pub.BACK);
  
  var bgItems = bgLayer.pageItems;
  for(var i=0; i < bgItems.length; i++){
    var curItem = bgItems[i];
    if(curItem.parentPage.name === currentPage().name){
      curItem.remove();
    }
  }

  var backgroundShape = pub.rect(0, 0, pub.width, pub.height);
  backgroundShape.fillColor = getSwatch("background", arguments);
  backgroundShape.strokeWeight = 0;

  bgLayer.locked = true;
  if(pLayer.name != bgLayerName){
    pub.layer(pLayer);
  }else{
    pub.layer('Layer 1');
  }
  
  return backgroundShape;
};

/**
 * @summary Sets the blend mode of a page item.
 * @description Sets the Effects blendMode property of an object.
 *
 * @cat     Color
 * @method  blendMode
 *
 * @param   {Object} obj The object to set blendMode of.
 * @param   {Number} blendMode The blendMode must be one of the InDesign BlendMode enum values:
 *   - `BlendMode.NORMAL`
 *   - `BlendMode.MULTIPLY`
 *   - `BlendMode.SCREEN`
 *   - `BlendMode.OVERLAY`
 *   - `BlendMode.SOFT_LIGHT`
 *   - `BlendMode.HARD_LIGHT`
 *   - `BlendMode.COLOR_DODGE`
 *   - `BlendMode.COLOR_BURN`
 *   - `BlendMode.DARKEN`
 *   - `BlendMode.LIGHTEN`
 *   - `BlendMode.DIFFERENCE`
 *   - `BlendMode.EXCLUSION`
 *   - `BlendMode.HUE`
 *   - `BlendMode.SATURATION`
 *   - `BlendMode.COLOR`
 *   - `BlendMode.LUMINOSITY`
 */
pub.blendMode = function(obj, blendMode) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.blendMode = blendMode;
  } else {
    warning("blendMode(), the object " + obj.toString() + " doesn't have a blendMode property");
  }
};

/**
 * @summary Gets or creates a color.
 * @description Creates a new RGB / CMYK color and adds it to the document, or gets a color by name from the document. The default color mode is RGB.
 *
 * @cat     Color
 * @method  color
 *
 * @param   {String|Numbers} Get color: the color name. Create new color: GRAY,[name] / R,G,B,[name] / C,M,Y,K,[name]. Name is always optional.
 * @return  {Color} Found or new color
 */
pub.color = function() {
  var newCol;
  var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2],
    d = arguments[3],
    e = arguments[4];
  var colorErrorMsg = "color(), wrong parameters. Use:\n"
      + "GRAY,[name] or \n"
      + "R,G,B,[name] in colorMode(RGB) or\n"
      + "C,M,Y,K,[name] in colorMode(CMYK).\n"
      + "Name is optional.\n"
      + "NB: In InDesign colors don't have an alpha value, use opacity() to set alpha.";

  if (arguments.length === 1) {
    // get color by name
    if (typeof a === "string") {
      newCol = currentDoc().colors.itemByName(a); // check color
      if (newCol.isValid) {
        return newCol;
      } else {
        error("color(), a color with the provided name doesn't exist.");
      }
    } else if (typeof a === "number") {
      // GRAY
      if (currColorMode === pub.RGB) {
        a = pub.constrain(a, 0, 255);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a, a, a];
        props.name = "R=" + a + " G=" + a + " B=" + a;
      } else {
        a = pub.constrain(a, 0, 100);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0, 0, 0, a];
        props.name = "C=" + 0 + " M=" + 0 + " Y=" + 0 + " K=" + a;
      }
    } else {
      error("color(), wrong type of first parameter.");
    }

  } else if (arguments.length === 2) {
    // GRAY + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, a, a];
      props.name = b;
    } else {
      a = pub.constrain(a, 0, 100);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [0, 0, 0, a];
      props.name = b;
    }

  } else if (arguments.length === 3) {
    // R G B
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      b = pub.constrain(b, 0, 255);
      c = pub.constrain(c, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, b, c];
      props.name = "R=" + a + " G=" + b + " B=" + c;
    } else {
      error(colorErrorMsg);
    }


  } else if (arguments.length === 4 && typeof d === "string") {
    // R G B + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      b = pub.constrain(b, 0, 255);
      c = pub.constrain(c, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a, b, c];
      props.name = d;
    } else {
      error(colorErrorMsg);
    }

  } else if (arguments.length === 4 && typeof d === "number") {
    // C M Y K
    if (currColorMode === pub.CMYK) {
      a = pub.constrain(a, 0, 100);
      b = pub.constrain(b, 0, 100);
      c = pub.constrain(c, 0, 100);
      d = pub.constrain(d, 0, 100);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [a, b, c, d];
      props.name = "C=" + a + " M=" + b + " Y=" + c + " K=" + d;
    } else {
      error(colorErrorMsg);
    }

  } else if (arguments.length === 5 && typeof e === "string" && currColorMode === pub.CMYK) {
    // C M Y K + name
    a = pub.constrain(a, 0, 100);
    b = pub.constrain(b, 0, 100);
    c = pub.constrain(c, 0, 100);
    d = pub.constrain(d, 0, 100);
    props.model = ColorModel.PROCESS;
    props.space = ColorSpace.CMYK;
    props.colorValue = [a, b, c, d];
    props.name = e;

  } else {
    error(colorErrorMsg);
  }

  // check whether color was already created and added to colors,
  // keeps the document clean ...
  newCol = currentDoc().colors.itemByName(props.name);
  if (!newCol.isValid) {
    newCol = currentDoc().colors.add();
  }
  newCol.properties = props;
  return newCol;
};

/**
 * @summary Sets the color mode to RGB or CMYK.
 * @description Sets the colormode for creating new colors with color() to RGB or CMYK. The default color mode is RGB.
 *
 * @cat     Color
 * @method  colorMode
 *
 * @param   {Number} colorMode RGB or CMYK.
 */
pub.colorMode = function(colorMode) {
  checkNull(colorMode);
  if (arguments.length === 0) {
    return currColorMode;
  }
  if (colorMode === pub.RGB || colorMode === pub.CMYK) {
    currColorMode = colorMode;
  } else {
    error("colorMode(), unsupported colormode, use: RGB or CMYK");
  }
};

/**
 * @summary Sets the fill color of shapes and text.
 * @description Sets the color or gradient used to fill shapes.
 *
 * @cat     Color
 * @method  fill
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} fillColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 * @param   {String} [name] If created with numbers, a custom swatch name can be given.
 */
pub.fill = function (fillColor) {
  currFillColor = getSwatch("fill", arguments);
};

/**
 * @summary Sets a tint for the current fill color.
 * @description Sets the tint of the color used to fill shapes.
 *
 * @cat     Color
 * @method  fillTint
 *
 * @param   {Number} tint Number from 0 to 100
 */
pub.fillTint = function (tint) {
  checkNull(tint);
  if (typeof tint === "string" || typeof tint === "number") {
    currFillTint = tint;
  } else {
    error("fillTint(), unsupported type. Please make sure the fillTint is a number or string");
  }
};

/**
 * @summary Gets or creates a gradient.
 * @description Creates a new gradient and adds it to the document, or gets a gradient by name from the document.
 * If two colors are given as the first two parameters, a gradient is created that blends between these two colors. If an array of colors is used as the first parameter, a gradient with the contained colors will be created. The colors will be distributed evenly. If additionally to this array a second array of gradient stop positions is given, the colors will be positioned at the given gradient stops. Possible gradient stop positions range from 0 to 100. All parameter options allow for an additional name parameter at the end to name the new gradient. If a string is used as the only parameter, the gradient with that name will be returned, if it exists in the document.
 *
 * @cat     Color
 * @method  gradient
 *
 * @param   {Color|Array|String} c1 First color of the gradient. Alternatively: Array of colors/gradients or name of gradient to get.
 * @param   {Color|Array|String} c2 Second color of the gradient. Alternatively: Array of gradient stop positions (if first parameter is an array of colors).
 * @param   {String} [name] Optional name of the gradient.
 * @return  {Gradient} Found or new gradient
 */
pub.gradient = function() {
  var newGrad;
  // var props = {};
  var a = arguments[0],
    b = arguments[1],
    c = arguments[2];
  var gradientErrorMsg = "gradient(), wrong parameters. Use:\n"
      + "c1,c2,[name] or\n"
      + "arrayOfColors,[name] or\n"
      + "arrayOfColors,arrayOfGradientStops,[name] or\n"
      + "gradientName";

  if (typeof a === "string" && arguments.length === 1) {
    // get gradient by name
    newGrad = currentDoc().gradients.itemByName(a);
    if (newGrad.isValid) {
      return newGrad;
    } else {
      error("gradient(), a gradient with the provided name doesn't exist.");
    }
  } else if (a instanceof Color && b instanceof Color && (typeof c === "string" || arguments.length === 2)) {
    // c1 and c2
    if (typeof c === "string") {
      if(currentDoc().colors.itemByName(c).isValid) {
        error("gradient(), \"" + c + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(c).isValid) {
        currentDoc().gradients.itemByName(c).remove();
        warning("gradient(), a gradient named \"" + c + "\" already existed. The old gradient is replaced by a new one.");
      }
      newGrad = currentDoc().gradients.add({name: c});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    newGrad.gradientStops[0].stopColor = a;
    newGrad.gradientStops[1].stopColor = b;
    if(currGradientMode === pub.LINEAR) {
      newGrad.type = GradientType.LINEAR;
    } else {
      newGrad.type = GradientType.RADIAL;
    }
    return newGrad;
  } else if (a instanceof Array) {
    // array of colors
    var customStopLocations = false;
    if(arguments.length > 3) {
      error(gradientErrorMsg);
    }
    if(arguments.length > 1 && !(b instanceof Array || typeof b === "string")) {
      error(gradientErrorMsg);
    }
    if(arguments.length === 3 && !(typeof c === "string")) {
      error(gradientErrorMsg);
    }
    if(arguments.length > 1 && b instanceof Array) {
      customStopLocations = true;
    }
    if(customStopLocations && !(a.length === b.length)) {
      error("gradient(), arrayOfColors and arrayOfGradientStops need to have the same length.");
    }
    var z = arguments[arguments.length - 1];
    if (typeof z === "string") {
      if(currentDoc().colors.itemByName(z).isValid) {
        error("gradient(), \"" + z + "\" already exists as a color. Use another name for the gradient.");
      }
      if(currentDoc().gradients.itemByName(z).isValid) {
        currentDoc().gradients.itemByName(z).remove();
        warning("gradient(), a gradient named \"" + z + "\" already existed. The old gradient is replaced by a new one.");
      }
      newGrad = currentDoc().gradients.add({name: z});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    for (var i = 0; i < a.length; i++) {
      if(!(a[i] instanceof Color || a[i] instanceof Swatch)) {
        error("gradient(), element #" + (i + 1) + " of the given arrayOfColors is not a color or swatch.");
      }
      if(i > newGrad.gradientStops.length - 1) {
        newGrad.gradientStops.add();
      }
      newGrad.gradientStops[i].stopColor = a[i];
      if(customStopLocations) {
        if(!(typeof b[i] === "number")) {
          error("gradient(), element #" + (i + 1) + " of the given arrayOfGradientStops is not a number.");
        }
        newGrad.gradientStops[i].location = pub.constrain(b[i], 0, 100);
      } else {
        newGrad.gradientStops[i].location = pub.map(i, 0, a.length - 1, 0, 100);
      }
    }
    if(currGradientMode === pub.LINEAR) {
      newGrad.type = GradientType.LINEAR;
    } else {
      newGrad.type = GradientType.RADIAL;
    }
    return newGrad;
  } else {
    error(gradientErrorMsg);
  }
};

/**
 * @summary Sets the gradient mode to linear or radial.
 * @description Sets the gradient mode for gradient() to `LINEAR` or `RADIAL`. The default gradient mode is `LINEAR`.
 *
 * @cat     Color
 * @method  gradientMode
 *
 * @param   {String} gradientMode `LINEAR` or `RADIAL`.
 */
pub.gradientMode = function(gradientMode) {
  checkNull(gradientMode);
  if (arguments.length === 0) {
    return currGradientMode;
  }
  if (gradientMode === pub.LINEAR || gradientMode === pub.RADIAL) {
    currGradientMode = gradientMode;
  } else {
    error("gradientMode(), unsupported gradient mode, use: LINEAR or RADIAL");
  }
};

/**
 * @summary Calculates colors between two other colors.
 * @description Calculates a color or colors between two colors at a specific increment.
 * The `amt` parameter is the amount to interpolate between the two values where 0.0 equals the first color, 0.5 is half-way in between and 1.0 equals the second color. N.B.: Both colors must be either CMYK or RGB.
 *
 * @cat     Color
 * @method  lerpColor
 *
 * @param   {Color} c1 Input color 1.
 * @param   {Color} c2 Input color 2.
 * @param   {Number} amt The amount to interpolate between the two colors.
 * @return  {Color} Interpolated color
 */
pub.lerpColor = function (c1, c2, amt) {
  checkNull(c1);
  checkNull(c2);
  if ((c1 instanceof Color || c1 instanceof Swatch) &&
     (c2 instanceof Color || c2 instanceof Swatch) &&
      typeof amt === "number") {
    if (c1.space === ColorSpace.CMYK && c2.space === ColorSpace.CMYK) {
      var C1 = c1.colorValue[0];
      var M1 = c1.colorValue[1];
      var Y1 = c1.colorValue[2];
      var K1 = c1.colorValue[3];

      var C2 = c2.colorValue[0];
      var M2 = c2.colorValue[1];
      var Y2 = c2.colorValue[2];
      var K2 = c2.colorValue[3];

      var COut = Math.round(pub.lerp(C1, C2, amt));
      var MOut = Math.round(pub.lerp(M1, M2, amt));
      var YOut = Math.round(pub.lerp(Y1, Y2, amt));
      var KOut = Math.round(pub.lerp(K1, K2, amt));
      return pub.color(COut, MOut, YOut, KOut);

    } else if (c1.space === ColorSpace.RGB && c2.space === ColorSpace.RGB) {
      var R1 = c1.colorValue[0];
      var G1 = c1.colorValue[1];
      var B1 = c1.colorValue[2];

      var R2 = c2.colorValue[0];
      var G2 = c2.colorValue[1];
      var B2 = c2.colorValue[2];

      var ROut = Math.round(pub.lerp(R1, R2, amt));
      var GOut = Math.round(pub.lerp(G1, G2, amt));
      var BOut = Math.round(pub.lerp(B1, B2, amt));
      return pub.color(ROut, GOut, BOut);

    } else {
      error("lerpColor(), both colors must be either CMYK or RGB.");
    }
  } else {
    error("lerpColor(), wrong parameters. Use: two colors (of the same type) and a number.");
  }
};

/**
 * @summary Disables fill color of shapes and text.
 * @description Disables filling geometry. If both `noStroke()` and `noFill()` are called, newly drawn shapes will be invisible.
 *
 * @cat     Color
 * @method  noFill
 */
pub.noFill = function () {
  currFillColor = noneSwatchColor;
};

/**
 * @summary Disables drawing a stroke around shapes.
 * @description Disables drawing the stroke. If both noStroke() and noFill() are called, newly drawn shapes will be invisible.
 *
 * @cat     Color
 * @method  noStroke
 */
pub.noStroke = function () {
  currStrokeColor = noneSwatchColor;
};

/**
 * @summary Sets the opacity of a page item.
 * @description Sets the opacity property of an object.
 *
 * @cat     Color
 * @method  opacity
 *
 * @param   {Object} obj The object to set opacity of.
 * @param   {Number} opacity The opacity value from 0 to 100.
 */
pub.opacity = function(obj, opacity) {
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.opacity = opacity;
  } else {
    warning("opacity(), the object " + obj.toString() + " doesn't have an opacity property");
  }
};

/**
 * @summary Sets the stroke color.
 * @description Sets the color or gradient used to draw lines and borders around shapes.
 *
 * @cat     Color
 * @method  stroke
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} strokeColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 */
pub.stroke = function (strokeColor) {
  currStrokeColor = getSwatch("stroke", arguments);
};

/**
 * @summary Sets the tint of the current stroke color.
 * @description Sets the tint of the color used to draw lines and borders around shapes.
 *
 * @cat     Color
 * @method  strokeTint
 *
 * @param   {Number} tint Number from 0 to 100.
 */
pub.strokeTint = function (tint) {
  checkNull(tint);
  if (typeof tint === "string" || typeof tint === "number") {
    currStrokeTint = tint;
  } else {
    error("strokeTint(), unsupported type. Please make sure the strokeTint parameter is a number or string");
  }
};

/**
 * @summary Gets a color swatch.
 * @description Gets a swatch by name.
 *
 * @cat     Color
 * @method  swatch
 *
 * @param   {String} swatchName Returns the swatch color/gradient for a given name by string.
 */
pub.swatch = function(){
  var newSwatch;
  var props = {};
  if (arguments.length === 1) {
    var a = arguments[0];
    if (typeof a === "string") {
      newSwatch = currentDoc().swatches.itemByName(a);
      if(newSwatch.isValid){
          return newSwatch;
        }else{
          error("A swatch with the provided name doesn't exist.");
        }
    }else{
      error("swatch() requires a string, the name of an existing swatch.");
    }
  }
}

// ----------------------------------------
// Output Private
// ----------------------------------------

var getSwatch = function(callingFunctionName, args) {

  var colorParam = args[0];
  var swatch;

  if (colorParam instanceof Color ||
      colorParam instanceof Swatch ||
      colorParam instanceof Gradient) {
    swatch = colorParam;
  } else if (isString(colorParam)){
    swatch = pub.swatch(colorParam);
  } else if(isNumber(colorParam) && args.length <= 5){
    swatch = pub.color.apply(null, args);
  } else {
      error(callingFunctionName + "(), wrong parameters. Use:\n"
        + "Color, Swatch or Gradient or\n"
        + "Swatch name or\n"
        + "GRAY, [name] or\n"
        + "R, G, B, [name] or\n"
        + "C, M, Y, K, [name].\n"
        + "Name is optional.");
  }

  return swatch;
}
