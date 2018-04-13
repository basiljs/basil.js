// ----------------------------------------
// src/includes/structure.js
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
/**
 * @description Suspends the calling thread for a number of milliseconds.<br>
 *          During a sleep period, checks at 100 millisecond intervals to see
 *          whether the sleep should be terminated.
 *
 * @cat     Environment
 * @method  delay
 * @param   {Number} milliseconds The delay time in milliseconds.
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};

/**
 * @description If no callback function is given it returns a Collection of
 *          items otherwise calls the given callback function with each story of
 *          the given document.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  stories
 *
 * @param   {Document} doc The document instance to iterate the stories in
 * @param   {Function} [cb] The callback function to call with each story. When
 *          this function returns `false` the loop stops. Passed arguments:
 *          `story`, `loopCount`.
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
 * @description If no callback function is given it returns a Collection of
 *          paragraphs in the container otherwise calls the given callback
 *          function with each paragraph of the given document, page, story or
 *          textFrame.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  paragraphs
 *
 * @param   {Document|Page|Story|TextFrame} container The document, story, page
 *          or textFrame instance to iterate the paragraphs in.
 * @param   {Function} [cb] Optional: The callback function to call with each
 *          paragraph. When this function returns false the loop stops. Passed
 *          arguments: `para`, `loopCount`.
 * @return  {Paragraphs} A collection of Paragraph objects.
 */
pub.paragraphs = function(container, cb) {

  var legalContainers = "Document, Story, Page or TextFrame.";
  return textCollection("paragraphs", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of
 *          lines in the container otherwise calls the given callback function
 *          with each line of the given document, page, story, textFrame or
 *          paragraph.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  lines
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph} container The document,
 *          page, story, textFrame or paragraph instance to iterate the lines
 *          in.
 * @param   {Function} [cb] Optional: The callback function to call with each
 *          line. When this function returns false the loop stops. Passed
 *          arguments: `line`, `loopCount`.
 * @return  {Lines} A collection of Line objects.
 */
pub.lines = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame or Paragraph.";
  return textCollection("lines", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of
 *          words in the container otherwise calls the given callback function
 *          with each word of the given document, page, story, textFrame,
 *          paragraph or line.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  words
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line} container The
 *          document, page, story, textFrame, paragraph or line instance to
 *          iterate the words in.
 * @param   {Function} [cb] The callback function to call with each word. When
 *          this function returns false the loop stops. Passed arguments:
 *          `word`, `loopCount`.
 * @return  {Words} A collection of Word objects.
 */
pub.words = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph or Line.";
  return textCollection("words", legalContainers, container, cb);

};

/**
 * @description If no callback function is given it returns a Collection of
 *          characters in the container otherwise calls the given callback
 *          function with each character of the given document, page, story,
 *          textFrame, paragraph, line or word.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  characters
 *
 * @param   {Document|Page|Story|TextFrame|Paragraph|Line|Word} container The
 *          document, page, story, textFrame, paragraph, line or word instance
 *          to  iterate the characters in.
 * @param   {Function} [cb] Optional: The callback function to call with each
 *          character. When this function returns false the loop stops. Passed
 *          arguments: `character`, `loopCount`
 * @return  {Characters} A collection of Character objects.
 */
pub.characters = function(container, cb) {

  var legalContainers = "Document, Story, Page, TextFrame, Paragraph, Line or Word.";
  return textCollection("characters", legalContainers, container, cb);

};


/**
 * @description If no callback function is given it returns a Collection of
 *          items otherwise calls the given callback function for each of the
 *          PageItems in the given Document, Page, Layer or Group.
 *
 * @cat     Document
 * @subcat  Multi-Getters
 * @method  items
 *
 * @param   {Document|Page|Layer|Group} container The container where the
 *          PageItems sit in
 * @param   {Function|Boolean} [cb] Optional: The callback function to call for
 *          each PageItem. When this function returns false the loop stops.
 *          Passed arguments: `item`, `loopCount`.
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
 * @description Removes all page items (including locked ones) in the given
 *          Document, Page, Layer or Group. If the selected container is a
 *          group, the group itself will be removed as well.
 *
 * @cat     Document
 * @method  clear
 *
 * @param   {Document|Page|Layer|Group} container The container where the
 *          PageItems sit in.
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
