// ----------------------------------------
// src/includes/document.js
// ----------------------------------------

// ----------------------------------------
// Document
// ----------------------------------------

/**
 * @description Removes all page items (including locked ones) in the given Document, Page, Layer or Group. If the selected container is a group, the group itself will be removed as well.
 *
 * @cat     Document
 * @method  clear
 *
 * @param   {Document|Page|Layer|Group} container The container where the PageItems sit in.
 */
pub.clear = function(container) {

  if (container instanceof Document
    || container instanceof Page
    || container instanceof Layer) {

    container.pageItems.everyItem().locked = false;
    container.pageItems.everyItem().remove();

  } else if (container instanceof Group) {

    container.locked = false;
    container.remove();

  } else {
    error("clear(), not a valid container! Use: Document, Page, Layer or Group.");
  }
};

/**
 * @description Closes the current document. If no `saveOptions` argument is used, the user will be asked if they want to save or not.
 *
 * @cat     Document
 * @method  close
 *
 * @param   {Object|Boolean} [saveOptions] The InDesign SaveOptions constant or either true for triggering saving before closing or false for closing without saving.
 * @param   {File} [file] The InDesign file instance to save the document to.
 */
pub.close = function(saveOptions, file) {
  if (currDoc) {
    if(saveOptions === false) {
      saveOptions = SaveOptions.NO;
    } else if(saveOptions === true) {
      saveOptions = SaveOptions.YES;
    } else if(saveOptions === undefined) {
      saveOptions = SaveOptions.ASK;
    } else {
      if(!isEnum(SaveOptions, saveOptions)) {
        error("close(), wrong saveOptions argument. Use True, False, InDesign SaveOptions constant or leave empty.");
      }
    }

    resetDocSettings();

    try {
      currDoc.close(saveOptions, file);
    } catch (e) {
      // the user has cancelled a save dialog, the doc will not be saved
      currDoc.close(saveOptions.NO);
    }
    resetCurrDoc();
  }
};

/**
 * @description Sets or possibly creates the current document and returns it. If the `doc` parameter is not given, the current document gets set to the active document in the application. If no document at all is open, a new document gets created.
 *
 * @cat     Document
 * @method  doc
 *
 * @param   {Document} [doc] The document to set the current document to.
 * @return  {Document} The current document instance.
 */
pub.doc = function(doc) {
  if (doc instanceof Document) {
    // reset the settings of the old doc, before activating the new doc
    resetDocSettings();
    setCurrDoc(doc);
  }
  return currentDoc();
};

/**
 * @description Returns the current layer if no argument is given. Sets active layer if layer object or name of existing layer is given. Newly creates layer and sets it to active if new name is given.
 *
 * @cat     Document
 * @method  layer
 *
 * @param   {Layer|String} [layer] The layer or layer name to set the current layer to.
 * @return  {Layer} The current layer instance.
 */
pub.layer = function(layer) {
  checkNull(layer);
  if (layer instanceof Layer) {
    currLayer = layer;
    currentDoc().activeLayer = currLayer;
  } else if (typeof layer === "string") {
    var layers = currentDoc().layers;
    currLayer = layers.item(layer);
    if (!currLayer.isValid) {
      currLayer = layers.add({name: layer});
    } else {
      currentDoc().activeLayer = currLayer;
    }
  } else if (arguments.length > 0) {
    error("layer(), wrong arguments. Use layer object or string instead.");
  }
  return currentLayer();
};

/**
 * @description Sets the reference point for transformations using the `transform()` function. The reference point will be used for all following transformations, until it is changed again. By default, the reference point is set to the top left.
 * Arguments can be the basil constants `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`, `CENTER_LEFT`, `CENTER`, `CENTER_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER` or `BOTTOM_RIGHT`. Alternatively the digits `1` through `9` (as they are arranged on a num pad) can be used to set the anchor point. Lastly the function can also use an InDesign anchor point enumerator to set the reference point.
 * If the function is used without any arguments the currently set reference point will be returned.
 *
 * @cat     Document
 * @method  referencePoint
 *
 * @param   {String} [referencePoint] The reference point to set.
 * @return  {String} Current reference point setting.
 */
pub.referencePoint = function(rp) {
  if(!arguments.length) {
    return currRefPoint;
  }

  var anchorEnum;

  if(rp === pub.TOP_LEFT || rp === 7 || rp === AnchorPoint.TOP_LEFT_ANCHOR) {
    currRefPoint = pub.TOP_LEFT;
    anchorEnum = AnchorPoint.TOP_LEFT_ANCHOR;
  } else if(rp === pub.TOP_CENTER || rp === 8 || rp === AnchorPoint.TOP_CENTER_ANCHOR) {
    currRefPoint = pub.TOP_CENTER;
    anchorEnum = AnchorPoint.TOP_CENTER_ANCHOR;
  } else if(rp === pub.TOP_RIGHT || rp === 9 || rp === AnchorPoint.TOP_RIGHT_ANCHOR) {
    currRefPoint = pub.TOP_RIGHT;
    anchorEnum = AnchorPoint.TOP_RIGHT_ANCHOR;
  } else if(rp === pub.CENTER_LEFT || rp === 4 || rp === AnchorPoint.LEFT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_LEFT;
    anchorEnum = AnchorPoint.LEFT_CENTER_ANCHOR;
  } else if(rp === pub.CENTER || rp === pub.CENTER_CENTER || rp === 5 || rp === AnchorPoint.CENTER_ANCHOR) {
    currRefPoint = pub.CENTER;
    anchorEnum = AnchorPoint.CENTER_ANCHOR;
  } else if(rp === pub.CENTER_RIGHT || rp === 6 || rp === AnchorPoint.RIGHT_CENTER_ANCHOR) {
    currRefPoint = pub.CENTER_RIGHT;
    anchorEnum = AnchorPoint.RIGHT_CENTER_ANCHOR;
  } else if(rp === pub.BOTTOM_LEFT || rp === 1 || rp === AnchorPoint.BOTTOM_LEFT_ANCHOR) {
    currRefPoint = pub.BOTTOM_LEFT;
    anchorEnum = AnchorPoint.BOTTOM_LEFT_ANCHOR;
  } else if(rp === pub.BOTTOM_CENTER || rp === 2 || rp === AnchorPoint.BOTTOM_CENTER_ANCHOR) {
    currRefPoint = pub.BOTTOM_CENTER;
    anchorEnum = AnchorPoint.BOTTOM_CENTER_ANCHOR;
  } else if(rp === pub.BOTTOM_RIGHT || rp === 3 || rp === AnchorPoint.BOTTOM_RIGHT_ANCHOR) {
    currRefPoint = pub.BOTTOM_RIGHT;
    anchorEnum = AnchorPoint.BOTTOM_RIGHT_ANCHOR;
  } else {
    error("referencePoint(), wrong argument! Use reference point constant (TOP_LEFT, TOP_CENTER, ...), a digit between 1 and 9 or an InDesign anchor point enumerator.");
  }

  if(app.properties.activeWindow instanceof LayoutWindow ) {
    app.activeWindow.transformReferencePoint = anchorEnum;
  }

  return currRefPoint;
};

