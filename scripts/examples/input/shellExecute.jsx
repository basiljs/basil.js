// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // Example shows how to executes a shell command ...
  // CURRENTYL MAC ONLY!
  // BE CAREFUL!

  b.println("-- get the current time from the shell --");
  b.println(b.shellExecute("date"));

  b.println("-- list all files on your desktop --");
  b.println(b.shellExecute("ls ~/Desktop"));

  b.println("-- some around in the internetz? --");
  b.println(b.shellExecute("ping -c 1 www.basiljs.ch"));
}

b.go();
