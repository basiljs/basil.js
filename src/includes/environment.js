// ----------------------------------------
// src/includes/environment.js
// ----------------------------------------

// ----------------------------------------
// Environment
// ----------------------------------------

/**
 * @summary Pauses script execution for a certain amount of time.
 * @description Suspends the calling thread for a number of milliseconds.
 * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
 *
 * @cat     Environment
 * @method  delay
 *
 * @param   {Number} milliseconds The delay time in milliseconds.
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};

/**
 * @summary Sets the framerate of a looping script.
 * @description Sets the framerate per second to determine how often `loop()` is called per second. If the processor is not fast enough to maintain the specified rate, the frame rate will not be achieved. Setting the frame rate within `setup()` is recommended. The default rate is 25 frames per second. Calling `frameRate()` with no arguments returns the currently set framerate.
 *
 * @cat     Environment
 * @method  frameRate
 *
 * @param   {Number} [fps] Frames per second.
 * @return  {Number} Currently set frame rate.
 */
pub.frameRate = function(fps) {
  if(arguments.length) {
    if(!isNumber(fps) || fps <= 0) {
      error("frameRate(), invalid argument. Use a number greater than 0.")
    }

    currFrameRate = fps;
    if(currIdleTask) {
      currIdleTask.sleep = Math.ceil(1000 / fps);
    }
  }
  return currFrameRate;
};

/**
 * @summary The height of the current page.
 * @description System variable which stores the height of the current page.
 *
 * @cat      Environment
 * @property {Number} height Height of the current page.
 */
pub.height = null;

/**
 * @summary Inspects a var and lists its properties and methods.
 * @description Inspects a given object or any other data item and prints the result to the console. This is useful for inspecting or debugging any kind of variable or data item. The optional settings object allows to control the function's output. The following parameters can be set in the settings object:
 * - `showProps`: Show or hide properties. Default: `true`
 * - `showValues`: Show or hide values. Default: `true`
 * - `showMethods`: Show or hide methods. Default: `false`
 * - `maxLevel`: Chooses how many levels of properties should be inspected recursively. Default: `1`
 * - `propList`: Allows to pass an array of property names to show. If `propList` is not set all properties will be shown. Default: `[]` (no propList)
 * If no settings object is set, the default values will be used.
 *
 * @cat     Environment
 * @method  inspect
 *
 * @param   {Object} obj An object or any other data item to be inspected.
 * @param   {Object} [settings] A settings object to control the function's behavior.
 * @param   {Boolean} [settings.showProps] Show or hide properties. Default: `true`
 * @param   {Boolean} [settings.showValues] Show or hide values. Default: `true`
 * @param   {Boolean} [settings.showMethods] Show or hide methods. Default: `false`
 * @param   {Number} [settings.maxLevel] How many levels of properties should be inspected recursively. Default: `1`
 * @param   {Array} [settings.propList] Array of properties to show. Default: `[]` (no propList)
 *
 * @example <caption>Inspecting a string</caption>
 * inspect("foo");
 *
 * @example <caption>Inspecting the current page, its methods and an additional level of properties</caption>
 * inspect(page(), {showMethods: true, maxLevel: 2})
 *
 * @example <caption>Inspecting an ellipse, listing only the properties "geometricBounds" and "strokeWeight"</caption>
 * var myEllipse = ellipse(0, 0, 10, 10);
 * inspect(myEllipse, {maxLevel: 2, propList: ["geometricBounds, strokeWeight"]});
 */