/**
 * @description Removes the provided Page, Layer, PageItem, Swatch, etc.
 *
 * @cat     Document
 * @method  remove
 *
 * @param   {PageItem} obj The object to be removed.
 */
pub.remove = function(obj) {

  if(obj.hasOwnProperty("remove")) {
    obj.remove();
  } else {
    error("remove(), provided object cannot be removed.");
  }
};

/**
 * @description Reverts the document to its last saved state. If the current document is not saved yet, this function will close the document without saving it and reopen a fresh document so as to "revert" the unsaved document. This function is helpful during development stage to start from a new or default document each time the script is run.
 *
 * @cat     Document
 * @method  revert
 *
 * @return  {Document} The reverted document.
 */
pub.revert = function() {

  if(currDoc.saved && currDoc.modified) {
    var currFile = currDoc.fullName;
    currDoc.close(SaveOptions.NO);
    currDoc = null;
    app.open(File(currFile));
    currentDoc();
  } else if(!currDoc.saved) {
    currDoc.close(SaveOptions.NO);
    currDoc = null;
    app.documents.add();
    currentDoc();
  }

  return currDoc;
};

/**
 * @description Sets the units of the document (like right clicking the rulers). By default basil uses the units of the user's document or the user's default units.
 *
 * @cat     Document
 * @method  units
 *
 * @param   {String} [units] Supported units: PT, PX, CM, MM or IN.
 * @return  {String} Current unit setting.
 */
var unitsCalledCounter = 0;
pub.units = function (units) {
  checkNull(units);
  if (arguments.length === 0) {
    return currUnits;
  }

  if (units === pub.PT || units === 2054188905) {
    units = pub.PT;
    unitType = MeasurementUnits.points;
  } else if(units === pub.MM || units === 2053991795) {
    units = pub.MM;
    unitType = MeasurementUnits.millimeters;
  } else if(units === pub.CM || units === 2053336435) {
    units = pub.CM;
    unitType = MeasurementUnits.centimeters;
  } else if(units === pub.IN || units === 2053729891) {
    units = pub.IN;
    unitType = MeasurementUnits.inches;
  } else if(units === pub.PX || units === 2054187384) {
    units = pub.PX;
    unitType = MeasurementUnits.pixels;
  } else if(isEnum(MeasurementUnits, units)) {
    // valid enumerator with invalid basil.js unit (from documents that are set to PICAS, CICEROS etc.)
    warning("The document's current units are not supported by basil.js. Units will be set to Points.");
    units = pub.PT;
    unitType = MeasurementUnits.points;
  } else {
    error("units(), invalid unit. Use: PT, MM, CM, IN or PX.");
  }

  currentDoc().viewPreferences.horizontalMeasurementUnits = unitType;
  currentDoc().viewPreferences.verticalMeasurementUnits = unitType;
  currUnits = units;

  updatePublicPageSizeVars();

  if (unitsCalledCounter === 1) {
    warning("Please note that units() will reset the current transformation matrix.");
  }
  unitsCalledCounter++;
  return currUnits;
};

// ----------------------------------------
// Document/Canvas
// ----------------------------------------

/**
 * @description Sets the document bleeds. If one value is given, all 4 are set equally. If 4 values are given, the top/right/bottom/left document bleeds will be adjusted. Calling the function without any values, will return the document bleed settings.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  bleeds
 *
 * @param   {Number} [top] Top bleed or all if only one.
 * @param   {Number} [right] Right bleed.
 * @param   {Number} [bottom] Bottom bleed.
 * @param   {Number} [left] Left bleed.
 * @return  {Object} Current document bleeds settings.
 */
pub.bleeds = function(top, right, bottom, left) {
  if (arguments.length === 0) {
    return {top: currentDoc().documentPreferences.documentBleedTopOffset,
      right: currentDoc().documentPreferences.documentBleedOutsideOrRightOffset,
      bottom: currentDoc().documentPreferences.documentBleedBottomOffset,
      left: currentDoc().documentPreferences.documentBleedInsideOrLeftOffset
    };
  } else if (arguments.length === 1) {
    right = bottom = left = top;
  }else{
    currentDoc().documentPreferences.documentBleedUniformSize = false;
  }
  currentDoc().documentPreferences.documentBleedTopOffset = top;
  currentDoc().documentPreferences.documentBleedOutsideOrRightOffset = right;
  currentDoc().documentPreferences.documentBleedBottomOffset = bottom;
  currentDoc().documentPreferences.documentBleedInsideOrLeftOffset = left;
};

/**
 * @description Use this to set the dimensions of the canvas. Choose between `PAGE` (default), `MARGIN`, `BLEED` resp. `FACING_PAGES`, `FACING_MARGINS` and `FACING_BLEEDS` for book setups with facing page. Please note: Setups with more than two facing pages are not yet supported.
 * Please note that you will loose your current MatrixTransformation. You should set the canvasMode before you attempt to use `translate()`, `rotate()` and `scale()`.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  canvasMode
 *
 * @param   {String} mode The canvas mode to set.
 * @return  {String} The current canvas mode.
 */
pub.canvasMode = function (m) {
  if(arguments.length === 0) {
    return currCanvasMode;
  } else if (m === pub.PAGE ||
             m === pub.MARGIN ||
             m === pub.BLEED ||
             m === pub.FACING_PAGES ||
             m === pub.FACING_MARGINS ||
             m === pub.FACING_BLEEDS) {
    currCanvasMode = m;
    updatePublicPageSizeVars();
  } else {
    error("canvasMode(), there is a problem setting the canvasMode. Please check the reference for details.");
  }
  return currCanvasMode;
};

/**
 * @description Creates a vertical guide line at the current spread and current layer.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  guideX
 *
 * @param   {Number} x Position of the new guide line.
 * @return  {Guide} New guide line.
 */
pub.guideX = function (x) {
  checkNull(x);
  var guides = currentPage().guides;
  var guide = guides.add(currentLayer());
  guide.fitToPage = true;
  guide.orientation = HorizontalOrVertical.VERTICAL;
  guide.location = x;
  return guide;
};

/**
 * @description Creates a horizontal guide line at the current spread and current layer.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  guideY
 *
 * @param   {Number} y Position of the new guide line.
 * @return  {Guide} New guide line.
 */
