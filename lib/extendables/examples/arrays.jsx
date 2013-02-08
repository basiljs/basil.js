#include "../extendables.jsx";
        
var people = [{
	'first': 'Abraham', 
	'last': 'Lincoln', 
	'statesman': true, 
	'title': 'president'
},
{
	'first': 'Joe', 
	'last': 'Pesci', 
	'statesman': false
},
{
	'first': 'Zed', 
	'last': 'Alastair', 
	'statesman': false
}];

// 
var greetings = people.map(function (person) {
    return "Hello there {first} {last}, how are you?".format(person);
});
greetings.forEach(function (greeting) {
    alert(greeting);
})

// select all people who are statesmen and give
// them an especially warm welcome
people.select(function (person) {
    return person.statesman;
}).forEach(function (person) {
    if (person.has('title')) {
        var title = person.title;
    } else {
        var title = 'Mr.';
    }
    alert("And I'd especially like to welcome {} {}".format(title, person.last));
});