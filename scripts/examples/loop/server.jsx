// targetengine "loop";
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// note: use telnet on terminal to send strings after the server was started
// telnet localhost 1024
// then type and press return

var server = null;
var conn = null;

var tWidth;
var tHeight;

function setup() {
  b.doc();
  server = new Socket();
  server.listen(1024);
  server.timeout = 999999;
  b.println("server started at localhost 1024");

  tWidth = b.width - 150;
  tHeight = 400;
}

function draw() {

  b.println("poll loop");

  if(conn === null) {
    conn = server.poll();
  }
  if(conn !== null && conn.connected) {
    conn.timeout = 0.05; // time for connected client to wait for linefeed, otherwise blocks InDesign for 10 seconds
    var s = conn.readln();
    if (s !== null && s !== "") {
      b.println(s);

      b.addPage();
      var tf = b.text(s, b.width / 2 - tWidth / 2, b.height / 2 - tHeight / 2, tWidth, tHeight);
      b.typo(tf, "appliedFont", "Helvetica\tBold");
      b.typo(tf, "pointSize", "72");
      b.typo(tf, "justification", Justification.CENTER_ALIGN);
    }
  }

}

function cleanUp() {
  if(conn !== null) {
    conn.close();
  }
  if(server !== null) {
    server.close();
  }
  server = null;
  conn = null;
  b.println("stopped server");
}

b.loop(15);
