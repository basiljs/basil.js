// ----------------------------------------
// src/includes/typography.js
// ----------------------------------------

// ----------------------------------------
// Typography
// ----------------------------------------

/**
 * @description Creates a text frame on the current layer on the current page in the current document. The text frame gets created in the position specified by the `x` and `y` parameters. The default document font will be used unless a font is set with the `textFont()` function. The default document font size will be used unless a font size is set with the `textSize()` function. Change the color of the text with the `fill()` function. The text displays in relation to the `textAlign()` and `textYAlign()` functions. The `width` and `height` parameters define a rectangular area.
 *
 * @cat     Typography
 * @method  text
 *
 * @param   {String} txt The text content to set in the text frame.
 * @param   {Number|Rectangle|Oval|Polygon|GraphicLine} x x-coordinate of text frame or item to place the text in or graphic line to place the text onto as a text path.
 * @param   {Number} y y-coordinate of text frame
 * @param   {Number} w width of text frame
 * @param   {Number} h height of text frame
 * @return  {TextFrame|TextPath} The created text frame instance
 */
pub.text = function(txt, x, y, w, h) {
  if (!(isString(txt) || isNumber(txt))) {
    error("text(), the first parameter has to be a string! But is something else: " + typeof txt + ". Use: text(txt, x, y, w, h)");
  }

  var textContainer;

  if (x instanceof Rectangle ||
      x instanceof Oval ||
      x instanceof Polygon) {
    x.contentType = ContentType.TEXT_TYPE;
    textContainer = x.getElements()[0];
    textContainer.contents = txt.toString();
  } else if (x instanceof GraphicLine) {
    textContainer = x.textPaths.add();
    textContainer.contents = txt.toString();
  } else if (isNumber(x) && arguments.length === 5) {
    var textBounds = [];
    if (currRectMode === pub.CORNER) {
      textBounds[0] = y;
      textBounds[1] = x;
      textBounds[2] = y + h;
      textBounds[3] = x + w;
    } else if (currRectMode === pub.CORNERS) {
      textBounds[0] = y;
      textBounds[1] = x;
      textBounds[2] = h;
      textBounds[3] = w;
    } else if (currRectMode === pub.CENTER) {
      textBounds[0] = y - (h / 2);
      textBounds[1] = x - (w / 2);
      textBounds[2] = y + (h / 2);
      textBounds[3] = x + (w / 2);
    } else if (currRectMode === pub.RADIUS) {
      textBounds[0] = y - h;
      textBounds[1] = x - w;
      textBounds[2] = y + h;
      textBounds[3] = x + w;
    }

    textContainer = currentPage().textFrames.add(currentLayer());
    textContainer.contents = txt.toString();
    textContainer.geometricBounds = textBounds;
    textContainer.textFramePreferences.verticalJustification = currYAlign;

    if (currRectMode === pub.CENTER || currRectMode === pub.RADIUS) {
      textContainer.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                         AnchorPoint.CENTER_ANCHOR,
                         currMatrix.adobeMatrix(x, y));
    } else {
      textContainer.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                     AnchorPoint.TOP_LEFT_ANCHOR,
                     currMatrix.adobeMatrix(x, y));
    }
  } else {
    error("text(), invalid parameters. Use: text(txt, x, y, w, h) or text(txt, obj).");
  }

  pub.typo(textContainer, {
    appliedFont: currFont,
    pointSize: currFontSize,
    fillColor: currFillColor,
    justification: currAlign,
    leading: currLeading,
    kerningValue: currKerning,
    tracking: currTracking
  });

  return textContainer;
};

// ----------------------------------------
// Typography/Attributes
// ----------------------------------------

/**
 * @description Sets the current horizontal and vertical text alignment.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textAlign
 *
 * @param   {String} align The horizontal text alignment to set. Must be one of the InDesign `Justification` enum values:
 * - `Justification.AWAY_FROM_BINDING_SIDE`
 * - `Justification.CENTER_ALIGN`
 * - `Justification.CENTER_JUSTIFIED`
 * - `Justification.FULLY_JUSTIFIED`
 * - `Justification.LEFT_ALIGN`
 * - `Justification.RIGHT_ALIGN`
 * - `Justification.RIGHT_JUSTIFIED`
 * - `Justification.TO_BINDING_SIDE`
 * @param   {String} [yAlign] The vertical text alignment to set. Must be one of the InDesign `VerticalJustification` enum values:
 * - `VerticalJustification.BOTTOM_ALIGN`
 * - `VerticalJustification.CENTER_ALIGN`
 * - `VerticalJustification.JUSTIFY_ALIGN`
 * - `VerticalJustification.TOP_ALIGN`
 */
