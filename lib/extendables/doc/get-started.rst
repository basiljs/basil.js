.. _get-started:

================================
Getting started with Extendables
================================

..
   why a framework comes in handy; mention the low barrier to entry: it's free, it's easy, don't use what you don't need

Download
========

You can download the latest version of Extendables at http://github.com/stdbrouw/extendables/zipball/master

First steps
===========

.. warning:: 
    
    This part of the documentation is high on our to-do list, but currently you're better of skipping to the documentation for individual packages. The ScriptUI documentation in particular contains a pretty good beginner's walkthrough.

.. include:: jsdoc/_global_.rst
   :start-after: class-title

... now let's see whether that worked.

* loading a package (e.g. http) and the concept of namespaces
* doing things with objects (e.g. reject, is, to, indexAfter)
* manipulating stuff in InDesign (current, dom object shortcuts)
* wrap things up with a basic interface (ui + menu)

Learn more: 

* javascript
    * functional methods
    * conversions, serializations, object types and checks
* InDesign: see ``dom`` docs
* ScriptUI: see ``ui`` docs
* Best practices
    * OO in javascript
    * Error handling
    * Testing
* About this project

Porting existing scripts to Extendables
=======================================

Porting existing scripts from plain ExtendScript to an Extendables-enhanced is easy. Just keep your existing code, and refactor parts of it to use all the convenience methods Extendables provides when it seems sensible and when time allows.

There is, however, one caveat: because Extendables enhances built-in object prototypes, ``for ... in`` loops won't work as you're used to.

.. code-block:: extendscript

    #include "extendables/extendables.jsx";    
    var people = {
        "jack": 33,
        "jill": 11,
        "jonas": 5
        };
    
    // this won't work anymore
    for (var person in people) {
        $.writeln("{} is {} years old".format(person, people[person]))
    }
    
    // this will work
    people.keys().forEach(function(person){
        $.writeln("{} is {} years old".format(person, people[person]))        
    });
    
    // if you if you absolutely insist on using for...in, this'll work too
    for (var person in people) {
    	if (!x.propertyIsEnumerable(person)) continue;
        $.writeln("{} is {} years old".format(person, people[person]))    	
    }
    
    // on arrays, this is better if you just want the ages
    var people = [{'name': 'Alfred', age: 33}, {'name': 'Zed', age: 45}];
    people.pluck('age')
    
    // and this is better if you want a list of strings
    people.map(function(person){
        return "{name} is {age} years old".format(person)
    });

Please keep in mind that, regardless of whether you use Extendables, `Mozilla specifically warns against <https://developer.mozilla.org/en/JavaScript/Reference/Statements/for...in>`_ using ``for...in`` as a way to loop through arrays and hashes: 

    Although it may be tempting to use this as a way to iterate over an Array, this is a bad idea. The ``for...in`` statement iterates over user-defined properties in addition to the array elements, so if you modify the array's non-integer or non-positive properties (e.g. by adding a "``foo``" property to it or even by adding a method or property to Array.prototype), the for...in statement will return the name of your user-defined properties in addition to the numeric indexes. Also, because order of iteration is arbitrary, iterating over an array may not visit elements in numeric order. Thus it is better to use a traditional for loop with a numeric index when iterating over arrays. Similar arguments might be used against even using ``for...in`` at all (at least without propertyIsEnumerable() or hasOwnProperty() checks), since it will also iterate over Object.prototype (which, though usually discouraged, can, as in the case of Array.prototype, be usefully extended by the user where are no namespacing concerns caused by inclusion of other libraries which might not perform the above checks on such iterations and where they are aware of the effect such extension will have on their own use of iterators such as ``for...in``).

Installing a new Extendables module
===================================

Extendables comes with a bunch of built-in modules, but you can also `write your own <writing-a-module>`_ and install modules other people have contributed. Contributed modules are installed by simply downloading them and  putting them inside of ``extendables/site-packages``.

.. note::

    Because Extendables is so new, there are currently no contributed modules the author is aware of. However, even if you're not planning on open-sourcing any of your own work, it still makes sense to put code that you plan to reuse in different projects into its own module. Code in a module gets its own namespace and the package layout makes it easy to include documentation and unit tests alongside your code. Modules make it easy to keep track of library code and they keep a project directory from getting cluttered with files full of helper functions.

Issues
======

Any issues or feature requests should be posted on `our GitHub page <http://github.com/stdbrouw/extendables/issues>`_. You can also reach the maintainer at stijn@stdout.be.