.. _writing-a-module:

=======================
Writing your own module
=======================

Modules versus scripts
----------------------

A module is something you *use* to build scripts, and a script is something you *run*.

A module (or library) provides a bunch of functionality that you expect to re-use in different scripts, or want to share with the world, so other people can use your code to jumpstart their work.

There's no simple way to ascertain what belongs in a module and what belongs in a script — you'll have to see what feels most convenient to you. For example, you could put all logic in a module and reduce your script to a two-liner: 

.. code-block:: extendscript

    var my_module = require("my_module");
    my_module.do_stuff();
    
... though chances are that module won't be easily reusable in other contexts. If you want to share a finished application, distribute it as a script, but if you want something other people can plug into their code, distribute it as a module.

What goes where
---------------

Extendables searches for modules in the ``core-packages`` directory (for built-in packages) and the ``site-packages`` (for your own modules and add-ons in general). You may have to create the ``site-packages`` directory yourself.

.. tip::

    If you take care never to put your own code into any other directory than ``site-packages``, you'll make life easier for yourself when upgrading to a newer version of Extendables: simply overwrite any existing directory except for ``site-packages``.

Extendables follows a subset of `the CommonJS specifications <http://wiki.commonjs.org/wiki/Packages/1.1#Package_Directory_Layout>`_. That means: 

* Binary files should be in the ``bin`` directory,
* Javascript code should be under the ``lib`` directory
* Documentation should be under the ``doc`` directory
* Unit tests should be under the ``test`` directory

Documentation should be in reStructuredText syntax, and files should have a `.rst` extension. Unit tests follow `the Jasmine DSL <http://pivotal.github.com/jasmine/suites-and-specs.html>`_ and should have a `.specs` extension.

For very small modules that don't require tests or documentation, a single ExtendScript file will also be recognized as a module when placed in the ``site-packages`` directory.

.. warning:: 

    If you're doing development on the Extendables core, make sure you don't put anything valuable inside ``extendables/site-packages`` — nothing in ``site-packages`` or ``log`` is tracked by the version control
    system, so whenever you change branches, everything inside of these directories will disappear. Instead, you could
    
     * use two different installations of Extendables: one for testing and development, 
       and another as a production environment. That way, you can use a stable version
       for app development, but also the latest checkout of Extendables for working on the core.
     * place your own modules somewhere else, and place a symlink (OSX-only) inside of
       ``extendables/site-packages`` so your modules will get registered.

Scaffolding
-----------

If you have `Fabric <http://docs.fabfile.org>`_ installed, you can create the scaffold for a module using ``fab scaffold:<modulename>``. The result will reside in ``extendables/site-packages/<modulename>``. If you'd rather not use Fabric, you may simply copy the scaffold from ``extendables/tools/scaffold``.

Using the scaffold is highly encouraged. Its stub files include helpful comments and it takes care of the package layout for you.