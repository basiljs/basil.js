#targetengine "loop"

noLoop();

/*
Note: basil.js scripts using the loop environment can implement a
cleanUp() function, which will be called here when stopped. In that function
you should remove everything that you don't want to see in the document
anymore. Additionally, you can use this to free up memory since all
variables which have been defined in a script in the loop environment stay
in memory until a restart of InDesign.
*/

// run the cleanUp procedure
if (cleanUp instanceof Function) cleanUp(true);
cleanUp = null; // to be safe: clear the variable ...