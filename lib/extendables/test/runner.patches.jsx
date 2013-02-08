#include "bootstrapper.jsx"

var base = new Folder("patches/test").at(Folder.extendables);
var specs = base.getFiles("*.specs");

specs.forEach(function (specfile) {
	try {
		$.evalFile(specfile);
	} catch (error) {
		$.writeln(specfile + " is not a valid specifications file.\n" + error);
	}
});

tests.to_html("tests.patches.html");