pub.guideY = function (y) {
  checkNull(y);
  var guides = currentPage().guides;
  var guide = guides.add(currentLayer());
  guide.fitToPage = true;
  guide.orientation = HorizontalOrVertical.HORIZONTAL;
  guide.location = y;
  return guide;
};

/**
 * @description Sets the color or gradient used to fill shapes.
 *
 * @cat     Document
 * @subcat Canvas
 * @method  background
 *
 * @param   {Color|Gradient|Swatch|Numbers|String} fillColor Accepts a color/gradient/swatch as string name or variable. Or values: GRAY / R,G,B / C,M,Y,K.
 */
pub.background = function (fillColor) {
  var useColor = currFillColor;
  checkNull(fillColor);
  if (fillColor instanceof Color || fillColor instanceof Swatch || fillColor instanceof Gradient) {
    useColor = fillColor;
  } else {
    if (arguments.length === 1) {
      if (typeof arguments[0] === "string") {
        useColor = pub.swatch(arguments[0]);
      }else{
        useColor = pub.color(arguments[0]);
      }
    } else if (arguments.length === 2) {
      useColor = pub.color(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
      useColor = pub.color(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
      useColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length === 5) {
      useColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    } else {
      error("background(), wrong parameters. Use:\n"
        + "Swatch name or\n"
        + "GRAY or\n"
        + "R, G, B or\n"
        + "C, M, Y, K.\n");
    }
  }
  var pLayer = pub.layer();
  var bgLayer = pub.layer("basiljs_background");
  pub.clear(bgLayer);
  var backgroundShape = pub.rect(0, 0, pub.width, pub.height);
  pub.property(backgroundShape, "fillColor", useColor);
  pub.arrange(bgLayer, pub.BACK);
  pub.layer(pLayer);
};

/**
 * @description Sets the margins of a given page. If 1 value is given, all 4 sides are set equally. If 4 values are given, the current page will be adjusted. Adding a 5th value will set the margin of a given page. Calling the function without any values, will return the margins for the current page.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  margins
 *
 * @param   {Number} [top] Top margin or all if only one.
 * @param   {Number} [right] Right margin.
 * @param   {Number} [bottom] Bottom margin.
 * @param   {Number} [left] Left margin.
 * @param   {Number} [pageNumber] Sets margins to selected page, currentPage() if left blank.
 * @return  {Object} Current page margins with the properties: `top`, `right`, `bottom`, `left`.
 */
pub.margins = function(top, right, bottom, left, pageNumber) {
  if (arguments.length === 0) {
    return {top: pub.page(pageNumber).marginPreferences.top,
      right: pub.page(pageNumber).marginPreferences.right,
      bottom: pub.page(pageNumber).marginPreferences.bottom,
      left: pub.page(pageNumber).marginPreferences.left
    };
  } else if (arguments.length === 1) {
    right = bottom = left = top;
  }
  if(pageNumber !== undefined) {
    pub.page(pageNumber).marginPreferences.top = top;
    pub.page(pageNumber).marginPreferences.right = right;
    pub.page(pageNumber).marginPreferences.bottom = bottom;
    pub.page(pageNumber).marginPreferences.left = left;
  }else{
    currentPage().marginPreferences.top = top;
    currentPage().marginPreferences.right = right;
    currentPage().marginPreferences.bottom = bottom;
    currentPage().marginPreferences.left = left;
  }
};

/**
 * @description Returns the current horizontal and vertical pasteboard margins and sets them if both arguements are given.
 *
 * @cat     Document
 * @subcat  Canvas
 * @method  pasteboard
 *
 * @param   {Number} h The desired horizontal pasteboard margin.
 * @param   {Number} v The desired vertical pasteboard margin.
 * @return  {Array} The current horizontal, vertical pasteboard margins.
 */
pub.pasteboard = function (h, v) {
  if(arguments.length == 0) {
    return currentDoc().pasteboardPreferences.pasteboardMargins;
  } else if(arguments.length == 1) {
    error("pasteboard() requires both a horizontal and vertical value. Please check the reference for details.");
  }else if (typeof h === "number" && typeof v === "number") {
    currentDoc().pasteboardPreferences.pasteboardMargins = [h, v];
    return currentDoc().pasteboardPreferences.pasteboardMargins;
  }else {
    error("pasteboard(), there is a problem setting the pasteboard. Please check the reference for details.");
  }
};

// ----------------------------------------
// Document/Page
// ----------------------------------------

/**
 * @description Adds a new page to the document. Set the optional location parameter to either `AT_END` (default), `AT_BEGINNING`, `AFTER` or `BEFORE`. `AFTER` and `BEFORE` will use the current page as insertion point.
 *
 * @cat     Document
 * @subcat  Page
 * @method  addPage
 *
 * @param   {String} [location] The location placement mode.
 * @return  {Page} The new page.
 */
pub.addPage = function(location) {

  if(arguments.length) {
    if(!(location === pub.AFTER ||
         location === pub.AT_BEGINNING ||
         location === pub.AT_END ||
         location === pub.BEFORE)) {
      error("addPage(), invalid location argument! Use AT_END, AT_BEGINNING, AFTER or BEFORE.");
    }
  } else {
    location = pub.AT_END;
  }

  return getAndUpdatePage(currentDoc().pages.add(location, pub.page()), "addPage");
};

/**
 * @description Applies a master page to the given page.
 *
 * The `page` parameter can be given as a page object, as a page name or as a page number (numbering starts at 1).
 *
 * The `master` parameter can be given as a master spread object or as a string. If a string is used, it can either hold the master page prefix (e.g "A", "B") or the full name *including* the prefix (e.g "A-Master", "B-Master"). The latter is useful, if there are several masters using the same prefix. Alternatively, the constant `NONE` can be used to apply InDesign's `[none]` master to the page and thus remove the previously applied master page from the page.
 *
 * @cat     Document
 * @subcat  Page
 * @method  applyMasterPage
 *
 * @param   {Number|String|Page} page The page to apply the master page to.
 * @param   {String|MasterSpread} master The master page to apply.
 * @return  {Page} The page the master page was applied to.
 *
 * @example <caption>Apply the master with prefix "B" to the documents third page</caption>
 * applyMasterPage(3, "B");
 *
 * @example <caption>In a document with master pages "A-Text" and "A-Images", apply "A-Images" to the current page</caption>
 * applyMasterPage(page(), "A-Images");
 *
 * @example <caption>Remove the master page from the page named "IV"</caption>
 * applyMasterPage("IV", NONE);
 */
pub.applyMasterPage = function(page, master) {

  if(isNumber(page) || isString(page) || page instanceof Page) {
    page = getPage(page, "applyMasterPage");
  } else {
    error("applyMasterPage(), invalid first parameter! Use page number, page name or page object for the page to apply the master to.");
  }

  if(master === pub.NONE) {
    // apply InDesign's [None] master
    page.appliedMaster = NothingEnum.NOTHING;
    return page;
  }

  page.appliedMaster = getMasterSpread(master, "applyMasterPage");

  return page;
};

/**
 * @description Sets a master page to be the active page. This can be used to set up and arrange page items on master pages, so they appear throughout the entire document.
 *
 * The `master` parameter describes the master spread that contains the master page. It can be given as a master spread object or as a string. If a string is used, it can either hold the master page prefix (e.g "A", "B") or the full name *including* the prefix (e.g "A-Master", "B-Master"). The latter is useful, if there are several masters using the same prefix.
 *
 * As master pages cannot directly be targeted by number, the optional `pageIndex` parameter can be used to specify which master page of the given master spread should be set as the active page, in case there are several pages on the master spread. Counting starts from 0, beginning from the leftmost page. If the `pageIndex` parameter is not given, the first page of the master spread is returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  masterPage
 *
 * @param   {String|MasterSpread} master The master spread that contains the master page.
 * @param   {Number} [pageIndex] The index of the page on the master spread, counting from 0.
 * @return  {Page} The active master page.
 *
 * @example <caption>Set master page to be the first page of master "A".</caption>
 * masterPage("A");
 *
 * @example <caption>Set master page to be the second page of master "B".</caption>
 * masterPage("B", 1);
 *
 * @example <caption>Alternate way to set master page ot the second page of master "B".</caption>
 * masterPage("B");
 * nextPage();
 */
pub.masterPage = function(master, pageIndex) {

  var mp;
  var ms = getMasterSpread(master, "masterPage");

  if(arguments.length === 1) {
    mp = ms.pages[0];
  } else {
    if((!isNumber(pageIndex)) || pageIndex > ms.pages.length - 1) {
      error("masterPage(), invalid page index! Use number that describes a valid page index. Counting starts at 0 from the leftmost page of a master spread.");
    }
    mp = ms.pages[pageIndex];
  }

  // set active page
  currPage = mp;
  updatePublicPageSizeVars();
  if (currentDoc().windows.length) {
    // focus GUI on new page, if not in HIDDEN mode
    app.activeWindow.activePage = currPage;
  }

  return mp;
};

/**
 * @description Set the next page of the document to be the active one and returns the new active page. If the current page is the last page or the last master page, this page will be returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  nextPage
 *
 * @return  {Page} The active page.
 */
pub.nextPage = function () {

  var np;
  if(currPage.parent instanceof MasterSpread) {
    // master page
    if(currPage.parent.pages.nextItem(currPage).isValid) {
      np = currPage.parent.pages.nextItem(currPage);
    } else if(currentDoc().masterSpreads.nextItem(currPage.parent).isValid) {
      np = currentDoc().masterSpreads.nextItem(currPage.parent).pages[0];
    } else {
      // last master page
      return currPage;
    }
  } else {
    // regular page
    if(currPage.documentOffset + 1 === currentDoc().documentPreferences.pagesPerDocument) {
      // last page
      return currPage;
    }
    np = currentDoc().pages[currPage.documentOffset + 1];
  }

  return getAndUpdatePage(np, "nextPage");
};

/**
 * @description Returns the current page and sets it if argument page is given. If page is given as string, the page will be set to the page with this name (e.g. "4", "04", "D", "IV"). If the page is given as an integer, the page will be set to the page according to this number, no matter the actual naming of the page. Numbering starts with 1 in this case. If you pass a page item the current page will be set to its containing page. If this page item is off the page (on the pasteboard) the current page will be set to the first page of its containing spread.
 *
 * @cat     Document
 * @subcat  Page
 * @method  page
 *
 * @param   {Number|String|Page|PageItem} [page] The page number (as integer), page name or page object to set the current page to or an page item to refer to its containing page.
 * @return  {Page} The current page instance.
 *
 * @example <caption>Sets the current page to the third page of the document</caption>
 * page(3);
 *
 * @example <caption>Sets the current page to the page named "004"</caption>
 * page("004");
 *
 * @example <caption>Sets the current page to the containing page of a rectangle</caption>
 * var myRect = rect(100, 100, 200, 200);
 * page(myRect);
 */
pub.page = function(page) {

  if(arguments.length) {
    getAndUpdatePage(page, "page");
  }

  return currentPage();
};

/**
 * @description Returns the number of all pages in the current document. If a number is given as an argument, it will set the document's page count to the given number by either adding pages or removing pages until the number is reached. If pages are added, the master page of the document's last page will be applied to the new pages.
 *
 * @cat     Document
 * @subcat  Page
 * @method  pageCount
 *
 * @param   {Number} [pageCount] New page count of the document (integer between 1 and 9999).
 * @return  {Number} The amount of pages.
 */
pub.pageCount = function(pageCount) {
  if(arguments.length) {
    if(pub.isInteger(pageCount) && pageCount > 0 && pageCount < 10000) {
      currentDoc().documentPreferences.pagesPerDocument = pageCount;
    } else {
      error("pageCount(), wrong arguments! Use an integer between 1 and 9999 to set page count.");
    }
  }
  return currentDoc().pages.count();
};

/**
 * @description Returns the current page number of either the current page or the given page name or page object. Numbering of pages starts at 1. Master pages have no real numbering and will return -1 instead.
 *
 * @cat     Document
 * @subcat  Page
 * @method  pageNumber
 *
 * @param   {String|Page} [page] The page name or page object of the page you want to know the number of.
 * @return  {Number} The page number within the document.
 */
pub.pageNumber = function (page) {

  if(arguments.length === 0) {
    return currPage.parent instanceof MasterSpread ? -1 : currPage.documentOffset + 1;
  }

  if(isString(page)) {
    if(currentDoc().pages.item(page).isValid) {
      return currentDoc().pages.item(page).documentOffset + 1;
    } else {
      error("pageNumber(), invalid page name! A page \"" + page + "\" does not exist.");
    }
  }

  if(page instanceof Page) {
    return page.parent instanceof MasterSpread ? -1 : page.documentOffset + 1;
  } else {
    error("pageNumber(), invalid parameter! Use page name as string or page object.");
  }
};

/**
 * @description Set the previous page of the document to be the active one and returns the new active page. If the current page is the first page or the first master page, this page will be returned.
 *
 * @cat     Document
 * @subcat  Page
 * @method  previousPage
 *
 * @return  {Page} The active page.
 */
pub.previousPage = function () {

  var pp;
  if(currPage.parent instanceof MasterSpread) {
    // master page
    if(currPage.parent.pages.previousItem(currPage).isValid) {
      pp = currPage.parent.pages.previousItem(currPage);
    } else if(currentDoc().masterSpreads.previousItem(currPage.parent).isValid) {
      pp = currentDoc().masterSpreads.previousItem(currPage.parent).pages.lastItem();
    } else {
      // first master page
      return currPage;
    }
  } else {
    // regular page
    if(currPage.documentOffset === 0) {
      // first page
      return currPage;
    }
    pp = currentDoc().pages[currPage.documentOffset - 1];
  }

  return getAndUpdatePage(pp, "previousPage");
};

/**
 * @description Removes a page from the current document. This will either be the current page if the parameter page is left empty, or the given page object or the page of a specific number or name.
 *
 * @cat     Document
 * @subcat  Page
 * @method  removePage
 *
 * @param   {Number|String|Page} [page] The page to be removed as page number, page name or page object.
 */
pub.removePage = function (page) {

  if(currentDoc().pages.length === 1) {
    error("removePage(), the only page of the document cannot be deleted.");
  }

  if(arguments.length === 0) {
    page = currPage;
  } else if(isNumber(page) || isString(page) || page instanceof Page) {
    page = getPage(page, "removePage");
  } else {
    error("removePage(), invalid parameter! Use page number, page name or page object!");
  }

  if(page === currPage) {
    currPage = null; // reset!
  }

  page.remove();
  currentPage();
  getAndUpdatePage(currPage);
};

// ----------------------------------------
// Document/PageItems
// ----------------------------------------

/**
 * @description Applies an object style to the given page item. The object style can be given as name or as an object style instance.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  applyObjectStyle
 *
 * @param   {PageItem} item The page item to apply the style to.
 * @param   {ObjectStyle|String} style An object style instance or the name of the object style to apply.
 * @return  {PageItem} The page item that the style was applied to.
 */

pub.applyObjectStyle = function(item, style) {

  if(isString(style)) {
    var name = style;
    style = findInStylesByName(currentDoc().allObjectStyles, name);
    if(!style) {
      error("applyObjectStyle(), an object style named \"" + name + "\" does not exist.");
    }
  }

  if(!(item.hasOwnProperty("appliedObjectStyle")) || !(style instanceof ObjectStyle)) {
    error("applyObjectStyle(), wrong parameters. Use: pageItem, objectStyle|name");
  }

  item.appliedObjectStyle = style;

  return item;
};

/**
 * @description Arranges a page item or a layer before or behind other page items or layers. If using the constants `FORWARD` or `BACKWARD` the object is sent forward or back one step. The constants `FRONT` or `BACK` send the object to the very front or very back. Using `FRONT` or `BACK` together with the optional reference object, sends the object in front or behind this reference object.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  arrange
 *
 * @param   {PageItem|Layer} pItemOrLayer The page item or layer to be moved to a new position.
 * @param   {String} positionOrDirection The position or direction to move the page item or layer. Can be `FRONT`, `BACK`, `FORWARD` or `BACKWARD`.
 * @param   {PageItem|Layer} [reference] A reference object to move the page item or layer behind or in front of.
 * @return  {PageItem|Layer} The newly arranged page item or layer.
 */
pub.arrange = function(pItemOrLayer, positionOrDirection, reference) {
  checkNull(pItemOrLayer);

  if(pItemOrLayer.hasOwnProperty("parentPage")) {
    if(positionOrDirection === pub.BACKWARD) {
      pItemOrLayer.sendBackward();
    } else if (positionOrDirection === pub.FORWARD) {
      pItemOrLayer.bringForward();
    } else if (positionOrDirection === pub.BACK) {
      pItemOrLayer.sendToBack(reference);
    } else if (positionOrDirection === pub.FRONT) {
      pItemOrLayer.bringToFront(reference);
    } else {
      error("arrange(), not a valid position or direction. Please use FRONT, BACK, FORWARD or BACKWARD.");
    }
  } else if (pItemOrLayer instanceof Layer) {
    if(positionOrDirection === pub.BACKWARD) {
      if(pItemOrLayer.index === currentDoc().layers.length - 1) return;
      pItemOrLayer.move(LocationOptions.AFTER, currentDoc().layers[pItemOrLayer.index + 1]);
    } else if (positionOrDirection === pub.FORWARD) {
      if(pItemOrLayer.index === 0) return;
      pItemOrLayer.move(LocationOptions.BEFORE, currentDoc().layers[pItemOrLayer.index - 1]);
    } else if (positionOrDirection === pub.BACK) {
      if(!(reference instanceof Layer)) {
        pItemOrLayer.move(LocationOptions.AT_END);
      } else {
        pItemOrLayer.move(LocationOptions.AFTER, reference);
      }
    } else if (positionOrDirection === pub.FRONT) {
      if(!(reference instanceof Layer)) {
        pItemOrLayer.move(LocationOptions.AT_BEGINNING);
      } else {
        pItemOrLayer.move(LocationOptions.BEFORE, reference);
      }
    } else {
      error("arrange(), not a valid position or direction. Please use FRONT, BACK, FORWARD or BACKWARD.");
    }
  } else {
    error("arrange(), invalid first parameter. Use page item or layer.");
  }

  return pItemOrLayer;
};

/**
 * @description The function calculates the geometric bounds of any given page item or text. Use the `transforms()` function to modify page items. In case the object is any kind of text, additional typographic information `baseline` and `xHeight` are calculated.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  bounds
 *
 * @param   {PageItem|Text} obj The page item or text to calculate the geometric bounds.
 * @return  {Object} Geometric bounds object with these properties: `width`, `height`, `left`, `right`, `top`, `bottom` and for text: `baseline`, `xHeight`.
 */
pub.bounds = function (obj) {
  var x1, y1, x2, y2, w, h;
  var offsets = [0, 0];

  if (isText(obj)) {
    var baseline = obj.baseline;
    var ascent = obj.ascent;
    var descent = obj.descent;

    x1 = obj.horizontalOffset;
    y1 = baseline - ascent;
    x2 = obj.endHorizontalOffset;
    y2 = baseline + descent;
    w = x2 - x1;
    h = y2 - y1;

    if (w < 0 || h < 0) {
      warning("bounds(), not possible to get correct bounds, possible line break within textObj");
    }

    // We not sure if this 100% correct, check
    // http://en.wikipedia.org/wiki/File:Typography_Line_Terms.svg
    var xHeight = y1 + descent;

    return {"width": w,
            "height": h,
            "left": x1 + currOriginX,
            "right": x2 + currOriginX,
            "top": y1 + currOriginY,
            "bottom": y2 + currOriginY,
            "baseline": baseline + currOriginY,
            "xHeight": xHeight + currOriginY};
  } else {
    // is it a pageItem?
    if (obj.hasOwnProperty("geometricBounds")) {
      var geometricBounds = obj.geometricBounds; // [y1, x1, y2, x2]
      x1 = geometricBounds[1] + currOriginX;
      y1 = geometricBounds[0] + currOriginY;
      x2 = geometricBounds[3] + currOriginX;
      y2 = geometricBounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // everything else e.g. page, spread
    else if (obj.hasOwnProperty("bounds")) {
      var bounds = obj.bounds; // [y1, x1, y2, x2]
      x1 = bounds[1] + currOriginX;
      y1 = bounds[0] + currOriginY;
      x2 = bounds[3] + currOriginX;
      y2 = bounds[2] + currOriginY;
      w = x2 - x1;
      h = y2 - y1;
      return {"width": w, "height": h, "left": x1, "right": x2, "top": y1, "bottom": y2};
    }
    // no idea what that might be, give up
    else {
      error("bounds(), invalide type of parameter! Can't get bounds for this object.");
    }
  }
};

/**
 * @description Duplicates the given page after the current page or the given page item to the current page and layer. Use `rectMode()` to set center point.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  duplicate
 *
 * @param   {PageItem|Page} item The page item or page to duplicate.
 * @return  {Object} The new page item or page.
 */
pub.duplicate = function(item) {

  if(!(item instanceof Page) && typeof (item) !== "undefined" && item.hasOwnProperty("duplicate")) {

    var newItem = item.duplicate(currentPage().parent);
    newItem.move(currentLayer());

    return newItem;

  } else if(item instanceof Page) {

    var newPage = item.duplicate(LocationOptions.AFTER, pub.page());
    return newPage;

  } else {
    error("Please provide a valid Page or PageItem as parameter for duplicate().");
  }

};

/**
 * @description Returns the Group instance and sets it if argument Group is given. Groups items to a new group. Returns the resulting group instance. If a string is given as the only argument, the group by the given name will be returned.
 *
 * @cat     Document
 * @subCat  Page Items
 * @method  group
 *
 * @param   {Array} pItems An array of page items (must contain at least two items) or name of group instance.
 * @param   {String} [name] The name of the group, only when creating a group from page items.
 * @return  {Group} The group instance.
 */
pub.group = function (pItems, name) {
  checkNull(pItems);
  var group;
  if(pItems instanceof Array) {
    if(pItems.length < 2) {
      error("group(), the array passed to group() must at least contain two page items.");
    }
    // creates a group from Page Items
    group = currentDoc().groups.add(pItems);
    if(typeof name !== "undefined") {
      group.name = name;
    }
  } else if(typeof pItems === "string") {
    // get the Group of the given name
    group = currentDoc().groups.item(pItems);
    if (!group.isValid) {
      error("group(), a group with the provided name doesn't exist.");
    }
  } else {
    error("group(), not a valid argument. Use an array of page items to group or a name of an existing group.");
  }

  return group;
};

/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function for each of the PageItems in the given Document, Page, Layer or Group.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  items
 *
 * @param   {Document|Page|Layer|Group} container The container where the PageItems sit in
 * @param   {Function|Boolean} [cb] Optional: The callback function to call for each PageItem. When this function returns false the loop stops. Passed arguments: `item`, `loopCount`.
 * @return  {PageItems} A collection of PageItem objects.
 */
pub.items = function(container, cb) {

  if (container instanceof Document
    || container instanceof Page
    || container instanceof Layer
    || container instanceof Group) {

    if(arguments.length === 1 || cb === false) {
      return container.allPageItems;
    } else if(cb instanceof Function) {
      return forEach(container.allPageItems, cb);
    }
  }
  error("items(), Not a valid PageItem container, should be Document, Page, Layer or Group");
  return null;
};

/**
 * @description Returns the first item that is tagged with the given label in the InDesign Script Label pane (`Window -> Utilities -> Script Label`). Use this instead of `labels()`, when you know you just have one thing with that label and don't want to deal with a single-element array.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  label
 *
 * @param   {String} label The label identifier.
 * @return  {PageItem} The first page item with the given label.
 */
pub.label = function(label) {
  checkNull(label);
  var doc = currentDoc();
  for (var i = 0, len = doc.pageItems.length; i < len; i++) {
    var pageItem = doc.pageItems[i];
    if (pageItem.label === label) {
      return pageItem;
    }
  }
  error("label(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
};

/**
 * @description Returns items tagged with the given label in the InDesign Script Label pane (`Window -> Utilities -> Script Label`).
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  labels
 *
 * @param   {String} label The label identifier.
 * @param   {Function} [cb] The callback function to call with each item in the search result. When this function returns `false`, the loop stops. Passed arguments: `item`, `loopCount`.
 * @return  {Array} Array of concrete page item instances, e.g. text frame or spline item.
 */
pub.labels = function(label, cb) {
  checkNull(label);
  var result = [];
  var doc = currentDoc();
  for (var i = 0, len = doc.pageItems.length; i < len; i++) {
    var pageItem = doc.pageItems[i];
    if (pageItem.label === label) {
      // push pageItem's 1st element to get the concrete PageItem instance, e.g. a TextFrame
      result.push(pageItem.getElements()[0]);
    }
  }
  if (arguments.length === 2 && cb instanceof Function) {
    return forEach(result, cb);
  }
  if(result.length === 0) {
    error("labels(), no item found with the given label '" + label + "'. Check for line breaks and whitespaces in the script label panel.");
  }
  return result;
};

/**
 * @description Returns the first item on the active page that is named by the given name in the Layers pane (`Window -> Layer`).
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  nameOnPage
 *
 * @return  {Object} The first object on the active page with the given name.
 */
pub.nameOnPage = function(name) {
  checkNull(name);
  var result = null;
  var page = currentPage();
  for (var i = 0, len = page.allPageItems.length; i < len; i++) {
    var pageItem = page.allPageItems[i];
    if (pageItem.name === name) {
      result = pageItem.getElements()[0];
      break;
    }
  }
  if(result === null) {
    error("nameOnPage(), no item found with the name '" + name + "' on page " + pub.pageNumber());
  }
  return result;
};

/**
 * @description Returns the object style of a given page item or the object style with the given name. If an object style of the given name does not exist, it gets created. Optionally a props object of property name/value pairs can be used to set the object style's properties.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  objectStyle
 *
 * @param   {PageItem|String} itemOrName A page item whose style to return or the name of the object style to return.
 * @param   {Object} [props] An object of property name/value pairs to set the style's properties.
 * @return  {ObjectStyle} The object style instance.
 */
pub.objectStyle = function(itemOrName, props) {
  var styleErrorMsg = "objectStyle(), wrong parameters. Use: pageItem|name and props. Props is optional.";

  if(!arguments || arguments.length > 2) {
    error(styleErrorMsg);
  }

  var style;
  if(itemOrName.hasOwnProperty("appliedObjectStyle")) {
    // pageItem is given
    style = itemOrName.appliedObjectStyle;
  } else if(isString(itemOrName)) {
    // name is given
    style = findInStylesByName(currentDoc().allObjectStyles, itemOrName);
    if(!style) {
      style = currentDoc().objectStyles.add({name: itemOrName});
    }
  } else {
    error(styleErrorMsg);
  }

  if(props) {
    try {
      style.properties = props;
    } catch (e) {
      error("objectStyle(), wrong props parameter. Use object of property name/value pairs.");
    }
  }

  return style;
};

/**
 * @description Returns the first currently selected object. Use this if you know you only have one selected item and don't want to deal with an array.
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  selection
 *
 * @return  {Object} The first selected object.
 */
pub.selection = function() {
  if(app.selection.length === 0) {
    error("selection(), selection is empty. Please select something.");
  }
  return app.selection[0];
};

/**
 * @description Returns the currently selected object(s)
 *
 * @cat     Document
 * @subcat  Page Items
 * @method  selections
 *
 * @param   {Function} [cb] The callback function to call with each item in the selection. When this function returns false the loop stops. Passed arguments: item, loopCount.
 * @return  {Array} Array of selected object(s).
 */
pub.selections = function(cb) {
  if(app.selection.length === 0) {
    error("selections(), selection is empty. Please select something.");
  }
  if (arguments.length === 1 && cb instanceof Function) {
    return forEach(app.selection, cb);
  }
  return app.selection;
};

/**
 * @description Ungroups an existing group. Returns an array of the items that were within the group before ungroup() was called.
 *
 * @cat     Document
 * @subCat  Page Items
 * @method  ungroup
 *
 * @param   {Group|String} group The group instance or name of the group to ungroup.
 * @return  {Array} An array of the ungrouped page items.
 */
pub.ungroup = function(group) {
  checkNull(group);
  var ungroupedItems = null;
  if(group instanceof Group) {
    ungroupedItems = pub.items(group);
    group.ungroup();
  } else if(typeof group === "string") {
    // get the Group of the given name
    group = currentDoc().groups.item(group);
    if (!group.isValid) {
      error("ungroup(), a group with the provided name doesn't exist.");
    }
    ungroupedItems = pub.items(group);
    group.ungroup();
  } else {
    error("ungroup(), not a valid group. Please select a valid group.");
  }
  return ungroupedItems;
};

// ----------------------------------------
// Document/Text
// ----------------------------------------

/**
 * @description Adds a page item or a string to an existing story. You can control the position of the insert via the last parameter. It accepts either an insertion point or one the following constants: `AT_BEGINNING` and `AT_END`.
 *
 * @cat     Document
 * @subcat  Text
 * @method  addToStory
 *
 * @param   {Story} story The story.
 * @param   {PageItem|String} itemOrString Either a page item or a string.
 * @param   {InsertionPoint|String} insertionPointOrMode Insertion point object or one the following constants: `AT_BEGINNING` and `AT_END`.
 */
pub.addToStory = function(story, itemOrString, insertionPointorMode) {

  checkNull(story);
  checkNull(itemOrString);

  // init
  var libFileName = "addToStoryLib.indl";

  var libFile = new File(Folder.temp + "/" + libFileName);
  addToStoryCache = app.libraries.itemByName(libFileName);
  // if and a cache is existing from previous executions, remove it
  if (addToStoryCache.isValid) {
    addToStoryCache.close();
    libFile.remove();
  }
  // create an InDesign library for caching the page items
  addToStoryCache = app.libraries.add(libFile);


  if (story instanceof Story && arguments.length >= 2) {
    // add string
    if (isString(itemOrString)) {
      if (insertionPointorMode instanceof InsertionPoint) {
        insertionPointorMode.contents = itemOrString;
      } else if (insertionPointorMode === pub.AT_BEGINNING) {
        story.insertionPoints.firstItem().contents = itemOrString;
      } else {
        story.insertionPoints.lastItem().contents = itemOrString;
      }
    } else {
      // store the item as first asset in cache
      addToStoryCache.store(itemOrString);

      var insertionPoint = null;
      if (insertionPointorMode instanceof InsertionPoint) {
        insertionPoint = insertionPointorMode;
      } else if (insertionPointorMode === pub.AT_BEGINNING) {
        insertionPoint = story.insertionPoints.firstItem();
      } else {
        insertionPoint = story.insertionPoints.lastItem();
      }

      // place & remove from cache
      addToStoryCache.assets.firstItem().placeAsset(insertionPoint);
      addToStoryCache.assets.firstItem().remove();
    }
  } else {
    error("addToStory(), wrong arguments! Please use: addToStory(story, itemOrString, insertionPointorMode). Parameter insertionPointorMode is optional.");
  }
};

/**
 * @description If no callback function is given it returns a Collection of characters in the container otherwise calls the given callback function with each character of the given document, page, story, textFrame, paragraph, line or word.
 *
 * @cat     Document
 * @subcat  Text
 * @method  characters
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line|Word} container The document, page, story, textFrame, paragraph, line or word instance to  iterate the characters in.
 * @param   {Function} [cb] Optional: The callback function to call with each character. When this function returns false the loop stops. Passed arguments: `character`, `loopCount`
 * @return  {Characters} A collection of Character objects.
 */
pub.characters = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph, Line or Word.";
  return textCollection("characters", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of lines in the container otherwise calls the given callback function with each line of the given document, page, story, textFrame or paragraph.
 *
 * @cat     Document
 * @subcat  Text
 * @method  lines
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph} container The document, page, story, textFrame or paragraph instance to iterate the lines in.
 * @param   {Function} [cb] Optional: The callback function to call with each line. When this function returns false the loop stops. Passed arguments: `line`, `loopCount`.
 * @return  {Lines} A collection of Line objects.
 */
pub.lines = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame or Paragraph.";
  return textCollection("lines", legalContainers, container, cb);

};

/**
 * @description Links the stories of two textframes to one story. Text of first textframe overflows to second one.
 *
 * @cat     Document
 * @subcat  Text
 * @method  linkTextFrames
 *
 * @param   {TextFrame} textFrameA
 * @param   {TextFrame} textFrameB
 */
pub.linkTextFrames = function (textFrameA, textFrameB) {
  if (textFrameA instanceof TextFrame && textFrameB instanceof TextFrame) {
    textFrameA.nextTextFrame = textFrameB;
  } else {
    error("linkTextFrames(), wrong type of parameter! linkTextFrames() needs two textFrame objects to link the stories. Use: textFrameA, textFrameB");
  }
};

/**
 * @description If no callback function is given it returns a Collection of paragraphs in the container otherwise calls the given callback function with each paragraph of the given document, page, story or textFrame.
 *
 * @cat     Document
 * @subcat  Text
 * @method  paragraphs
 *
 * @param   {Document|Page|Story|TextFrame} container The document, story, page or textFrame instance to iterate the paragraphs in.
 * @param   {Function} [cb] Optional: The callback function to call with each paragraph. When this function returns false the loop stops. Passed arguments: `para`, `loopCount`.
 * @return  {Paragraphs} A collection of Paragraph objects.
 */
pub.paragraphs = function(container, cb) {

  var legalContainers = "Document, Story, Page or TextFrame.";
  return textCollection("paragraphs", legalContainers, container, cb);

};

/**
 * @description Fills the given text frame and all linked text frames with random placeholder text. The placeholder text will be added at the end of any already existing text in the text frame.
 *
 * @cat     Document
 * @subcat  Text
 * @method  placeholder
 *
 * @param   {TextFrame} textFrame The text frame to fill.
 * @return  {Text} The inserted placeholder text.
 */
pub.placeholder = function (textFrame) {
  if (textFrame instanceof TextFrame) {
    var startIx = textFrame.parentStory.insertionPoints[-1].index;
    textFrame.contents = TextFrameContents.PLACEHOLDER_TEXT;
    var endIx = textFrame.parentStory.insertionPoints[-1].index - 1;
    return textFrame.parentStory.characters.itemByRange(startIx, endIx);
  } else {
    error("placeholder(), wrong type of parameter! Use: textFrame");
  }
};

/**
 * @description If no callback function is given it returns a Collection of items otherwise calls the given callback function with each story of the given document.
 *
 * @cat     Document
 * @subcat  Text
 * @method  stories
 *
 * @param   {Document} doc The document instance to iterate the stories in
 * @param   {Function} [cb] The callback function to call with each story. When this function returns `false` the loop stops. Passed arguments: `story`, `loopCount`.
 * @return  {Stories} A collection of Story objects.
 *
 * @example
 * stories(doc(), function(story, loopCount){
 *   println("Number of words in each Story:");
 *   println(story.words.length);
 * });
 */
pub.stories = function(doc, cb) {

  checkNull(doc);

  if(arguments.length === 1 && doc instanceof Document) {
    return doc.stories;
  } else if (cb instanceof Function) {
    return forEach(doc.stories, cb);
  }
  error("stories(), incorrect call. Wrong parameters!");
  return null;
};

/**
 * @description If no callback function is given it returns a Collection of words in the container otherwise calls the given callback function with each word of the given document, page, story, textFrame, paragraph or line.
 *
 * @cat     Document
 * @subcat  Text
 * @method  words
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line} container The document, page, story, textFrame, paragraph or line instance to iterate the words in.
 * @param   {Function} [cb] The callback function to call with each word. When this function returns false the loop stops. Passed arguments: `word`, `loopCount`.
 * @return  {Words} A collection of Word objects.
 */
pub.words = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph or Line.";
  return textCollection("words", legalContainers, container, cb);

};

// ----------------------------------------
// Document Private
// ----------------------------------------

var forEachTextCollection = function(container, collection, cb) {
  // var collection;
  if(container instanceof Document) {
    collection = container.stories.everyItem()[collection];
  } else {
    collection = container.textFrames.everyItem()[collection];
  }

  for (var i = 0; i < collection.length; i++) {
    if(cb(collection[i], i) === false) {
      return false;
    }
  }
  return true;
};

var getPage = function(page, parentFunctionName) {
  // get a page by number, name, page object or page item, without jumping to the page
  if(isNumber(page)) {
    // target page by document offset
    if(isInteger(page) && page > 0 && page <= currentDoc().pages.length) {
      return currentDoc().pages[page - 1];
    } else {
      error(parentFunctionName + "(), page " + page + " does not exist.");
    }
  } else if(isString(page)) {
    // target page by name
    if(currentDoc().pages.item(page).isValid) {
      return currentDoc().pages.item(page);
    } else {
      error(parentFunctionName + "(), the page \"" + page + "\" does not exist.");
    }
  } else if(page instanceof Page) {
    // target page object
    return page;
  } else if (page.hasOwnProperty("parentPage")) {
    // target page via page item
    if(page.parentPage === null) {
      // page item is on the pasteboard, return first page of spread
      while(!(page.parent instanceof Spread)) {
        if(page.parent instanceof Character) {
          // anchored page item
          page = page.parent.parentTextFrames[0];
        } else {
          // nested page item
          page = page.parent;
        }
      }
      return page.parent.pages[0];
    } else {
      return page.parentPage;
    }
  } else {
    // TODO make this message work for all parent functions
    error(parentFunctionName + "(), invalid parameter. Use page number, page name, page object or a page item.");
  }

}

var getAndUpdatePage = function(page, parentFunctionName) {

    currPage = getPage(page, parentFunctionName)
    updatePublicPageSizeVars();
    if (currentDoc().windows.length) {
      // focus GUI on new page, if not in HIDDEN mode
      app.activeWindow.activePage = currPage;
    }
    return currPage;
}

var getMasterSpread = function(master, parentFunctionName) {

  if(isString(master)) {

    var ms = currentDoc().masterSpreads;

    if(master.indexOf("-") > 0) {
      // full name is presumably given
      for (var i = 0; i < ms.length; i++) {
        if(ms[i].name === master) {
          master = ms[i];
          break;
        }
      }
    }

    if(isString(master) && master.length <= 4) {
      // suffix is given
      for (var j = 0; j < ms.length; j++) {
        if(ms[j].namePrefix === master) {
          master = ms[j];
          break;
        }
      }
    }

    if(isString(master)) {
      var prefixErrorMsg = master.length <= 4 ? "or with prefix \"" + master + "\" " : "";
      error(parentFunctionName + "(), the master page named \"" + master + "\" " + prefixErrorMsg + "does not exist.");
    }

  }

  if(!(master instanceof MasterSpread)) {
    error(parentFunctionName + "(), invalid master parameter! Use full master page name, master page prefix or master spread object.");
  }

  return master;
}

var textCollection = function(collection, legalContainers, container, cb) {

  checkNull(container);

  if(!(container.hasOwnProperty("contents") || container instanceof Document || container instanceof Page)) {
    error(collection + "(), wrong object type. Use: " + legalContainers);
  }

  if(cb instanceof Function) {
    // callback function is passed
    if (container instanceof Document || container instanceof Page) {
      return forEachTextCollection(container, collection, cb);
    }
    return forEach(container[collection], cb);

  }
    // no callback function is passed
  if(container instanceof Document) {
    return container.stories.everyItem()[collection];
  } else if (container instanceof Page) {
    return container.textFrames.everyItem()[collection];
  }
  return container[collection];


};