pub.inspect = function (obj, settings, level, branchArray, branchEnd) {

  var output, indent;
  output = indent = "";

  if (!level) {
    level = 0;
    branchArray = [];

    if(!settings) {
      settings = {};
    }

    // set settings object to given values or defaults
    settings.showProps = settings.hasOwnProperty("showProps") ? settings.showProps : true;
    settings.showValues = settings.hasOwnProperty("showValues") ? settings.showValues : true;
    settings.showMethods = settings.hasOwnProperty("showMethods") ? settings.showMethods : false;
    settings.maxLevel = settings.hasOwnProperty("maxLevel") ? settings.maxLevel : 1;
    settings.propList = settings.hasOwnProperty("propList") ? settings.propList : [];

    if(obj === null || obj === undefined) {
      println(obj + "");
      return;
    }

    if(obj.constructor.name === "Array") {
      if(obj.length > 0 && obj.reflect.properties.length < 3) {
        // fixing InDesign's buggy implementation of certain arrays
        // see: https://forums.adobe.com/message/9408120#9408120
        obj = Array.prototype.slice.call(obj, 0);
      }
      output += "[" + obj.join(", ") + "] (Array)";
    } else if (obj.constructor.name === "String") {
      output += "\"" + obj + "\" (String)";
    } else {
      output += obj + " (" + obj.constructor.name + ")";
    }
  } else {
    // setting up tree structure indent
    if(branchArray.length < level) {
      branchArray.push(branchEnd);
    } else if (branchArray.length > level) {
      branchArray.pop();
    }
    if(branchEnd) {
      if(!(level === 1 && settings.showMethods)) {
        branchArray[branchArray.length - 1] = true;
      }
    }
    for (var i = 0; i < level; i++) {
      if(branchArray[i]) {
        indent += "    ";
      } else {
        indent += "|   ";
      }
    }
  }

  if(settings.showProps) {
    var propArray, value, usePropList;

    if(level === 0 && settings.propList.length > 0 && settings.propList.constructor.name === "Array") {
      usePropList = true;
      propArray = settings.propList.reverse();
    } else if (obj.constructor.name === "Array") {
      // correct sorting for Array number properties (0, 1, 2 etc.)
      propArray = obj.reflect.properties.sort(function(a, b) {return a - b}).reverse();
    } else {
      propArray = obj.reflect.properties.sort().reverse();
    }

    if(propArray.length > 1 || usePropList) {
      output += "\n" + indent + "|";

      for (var i = propArray.length - 1; i >= 0; i--) {
        if(propArray[i] == "__proto__" || propArray[i] == "__count__" || propArray[i] == "__class__"|| propArray[i] == "reflect") {
          if(!i) {
            output += "\n" + indent;
          }
          continue;
        }

        if(settings.showValues) {

          try {
            var propValue = obj[propArray[i]];
            if (usePropList && !obj.hasOwnProperty(propArray[i]) && propArray[i] != "length") {
              // in case a non-existing prop is passed via propList
              // "length" needs special handling as it is not correctly recognized as a property
              value = ": The inspected item has no such property.";
            } else if (propValue === null || propValue === undefined) {
              value = ": " + propValue;
            } else if (propValue.constructor.name === "Array") {
              if(propValue.length > 0 && propValue.reflect.properties.length < 3) {
                propValue = Array.prototype.slice.call(propValue, 0);
              }
              value = ": Array (" + propValue.length + ")";
              if(propValue.length && level < settings.maxLevel - 1) {
                // recursive inspecting of Array properties
                value += pub.inspect(propValue, settings, level + 1, branchArray, !i);
              }
            } else if (typeof propValue === "object" && propValue.constructor.name !== "Enumerator"  && propValue.constructor.name !== "Date") {
              value = ": " + propValue;
              if(level < settings.maxLevel - 1) {
                // recursive inspecting of Object properties
                value += pub.inspect(propValue, settings, level + 1, branchArray, !i);
              }
            } else {
              value = ": " + propValue.toString();
            }
          } catch (e) {
            if(e.number === 30615) {
              value = ": The property is not applicable in the current state.";
            } else if (e.number === 55) {
              value = ": Object does not support the property '" + propArray[i] + "'.";
            } else {
              // other InDesign specific error messages
              value = ": " + e.message;
            }
          }

        } else {
          value = "";
        }

        output += "\n" + indent + "|-- " + propArray[i] + value;


        if(!i && !branchEnd && level !== 0) {
          // separation space when a sub-branch ends
          output += "\n" + indent;
        }
      } // end for-loop
    } // end if(propArray.length > 1 || usePropList)
  } // end if(settings.showProps)

  if(level === 0 && settings.showMethods) {

    var methodArray = settings.showMethods ? obj.reflect.methods.sort().reverse() : [];

    if(methodArray.length) {
      output += "\n|" +
                "\n|   METHODS";
    }

    for (var i = methodArray.length - 1; i >= 0; i--) {
      if(methodArray[i].name.charAt(0) === "=") {continue;}
      output += "\n|-- " + methodArray[i] + "()";
    }
  }

  if(level > 0) {
    // return for recursive calls
    return output;
  }
  // print for top level call
  println(output);

};

