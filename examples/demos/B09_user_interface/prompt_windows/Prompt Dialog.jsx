////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/user-interface/displaying-dialog-windows/

// First we define the dialog components
var components = {
	firstName: { type: 'string', label: 'First Name' },
	lastName: { type: 'string', label: 'Last Name' },
	email: { type: 'string', label: 'Email Address' }
};

// Now we bring up the dialog
var values = Dialog.prompt('Please Enter Your Contact Details', components);

if (values) {
	// Results were returned, so let's say hello to the user:
	Dialog.alert('Hello ' + values.firstName + ' ' + values.lastName
 		+ ', your email address is: ' + values.email);
}
