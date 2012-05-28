#targetengine "session" 
killAllidleTasks();

function killAllidleTasks() {
  var allIdleTasks = app.idleTasks;
  for (var i = app.idleTasks.length - 1; i >= 0; i--) {
    allIdleTasks[i].remove();
  };
}