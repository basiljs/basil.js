/**
 * 
 * Class for creating a user interface within Adobe InDesign
 * for manipulating Basil.js variables.
 * 
 */


// check if a targetengine has been initiated
if ($.engineName !== 'basiljs') {
  #targetengine 'basiljs';
}


// namespace
// TODO: determine namespace b.interface? b.ui? nothing?
// I prefer a namespace to keep things tidy, but would
// also like to avoid namespace.method.method1.method2 etc...
var control = {
  //
  // Global Properties
  // 
  win: null,
  winControllersGroup: null,
  winControllerList: {},

  // default type
  typesize: 10,
  typeface: ScriptUI.newFont('palette', ScriptUI.FontStyle.REGULAR, control.typesize),



  //
  // Classes
  // 

  // ------------------------------------------------------------------------
  /**
   * Class of individual UI Controller elements
   * these are private methods which are only used
   * by control.Prompt and control.Palette via
   * the components array
   * 
   * @param {GroupSUI} Container   the name of the Group (ScriptUI) all the controllers are drawn in
   */
  controllers: function() {
    /**
     * Controller Base
     * 
     * @param {String} name         the name of the Palette window
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
     *
     * @return {Array}
     */
    function Base(name, attributes) {
      // base attributes for every controller
      var attributesBase = {
        type: null,
        name: name,
        label: (attributes.label != undefined) ? attributes.label + '\u00A0' : '\u00A0',
        value: null,
        visible: true,
        enabled: true,

        onChange: function(){},
        onChanging: function(){},
      };
      attributes = control.__mergeArray(attributesBase, attributes);


    };

    // ------------------------------------------------------------------------
    /**
     * Label - A text field that the user cannot change 
     * 
     * @param {String} name         the name of the Palette window
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
     *
     * @return {StaticTextSUI}      the ScriptUI Component
     */
    function Label(name, container, attributes) {
      attributes.alignment = (attributes.alignment != undefined)
        ? attributes.alignment
        : 'center';
      
      var label = container.add('statictext', undefined, attributes.label, {name: name});
      label.alignment = attributes.alignment;
      label.graphics.font = control.typeface;
      return label;
    };

    // ------------------------------------------------------------------------
    /**
     * Slider - A slider with a moveable position indicator.
     * All slider controllers have a horizontal orientation.
     * 
     * @param {String} name         the name of the Palette window
     * @param {GroupSUI} container  the name of the Group (ScriptUI) the Controller is drawn in
     * @param {Array} attributes    Basil.js Controller attributes (i.e type, label, range, etc.)
     *
     * @return {SliderSUI}          the ScriptUI Component
     */
    function Slider(name, container, attributes) {
      // populate attributes specific to controller
      attributes['range'] = (attributes.range != undefined)
        ? attributes.range
        : [0.0, 1.0];
      attributes['min'] = (attributes.min != undefined) 
        ? attributes.min
        : (attributes.range != undefined)
          ? attributes.range[0]
          : 0.0;
      attributes['max'] = (attributes.max != undefined)
        ? attributes.max
        : (attributes.range != undefined)
          ? attributes.range[1]
          : 1.0;
      attributes['value'] = (attributes.value != undefined)
        ? attributes.value
        : 0.0;

      var group = container.add('group');
      group.orientation = 'row';

      var label = new Label(attributes.label, group, {
        alignment: 'center',
        label: attributes.label
      });
      label.graphics.font = control.typeface;
      var slider = group.add('slider', undefined,
        attributes.value,
        attributes.min,
        attributes.max,
        {name: name}
      );

      // callbacks
      slider.addEventListener('mousedown', function() {
        try {
          attributes.onClick(this.value);
        }
        catch(err) {}
        attributes['value'] = this.value;       
        return this.value;
      });
      slider.onChange = function() {
        control.__update();
        try {
          attributes.onChange(this.value);
        }
        catch(err) {}
        attributes['value'] = this.value;
        return this.value;
      };
      slider.onChanging = function() {
        control.__update();
        try {
          attributes.onChanging(this.value);
        }
        catch(err) {}
        attributes['value'] = this.value;
        return this.value;
      };

      // return slider;
      attributes['value'] = slider.value;
      return attributes;
    };


    return {
      Label: Label,
      Slider: Slider,
    };

  }, /* end controllers */


  //
  // Methods
  //
  // ------------------------------------------------------------------------
  /**
   * Private
   * calls a global update() function
   */
  __update: function() {
    try {
      if (typeof update === 'function') {
        update();
      }
    }
    catch(err) {}
  },

  // ------------------------------------------------------------------------
  /**
   * Private
   * merge two arrays together
   */
  // http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript
  __mergeArray: function(base, arr) {
    for(item in base) arr[item] = base[item];
    return arr;
  },

  // ------------------------------------------------------------------------
  /**
   * add component to the current interface window
   *
   * @param {String} type       the controller type
   * @param {String} name       the name of the Controller (also it's variable name)
   * @param {Number} value      the controller's initial value
   * @param {Array} attributes  controller attributes (i.e type, label, range, etc.)
   *
   * @return {Array}             control component
   *
   * @example
   * var slider = dialog.add('slider', 'mySlider', 100, {range: [10,200]});
   * 
   */
  __add: function(type, name, value, attributes) {
    var controller = null;
    attributes['value'] = value;
    if( control.winControllersGroup != null ) {
      if( type === 'slider') {
        control.winControllerList[name] = controller = new control.controllers().Slider(name, control.winControllersGroup, attributes);
      }
    }
    else {
      // error! no control window initiated
    }

    if( controller != null ) {
      control.win[name] = controller;
      control.win.layout.layout( true );
    }
    return controller;
  },

  /**
   * Private
   * add the controllers from an array of controllers array to the current interface window
   * 
   * @param {Array} controllerList  array of interface controllers
   *
   * @return {Array}  array of interface controllers
   */
  __addList: function(controllerList) {
    for( var name in controllerList ) {
      control.__add( controllerList[name].type, name, controllerList[name].value, controllerList[name] )
    }
    return controllerList;
  },

  // ------------------------------------------------------------------------
  /**
   * remove component from current interface window
   *
   * @param {String} name       the name of the Controller to remove
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
        controller.parent.remove(controller);
        control.win.layout.layout( true );
        success = true;
      }
    }
    return success;
  },


  // ------------------------------------------------------------------------
  /**
   * @example
   * dialog.map('mySlider', myFunction);
   *
   *  i never thought i'd wish for c style functionality
   *  passing as a reference in javascript is not a trivial task
   *  if not downright impossible
   *  
   *  http://snook.ca/archives/javascript/javascript_pass
   *  http://stackoverflow.com/questions/2835070/is-there-thing-like-pass-by-value-pass-by-reference-in-javascript
   *  http://sirdarckcat.blogspot.de/2007/07/passing-reference-to-javascript.html (no-go!)
   *
   *  hence the desired map function may not be possible
   *  at least to my knowledge
   *  
   */
  // __map: function(name, object) {
    // if( control.win != null ) {
    //   var controller = control.win.findElement(name);
    //   if( controller != null ) {
    //     if( typeof object === 'function' ) {
    //       controller.onChanging += object; 
    //     }
    //     else {
    //       // $.writeln( 'controller.value: ' + controller.value );
    //       object = controller.value;

    //     }
    //   }
    // }
    // return object;
  // }

};







