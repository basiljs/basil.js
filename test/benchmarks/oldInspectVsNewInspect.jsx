// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  // Inspecting Booleans
  var time = b.millis();
  for (var i = 100; i > 0; i--) {
    b.inspect(true);
  }
  var booleanTimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 100; i > 0; i--) {
    b.inspectNew(true);
  }
  var booleanTimeNew = b.millis() - time;


  // Inspecting Numbers
  var time = b.millis();
  for (var i = 20; i >= -20; i -= 1 / 3) {
    b.inspect(i);
  }
  var numTimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 20; i >= -20; i -= 1 / 3) {
    b.inspectNew(i);
  }
  var numTimeNew = b.millis() - time;


  // Inspecting Strings
  var time = b.millis();
  for (var i = 100; i > 0; i--) {
    b.inspect(b.LOREM);
  }
  var stringTimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 100; i > 0; i--) {
    b.inspectNew(b.LOREM);
  }
  var stringTimeNew = b.millis() - time;


  // Inspecting Custom Objects, Level 1
  var testObject = {
    value1: 23,
    value2: -5,
    value3: true,
    value4: false,
    value5: [34, 8, 12, "foo", "bar", true],
    value6: "foo",
    value7: {
      value1: true,
      value2: 45,
      value3: "bar",
      value4: "bas",
      value5: []
    }
  };

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspect(testObject, 1);
  }
  var objLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspectNew(testObject);
  }
  var objLvl1TimeNew = b.millis() - time;


  // Inspecting Custom Objects, Level 2
  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspect(testObject, 2);
  }
  var objLvl2TimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspectNew(testObject, {maxLevel: 2});
  }
  var objLvl2TimeNew = b.millis() - time;


  // Inspecting Arrays, Level 1
  var testArray = [
    23,
    -5,
    true,
    false,
    [34, 8, 12, "foo", "bar", true],
    "foo",
    {
      value1: true,
      value2: 45,
      value3: "bar",
      value4: "bas",
      value5: []
    }
  ];

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspect(testArray, 1);
  }
  var arrayLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspectNew(testArray);
  }
  var arrayLvl1TimeNew = b.millis() - time;


  // Inspecting Arrays, Level 2
  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspect(testArray, 2);
  }
  var arrayLvl2TimeOld = b.millis() - time;

  var time = b.millis();
  for (var i = 10; i > 0; i--) {
    b.inspectNew(testArray, {maxLevel: 2});
  }
  var arrayLvl2TimeNew = b.millis() - time;


  // Inspecting A Color, Level 1
  var testColor = b.color(255, 0, 0);

  var time = b.millis();
  b.inspect(testColor, 1);
  var colorLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testColor);
  var colorLvl1TimeNew = b.millis() - time;


  // Inspecting A Color, Level 2
  var time = b.millis();
  b.inspect(testColor, 2);
  var colorLvl2TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testColor, {maxLevel: 2});
  var colorLvl2TimeNew = b.millis() - time;


  // Inspecting A Color, Level 3
  var time = b.millis();
  b.inspect(testColor, 3);
  var colorLvl3TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testColor, {maxLevel: 3});
  var colorLvl3TimeNew = b.millis() - time;


  // Inspecting A Rect, Level 1
  var testRect = b.rect(0, 0, 100, 100);

  var time = b.millis();
  b.inspect(testRect, 1);
  var rectLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testRect);
  var rectLvl1TimeNew = b.millis() - time;


  // Inspecting A Rect, Level 2
  var time = b.millis();
  b.inspect(testRect, 2);
  var rectLvl2TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testRect, {maxLevel: 2});
  var rectLvl2TimeNew = b.millis() - time;


  // Inspecting A Rect, Level 3
  var time = b.millis();
  b.inspect(testRect, 3);
  var rectLvl3TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(testRect, {maxLevel: 3});
  var rectLvl3TimeNew = b.millis() - time;


  // Inspecting App, Level 1
  var time = b.millis();
  b.inspect(app, 1);
  var appLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew(app);
  var appLvl1TimeNew = b.millis() - time;


  // Inspecting $, Level 1
  var time = b.millis();
  b.inspect($, 1);
  var dollarLvl1TimeOld = b.millis() - time;

  var time = b.millis();
  b.inspectNew($);
  var dollarLvl1TimeNew = b.millis() - time;


  // RESULTS
  b.println("-----------------------------------------\r" +
            "Inspecting a Boolean (100 loops)\r" +
            "(old): " + booleanTimeOld / 1000 + " s\r" +
            "(new): " + booleanTimeNew / 1000 + " s\r" +
            "Speed up factor: " + booleanTimeOld / booleanTimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting Numbers (121 loops)\r" +
            "(old): " + numTimeOld / 1000 + " s\r" +
            "(new): " + numTimeNew / 1000 + " s\r" +
            "Speed up factor: " + numTimeOld / numTimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a String (100 loops)\r" +
            "(old): " + stringTimeOld / 1000 + " s\r" +
            "(new): " + stringTimeNew / 1000 + " s\r" +
            "Speed up factor: " + stringTimeOld / stringTimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Custom Object @ Level 1 (10 loops)\r" +
            "(old): " + objLvl1TimeOld / 1000 + " s\r" +
            "(new): " + objLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + objLvl1TimeOld / objLvl1TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Custom Object @ Level 2 (10 loops)\r" +
            "(old): " + objLvl2TimeOld / 1000 + " s\r" +
            "(new): " + objLvl2TimeNew / 1000 + " s\r" +
            "Speed up factor: " + objLvl2TimeOld / objLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting an Array @ Level 1 (10 loops)\r" +
            "(old): " + arrayLvl1TimeOld / 1000 + " s\r" +
            "(new): " + arrayLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + arrayLvl1TimeOld / arrayLvl1TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting an Array @ Level 2 (10 loops)\r" +
            "(old): " + arrayLvl2TimeOld / 1000 + " s\r" +
            "(new): " + arrayLvl2TimeNew / 1000 + " s\r" +
            "Speed up factor: " + arrayLvl2TimeOld / arrayLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Color @ Level 1\r" +
            "(old): " + colorLvl1TimeOld / 1000 + " s\r" +
            "(new): " + colorLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + colorLvl1TimeOld / colorLvl1TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Color @ Level 2\r" +
            "(old): " + colorLvl2TimeOld / 1000 + " s\r" +
            "(new): " + colorLvl2TimeNew / 1000 + " s\r" +
            "Speed up factor: " + colorLvl2TimeOld / colorLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Color @ Level 3\r" +
            "(old): " + colorLvl3TimeOld / 1000 + " s\r" +
            "(new): " + colorLvl3TimeNew / 1000 + " s\r" +
            "Speed up factor: " + colorLvl3TimeOld / colorLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Rectangle @ Level 1\r" +
            "(old): " + rectLvl1TimeOld / 1000 + " s\r" +
            "(new): " + rectLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + rectLvl1TimeOld / rectLvl1TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Rectangle @ Level 2\r" +
            "(old): " + rectLvl2TimeOld / 1000 + " s\r" +
            "(new): " + rectLvl2TimeNew / 1000 + " s\r" +
            "Speed up factor: " + rectLvl2TimeOld / rectLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting a Rectangle @ Level 3\r" +
            "(old): " + rectLvl3TimeOld / 1000 + " s\r" +
            "(new): " + rectLvl3TimeNew / 1000 + " s\r" +
            "Speed up factor: " + rectLvl3TimeOld / rectLvl2TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting App @ Level 1\r" +
            "(old): " + appLvl1TimeOld / 1000 + " s\r" +
            "(new): " + appLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + appLvl1TimeOld / appLvl1TimeNew + "\r" +
            "-----------------------------------------\r");

  b.println("-----------------------------------------\r" +
            "Inspecting $ @ Level 1\r" +
            "(old): " + dollarLvl1TimeOld / 1000 + " s\r" +
            "(new): " + dollarLvl1TimeNew / 1000 + " s\r" +
            "Speed up factor: " + dollarLvl1TimeOld / dollarLvl1TimeNew + "\r" +
            "-----------------------------------------\r");
}

b.go();
