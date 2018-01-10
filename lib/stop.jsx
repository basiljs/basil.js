#targetengine "loop"

noLoop(true);

/*
Note: basil.js scripts using the loop environment can implement a
cleanUp() function, which will be called here when stopped. In that function
you should remove everything that you don't want to see in the document
anymore.
*/

// run the cleanUp procedure
if (typeof cleanUp === "function") {
  cleanUp();
  cleanUp = null; // to be safe: clear the variable ...
}
