/**
 * 
 * Class for creating a user interface within Adobe InDesign
 * for manipulating Basil.js variables.
 * 
 */



// some type of #targetengine is required for keeping
// the Window.Palette alive
// #targetengine 'interface';


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
  // default type
  var typesize = 10;
  var typeface = ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, typesize);

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
    label.graphics.font = typeface;
    return label;
  };

  // ------------------------------------------------------------------------
  /**
   * Text - An editable text field that the user can change
   *
   * TODO: make output String and Number specific (ala Scriptographer)?
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
    label.graphics.font = typeface;
    var text = group.add('edittext', undefined, attributes.value, {name: name, multiline: attributes.multiline});
    text.characters = (attributes.length != undefined)
      ? attributes.length
      : (attributes.columns == undefined)
        ? 20
        : attributes.columns;
    text.minimumSize.height = (attributes.multiline && attributes.rows != undefined) 
      ? (typesize+2)*(attributes.rows+1)
      : (typesize+2)*1;
    text.graphics.font = typeface;
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
      alignment: 'center',
      label: attributes.label
    });
    label.graphics.font = typeface;
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
    label.graphics.font = typeface;
    for( var i=0; i<attributes.values.length; i++) {
      var radio = group.add('radiobutton', undefined, attributes.values[i], {name: attributes.values[i]});
      if( attributes.values[i] == values ) {
        radio.value = true;
      }
      radio.graphics.font = typeface;
      radio.onClick = function() {
        attributes.onClick(radio.selection);
      };
      radio.onChange = function() {
        attributes.onChange(radio.selection);
      };
    }

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
      alignment: 'center',
      label: attributes.label
    });
    label.graphics.font = typeface;
    var slider = group.add('slider', undefined,
      100,
      // (values != undefined)
      //   ? values
      //   : (attributes.value != undefined
      //     ? attributes.value
      //     : 0),
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
      try {
        attributes.onChanging(slider.value);
      }
      catch(err) {}
      return slider.value;
    };

    values = slider.value;
    return slider;
  };

  // ------------------------------------------------------------------------
  /**
   * Color - a color picker
   * 
   * @param {String} name         the name of the Palette window
   * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
   * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
   * @param {Array} values        incoming values Array 
   *
   * @return {DropDownListSUI}    the ScriptUI Component
   */
  function Color(name, container, attributes, values) {
    var group = container.add('group');
    group.orientation = 'row';

    var label = new Label(attributes.label, group, {
      alignment: 'center',
      label: attributes.label
    });
    label.graphics.font = typeface;

    var swatchSize = (attributes.size == 'small')
      ? 12
      : (attributes.size == 'large'
        ? 28
        : 18); // 'medium'

    var colorPicker;
    var test = group.add('panel', [0,0, swatchSize,swatchSize]);
    test.graphics.backgroundColor = test.graphics.newBrush(
      test.graphics.BrushType.SOLID_COLOR,
      [0.0, 1.0, 0.7, 1.0]
    );

    var colorWell = test.add('iconbutton', [swatchSize/2,0, swatchSize,swatchSize], attributes.value, {name: name});
    // colorWell.fillBrush = colorWell.graphics.newBrush( 
    //   colorWell.graphics.BrushType.SOLID_COLOR,
    //   [Math.random(), Math.random(), Math.random(), 0.1]
    // );
    colorWell.graphics.font = typeface;
    // colorWell.onDraw = function() {
    //   this.graphics.drawOSControl();
    //   this.graphics.rectPath(0,0,this.size[0],this.size[1]);
    //   this.graphics.fillPath(this.fillBrush);
    // };
    colorWell.onClick = function() {
      colorPicker = new ColorPicker(
        test,
        (attributes.colormode != undefined)
          ? attributes.colormode
          : 'cmyk' // TODO: default b.colorMode()
      );
      attributes.onClick();
    };

    /**
     * Open an OS color picker dialog
     * @param {IconButtonSUI} colorwell   the colorwell element, whose color to update
     * @param {String} colormode          the color mode of the output color
     * 
     * @return the output color
     */
    var ColorPicker = function(colorwell, colormode) {

      var integer = ( colormode == 'rgb')
        ? RGBToInt( values )
        : (colormode == 'hex' || values instanceof String
          ? RGBToInt( HexToRGB(values) )
          : RGBToInt( CMYKToRGB(values) ));

      var color;
      var cp = $.colorPicker(integer);
      if (cp) {
        if( colormode == 'rgb' || colormode == 'hex') {
          var rgb = IntToRGBA(cp);
          color = app.activeDocument.colors.add({
            model: ColorModel.process,
            space: ColorSpace.RGB,
            colorValue: rgb,
            name: (colormode == 'rgb') 
              ? 'r'+rgb[0] + ' g'+rgb[1] + ' b'+rgb[2]
              : '#' + cp.toString(16)
          });
        }
        else if( colormode == 'cmyk') {
          var cmyk = IntToCMYK(cp);
          color = app.activeDocument.colors.add({
            model: ColorModel.process,
            space: ColorSpace.CMYK,
            colorValue: cmyk,
            name: 'c'+cmyk[0] + ' m'+cmyk[1] + ' y'+cmyk[2] + ' k'+cmyk[3]
          });
        }

      // update color well
      // var rgba = IntToRGBA(cp);
      // $.writeln( 'IntToRGBA(cp)' + rgba );
      colorwell.graphics.backgroundColor = colorwell.graphics.newBrush(
        colorwell.graphics.BrushType.SOLID_COLOR,
        rgba
        // [Math.random(), Math.random(), Math.random(), 1.0]
      );

        $.writeln('closing Picker');
      }

      return color;
    };


    // TODO: make these private functions outside of Interface?
    /**
     * @param {Number} integer  RGB integer value
     */
    function IntToRGBA(integer) {
      return [
        (integer >> 16) & 0xFF,
        (integer >> 8) & 0xFF,
        integer & 0xFF,
        1.0, //(integer >> 24) & 0xFF
      ];
    };
    /**
     * @param {Number} integer  RGB integer value
     */
    function IntToCMYK(integer) {
      var rgb = IntToRGBA(integer);
      var c = 1 - rgb[0],
          m = 1 - rgb[1],
          y = 1 - rgb[2],
          k = Math.min(c,m,y);
      // TODO: replace clip() with b.constrain()
      function clip(val,min,max) { return val<min?min:(val>max?max:val); };
      return [
        clip(c - k, 0, 1)*100,
        clip(m - k, 0, 1)*100,
        clip(y - k, 0, 1)*100,
        clip(k, 0, 1)*100
      ];
    };
    /**
     * @param {String} hex  16-bit hex value as string
     */
    function HexToRGB(hex) {
      hex = (hex.length == 7) ? hex.substring(1) : hex;
      return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
      ];
    };
    /**
     * @param {Array} arr normalized CMYK values
     */
    function CMYKToRGB(arr) {
      return [
        1.0 - Math.min(1.0, arr[0] + arr[3]),
        1.0 - Math.min(1.0, arr[1] + arr[3]),
        1.0 - Math.min(1.0, arr[2] + arr[3])
      ];
    };

    function RGBToInt(arr) {
      return ((arr[0] & 0x0ff) << 16) | ((arr[1] & 0x0ff) << 8) | (arr[2] & 0x0ff);
    };

    // return colorWell;
  };

  // ------------------------------------------------------------------------
  /**
   * Dropdown - A drop-down list with zero or more items
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
    label.graphics.font = typeface;
    var dropdown = group.add('dropdownlist', undefined, attributes.values, {name: name});
    // dropdown.title = attributes.label;
    // dropdown.titleLayout = { 
    //   alignment: ['left', 'center'], 
    //   spacing: 3,
    //   characters: 16,
    //   justify: 'right'
    // };
    dropdown.selection = 0; // select first element
    dropdown.graphics.font = typeface;
    dropdown.alignment = 'center';
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
    label.graphics.font = typeface;
    var button = group.add('button', undefined, attributes.value, {name: name});
    button.graphics.font = typeface;
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
    label.graphics.font = typeface;
    var progress = group.add('progressbar', undefined, 
      (values != undefined)
        ? values
        : (attributes.value != undefined
          ? attributes.value
          : 0),
      (attributes.max != undefined)
        ? attributes.max
        : (attributes.range != undefined)
          ? attributes.range[1]
          : 1.0,
      (attributes.min != undefined) 
        ? attributes.min
        : (attributes.range != undefined)
          ? attributes.range[0]
          : 0.0,
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
    label.graphics.font = typeface;

    // default: full width of palette window
    var w = (attributes.width != undefined)
      ? attributes.width
      : -1;

    var separator = group.add('panel', [0,0,w,1]);
    // separator.minimumSize.height = separator.maximumSize.height = 1;
    separator.preferredSize.height = separator.preferredSize.height = 1;

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
      else if( controllers[name].type == 'color') {
        window[name] = new this.Color(name, componentGroup, controllers[name], values[name]);
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
    Color: Color,
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
    // TODO: write size for automatic sizing of
    // elements
    $.writeln( win.size );
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
  win.alignChildren = 'right';
  // win.layout.layout(true);

  // create main holder
  var mainGroup = win.add('group');
  mainGroup.orientation = 'column';
  mainGroup.alignChildren = 'right';

  // create individual controllers
  var controls = new Interface.Controllers(mainGroup);
  controls.add( win, controllers, values );

  // draw to screen
  win.onShow = function() {
    // TODO: write size for automatic sizing of elements
    for( var name in controllers ) {
      try {
        $.writeln( name + ': ' + this[name].size.width );
        this[name].size.width = (this[name].size.width <= 0)
          ? mainGroup.size.width
          : this[name].size.width;
        mainGroup.onDraw();
        $.writeln( name + ': ' + this[name].size.width );
        $.writeln( '---------' );
      }
      catch(err) {}
    }

    $.writeln( this.size );
    $.writeln( this[mainGroup].size );
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
  win.center();

  printMethods( mainGroup );
  printMethods( win );

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

function printMethods(obj) {
  $.writeln('------------------');
  $.writeln(obj.reflect.name);
  $.writeln('\rMethods');
  $.writeln('------------------');
  var props = obj.reflect.methods.sort();
  for( var i = 0; i < props.length; i++ ) {
    $.writeln(props[i].name);
  }
};


