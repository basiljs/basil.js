if (typeof(Submenu) !== 'undefined') {
  Submenu.prototype.get_or_add = function (menu_title) {
    var item = this.menuItems.item(menu_title);
    
    // refactor: probably better, though untested: item == null
    if (!item.hasOwnProperty('title')) {
      var action = app.scriptMenuActions.add(menu_title);	
      item = this.menuItems.add(action);		
    }

    return item;
  }
}

/*
var actions = app.scriptMenuActions;
var menu = app.menus.item('$ID/RtMouseLayout');
var item = actions.add("Send feedback to editor");
var opt = menu.menuItems.add(item, LocationOptions.AT_BEGINNING);
var sep = menu.menuSeparators.add(LocationOptions.AFTER, opt);

var boo = function () {
	alert("harro");
}

item.eventListeners.add("onInvoke", boo);
*/

/*
	var main = app.menus.item("$ID/Main");
	var pubtalk       = main.submenus.add("something");
	// clear everything inside the Pubtalk menu, we want a fresh start
	pubtalk.menuElements.everyItem().remove();
	
	// submenus
	var configuration = pubtalk.submenus.add("something below something");	
	
	// actions
	var todo      = configuration.get_or_create("(not implemented yet)");	
	var run_script = pubtalk.get_or_create("Run a cool script");
	
	// event handlers
	run_script.associatedMenuAction.eventListeners.add("onInvoke", function () {
		app.doScript(new File("script.jsx").at("wherever));
	});
*/

/*
IDEAS / VAGUE THOUGHTS: 	
- Maybe we should probably wrap this stuff in a similar way to the UI framework. 
  That way, we can keep a registry of user-added menu items, in case we need 'em
  removed or need to change them later in the script.
  
*/

// note: this would probably work for xmlElement#children as well
// and maybe for other collections too
// perhaps a Collection wrapper class would be handy in that case, to homogenize
// how we handle collections and to be able to handle them in a more Array-like way?

/*
var menus = app.menus.item("Main").submenus;
var menus = app.menus;
var menus = app.menus.item("Main").submenus.item("Window").submenus;
for (var i = 0; i < menus.count(); i++) {
	$.writeln(menus.item(i).name);
}
*/
