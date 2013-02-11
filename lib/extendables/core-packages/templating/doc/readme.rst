=============================================
``templating``: minimalistic output templates
=============================================

Templating is a small module that can write files according to a template. It acts as an abstraction on top of ``str.format``, substituting named and unnamed placeholders (a.k.a. curly braces) with the values you pass in. It is currently hardcoded to search for templates in the parent module's ``templates`` directory (if any) and it writes those away to the ``log`` dir.

Usage: 

.. code-block: javascript
    
    var Template = require("templating").Template;
    // provided your module lives in a ``lib`` folder, will refer to ../templates/hello.txt
    // module is a global variable available to all modules
    var tpl = new Template("template.hello.txt", module)
    tpl.render("some", "replacements", "for placeholders");
    // look for this file in the log dir
    tpl.write_to("hello.txt");

Aside from string formatting, ``templating`` also supports `partials <http://api.rubyonrails.org/classes/ActionView/Partials.html>`_.

.. code-block:
    /* rendering */
    var class = {
        'room': 505,
        'students': [{'name': 'Prez'}, {'name': 'Billy'}, {'name': 'Satchmo'}]
        }
    var tpl = new Template("class.txt", module).render(class);

    /* class.txt */
    classroom: {room}
    {students => student.txt}

    /* student.txt */
    * {name}
    
    // will output:
    classroom: 505
    * Prez
    * Billy
    * Satchmo

You don't need to pass an array to a partial. If you pass an object, it'll just run through the partial template once as if you'd passed in a one-element array.

.. note::

    There are no plans to expand on this module, though it might become more potent if ``str.format`` does. Its sole use is to provide HTML output for the :ref:`testing <testing>` module. Don't use this if you need more than the basics; try something like Mustache instead.