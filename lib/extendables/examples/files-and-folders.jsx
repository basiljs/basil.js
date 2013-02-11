#include ../extendables.jsx

/*
 * ``file.at`` / ``folder.at`` works similarly to File#getRelativeURI, 
 * but returns a new File object instead of a path.
 */

var documentation = new Folder("doc").at(Folder.extendables);
var here = new File($.fileName);
var examples = here.parent.files();
var docfiles = documentation.files("*.rst");

$.writeln("The Extendables' documentation root directory contains {} files".format(docfiles.length));
$.writeln("You're currently running the example script '{}'".format(here.component('name')));
if (here.component('extension') == 'jsx') {
	$.writeln("This is an ExtendScript script");
}
$.writeln("Other examples include: ");
examples.forEach(function (example) {
	if (example.name != here.name) $.writeln(" - " + example.component('basename'));
});