// ----------------------------------------
// Typography

/**
 * Creates a text frame on the current layer on the current page in the current document. 
 * The text frame gets created in the position specified by the x and y parameters.
 * The default document font will be used unless a font is set with the textFont() function. 
 * The default document font size will be used unless a font size is set with the textSize() function. 
 * Change the color of the text with the fill() function.
 * The text displays in relation to the textAlign() and textYAlign() functions. 
 * The width and height parameters define a rectangular area.
 * 
 * @cat Typography
 * @method text
 * @param  {String} txt The text content to set in the text frame.
 * @param  {Number} x   x-coordinate of text frame
 * @param  {Number} y   y-coordinate of text frame
 * @param  {Number} w   width of text frame
 * @param  {Number} h   height of text frame
 * @return {TextFrame}  The created text frame instance
 */
pub.text = function(txt, x, y, w, h) {
  if (arguments.length !== 5) error("b.text(), not enough parameters to draw a text! Use: b.text(txt, x, y, w, h)");
  if (!(isString(txt) || isNumber(txt))) warning("b.text(), the first parameter has to be a string! But is something else: "+ typeof txt +". Use: b.text(txt, x, y, w, h)");
  var textFrame = currentPage().textFrames.add( currentLayer() );
  with (textFrame) {
    contents = txt.toString();
    geometricBounds = [y, x, (y+h), (x+w)];
    textFramePreferences.verticalJustification = currYAlign;
  }
  pub.typo(textFrame, {
    'appliedFont': currFont,
    'pointSize': currFontSize,
    'fillColor': currFillColor,
    'justification': currAlign,
    'leading': currLeading,
    'kerningValue': currKerning,
    'tracking': currTracking
  });

  
  if (currAlign === Justification.CENTER_ALIGN || currAlign === Justification.CENTER_JUSTIFIED) {
    textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                       AnchorPoint.CENTER_ANCHOR,
                       currMatrix.adobeMatrix() );
  } else {
    textFrame.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   currMatrix.adobeMatrix() );
  }

  return textFrame;
};

/**
 * Sets text properties to the given item. If the item is not an instance the text property can be set to,
 * the property gets set to the direct descendants of the given item, e.g. all stories of a given document.
 *
 * If no value is given and the given property is a string, the function acts as a getter and returns the
 * corresponding value(s) in an array. This can either be an array containing the value of the concrete item
 * (e.g. character) the values of the item's descendants (e.g. paragraphs of given text frame).
 *
 * @cat Typography
 * @method typo
 * @param  {Document|Spread|Page|Layer|Story|TextFrame|Text} item  The object to apply the property to.
 * @param  {String|Object} property  The text property name or an object of key/value property/value pairs.
 *                                   If property is a string and no value is given, the function acts as getter.
 * @param  {String|Number|Object} [value]  The value to apply to the property.
 * @return {String[]|Number[]|Object[]}  The property value(s) if the function acts as getter or the items the property
 *                                       was assigned to.
 */
