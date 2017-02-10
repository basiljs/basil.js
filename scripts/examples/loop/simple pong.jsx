// @targetengine "loop";
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

var pos, vel;
var ball;
var ballRadius = 40;
var paddle;
var paddleWidth = 300;
var paddleHeight = 40;
var counter = 0;
var countBox;

function setup() {

  b.doc();
  b.units(b.PX);

  // create ball
  initBall();

  // init paddle
  paddle = b.rect(b.width / 2 - paddleWidth / 2, b.height - paddleHeight - 10, paddleWidth, paddleHeight);

  // init countBox
  countBox = b.text("0", b.width - 320, 20, 300, 80);
  b.typo(countBox, "appliedFont", "Helvetica\tBold");
  b.typo(countBox, "pointSize", "72");
  b.typo(countBox, "justification", Justification.RIGHT_ALIGN);

}

function draw() {

  pos.add(vel);

  // detect boundary collision
  // right
  if (pos.x > b.width - ballRadius * 2) {
    pos.x = b.width - ballRadius * 2;
    vel.x *= -1;
  }
  // left
  if (pos.x < 0) {
    pos.x = 0;
    vel.x *= -1;
  }
  // top
  if (pos.y < 0) {
    pos.y = 0;
    vel.y *= -1;
  }
  // bottom => you loose
  if (pos.y > b.height - ballRadius * 2) {
    ball.remove();
    counter = 0;
//    initBall();
  }

  // check paddle
  if (paddle !== null
        && pos.y > b.itemY(paddle) - ballRadius * 2
        && pos.x > b.itemX(paddle) - ballRadius
        && pos.x < b.itemX(paddle) + ballRadius + b.itemWidth(paddle)) {

    vel.y *= -1;
    vel.mult(1.0); // getting harder...
    counter++;
    pos.y = b.itemY(paddle) - ballRadius * 2;

  }

  b.itemPosition(ball, pos.x, pos.y);
  countBox.contents = String(counter);

}

function initBall() {
  pos = new b.Vector(b.width / 2, b.height / 2);
  vel = new b.Vector(b.random(-20, 20), -18);
  ball = b.ellipse(pos.x, pos.y, ballRadius * 2, ballRadius * 2);
  b.itemPosition(ball, pos.x, pos.y);
}

// this is called when the stop.jsx script is invoked. use this to remove all the runtime items.
function cleanUp() {
  ball.remove();
  paddle.remove();
  countBox.remove();
}


b.loop(30);
