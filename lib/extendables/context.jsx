/**
 * @param {String} item Can be any one of ``window``, ``doc``, ``page`` or ``spread``.
 */

// refactor: should pay mind to how InDesign-tied this implementation is,
// probably needs a variant for every CS application

function current (item) {
	var items = {
		'window': app.layoutWindows.item(0),
		'document': undefined,
		'page': undefined,
		'spread': undefined
	}

	if (app.documents.length) {
		items.merge({
			'document': app.documents.item(0),
			'page': app.documents.item(0).pages.item(0),
			'spread': app.documents.item(0).spreads.item(0)
		});
	}

	if (item in items) {
		return items[item];		
	} else {
		throw RangeError();
	}
}