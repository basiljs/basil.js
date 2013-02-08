/*
stuff you do on the model: all, get, filter (= this is a manager)
stuff you do on an individual instance: save, destroy, refresh
stuff you do on collections / querysets: flush(), values()

all of this, you do using an engine

Inspiration: 
http://documentcloud.github.com/backbone/docs/backbone.html
http://github.com/benpickles/js-model

Note to self: test whether obj.watch() works like addEventListener (i.e. you can add a bunch of them)
or whether you can only have a single watch function for each property.
*/

//var engines = require("persistence/engines");
// quick testing: 
var exports = {};
#include ../../../patches/__all__.jsx
#include engines.jsx
var engines = exports;

function Manager (engine) {
	this._engine = engine;
	
	this.all = function () {
		return 'all objects';
	}

	this.filter = function (args) {
		// dit zou kunnen werken in tandem met named paths:
		// <resource>/:collection_id/:id
		// waarbij je dan kan filteren met {'collection_id': 3, 'id': 5}
		// en wat niet ingevuld geraakt wordt weggelaten uit het pad
		// filter-opties _niet_ aanwezig in het pad kunnen weggefilterd
		// worden uit een array, met array.filter(function(el) { return el[filterfield] == filtervalue })
	}

	this.get = function (args) {
		var objs = self.filter(args);
		if (!objs.length) throw Error("Does not exist");
		if (objs.length > 1) throw Error("Returned multiple objects.");
		return objs[0];		
	}
}

function Collection () {
	this.flush = function () {
	}

	this.values = function () {
	}
}
Collection.prototype = new Array();

function model_factory (resource_path, engine) {
	function Model () {
		var self = this;
		
		this._attributes = {};
		this._changes = {};
		
		this.attributes = function () {
			return self._attributes.merge(self._changes);
		}
		
		this.refresh = function () {
			self = Model.objects.get({'id': self.id});
		}

		this.validate = function () {}
		
		this.attr = function (name, value) {
			// tip overnemen van js-model: changes 
			if (value) {
				self._changes[name] = value;
			} else {
				return self.attributes()[name];
			}
		}

		this.save = function () {
			// men moet bij het aanmaken van een model zeggen welk het PK-veld is,
			// en op basis daarvan weten we of we moeten saven dan wel updaten.
		}
	
		this.destroy = function () {
			
		}
	}

	var engine = new engine(resource_path);
	Model.objects = new Manager(engine);
	return Model;
}

var Post = model_factory('this/is/a/path.conf', engines.RESTEngine);

alert(Post.objects.all());

var post = new Post();

alert(post.save);

/*
als we de classmethods intact willen houden, hebben we een factory nodig die models maakt;
ik zou puur ActiveRecord gaan, dus vrij close to the metal (of in dit geval, de JSON die we ontvangen)

var Post = model_factory(resource_path, engine);
*/