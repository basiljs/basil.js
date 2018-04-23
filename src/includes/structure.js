// ----------------------------------------
// src/includes/structure.js
// ----------------------------------------

/**
 * @description Suspends the calling thread for a number of milliseconds.
 * During a sleep period, checks at 100 millisecond intervals to see whether the sleep should be terminated.
 *
 * @cat     Environment
 * @method  delay
 *
 * @param   {Number} milliseconds The delay time in milliseconds.
 */
pub.delay = function (milliseconds) {
  $.sleep(milliseconds);
};
