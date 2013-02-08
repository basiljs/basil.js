=============================================
``http``: sending and receiving http requests
=============================================

The ``http`` library allows scripts to fetch and push data from and to the internet. It is a high-level interface with the ``Socket`` object. The library implements a good subset of the **HTTP 1.1** protocol.

.. code-block:: extendscript
    
    #include "extendables/extendables.jsx";
    var http = require("http");
    var response = http.get("http://www.w3c.org")
    if (response.status_code == 200) {
        $.writeln(response.body);
    } else {
        $.writeln("Connection failed");
    }

Aside from high-level functions like ``get`` and ``post``, there's also a lower-level interface if you happen to need more flexibility.

.. code-block:: extendscript

    var req = new http.HTTPRequest("GET", "http://nytimes.com");
    req.follow_redirects(false);
    var timeout = req.timeout();
    req.timeout(10);
    $.writeln("Changing timeout from {} to {} seconds".format(timeout, 10));
    req.header("User-Agent", "My ExtendScript app");
    var res = req.do();
    $.writeln(res.status == 200);	
    
The ``Socket`` object is available in Adobe **Bridge**, Adobe **InDesign**, Adobe **InCopy**, Adobe **After Effects** and Adobe **Photoshop**, and you may also use it in the ExtendScript Toolkit. No luck for Illustrator fiends.

Basic requests
==============

.. include:: jsdoc/_global_.rst
   :start-after: class-methods

Request objects
===============

.. include:: jsdoc/HTTPRequest.rst
   :start-after: class-title

Response objects
================

.. include:: jsdoc/HTTPResponse.rst
   :start-after: class-title