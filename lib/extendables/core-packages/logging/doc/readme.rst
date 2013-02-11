===============================================
``logging``: a logging utility for ExtendScript
===============================================

Logging is useful when debugging (nobody likes code interspersed with ``alert()`` statements). Logging is also beneficial in production settings — if something goes wrong, good logs will make it easy to know what happened and how to remedy the problem.

Extendables comes with a logging library, loosely inspired on the eponymous `Python library <http://docs.python.org/library/logging.html>`_.

Initialize a log using ``var log = new logging.Log("logfile.log");``.

After that, you can log messages using ``log.debug(msg)``, ``log.info(msg)``, ``log.warning(msg)``, ``log.error(msg)`` and ``log.critical(msg)``.

All logs reside in the ``log`` directory under the Extendables root.

Log levels
==========

===== ========
level meaning
===== ========
0     NOTSET
1     CRITICAL
2     ERROR
3     WARNING
4     INFO
5     DEBUG
===== ========

.. include:: jsdoc/Log.rst