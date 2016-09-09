// ----------------------------------------
// Color

/**
 * Sets the color or gradient used to fill shapes.
 * @cat Color
 * @method fill
 * @param  {Color|Gradient|Swatch|Numbers} fillColor  Accepts a color/gradient/swatch or a string with the name of a color. Or values: C,M,Y,K / R,G,B / Grey
 */
pub.fill = function (fillColor) {

  checkNull(fillColor);
  if (fillColor instanceof Color || fillColor instanceof Swatch || fillColor instanceof Gradient) {
    currFillColor = fillColor;
  } else {
    if (arguments.length === 1) {
      currFillColor = pub.color(arguments[0]);
    } else if (arguments.length === 2) {
      currFillColor = pub.color(arguments[0],arguments[1]);
    } else if (arguments.length === 3) {
      currFillColor = pub.color(arguments[0],arguments[1],arguments[2]);
    } else if (arguments.length === 4) {
      currFillColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3]);
    } else if (arguments.length === 5) {
      currFillColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    } else {
      error("b.fill(), wrong parameters. Use: "
        + "R,G,B,name or "
        + "C,M,Y,K,name. "
        + "Grey,name "
        + "Name is optional");
    }
  }
};

/**
 * Disables filling geometry. If both noStroke() and noFill() are called, 
 * newly drawn shapes will be invisible.
 *
 * @cat Color
 * @method noFill
 */
pub.noFill = function () {
  currFillColor = noneSwatchColor;
};

/**
 * Sets the color used to draw lines and borders around shapes.
 * @cat Color
 * @method stroke
 * @param  {Color|Swatch|Numbers} strokeColor  Accepts a Color/swatch or a string with the name of a color. Or values: C,M,Y,K / R,G,B / Grey
 */
pub.stroke = function (strokeColor) {
  checkNull(strokeColor);
  if (strokeColor instanceof Color || strokeColor instanceof Swatch) {
    currStrokeColor = strokeColor;
  } else {
    if (arguments.length === 1) {
      currStrokeColor = pub.color(arguments[0]);
    } else if (arguments.length === 2) {
      currStrokeColor = pub.color(arguments[0],arguments[1]);
    } else if (arguments.length === 3) {
      currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2]);
    } else if (arguments.length === 4) {
      currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3]);
    } else if (arguments.length === 5) {
      currStrokeColor = pub.color(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    } else {
      error("b.stroke(), too many parameters. Use: "
        + "R,G,B,name or "
        + "C,M,Y,K,name. "
        + "Grey,name ");
    }
  }
};

/**
 * Disables drawing the stroke (outline). If both noStroke() and noFill() 
 * are called, nothing will be drawn to the screen.
 * 
 * @cat Color
 * @method noStroke
 */
pub.noStroke = function () {
  currStrokeColor = noneSwatchColor;
};

/**
 * Sets the tint of the color used to fill shapes.
 * 
 * @cat Color
 * @method fillTint
 * @param  {Number} tint Number from 0 to 100
 */
pub.fillTint = function (tint) {
  checkNull(tint);
  if (typeof tint === 'string' || typeof tint === 'number') {
    currFillTint = tint;
  } else {
    error("b.fillTint, not supported type. Please make sure the strokeweight is a number or string");
  }
};

/**
 * Sets the tint of the color used to draw lines and borders around shapes.
 * 
 * @cat Color
 * @method strokeTint
 * @param  {Number} tint Number from 0 to 100
 */
pub.strokeTint = function (tint) {
  checkNull(tint);
  if (typeof tint === 'string' || typeof tint === 'number') {
    currStrokeTint = tint;
  } else {
    error("strokeTint(), not supported type. Please make sure the tint parameter is a number or string");
  }
};

/**
 * Sets the colormode for creating new colors with b.color() to RGB or CMYK. The default color mode is RBG.
 * 
 * @cat Color
 * @method colorMode
 * @param  {Number} colorMode Either b.RGB or b.CMYK
 */
pub.colorMode = function(colorMode) {
  checkNull(colorMode);
  if (arguments.length === 0) return currColorMode;
  if (colorMode === pub.RGB || colorMode === pub.CMYK) {
    currColorMode = colorMode;
  } else {
    error("b.colorMode(), not supported colormode, use: b.RGB or b.CMYK");
  }
};

