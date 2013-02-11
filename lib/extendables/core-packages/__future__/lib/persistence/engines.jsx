exports.RESTEngine = function (path) {
	this.create = function () {}
	
	this.read = function () {}
	
	this.update = function () {}

	this.destroy = function () {}	
	
	this.toString = function () {
		return 'RESTEngine for resource {}'.format(path);
	}
}

// we kunnen dit gebruiken om configuraties weg te schrijven
// de veiligste manier om dit te laten werken is om deze engine
// steeds de volledige resource te laten opvragen 
exports.FileBasedEngine = function (path) {
	this._file = new File(path);
	
	this.create = function (id) {
	}
	
	this.read = function (id /* optional */) {
	
	}
	
	this.update = function (id) {
	
	}

	this.destroy = function (id /* optional */) {
	
	}		

	this.toString = function () {
		return 'FileBasedEngine for resource {}'.format(path);
	}
}