pub.textAlign = function(align, yAlign) {
  currAlign = align;
  if (arguments.length === 2) currYAlign = yAlign;
};

/**
 * @description Returns the current font and sets it if argument `fontName` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textFont
 *
 * @param   {String} [fontName] The name of the font to set e.g. Helvetica
 * @param   {String} [fontStyle] The font style e.g. Bold
 * @return  {Font} The current font object
 */
pub.textFont = function(fontName, fontStyle) {

  if (arguments.length === 2) {
    fontName = fontName + "\t" + fontStyle;
  } else if (arguments.length === 1) {
    fontName = fontName + "\tRegular";
  } else if (arguments.length === 0) {
    return currFont;
  } else {
    error("textFont(), wrong parameters. To set font use: fontName, fontStyle. fontStyle is optional.");
  }

  if(app.fonts.itemByName(fontName).status !== FontStatus.INSTALLED) {
    warning("textFont(), font \"" + fontName.replace("\t", " ") + "\" not installed. "
      + "Using current font \"" + currFont.fontFamily + " " + currFont.fontStyleName + "\" instead.");
  } else {
    currFont = app.fonts.itemByName(fontName);
  }

  return currFont;
};

/**
 * @description Returns the current kerning and sets it if argument `kerning` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textKerning
 *
 * @param   {Number} [kerning] The value to set.
 * @return  {Number} The current kerning.
 */
pub.textKerning = function(kerning) {
  if (arguments.length === 1) {
    currKerning = kerning;
  }
  return currKerning;
};

/**
 * @description Returns the spacing between lines of text in units of points and sets it if argument `leading` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textLeading
 *
 * @param   {Number|String} [leading] The spacing between lines of text in units of points or the default InDesign enum value `Leading.AUTO`.
 * @return  {Number|String} The current leading.
 */
pub.textLeading = function(leading) {
  if (arguments.length === 1) {
    currLeading = leading;
  }
  return currLeading;
};

/**
 * @description Returns the current font size in points and sets it if argument `pointSize` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textSize
 *
 * @param   {Number} [pointSize] The size in points to set.
 * @return  {Number} The current point size.
 */
pub.textSize = function(pointSize) {
  if (arguments.length === 1) {
    currFontSize = pointSize;
  }
  return currFontSize;
};

/**
 * @description Returns the current tracking and sets it if argument `tracking` is given.
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  textTracking
 *
 * @param   {Number} [tracking] The value to set.
 * @return  {Number} The current tracking.
 */
pub.textTracking = function(tracking) {
  if (arguments.length === 1) {
    currTracking = tracking;
  }
  return currTracking;
};

/**
 * @description Sets text properties to the given item. If the item is not an instance the text property can be set to, the property gets set to the direct descendants of the given item, e.g. all stories of a given document.
 *
 * If no value is given and the given property is a string, the function acts as a getter and returns the corresponding value(s) in an array. This can either be an array containing the value of the concrete item (e.g. character) the values of the item's descendants (e.g. paragraphs of given text frame).
 *
 * @cat     Typography
 * @subcat  Attributes
 * @method  typo
 *
 * @param   {Document|Spread|Page|Layer|Story|TextFrame|Text} item The object to apply the property to.
 * @param   {String|Object} property The text property name or an object of key/value property/value pairs. If property is a string and no value is given, the function acts as getter.
 * @param   {String|Number|Object} [value] The value to apply to the property.
 * @return  {String[]|Number[]|Object[]} The property value(s) if the function acts as getter or the items the property was assigned to.
 */
pub.typo = function(item, property, value) {
  var result = [],
    actsAsGetter = typeof property === "string" && (value === undefined || value === null),
    getOrSetProperties = function(textItem) {
      if (actsAsGetter) {
        result.push(textItem[property]);
      } else {
        setProperties(textItem);
      }
    },
    setProperties = function(textItem) {
      if (typeof property === "string") {
        result.push(textItem);
        setProperty(textItem, property, value);
      } else if (typeof property === "object") {
        result.push(textItem);
        for (var prop in property) {
          setProperty(textItem, prop, property[prop]);
        }
      }
    },
    setProperty = function(textItem, prop, val) {
      textItem[prop] = val;
    };

  if(typeof item === "string") error("typo() cannot work on strings. Please pass a Text object to modify.");

  if(!isValid(item)) {
    warning("typo(), invalid object passed");
    return;
  }

  if (item instanceof Document ||
      item instanceof Spread ||
      item instanceof Page ||
      item instanceof Layer) {
    forEach(item.textFrames, function(textFrame) {
      pub.typo(textFrame, property, value);
    });
  } else if (item instanceof Story ||
             item instanceof TextFrame) {
    var paras = item.paragraphs;
    // loop backwards to prevent invalid object reference error when
    // start of para is overflown in "invisible" textFrame area after
    // applying prop to previous para(s)
    for (var i = paras.length - 1; i >= 0; i--) {
      getOrSetProperties(paras[i]);
    }
  } else if (isText(item)) {
    getOrSetProperties(item);
  }
  return result;
};

