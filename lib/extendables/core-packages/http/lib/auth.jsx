// this is just a rough prototype, doesn't actually work yet.

exports.AuthenticationDialog = AuthenticationDialog;

var ui = require("ui");

function AuthenticationDialog (request) {
	var mixins = {
		'masked': {}
	}
	// 1. dialog
	var dialog = this.dialog = new ui.Dialog().with(mixins);
	dialog.row('username').text('label', 'Username').input('value', '').using('masked');
	dialog.row('password').text('label', 'Username').input('value', '').using('masked');	
	dialog.row('confirmation').text('status', '').button('cancel', 'Cancel').button('ok', 'Authenticate');

	dialog.confirmation.cancel.on('click').do(function () {
		this.window.close();
	});

	dialog.confirmation.ok.on('click').do(function () {
		request.auth.basic(username, password);
		this.window.close();
	});

	dialog.confirmation.status.update = function (message) {
		this.dialog.confirmation.status.text = message;
	}

	this.do = function () {
		this.dialog.show();
		return request.do();
	}
	
	
}

/*
usage example: 

while (response.status == 401) {
	var response = new AuthenticationDialog(request).do();
	// retry login
	dialog.confirmation.status.update("Authentication failed. Please try again.");
}
*/