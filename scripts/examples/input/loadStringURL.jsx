// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.println("-- load an URL into a string --");
  var url = "http://basiljs.ch";
  b.println(b.isURL(url));
  b.println(b.loadString(url));

  b.println("-- load lines of an text file into an array --");
  var loadedArray = b.loadStrings("https://raw.github.com/basiljs/basil.js/master/examples/demos/B08_bar_chart_from_csv_data/data/LA_Pools-Pools_per_Hood.csv");
  b.println(loadedArray.length);
  b.println(loadedArray[0]);
  b.println(loadedArray[1]);

  b.println("-- load JSON data --");
  var urlWeatherBasel = "http://api.openweathermap.org/data/2.5/weather?q=Basel,CH&units=metric";
  var weatherData = b.JSON.decode(b.loadString(urlWeatherBasel));
  b.println("wind speed: " + weatherData.wind.speed);
  b.inspect(weatherData);
}

b.go();
