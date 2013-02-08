==================
About this project
==================

History
=======

- me: doing a lot of automation work, but code looked way dirtier than it should, and way dirtier than it did when I work in Django -- but because of Javascript its flexibility, it's actually doable to give coding in ES more of a natural feel.
- ExtendScript has been around for long, but now that javascript is in the spotlight as a viable all-round language rather than just a simple scripting tool for browsers, there's a cornucopia of usable code being released, standards being set and best practices being shared. So exactly the right time to give ExtendScripters the opportunity to share in the fun.

Why is this free?
=================

The ExtendScript community has a long history of both sharing and of trying to make an honest buck. This project tries to collect some of the common wisdom and approaches out there. It hopes to give ExtendScript coders a more meaningful and more permanent way in which they can share code, under the guiding principle that a rising tide lifts all boats.

A solid development framework for ExtendScript should allow every one of us to do our jobs better and more quickly, and, yes, make some money off of the end products. For that reason, this framework comes with the very liberal MIT license, allowing it to be used in commercial projects without worry.

Design considerations
=====================

Proudly found elsewhere
-----------------------

Re-use as much stuff from the CommonJS / server-side javascript sphere as possible, both ideas and actual code. However, often not possible to include stuff as straight CommonJS modules because they depend on a specific implementation (e.g. node.js modules that depend on C extensions we obviously can't use) or because the ExtendScript interpreter works slightly different than Spidermonkey or v8. So, while there are a couple of straight dependencies (in the `dependencies` directory), other elements of Extendables are either forks of other code (e.g. the `path` module derives from node.js) or are simply inspired by work and approaches in other languages, particularly Python, but with some Ruby influences as well. Yet other modules, are, of course, built from scratch, like HTTP and UI.

