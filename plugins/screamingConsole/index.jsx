pub.println = function() {
  var msg = Array.prototype.slice.call(arguments).join(" ").toUpperCase() + "!!!!!";
  $.writeln(msg);
  if (progressPanel)
    progressPanel.writeMessage(msg + "\n");
};