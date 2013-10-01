// check if a targetengine has been initiated
// if ($.engineName !== 'basiljs') {
//   #targetengine 'basiljs';
// }


/*
 * Class for creating a user control within Adobe InDesign for manipulating Basil.js variables.
 * 
 * @cat Interface
 *
 * @example create array of controllers
 * var controllers = {
 *   mySlider1: {
 *     label: 'Slider1',
 *     type: 'slider',
 *     range: [0, 100],
 *     value: 50,
 *     onChanging: function(value) {
 *       myFunction();
 *     }
 *   }
 * };
 * var dialog = new control.palette('Interface Example', controllers);
 *
 * function myFunction() {
 *   // do something when the slider is moved
 * };
 *
 * 
 * @example create dialog and add controllers
 * var dialog = new control.palette('Interface Example');
 * dialog.add('slider', 'mySlider1', 25, {label: 'Doc Width',range: [0,b.width]});
 * dialog.add('slider', 'mySlider2', 25, {label: 'Doc Height', range: [0,b.height]});
 * 
 */

/*
 *  TODO:
 *  - improve standard layout appearance
 *  - add layout customizeability
 *  - create base() class for window invocation
 *  - implement missing/additional controllers
 *  - improve clearing of variables within targetengine
 *  - debug! debug! debug!
 */

