=========
A roadmap
=========

Extendables is strictly scratch-your-own-itch material, so there's no strict roadmap, but here are a couple of things under consideration for future releases. No promises.

* a persistence module that would make it easy to persist objects either in an external database (using a REST interface) or locally in a serialized file.
* improvements to the UI library, making it possible to apply a wider range of stylings than is currently possible.
* a preview module, providing an easy way for scripts to show a preview of the action they're about to undertake, without actually executing it (permanently). Similar to how the ``preview`` button works in many native Adobe dialogs.
* more consistent error handling across the framework (proper error types, limited try/catches, throwing errors instead of returning false or simply crashing, exception logging)
* an exceptions module that provides a generic, standard way of alerting end-users when something went wrong, and which can create error reports for developers.
* enhancements to the UI module (more styling options)

Good documentation will remain a priority: 

* Tie in monkeypatch documentation with the existing Adobe DOM docs (user's choice of DOM version) so there's a single authoritative source of documentation. We don't want users to constantly have to switch between Extendables' documentation, the Object Model Viewer and the Javascript Tools Guide. The UI should be similar to the Object Model Viewer.
* A separate project containing best practices that suggest standardized ways of handling certain problems, as well as a getting started guide for people new to ExtendScript.