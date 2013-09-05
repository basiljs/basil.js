/**
 * 
 * Class for creating a user interface within Adobe InDesign
 * for manipulating Basil.js variables.
 * 
 */



// some type of #targetengine is required for keeping
// the Window.Palette alive
// #targetengine 'session';


// namespace holder
// TODO: determine namespace b.interface? b.ui? nothing?
// I prefer a namespace to keep things tidy, but would
// also like to avoid namespace.method.method1.method2 etc...
var Interface = {};



// ------------------------------------------------------------------------
/**
 * The individual UI Controller elements
 * these are private methods which are only used
 * by Interface.Prompt and Interface.Palette via
 * the components array
 * 
 * @param {GroupSUI} Container   the name of the Group (ScriptUI) all the Controllers are drawn in
 */
Interface.Controllers = function(container) {
  //
  // Properties
  // 
  // create component holder group
  componentGroup = container.add('group');
  componentGroup.orientation = 'column';
  componentGroup.alignChildren = 'left';
  componentGroup.preferredSize = [-1,-1];

  //
  // Methods
  //
  /**
   * Label - A text field that the user cannot change 
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {StaticTextSUI}      the ScriptUI Component
   */
  function Label(name, container, attributes, values) {
    var label = container.add('statictext', undefined, 
      (attributes.label != undefined) ? attributes.label : '', {
      name: name
    });
    label.alignment = (attributes.alignment != undefined)
      ? attributes.alignment
      : 'center';
    return label;
  };

  // ------------------------------------------------------------------------
  /**
   * Text - An editable text field that the user can change
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {EditTextSUI}        the ScriptUI Component
   */
  function Text(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    var text = group.add('edittext', undefined, attributes.value, {name: name, multiline: attributes.multiline});
    text.characters = (attributes.length != undefined)
      ? attributes.length
      : (attributes.columns == undefined)
        ? 20
        : attributes.columns;
    text.minimumSize.height = (attributes.multiline && attributes.rows != undefined) 
      // default typesize is 13 graphics.font.size
      ? (13+2)*(attributes.rows+1)
      : (13+2)*1;
    text.onChange = function() {
      attributes.onChange(text.value);
    };
    text.onChanging = function() {
      attributes.onChanging(text.value);
    };

    values = text.value;
    return text;
  };

  // ------------------------------------------------------------------------
  /**
   * Checkbox - A dual-state control showing a box with a checkmark when value is true, empty when value is false
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {CheckboxSUI}        the ScriptUI Component
   */
  function Checkbox(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'top',
      label: attributes.label
    });
    var check = group.add('checkbox', undefined, '', {
      name: name
    });
    check.onClick = function() {
      attributes.onClick(check.value);
    };
    check.onChange = function() {
      attributes.onChange(check.value);
    };

    values = check.value;
    return check;
  };

  // ------------------------------------------------------------------------
  /**
   * Radio - A dual-state control, grouped with other radiobuttons, of which only one can be in the selected state
   * Shows the selected state when value is true, empty when value is false
   *
   * TODO: have this work as it's supposed to
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {RadioButtonSUI}     the ScriptUI Component
   */
  function Radio(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    var radio = group.add('radiobutton', undefined, attributes.values, {name: name});
    radio.selection = 0; // select first element
    radio.onClick = function() {
      attributes.onClick(radio.selection);
    };
    radio.onChange = function() {
      attributes.onChange(radio.selection);
    };

    return radio;
    // return radio.selection.text;
  };

  // ------------------------------------------------------------------------
  /**
   * Slider - A slider with a moveable position indicator.
   * All slider controls have a horizontal orientation.
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {SliderSUI}          the ScriptUI Component
   */
  function Slider(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'top',
      label: attributes.label
    });
    var slider = group.add('slider', undefined, attributes.value,
      (attributes.min != undefined) 
        ? attributes.min
        : (attributes.range != undefined)
          ? attributes.range[0]
          : 0.0,
      (attributes.max != undefined)
        ? attributes.max
        : (attributes.range != undefined)
          ? attributes.range[1]
          : 1.0,
      {name: name}
    );
    slider.onClick = function() {
      attributes.onClick(slider.value);
    };
    slider.onChange = function() {
      attributes.onChange(slider.value);
    };
    slider.onChanging = function() {
      attributes.onChanging(slider.value);
    };

    values = slider.value;
    return slider;
  };

  // ------------------------------------------------------------------------
  /**
   * Slider - A drop-down list with zero or more items
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {DropDownListSUI}    the ScriptUI Component
   */
  function Dropdown(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    var dropdown = group.add('dropdownlist', undefined, attributes.values, {name: name});
    // dropdown.title = attributes.label;
    // dropdown.titleLayout = { 
    //   alignment: ['left', 'center'], 
    //   spacing: 3,
    //   characters: 16,
    //   justify: 'right'
    // };
    dropdown.selection = 0; // select first element
    dropdown.onClick = function() {
      attributes.onClick(dropdown.selection);
    };
    dropdown.onChange = function() {
      attributes.onChange(dropdown.selection);
    };
    dropdown.onDoubleClick = function() {
      attributes.onDoubleClick(dropdown.selection);
    };

    values = dropdown.selection;
    return dropdown;
  };

  // ------------------------------------------------------------------------
  /**
   * Button - A pushbutton containing a mouse-sensitive text string
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {ButtonSUI}          the ScriptUI Component
   */
  function Button(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    var button = group.add('button', undefined, attributes.value, {name: name});
    button.onClick = function() {
      attributes.onClick();
    };

    values = attributes.value;
    return button;
  };

  // ------------------------------------------------------------------------
  /**
   * Progress - A horizontal rectangle that shows progress of an operation.
   * All progressbar controls have a horizontal orientation. 
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {ProgressBarSUI}     the ScriptUI Component
   */
  function Progress(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    var progress = group.add('progressbar', undefined, attributes.value,
      (attributes.min != undefined) 
        ? attributes.min
        : (attributes.range != undefined)
          ? attributes.range[0]
          : 0.0,
      (attributes.max != undefined)
        ? attributes.max
        : (attributes.range != undefined)
          ? attributes.range[1]
          : 1.0,
      {name: name}
    );

    values = progress.value;
    return progress;
  };

  // ------------------------------------------------------------------------
  /**
   * Seperator - a modified Panel which is only 1px tall
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {PanelSUI}     the ScriptUI Component
   */
  function Separator(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });

    // printProperties( container );
    // TODO: automatically get the size of the panel
    // seems to be only available with onShow()...
    var separator = group.add ('panel', [0,0,1,1]);
    separator.preferredSize = [-1,-1];
    separator.minimumSize.height = separator.maximumSize.height = 1;

    return separator;
  };

  // ------------------------------------------------------------------------
  /**
   * method which is called by Interface.Prompt or Interface.Palette
   * to add the components from the controllers array to the 
   * given window
   * 
   * @param {WindowSUI} window   the name of the Window
   * @param {Array} controllers  array of interface controllers
   * @param {Array} values       (optional) the values array is a collection of each controllers output
   *
   * @return {Array}             array of interface controllers
   */
  function add(window, controllers, values) {
    for( var name in controllers ) {
      controllers[name].label += '\u00A0';

      if( controllers[name].type == 'checkbox' ) {
        window[name] = new this.Checkbox(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'radio') {
        window[name] = new this.Radio(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'slider') {
        window[name] = new this.Slider(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'dropdown' ) {
        window[name] = new this.Dropdown(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'text' ) {
        window[name] = new this.Text(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'label' ) {
        window[name] = new this.Label(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'progress' ) {
        window[name] = new this.Progress(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'separator' ) {
        window[name] = new this.Separator(name, componentGroup, controllers[name], values[name]);
      }
      else if( controllers[name].type == 'button' ) {
        window[name] = new this.Button(name, componentGroup, controllers[name], values[name]);
      }
    }

    return controllers;
  };


  // ------------------------------------------------------------------------
  return {
    Label: Label,
    Text: Text,
    Checkbox: Checkbox,
    Radio: Radio,
    Slider: Slider,
    Dropdown: Dropdown,
    Button: Button,
    Progress: Progress,
    Separator: Separator,

    add: add
  };
};



// ------------------------------------------------------------------------
/**
 * Displays a modal dialog
 * 
 * @param {String} name        the name of the Interface window
 * @param {Array} controllers  array of interface controllers
 * @param {Array} values       (optional) the values array is a collection of each controllers output
 *
 * @return {WindowSUI}         the Window instance
 */
Interface.Prompt = function(name, controllers, values) {
  //
  // Properties
  // 
  name = (name != undefined) ? name : 'Basil.js';
  values = (values != undefined) ? values : new Array();

  //
  // Innvocation
  // 
  var win = new Window('dialog', name);
  win.orientation = 'row';
  win.alignChildren = 'left';

  // let's always include a basil.js logo
  var logoGroup = win.add('group');
  var logo = logoGroup.add('image', undefined, File('~/Documents/basiljs/bundle/lib/basil_80x80.png'));

  // create main holder
  var mainGroup = win.add('group');
  mainGroup.orientation = 'column';

  // create individual controllers
  var controls = new Interface.Controllers(mainGroup);
  controls.add( win, controllers, values );

  // always add an OK and Cancel button
  var buttongroup = mainGroup.add('group');
  buttongroup.alignment = 'right';
  // buttongroup.orientation = 'row';
  var cancel = buttongroup.add('button', undefined, 'Cancel', {name: 'cancel'});
  cancel.onClick = function() {
    win.close(2);
    // TODO: update values
  };
  var ok = buttongroup.add('button', undefined, 'OK', {name: 'ok'});
  ok.onClick = function() {
    win.close(1);
    // kill it!
  };

  // draw to screen
  win.onShow = function() {
    // printProperties(win);
    $.writeln('shown');
  };
  win.show();

  return win;
};



// ------------------------------------------------------------------------
/**
 * Creates a modeless dialog, also called a floating palette.
 * 
 * @param {String} name        the name of the Interface window
 * @param {Array} controllers  array of interface controllers
 * @param {Array} values       (optional) the values array is a collection of each controllers output
 *
 * @return {WindowSUI}         the Window instance
 */
Interface.Palette = function(name, controllers, values) {
  //
  // Properties
  // 
  name = (name != undefined) ? name : 'Basil.js';
  values = (values != undefined) ? values : new Array();

  //
  // Innvocation
  // 
  var win = new Window('palette', name, undefined);
  win.orientation = 'row';
  win.alignChildren = 'left';

  // create main holder
  var mainGroup = win.add('group');
  mainGroup.orientation = 'column';

  // create individual controllers
  var controls = new Interface.Controllers(mainGroup);
  controls.add( win, controllers, values );

  // draw to screen
  win.onShow = function() {
    // printProperties(win);
    $.writeln('shown');
  };
  win.onClose = function() {
    $.writeln('closing palette and cleaning up');
    // taken from stop.jsx
    // TODO: once integrated with basil.js core
    // simply call b.noLoop();
    var allIdleTasks = app.idleTasks;
    for (var i = app.idleTasks.length - 1; i >= 0; i--) {
      allIdleTasks[i].remove();
    }
    if (typeof cleanUp === 'function') cleanUp();
    cleanUp = null;
  };
  win.show();

  // in order for the palette to stay 
  // visible, it's instance has to be 
  // returned
  return win;
};



// ------------------------------------------------------------------------
// NOTE: for debugging only!
// 
// Simple debugging and info getting methods
// modified from 'Beginning ScriptUI' PDF
// Peter Kahrel
// kahrel@kahrel.plus.com
function printProperties(obj) {
  $.writeln('------------------');
  $.writeln(obj.reflect.name);
  $.writeln('------------------');
  var props = obj.reflect.properties;
  var array = [];
  for( var i=0; i<props.length; i++ ) {
    try {
      array.push( props[i].name + ':\t\t' + obj[props[i].name] );
    }
    catch(err) {}
    array.sort();
    $.writeln( array.join ('\r') );
  }
};

function printMethods(obj) {
  $.writeln('------------------');
  $.writeln(obj.reflect.name);
  $.writeln('------------------');
  var props = obj.reflect.methods.sort();
  $.writeln ('\rMethods');
  for( var i = 0; i < props.length; i++ ) {
    $.writeln(props[i].name);
  }
};