pub.typo = function(item, property, value) {
  var result = [],
    actsAsGetter = typeof property === 'string' && (value === undef || value === null),
    getOrSetProperties = function(textItem) {
      if (actsAsGetter) {
        result.push(textItem[property]);
      } else {
        setProperties(textItem);
      }
    },
    setProperties = function(textItem) {
      if (typeof property === 'string') {
        result.push(textItem);
        setProperty(textItem, property, value);
      } else if (typeof property === 'object') {
        result.push(textItem);
        for (var prop in property) {
          setProperty(textItem, prop, property[prop]);
        }
      }
    },
    setProperty = function(textItem, prop, val) {
      textItem[prop] = val;
    };

  if(typeof item === 'string') error( "b.typo() cannot work on strings. Please pass a Text object to modify." );

  if(!isValid(item)){
    warning("b.typo(), invalid object passed");
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

var isValid = function (item) {
  if (typeof item != 'undefined') {
    if (item.hasOwnProperty("isValid")) {
      if (!item.isValid) {
        return false;
      } else {
        return true;
      }
    }
    return true; // if does not have isValid field -> normal array element and not collection
  }
  return false;
};

/**
 * Returns the current font and sets it if argument fontName is given.
 *
 * @cat Typography
 * @method textFont
 * @param  {String} fontName The name of the font to set e.g. Helvetica
 * @param  {String} [fontStyle] The Font style e.g. Bold
 * @return {String} currFont The name of the current font
 */
pub.textFont = function(fontName, fontStyle) {
  if (arguments.length === 1) {
    currFont = fontName;
  }
  if (arguments.length === 2) {
    currFont = fontName+"\t"+fontStyle;
  }
  return currFont;
};

/**
 * Returns the current font size in points and sets it if argument pointSize is given.
 *
 * @cat Typography
 * @method textSize
 * @param  {Number} [pointSize] The size in points to set.
 * @return {Number}             The current point size.
 */
pub.textSize = function(pointSize) {
  if (arguments.length === 1) {
    currFontSize = pointSize;
  }
  return currFontSize;
};

/**
 * Sets the current horizontal and vertical text alignment.
 *
 * @cat Typography
 * @method textAlign
 * @param  {String} align    The horizontal text alignment to set. Must be one of the InDesign Justification enum values:
 *                           Justification.AWAY_FROM_BINDING_SIDE <br />
 *                           Justification.CENTER_ALIGN <br />
 *                           Justification.CENTER_JUSTIFIED <br />
 *                           Justification.FULLY_JUSTIFIED <br />
 *                           Justification.LEFT_ALIGN <br />
 *                           Justification.RIGHT_ALIGN <br />
 *                           Justification.RIGHT_JUSTIFIED <br />
 *                           Justification.TO_BINDING_SIDE <br />
 * @param  {String} [yAlign] The vertical text alignment to set. Must be one of the InDesign VerticalJustification enum values:
 *                           VerticalJustification.BOTTOM_ALIGN <br />
 *                           VerticalJustification.CENTER_ALIGN <br />
 *                           VerticalJustification.JUSTIFY_ALIGN <br />
 *                           VerticalJustification.TOP_ALIGN <br />
 */
pub.textAlign = function(align, yAlign) {
  currAlign = align;
  if (arguments.length === 2) currYAlign = yAlign;
};

/**
 * Returns the spacing between lines of text in units of points and sets it if argument leading is given.
 *
 * @cat Typography
 * @method textLeading
 * @param  {Number|String} [leading] The spacing between lines of text in units of points or the default Indesign enum
 *                                   value Leading.AUTO.
 * @return {Number|String}           The current leading.
 */
pub.textLeading = function(leading) {
  if (arguments.length === 1) {
    currLeading = leading;
  }
  return currLeading;
};

/**
 * Returns the current kerning and sets it if argument kerning is given.
 *
 * @cat Typography
 * @method textKerning
 * @param  {Number} [kerning] The value to set.
 * @return {Number}           The current kerning.
 */
pub.textKerning = function(kerning) {
  if (arguments.length === 1) {
    currKerning = kerning;
  }
  return currKerning;
};

/**
 * Returns the current tracking and sets it if argument tracking is given.
 *
 * @cat Typography
 * @method textTracking
 * @param  {Number} [tracking] The value to set.
 * @return {Number}            The current tracking.
 */
pub.textTracking = function(tracking) {
  if (arguments.length === 1) {
    currTracking = tracking;
  }
  return currTracking;
};

/**
 * Returns the character style with the given name. If the style does not exist it gets created.
 *
 * @cat Typography
 * @method characterStyle
 * @param  {String} name      The name of the character style to return.
 * @return {CharachterStyle}  The character style instance.
 */
pub.characterStyle = function(name) {
  var style = null;
  var style = findInCollectionByName(name);
  if(typeof style === 'undefined'){
    style = currentDoc().characterStyles.add({name: name});
  } 
  return style;  
};

/**
 * Returns the paragraph style with the given name. If the style does not exist it gets created.
 *
 * @cat Typography
 * @method paragraphStyle
 * @param  {String} name     The name of the paragraph style to return.
 * @return {ParagraphStyle}  The paragraph style instance.
 */
pub.paragraphStyle = function(name) {
  var style = null;
  var style = findInCollectionByName(name);
  if(typeof style === 'undefined'){
    style = currentDoc().paragraphStyles.add({name: name});
  } 
  return style;  
};

/**
 * Links the stories of two textframes to one story. Text of first textframe overflows to second one.
 *
 * @cat Story
 * @method linkTextFrames
 * @param  {TextFrame} textFrameA
 * @param  {TextFrame} textFrameB
 */
pub.linkTextFrames = function (textFrameA, textFrameB) {
  if (textFrameA instanceof TextFrame && textFrameB instanceof TextFrame) {
    textFrameA.nextTextFrame = textFrameB;
  } else {
    error("linkTextFrames(), wrong type of parameter! linkTextFrames() needs two textFrame objects to link the stories. Use: textFrameA, textFrameB");
  }
};
