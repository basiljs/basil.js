basilTest = (function() {

  $.global.assert = function(outcome, description) {
    allTestsResult.asserts++;
    testResult.asserts++;
    $.writeln((outcome ? 'PASS' : 'FAIL')  + (description ? (' - ' + description) : ''));
    if (outcome) {
      allTestsResult.pass++;
      testResult.pass++;
    } else {
      allTestsResult.fail++;
      testResult.fail++;
      throw 'assert failed';
    }
  }

  var TestResult = function() {
    this.total = this.pass = this.fail = this.asserts = 0;
  };
  TestResult.prototype.print = function() {
    var result = this.total + ' test cases run\n';
    result += this.asserts + ' assertions run\n';
    result += this.pass + ' passed\n';
    result += this.fail + ' failed';
    $.writeln(result);
    return result;
  };

  var TestRunner = function(name, spec) {
    this.name = name;
    this.spec = spec || {};
    this.spec.setUp = typeof this.spec.setUp === 'function' ? this.spec.setUp : null;
    this.spec.tearDown = typeof this.spec.tearDown === 'function' ? this.spec.tearDown : null;
  };
  TestRunner.prototype.run = function() {
    $.writeln('------');
    $.writeln('Running ' + this.name);

    testResult = new TestResult();
    try {
      if (typeof this.spec.setUpTest === 'function')  {
        this.spec.setUpTest();
      }
      runTests.call(this, collectTests.call(this));
    } finally {
      if (typeof this.spec.tearDownTest === 'function') {
        this.spec.tearDownTest();
      }
      $.writeln('--');
      testResult.print();
    }

    function collectTests() {
      var testCases = [];
      for (var p in this.spec) {
        if (this.spec.hasOwnProperty(p) && typeof this.spec[p] === 'function') {
          if (p.indexOf('test') === 0) {
            testCases.push(p);
          }
        }
      }
      return testCases;
    }

    function runTests(testCases) {
      for (var i = 0, len = testCases.length; i < len; i++) {
        $.writeln('----');
        runTest.call(this, testCases[i]);
      }
    }

    function runTest(testCase) {
      try {
        $.writeln('Running ' + testCase);
        allTestsResult.total++;
        testResult.total++;
        if (this.spec.setUp) this.spec.setUp();
        this.spec[testCase]();
      } catch(e) {
        if (e !== 'assert failed') {
            // not error from assert, so rethrow
            throw e;
        }
      } finally {
        if (this.spec.tearDown) this.spec.tearDown();
      }
    }
  };

  var allTestsResult = new TestResult(),
    testResult = new TestResult(),
    pub = function(name, spec) {
      new TestRunner(name, spec).run();
    };
  pub.result = function() {
    $.writeln('------------');
    return allTestsResult.print();
  }
  return pub;

})();
