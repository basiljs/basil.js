// ----------------------------------------
// Color

/**
 * Sets the color used to fill shapes.
 * @cat Color
 * @method fill
 * @param  {Color|Swatch|Numbers} fillColor  Accepts a Color/swatch or a string with the name of a color. Or values: C,M,Y,K / R,G,B / Grey
 */
pub.fill = function (fillColor) {
  if (fillColor instanceof Color || fillColor instanceof Swatch) {
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
  if (arguments.length === 0) return currColorMode;
  if (colorMode === pub.RGB || colorMode === pub.CMYK) {
    currColorMode = colorMode;
  } else {
    error("b.colorMode(), not supported colormode, use: b.RGB or b.CMYK");
  }
};

/**
 * Creates a new RGB or CMYK color and adds the new color to the document, or gets a color by name from the document. The default color mode is RBG.
 *
 * @cat Color
 * @method color
 * @param  {String|Numbers} Get color: the color name. Create new color: R,G,B,name or C,M,Y,K,name or Grey,name. Name is always optional
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
  var colorErrorMsg = "b.color(), wrong parameters. Use: "
      + "R,G,B,name in b.colorMode(b.RGB) or "
      + "C,M,Y,K,name in b.colorMode(b.CMYK) or "
      + "GREY,name. "
      + "Name is optional. "
      + "NB: In indesign colors don't have an alpha value, use b.opacity() to set alpha.";

  if (arguments.length === 1) {
    // get color by name
    if (typeof a === 'string') {
      newCol = findInCollectionByName(currentDoc().swatches, a);
      if (newCol) {
        return newCol;
      } else {
        error("b.color(), a swatch with the provided name doesn't exist.");
      }
    } else if (typeof a === 'number') {
      // GREY
      if (currColorMode === pub.RGB) {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.RGB;
        props.colorValue = [a,a,a];
        props.name = "R="+a+" G="+a+" B="+a;
      } else {
        props.model = ColorModel.PROCESS;
        props.space = ColorSpace.CMYK;
        props.colorValue = [0,0,0,a];
        props.name = "C="+0+" M="+0+" Y="+0+" K="+a;
      }
    } else {
      error("b.color(), wrong type of first paramter.");
    }

  } else if (arguments.length === 2) {
    // GREY + with custom name
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
    a = pub.constrain(a, 0, 255);
    b = pub.constrain(b, 0, 255);
    c = pub.constrain(c, 0, 255);
    props.model = ColorModel.PROCESS;
    props.space = ColorSpace.RGB;
    props.colorValue = [a,b,c];
    props.name = d; 

  // C M Y K
  } else if (arguments.length === 4 && typeof d === 'number'){
    a = pub.constrain(a, 0, 100);
    b = pub.constrain(b, 0, 100);
    c = pub.constrain(c, 0, 100);      
    d = pub.constrain(d, 0, 100);      
    props.model = ColorModel.PROCESS;
    props.space = ColorSpace.CMYK;
    props.colorValue = [a,b,c,d];
    props.name = "C="+a+" M="+b+" Y="+c+" K="+d;
   
  // C M Y K + name
  } else if (arguments.length === 5) {
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
 * Sets the opacity property of an object.
 * 
 * @cat Color
 * @method opacity
 * @param  {Object} obj The object to set opacity property
 * @param  {Number} opacity The opacity value form 0 to 100
 */
pub.opacity = function(obj, opacity){
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
