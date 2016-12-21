// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  var xCells = 30;
  var yCells = 30;
  var center = true;

  if(b.items(b.layer("shapes")).length === 0) b.error("Nothing found on layer 'shapes'. Put something there first.");

  var cellWidth = b.width / xCells;
  var cellHeight = b.height / yCells;

  for( var y = 0; y < yCells; y++) {

    for( var x = 0; x < xCells; x++) {

      var shape = getRandomShape();

      b.layer("generated");

      b.rotate( b.radians( b.random( -10, 10 ) ) );
      // b.scale( b.random(0.9, 1.1) );

      var newShape = b.duplicate(shape);

      // newShape.fillColor = b.color(255,0,0);

      if(center == true) {
        b.itemX( newShape, cellWidth * x + cellWidth / 2 - b.bounds(newShape).width / 2 );
        b.itemY( newShape, cellHeight * y + cellHeight / 2 - b.bounds(newShape).height / 2 );
      } else {
        b.itemX( newShape, cellWidth * x );
        b.itemY( newShape, cellHeight * y );
      }

    }

  }

}


function getRandomShape() {

  var shapesLayer = b.layer("shapes");
  var shapesItems = b.items(shapesLayer);

  var randomIndex = b.floor(b.random( shapesItems.length ));

  return shapesItems[ randomIndex ];

}

b.go();