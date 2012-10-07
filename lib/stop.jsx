#targetengine "loop"
#include "../basil.js";

b.noLoop();

// note: basil.js scripts using the loop environment can implement a cleanUp() function, which will be called here when stopped.
// in that function you should remove everything that you don't want to see in the document anymore.
// additionally, you can use this to free up memory since usually all basil.js variables stay in memory until the next start of basil or restart of InDesign (@benedikt: please confirm).

cleanUp(); // run the cleanUp procedure
cleanUp = function() {}; // to be safe: reset cleanUp() after this call ...