// namespace
// interface cannot be used, as it's a reserved keyword
var control = {
  //
  // Private
  // Global Properties
  // 
  win: null,
  winControllersGroup: null,
  winControllerList: {},
  winValue: {},

  // Global type style and size
  typesize: 10,
  // the root of my 'fiesen bug'!
  // it seems typeface must be defined when creating
  // the interface window
  typeface: null,
  longestLabel: 0,


  // ------------------------------------------------------------------------
  //
  // Classes
  // 

  /**
   * Class of individual UI controller elements
   * these are private methods which are only used
   * by control.Prompt and control.Palette via
   * the components array
   * 
   * @param {GroupSUI} Container   the name of the Group (ScriptUI) all the controllers are drawn in
   */
  controllers: function() {
    /**
     * Private
     * controller initialization of base properties for every controller
     * 
     * @param {Array} properties    Basil.js controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function init(properties) {
      var propertiesBase = {
        type:       null,
        name:       null,
        label:      (properties.label != undefined) ? properties.label + '\u00A0' : '\u00A0',
        value:      null,
        valueLabel: false,   /* default: false (value not shown) */
        valueType:  null,
        visible:    true,    /* default: true (is visible) */
        enabled:    true,    /* default: true (is enabled) */
        width:      -1,      /* default: -1 (automatic width) */
        height:     -1,      /* default: -1 (automatic height) */

        onClick:    function(){},
        onChange:   function(){},
        onChanging: function(){}
      };
      // ensures that each controller has the core
      // set of properties
      return control.__mergeArray(propertiesBase, properties);
    };


    /*
     * 
     * Buttons
     *   
     */

    /**
     * Button - A pushbutton containing a mouse-sensitive text string
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Button(name, container, properties) {
      // ensure appropriate properties exist
      properties = init(properties);

      properties.width = (properties.width == 'full')
        ? control.win.preferredSize.width
        : properties.width;

      var group = container.add('group');
      group.orientation = 'row';

      if( properties.label != '\u00A0' ) {
        var label = new Label(properties.label, group, {
          alignment: 'center',
          label: properties.label
        });
      }

      var clickCount = -1;
      var button = group.add('button', undefined, properties.value, {name: name});
      button.graphics.font = control.typeface;
      button.preferredSize.height = properties.height;
      button.preferredSize.width = properties.width;

      button.onClick = function() {
        clickCount++;
        try {
          properties.onClick(clickCount);
        }
        catch(err) {}
        try {
          properties.onChange(clickCount);
        }
        catch(err) {}
        try {
          properties.onChanging(clickCount);
        }
        catch(err) {}
        return clickCount;
      };

      // update value
      properties['value'] = properties.value;

      return properties;
    };

    /**
     * Checkbox - A dual-state control showing a box with a checkmark when value is true, empty when value is false
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Checkbox(name, container, properties) {
      // ensure appropriate properties exist
      properties = init(properties);
      // printProperties( properties );

      var group = container.add('group');
      group.orientation = 'row';
      group.alignment = ['left','center'];

      var label = new Label(properties.label, group, {
        alignment: 'center',
        label: properties.label
      });

      var check = group.add('checkbox', undefined, '', {
        name: name
      });
      check.onClick = function() {
        var value = (properties.valueType == 'int')
          ? ((this.value) ? 1 : 0)
          : this.value;
        // control.__update();
        try {
          properties.onClick(value);
        }
        catch(err) {}
        try {
          properties.onChange(value);
        }
        catch(err) {}
        try {
          properties.onChanging(value);
        }
        catch(err) {}
        properties['value'] = value;
        return this.value;
      };

      // update value
      properties['value'] = (properties.valueType == 'int')
        ? ((check.value) ? 1 : 0)
        : check.value;

      return properties;
    };


    /*
     * 
     * Text
     *   
     */

    /**
     * Private
     * initialization of Text Controller properties
     * 
     * @param {Array} properties
     * @return {Array} properties
     */
    function initText(properties) {
      return control.__mergeArray({
          length:     null,
          maxLength:  22,       /* default: 22 (== width: 200px) */
          multiline:  false,    /* default: false */
          columns:    null,
          rows:       null,
          alignment:  'center'  /* default: 'center' */
        },
        init(properties));
    };

    /**
     * Label - A text field that the user cannot change 
     * 
     * @param {String} name         the name of the Palette window
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
     *
     * @return {StaticTextSUI}      the ScriptUI Component
     */
    function Label(name, container, properties) {
      // ensure appropriate properties exist
      properties = initText(properties);
      properties.valueType = 'string';

      var label = container.add('statictext', undefined, 'X', {
        name: name,
        multiline: true
      });
      var xwidth = label.preferredSize[0];
      control.longestLabel = (properties.label.length*xwidth > control.longestLabel) 
        ? properties.label.length*xwidth
        : control.longestLabel;
      label.justify = 'right';
      label.graphics.font = control.typeface;

      if( label.characters == null ) {
        // TODO: define and allow maximum width override
        var width = (control.longestLabel < 200) ? control.longestLabel : 200;
        label.preferredSize = [-1,-1];
        label.characters = ~~(width/xwidth);
        label.preferredSize[1] = -1;
      }
      label.text = properties.label;
      label.alignment = properties.alignment;

      return label;
    };

    /**
     * Text - An editable text field that the user can change
     *
     * TODO: make output String and Number specific (ala Scriptographer)?
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Text(name, container, properties) {
      // ensure appropriate properties exist
      properties = initText(properties);
      properties.valueType = (properties.valueType != null)
        ? properties.valueType
        : 'string';

      var group = container.add('group');
      group.orientation = 'row';

      if( properties.label != '\u00A0' ) {
        var label = new Label(properties.label, group, {
          alignment: 'center',
          label: properties.label
        });
      }

      var text = group.add('edittext', undefined, properties.value, {name: name, multiline: properties.multiline});
      // TODO: define this more clearly
      text.characters = (properties.length != undefined)
        ? properties.length
        : (properties.columns == undefined)
          ? properties.maxLength
          : properties.columns;
      text.minimumSize.height = (properties.multiline && properties.rows != undefined) 
        ? (control.typesize+2)*(properties.rows+1)
        : (control.typesize+2)*1;
      text.graphics.font = control.typeface;

      text.onActivate = function() {
        var value = __updateValue(properties,this.text);
        try {
          properties.onClick(value);
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      }
      text.onChange = function() {
        var value = __updateValue(properties,this.text);
        try {
          properties.onChange(value);
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      };
      text.onChanging = function() {
        var value = __updateValue(properties,this.text);
        try {
          properties.onChanging(value);
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      };

      // update value
      properties['value'] = __updateValue(properties,text.text);

      return properties;
    };


    /*
     * 
     * Range Controllers
     *   
     */

    /**
     * Private
     * initialization of Range Controller properties
     * 
     * @param {Array} properties
     * @return {Array} properties
     */
    function initRange(properties) {
      return control.__mergeArray({
        range:  (properties.range != undefined) ? properties.range : [0.0, 1.0], /* default: [0.0,1.0] */
        min:    (properties.min != undefined) 
                  ? properties.min
                  : (properties.range != undefined)
                    ? properties.range[0]
                    : 0.0, /* default: 0.0 */
        max:    (properties.max != undefined)
                  ? properties.max
                  : (properties.range != undefined)
                    ? properties.range[1]
                    : 1.0  /* default: 1.0 */
        },
        init(properties));
    };

    /**
     * Progress - A horizontal rectangle that shows progress of an operation.
     * All progressbar controllers have a horizontal orientation. 
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Progress(name, container, properties) {
    };


    /**
     * Slider - A slider with a moveable position indicator.
     * All slider controllers have a horizontal orientation.
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Slider(name, container, properties) {
      // ensure appropriate properties exist
      properties = initRange(properties);

      var group = container.add('group');
      group.orientation = 'row';

      // create label
      var label = new Label(properties.label, group, {
        alignment: 'center',
        label: properties.label
      });

      // create slider
      var slider = group.add('slider', undefined,
        properties.value,
        properties.min,
        properties.max,
        {name: name}
      );
      slider.preferredSize = [properties.width, properties.height];

      // create value label
      var valueLabel = null;
      if( properties.valueLabel ) {
        valueLabel = new Label('valueLabel', group, {
          alignment: 'center',
          label: properties.value
        });
        valueLabel.preferredSize = [-1,-1];
        valueLabel.characters = (Math.abs(properties.max) > Math.abs(properties.min))
          ? properties.max.toString().length
          : properties.min.toString().length;
        valueLabel.characters += 2;
        valueLabel.justify = 'left';
      }

      // callbacks
      slider.addEventListener('mousedown', function() {
        var value = __updateValue(properties,this.value);
        try {
          properties.onClick(value);
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      });
      slider.onChange = function() {
        var value = __updateValue(properties,this.value);
        control.__update();
        try {
          properties.onChange(value);
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      };
      slider.onChanging = function() {
        var value = __updateValue(properties,this.value);
        control.__update();
        try {
          properties.onChanging(value);
        }
        catch(err) {}
        try {
          valueLabel.text = value;
        }
        catch(err) {}
        properties['value'] = value;
        return value;
      };

      // update value
      properties['value'] = __updateValue(properties,this.value);

      return properties;
    };


    /*
     * 
     * Organization
     *   
     */

    /**
     * Separator - a modified Panel which is only 1px tall
     * 
     * @param {String} name         the (variable) name of the Controller
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} properties    Basil.js List Controller properties (i.e type, label, range, etc.)
     *
     * @return {Array} properties
     */
    function Separator(name, container, properties) {
      // ensure appropriate properties exist
      properties = init(properties);

      // var label = new Label(properties.label, group, {
      //   alignment: 'center',
      //   label: properties.label
      // });
      // label.graphics.font = control.typeface;

      properties.width = (properties.width != -1)
        ? properties.width
        : control.win.preferredSize.width;

      var separator = container.add('panel', undefined);
      separator.preferredSize.height = separator.maximumSize.height = 1;
      separator.preferredSize.width = separator.maximumSize.width = properties.width;
      separator.alignment = ['center','center'];

      return properties;
    };


    // private
    var __updateValue = function(properties, value) {
      return (properties.valueType == 'int')
        ? parseInt(value)
        : (properties.valueType == 'string'
          ? value.toString()
          : control.__round(value,2)); // default float
    };


    return {
      // buttons
      Button: Button,
      Checkbox: Checkbox,
      // Color: Color,
      // Radio: Radio,

      // text
      Label: Label,
      Text: Text,

      // range
      Progress: Progress,
      Slider: Slider,

      // list
      // Dropdown: Dropdown,

      // organization
      Separator: Separator
    };

  }, /* end controllers */



  /**
   * Displays a modal dialog
   * 
   * @param {String} name           the name of the control window
   * @param {Array} controllerList  array of controllers
   *
   * @return {Array} controller properties
   */
  prompt: function(name, controllerList) {
    // Properties
    name = (name != undefined) ? name : 'Basil.js';
    controllerList = (controllerList != undefined) ? controllerList : {};

    // create window
    win = control.win = new Window('dialog', name, undefined);
    win.orientation = 'row';
    win.alignChildren = 'fill';

    control.typeface = ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, control.typesize);

    // let's always include a basil.js logo
    var logoGroup = win.add('group');
    var logo = logoGroup.add('image', undefined, File('~/Documents/basiljs/bundle/lib/basil_simple.png'));

    // create main holder
    var mainGroup = win.add('group');
    mainGroup.orientation = 'column';
    mainGroup.alignChildren = 'right';
    // mainGroup.alignChildren = 'fill';

    // create component holder group
    winControllersGroup = control.winControllersGroup = mainGroup.add('group');
    winControllersGroup.orientation = 'column';
    winControllersGroup.alignChildren = 'left';
    // winControllersGroup.alignChildren = 'fill';
    // winControllersGroup.preferredSize = [-1,-1];

    // create core return values
    control.winValue = {
      // this initiated window (palette)
      window: control.win,
      // this window's update function
      update:  control.win.update,
      // the add function to on-the-fly add controllers
      add: control.__add,
      // the remove function to on-the-fly remove controllers
      remove: control.__remove,
      // callback for window onClose
      onClose: function() {}
    };

    // callbacks
    win.onShow = function() {
      // create individual controls
      control.__addList( controllerList );
    };
    win.onClose = function() {
      try {
        control.winValue.onClose();
      }
      catch(err) {}
      // garbage clean-up attempt
      // http://forums.adobe.com/thread/478449
      control.__destroy();
    };

    // this event is fired as the palette window itself
    // is changed/updated (i.e. adding/removing controllers)
    win.addEventListener('changing', function() {
      // as components are added/removed on-the-fly
      // the value array must be updated before returning it
      control.__updateWinValues();
    });


    // always add an OK and Cancel button to prompts
    var buttongroup = mainGroup.add('group');
    buttongroup.alignment = 'right';

    var cancel = buttongroup.add('button', undefined, 'Cancel', {name: 'cancel'});
    cancel.onClick = function() {
      win.close(2);
    };
    var ok = buttongroup.add('button', undefined, 'OK', {name: 'ok'});
    ok.onClick = function() {
      win.close(1);
    };


    // show the interface window
    win.show();
    // center the interface windwo to the screen
    win.center();

    // return the value array
    return control.winValue;
  },



  /**
   * Creates a modeless dialog, also called a floating palette.
   * 
   * @param {String} name           the name of the controller window
   * @param {Array} controllerList  array of controllers
   *
   * @return {Array} controller properties
   */
  palette: function(name, controllerList) {
    // Properties
    name = (name != undefined) ? name : 'Basil.js';
    controllerList = (controllerList != undefined) ? controllerList : {};

    // create window
    win = control.win = new Window('palette', name, undefined);
    win.orientation = 'row';
    win.alignChildren = 'fill';

    control.typeface = ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, control.typesize);

    // create main holder
    var mainGroup = win.add('group');
    mainGroup.orientation = 'column';
    mainGroup.alignChildren = 'right';
    // mainGroup.alignChildren = 'fill';

    // create component holder group
    winControllersGroup = control.winControllersGroup = mainGroup.add('group');
    winControllersGroup.orientation = 'column';
    winControllersGroup.alignChildren = 'left';
    // winControllersGroup.alignChildren = 'fill';
    // winControllersGroup.preferredSize = [-1,-1];

    // create core return values
    control.winValue = {
      // this initiated window (palette)
      window: control.win,
      // this window's update function
      update:  control.win.update,
      // the add function to on-the-fly add controllers
      add: control.__add,
      // the remove function to on-the-fly remove controllers
      remove: control.__remove,
      // callback for window onClose
      onClose: function() {}
    };

    // callbacks
    win.onShow = function() {
      // create individual controls
      control.__addList( controllerList );
    };
    win.onClose = function() {
      try {
        control.winValue.onClose();
      }
      catch(err) {}
      // garbage clean-up attempt
      // http://forums.adobe.com/thread/478449
      control.__destroy();
    };

    // this event is fired as the palette window itself
    // is changed/updated (i.e. adding/removing controllers)
    win.addEventListener('changing', function() {
      // as components are added/removed on-the-fly
      // the value array must be updated before returning it
      control.__updateWinValues();
    });

    // show the interface window
    win.show();
    // center the interface windwo to the screen
    win.center();

    // return the value array
    return control.winValue;
  }, /* end dialogs */



  // ------------------------------------------------------------------------
  //
  // Methods
  //

  /**
   * Private
   * calls a global update() function, if it exists
   */
  __update: function() {
    try {
      if (typeof update === 'function') {
        update();
      }
    }
    catch(err) {}
  },

  /**
   * Private
   * ensures values output by interface window are up-to-date
   */
  __updateWinValues: function() {
    for( var name in control.winControllerList ) {
      // this connects the name of the controller to it's
      // corresponding value, thus making it easier for
      // the user to link interface controller names
      // directly to their value
      control.winValue[name] = control.winControllerList[name].value;
    }
  },

  /**
   * add component to the current control window
   *
   * @param {String} type       the controller type 
   * @param {String} name       the name of the controller (also it's variable name)
   * @param {Number} value      the controller's initial value
   * @param {Array} properties  controller properties (i.e type, label, range, etc.)
   *
   * @return {Array}             control component
   *
   * @example
   * var slider = dialog.add('slider', 'mySlider', 100, {range: [10,200]});
   * 
   */
  __add: function(type, name, value, properties) {
    // ensure properites contains name, value, and type
    properties['name'] = name;
    properties['value'] = value;
    properties['type'] = type = (type != undefined) ? type : 'undefined';

    var controller = null;
    if( control.winControllersGroup != null) {
      // // buttons
      if( type.toLowerCase() === 'button') {
        control.winControllerList[name] = controller = new control.controllers().Button(name, control.winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'checkbox') {
        control.winControllerList[name] = controller = new control.controllers().Checkbox(name, control.winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'color') {
      //   control.winControllerList[name] = controller = new control.controllers().Color(name, control.winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'radio') {
      //   control.winControllerList[name] = controller = new control.controllers().Radio(name, control.winControllersGroup, properties);
      }

      // text
      else if( type.toLowerCase() === 'label') {
        control.winControllerList[name] = controller = new control.controllers().Label(name, control.winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'text') {
        control.winControllerList[name] = controller = new control.controllers().Text(name, control.winControllersGroup, properties);
      }

      // range
      else if( type.toLowerCase() === 'progress') {
      //   control.winControllerList[name] = controller = new control.controllers().Progress(name, control.winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'slider') {
        control.winControllerList[name] = controller = new control.controllers().Slider(name, control.winControllersGroup, properties);
      }

      // list
      else if( type.toLowerCase() === 'dropdown') {
      //   control.winControllerList[name] = controller = new control.controllers().Dropdown(name, control.winControllersGroup, properties);
      }

      // organization
      else if( type.toLowerCase() === 'separator') {
        control.winControllerList[name] = controller = new control.controllers().Separator(name, control.winControllersGroup, properties);
      }

      else {
      //   b.println("control.add(), no valid controller type specified!");
      }
    }
    else {
      b.println("control.add(), no valid control dialog or controller type specified!");
    }

    if( controller != null ) {
      control.win[name] = controller;
      control.win.layout.layout( true );
      // update the values
      control.__updateWinValues();
      // call the update function 
      control.__update();
    }

    return controller;
  },

  /**
   * Private
   * add the controllers from an array of controllers array to the current control window
   * 
   * @param {Array} controllerList  array of control controllers
   *
   * @return {Array}  array of control controllers
   */
  __addList: function(controllerList) {
    for( var name in controllerList ) {
      control.__add( controllerList[name].type, name, controllerList[name].value, controllerList[name] )
    }
    return controllerList;
  },

  /**
   * remove component from current control window
   *
   * @param {String} name       the name of the controller to remove
   *
   * @return {Boolean} true if control found and removed, false otherwise
   *
   * @example
   * dialog.remove('mySlider');
   * 
   */
  __remove: function(name) {
    var success = false;
    if( control.win != null ) {
      var controller = control.win.findElement(name);
      if( controller != null ) {
        control.parent.remove(controller);
        control.win.layout.layout( true );
        success = true;
      }
    }
    return success;
  },

  /**
   * Private
   * destroy the control variable
   */
  __destroy: function() {
    $.writeln('closing interface dialog and cleaning up');
    b.noLoop();
    // taken from stop.jsx
    if (typeof cleanUp === 'function') cleanUp();
    cleanUp = null;

    // clear control;
    // control = {};

    // http://forums.adobe.com/message/4068855
    // "...call $.gc() twice in some circumstances"
    $.gc();
    $.gc();
  },

  /**
   * Private
   * merge two arrays together
   */
  // http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript (modified)
  __mergeArray: function(base, arr) {
    for(item in base) {
      arr[item] = (arr[item] != undefined)
        ? arr[item]
        : base[item];
    }
    return arr;
  },
  
  /**
   * Private
   * round float to specific number of decimal places
   * TODO: eventually use Basil.js precision method
   */
  __round: function(num, decimalPlaces) {
    return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
  }


}; /* end control */



function printProperties(obj) {
  $.writeln('------------------');
  $.writeln(obj.reflect.name);
  $.writeln('\rProperties');
  $.writeln('------------------');
  var props = obj.reflect.properties;
  var array = [];
  for( var i=0; i<props.length; i++ ) {
    try {
      array.push( props[i].name + ':\t\t' + obj[props[i].name] );
    }
    catch(err) {}
    array.sort();
    // $.writeln( array.join ('\r') );
  }
  for( var i=0; i<array.length; i++ ) {
    $.writeln( array[i] );
  }
};