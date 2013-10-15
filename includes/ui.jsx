// ----------------------------------------
// UI

/*
 *  TODO(S):
 *  / fully clear variables within #targetengine, this is a major bug! (partially fixed)
 *  / improve standard layout appearance, i.e. ensure labels are aligned on right side (partially fixed)
 *  - components are not respecting width: 'full'
 *  - fix independent label bug
 *  
 *  ROADMAP:
 *  - implement missing/additional controllers
 *  - add layout customizeability
 */

// var uiConfig = {
  var uiWin = null;
  var uiWinControllersGroup = null;
  var uiWinControllerList = {};
  var uiWinValue = {};

  var uiTypesize = 9.5;
  var uiTypeface = null;

  var uiMaximumLabelWidth = 1;
  var uiMaximumWidth = 1;
// };


/**
 * Create simple user interfaces
 * @cat UI
 */
pub.ui = null;
pub.ui = {
  /**
   * Creates a dialog window
   * var controllersConfig = {
   *   mySlider1: {
   *     label: 'Slider1',
   *     type: 'slider',
   *     value: 0.5
   *   }
   * };
   * var dialog = new ui.dialog(b.PALETTE, 'Interface Example', controllersConfig);
   * 
   * @cat UI
   * @subcat dialog
   * @method dialog
   * @param {String} type           b.PALETTE or b.PROMPT
   * @param {String} name           the name of the controller window
   * @param {Array} controllerList  array of controllers
   * 
   * @return {Array} ui properties and methods
   */
  dialog: function(type, name, controllerList) {
    type = (type != undefined) ? type : 'palette';
    name = (name != undefined) ? name : 'Basil.js';
    controllerList = (controllerList != undefined) ? controllerList : {};

    var base = function() {
      win = uiWin = new Window('palette', name, undefined);
      win.orientation = 'row';
      // win.alignChildren = 'fill';

      uiTypeface = ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, uiTypesize);

      if( type == 'dialog' || type == 'prompt' ) {
        // always include a basil.js logo with prompts
        var logoGroup = win.add('group');
        logoGroup.add('image', undefined, File('~/Documents/basiljs/bundle/lib/basil_simple.png'));
      }

      var mainGroup = win.add('group');
      mainGroup.orientation = 'column';
      mainGroup.alignChildren = 'right';

      uiWinControllersGroup = mainGroup.add('group');
      uiWinControllersGroup.orientation = 'column';
      uiWinControllersGroup.alignChildren = 'left';

      // create core return values
      uiWinValue = {
        window:  uiWin,             // this initiated window (palette)
        update:  uiWin.update,      // this window's update function
        add:     addController,     // add controllers on-the-fly
        remove:  removeController,  // remove controllers on-the-fly 
        onClose: function() {}      // callback for window onClose
      };

      win.onShow = function() {
        addControllerList( controllerList );
        adjustLayout( uiWinControllersGroup );
      };
      win.onClose = function() {
        uiWinValue.onClose();
        deconstructor();
      };
      win.addEventListener('changing', function() {
        updateUiWinValues();
      });

      if( type == 'dialog' || type == 'prompt' ) {
        var buttongroup = mainGroup.add('group');
        buttongroup.alignment = 'right';

        var cancel = buttongroup.add('button', undefined, 'Cancel', {name: 'cancel'});
        cancel.graphics.font = uiTypeface;
        cancel.onClick = function() {
          uiWinValue = {};  // all canceled... clear values
          win.close(2);
        };
        var ok = buttongroup.add('button', undefined, 'OK', {name: 'ok'});
        ok.graphics.font = uiTypeface;
        ok.onClick = function() {
          win.close(1);
          runUpdateOnce();
        };
      }

      win.show();
      win.center();

      return uiWinValue;
    };

    // destroy the control variable, garbage clean-up attempt
    // http://forums.adobe.com/thread/478449
    function deconstructor() {
      $.writeln('closing interface dialog and cleaning up');
      b.noLoop();
      if (typeof cleanUp === 'function') cleanUp();
      cleanUp = null;

      // http://forums.adobe.com/message/4068855
      $.gc();
      $.gc();
    };

    /*
     * add the controllers from an array of controllers array to the current control window
     * @param {Array} controllerList  array of control controllers
     *
     * @return {Array}  array of controllers
     */
    function addControllerList(controllerList) {
      for( var name in controllerList ) {
        addController( controllerList[name].type, name, controllerList[name].value, controllerList[name] )
      }
      return controllerList;
    };

    /**
     * add controller to the current control window
     * var slider = dialog.add('slider', 'mySlider', 100, {range: [10,200]});
     *
     * @param {String} type       the controller type 
     * @param {String} name       the name of the controller (also it's variable name)
     * @param {Number} value      the controller's initial value
     * @param {Array} properties  controller properties (i.e type, label, range, etc.), optional
     *
     * @return {Array}             controller
     */
    function addController(type, name, value, properties) {
      properties = (arguments[3] != undefined) ? arguments[3] : {};
      properties['type'] = (arguments[0] != undefined) ? arguments[0].toLowerCase() : 'undefined';
      properties['name'] = arguments[1];

      // if properties.value != undefined use that 
      // if value == number || value == string use that
      // if there are only 3 arguments use properties.value
      // else use null
      properties['value'] = ( properties['value'] != undefined )
        ? properties['value']
        : (typeof arguments[2] == 'number' || typeof arguments[2] == 'string'
          ? arguments[2]
          : (arguments.length == 3
            ? arguments[2].value
            : null));

      var controller = null;
      if( uiWinControllersGroup != null) {
        if( properties['type'] === 'button') {
          uiWinControllerList[name] = controller = new pub.controllers().Button(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'checkbox') {
          uiWinControllerList[name] = controller = new pub.controllers().Checkbox(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'color') {
        //   uiWinControllerList[name] = controller = new pub.controllers().Color(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'radio') {
        //   uiWinControllerList[name] = controller = new pub.controllers().Radio(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'label') {
          uiWinControllerList[name] = controller = new pub.controllers().Label(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'text') {
          uiWinControllerList[name] = controller = new pub.controllers().Text(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'progress') {
        //   uiWinControllerList[name] = controller = new pub.controllers().Progress(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'slider') {
          uiWinControllerList[name] = controller = new pub.controllers().Slider(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'dropdown') {
        //   uiWinControllerList[name] = controller = new pub.controllers().Dropdown(name, uiWinControllersGroup, properties);
        }
        else if( properties['type'] === 'separator') {
          uiWinControllerList[name] = controller = new pub.controllers().Separator(name, uiWinControllersGroup, properties);
        }
        else {
        //   b.println('control.add(), no valid controller type specified!');
        }
      }
      else {
        b.println('control.add(), no valid control dialog or controller type specified!');
      }

      if( controller != null ) {
        uiWin[name] = controller;
        uiWin.layout.layout( true );
        updateUiWinValues();
      }

      return controller;
    };

    /*
     * remove controller from current control window
     * @param {String} name       the name of the controller to remove
     * 
     * @return {Boolean} true if control found and removed, false otherwise
     */
    function removeController(name) {
      var success = false;
      if( uiWin != null ) {
        var controller = uiWin.findElement(name);
        if( controller != null ) {
          ui.parent.remove(controller);
          uiWin.layout.layout( true );
          success = true;
        }
      }
      return success;
    };

    function adjustLayout(container) {
      for ( var i=0; i<container.children.length; i++) {
        var child = container.children[i];
        adjustFullWidth( child );   // adjust full width elements
        adjustLabelWidth( child );  // adjust label sizes
        adjustSpacing( child );     // adjust spacing
        if( typeof child.layout != 'undefined' ) child.layout.layout( true );

        for ( var j=0; j<child.children.length; j++ ) {
          var grandChild = child.children[j];
          adjustFullWidth( grandChild );   // adjust full width elements
          adjustLabelWidth( grandChild );  // adjust label sizes
          if( typeof grandChild.layout != 'undefined' ) grandChild.layout.layout( true );
        }

      }

      container.parent.layout.layout( true );
      uiWin.preferredSize.width += uiMaximumLabelWidth;
      uiWin.layout.layout( true );
    };
    function adjustFullWidth(child) {
      if( child.properties.width == 'full' ) {
        // child.size.width = child.preferredSize.width = child.maximumSize.width = uiWin.size.width;
        // child.size.width = child.preferredSize.width = child.maximumSize.width = parent.maximumSize.width;
        child.alignment = ['center','center'];
      }
    };
    function adjustLabelWidth(child) {
      if( child.type == 'statictext' && child.properties.name == 'label' ) {
        child.size.width = uiMaximumLabelWidth;
      }
    };
    function adjustSpacing(child) {
      // printProperties( child );
      // child.margins = child.spacing = -1;
    };

    return base();
  },

  /**
   * Displays a prompt dialog window
   * 
   * @cat UI
   * @subcat dialog
   * @method prompt
   * @param {String} name           the name of the control window
   * @param {Array} controllerList  array of controllers
   * @return {Array} ui properties and methods
   */
  prompt: function(name, controllerList) {
    return new pub.ui.dialog('dialog', name, controllerList);
  },

  /**
   * Creates a modeless interface window, also called a floating palette.
   * 
   * @cat UI
   * @subcat dialog
   * @method palette
   * @param {String} name           the name of the controller window
   * @param {Array} controllerList  array of controllers
   * @return {Array} ui properties and methods
   */
  palette: function(name, controllerList) {
    return new pub.ui.dialog('palette', name, controllerList);
  }


}; /* end ui */


/**
 * the individual UI controllers
 * @cat UI
 * @subcat controllers
 * @method controllers
 */
pub.controllers = function() {
  /*
   * Private
   * controller initialization of base properties for every controller
   * 
   * @param {Array} properties    Basil.js controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  var init = function(properties) {
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

      onClick:    function(value){},
      onChange:   function(value){},
      onChanging: function(value){}
    };
    // ensures that each controller has the core
    // set of properties
    return mergeArray(propertiesBase, properties);
  };

  /*
   * Private
   * initialization of Text Controller properties
   * 
   * @param {Array} properties
   * @return {Array} properties
   */
  var initText = function(properties) {
    return mergeArray({
        length:     null,
        maxLength:  22,       /* default: 22 (== width: 200px) */
        multiline:  false,    /* default: false */
        columns:    null,
        rows:       null,
        alignment:  'center'  /* default: 'center' */
      },
      init(properties));
  };

  /*
   * Private
   * initialization of Range Controller properties
   * 
   * @param {Array} properties
   * @return {Array} properties
   */
  var initRange = function(properties) {
    return mergeArray({
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

  /*
   * Private
   * update a property with a specific value
   * 
   * @param {Array} properties
   * @param {Object} value
   * @return {Array} properties
   */
  var updateValue = function(properties, value) {
    return (properties.valueType == 'int')
      ? parseInt(value)
      : (properties.valueType == 'string'
        ? value.toString()
        : b.precision(value,2)); // default float
  };


  /**
   * A button containing a text string
   * @cat UI
   * @subcat controllers
   * @method button
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Button(name, container, properties) {
    properties = init(properties);

    var group = container.add('group');
    group.orientation = 'row';

    if( properties.label != '\u00A0' ) {
      var label = new Label('label', group, {
        alignment: 'center',
        label: properties.label
      });
    }

    var clickCount = 0;
    var button = group.add('button', undefined, properties.value, properties ); /*{
      name: name,
      width: properties.width
    });*/
    button.graphics.font = uiTypeface;
    button.preferredSize.height = properties.height;
    button.preferredSize.width = (properties.width == 'full')
      ? uiWin.preferredSize.width
      : properties.width;

    button.onClick = function() {
      clickCount++;

      properties.onClick(clickCount);
      properties.onChange(clickCount);
      properties.onChanging(clickCount);
      runUpdateOnce();

      return clickCount;
    };

    properties['value'] = properties.value;
    return properties;
  };

  /**
   * A dual-state control showing a box with a checkmark when value is true, empty when value is false
   * @cat UI
   * @subcat controllers
   * @method checkbox
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Checkbox(name, container, properties) {
    properties = init(properties);

    var group = container.add('group');
    group.orientation = 'row';
    group.alignment = ['left','center'];

    var label = new Label('label', group, {
      alignment: 'center',
      label: properties.label
    });

    var check = group.add('checkbox', undefined, '', properties ); /*{
      name: name,
      width: properties.width
    });*/
    check.value = properties.value;

    check.onClick = function() {
      var value = (properties.valueType == 'int')
        ? ((this.value) ? 1 : 0)
        : this.value;
      properties['value'] = value;
      updateUiWinValues();

      properties.onChange(value);
      runUpdateOnce();

      return value;
    };

    properties['value'] = (properties.valueType == 'int')
      ? ((check.value) ? 1 : 0)
      : check.value;
    return properties;
  };

  /**
   * A dual-state control, grouped with other radio buttons, of which only one can be in the selected state
   * @cat UI
   * @subcat controllers
   * @method radio
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Radio(name, container, properties) {
  };

  /**
   * A color picker
   * @cat UI
   * @subcat controllers
   * @method color
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Color(name, container, properties) {
  };

  /**
   * A static text field that the user cannot change 
   * @cat UI
   * @subcat controllers
   * @method label
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
   *
   * @return {StaticTextSUI}      the ScriptUI Component
   */
  function Label(name, container, properties) {
    properties = initText(properties);
    properties.valueType = 'string';
    var labelText = (properties.value != null)
      ? properties.label + '\u00A0' + properties.value
      : properties.label;

    var label = container.add('statictext', undefined, 'x', properties ); /*{
      name: name,
      width: properties.width
    });*/
    // var xwidth = label.preferredSize[0];
    // uiMaximumLabelWidth = (labelText.length*xwidth > uiMaximumLabelWidth) 
    //   ? labelText.length*xwidth
    //   : uiMaximumLabelWidth;
    label.justify = 'right';
    label.graphics.font = uiTypeface;

    // if( label.characters == null ) {
    //   // TODO: define and allow maximum width override
    //   var width = (uiMaximumLabelWidth < 200) ? uiMaximumLabelWidth : 200;
    //   label.preferredSize = [,-1];
    //   label.characters = ~~(width/xwidth);
    //   label.preferredSize[1] = -1;
    // }

    label.text = labelText;
    label.alignment = properties.alignment;

    // set longest label for layout adjustment
    uiMaximumLabelWidth = (label.preferredSize[0] > uiMaximumLabelWidth) 
      ? label.preferredSize[0]
      : uiMaximumLabelWidth;

    return label;
  };

  /**
   * An editable text field that the user can change
   * @cat UI
   * @subcat controllers
   * @method text
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Text(name, container, properties) {
    properties = initText(properties);
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

    var text = group.add('edittext', undefined, properties.value, properties ); /*{
      name: name,
      multiline: properties.multiline,
      width: properties.width
    }); */
    // TODO: define rows and columns more clearly
    text.characters = (properties.length != undefined)
      ? properties.length
      : (properties.columns == undefined)
        ? properties.maxLength
        : properties.columns;
    text.minimumSize.height = (properties.multiline && properties.rows != undefined) 
      ? (uiTypesize+2)*(properties.rows+1)
      : (uiTypesize+2)*1;
    text.graphics.font = uiTypeface;

    // not all interface controllers have a native onClick event
    // therefore for some, other native events must be utilized
    // and then linked to our own onClick event
    text.onActivate = function() {
      var value = updateValue(properties,this.text);
      properties['value'] = value;
      updateUiWinValues();

      properties.onClick(value);
      return value;
    }
    text.addEventListener('change', function() {
      var value = updateValue(properties,this.text);
      properties['value'] = value;
      updateUiWinValues();

      properties.onChange(value);
      runUpdateOnce();

      return value;
    });
    text.onChanging = function() {
      var value = updateValue(properties,this.text);
      properties['value'] = value;
      updateUiWinValues();

      properties.onChanging(value);
      runUpdateOnce();

      return value;
    };

    properties['value'] = updateValue(properties,text.text);
    return properties;
  };

  /**
   * A horizontal progress bar that shows progress of an operation.
   * @cat UI
   * @subcat controllers
   * @method progress
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Progress(name, container, properties) {
  };

  /**
   * A horizontal slider with a moveable position indicator.
   * @cat UI
   * @subcat controllers
   * @method slider
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Slider(name, container, properties) {
    properties = initRange(properties);

    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label('label', group, {
      alignment: 'center',
      label: properties.label
    });

    var slider = group.add('slider', undefined,
      properties.value,
      properties.min,
      properties.max, properties ); /*{
        name: name,
        width: properties.width
    }); */
    slider.preferredSize = [properties.width, properties.height];

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

    slider.addEventListener('mousedown', function() {
      var value = updateValue(properties,this.value);
      properties['value'] = value;
      updateUiWinValues();

      properties.onClick(value);

      return value;
    });
    slider.onChange = function() {
      var value = updateValue(properties,this.value);
      properties['value'] = value;
      updateUiWinValues();

      properties.onChange(value);
      runUpdateOnce();

      return value;
    };
    slider.onChanging = function() {
      var value = updateValue(properties,this.value);
      properties['value'] = value;
      updateUiWinValues();

      properties.onChanging(value);
      valueLabel.text = value;
      runUpdateOnce();

      return value;
    };

    properties['value'] = updateValue(properties,slider.value);
    return properties;
  };

  /**
   * A dropdown list
   * @cat UI
   * @subcat controllers
   * @method dropdown
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js Range Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Dropdown(name, container, properties) {
  };

  /**
   * A separator line for clearer interface hierarchy
   * @cat UI
   * @subcat controllers
   * @method separator
   * @param {String} name         the (variable) name of the Controller
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} properties    Basil.js List Controller properties (i.e type, label, range, etc.)
   *
   * @return {Array} properties
   */
  function Separator(name, container, properties) {
    properties = init(properties);

    var group = container.add('group');
    group.orientation = 'row';

    properties.width = (properties.width != -1)
      ? properties.width
      : 'full';

    var separator = group.add('panel', undefined, undefined, properties ); /*{
      name: name,
      width: properties.width
    });*/
    separator.preferredSize.height = separator.maximumSize.height = 1;
    separator.preferredSize.width = separator.maximumSize.width = (properties.width != 'full')
      ? properties.width
      : container.preferredSize.width;
    separator.alignment = ['center','center'];

    properties['value'] = name;
    return properties;
  };


  return {
    Button: Button,
    Checkbox: Checkbox,
    // Color: Color,
    // Radio: Radio,
    Label: Label,
    Text: Text,
    // Progress: Progress,
    Slider: Slider,
    // Dropdown: Dropdown,
    Separator: Separator
  };

};
/* end controllers */



/*
 * ensures values output by interface window are up-to-date
 */
function updateUiWinValues() {
  for( var name in uiWinControllerList ) {
    // this connects the name of the controller to it's corresponding value, thus making it easier for
    // the user to link interface controller names directly to their value
    uiWinValue[name] = uiWinControllerList[name].value;
  }
};

/*
 * merge two arrays together
 * http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript (modified)
 */
function mergeArray(base, arr) {
  for(item in base) {
    arr[item] = (arr[item] != undefined)
      ? arr[item]
      : base[item];
  }
  return arr;
};



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
