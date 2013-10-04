// check if a targetengine has been initiated
if ($.engineName !== 'basiljs') {
  #targetengine 'basiljs';
}


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
 *  TODO(S):
 *  / fully clear variables within #targetengine, this is a major bug! (partially fixed)
 *  / improve standard layout appearance, i.e. ensure labels are aligned on right side (partially fixed)
 *  - components are not respecting width: 'full'
 *  - fix independent label bug
 *  - implement missing/additional controllers
 *  / when using add() value property is not applied (fixed?)
 *  
 *  ROADMAP:
 *  - add layout customizeability
 */


// static dialog types
// DISCUSS: push these into the main basil.js structure? do we even want these?
// I prefer the above method of new control.TYPE
// but this seems 'more' basil.js like
b.PALETTE = 'palette';
b.PROMPT = 'prompt';


// 'interface' cannot be used, as it's a reserved keyword
// therefore control will be used

// attempt to clear control of all previous instances
// first delete control
delete control;
// then redefine control as null
var control = null;
// then clearly define control with default values
control = {
  //
  // Private
  // Global Properties
  // 
  __win: null,
  __winControllersGroup: null,
  __winControllerList: {},
  __winValue: {},

  // 
  // Private
  // Global type style and size
  // 
  __typesize: 10,
  // the root of one of my nasty bugs!
  // it seems typeface must be defined when creating
  // the interface window
  __typeface: null,

  // maximum widths for layouts
  __maximumLabelWidth: 1,
  __maximumWidth: 1,



  // ------------------------------------------------------------------------
  //
  // Classes
  // 

  /**
   * Class of individual UI controller elements
   * these are Private methods which are only used
   * by control.prompt and control.palette via
   * the controllers array and add() method
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
    function __init(properties) {
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
      properties = __init(properties);

      var group = container.add('group');
      group.orientation = 'row';

      if( properties.label != '\u00A0' ) {
        var label = new Label('label', group, {
          alignment: 'center',
          label: properties.label
        });
      }

      var clickCount = 0;
      var button = group.add('button', undefined, properties.value, {
        name: name,
        width: properties.width
      });
      button.graphics.font = control.__typeface;
      button.preferredSize.height = properties.height;
      button.preferredSize.width = (properties.width == 'full')
        ? control.__win.preferredSize.width
        : properties.width;

      // printProperties( button.properties );

      button.onClick = function() {
        clickCount++;
        try {
          // the callback connected to the controller
          properties.onClick(clickCount);
        }
        catch(err) {}
        
        // in the interest of consistency, I have included the ability
        // to have onChange() and onChanging() callbacks for buttons
        // althogh, they are the same as onClick()
        try {
          // the callback connected to the controller
          properties.onChange(clickCount);
        }
        catch(err) {}
        try {
          // the callback connected to the controller
          properties.onChanging(clickCount);
        }
        catch(err) {}

        // when the onClick event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return clickCount;
      };

      // update value for return
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
      properties = __init(properties);
      // printProperties( properties );

      var group = container.add('group');
      group.orientation = 'row';
      group.alignment = ['left','center'];

      var label = new Label('label', group, {
        alignment: 'center',
        label: properties.label
      });

      var check = group.add('checkbox', undefined, '', {
        name: name
      });
      check.value = properties.value;

      // events
      check.onClick = function() {
        var value = (properties.valueType == 'int')
          ? ((this.value) ? 1 : 0)
          : this.value;

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onChange(value);
        }
        catch(err) {}

        // when the onChange event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return value;
      };
      // not all interface controllers have all callbacks

      // update value for return
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
    function __initText(properties) {
      return control.__mergeArray({
          length:     null,
          maxLength:  22,       /* default: 22 (== width: 200px) */
          multiline:  false,    /* default: false */
          columns:    null,
          rows:       null,
          alignment:  'center'  /* default: 'center' */
        },
        __init(properties));
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
      properties = __initText(properties);
      properties.valueType = 'string';
      var labelText = (properties.value != null)
        ? properties.label + '\u00A0' + properties.value
        : properties.label;

      var label = container.add('statictext', undefined, 'x', {
        name: name,
        multiline: true
      });
      // var xwidth = label.preferredSize[0];
      // control.__maximumLabelWidth = (labelText.length*xwidth > control.__maximumLabelWidth) 
      //   ? labelText.length*xwidth
      //   : control.__maximumLabelWidth;
      label.justify = 'right';
      label.graphics.font = control.__typeface;

      // if( label.characters == null ) {
      //   // TODO: define and allow maximum width override
      //   var width = (control.__maximumLabelWidth < 200) ? control.__maximumLabelWidth : 200;
      //   label.preferredSize = [,-1];
      //   label.characters = ~~(width/xwidth);
      //   label.preferredSize[1] = -1;
      // }

      label.text = labelText;
      label.alignment = properties.alignment;

      // set longest label for layout adjustment
      control.__maximumLabelWidth = (label.preferredSize[0] > control.__maximumLabelWidth) 
        ? label.preferredSize[0]
        : control.__maximumLabelWidth;

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
      properties = __initText(properties);
      properties.valueType = (properties.valueType != null)
        ? properties.valueType
        : 'string';

      var group = container.add('group');
      group.orientation = 'row';

      if( properties.label != '\u00A0' ) {
        var label = new Label('label', group, {
          alignment: 'center',
          label: properties.label
        });
      }

      var text = group.add('edittext', undefined, properties.value, {
        name: name,
        multiline: properties.multiline,
        width: properties.width
      });
      // TODO: define rows and columns more clearly
      text.characters = (properties.length != undefined)
        ? properties.length
        : (properties.columns == undefined)
          ? properties.maxLength
          : properties.columns;
      text.minimumSize.height = (properties.multiline && properties.rows != undefined) 
        ? (control.__typesize+2)*(properties.rows+1)
        : (control.__typesize+2)*1;
      text.graphics.font = control.__typeface;

      // events
      // not all interface controllers have a native onClick event
      // therefore for some, other native events must be utilized
      // and then linked to our own onClick event
      text.onActivate = function() {
        var value = __updateValue(properties,this.text);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onClick(value);
        }
        catch(err) {}
        return value;
      }
      text.addEventListener('change', function() {
        var value = __updateValue(properties,this.text);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onChange(value);
        }
        catch(err) {}

        // when the onChange event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return value;
      });
      text.onChanging = function() {
        var value = __updateValue(properties,this.text);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onChanging(value);
        }
        catch(err) {}

        // when the onChanging event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return value;
      };

      // update value for return
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
    function __initRange(properties) {
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
        __init(properties));
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
      properties = __initRange(properties);

      var group = container.add('group');
      group.orientation = 'row';

      // create label
      var label = new Label('label', group, {
        alignment: 'center',
        label: properties.label
      });

      // create slider
      var slider = group.add('slider', undefined,
        properties.value,
        properties.min,
        properties.max, {
          name: name,
          width: properties.width
      });
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

      // events
      // not all interface controllers have a native onClick event
      // therefore for some, a corresponding event listener must be utilized
      slider.addEventListener('mousedown', function() {
        var value = __updateValue(properties,this.value);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onClick(value);
        }
        catch(err) {}
        return value;
      });
      slider.onChange = function() {
        var value = __updateValue(properties,this.value);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onChange(value);
        }
        catch(err) {}

        // when the onChange event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return value;
      };
      slider.onChanging = function() {
        var value = __updateValue(properties,this.value);

        // update the properties value
        properties['value'] = value;
        // push updated value to the window's returned value array
        control.__updateWinValues();

        try {
          // the callback connected to the controller
          properties.onChanging(value);
        }
        catch(err) {}
        try {
          valueLabel.text = value;
        }
        catch(err) {}

        // when the onChanging event is fired, an attempt is
        // made to call the update() function
        control.__update();

        return value;
      };

      // update value for return
      properties['value'] = __updateValue(properties,slider.value);

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
      properties = __init(properties);

      var group = container.add('group');
      group.orientation = 'row';

      // for separators replace a -1 value with full
      properties.width = (properties.width != -1)
        ? properties.width
        : 'full';

      var separator = group.add('panel', undefined, undefined, {
        name: name,
        width: properties.width
      });
      separator.preferredSize.height = separator.maximumSize.height = 1;
      separator.preferredSize.width = separator.maximumSize.width = (properties.width != 'full')
        ? properties.width
        : container.preferredSize.width;
      separator.alignment = ['center','center'];

      return properties;
    };

    //
    // Private
    // 
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
      // Progress: Progress,
      Slider: Slider,

      // list
      // Dropdown: Dropdown,

      // organization
      Separator: Separator
    };

  }, /* end controllers */



  // ------------------------------------------------------------------------
  //
  // Dialogs
  //

  /**
   * Creates an interface window
   * 
   * @param {String} type           the type of controller window
   * @param {String} name           the name of the controller window
   * @param {Array} controllerList  array of controllers
   *
   * @return {Array} controller properties
   */
  dialog: function(type, name, controllerList) {
    //
    // Properties
    // 
    type = (type != undefined) ? type : 'palette';
    name = (name != undefined) ? name : 'Basil.js';
    // attempt to clear controllers from all previous instances
    delete controllers;
    var controllers = (controllerList != undefined) ? controllerList : {};

    var base = function() {
      // create window
      win = control.__win = new Window('palette', name, undefined);
      win.orientation = 'row';
      // win.alignChildren = 'fill';

      control.__typeface = ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, control.__typesize);

      if( type == 'dialog' || type == 'prompt' ) {
        // always include a basil.js logo with prompts
        var __logoGroup = win.add('group');
        __logoGroup.add('image', undefined, File('~/Documents/basiljs/bundle/lib/basil_simple.png'));
      }

      // create main holder
      var __mainGroup = win.add('group');
      __mainGroup.orientation = 'column';
      __mainGroup.alignChildren = 'right';

      // create controller holder group
      var __winControllersGroup = control.__winControllersGroup = __mainGroup.add('group');
      __winControllersGroup.orientation = 'column';
      __winControllersGroup.alignChildren = 'left';

      // create core return values
      control.__winValue = {
        // this initiated window (palette)
        window: control.__win,
        // this window's update function
        update:  control.__win.update,
        // the add function to on-the-fly add controllers
        add: control.add,
        // the remove function to on-the-fly remove controllers
        remove: control.remove,
        // callback for window onClose
        onClose: function() {}
      };

      // callbacks
      win.onShow = function() {
        // create individual controls
        control.__addList( controllers );
        // adjust layout of controls
        __adjustLayout( __winControllersGroup );
        // calls the update function (if it exists) on load
        // the only problem is it seems this is being called
        // before draw()
        // control.__update();
      };
      win.onClose = function() {
        try {
          control.__winValue.onClose();
        }
        catch(err) {}
        // garbage clean-up attempt
        // http://forums.adobe.com/thread/478449
        control.__destroy();
      };

      // this event is fired as the palette window itself
      // is changed/updated (i.e. adding/removing controllers)
      win.addEventListener('changing', function() {
        // as controllers are added/removed on-the-fly
        // the value array must be updated before returning it
        control.__updateWinValues();
        // adjust layout of controls
        // causing flickering
        // __adjustLayout( __winControllersGroup );
      });

      if( type == 'dialog' || type == 'prompt' ) {
        // always add an OK and Cancel button to prompts
        var buttongroup = __mainGroup.add('group');
        buttongroup.alignment = 'right';

        var cancel = buttongroup.add('button', undefined, 'Cancel', {name: 'cancel'});
        cancel.graphics.font = control.__typeface;
        cancel.onClick = function() {
          // all canceled... clear values
          control.__winValue = {};
          win.close(2);
        };
        var ok = buttongroup.add('button', undefined, 'OK', {name: 'ok'});
        ok.graphics.font = control.__typeface;
        ok.onClick = function() {
          win.close(1);
          // calls the update function (if it exists) on close
          control.__update();
        };
      }

      // show the interface window
      win.show();
      // center the interface window to the screen
      win.center();

      // return the value array
      return control.__winValue;
    };

    /*
     *  Private
     *  TODO: define a Custom layout-manager
     */
    function __adjustLayout(container) {

      for ( var i=0; i<container.children.length; i++) {
        var child = container.children[i];
        // adjust full width elements
        __adjustFullWidth( child );
        // adjust label sizes
        __adjustLabelWidth( child );
        // update layout
        if( typeof child.layout != 'undefined' ) child.layout.layout( true );

        for ( var j=0; j<child.children.length; j++ ) {
          var grandChild = child.children[j];
          // adjust full width elements
          __adjustFullWidth( grandChild );
          // adjust label sizes
          __adjustLabelWidth( grandChild );
          // update layout
          if( typeof grandChild.layout != 'undefined' ) grandChild.layout.layout( true );
        }

      } // end child loop

      // update parent
      container.parent.layout.layout( true );
      // update main window
      control.__win.size.width += control.__maximumLabelWidth;
      control.__win.layout.layout( true );
    };

    // adjust full width elements
    function __adjustFullWidth(child) {
      try {
        // printProperties( child.properties );
        if( child.properties.width == 'full' ) {
          // child.size.width = child.preferredSize.width = child.maximumSize.width = control.__win.size.width;
          child.size.width = child.preferredSize.width = child.maximumSize.width = parent.maximumSize.width;
          child.alignment = ['center','center'];
        }
      }
      catch(err) {}
    };

    function __adjustLabelWidth(child) {
      try {
        // printProperties( child.properties );
        if( child.type == 'statictext' && child.properties.name == 'label' ) {
          child.size.width = control.__maximumLabelWidth;
        }
      }
      catch(err) {}
    };



    return base();
  },

  /**
   * Preffered Method
   * Displays a modal interface window
   * 
   * @param {String} name           the name of the control window
   * @param {Array} controllerList  array of controllers
   *
   * @return {Array} controller properties
   */
  prompt: function(name, controllerList) {
    return control.dialog('dialog', name, controllerList);
  },

  /**
   * Preffered Method
   * Creates a modeless interface window, also called a floating palette.
   * 
   * @param {String} name           the name of the controller window
   * @param {Array} controllerList  array of controllers
   *
   * @return {Array} controller properties
   */
  palette: function(name, controllerList) {
    return control.dialog('palette', name, controllerList);
  },

  /* end dialog */



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
    for( var name in control.__winControllerList ) {
      // this connects the name of the controller to it's
      // corresponding value, thus making it easier for
      // the user to link interface controller names
      // directly to their value
      control.__winValue[name] = control.__winControllerList[name].value;
    }
  },

  /**
   * add controller to the current control window
   *
   * @param {String} type       the controller type 
   * @param {String} name       the name of the controller (also it's variable name)
   * @param {Number} value      the controller's initial value
   * @param {Array} properties  controller properties (i.e type, label, range, etc.), optional
   *
   * @return {Array}             controller
   *
   * @example
   * var slider = dialog.add('slider', 'mySlider', 100, {range: [10,200]});
   *
   * @example
   * var slider = dialog.add('slider', 'mySlider', {range: [10,200], value: 100});
   * 
   */
  add: function(type, name, value, properties) {
   // ensure properties contains name, value, and type
    properties['type'] = arguments[0] = (arguments[0] != undefined) ? type : 'undefined';
    properties['name'] = arguments[1];

    // if properties.value != undefined use that 
    // if value == number use that
    // if there are only 3 arguments use properties.value
    // else use null
    properties['value'] = ( arguments[3].value != undefined )
      ? arguments[3].value
      : (typeof arguments[2] == 'number'
        ? arguments[2]
        : (arguments.length == 3
          ? arguments[2].value
          : null));

    var controller = null;
    if( control.__winControllersGroup != null) {
      // // buttons
      if( type.toLowerCase() === 'button') {
        control.__winControllerList[name] = controller = new control.controllers().Button(name, control.__winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'checkbox') {
        control.__winControllerList[name] = controller = new control.controllers().Checkbox(name, control.__winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'color') {
      //   control.__winControllerList[name] = controller = new control.controllers().Color(name, control.__winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'radio') {
      //   control.__winControllerList[name] = controller = new control.controllers().Radio(name, control.__winControllersGroup, properties);
      }

      // text
      else if( type.toLowerCase() === 'label') {
        control.__winControllerList[name] = controller = new control.controllers().Label(name, control.__winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'text') {
        control.__winControllerList[name] = controller = new control.controllers().Text(name, control.__winControllersGroup, properties);
      }

      // range
      else if( type.toLowerCase() === 'progress') {
      //   control.__winControllerList[name] = controller = new control.controllers().Progress(name, control.__winControllersGroup, properties);
      }
      else if( type.toLowerCase() === 'slider') {
        control.__winControllerList[name] = controller = new control.controllers().Slider(name, control.__winControllersGroup, properties);
      }

      // list
      else if( type.toLowerCase() === 'dropdown') {
      //   control.__winControllerList[name] = controller = new control.controllers().Dropdown(name, control.__winControllersGroup, properties);
      }

      // organization
      else if( type.toLowerCase() === 'separator') {
        control.__winControllerList[name] = controller = new control.controllers().Separator(name, control.__winControllersGroup, properties);
      }

      else {
      //   b.println('control.add(), no valid controller type specified!');
      }
    }
    else {
      b.println('control.add(), no valid control dialog or controller type specified!');
    }

    if( controller != null ) {
      control.__win[name] = controller;
      control.__win.layout.layout( true );
      // update the values
      control.__updateWinValues();
    }

    return controller;
  },

  /**
   * Private
   * add the controllers from an array of controllers array to the current control window
   * 
   * @param {Array} controllerList  array of control controllers
   *
   * @return {Array}  array of controllers
   */
  __addList: function(controllerList) {
    for( var name in controllerList ) {
      control.add( controllerList[name].type, name, controllerList[name].value, controllerList[name] )
    }
    return controllerList;
  },

  /**
   * remove controller from current control window
   *
   * @param {String} name       the name of the controller to remove
   *
   * @return {Boolean} true if control found and removed, false otherwise
   *
   * @example
   * dialog.remove('mySlider');
   * 
   */
  remove: function(name) {
    var success = false;
    if( control.__win != null ) {
      var controller = control.__win.findElement(name);
      if( controller != null ) {
        control.parent.remove(controller);
        control.__win.layout.layout( true );
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
    // this doesn't work, in palette mode because control
    // is cleared before the results are returned
    // so i've moved this to the top... mal sehen
    // control = {};

    // http://forums.adobe.com/message/4068855
    // '...call $.gc() twice in some circumstances'
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