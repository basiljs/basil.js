exports.Store = function (uri) {
	var self = this;
	this.uri = uri;
	this.file = new File(uri);
	this.exists = this.file.exists;

	this.save = function () {
		var data = this.data.serialize('json');
		this.file.open('w');
		this.file.write(data);
		this.file.close();
	}

	this.refresh = function () {
		this.file.open('r');
		this.data = this.file.read().deserialize('json');
		this.file.close();
	}
	
	this.destroy = function () {
		this.data = {};
		this.file.remove();
	}

	if (this.file.exists) {
		this.refresh();
	} else {
		this.data = {};
	}
}