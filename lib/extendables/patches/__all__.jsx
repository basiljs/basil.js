#include "object.jsx"
#include "string.jsx"
#include "array.jsx"
#include "object.conversions.jsx"
#include "error.jsx"
#include "file.jsx"
#include "date.jsx"
#include "math.jsx"
#include "dom.application.jsx"
if (!app.is("toolkit")) {
	#include "dom.suite.jsx"
}
if (app.is("indesign")) {
	#include "dom.indesign.jsx"
}