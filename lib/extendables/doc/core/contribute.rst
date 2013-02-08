==========
Contribute
==========

You can contribute to Extendables simply by using the framework. The more people use the framework, the more bugs we'll find and squash, and the more reliable the framework will thus become. If you encounter an issue, please run the test suite (so we have as much diagnostic information as possible) and report your issue using the GitHub issue tracker.

Another way to contribute is by writing your own libraries and open-sourcing those. :ref:`Learn more about writing your own modules. <writing-a-module>`

Last but not least, contributions — bugfixes, new code or documentation — to Extendables itself are much appreciated. You can check the issue tracker on GitHub to see open issues or feature requests, or you can implement new features by forking the repository on GitHub and doing a push request once you have something you want to push back into the main repository. Read on to learn more.

Running the test suite
======================

To run the test suite, open ``tools/testrunner.jsx`` in the ExtendScript Toolkit, and run the script. Test results will reside in Extendables' ``log`` directory.

Writing documentation
=====================

Extendables uses the `JSDoc toolkit <http://code.google.com/p/jsdoc-toolkit/>`_ to autogenerate documentation, a toolkit template that outputs to `reStructuredText <http://docutils.sourceforge.net/rst.html>`_ and finally the Sphinx documentation generator to bundle that automatically extracted documentation together with free-flowing documentation. The combination of JSDoc and Sphinx makes it possible to have documentation that serves as both a complete reference and a broader overview of how different components of the framework hang together and how best to use certain libraries.

JSDoc
-----

JSDoc is a special syntax for documenting Javascript code inline. It looks like this:

.. code-block:: extendscript

    /**
     * @desc Performs a POST request on the specified resource.
     * @param {String} url The URL for the resource
     * @param {Object|String} data Either an object, to be urlencoded by this function, or a string that 
     * will be passed along unchanged.
     * @param {Object} [basic_auth] Basic authentication — any object with ``username`` and ``password`` 
     * properties will do.
     * @param {Number} [timeout=1] How long before the http client should give up.
     */
    
    function post (url, data, basic_auth, timeout) {
    	var request = new HTTPRequest("POST", url);
    	return _push(request, data, basic_auth, timeout);
    }

JSDoc syntax gets picked up by the JSDoc toolkit and from there finds its way into the Sphinx documentation. With JSDoc, it's easier to keep code documentation in sync with the code — whenever you change an interface, change the associated inline documentation.

.. seealso::

    A full JSDoc reference document is up at http://code.google.com/p/jsdoc-toolkit/wiki/TagReference.

Sphinx
------

`Sphinx <http://sphinx.pocoo.org/>`_ is a documentation generator originally out of the `Python <http://python.org/>`_ world, but with good support for documenting Javascript (and thus ExtendScript) projects.

Sphinx works with reStructuredText. While its syntax can be a bit off-putting at first, it remains the best way to create beautiful documentation for software projects.

Documentation for Sphinx lives at http://sphinx.pocoo.org/

What goes where
---------------

The documentation to Extendables resides in the ``doc`` directory. Per `the CommonJS specifications <http://wiki.commonjs.org/wiki/Packages/1.1#Package_Directory_Layout>`_, documentation for modules belongs in a ``doc`` dir under each module's root directory, e.g. ``site-packages/http/doc/readme.rst``.

.. seealso: 

    If you're writing documentation for a module, you'll find more information at :ref:`writing-a-module`.

Committing and making a new build
=================================

Making a new build takes a couple of steps: 

* generating new autodocs
* generating new Sphinx docs
* committing any new files to the repository and deleting old ones
* building the documentation and committing it to the ``gh-pages`` branch
* finally pushing the new version to GitHub

However, if you're on a UNIX-compatible system — either Apple OS X or Microsoft Windows using an emulator like `Cygwin <http://www.cygwin.com/>`_ or `MinGW <http://www.mingw.org/>`_), you can use `Fabric <http://docs.fabfile.org/>`_ to do one-click builds.

Fabric
------

`Fabric <http://docs.fabfile.org/>`_ helps automate administrative tasks. Installing Fabric is outside the scope of this documentation. Once installed, open a command-line interface, navigate to the ``extendables`` directory and use ``fab --list`` to get an overview of all tasks you can execute.

Notably, use ``fab docbuild`` to build both the autodocs and Sphinx docs, ``fab commit`` to commit to the Git repository and optionally push to the central repository at http://github.com/stdbrouw/Extendables as well.

.. tip::

    If you know a little bit of Python, it's easy to add new Fabric commands. Take a quick look at ``fabfile.py`` where all tasks are defined.

Git and GitHub
--------------

Extendables is under revision control, using the excellent Git VCS. The central repository is over at http://github.com/stdbrouw/Extendables. GitHub has `excellent help pages <http://help.github.com/>`_ that will get you started with both Git and GitHub.

If you're uncomfortable using Git, just use ``fab commit`` instead and it will guide you through the commit process.

.. warning:: 

    If you're doing development on the Extendables core, make sure you don't put anything valuable inside ``extendables/site-packages`` — nothing in ``site-packages`` or ``log`` is tracked by Git, so whenever you change branches, everything inside of these directories will disappear. Instead, you could
    
     * use two different installations of Extendables: one for testing and development, 
       and another as a production environment. That way, you can use a stable version
       for app development, but also the latest checkout of Extendables for working on the core.
     * place your own modules somewhere else, and place a symlink (OSX-only) inside of
       ``extendables/site-packages`` so your modules will get registered.

Guidelines
----------

* Versioning: see the `semver spec <http://semver.org/>`_. Since we're currently still in the experimental phase (version 0), semver places no restrictions on how we use version numbers, but this will become important once we graduate to version 1.
* In time, if necessary, we may adopt the `nvie branching strategy <http://nvie.com/posts/a-successful-git-branching-model/>`_.
* We don't commit things that aren't documented or tested -- there's no point having functionality in the framework if nobody knows it's there or if it's not dependable. We encourage people to show unfinished code, they just shouldn't expect it to get committed any time soon.
* Keep commits as atomic as possible: smaller is better.
* Version control messages: messages should be in the past tense, e.g. ``Improved XMLElement#repr``. If your commit closes a ticket in the issue tracker, start your commit message with ``Fixed #issue``, e.g. ``Fixed #33 -- improved XMLElement#repr``.
* In the documentation, instance methods are referred to as ``MyClass#mymethod``, class methods are referred to as ``MyClass.mymethod``.
* style guide: none yet; to be discussed. See the `Django style guide <http://docs.djangoproject.com/en/dev/internals/contributing/>`_ for a good example of issues that need to be addressed (code style, reporting bugs, how to do unit tests, naming conventions et cetera) and how we can communicate them.