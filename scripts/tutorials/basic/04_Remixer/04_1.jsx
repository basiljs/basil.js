// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

/*
// ISSUES:
// you can not use multible colored items in groups
// you can not use typo in groups
// you have to use RGB colors only

// USAGE:
// set the properties in the item script label

//position
minX = -100;
maxX = 100;
minY = -100;
maxY = 100;

//scale proportional
minScale = -500;
maxScale = 500;

//scale unproportional
minScaleW = -500;
maxScaleW = 500;
minScaleH = -500;
maxScaleH = 500;

//rotation (maximum values -360, 360)
minRot = -100;
maxRot = 100;

//color (maximum values -255, 255)
minR = -255;
maxR = 255;
minG = -255;
maxG = 255;
minB = -255;
maxB = 255;
*/


function draw() {

  // GET PAGE
  var curPage = b.page();

  // CREATE NEW PAGE
  var newPage = curPage.duplicate(); // b.duplicate(curPage);

  // GO TO NEW PAGE
  b.page(newPage);

  // GET ITEMS ON PAGE
  var pageItems = b.items(newPage);
  var curItem;

  // CONVERT TYPO IN PATH
  for (var i = 0; i < pageItems.length; i++) {
    curItem = pageItems[i];
    if(curItem instanceof TextFrame) {
      var tempLabel = curItem.label;
      b.println(tempLabel);
      var result = curItem.createOutlines(true);
      result[0].label = tempLabel;
    }
  }

  // GET ITEMS ON PAGE AGAIN
  pageItems = b.items(newPage);

  // LOOP THROUGH ITEMS
  for (var j = 0; j < pageItems.length; j++) {

    // SETUP DEFAULT VALUES
    var minX = 0, maxX = 0, minY = 0, maxY = 0;
    var minScale = 0, maxScale = 0;
    var minScaleW = 0, maxScaleW = 0, minScaleH = 0, maxScaleH = 0;
    var minRot = 0, maxRot = 0;
    var minR = 0, maxR = 0, minG = 0, maxG = 0, minB = 0, maxB = 0;
    var repeatPosition = 0;
    var ignore = false;

    // GET ITEM
    curItem = pageItems[j];

    // GET VALUES FROM LABEL
    eval(curItem.label);

    // UPDATE ITEM VALUES
    // SCALE
    if(minScale !== 0 || maxScale !== 0) {
      if(minScaleW !== 0 || maxScaleW !== 0 || minScaleH !== 0 || maxScaleH !== 0) {
        b.error("you can not use proportional and unproportional scale in the same item");
      }
      // SCALE PROPORTIONAL
      setRandomItemSizeProportional(curItem, minScale, maxScale);
    }else{
      // SCALE UNPROPORTIONAL
      setRandomItemSize(curItem, minScaleW, maxScaleW, minScaleH, maxScaleH);
    }
    // POSITION
    setRandomItemPosition(curItem, minX, maxX, minY, maxY);
    // ROTATION
    setRandomItemRotation(curItem, minRot, maxRot);
    // COLOR
    // try --
    setRandomItemColor(curItem, minR, maxR, minG, maxG, minB, maxB);

  }

}
b.go();

// COLOR
function setRandomItemColor(item, minR, maxR, minG, maxG, minB, maxB) {
  updateItemColor(item, b.random(minR, maxR), b.random(minG, maxG), b.random(minB, maxB));
}

function updateItemColor(item, addR, addG, addB) {

  var color = item.fillColor;
  var newR, newG, newB;

  if(color instanceof Color) {
    if(color.space === ColorSpace.RGB) {
      newR = color.colorValue[0];
      newR += addR;
      newG = color.colorValue[1];
      newG += addG;
      newB = color.colorValue[2];
      newB += addB;

      item.fillColor = b.color(b.constrain(newR, 0, 255), b.constrain(newG, 0, 255), b.constrain(newB, 0, 255));
    }else{
      b.warning("please use RGB colors only");
    }
  }
}

// ROTATION
function setRandomItemRotation(item, minRot, maxRot) {
  updateItemRotation(item, b.random(minRot, maxRot));
}

function updateItemRotation(item, addRot) {
  var rotation = item.rotationAngle;
  rotation += addRot;
  item.rotationAngle = rotation;
}

// POSITION
function setRandomItemPosition(item, minRx, maxRx, minRy, maxRy) {
  updateItemPosition(item, b.random(minRx, maxRx), b.random(minRy, maxRy));
}

function updateItemPosition(item, addX, addY) {
  var itemX = b.itemX(item);
  itemX += addX;
  b.itemX(item, itemX);

  var itemY = b.itemY(item);
  itemY += addY;
  b.itemY(item, itemY);
}

// SCALE
function setRandomItemSizeProportional(item, minScale, maxScale) {

  var randomScale = b.random(minScale, maxScale);
  updateItemSize(item, randomScale, randomScale, true);
}

function setRandomItemSize(item, minRx, maxRx, minRy, maxRy) {
  updateItemSize(item, b.random(minRx, maxRx), b.random(minRy, maxRy), false);
}

function updateItemSize(item, addW, addH, proportional) {

  var itemWidth = b.itemWidth(item);
  var itemHeight = b.itemHeight(item);
  itemWidth += addW;
  itemHeight += addH;

  if(proportional) {
    var nw, nh;
    if(b.itemWidth(item) < b.itemHeight(item)) {
      itemWidth = itemHeight / b.itemHeight(item) * b.itemWidth(item);
    }else{
      itemHeight = itemWidth / b.itemWidth(item) * b.itemHeight(item);
    }
  }

  b.itemWidth(item, itemWidth);
  b.itemHeight(item, itemHeight);
}