// ----------------------------------------
// Typography/Styles
// ----------------------------------------

/**
 * @description Applies a character style to the given text object, text frame or story. The character style can be given as name or as character style instance.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  applyCharacterStyle
 *
 * @param   {TextFrame|TextObject|Story} text The text frame, text object or story to apply the style to.
 * @param   {CharacterStyle|String} style A character style instance or the name of the character style to apply.
 * @return  {Text} The text that the style was applied to.
 */

pub.applyCharacterStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allCharacterStyles, name);
    if(!style) {
      error("applyCharacterStyle(), a character style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof CharacterStyle)) {
    error("applyCharacterStyle(), wrong parameters. Use: textObject|textFrame|story, characterStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.characters.everyItem();
  }

  text.appliedCharacterStyle = style;

  return text;
};

/**
 * @description Applies a paragraph style to the given text object, text frame or story. The paragraph style can be given as name or as paragraph style instance.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  applyParagraphStyle
 *
 * @param   {TextFrame|TextObject|Story} text The text frame, text object or story to apply the style to.
 * @param   {ParagraphStyle|String} style A paragraph style instance or the name of the paragraph style to apply.
 * @return  {Text} The text that the style was applied to.
 */

pub.applyParagraphStyle = function(text, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allParagraphStyles, name);
    if(!style) {
      error("applyParagraphStyle(), a paragraph style named \"" + name + "\" does not exist.");
    }
  }

  if(!(pub.isText(text) || text instanceof TextFrame || text instanceof Story) || !(style instanceof ParagraphStyle)) {
    error("applyParagraphStyle(), wrong parameters. Use: textObject|textFrame|story, paragraphStyle|name");
  }

  if(text instanceof TextFrame) {
    text = text.paragraphs.everyItem();
  }

  text.appliedParagraphStyle = style;

  return text;
};

/**
 * @description Returns the character style of a given text object or the character style with the given name. If a character style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the character style's properties.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  characterStyle
 *
 * @param   {Text|String} textOrName A text object whose style to return or the name of the character style to return.
 * @param   {Object} [props] Optional: An object of property name/value pairs to set the style's properties.
 * @return  {CharacterStyle} The character style instance.
 */
pub.characterStyle = function(textOrName, props) {
  var styleErrorMsg = "characterStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(isText(textOrName)) {
    // text object is given
    style = textOrName.appliedCharacterStyle;
  } else if(isString(textOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allCharacterStyles, textOrName);
    if(!style) {
      style = currentDoc().characterStyles.add({name: textOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("characterStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * @description Returns the paragraph style of a given text object or the paragraph style with the given name. If a paragraph style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the paragraph style's properties.
 *
 * @cat     Typography
 * @subcat  Styles
 * @method  paragraphStyle
 *
 * @param   {Text|String} textOrName A text object whose style to return or the name of the paragraph style to return.
 * @param   {Object} [props] Optional: An object of property name/value pairs to set the style's properties.
 * @return  {ParagraphStyle} The paragraph style instance.
 */
pub.paragraphStyle = function(textOrName, props) {
  var styleErrorMsg = "paragraphStyle(), wrong parameters. Use: textObject|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(isText(textOrName)) {
    // text object is given
    style = textOrName.appliedParagraphStyle;
  } else if(isString(textOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allParagraphStyles, textOrName);
    if(!style) {
      style = currentDoc().paragraphStyles.add({name: textOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("paragraphStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

// ----------------------------------------
// Typography/Constants
// ----------------------------------------

/**
 * @description Returns a Lorem ipsum string that can be used for testing.
 *
 * @cat      Typography
 * @subcat   Constants
 * @property LOREM {String}
 */
pub.LOREM = "Lorem ipsum is dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
