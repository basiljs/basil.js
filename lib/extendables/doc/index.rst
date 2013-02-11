.. Extendables documentation master file, created by
   sphinx-quickstart on Thu Sep 23 17:42:30 2010.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Extendables' documentation!
======================================

Extendables is an :ref:`MIT-licensed <license>` developers' **framework for Adobe ExtendScript**. If you're writing heavy-duty automations for a Creative Suite app like **InDesign**, or anything more than just a throwaway script, this is for you.

Extendables comes with three big blocks of functionality.

1. Additional methods on built-in objects like String and Array that give you the **Javascript 1.8 features** you're used to (think ``forEach``), conveniences for functional programming (think ``map``, ``reduce``, ``filter``), easy serialization to base64 and more.
2. Additional methods on InDesign DOM objects that make coding in InDesign **less verbose**.
3. Packages for **logging**, **unit testing**, **http requests**, **user interface development**, and a couple of other goodies.

Include the framework in your code simply by including the ``extendables.jsx`` file. Code looks like this:

.. literalinclude:: ../examples/basic.jsx
   :language: extendscript

You'll code more quickly and more reliably.
    
.. seealso::
    :ref:`get-started` is a great place to get going.

In addition, Extendables comes with a `CommonJS <http://www.commonjs.org/>`_-compatible module loader and packaging system. This makes it easy to incorporate other CommonJS components into your project, and it also means all code is `namespaced <http://en.wikipedia.org/wiki/Namespace>`_. :ref:`Learn more about writing your own modules <writing-a-module>` or about :ref:`the internals of the framework <core>`.

Packages
--------

.. toctree::
   :maxdepth: 2
   
   packages/ui/doc/readme.rst
   packages/testing/doc/readme.rst
   packages/http/doc/readme.rst
   packages/logging/doc/readme.rst

Javascript and DOM enhancements
-------------------------------

.. toctree::
   :maxdepth: 3
   
   patches/index
   
More
----

.. toctree::
   :maxdepth: 2
   
   core/index
      
You can also :ref:`search through the docs <search>`. 