/**
 * @summary Prints info about the current environment to the console.
 * @description Print numerous information about the current environment to the console.
 *
 * @cat     Environment
 * @method  printInfo
 */
pub.printInfo = function() {

  pub.println("###");
  pub.println("OS: " + $.os);
  pub.println("ExtendScript Build: " + $.build);
  pub.println("ExtendScript Version:" + $.version);
  pub.println("Engine: " + $.engineName);
  pub.println("memCache: " + $.memCache + " bytes");
  pub.println("###");

};

/**
 * @summary Gets the current document's project folder.
 * @description Get the folder of the active document as a Folder object. Use .absoluteURI to access a string representation of the folder path.
 *
 * @cat     Environment
 * @method  projectFolder
 *
 * @return  {Folder} The folder of the the active document
 */
pub.projectFolder = function() {
  if(!currentDoc().saved) {
    error("The current document must be saved before its project directory can be accessed.");
  }
  return currentDoc().filePath;
};

/**
 * @summary Sets an objects property.
 * @description Sets a property of an object or of any other given data item to the specified value. Alternatively an object of key value pairs can be used as the second argument to set several properties to specified values at once. To retrieve a list of available properties for the different data types, the inspect() method can be used.
 *
 * @cat     Environment
 * @method  property
 *
 * @param   {Any} obj An object or any other data item whose properties to change.
 * @param   {String|Object} prop A string describing an object's property or alternatively an object containing key value pairs.
 * @param   {Any} [value] A value of the appropriate type to set the object's property to.
 * @return  {Any} The object or other data item with the newly set property.
 *
 * @example <caption>Sets name and fill color of an ellipse</caption>
 * var ell = ellipse(100, 100, 50, 50);
 * property(ell, "name", "Red Circle");
 * property(ell, "fillColor", color(255, 0, 0));
 *
 * @example <caption>Sets name and fill color of a rectangle and locks it, using an object with key value pairs</caption>
 * var blueSquare = rect(100, 100, 50, 50);
 * var squareProps = {
 *   name: "Blue Square",
 *   fillColor: color(0, 0, 255),
 *   locked: true
 * }
 * property(blueSquare, squareProps);
 */
pub.property = function(obj, prop, value) {

  if(obj === null || obj === undefined) {
    error("property(), given object is undefined or does not exist.");
  }

  if(obj.hasOwnProperty(isValid) && !obj.isValid) {
    error("property(), object does not exist.");
  }

  if(isString(prop)) {

    if(!obj.hasOwnProperty(prop)) {
      error("property(), invalid property. The given " + (obj.constructor.name).toLowerCase() + " does not have a property \"" + prop + "\".");
    }

    try {
      obj[prop] = value;
    } catch(e) {
      error("property(), invalid arguments.\n" +
            "(" + obj + ", \"" + prop + "\", " + value + ");\n\n" +
            e.message);
    }

  } else if(prop instanceof Object) {

    for(var key in prop) {
      pub.property(obj, key, prop[key]);
    }

  } else {
    error("property(), invalid second argument. Use property name string or an object with key value pairs.");
  }

  return obj;
};

