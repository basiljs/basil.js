basil.js
========

Development Environment Setup (OS X)
------------------------------------
* Install [Sublime Text 2](http://www.sublimetext.com/)
* Install Sublime package [sublime-jsdocs](https://github.com/spadgos/sublime-jsdocs) 
* Install Sublime package [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter) 
* Copy bin/InDesign 5.5 JavaScript.sublime-build to ~/Library/Application Support/Sublime Text 2/Packages/User
* In Sublime go to Project -> Open Project... and select basil.sublime-project
* In Sublime go to Tools -> Build Systems and select InDesign 5.5 JavaScript

Now you are able to execute InDesign Scripts from within Sublime with Tools -> Build.

Coding Conventions and Rules
----------------------------
basil.js uses "[Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)" by [Douglas Crockford](http://crockford.com/) with these modifications:
* The unit of indentation is two spaces

API Documentation
-----------------
basil.js uses [YUIDoc](http://yui.github.com/yuidoc/) to document public API functionality.
Installation and usage:
* Download and install [Node.js](http://nodejs.org/#download)
* Open up a terminal window and run "npm -g install yuidocjs"
* To generate the documetation in doc/api open up a terminal window and simply run "yuidoc ." in the basil.js project directory
    
