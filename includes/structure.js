// ----------------------------------------
// Structure

/**
 * Suspends the calling thread for a number of milliseconds.
 * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
 *
 * @cat Environment
 * @method delay
 * @param  {Number} milliseconds  The delay time in milliseconds
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each story of the given document.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method stories
 * @param  {Document} doc The document instance to iterate the stories in
 * @param  {Function} [cb]  Optional: The callback function to call with each story. When this function returns false the loop stops. Passed arguments: story, loopCount;
 * @return {Stories[]} Array of Stories.
 */
pub.stories = function(doc, cb) {
  if(arguments.length === 1 && doc instanceof Document) {
    return doc.stories;
  } else if (cb instanceof Function) {
    return forEach(doc.stories, cb);
  } else {
    error("b.stories(), incorrect call. Wrong parameters!");
  }
};

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each paragraph of the given document, story or text frame.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method paragraphs
 * @param  {Document|Story|TextFrame} item The story or text frame instance to iterate the paragraphs in
 * @param  {Function} [cb]  Optional: The callback function to call with each paragraph. When this function returns false the loop stops. Passed arguments: para, loopCount
 * @return {Paragraphs[]} Array of Paragraphs.   
 */
pub.paragraphs = function(item, cb) {

  if(!item.hasOwnProperty('contents')) error("b.paragraphs(), Wrong object type.");

  if(arguments.length === 1) {
    return item.paragraphs;
  } else if (cb instanceof Function) {
    if (item instanceof Document) {
      return forEachStoryProperty(item, 'paragraphs', cb);
    } else {
      return forEach(item.paragraphs, cb);
    }
  }
};

// /**
//  * If no callback function is given it returns a Collection of strings otherwise calls the given callback function with each sentences of the given document, story or text frame.
//  *
//  * cat Document
//  * subcat Multi-Getters
//  * method sentences
//  * param  {Document|Story|TextFrame} item The story or text frame instance to iterate the sentences in
//  * param  {Function} cb  Optional: The callback function to call with each sentence. When this function returns false the loop stops. Passed arguments: sentence, loopCount
//  * return {Array} An array of strings
//  * 
//  */
//  // FIXME
// pub.sentences = function(item, cb) {

//   var err = false;
//   try{
//     item[0]; // check if list
//     err = true; // access ok -> error
//   } catch (expected) {};
//   if(err) error("b.sentences(), Array/Collection has been passed to b.sentences(). Single object expected.");

//   if(arguments.length >= 1 ) {
//     var arr;
//     try{
//       str = item.contents;  
//       arr = str.match( /[^\.!\?]+[\.!\?]+/g );
//     } catch (e){
//       error("b.sentences(), Object passed to b.sentences() does not have text or is incompatible.");
//     }

//     if(arguments.length === 1) {
//       return arr;
//     } else if (cb instanceof Function) {
//       forEach(arr,cb);
//     } else {
//       error("b.sentences(), the callback parameter is not a Function.");
//     }

//   }

// };

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each line of the given document, story, text frame or paragraph.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method lines
 * @param  {Document|Story|TextFrame|Paragraph} item The document, story, text frame or paragraph instance to
 *                                                   iterate the lines in
 * @param  {Function} [cb] Optional: The callback function to call with each line. When this function returns false the loop stops. Passed arguments: line, loopCount
 * @return {Lines[]} Array of lines.
 */
pub.lines = function(item, cb) {

  if(!item.hasOwnProperty('contents')) error("b.lines(), Wrong object type.");

  if(arguments.length === 1) {
    return item.lines;
  } else if (cb instanceof Function) {
    if (item instanceof Document) {
      return forEachStoryProperty(item, 'lines', cb);
    } else {
      return forEach(item.lines, cb);
    }
  }
};

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each word of the given document, story, text frame, paragraph or line.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method words
 * @param  {Document|Story|TextFrame|Paragraph|Line} item The document, story, text frame, paragraph or line instance
 *                                                        to iterate the words in
 * @param  {Function} [cb] Optional: The callback function to call with each word. When this function returns false the loop stops. Passed arguments: word, loopCount
 * @return {Words[]} Array of Words.
 */
pub.words = function(item, cb) {

  if(!item.hasOwnProperty('contents')) error("b.words(), Wrong object type.");
  
  if(arguments.length === 1){
    return item.words;
  } else if (cb instanceof Function) {
    if (item instanceof Document) {
      return forEachStoryProperty(item, 'words', cb);
    } else {
      return forEach(item.words, cb);
    }
  }
};

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function with each character of the given document, story, text frame, paragraph, line or word.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method characters
 * @param  {Document|Story|TextFrame|Paragraph|Line|Word} item The document, story, text frame, paragraph, line or word instance to
 *                                                    iterate the characters in
 * @param  {Function} [cb] Optional: The callback function to call with each character. When this function returns false the loop stops. Passed arguments: character, loopCount
 * @return {Characters} You can use it like an array.
 */
pub.characters = function(item, cb) {

  if(!item.hasOwnProperty('contents')) error("b.characters(), Wrong object type.");

  if(arguments.length === 1) {
    return item.characters;
  } else if ( cb instanceof Function) {
    if (item instanceof Document) {
      return forEachStoryProperty(item, 'characters', cb);
    } else {
      return forEach(item.characters, cb);
    }
  }
};

var forEachStoryProperty = function(doc, property, cb) {
  var loopCount = 0;
  pub.stories(doc, function(story) {
    var properties = story[property];
    for (var i = 0, len = properties.length; i < len; i++) {
      if(cb(properties[i], loopCount++) === false) {
        return false;
      }
    }
    return true;
  });
};

/**
 * If no callback function is given it returns a Collection of items otherwise calls the given callback function for each of the PageItems in the given Document, Page, Layer or Group.
 *
 * @cat Document
 * @subcat Multi-Getters
 * @method items
 * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in
 * @param  {Function|Boolean} [cb] Optional: The callback function to call for each PageItem. When this function returns false the loop stops. Passed arguments: item, loopCount. 
 * @return {PageItems[]} array or PageItems.
 */
pub.items = function(container, cb) {

  if (container instanceof Document 
    || container instanceof Page 
    || container instanceof Layer 
    || container instanceof Group) {

    if(arguments.length === 1 || cb === false){
      return container.allPageItems;
    } else if(cb instanceof Function ) {
      return forEach(container.allPageItems, cb);
    }
  } else {
    error("b.items(), Not a valid PageItem container, should be Document, Page, Layer or Group");
  }
};


/**
 * Removes all PageItems in the given Document, Page, Layer or Group.
 *
 * @cat Document
 * @method clear
 * @param  {Document|Page|Layer|Group} container The container where the PageItems sit in
 */
pub.clear = function(container) {

  if (container instanceof Document 
    || container instanceof Page 
    || container instanceof Layer 
    || container instanceof Group) {

      return forEach(container.allPageItems, function(item,n){
        // Groups have to be avoided for deletion
        // otherwise deletion process is confused
        if(item !== null && ! (item instanceof Group) ) {
          if(item.locked) error("b.clear(), some items are locked. Please unlock them first and sue then b.clear().");
          item.remove();
        }
      });

    } else {
      return false;
    }
};

/**
 * Removes the provided Page, Layer, PageItem, Swatch, etc.
 *
 * @cat Document
 * @method remove
 * @param  {PageItem} obj The object to be removed
 */
pub.remove = function(obj) {

  if(obj.hasOwnProperty("remove")) {
    obj.remove();
  } else {
    throw new Error("Provided object cannot be removed in b.remove().");
  }
}