/**
 * @summary Sets the size of the current document.
 * @description Sets the size of the current document, if arguments are given. If only one argument is given, both the width and the height are set to this value. Alternatively, a string can be given as the first argument to apply an existing page size preset (`"A4"`, `"Letter"` etc.). In this case, either `PORTRAIT` or `LANDSCAPE` can be used as a second argument to determine the orientation of the page. If no argument is given, an object containing the current document's width and height is returned.
 *
 * @cat     Environment
 * @method  size
 *
 * @param   {Number|String} [widthOrPageSize] The desired width of the current document or the name of a page size preset.
 * @param   {Number|String} [heightOrOrientation] The desired height of the current document. If not provided the width will be used as the height. If the first argument is a page size preset, the second argument can be used to set the orientation.
 * @return  {Object} Object containing the current `width` and `height` of the document.
 *
 * @example <caption>Sets the document size to 70 x 100 units</caption>
 * size(70, 100);
 *
 * @example <caption>Sets the document size to 70 x 70</caption>
 * size(70);
 *
 * @example <caption>Sets the document size to A4, keeps the current orientation in place</caption>
 * size("A4");
 *
 * @example <caption>Sets the document size to A4, set the orientation to landscape</caption>
 * size("A4", LANDSCAPE);
 */
pub.size = function(widthOrPageSize, heightOrOrientation) {
  if(app.documents.length === 0) {
    // there are no documents
    warning("size()", "You have no open document.");
    return;
  }
  if (arguments.length === 0) {
    // no arguments given
    // return the current values
    return {width: pub.width, height: pub.height};
  }

  var doc = currentDoc();

  if(isString(widthOrPageSize)) {
    try {
      doc.documentPreferences.pageSize = widthOrPageSize;
    } catch (e) {
      error("size(), could not find a page size preset named \"" + widthOrPageSize + "\".");
    }
    if(heightOrOrientation === pub.PORTRAIT || heightOrOrientation === pub.LANDSCAPE) {
      doc.documentPreferences.pageOrientation = heightOrOrientation;
    }
    pub.width = $.global.width = doc.documentPreferences.pageWidth;
    pub.height = $.global.height = doc.documentPreferences.pageHeight;
    return {width: pub.width, height: pub.height};
  } else if(arguments.length === 1) {
    // only one argument set the first to the secound
    heightOrOrientation = widthOrPageSize;
  }
  // set the document's pageHeight and pageWidth
  doc.properties = {
    documentPreferences: {
      pageHeight: heightOrOrientation,
      pageWidth: widthOrPageSize
    }
  };
  // set height and width
  pub.width = $.global.width = widthOrPageSize;
  pub.height = $.global.height = heightOrOrientation;

  return {width: pub.width, height: pub.height};

};

/**
 * @summary The width of the current page.
 * @description System variable which stores the width of the current page.
 *
 * @cat      Environment
 * @property {Number} width Width of the current page.
 */
pub.width = null;

// ----------------------------------------
// Environment/Constants
// ----------------------------------------

/**
 * @summary The name of the current script.
 * @description The name of the current script.
 *
 * @cat      Environment
 * @subcat   Constants
 * @property SCRIPTNAME {String}
 */
var stackArray = $.stack.
            replace(/[\n]toString\(\)[\n]$/,'').
            replace(/[\[\]']+/g,'').
            split(/[\n]/);
var scriptName;
if($.sblimeRunner) {
  // script is run via Sublime Text
  scriptName = stackArray[1];
} else {
  scriptName = stackArray[0];
}
pub.SCRIPTNAME = scriptName;

/**
 * @summary The basil version.
 * @description The basil version
 *
 * @cat      Environment
 * @subcat   Constants
 * @property VERSION {String}
 */
pub.VERSION = "1.1.0";
