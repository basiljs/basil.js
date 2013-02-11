#include ../../../dependencies/jasmine.js

exports.jasmine = jasmine;
exports.spyOn = spyOn;
exports.it = it;
exports.xit = xit;
exports.expect = expect;
exports.runs = runs;
exports.waits = waits;
exports.waitsFor = waitsFor;
exports.beforeEach = beforeEach;
exports.afterEach = afterEach;
exports.describe = describe;
exports.xdescribe = xdescribe;

var Template = require("templating").Template;

var TestRunner = function () {
	this._clean_results = function (suites, results) {
		var cleaned_results = suites.map(function(suite) {
			var total = suite.children.length;
			var passed = suite.children.filter(function(spec) { 
				return (results[spec.id].result == "passed");
			}).length;
			var specs = suite.children.map(function (spec) {
				return {'name': spec.name, 
					'result': results[spec.id].result, 
					'messages': results[spec.id].messages
					}
			});

			return {
				'name': suite.name,
				'passed': passed,
				'failed': new Number(total - passed),
				'total': total,
				'specs': specs
				};
		});
		return cleaned_results;
	}

	this.run = function () {
		var reporter = new jasmine.JsApiReporter();
		jasmine.getEnv().addReporter(reporter);
		jasmine.getEnv().execute();
		return this._clean_results(reporter.suites_, reporter.results());
	}

	this.get_environment = function () {
		var env = {
			'OS': $.os,
			'ExtendScript build': $.build,
			'ExtendScript version': $.version,
			'path': $.includePath,
			'locale': $.locale,
			'app': app.name,
			'app version': app.version
		}
		return env.keys().map(function (key) {
			return {'key': key, 'value': env[key]};
		});
	}

	// we'll add this into the html representation, 
	// so people can upload structured test reports to our central server.
	this.as_json = function () {
		
	}

	this.to_console = function () {
		var results = this.run();
		
		results.forEach(function(suite) {
			$.writeln("\nSuite: {} \tran {} tests, {} failure(s)".format(suite.name, suite.total, suite.failed));
			suite.specs.forEach(function(spec) {
				$.writeln("\t" + spec.result.toUpperCase() + "\t" + spec.name);
			});
		});
	}

	this.to_log = function () {
		// todo
	}

	this.to_html = function (filename) {
		// some background info
		var datetime = new Date();
		var date = datetime.toDateString();
		var time = "{}:{}".format(datetime.getHours(), datetime.getMinutes());
		var environment = this.get_environment();	

		// run tests
		var results = this.run();
		
		// tidy up results
		results.forEach(function(suite) {
			suite.specs.forEach(function(spec) {
				if (spec.result == 'failed') {
					var messages = spec.messages.reject(function (message) {
						return message == 'Passed.';
					});
					spec.problem = '<p class="problem">{}</p>'.format(messages.join("<br />"));
				} else {
					spec.problem = '';
				}
			});
		});
		
		var duration = ((new Date().getTime() - datetime.getTime())/1000).toFixed(2);

        var template = new Template("report.html", module);
		template.render({
		  'date': date, 
		  'time': time, 
		  'duration': duration, 
		  'suites': results, 
		  'total': results.sum('total'),
		  'fails': results.sum('failed'),
		  'passes': results.sum('passed'),
		  'environment': environment
		});
		template.write_to(filename);
	}

	// would be incredibly interesting to see usage patterns and whether certain tests
	// fail consistently on the same platform or app version or ...
	this.to_central_server = function () {
		// todo
	}
}

exports.tests = new TestRunner();