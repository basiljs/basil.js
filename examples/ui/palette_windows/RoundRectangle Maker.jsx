////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/user-interface/creating-palette-windows/

// Define the values object:
var values = {
	width: 200,
	height: 100,
	radius: 10,
	color: new RGBColor(1, 0.5, 0)
};

// Define the palette components to edit each value:
var components = {
	width: {
		type: 'number', label: 'Width', units: 'point'
	},
	height: {
		type: 'number', label: 'Height', units: 'point'
	},
	radius: {
		type: 'number', label: 'Corner Radius', units: 'point'
	},
	color: {
		type: 'color', label: 'Circle Color'
	},

	// The create button, with an onClick() handler that creates the
	// rectangle for us:
	create: {
		type: 'button', value: 'Create',
		onClick: function() {
			// Create a RoundRectangle at coordinate 0, 0, with the
			// size defined by values.widht and values.height, and
			// a corner radius of values.radius.
			// Note: The radius needs to be converted to a size,
			// as horizontal and vertical corner size is defined
			// seperately
			var path = new Path.RoundRectangle(
					new Point(0, 0), // topLeft corner
					new Size(values.width, values.height), // size
					new Size(values.radius)); // round corner size
			// Set the fill color to the color selected by the user
			path.fillColor = values.color;
		}
	}
};

// Now we create the palette window:
var palette = new Palette('RoundRectangle Maker', components, values);
