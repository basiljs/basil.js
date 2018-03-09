basil.js
========

:exclamation: NOTE :exclamation:

This is a development version of basil.js that uses a new syntax for all basil scripts, which will be introduced with the upcoming basil.js 2.0.

Basil.js scripts written for version 1.x will *not* work any longer with this branch. However, they can be easily rewritten to get them to work again. The main difference is that all basil commands now work without the `b.` prefix and that scripts are automatically run without using `b.go()` or `b.loop()`. Feel free to give this a try and make sure to let us know, if you find any bugs.

If you are looking for the last state of basil.js that still works with the `b.` prefix, you can find it in the [develop-v1](https://github.com/basiljs/basil.js/blob/develop-v1) branch.

---

An attempt to port the spirit of the [Processing](http://processing.org/) visualization language to Adobe InDesign.

For tutorials, examples and documentation go to the official website: [http://basiljs.ch](http://basiljs.ch). Follow us on twitter [@basil_js](https://twitter.com/basil_js) for news and updates

**Founders**
[Ted Davis](http://teddavis.org), [Benedikt Groß](http://benedikt-gross.de), [Ludwig Zeller](http://ludwigzeller.de)

**Contributors**
[Philipp Adrian](http://philippadrian.com), [be:screen GmbH](http://bescreen.de), [Ken Frederick](http://kennethfrederick.de),
[Stefan Landsbek](http://47nord.de), [Timo Rychert](http://timorychert.de), [Fabian Morón Zirfas](http://fabianmoronzirfas.me)


basil.js was conceived and is generously supported by
The Visual Communication Institute / The Basel School of Design
Department of the Academy of Art and Design Basel (HGK FHNW)

http://thebaselschoolofdesign.ch

Please note: Big general parts e.g. random() of the basil.js source code are copy & paste
of the fantasic [processing.js](http://processingjs.org) by the Processing.js team. We would have had a hard time to figure all of that out on our own!

Supported Adobe InDesign versions: CS 5+

If you want use Sublime Text instead of Adobe's Extendscript Toolkit, use the buildscript here: [extras/Sublime Text/](extras/Sublime Text/)