/**
 * Sets the gradient mode for creating new gradients with b.gradient() to LINEAR or RADIAL. The default gradient mode is LINEAR.
 *
 * @cat Color
 * @method gradientMode
 * @param  {String} gradientMode Either b.LINEAR or b.RADIAL
 */
pub.gradientMode = function(gradientMode) {
  checkNull(gradientMode);
  if (arguments.length === 0) return currGradientMode;
  if (gradientMode === pub.LINEAR || gradientMode === pub.RADIAL) {
    currGradientMode = gradientMode;
  } else {
    error("b.gradientMode(), unsupported gradient mode, use: b.LINEAR or b.RADIAL");
  }
};

/**
 * Creates a new RGB or CMYK color and adds the new color to the document, or gets a color by name from the document. The default color mode is RGB.
 *
 * @cat Color
 * @method color
 * @param  {String|Numbers} Get color: the color name. Create new color: R,G,B,[name] or C,M,Y,K,[name] or Grey,name. Name is always optional
 * @return {Color} found or new color
 */
pub.color = function() {
  var newCol;
  var props = {};
  var a = arguments[0],
      b = arguments[1],
      c = arguments[2],
      d = arguments[3],
      e = arguments[4];
  var colorErrorMsg = "b.color(), wrong parameters. Use:\n"
      + "R,G,B,[name] in b.colorMode(b.RGB) or\n"
      + "C,M,Y,K,[name] in b.colorMode(b.CMYK) or\n"
      + "GREY,[name].\n"
      + "Name is optional.\n"
      + "NB: In InDesign colors don't have an alpha value, use b.opacity() to set alpha.";

  if (arguments.length === 1) {
    // get color by name
    if (typeof a === 'string') {
      newCol = findInCollectionByName(currentDoc().colors, a);
      if (newCol) {
        return newCol;
      } else {
        error("b.color(), a color with the provided name doesn't exist.");
      }
    } else if (typeof a === 'number') {
      // GREY
      if (currColorMode === pub.RGB) {
        a = pub.constrain(a, 0, 255);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a,a,a];
        props.name = "R="+a+" G="+a+" B="+a;
      } else {
        a = pub.constrain(a, 0, 100);
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0,0,0,a];
        props.name = "C="+0+" M="+0+" Y="+0+" K="+a;
      }
    } else {
      error("b.color(), wrong type of first parameter.");
    }

  } else if (arguments.length === 2) {
    // GREY + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a,a,a];
      props.name = b;
    } else {
      a = pub.constrain(a, 0, 100);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [0,0,0,a];
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
      props.colorValue = [a,b,c];
      props.name = "R="+a+" G="+b+" B="+c;
    } else {
      error(colorErrorMsg);
    }
    

  } else if (arguments.length === 4 && typeof d === 'string') {
    // R G B + name
    if (currColorMode === pub.RGB) {
      a = pub.constrain(a, 0, 255);
      b = pub.constrain(b, 0, 255);
      c = pub.constrain(c, 0, 255);
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.RGB;
      props.colorValue = [a,b,c];
      props.name = d;
    } else {
      error(colorErrorMsg);
    }

  } else if (arguments.length === 4 && typeof d === 'number'){
    // C M Y K
    if (currColorMode === pub.CMYK) {
      a = pub.constrain(a, 0, 100);
      b = pub.constrain(b, 0, 100);
      c = pub.constrain(c, 0, 100);      
      d = pub.constrain(d, 0, 100);      
      props.model = ColorModel.PROCESS;
      props.space = ColorSpace.CMYK;
      props.colorValue = [a,b,c,d];
      props.name = "C="+a+" M="+b+" Y="+c+" K="+d;
    } else {
      error(colorErrorMsg);
    }
   
  } else if (arguments.length === 5 && typeof e === 'string' && currColorMode === pub.CMYK) {
    // C M Y K + name
    a = pub.constrain(a, 0, 100);
    b = pub.constrain(b, 0, 100);
    c = pub.constrain(c, 0, 100);      
    d = pub.constrain(d, 0, 100);       
    props.model = ColorModel.PROCESS;
    props.space = ColorSpace.CMYK;
    props.colorValue = [a,b,c,d];
    props.name = e;

  } else {
    error(colorErrorMsg);
  }

  // check whether color was already created and added to colors,
  // keeps the document clean ...
  newCol = findInCollectionByName(currentDoc().colors, props.name);
  if (newCol) {
    newCol.properties = props;
    return newCol;
  } else {
    newCol = currentDoc().colors.add();
    newCol.properties = props;
    return newCol;
  };
};