// ------------------------------------------------------------------------
/**
 * Creates a modeless dialog, also called a floating palette.
 * 
 * @param {String} name           the name of the control window
 * @param {Array} controllerList  array of interface controllers
 *
 * @return {Array}  the palette instance
 */
control.palette = function(name, controllerList) {
  //
  // Properties
  // 
  name = (name != undefined) ? name : 'Basil.js';

  // create window
  win = control.win = new Window('palette', name, undefined);
  win.orientation = 'row';
  win.alignChildren = 'right';
  // win.layout.layout(true);

  // create main holder
  var mainGroup = win.add('group');
  mainGroup.orientation = 'column';
  mainGroup.alignChildren = 'right';

  // create component holder group
  winControllersGroup = control.winControllersGroup = mainGroup.add('group');
  winControllersGroup.orientation = 'column';
  winControllersGroup.alignChildren = 'right';
  winControllersGroup.preferredSize = [-1,-1];

  // create individual controls
  var controls = control.__addList( controllerList );
  win.layout.layout( true );

  // setup return values
  var value = {
    window: control.win,
    update:  control.win.update,
    add: control.__add,
    remove: control.__remove
  };


  //
  // Methods
  // 
  win.onShow = function() {
    // TODO: write size for automatic sizing of elements
    // for( var name in controls ) {
    //   try {
    //     this[name].size.width = (this[name].size.width <= 0)
    //       ? mainGroup.size.width
    //       : this[name].size.width;
    //     mainGroup.onDraw();
    //   }
    //   catch(err) {}
    // }
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

    // garbage clean-up
    $.gc();
    $.gc();
  };
  win.addEventListener('changing', function() {
    for( var name in control.winControllerList ) {
      value[name] = control.winControllerList[name].value;
    }
  });

  win.show();
  win.center();

  return value;
};


// $.writeln( $.summary() ); 
//







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