var root = new File($.fileName).parent.parent;

// Executes these subrunners entirely separate so they can't influence each other.
// That means $.evalFile instead of #include
$.evalFile(root + "/test/runner.patches.jsx");
$.evalFile(root + "/test/runner.framework.jsx");
$.evalFile(root + "/test/runner.packages.jsx");
$.writeln("Finished test run.");