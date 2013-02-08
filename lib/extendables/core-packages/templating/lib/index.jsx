exports.Template = Template;

function Template (path, for_module) {
	var self = this;
	var template_file = new File(path).at("templates").at(new File(for_module.uri).parent.parent);
	if (!template_file.exists) {
		throw IOError("Couldn't open template {}".format(template_file));
	}
	template_file.open("r");
	this.template = template_file.read();
	template_file.close();
	
	this._output = false;

	this.process_partials = function (replacement_obj) {
		var out = self.template;
		var partial_syntax = new RegExp(/\{(\S+) => (\S+)\}/g);
		var matches = self.template.match(partial_syntax);
		if (!matches) return out;
		var replacements = matches.map(function (match) {
			var partial = partial_syntax.exec(self.template);
			var name = partial[1];
			var obj = replacement_obj[name];
			var path = partial[2];
			// if we're dealing with an array, loop through it
			if (obj.is(Array)) {
				var output = obj.map(function (el) {
					return new Template(path, for_module).render(el);
				}).join('');
			} else {
				var output = new Template(path, for_module).render(obj);	
			}
			return {'from': match, 'to': output};
		});

		replacements.forEach(function (replacement) {
			out = out.replace(replacement.from, replacement.to);
		});
	
		return out;
	}
	
	this.render = function () {
		// partials
		self._output = self.process_partials(arguments[0]);
		// string formatting
		self._output = self._output.format.apply(self._output, arguments);
		return self._output;
	}

	this.write_to = function (path) {
		var out = new File(path).at("log").at(Folder.extendables);
		if (this._output) {
			out.open("w");
			out.write(this._output);
			out.close();
		} else {
			throw new Error("There's no output to write. Did you call the render method first?");
		}
	}
}