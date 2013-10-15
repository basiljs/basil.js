////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/user-interface/creating-palette-windows/

// Define the values object, declaring default values and also
// receiving the user changes, for simpler further reference:
var values = {
	firstName: '',
	lastName: '',
	email: ''
};

// Define the interface components to edit each value. Note that they
// need to use the same names as the properties in the values object:
var components = {
	firstName: { type: 'string', label: 'First Name' },
	lastName: { type: 'string', label: 'Last Name' },
	email: { type: 'string', label: 'Email Address' },

	// Define the hello button which when clicked says hello:
	hello: {
		type: 'button', value: 'Hello',
		onClick: function() {
			// The user clicked 'Hello', so let's say hello to him:
			Dialog.alert('Hello ' + values.firstName
				+ ' ' + values.lastName
				+ ', your email address is: '
				+ values.email);
		}
	}
};

// Now we create the palette window using the components
// and values definitions:
var palette = new Palette('Contact Details', components, values);