/**
 * Creates a new gradient and adds it to the document, or gets a gradient by name from the document.
 * If two colors are given as the first two parameters, a gradient is created that blends between these two colors. If an array of colors is used
 * as the first parameter, a gradient with the contained colors will be created. The colors will be distributed evenly. If additionally to this array
 * a second array of gradient stop positions is given, the colors will be positioned at the given gradient stops. Possible gradient stop positions
 * range from 0 to 100. All parameter options allow for an additional name parameter at the end to name the new gradient.
 * If a string is used as the only parameter, the gradient with that name will be returned, if it exists in the document.
 *
 * @cat Color
 * @method gradient
 * @param  {Color|Array|String} c1 First color of the gradient. Alternatively: Array of colors/gradients or name of gradient to get.
 * @param  {Color|Array|String} c2 Second color of the gradient. Alternatively: Array of gradient stop positions (if first parameter is an array of colors).
 * @param  {String} [name] Optional name of the gradient.
 * @return {Gradient} Found or new gradient
 */
pub.gradient = function() {
  var newGrad;
  var props = {};
  var a = arguments[0],
      b = arguments[1],
      c = arguments[2];
  var gradientErrorMsg = "b.gradient(), wrong parameters. Use:\n"
      + "c1,c2,[name] or\n"
      + "arrayOfColors,[name] or\n"
      + "arrayOfColors,arrayOfGradientStops,[name] or\n"
      + "gradientName";

  if (typeof a === 'string' && arguments.length === 1) {
    // get gradient by name
    newGrad = currentDoc().gradients.itemByName(a);
    if (newGrad.isValid) {
      return newGrad;
    } else {
      error("b.gradient(), a gradient with the provided name doesn't exist.");
    }
  } else if (a instanceof Color && b instanceof Color && (typeof c === 'string' || arguments.length === 2)) {
    // c1 and c2
    if (typeof c === 'string') {
      if(currentDoc().colors.itemByName(c).isValid) error('b.gradient(), "' + c + '" already exists as a color. Use another name for the gradient.');
      if(currentDoc().gradients.itemByName(c).isValid) {
        currentDoc().gradients.itemByName(c).remove();
        warning('b.gradient(), a gradient named "' + c + '" already existed. The old gradient is replaced by a new one.')
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
  } else if (a instanceof Array){
    // array of colors
    var customStopLocations = false;
    if(arguments.length > 3) error(gradientErrorMsg);
    if(arguments.length > 1 && !(b instanceof Array || typeof b === 'string')) error(gradientErrorMsg);
    if(arguments.length === 3 && !(typeof c === 'string')) error(gradientErrorMsg);
    if(arguments.length > 1 && b instanceof Array) customStopLocations = true;
    if(customStopLocations && !(a.length === b.length)) error("b.gradient(), arrayOfColors and arrayOfGradientStops need to have the same length.");
    var z = arguments[arguments.length - 1];
    if (typeof z === 'string') {
      if(currentDoc().colors.itemByName(z).isValid) error('b.gradient(), "' + z + '" already exists as a color. Use another name for the gradient.');
      if(currentDoc().gradients.itemByName(z).isValid) {
        currentDoc().gradients.itemByName(z).remove();
        warning('b.gradient(), a gradient named "' + z + '" already existed. The old gradient is replaced by a new one.')
      }
      newGrad = currentDoc().gradients.add({name: z});
    } else {
      newGrad = currentDoc().gradients.add();
    }
    for (var i = 0; i < a.length; i++) {
      if(! (a[i] instanceof Color || a[i] instanceof Swatch)) {
        error("b.gradient(), element #" + (i+1) + " of the given arrayOfColors is not a color or swatch.");
      }
      if(i > newGrad.gradientStops.length - 1) newGrad.gradientStops.add();
      newGrad.gradientStops[i].stopColor = a[i];
      if(customStopLocations){
        if(! (typeof b[i] === 'number')) error("b.gradient(), element #" + (i+1) + " of the given arrayOfGradientStops is not a number.")
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
 * Sets the opacity property of an object.
 * 
 * @cat Color
 * @method opacity
 * @param  {Object} obj The object to set opacity property
 * @param  {Number} opacity The opacity value form 0 to 100
 */
pub.opacity = function(obj, opacity){
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.opacity = opacity;
  } else {
    warning("b.opacity(), the object "+ obj.toString() +" doesn't have an opacity property");
  }
};

/**
 * Sets the Effects blendMode property of an object.
 * 
 * @cat Color
 * @method blendMode
 * @param  {Object} obj The object to set blendMode property
 * @param  {Number} blendMode The blendMode must be one of the InDesign BlendMode enum values:
 *                           BlendMode.NORMAL <br />
 *                           BlendMode.MULTIPLY <br />
 *                           BlendMode.SCREEN <br />
 *                           BlendMode.OVERLAY <br />
 *                           BlendMode.SOFT_LIGHT <br />
 *                           BlendMode.HARD_LIGHT <br />
 *                           BlendMode.COLOR_DODGE <br />
 *                           BlendMode.COLOR_BURN <br />
 *                           BlendMode.DARKEN <br />
 *                           BlendMode.LIGHTEN <br />
 *                           BlendMode.DIFFERENCE <br />
 *                           BlendMode.EXCLUSION <br />
 *                           BlendMode.HUE <br />
 *                           BlendMode.SATURATION <br />
 *                           BlendMode.COLOR <br />
 *                           BlendMode.LUMINOSITY <br />
 */
pub.blendMode = function(obj, blendMode){
  checkNull(obj);
  if (obj.hasOwnProperty("transparencySettings")) {
    obj.transparencySettings.blendingSettings.blendMode = blendMode;
  } else {
    warning("b.blendMode(), the object "+ obj.toString() +" doesn't have a blendMode property");
  }
};

/**
 * Calculates a color or colors between two color at a specific increment. 
 * The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * N.B.: Both color must be either CMYK or RGB.
 * 
 * @cat Color
 * @method lerpColor
 * @param  {Color} c1   Input color 1
 * @param  {Color} c2   Input color 2
 * @param  {Number} amt The Amount to interpolate between the two colors
 * @return {Color} Interpolated color
 */
pub.lerpColor = function (c1, c2, amt) {
  checkNull(c1);
  checkNull(c2);
  if ( (c1 instanceof Color || c1 instanceof Swatch) && 
     (c2 instanceof Color || c2 instanceof Swatch) && 
      typeof amt === 'number') {
    if (c1.space === ColorSpace.CMYK && c2.space === ColorSpace.CMYK) {
      var C1 = c1.colorValue[0];
      var M1 = c1.colorValue[1];
      var Y1 = c1.colorValue[2];
      var K1 = c1.colorValue[3];

      var C2 = c2.colorValue[0];
      var M2 = c2.colorValue[1];
      var Y2 = c2.colorValue[2];
      var K2 = c2.colorValue[3];

      var COut = Math.round( pub.lerp(C1,C2,amt) );
      var MOut = Math.round( pub.lerp(M1,M2,amt) );
      var YOut = Math.round( pub.lerp(Y1,Y2,amt) );
      var KOut = Math.round( pub.lerp(K1,K2,amt) );
      return pub.color(COut,MOut,YOut,KOut);

    } else if (c1.space === ColorSpace.RGB && c2.space === ColorSpace.RGB) {
      var R1 = c1.colorValue[0];
      var G1 = c1.colorValue[1];
      var B1 = c1.colorValue[2];

      var R2 = c2.colorValue[0];
      var G2 = c2.colorValue[1];
      var B2 = c2.colorValue[2];

      var ROut = Math.round( pub.lerp(R1,R2,amt) );
      var GOut = Math.round( pub.lerp(G1,G2,amt) );
      var BOut = Math.round( pub.lerp(B1,B2,amt) );
      return pub.color(ROut,GOut,BOut);

    } else {
      error("b.lerpColor(), both color must be either CMYK or RGB.");
    }
  } else {
    error("b.lerpColor(), wrong parameters. Use: two colors (of the same type) and a number.");
  }
};
