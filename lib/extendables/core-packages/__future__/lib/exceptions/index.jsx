/*
TODO

A couple of things to aid in handling exceptions for end users: 
	1. if it's an error a user can do something about (they entered the wrong parameters or something), coders need to be able to 
easily throw an alert that points out the mistake (optionally giving users the possibility to continue or cancel the running script)
and may point to additional documentation on- or offline
	2. if it's an internal error, users should just be informed that something went wrong, and be given the possibility to generate
an error report (using the templating module) to send back to the creator (either manually or over http)

These are optional helpers coders can use or not use at their liberty.
*/