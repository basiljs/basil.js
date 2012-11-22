#targetengine "loop";
#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// really bad performance... :/
// try with cs6
// how is benedikt doing with it?
// how is the client implementation working? processing as the server...

// note: use telnet on terminal to send strings after the server was started

var server = null;
var conn = null;
var textBox = null;

function setup() {
    b.doc();
    server = new Socket();
    server.listen(1024);
    server.timeout = 99999;
    b.println("server started at localhost 1024");
    
    var tWidth = b.width - 150;
    var tHeight = 400;
    
    textBox = b.text("server started at localhost 1024", b.width / 2 - tWidth / 2, b.height / 2 - tHeight / 2, tWidth, tHeight);
    
    b.typo(textBox, 'appliedFont', 'Helvetica\tBold');  
    b.typo(textBox, 'pointSize', '72');   
    b.typo(textBox, 'justification', Justification.CENTER_ALIGN);    
};

function draw() {

      b.println("poll loop");

      if(conn == null) conn = server.poll(); 
      
      if( conn != null && conn.connected ) {
        var s = conn.readln();
        if ( s != null && s != "" ) {
          b.println( s );
          textBox.contents = s;
        }
      }
  
};

function cleanUp() {
    server.close();
    server = null;
    conn = null;
    b.println("stopped server");
    textBox.remove();
};

b.loop(3); 