/**
 * example shows how to parse a raw CSV string to a javascript object.
 * no idea what CSV is? then have a read here: http://en.wikipedia.org/wiki/Comma-separated_values
 */

// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// to load an external csv file use
// var jsonString = b.loadString("path/to/file.csv")

var csvString = "";
csvString += "firstName,lastName,middleInitial,firstNameFirst,lastNameFirst\n";
csvString += "Kristina,Chung,H,Kristina H. Chung,\"Chung, Kristina H.\"\n";
csvString += "Paige,Chen,H,Paige H. Chen,\"Chen, Paige H.\"\n";
csvString += "Sherri,Melton,E,Sherri E. Melton,\"Melton, Sherri E.\"\n";
csvString += "Gretchen,Hill,I,Gretchen I. Hill,\"Hill, Gretchen I.\"\n";
csvString += "Karen,Puckett,U,Karen U. Puckett,\"Puckett, Karen U.\"\n";
csvString += "Patrick,Song,O,Patrick O. Song,\"Song, Patrick O.\"\n";
csvString += "Elsie,Hamilton,A,Elsie A. Hamilton,\"Hamilton, Elsie A.\"\n";
csvString += "Hazel,Bender,E,Hazel E. Bender,\"Bender, Hazel E.\"\n";
csvString += "Malcolm,Wagner,A,Malcolm A. Wagner,\"Wagner, Malcolm A.\"\n";
csvString += "Dolores,McLaughlin,C,Dolores C. McLaughlin,\"McLaughlin, Dolores C.\"\n";
csvString += "Francis,McNamara,C,Francis C. McNamara,\"McNamara, Francis C.\"\n";
csvString += "Sandy,Raynor,A,Sandy A. Raynor,\"Raynor, Sandy A.\"\n";
csvString += "Marion,Moon,O,Marion O. Moon,\"Moon, Marion O.\"\n";
csvString += "Beth,Woodard,O,Beth O. Woodard,\"Woodard, Beth O.\"\n";
csvString += "Julia,Desai,E,Julia E. Desai,\"Desai, Julia E.\"\n";
// ... an excerpt of randomNames.csv
// from http://www.opensourcecf.com/1/2009/05/10000-Random-Names-Database.cfm

function setup() {
  b.clear(b.doc());

  // set the delimiter
  // very common for .csv files is ',' (=default) or ';' and for .tsv files '\t'
  // b.CSV.delimiter(',')

  // parse CSV
  var csvData = b.CSV.decode(csvString);

  // create textframes for "firstNameFirst" column
  for (var i = 0; i < csvData.length; i++) {
    b.text(csvData[i].firstNameFirst, 0, i * 20, b.width, 19);
  }

  // convert an array of key value objects to a CSV-string
  b.println(b.CSV.encode(csvData));
}

b.go();
