#include "../extendables.jsx";

if (!app.is('indesign') {
	throw new EnvironmentError("This script only works in Adobe InDesign");
}

// create a new document
app.activeDocument = app.documents.add();
Number.range(10).forEach(function () {
	current('document').pages.add();
}

// create a B-culture master
current('document').masterSpreads.add(1, {'namePrefix': 'B', 'name': 'culture'});

var doc = current('document');
doc.importXML('stories.xml');
// q: what with multiple stories, does it return all of them as you'd expect?
// var story = doc.xml().find('story');

// Apply the 'B-culture' master page if to page 5 if that page doesn't
// derive from a master yet.
// Page#master and LayoutWindow#page are both getter/setters.
current('window').page(5);
if (!current('page').master()) {
	current('page').master('B-culture');
}

var frames = current('page').textFrames;

// layout a page with all the story titles from the culture section
doc.xml().children().forEach(function (story) {
	// attr returns the value for the specified attribute on an element, 
	// in this case 'culture'.
	if (story.attr('section') == 'culture') {
		// val returns the value of an element, in this case the title
		var title = story.find('title').val();
		var frame = frames.add(undefined, undefined, undefined, {'contents': title});
		frame.move(undefined, [0, 10]);
		story.attr('processed', new Date().getTime());
	}
});

var pageitemtag = doc.pageItems.item(0).tag();
var xmltag = doc.xml().find(0).tag();
if (pageitemtag == xmltag) {
	"Associated page item 0 with a {} xml element.".format(xmltag).to_console();
}