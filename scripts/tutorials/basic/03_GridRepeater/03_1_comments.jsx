#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  
  var xCells = 30; // the amount of horizontal cells
  var yCells = 30; // the amount of vertical rows
  var center = true; // whether to center items in cells or not
  
  // check if shapes is existing
  if(b.items(b.layer("shapes")).length === 0) b.error("Nothing found on layer 'shapes'. Put something there first.");
  
  var cellWidth = b.width / xCells; // calculate cell dimensions
  var cellHeight = b.height / yCells;
  
  for( var y = 0; y < yCells; y++) { // loop through rows
    
    for( var x = 0; x < xCells; x++) { // loop through cells
      
      var shape = getRandomShape(); // get one of the shapes on the "shapes" layer, note that b. is not necessary for own functions

      b.layer("generated"); // set or create the layer "generated" as target

//~        b.rotate( b.radians( b.random( -10, 10 ) ) );  // set rotation for new item, 2 x Pi is a full rotation
//~       b.scale( b.random(0.9, 1.1) );        // set scaling for new item
      
      var newShape = b.duplicate(shape); // create a copy of the shape

//~       newShape.fillColor = b.color(255,0,0); // change the fill color of each shape
      
      if(center == true) {
        // move new shape to position in the grid
        // cellHeight multiplied by y it gives the right y position. Same for the x axis.
        // add half of cell size to center in cell
        // substract half of object size to center at cell center
        b.itemX( newShape, cellWidth * x + cellWidth / 2 - b.bounds(newShape).width / 2 ); 
        b.itemY( newShape, cellHeight * y + cellHeight / 2 - b.bounds(newShape).height / 2 ); 
      } else {
        // without centering
        b.itemX( newShape, cellWidth * x ); 
        b.itemY( newShape, cellHeight * y ); 
      }
    
    }
  
  }
  
}

// this is a custom made function
function getRandomShape() {

  var shapesLayer = b.layer("shapes"); // get the layer called "shapes"
  var shapesItems = b.items(shapesLayer); // get all the items on that layer as an array
  
  var randomIndex = b.floor(b.random( shapesItems.length )); // get a random number between 0 - shapesItems.length and round it down
  
  return shapesItems[ randomIndex ]; // get the shape at the calculated random position in the array and return it
  
}

b.go(); // the actual starting point of the sketch, go() is calling the draw() function