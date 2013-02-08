=========
Changelog
=========

0.1 (2009)
==========

* Initial, internal helper library, with helpers for http and logging.

0.2 (09/2010)
=============

A huge transformation from some helper libraries into a small but solid unit-tested framework. Also the first (silent) public release on GitHub.

* Hugely refactored the helper library codebase into a framework with a module loader, monkeypatches, assorted modules.
* Added in ``io``, ``templating``, ``testing`` and ``ui`` as Extendables packages.
* Complete overhaul of the ``http`` module to support a subset of HTTP 1.1.

0.3 (1/11/2010)
===============

The first publicized release, including a minimalistic website. This release considerably fleshes out the unit tests and the documentation.

* Added support for partials in the ``templating`` module.
* Added support for named placeholders to ``String#format``.
* Added in File and Folder monkeypatches, and removed the ``path`` module.
* Improvements to ``XMLElement#repr()``
* Added a ``Number.range()`` class method.

0.4 (pending)
=============

* Further improved the documentation
* Improvements to the UI module