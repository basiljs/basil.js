======================
Common design patterns
======================

For framework design issues currently under discussion, look at `issues in the GitHub issue tracker with a design label <http://github.com/stdbrouw/Extendables/issues/labels/design>`_.

getter/setters
==============

Sometimes, when coding an interface, it's useful to be able to pretend that an object has a certain attribute people can read from and write to, while in reality there's more going on behind the screen: a certain calculation, creating an object, doing a lookup in different places and so on — in essence, properties that work like functions, or functions that look like properties. This is a very useful abstraction that makes code more domain-specific.

Unfortunately, as opposed to Ruby and Python, Javascript has no support for making a function appear to be a property. Instead, you'll see the following idiom appear across different Javascript libraries: 

.. literalinclude:: ../../../examples/getter-setters.jsx

Extendables makes considerable use of this idiom, which you're probably familiar with if you've ever used `jQuery <http://jquery.com/>`_ before.

domain-specific language constructs
===================================

Some parts of Extendables try to make coding a bit more elegant and a bit more like plain English by introducing a `domain-specific language <http://en.wikipedia.org/wiki/Domain-specific_language>`_ within Javascript.

For example, in the UI module you would add styles to a dialog using ``var dialog = ui.Dialog("Hello there").with(styles);`` and not ``var dialog = ui.Dialog("Hello there"); dialog.add_styles(styles);``

In the Jasmine testing library, you define tests that look like

.. code-block:: javascript
    
    it('needs proper unit tests', function () {
        expect(false).toBeTruthy();
    });

By themselves, the function names ``it`` and ``expect`` are vague and undescriptive. But in context, they lead to very elegant code that makes immediate sense. Extendables uses domain-specific constructs wherever a single isolated task needs to be accomplished (building a user interface, testing your code) but avoids them elsewhere, in favor of more generally descriptive function and class names.

In Extendables, modules that implement a domain-specific constructs are referred to as frameworks, because they frame your entire way of coding, whereas a library includes mostly helper classes and functions.

extending prototypes
====================

Extendables does most of its work by extending the prototypes of built-in objects, like ``Number``, ``Array`` and ``String``. That way, we can keep our code entirely object-oriented instead of having
to define a plethora of helper functions.

If a developer wishes to extend object prototypes him- or herself, they need to be aware of which methods Extendables adds to the prototypes. Overriding prototype methods provided by Extendables could unpredictably alter how applications work, so some care needs to be taken.

..
    - factories (Error handling)
    - basic functional programming using select/reject/compact in Extendables' internal code