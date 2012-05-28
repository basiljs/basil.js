#include "../../basil.js";

// TODO more sophisticated examples and tests with Document|Spread|Page|Layer|Story|TextFrame|Text
function draw() {
  var textFrame = b.text('hello basil', 0, 0, 300, 300);
  b.typo(textFrame, 'pointSize', '48');
}