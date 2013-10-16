////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/user-interface/creating-palette-windows/

// Define the values object:
var values = {
	text: 'Hello World',
	font: 'Helvetica Regular',
	size: 14,
	color: 'black'
};

// Define the palette components to edit each value:
var components = {
	text: {
		type: 'string', label: 'Text',
		rows: 4, columns: 20
	},
	font: {
		type: 'font', label: 'Font'
	},
	size: {
		type: 'number', label: 'Size', units: 'point'
	},
	color: {
		type: 'color', label: 'Circle Color'
	},

	// The create button, with an onClick() handler that creates the
	// text item for us:
	create: {
		type: 'button', value: 'Create',
		onClick: function() {
			// Create a PointText
			var text = new PointText();
			// Set content and characterStyle properties on it
			text.content = values.text;
			text.characterStyle.font = values.font;
			text.characterStyle.fontSize = values.size;
			text.characterStyle.fillColor = values.color;
		}
	}
};

// Now we create the palette window:
var palette = new Palette('Font Chooser', components, values);
