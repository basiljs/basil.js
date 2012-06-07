#targetengine "session";
#include "../../basil.js";

function setup() {
  var idleTask = app.idleTasks.add({name:"create_circles_idle_task", sleep:10});
  var onIdleEventListener = idleTask.addEventListener(IdleEvent.ON_IDLE, onIdleEventHandler, false);

  alert("Created idle task " + idleTask.name + "; Run the _Stop() script to end it!");

  var ctrl = b.text("move me",-250,100, 50,30);
  ctrl.label = "ctrl";
  var textFramePage = b.text("basel", 0,0,b.width,b.height);
  textFramePage.label = "target";
}

function onIdleEventHandler(idleEvent) {
  var ctrl = b.findByLabel("ctrl")[0];
  var textFramePage = b.findByLabel("target")[0];
  var y = ctrl.geometricBounds[0];
  textFramePage.contents = "basel "+y;
  textFramePage.paragraphs[0].pointSize = y;
  b.println("onIdleEventHandler "+y);
}

b.go();