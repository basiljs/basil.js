#targetengine: "session"

/*
function Color (rgb_or_hex, opacity) {
	this.a = opacity;
	
	if (rgb_or_hex.is(Array)) {
		this.r = rgb_or_hex[0];
		this.g = rgb_or_hex[1];
		this.b = rgb_or_hex[2];
	} else {
		var hex = rgb_or_hex.replace('#', '');
		this.r = parseInt(hex.substring(0,2), 16);
		this.g = parseInt(hex.substring(2,4), 16);
		this.b = parseInt(hex.substring(4,6), 16);
	}

	this.rgba = function() {
		return [this.r, this.g, this.b, this.a];
	}
}
*/

Group.prototype.style = function (params) {
	function color (dest, color) {
		var brush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, color);
		this.graphics[dest] = brush;
	}
	
	if (params['background'].is(Array)) {
		color('backgroundColor', params['background'][0]);
		color('disabledBackgroundColor', params['background'][1]);
	} else if (params['background'].is(Color)) {
		color('backgroundColor', params['background']);
	}
}

// dit vind ik lijk niet zo belangrijk omdat prutsen met kleurtjes niet bepaald
// hetgeen is dat je als scripter zo broodnodig hebt, en waar shortcuts je
// devtijd ongelooflijk kunnen verkorten.
// misschien beter om gewoon bij item.properties = {} te blijven

.style({
	'background': kleur of [kleur, disabled-kleur]
	'foreground': kleur of [kleur, disabled-kleur]
	'font': [family, style, size]
})


.size(preferred, min, max)



// group.children is standaard scriptui
ui.row('password').children.forEach(function (control, i) {
	if (i == 0) control.size([200, undefined]);
})

/*
Op deze manier kan je een layout opdelen in:

	* styles & properties (= mixins)
	* structuur
	* events

*/

/*
properties.fancypants = {
	'bounds': [],
	'styles': {
		'background': y,
		'foreground': z
	}
}	

UI.prototype.button = function (id, text) {
	this[id] = this.add('button', undefined, text);
	return this;
}

UI.prototype.using = function () {
	arguments.forEach(function(mixin_name) {
		var mixin = self.mixins[mixin_name];
		mixin.forEach(function(property) {
			if (property.name == 'styles') {
				this.style(property.value);
			} else {
				this[property.name] = property.value;
			}
		});
	});
}
