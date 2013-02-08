#include "../extendables.jsx"

var ui = require("ui");

/* stylings */
var mixins = {
	'centered': {
		'size': [180, 50],
		'justify': 'center'
	},
	'square': {
		'size': [200, 120]
	},
	'help': {
		'helpTip': 'clickerdy click',
	},
	'button': ['centered', 'help']
};

/* structure */
var dialog = new ui.Dialog('A friendly welcome').with(mixins);
dialog.column('stuff').using('square')
	.text('welcome', 'hello there').using('centered')
	.button('confirm', 'OK!').using('button');


/* event handlers */   
dialog.stuff.confirm.on('click').do(function () {
	this.window.close();
});

dialog.window.show();